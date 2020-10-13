import React, { useContext } from "react";
import style from "./HeaderLayout.module.css";
import { Menu, Dropdown } from "antd";
import Link from "next/link";
import axios from 'axios';
import ProfileButton from '../ProfileButton/ProfileButton';
import Router from "next/router";
import { ContextProps, AppContext } from "context/AppContext";
import { getUserInfo } from "context/queries";
const { SubMenu } = Menu;

const HeaderLayout: React.FC = () => {
  const handleClick = async (gender: string, e) => {
    Router.push(`/category?gender=${gender}&category=${e.keyPath[0]}`);
  }
  const handlePermission = async () => {
    const response = await getUserInfo();
    if (response == 500) {
      localStorage.removeItem('token');
      Router.push('/login')
    } else {
      Router.push(`/create`);
    }
  }
  const handleLogout = async () => {
    localStorage.removeItem('token');
    Router.push('/')
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
            <a className={style.list}>Outfit<span className={style.logoDomain}>.md</span></a>
          </Link>
        </div>
        <ul className={style.listWrap}>
          <li>
            <Dropdown overlay={womensWearMenu} placement="bottomLeft" className={style.list}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                FEMEI
            </a>
            </Dropdown>
          </li>
          <li>
            <Dropdown overlay={mensWearMenu} placement="bottomLeft" className={style.list}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                BARBAȚI
              </a>
            </Dropdown>
          </li>
          <li>
            <Link href="/search">
              <a className={style.list}>Caută</a>
            </Link></li>
          <li>
            <a onClick={handlePermission} className={style.list}>Vinde</a>
          </li>
          <li>
            <ProfileButton />
          </li>
          <li>
            <Link href="/login">
              <a className={style.list}>Login</a>
            </Link>
            /
              <a
              className={style.list}
              onClick={handleLogout}
            >Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default HeaderLayout;

