import React, { useContext } from 'react'
import { AppContext, ContextProps } from 'context/AppContext'
import { User } from 'interfaces/interfaces';
import Router from 'next/router';
import { getUserInfo } from 'context/queries';
import style from '../HeaderLayout/HeaderLayout.module.css';

export default function ProfileButton() {
  const ctx: ContextProps | null = useContext(AppContext);
  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  const handlePermission = async () => {
    const response = await getUserInfo();
    if (response == 500) {
      localStorage.removeItem('token');
      Router.push('/login')
    } else if (ctx.userDetails.userId) {
      Router.push(`/profile/${ctx.userDetails.userId}`);
    }
  }
  return (
    <a onClick={handlePermission} className={style.list}>
      Profil
    </a>
  )
}
