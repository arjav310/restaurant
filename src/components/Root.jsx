import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CreateItem from "./CreateItem";
import Header from "./Header";
import MainContainer from "./MainContainer";

const GlobalContext = createContext();

const Root = () => {
  const [user, setUser] = useState();
  console.log(user);
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      <AnimatePresence exitBeforeEnter>
        <BrowserRouter>
          <div className="w-screen h-auto flex flex-col bg-primary">
            <Header />
            <main className="mt-24 p-8 w-full">
              <Routes>
                <Route path="/*" element={<MainContainer />} />
                <Route path="/createItem" element={<CreateItem />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AnimatePresence>
    </GlobalContext.Provider>
  );
};

export { Root as default, GlobalContext };
