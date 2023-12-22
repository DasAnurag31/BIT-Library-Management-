import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useClickAway from "../hooks/useClickAway";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useClickAway(sidebarRef, closeSidebar);

  return (
    <div className="relative">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link to="/" className="text-lg font-semibold">
              BIT|Library
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isSidebarOpen ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16m-7 6h7"></path>
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav
            className={`lg:flex ${
              isSidebarOpen ? "hidden" : "hidden lg:block"
            }`}
          >
            <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-300 transition duration-300 ease-in-out focus:outline-none"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/auth/login"
                      onClick={closeSidebar}
                      className="hover:text-gray-300 transition duration-300 ease-in-out"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/auth/registration"
                      onClick={closeSidebar}
                      className="hover:text-gray-300 transition duration-300 ease-in-out"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Sidebar for Mobile View (On the Right) */}
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="fixed top-0 right-0 h-screen w-1/2 bg-gray-800 text-white p-4"
        >
          <ul className="flex flex-col space-y-2">
            {user ? (
              <li>
                <button onClick={handleLogout} className="hover:text-gray-300">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/auth/login" className="hover:text-gray-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/auth/registration" className="hover:text-gray-300">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
