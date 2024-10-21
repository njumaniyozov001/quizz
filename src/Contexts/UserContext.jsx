import { useState, createContext } from "react";

export const UserContext = createContext();

const modetoggle=()=>{
  return localStorage.getItem('theme')=='dark' ? false : true
}
const UserProvider = ({ children }) => {
    const [themes,setThemes]=useState(modetoggle())
    const [index,setIndex]=useState(null)

  return (
    <UserContext.Provider
      value={{
        themes,
        setThemes,
        index,
        setIndex
    }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;