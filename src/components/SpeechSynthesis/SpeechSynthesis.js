import { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import s from "../../App.module.css";

import { useIntl } from "react-intl";
import translate from "../i18nProvider/translate";

const SpeechSynthesis = () => {
  const intl = useIntl();
  const [text, setText] = useState();
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(null);

  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  const voice = voices[voiceIndex] || null;

  return (
    <form className={s.form}>
      <h2 className={s.formTitle}>{translate("speechSynthesis")}</h2>
      {supported ? (
        <>
          <ul className={s.formSettingList}>
            <li className={s.formSettingListItem}>
              <label htmlFor="voice" className={s.formLabel}>
                {translate("voice")}
              </label>
              <select
                className={s.formSelect}
                id="voice"
                name="voice"
                value={voiceIndex || ""}
                onChange={(event) => {
                  setVoiceIndex(event.target.value);
                }}
              >
                <option value="" disabled>
                  Default
                </option>
                {voices.map((option, index) => (
                  <option key={option.voiceURI} value={index}>
                    {`${option.lang} - ${option.name}`}
                  </option>
                ))}
              </select>
            </li>
            <li className={s.formSettingListItem}>
              <label htmlFor="rate">
                {translate("rate")}
                <div className={s.rateValue}>{rate}</div>
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  defaultValue="5"
                  step="1"
                  id="rate"
                  onChange={(event) => {
                    setRate(event.target.value);
                  }}
                />
              </label>
            </li>
            <li className={s.formSettingListItem}>
              <label htmlFor="pitch">
                {translate("pitch")}
                <div className={s.pitchValue}>{pitch}</div>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  defaultValue="1"
                  step="0.1"
                  id="pitch"
                  onChange={(event) => {
                    setPitch(event.target.value);
                  }}
                />
              </label>
            </li>
          </ul>
          <div className={s.textareaWrapper}>
            <label htmlFor="message" className={s.message}>
              {translate("message")}
              <textarea
                className={s.textarea}
                id="message"
                placeholder={intl.formatMessage({
                  id: "synthesisPlaceholder",
                })}
                name="message"
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
            </label>
            {speaking ? (
              <button className={s.formButton} type="button" onClick={cancel}>
                {translate("stopBtn")}
              </button>
            ) : (
              <button
                className={s.formButton}
                type="button"
                onClick={() => speak({ text, voice, rate, pitch })}
              >
                {translate("speakBtn")}
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <p className={s.formError}>
            {translate("errorMessage", { file: "Speech Synthesis" })}
          </p>
        </>
      )}
    </form>
  );
};

export default SpeechSynthesis;
