import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import Search from "../../assets/Search.png";
import { Link } from "react-router-dom";
import "./navbarmenu.component.css"
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
    }
  }
`;
const Menuitems = styled.div``;
const SearchContainor = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 0.4rem;
`;
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
          <Link to="/" style={{textDecoration:"none",color:"white"}}><span className="menu-item">Home</span></Link>
          <Link to="/about" style={{textDecoration:"none",color:"white"}}> <span className="menu-item">About</span></Link>
          <Link to="/services" style={{textDecoration:"none",color:"white"}}> <span className="menu-item">Services</span></Link>
          <Link to="/lab-test" style={{textDecoration:"none",color:"white"}}><span className="menu-item">Lab Test</span></Link>
          <Link to="/health-packages" style={{textDecoration:"none",color:"white"}}><span className="menu-item">Health Pacakages</span></Link>
          <Link to="/special-packages" style={{textDecoration:"none",color:"white"}}><span className="menu-item">Special Pacakages</span></Link>
          <Link to="/contact" style={{textDecoration:"none",color:"white"}}> <span className="menu-item">Contact</span></Link>
        </div>
      </LogMenuItemsContainor>

      <SearchContainor>
        <img
          src={Search}
          style={{
            height: "1rem",
          }}
        ></img>
      </SearchContainor>
    </Root>
  );
};

export default NavbarMenuItems;
