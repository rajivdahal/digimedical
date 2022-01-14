import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import package_logo from "../../assets/hospital.png";
import { Link } from "react-router-dom";
import "./NavbarMenuItems.css";
const Root = styled.div`
  // background-color: #2745F0;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // padding-left: 140px;
  // padding-right: 140px;
  // //   padding-buttom: 12px;
  // //   padding-top: 12px;
`;
const LogMenuItemsContainor = styled.div`
  // display: flex;
  // align-items: center;
  // .menu {
  //   display: flex;
  //   margin-left: 5rem;
  //   color: #fff;
  //   .menu-item {
  //     margin-left: 1rem;
  //     font-size: 13px;
  //     letter-spacing: 0.05em;
  //     line-height: 26px;
  //     font-weight: 500;
  //     font-style: normal;
  //     &:hover {
  //       border-bottom: 1px solid #fff;
  //       // transition: 4s;
  //   }
  // }
`;
const Menuitems = styled.div``;
// const SearchContainor = styled.div`
//   background-color: #fff;
//   border-radius: 4px;
//   padding: 0.4rem;
// `;
const NavbarMenuItems = () => {
  return (
    <Root style={{ height: "60px" }} className="root_nav">
      <LogMenuItemsContainor className="logcontainer_nav">
        <div class="m-menu">
          <input class="m-menu__toggle" type="checkbox" />
          <div class="m-menu__burger">
            <span></span>
          </div>
          <div class="m-menu__content">
            <nav>
              <h3>Categories</h3>
              <div className="categories_nav_mob">
                <Link
                  id="link_cat_nav_mob"
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home{" "}
                </Link>
                <Link
                  id="link_cat_nav_mob"
                  to="/about"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  About
                </Link>
                <Link
                  id="link_cat_nav_mob"
                  to="/services"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Services
                </Link>
                <Link
                  id="link_cat_nav_mob"
                  to="/lab-test"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Lab Test
                </Link>
                <Link
                  id="link_cat_nav_mob"
                  to="/contact"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
          <div class="m-menu__backdrop"></div>
        </div>

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
              to="/lab-test"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Lab Test{" "}
            </Link>
          </span>

          <span className="menu-item">
            <Link
              to="/hospitals"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Hospital{" "}
            </Link>
          </span>

          <div className="menu-item_nav">
            <button className="dropbtn">Health Packages</button>
            <div className="dropdown_hp_content">
              <div className="dropdown_hp_content1">
                <a href="#">
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>Family Care Package</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>Pregnency Care Packages</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>Corporate Care Package</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>School/College Care Package</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>Personal Care Package</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>Child Care Package</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>Parents Care Package</p>
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>{" "}
                  <p>Husband/Wife Care Packages</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>{" "}
                  <p>Husband/Wife Care Packages</p>{" "}
                </a>
              </div>
            </div>
          </div>
          
          <span className="menu-item">
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Contact
            </Link>
          </span>
        </div>
      </LogMenuItemsContainor>
      {/* <div className="nav_search">
        <Search />
      </div> */}
      {/* <SearchContainor>
      </SearchContainor> */}
    </Root>
  );
};
export default NavbarMenuItems;
