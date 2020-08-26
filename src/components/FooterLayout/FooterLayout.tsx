
import React from "react";
import style from "./FooterLayout.module.css"

const FooterLayout: React.FC = (props) => {
  return <nav className={style.footer}>
    <div className={style.logo}>
      Footer Logo
    </div>
    <ul className={style.listWrap}>
      <li>Info 1</li>
      <li>Info 2</li>
      <li>Info 3</li>
      <li>Info 4</li>
    </ul>
  </nav>
};
export default FooterLayout;
