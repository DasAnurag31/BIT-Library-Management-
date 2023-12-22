import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";
import {
  FiShoppingBag,
  FiEdit,
  FiPieChart,
  FiBarChart,
  FiCreditCard,
  FiStar,
  FiShoppingCart,
} from "react-icons/fi";
import {
  BsKanban,
  BsBarChart,
  BsBoxSeam,
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
} from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine, RiStockLine } from "react-icons/ri";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { GiLouvrePyramid } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";
import { PiStudent } from "react-icons/pi";

import { ImBooks } from "react-icons/im";
import { IoAdd } from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoNotificationsSharp } from "react-icons/io5";

import avatar from "./avatar.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.jpg";
import product1 from "./product1.jpg";
import product2 from "./product2.jpg";
import product3 from "./product3.jpg";
import product4 from "./product4.jpg";
import product5 from "./product5.jpg";
import product6 from "./product6.jpg";
import product7 from "./product7.jpg";
import product8 from "./product8.jpg";

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const links = [
  {
    title: "books",
    links: [
      {
        name: "explore",
        icon: <ImBooks />,
      },
      {
        name: "add",
        icon: <IoAdd />,
      },
    ],
  },

  {
    title: "users",
    links: [
      {
        name: "students",
        icon: <PiStudent />,
      },
      {
        name: "administrators",
        icon: <GrUserAdmin />,
      },
      {
        name: "members",
        icon: <RiContactsLine />,
      },
    ],
  },
  {
    title: "notifications",
    links: [
      {
        name: "announcement",
        icon: <TfiAnnouncement />,
      },
      {
        name: "notification",
        icon: <IoNotificationsSharp />,
      },
    ],
  },
  {
    title: "analytics",
    links: [
      {
        name: "weekly",
        icon: <AiOutlineStock />,
      },
      {
        name: "monthly",
        icon: <AiOutlineAreaChart />,
      },
    ],
  },
];

export const chatData = [
  {
    image: avatar2,
    message: "Roman Joined the Team!",
    desc: "Congratulate him",
    time: "9:08 AM",
  },
  {
    image: avatar3,
    message: "New message received",
    desc: "Salma sent you new message",
    time: "11:56 AM",
  },
  {
    image: avatar4,
    message: "New Payment received",
    desc: "Check your earnings",
    time: "4:39 AM",
  },
  {
    image: avatar,
    message: "Jolly completed tasks",
    desc: "Assign her new tasks",
    time: "1:12 AM",
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    link: "/profile",
  },
];
