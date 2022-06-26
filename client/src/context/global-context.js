import { createContext, useContext, useEffect, useState } from "react";
import { login_api } from "../API";

export const GlobalContext = createContext(null);
const GlobalContextProvider = ({ children: children_ }) => {
  const [tkn, setTkn] = useState("1");
  const [role, setRole] = useState();
  const [userId, setUserId] = useState();

  return (
    <GlobalContext.Provider
      value={{
        tkn,
        role,
        userId,
        setRole,
        setTkn,
      }}
    >
      {children_}
    </GlobalContext.Provider>
  );
};
export default GlobalContextProvider;

// Helper function
export const useGlobalContext = () => useContext(GlobalContext);
