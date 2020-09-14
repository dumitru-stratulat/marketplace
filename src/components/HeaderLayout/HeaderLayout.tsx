import React from "react";
import style from "./HeaderLayout.module.css";
import Link from "next/link";

const HeaderLayout: React.FC = () => {
  return (
    <header>
      <nav className={style.navigation}>
        <div className={style.logo}>
          <Link href="/">
            <a>Logo</a>
          </Link>
        </div>
        <ul className={style.listWrap}>
          <li>Search</li>
          <li>Sell</li>
          <li>
            <Link href="/profile/[id]" as="/profile/1">
              <a>Profil</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
            /
            <Link href="/signup">
              <a>Logout</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default HeaderLayout;
