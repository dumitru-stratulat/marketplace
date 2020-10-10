import React, { useContext, createContext, useState, useEffect } from 'react';
import { getUserInfo } from './queries';
import { User } from 'interfaces/interfaces';

type Props = {
  children: React.ReactNode;
};
export interface ContextProps {
  userDetails: any;
  setUserInfo: () => void
}
export const AppContext = createContext<ContextProps | null>(null)

export const AppProvider = ({ children }: Props) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    setUserInfo()
  }, [])

  const setUserInfo = async () => {
    if (localStorage.getItem('token')) {
      setUserDetails(await getUserInfo());
    }
  };
  return (
    <AppContext.Provider
      value={{
        userDetails,
        setUserInfo
      }}
    >
      {children}
    </AppContext.Provider>
  )

}