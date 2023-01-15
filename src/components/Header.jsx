import React, { useContext, useState } from "react";
import Logo from "../img/logo.png";
import { MdOutlineShoppingCart, MdAdd, MdLogout } from "react-icons/md";
import Avatar from "../img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firbase.config";
import { GlobalContext } from "./Root";
import "./header.css";

const Header = () => {
  const globalContext = useContext(GlobalContext);
  const [showMenu, setShowMenu] = useState(false);

  const firebaseAuth = getAuth(app);
  const authProvider = new GoogleAuthProvider();
  const login = async () => {
    if (localStorage.getItem("user") === null) {
      await signInWithPopup(firebaseAuth, authProvider).then((res) => {
        console.log(res);
        globalContext.setUser(res.user.providerData[0]);
        localStorage.setItem("user", JSON.stringify(res.user.providerData[0]));
      });
    } else {
      setShowMenu(!showMenu);
    }
  };
  let userData = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.clear();
    setShowMenu(!showMenu);
  };

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="fixed z-50 w-screen p-6 px-8 md:p-6 md:px-16">
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
                <MdOutlineShoppingCart className="text-textColor text-2xl cursor-pointer" />
                <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center -top-2 -right-2 absolute">
                  <span className="text-white font-semibold text-xs">2</span>
                </div>
              </div>
              <div className="relative">
                <motion.img
                  whileTap={{ scale: 0.9 }}
                  className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
                  src={
                    localStorage.getItem("user") != null
                      ? userData.photoURL
                      : Avatar
                  }
                  alt={
                    localStorage.getItem("user") != null
                      ? userData.displayName.split(" ", 1)
                      : "LogIn"
                  }
                  onClick={login}
                />
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    className="w-40 bg-gray-50 shadow-lg flex flex-col absolute top-11 right-0"
                  >
                    <Link
                      to={"/createItem"}
                      className="p-3 rounded-t-lg flex items-center justify-center gap-3 cursor-pointer bg-gray-100  hover:bg-cartNumBg hover:text-white transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => {
                        setShowMenu(!showMenu);
                      }}
                    >
                      New Item <MdAdd className="text-2xl" />
                    </Link>
                    <Link
                      className="p-3 rounded-b-lg flex items-center justify-center gap-3 cursor-pointer bg-gray-100 hover:bg-cartNumBg hover:text-white transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={handleLogout}
                    >
                      LogOut <MdLogout className="text-xl" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="flex md:hidden w-full h-full item-center justify-between">
        <section className="flex items-center md:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-7 bg-gray-600"></span>
            <span className="block h-0.5 w-7 bg-gray-600"></span>
            <span className="block h-0.5 w-7 bg-gray-600"></span>
          </div>
          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <Link
                to={"/"}
                onClick={() => setIsNavOpen((prev) => !prev)}
                className="text-base text-textColor hover:text-cartNumBg duration-100 transition-all ease-in-out cursor-pointer"
              >
                Home
              </Link>
              <li className="text-base text-textColor hover:text-cartNumBg duration-100 transition-all ease-in-out cursor-pointer">
                Menu
              </li>
              <li className="text-base text-textColor hover:text-cartNumBg duration-100 transition-all ease-in-out cursor-pointer">
                About Us
              </li>
              <li className="text-base text-textColor hover:text-cartNumBg duration-100 transition-all ease-in-out cursor-pointer">
                Service
              </li>
            </ul>
          </div>
        </section>
        <Link to={"/"} className="flex items-center gap-2 cursor-pointer">
          <img className="w-8 object-cover" src={Logo} alt="logo" />
          <h3 className="text-headingColor text-xl font-bold">City</h3>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.9 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
            src={
              localStorage.getItem("user") != null ? userData.photoURL : Avatar
            }
            alt={
              localStorage.getItem("user") != null
                ? userData.displayName.split(" ", 1)
                : "LogIn"
            }
            onClick={login}
          />
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.2 }}
              className="w-40 bg-gray-50 shadow-lg flex flex-col absolute top-11 right-0"
            >
              <Link
                to={"/createItem"}
                className="p-3 rounded-t-lg flex items-center justify-center gap-3 cursor-pointer bg-gray-100  hover:bg-cartNumBg hover:text-white transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              >
                New Item <MdAdd className="text-2xl" />
              </Link>
              <Link
                className="p-3 rounded-b-lg flex items-center justify-center gap-3 cursor-pointer bg-gray-100 hover:bg-cartNumBg hover:text-white transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={handleLogout}
              >
                LogOut <MdLogout className="text-xl" />
              </Link>
            </motion.div>
          )}
        </div>
        <section
          id="bottom-navigation"
          class="block fixed inset-x-0 bottom-0 z-10 bg-gray-100 shadow p-2"
        >
          <div id="tabs" class="flex justify-center h-10">
            <div className="flex items-center justify-center">
              <MdOutlineShoppingCart className="text-textColor text-3xl cursor-pointer" />
              <div className="w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
                <span className="text-white font-semibold text-md">2</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;
