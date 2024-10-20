import { useState, createContext } from "react";

export const UserContext = createContext();

const modetoggle=()=>{
  return localStorage.getItem('theme')=='dark' ? false : true
}
const UserProvider = ({ children }) => {
    const [themes,setThemes]=useState(modetoggle())

  return (
    <UserContext.Provider
      value={{
        themes,
        setThemes
    }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;