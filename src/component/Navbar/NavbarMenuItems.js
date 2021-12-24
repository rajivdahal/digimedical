import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Search from "./Search/Search";

const Root = styled.div`
  background-color: #2745f0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 140px;
  padding-right: 140px;
  //   padding-buttom: 12px;
  //   padding-top: 12px;
`;
const LogMenuItemsContainor = styled.div`
  display: flex;
  align-items: center;

  .menu {
    display: flex;

    margin-left: 5rem;
    color: #fff;
    .menu-item {
      
      margin-left: 1rem;
      font-size: 13px;
      letter-spacing: 0.05em;
      line-height: 26px;
      font-weight: 500;
      font-style: normal;

      &:hover {
        border-bottom: 1px solid #fff;
        // transition: 4s;
    }
   
  }
`;
const Menuitems = styled.div``;
// const SearchContainor = styled.div`
//   background-color: #fff;
//   border-radius: 4px;
//   padding: 0.4rem;
// `;
const NavbarMenuItems = () => {
  return (
    <Root>
      <LogMenuItemsContainor>
        <Link to="/">
          <img
            src={logo}
            style={{
              height: "3.5rem",
            }}
          ></img>
        </Link>
        <div className="menu">
          {" "}
          <span className="menu-item">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home{" "}
            </Link>
          </span>
          <span className="menu-item">
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              About
            </Link>
          </span>
          <span className="menu-item">
            <Link
              to="/services"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Services{" "}
            </Link>
          </span>
          <span className="menu-item">
            <Link
              to="/home-labtest"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Lab Test{" "}
            </Link>
          </span>
          <span className="menu-item">Health Pacakages</span>
          <span className="menu-item">Special Pacakages</span>
          <span className="menu-item">
            {" "}
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Contact
            </Link>
          </span>
        </div>
      </LogMenuItemsContainor>
      <Search />
      {/* <SearchContainor>
        
      </SearchContainor> */}
    </Root>
  );
};

export default NavbarMenuItems;
