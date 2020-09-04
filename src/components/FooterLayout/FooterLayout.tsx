
import React from "react";
import style from "./FooterLayout.module.css";

const FooterLayout: React.FC = () => {
  return <footer>
    <nav className={style.footer}>
      <div className={style.logo}>
        {/* <img src="#" alt="footer logo" /> */}
      </div>
      <ul className={style.listWrap}>
        <li>Info 1</li>
        <li>Info 2</li>
        <li>Info 3</li>
        <li>Info 4</li>
      </ul>
    </nav>
  </footer>
};
export default FooterLayout;
