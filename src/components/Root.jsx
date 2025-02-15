import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CreateItem from "./CreateItem";
import Header from "./Header";
import MainContainer from "./MainContainer";

const GlobalContext = createContext();

const Root = () => {
  const [user, setUser] = useState();
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      <AnimatePresence mode="wait">
        <BrowserRouter>
          <div className="w-screen h-auto flex flex-col bg-primary">
            <Header />

            <main className="mt-16 px-8 md:px-16 py-4 w-full ">
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
