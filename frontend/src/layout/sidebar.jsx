import React, { useEffect, useState } from "react";
import Logo from "./../assets/images/logo.png";
import LogoIcon from "./../assets/images/logo-icon.png";
import { Link } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import ErrorIcon from "@mui/icons-material/Error";
import LoginIcon from "@mui/icons-material/Login";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

const Sidebar = ({ isMobileActive }) => {
  const [mobileActive, setMobileActive] = useState(false);
  const [sidebarItems, setSidebarItems] = useState([]);

  useEffect(() => {
    setMobileActive(isMobileActive);
  }, [isMobileActive]);

  useEffect(() => {
    const userRole = localStorage.getItem("role"); 
    debugger// Fetch user role from local storage
    const options = {
      admin: [
        { label: "New Dashboard", path: "/newDashboardDesign", icon: <DashboardCustomizeIcon /> },
        { label: "Users Table", path: "/table", icon: <PeopleAltIcon /> },
        { label: "Users Grid", path: "/grid", icon: <PeopleOutlineIcon /> },
        { label: "User Forms", path: "/formLayout", icon: <DynamicFormIcon /> },
        { label: "Validation Forms", path: "/formValidations", icon: <ErrorIcon /> },
        { label: "Calendar", path: "/calendar", icon: <CalendarMonthIcon /> },
        { label: "Login Page", path: "/login", icon: <LoginIcon /> },
        { label: "Register Page", path: "/register", icon: <HowToRegIcon /> },
        { label: "Profile Setting", path: "/viewProfile", icon: <SettingsIcon /> },
        { label: "Logout", path: "/", action: handleClickLogout },
      ],
      user: [
        {label: "Home", path: "/home", icon: <DashboardCustomizeIcon />},
        { label: "Users Table", path: "/table", icon: <PeopleAltIcon /> },
        { label: "Profile Setting", path: "/viewProfile", icon: <SettingsIcon /> },
        { label: "Logout", path: "/", icon:<LoginIcon/>, action: handleClickLogout , },
      ],
    };

    setSidebarItems(options[userRole] || []);
  }, []);

  const handleClick = () => {
    setMobileActive(!mobileActive);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  return (
    <div>
      <aside className={`sidebar ${mobileActive ? "sidebar-open" : ""}`}>
        <button type="button" className="sidebar-close-btn" onClick={handleClick}>
          <iconify-icon icon="radix-icons:cross-2"></iconify-icon>
        </button>
        <div>
          <a className="sidebar-logo">
            <img src={Logo} alt="site logo" className="light-logo" />
            <img src={Logo} alt="site logo" className="dark-logo" />
            <img src={LogoIcon} alt="site logo" className="logo-icon" />
          </a>
        </div>
        <div className="sidebar-menu-area open">
          <ul className="sidebar-menu show" id="sidebar-menu">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path} onClick={item.action}>
                  <a>
                    {item.icon} <span>{item.label}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
