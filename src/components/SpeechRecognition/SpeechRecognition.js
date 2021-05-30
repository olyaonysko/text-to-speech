import { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import s from "../../App.module.css";

import { FormattedMessage, useIntl } from "react-intl";
import translate from "../i18nProvider/translate";

const languageOptions = [
  {
    label: "Ukraine",
    value: "uk-UA",
  },
  { label: "English", value: "en-AU" },
  { label: "Russian", value: "ru-RU" },
  { label: "Hindi", value: "hi-IN" },
  { label: "普通话 (中国大陆) - Mandarin", value: "zh" },
  { label: "Deutsch", value: "de-DE" },
  { label: "Bengali", value: "bn-BD" },
  { label: "Arabic", value: "ar-EG" },
  { label: "Français", value: "fr-FR" },
  { label: "Italiano", value: "it-IT" },
  { label: "Portuguese", value: "pt-BR" },
  { label: "Japanese", value: "ja-JP" },
];

const SpeechRecognition = () => {
  const intl = useIntl();
  const [lang, setLang] = useState("en-AU");
  const [value, setValue] = useState("");
  const [blocked, setBlocked] = useState(false);

  const onEnd = () => {
  };

  const onResult = (result) => {
    setValue(result);
  };

  const changeLang = (event) => {
    setLang(event.target.value);
  };

  const onError = (event) => {
    if (event.error === "not-allowed") {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onEnd,
    onError,
  });

  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen({ lang });
      };

  return (
    <form className={s.form} id="speech-recognition-form">
      <h2 className={s.formTitle}>{translate("speechRecognition")}</h2>
      {supported ? (
        <>
          <div className={s.formSettingList}>
            <label className={s.formLabel} htmlFor="language">
              {translate("language")}
              <select
                className={s.formSelect}
                form="speech-recognition-form"
                id="language"
                value={lang}
                onChange={changeLang}
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={s.textareaWrapper}>
            <label htmlFor="transcript" className={s.message}>
              {translate("transcript")}
              <textarea
                className={s.textarea}
                id="transcript"
                name="transcript"
                placeholder={intl.formatMessage({
                  id: "recognitionPlaceholder",
                })}
                value={value}
                disabled
              />
            </label>
            <button
              className={s.formButton}
              disabled={blocked}
              type="button"
              onClick={toggle}
            >
              {listening ? (
                <FormattedMessage id="stopBtn" />
              ) : (
                <FormattedMessage id="listenBtn" />
              )}
            </button>
            {blocked && <p style={{ color: "red" }}>{translate("blocked")}</p>}
          </div>
        </>
      ) : (
        <p>{translate("errorMessage", { file: "Speech Recognition" })}</p>
      )}
    </form>
  );
};

export default SpeechRecognition;
