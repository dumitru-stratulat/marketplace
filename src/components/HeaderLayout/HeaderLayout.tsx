
import React from "react";
import style from "./HeaderLayout.module.css"

const HeaderLayout: React.FC = (props) => {
  return <nav className={style.navigation}>
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
};
export default HeaderLayout;
