import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../data/avatar.jpg";
import { Notification, UserProfile } from ".";
import { useStateContext } from "../context/ContextProvider";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const { user, logout } = useAuth();

  // Screen Size in Context
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Active Menus not allowed on small screen
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div
      className="flex items-center justify-between py-4 p-2 md:pl-6 md:pr-6 relative bg-gray-100 dark:bg-slate-800"
      style={{ color: currentColor }}
    >
      {/* Menu SideBar Toggle Button  */}

      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div>
        <Link to="/" className="text-xl font-semibold">
          BIT | Library
        </Link>
      </div>

      {user ? (
        <div className="flex">
          {/* Icons  */}
          <NavButton
            title="Notification"
            dotColor="rgb(254, 201, 15)"
            customFunc={() => handleClick("notification")}
            color={currentColor}
            icon={<RiNotification3Line />}
          />

          {/* Profile Pic  */}

          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user.name}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>

          {isClicked.notification && <Notification />}
          {isClicked.userProfile && <UserProfile />}
        </div>
      ) : (
        <div>
          <Link
            className="text-xl font-semibold"
            style={{ color: currentColor }}
            to="/login"
          >
            Login/Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
