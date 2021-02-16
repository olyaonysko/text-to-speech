import { Suspense, lazy, useState } from "react";
import { Switch, Route } from "react-router-dom";
import {
  I18nPropvider,
  UKRAINE,
  ENGLISH,
  RUSSIA,
} from "./components/i18nProvider";
import translate from "./components/i18nProvider/translate";

import Container from "./components/Container";
import AppBar from "./components/AppBar";
import Background from "./components/Background";
import Loader from "./components/Loader";

import s from "./App.module.css";

//  HOME
// UA-RU
const Home = lazy(() =>
  import("./components/Home" /* webpackChunkName: "Home" */)
);

const SpeechSynthesisPage = lazy(() =>
  import(
    "./components/SpeechSynthesis" /* webpackChunkName: "SpeechSynthesis" */
  )
);

const SpeechRecognitionPage = lazy(() =>
  import(
    "./components/SpeechRecognition" /* webpackChunkName: "SpeechRecognition" */
  )
);

const App = () => {
  const [language, setLanguage] = useState(UKRAINE);

  return (
    <>
      <I18nPropvider locale={language}>
        <AppBar />
        <Container>
          <Suspense fallback={<Loader />}>
            <div className={s.buttonWrapper}>
              <p className={s.buttonDesc}>{translate("selectLanguage")}</p>
              <button
                className={[s.langButton, s.langButtonUkraine].join(" ")}
                onClick={() => setLanguage(UKRAINE)}
              >
                Українська
              </button>
              <button
                className={[s.langButton, s.langButtonEnglish].join(" ")}
                onClick={() => setLanguage(ENGLISH)}
              >
                English
              </button>
              <button
                className={[s.langButton, s.langButtonRussian].join(" ")}
                onClick={() => setLanguage(RUSSIA)}
              >
                Русский
              </button>
            </div>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>

              <Route path="/synthesis" exact>
                <SpeechSynthesisPage />
              </Route>

              <Route path="/recognition" exact>
                <SpeechRecognitionPage />
              </Route>
            </Switch>
          </Suspense>
          <Background />
        </Container>
      </I18nPropvider>
    </>
  );
};

export default App;
