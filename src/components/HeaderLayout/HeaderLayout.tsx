import React from "react";
import style from "./HeaderLayout.module.css";
import { Menu, Dropdown } from "antd";
import Link from "next/Link";
import axios from 'axios';
import ProfileButton from '../ProfileButton/ProfileButton';
const { SubMenu } = Menu;

const HeaderLayout: React.FC = () => {
  const handleClick = async (gender: string, e: any) => {
    const response = await axios.get(`https://reactive.loca.lt/category/${gender}/${e.keyPath[0]}`)
    console.log(response)
  }
  const menu = (
    <Menu
      onClick={(e) => handleClick('women', e)}
    >
      <SubMenu
        key="top"
        title="Top"
      >
        <Menu.ItemGroup title="Top">
          <Menu.Item key="bluze">Bluze</Menu.Item>
          <Menu.Item key="setting:2">Hanorace</Menu.Item>
          <Menu.Item key="setting:3">Pulover</Menu.Item>
          <Menu.Item key="setting:4">Tricouri</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu
        key="SubMenu2"
        title="Bottom"
      >
        <Menu.ItemGroup title="Bottom">
          <Menu.Item key="setting:5">Jeans</Menu.Item>
          <Menu.Item key="setting:6">Pantaloni</Menu.Item>
          <Menu.Item key="setting:7">Leggings</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu
        key="SubMenu3"
        title="Accesorii"
      >
        <Menu.ItemGroup title="Accesorii">
          <Menu.Item key="setting:8">Curele</Menu.Item>
          <Menu.Item key="setting:9">Portmonee</Menu.Item>
          <Menu.Item key="setting:10">Leggings</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu
        key="SubMenu4"
        title="Lingerie"
      >
        <Menu.ItemGroup title="Lingerie">
          <Menu.Item key="setting:11">Lingerie</Menu.Item>
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
          <li> <Dropdown overlay={menu} placement="bottomLeft">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Womenswear
            </a>
          </Dropdown>
          </li>
          <li>Search</li>
          <li>Sell</li>
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

