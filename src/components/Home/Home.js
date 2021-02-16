import s from "./Home.module.css";
import translate from "../i18nProvider/translate";

const Home = () => {
  return (
    <>
      <div className={s.wrapper}>
        <h2 className={s.title}>
          {translate("homeTitle")}
          <span className={s.active}> {translate("speechSynthesis")}</span>{" "}
          {translate("or")}
          <span className={s.active}>{translate("speechRecognition")}</span>
          <span role="img" aria-label="icon">
            💡
          </span>
        </h2>
      </div>
    </>
  );
};

export default Home;
