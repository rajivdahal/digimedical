import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import package_logo from "../../assets/hospital.png";
import { Link } from "react-router-dom";
import "./NavbarMenuItems.css";
import login_signup from "../../component/common/login component/login_signup";
import login from "./../../assets/login.png";
import { useState } from "react";
import { notify } from "../../services/notify";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const [logoutstate, setlogoutstate] = useState({
    logout: false,
  });
  const Logout = (e) => {
    setlogoutstate({
      logout: true,
    });
  };
  const logoutyes = () => {
    localStorage.removeItem("dm-access_token");
    localStorage.removeItem("timeout");
    localStorage.removeItem("dm-refresh_token");
    localStorage.removeItem("status");
    localStorage.removeItem("userid");
    history.push("/login");
    setlogoutstate({
      logout: false,
    });
    notify.success("Logout success! Please Login again");
  };
  const logoutno = () => {
    setlogoutstate({
      logoutno: true,
    });
  };
  return (
    <Root style={{ height: "70px" }} className="root_nav">
      <LogMenuItemsContainor className="logcontainer_nav">
        {/* for mobile view dashboard  */}
        <div class="m-menu">
          <input class="m-menu__toggle" type="checkbox" />
          <div class="m-menu__burger">
            <span></span>
          </div>
          <div class="m-menu__content">
            <nav>
              <h3 id="categories_m-menu">Categories</h3>
              <div className="categories_nav_mob">
                {!localStorage.getItem("dm-access_token") ? (
                  <Link
                    id="link_cat_nav_mob"
                    to="/register"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span>
                      {" "}
                      <i class="fas fa-file-alt"></i> &nbsp;{" "}
                    </span>
                    Register
                  </Link>
                ) : null}

                {!localStorage.getItem("dm-access_token") ? (
                  <Link id="link_cat_nav_mob" to="/login">
                    <div>
                      <span>
                        {" "}
                        <i class="fas fa-sign-in-alt"></i> &nbsp;{" "}
                      </span>
                      Login
                    </div>
                  </Link>
                ) : null}
                {localStorage.getItem("dm-access_token") ? (
                  <Link
                    id="link_cat_nav_mob"
                    to="/dashboard"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span>
                      {" "}
                      <i class="fas fa-th-large"></i> &nbsp;{" "}
                    </span>
                    Dashboard
                  </Link>
                ) : null}
                <Link
                  id="link_cat_nav_mob"
                  to="/services"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <span>
                    {" "}
                    <i class="fas fa-toolbox"></i> &nbsp;{" "}
                  </span>
                  Our Services
                </Link>
                <Link
                  id="link_cat_nav_mob"
                  to="/services"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <span>
                    {" "}
                    <i class="fas fa-toolbox"></i> &nbsp;{" "}
                  </span>
                  For Business
                </Link>
                <Link
                  id="link_cat_nav_mob"
                  to="/services"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <span>
                    {" "}
                    <i class="fas fa-toolbox"></i> &nbsp;{" "}
                  </span>
                  For Family
                </Link>
                <Link
                  id="link_cat_nav_mob"
                  to="/digimedical_doctors"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <span>
                    {" "}
                    <i class="fas fa-user-md"></i> &nbsp;{" "}
                  </span>
                  Our Doctors
                </Link>
                <Link
                  id="link_cat_nav_mob"
                  to="/about"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span>
                    {" "}
                    <i class="fas fa-address-card"></i> &nbsp;{" "}
                  </span>
                  About
                </Link>

                <Link
                  id="link_cat_nav_mob"
                  to="/contact"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  <span>
                    {" "}
                    <i class="fas fa-address-book"></i> &nbsp;{" "}
                  </span>
                  Contact
                </Link>

                {localStorage.getItem("dm-access_token") ? (
                  <div onClick={Logout} id="link_cat_nav_mob">
                    <i class="fas fa-sign-out-alt"></i>
                    <span style={{ color: "#fff" }}>&nbsp; Logout</span>
                  </div>
                ) : null}
                {logoutstate.logout ? (
                  <div className="logout-container1" id="logout_cont">
                    <div className="logout">
                      <p>Are you sure you want to Logout?</p>
                      <div className="buttons">
                        <button className="yes-logout" onClick={logoutyes}>
                          Yes
                        </button>
                        <button className="no-logout" onClick={logoutno}>
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </nav>
          </div>
          <div class="m-menu__backdrop"></div>
        </div>

        <Link to="/">
          <img
            src={logo}
            style={{
              height: "100%",
            }}
          ></img>
        </Link>

        {/* for desktop navbar */}
        <div className="menu">
          {" "}
          <div className="menu-item_nav">
            <Link
              className="link_home_nav"
              to="/services"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Our Services
            </Link>
            <div className="dropdown_hp_content">
              <div className="dropdown_hp_content1">
                <a href="#">
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>Lab Test</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>Doctor at Home</p>{" "}
                </a>

                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>Online Medical Consulation</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>24/7 Nursing Service at Home</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>PCR at Home</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>MRI Service</p>
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>{" "}
                  <p>CT Scan Service</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>{" "}
                  <p>USG Service at Home</p>{" "}
                </a>
                <a href="#">
                  {" "}
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>{" "}
                  <p>USG| ECG | ECHO Service at Home</p>{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="menu-item_nav">
            <Link
              className="link_home_nav"
              to="/services"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              For Business
            </Link>
            <div className="dropdown_hp_content">
              <div className="dropdown_hp_content1">
                <a href="#">
                  <img
                    src={package_logo}
                    style={{
                      height: "1.5rem",
                    }}
                  ></img>
                  <p>Corporate Package</p>{" "}
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
              </div>
            </div>
          </div>
          <div className="menu-item_nav">
            <Link
              className="link_home_nav"
              to="/services"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              For Family
            </Link>
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
              to="/digimedical-doctors"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Our Doctors
            </Link>
          </span>
          <span className="menu-item">
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              About Us
            </Link>
          </span>
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
