import { Routes, Route } from "react-router-dom";
import RequireAuthorization from "./components/RequireAuthorization";
import Home from "./pages/Home";
import Verification from "./components/Auth/Verification";
import { useEffect } from "react";
import { useStateContext } from "./context/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { Navbar, Sidebar, ThemeSettings } from "./components";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import "./App.css";
import Explore from "./pages/Books/Explore";
import Add from "./pages/Books/Add";
import Book from "./components/Books/Book";
import EditBook from "./pages/Books/EditBook";
import Announcements from "./pages/Noti/Announcements";
import Notifications from "./pages/Noti/Notifications";
import Monthly from "./pages/Analytics/Monthly";
import Weekly from "./pages/Analytics/Weekly";
import Student from "./pages/Users/Student";
import Administrator from "./pages/Users/Administrator";
import Members from "./pages/Users/Members";
import Notification from "./pages/Noti/Notification";
import Profile from "./pages/Profile";
import StudentDetails from "./pages/Users/StudentDetails";
import MemberDetails from "./pages/Users/MemberDetails";

type Props = {};

const App = (props: Props) => {
  // Context API
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");

    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative bg-white dark:bg-black">
        {/* Theme Setting */}
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <button
            type="button"
            onClick={() => setThemeSettings(true)}
            style={{ background: currentColor, borderRadius: "50%" }}
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <FiSettings />
          </button>
        </div>

        {/* Side Bar  */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}

        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          {/* Navbar */}
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>

          {/* Routes  */}
          <div>
            {themeSettings && <ThemeSettings />}
            <Routes>
              {/* Accessable to All  */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/books/explore" element={<Explore />} />
              <Route path="/books/explore/:bookId" element={<Book />} />

              {/* Authorised to both admin and student  */}
              <Route element={<RequireAuthorization allowedRole={"both"} />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route element={<RequireAuthorization allowedRole={"admin"} />}>
                {/* Admin Accessable Routes  */}
                {/* Books  */}
                <Route path="/books/add" element={<Add />} />
                <Route path="/books/edit/:bookId" element={<EditBook />} />

                {/* Actors  */}
                <Route path="/users/students" element={<Student />} />
                <Route
                  path="/users/students/:id"
                  element={<StudentDetails />}
                />
                <Route
                  path="/users/administrators"
                  element={<Administrator />}
                />
                <Route path="/users/members" element={<Members />} />
                <Route path="/users/members/:id" element={<MemberDetails />} />

                {/* Analytics  */}
                <Route path="/analytics/monthly" element={<Monthly />} />
                <Route path="/analytics/weekly" element={<Weekly />} />

                {/* Notifications  */}
                <Route
                  path="/notifications/announcement"
                  element={<Announcements />}
                />
                <Route
                  path="/notifications/notification"
                  element={<Notifications />}
                />
                <Route
                  path="/notifications/notification/:id"
                  element={<Notification />}
                />
              </Route>

              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
