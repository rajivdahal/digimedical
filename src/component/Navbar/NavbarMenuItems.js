import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import Search from "../../assets/Search.png";

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
        <img
          src={logo}
          style={{
            height: "3.5rem",
          }}
        ></img>
        <div className="menu">
          <span className="menu-item">Home</span>
          <span className="menu-item">About</span>
          <span className="menu-item">Services</span>
          <span className="menu-item">Lab Test</span>
          <span className="menu-item">Health Pacakages</span>
          <span className="menu-item">Special Pacakages</span>
          <span className="menu-item">Contact</span>
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
