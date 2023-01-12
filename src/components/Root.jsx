import React, { createContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

const GlobalContext = createContext();

const Root = () => {
  const [user, setUser] = useState();
  console.log(user);
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export { Root as default, GlobalContext };
