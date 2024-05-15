import React, { useState } from "react";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

import { TbHome } from "react-icons/tb";
import { GiCryptEntrance, GiGlassCelebration } from "react-icons/gi";
import { FaRegListAlt } from "react-icons/fa";
import {
  MdOutlineMenuBook,
  MdOutlinePayment,
  MdOutlineAddToPhotos,
} from "react-icons/md";
import { BsCameraReels } from "react-icons/bs";
import { BiCog } from "react-icons/bi";

import "./sidebar.scss";

import logo from "../../assets/logo.png";
const sidebarNav = [
  {
    display: "Login",
    path: "/login",
  },
  {
    display: "HomePage",
    path: "/",
  },
  {
    display: "Weddings",
    path: "/management/weddings",
  },
  {
    display: "Halls",
    path: "/management/halls",
  },
  {
    display: "Menu",
    path: "/management/menu",
  },
  {
    display: "Services",
    path: "/management/services",
  },
  {
    display: "Payment",
    path: "/payment",
  },
  {
    display: "Management",
    path: "/management",
  },
  {
    display: "New Wedding",
    path: "/management/new-Wedding",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div id="sidebar">
        <ProSidebar>
          <Menu iconShape="square">
            <MenuItem
              style={{ textAlign: "center" }}
              className="sidebar-header"
              component={<Link to={sidebarNav[1].path}></Link>}
            >
              <div className="logotext">
                <div className="logo_img">
                  <img src={logo} alt="logo.png" />
                </div>
                <div className="app_name">EDEN ROSE</div>
              </div>
            </MenuItem>
            <MenuItem
              active={pathname === sidebarNav[1].path}
              icon={<TbHome />}
              component={<Link to={sidebarNav[1].path}></Link>}
            >
              Home
            </MenuItem>
            <SubMenu
              icon={<FaRegListAlt />}
              label="Management"
              defaultOpen={pathname.startsWith("/management")}
              component={<Link to={sidebarNav[7].path}></Link>}
              active={pathname === sidebarNav[7].path}
            >
              <MenuItem
                active={pathname === sidebarNav[2].path}
                icon={<GiGlassCelebration />}
                component={<Link to={sidebarNav[2].path}></Link>}
              >
                Weddings
              </MenuItem>
              <MenuItem
                active={pathname === sidebarNav[8].path}
                icon={<MdOutlineAddToPhotos />}
                component={<Link to={sidebarNav[8].path}></Link>}
              >
                New Wedding
              </MenuItem>
              <MenuItem
                active={pathname === sidebarNav[3].path}
                icon={<GiCryptEntrance />}
                component={<Link to={sidebarNav[3].path}></Link>}
              >
                Halls
              </MenuItem>
              <MenuItem
                active={pathname === sidebarNav[4].path}
                icon={<MdOutlineMenuBook />}
                component={<Link to={sidebarNav[4].path}></Link>}
              >
                Menu
              </MenuItem>
              <MenuItem
                active={pathname === sidebarNav[5].path}
                icon={<BsCameraReels />}
                component={<Link to={sidebarNav[5].path}></Link>}
              >
                Services
              </MenuItem>
            </SubMenu>
            <MenuItem
              active={pathname === sidebarNav[6].path}
              icon={<MdOutlinePayment />}
              component={<Link to={sidebarNav[6].path}></Link>}
            >
              Payment
            </MenuItem>

            <MenuItem icon={<BiCog />}>Settings</MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;
