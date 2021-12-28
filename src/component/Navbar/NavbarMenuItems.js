import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Search from "./Search/Search";
import { GiHamburgerMenu } from "react-icons/gi";
const Root = styled.div`
  background-color: #2745f0;
  height: 3.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 140px;
  padding-right: 140px;
  //   padding-buttom: 12px;
  //   padding-top: 12px;
  @media screen and (max-width: 1077px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
const LogMenuItemsContainor = styled.div`
  display: flex;
  align-items: center;
  .logoImage{
    @media screen and (max-width: 1077px) {
      display: none;
      
    }
  }
  
  .hamburgerMenu{
    display:none;
    font-size:1.5rem;
    color:white;
    @media screen and (max-width: 1077px) {
      display: block;
      
    }
  }
  .menu {
    @media screen and (max-width: 1077px) {
      display: none;
      
    }
    display: flex;

    margin-left: 5rem;
    color: #fff;
    @media screen and (max-width: 1155px) {
      margin-left: 0rem;
    }
    
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
        <Link to={"/"}>
        <img
          src={logo}
          className="logoImage"
          style={{
            height: "3.5rem",
          }}
        ></img>
        </Link>
        <GiHamburgerMenu className="hamburgerMenu" />
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
          <Link to="/lab-test" 
           style={{ textDecoration: "none", color: "inherit" }}>
            <span className="menu-item">Lab Test</span>

          </Link>

          <span className="menu-item">Health Packages</span>

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
