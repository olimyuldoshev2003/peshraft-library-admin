import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import "./Layout.css";

// Images
import logo from "../assets/Logo.svg";

import { GoHome } from "react-icons/go";
import { PiBookOpen, PiUsersThree } from "react-icons/pi";
import { GrNotification } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import SecurityUpdateGoodOutlinedIcon from "@mui/icons-material/SecurityUpdateGoodOutlined";
import { IoMenu } from "react-icons/io5";

const Layout = () => {
  const location = useLocation();
  const [menuMobileSize, setMenuMobileSize] = useState<boolean>(false);

  return (
    <>
      <div className="layout_component flex sm:flex-col md:flex-row relative h-screen">
        {/* Desktop Header */}
        <header className="header bg-[#2262C6] hidden md:flex flex-col justify-between h-screen py-5 sticky top-0 max-w-70">
          <div className="logo_and_nav_block">
            <div className="logo_block flex items-center">
              <img className="w-14 h-14" src={logo} alt="" />
              <Link
                to={"/"}
                className="text-[#FFFFFF] text-[24px] font-400 outline-none"
              >
                Peshraft Library
              </Link>
            </div>
            <nav className="nav mt-5">
              <ul className="nav_list flex flex-col gap-2">
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/" && "border-b-3"}`}
                  to={"/"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <GoHome className="text-white text-[22px]" />
                    <Link
                      className="navigations_name text-white text-[22px] font-500 outline-none"
                      to={"/"}
                    >
                      Dashboard
                    </Link>
                  </li>
                </Link>
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/books" && "border-b-3"}`}
                  to={"/books"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <PiBookOpen className="text-white text-[22px]" />
                    <Link
                      className="navigations_name text-white text-[22px] font-500 outline-none"
                      to={"/books"}
                    >
                      Books
                    </Link>
                  </li>
                </Link>
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/members" && "border-b-3"}`}
                  to={"/members"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <PiUsersThree className="text-white text-[22px]" />
                    <Link
                      className="navigations_name text-white text-[22px] font-500 outline-none"
                      to={"/members"}
                    >
                      Members
                    </Link>
                  </li>
                </Link>
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/borrowed-books" && "border-b-3"}`}
                  to={"/borrowed-books"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <SecurityUpdateGoodOutlinedIcon className="text-white text-[22px]" />
                    <Link
                      className="navigations_name text-white text-[22px] font-500 outline-none"
                      to={"/borrowed-books"}
                    >
                      Borrowed Books
                    </Link>
                  </li>
                </Link>
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/notifications" && "border-b-3"}`}
                  to={"/notifications"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <GrNotification className="text-white text-[22px]" />
                    <Link
                      className="navigations_name text-white text-[22px] font-500 outline-none"
                      to={"/notifications"}
                    >
                      Notification
                    </Link>
                  </li>
                </Link>
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/profile" && "border-b-3"}`}
                  to={"/profile"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <CgProfile className="text-white text-[22px]" />
                    <Link
                      className="navigations_name text-white text-[22px] font-500 outline-none"
                      to={"/profile"}
                    >
                      Profile
                    </Link>
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
          <div className="contact_block">
            <h1 className="contact_title text-white text-[22px] font-500 pl-3 border-b-3 border-white ">
              Contact us
            </h1>
            <div className="contact_info_block p-5 flex flex-col gap-2">
              <div className="number_phone_block flex items-center gap-3">
                <FaPhoneAlt size={19} className="text-white" />
                <Link
                  className="outline-none text-white text-[15px] font-500"
                  to={"tel: (+992) 44 610 1144"}
                >
                  (+992) 44 610 1144
                </Link>
              </div>
              <div className="email_block flex items-center gap-3">
                <MdOutlineEmail size={22} className="text-white " />
                <Link
                  className="outline-none text-white text-[15px] font-500"
                  to={"mailto: peshraftlibrary@gmail.com"}
                >
                  peshraftlibrary@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="block_mobile_size_btn_and_name_of_admin_side md:hidden p-1 flex justify-between items-center gap-5 bg-[#2262C6]">
          <div className="logo_block flex items-center">
            <img className="w-14 h-14" src={logo} alt="" />
            <Link
              to={"/"}
              className="text-[#FFFFFF] text-[20px] font-400 outline-none"
            >
              Peshraft Library
            </Link>
          </div>
          <button
            className="text-white p-2 transition-colors outline-none hover:cursor-pointer"
            onClick={() => setMenuMobileSize(true)}
            aria-label="Open menu"
          >
            <IoMenu size={44} />
          </button>
        </div>

        {/* Overlay */}
        {/* {menuMobileSize && ( */}
        <div
          className={`md:hidden fixed inset-0 opacity-50 z-40 transition-all ${menuMobileSize ? "pointer-events-auto bg-black " : "pointer-events-none bg-none"}`}
          onClick={() => setMenuMobileSize(false)}
        />
        {/* )} */}

        {/* Mobile Header */}
        <header
          className={`fixed md:hidden bg-[#2262C6] flex flex-col justify-between h-screen py-5 top-0 left-0 z-50 max-w-70 transform transition-transform duration-300 ease-in-out ${
            menuMobileSize ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="logo_and_nav_block overflow-y-auto">
            <div className="logo_block flex items-center">
              <img className="w-14 h-14" src={logo} alt="" />
              <Link
                to={"/"}
                className="text-[#FFFFFF] text-[24px] font-400 outline-none"
                onClick={() => setMenuMobileSize(false)}
              >
                Peshraft Library
              </Link>
            </div>
            <nav className="nav mt-5">
              <ul className="nav_list flex flex-col gap-2">
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/" && "border-b-3"}`}
                  onClick={() => setMenuMobileSize(false)}
                  to={"/"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <GoHome className="text-white text-[22px]" />
                    <span className="navigations_name text-white text-[22px] font-500 outline-none">
                      Dashboard
                    </span>
                  </li>
                </Link>
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/books" && "border-b-3"}`}
                  onClick={() => setMenuMobileSize(false)}
                  to={"/books"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <PiBookOpen className="text-white text-[22px]" />
                    <span className="navigations_name text-white text-[22px] font-500 outline-none">
                      Books
                    </span>
                  </li>
                </Link>
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/members" && "border-b-3"}`}
                  onClick={() => setMenuMobileSize(false)}
                  to={"/members"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <PiUsersThree className="text-white text-[22px]" />
                    <span className="navigations_name text-white text-[22px] font-500 outline-none">
                      Members
                    </span>
                  </li>
                </Link>
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/borrowed-books" && "border-b-3"}`}
                  onClick={() => setMenuMobileSize(false)}
                  to={"/borrowed-books"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <SecurityUpdateGoodOutlinedIcon className="text-white text-[22px]" />
                    <span className="navigations_name text-white text-[22px] font-500 outline-none">
                      Borrowed Books
                    </span>
                  </li>
                </Link>
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/notifications" && "border-b-3"}`}
                  onClick={() => setMenuMobileSize(false)}
                  to={"/notifications"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <GrNotification className="text-white text-[22px]" />
                    <span className="navigations_name text-white text-[22px] font-500 outline-none">
                      Notification
                    </span>
                  </li>
                </Link>
                <Link
                  className={`navigations px-3 py-1.5 hover:border-b-3 border-[#D9D9D9] outline-none ${location.pathname === "/profile" && "border-b-3"}`}
                  onClick={() => setMenuMobileSize(false)}
                  to={"/profile"}
                >
                  <li className="navigations_list_item flex items-center gap-2.5">
                    <CgProfile className="text-white text-[22px]" />
                    <span className="navigations_name text-white text-[22px] font-500 outline-none">
                      Profile
                    </span>
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
          <div className="contact_block">
            <h1 className="contact_title text-white text-[22px] font-500 pl-3 border-b-3 border-white ">
              Contact us
            </h1>
            <div className="contact_info_block p-5 flex flex-col gap-2">
              <div className="number_phone_block flex items-center gap-3">
                <FaPhoneAlt size={19} className="text-white" />
                <Link
                  className="outline-none text-white text-[15px] font-500"
                  to={"tel: (+992) 44 610 1144"}
                >
                  (+992) 44 610 1144
                </Link>
              </div>
              <div className="email_block flex items-center gap-3">
                <MdOutlineEmail size={22} className="text-white " />
                <Link
                  className="outline-none text-white text-[15px] font-500"
                  to={"mailto: peshraftlibrary@gmail.com"}
                >
                  peshraftlibrary@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
