
import React from "react";
import style from "./HeaderLayout.module.css";

const HeaderLayout: React.FC = () => {
  return <header >
    <nav className={style.navigation}>
      <div className={style.logo}>
        Logo
      </div>
      <ul className={style.listWrap}>
        <li>Search</li>
        <li>Sell</li>
        <li>Prfile</li>
        <li>Login/Logout</li>
      </ul>
    </nav>
  </header>
};
export default HeaderLayout;
