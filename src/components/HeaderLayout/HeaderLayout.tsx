import React from "react";
import style from "./HeaderLayout.module.css";
import { Menu, Dropdown } from "antd";
import Link from "next/Link";
import axios from 'axios';
import ProfileButton from '../ProfileButton/ProfileButton';
import Router from "next/router";
const { SubMenu } = Menu;

const HeaderLayout: React.FC = () => {
  const handleClick = async (gender: string, e: any) => {
    Router.push(`/category?gender=${gender}&category=${e.keyPath[0]}`);
  }

  const womensWearMenu = (
    <Menu
      onClick={(e) => handleClick('women', e)}
    >
      <SubMenu
        key="top"
        title="Top"
      >
        <Menu.ItemGroup title="Top">
          <Menu.Item key="bluze">Bluze</Menu.Item>
          <Menu.Item key="hanorace">Hanorac</Menu.Item>
          <Menu.Item key="pulovere">Pulover</Menu.Item>
          <Menu.Item key="tricouri">Tricouri</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu
        key="SubMenu2"
        title="Bottom"
      >
        <Menu.ItemGroup title="Bottom">
          <Menu.Item key="jeans">Jeansuri</Menu.Item>
          <Menu.Item key="pantaloni">Pantaloni</Menu.Item>
          <Menu.Item key="leggings">Leggings</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu
        key="SubMenu3"
        title="Accesorii"
      >
        <Menu.ItemGroup title="Accesorii">
          <Menu.Item key="curele">Curele</Menu.Item>
          <Menu.Item key="portmonee">Portmonee</Menu.Item>
          <Menu.Item key="ceasuri">Ceasuri</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu
        key="SubMenu4"
        title="Lingerie"
      >
        <Menu.ItemGroup title="Lingerie">
          <Menu.Item key="lingerie">Lingerie</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  )
  const mensWearMenu = (
    <Menu
      onClick={(e) => handleClick('men', e)}
    >
      <SubMenu
        key="top"
        title="Top"
      >
        <Menu.ItemGroup title="Top">
          <Menu.Item key="hanorace">Hanorace</Menu.Item>
          <Menu.Item key="pulovere">Pulover</Menu.Item>
          <Menu.Item key="tricouri">Tricouri</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu
        key="SubMenu2"
        title="Bottom"
      >
        <Menu.ItemGroup title="Bottom">
          <Menu.Item key="jeans">Jeans</Menu.Item>
          <Menu.Item key="pantaloni">Pantaloni</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu
        key="SubMenu3"
        title="Accesorii"
      >
        <Menu.ItemGroup title="Accesorii">
          <Menu.Item key="curele">Curele</Menu.Item>
          <Menu.Item key="portmonee">Portmonee</Menu.Item>
          <Menu.Item key="ceasuri">Ceasuri</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu
        key="SubMenu4"
        title="Lingerie"
      >
        <Menu.ItemGroup title="Lingerie">
          <Menu.Item key="lingerie">Lingerie</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  )

  return (
    <header>
      <nav className={style.navigation}>
        <div className={style.logo}>
          <Link href="/">
            <a>Logo</a>
          </Link>
        </div>
        <ul className={style.listWrap}>
          <li>
            <Dropdown overlay={womensWearMenu} placement="bottomLeft">
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Womenswear
            </a>
            </Dropdown>
          </li>
          <li>
            <Dropdown overlay={mensWearMenu} placement="bottomLeft">
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Menswear
            </a>
            </Dropdown>
          </li>
          <li>
            <Link href="/search">
              <a>Search</a>
            </Link></li>
          <li>
            <Link href="/create">
              <a>Sell</a>
            </Link>
          </li>
          <li>
            <ProfileButton />
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

