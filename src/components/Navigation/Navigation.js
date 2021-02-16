import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import translate from "../i18nProvider/translate";

const Navigation = () => (
  <nav className={s.wrapper}>
    <NavLink
      exact
      to="/synthesis"
      className={s.link}
      activeClassName={s.activeLink}
    >
      {translate("speechSynthesis")}
    </NavLink>

    <NavLink
      to="/recognition"
      className={s.link}
      activeClassName={s.activeLink}
    >
      {translate("speechRecognition")}
    </NavLink>
  </nav>
);

export default Navigation;
