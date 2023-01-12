import React, { useContext, useState } from "react";
import Logo from "../img/logo.png";
import { MdShoppingCart } from "react-icons/md";
import Avatar from "../img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firbase.config";
import { GlobalContext } from "./Root";

const Header = () => {
  const globalContext = useContext(GlobalContext);

  const firebaseAuth = getAuth(app);
  const authProvider = new GoogleAuthProvider();
  const login = async () => {
    const response = await signInWithPopup(firebaseAuth, authProvider);
    globalContext.setUser(response.user.providerData[0]);
  };

  return (
    <header className="fixed z-50 w-screen p-6 px-16">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full item-center justify-between">
        <Link to={"/"} className="flex items-center gap-2 cursor-pointer">
          <img className="w-8 object-cover" src={Logo} alt="logo" />
          <h3 className="text-headingColor text-xl font-bold">City</h3>
        </Link>
        <div>
          <div className="flex items-center gap-8">
            <ul className="flex items-center gap-8">
              <li className="text-base text-textColor hover:text-cartNumBg duration-100 transition-all ease-in-out cursor-pointer">
                Home
              </li>
              <li className="text-base text-textColor hover:text-cartNumBg duration-100 transition-all ease-in-out cursor-pointer">
                Menu
              </li>
              <li className="text-base text-textColor hover:text-cartNumBg duration-100 transition-all ease-in-out cursor-pointer">
                About Us
              </li>
              <li className="text-base text-textColor hover:text-cartNumBg duration-100 transition-all ease-in-out cursor-pointer">
                Service
              </li>
              <div className="relative flex items-center justify-center">
                <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
                <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center -top-2 -right-2 absolute">
                  <span className="text-white font-semibold text-xs">2</span>
                </div>
              </div>
              <div>
                <motion.img
                  whileTap={{ scale: 0.8 }}
                  className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl"
                  src={Avatar}
                  alt="userProfile"
                  onClick={login}
                />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
