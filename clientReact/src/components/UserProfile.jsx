import React, { useRef } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../context/ContextProvider";
import avatar from "../data/avatar.jpg";
import useClickAway from "../hooks/useClickAway";
import { useAuth } from "../context/AuthProvider";

const UserProfile = () => {
  const { currentColor, setIsClicked, initialState } = useStateContext();
  const userProfileRef = useRef(null);
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const closeUserProfile = () => {
    setIsClicked(initialState);
  };
  useClickAway(userProfileRef, closeUserProfile);

  return (
    <div
      ref={userProfileRef}
      className="nav-item absolute right-4 top-20 bg-gray-100 dark:bg-[#42464D] px-6 pb-4 rounded-lg w-sm"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>

      <div className="flex gap-5 items-center mt-2 border-color border-b-1 pb-2">
        <img
          className="rounded-full h-16 w-16"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {user.name}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {user.role == "user" ? "Student" : "Administrator"}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>

      <div>
        {userProfileData.map((item, index) => (
          <Link to={item.link}>
            <div
              key={index}
              className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className=" text-xl rounded-lg p-3 hover:bg-light-gray"
              >
                {item.icon}
              </button>

              <div>
                <p className="font-semibold dark:text-gray-200 ">
                  {item.title}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {" "}
                  {item.desc}{" "}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div onClick={handleLogout} className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
};

export default UserProfile;
