import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import package_logo from "../../assets/hospital.png";
import { Link, NavLink } from "react-router-dom";
import "./NavbarMenuItems.css";
import login_signup from "../../component/common/login component/login_signup";
import login from "./../../assets/login.png";
import { notify } from "../../services/notify";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../utils/httpClient";

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
  const [corporateType, setCorporateType] = useState([]);
  const [FamilyType, setFamilyType] = useState([]);

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

  const getBusinessPackage = async () => {
    try {
      let resp = await httpClient.GET("master-package/get-types/0");
      console.log(resp);
      if (resp.data.status) {
        setCorporateType(resp.data.data);
      }
    } catch (err) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  };

  const getFamilyPackage = async () => {
    try {
      let resp = await httpClient.GET("master-package/get-types/1");
      if (resp.data.status) {
        setFamilyType(resp.data.data);
      }
    } catch (err) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    getBusinessPackage();
    getFamilyPackage();
  }, []);

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
                    <span>
                      <i class="fas fa-sign-out-alt"></i>
                    </span>
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
        <ul className="menu">
          {" "}
          <li className="menu-item_nav common-menu">
            <Link
              className="link_home_nav"
              to="/services"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Our Services
            </Link>
            <div className="dropdown_hp_content">
              <div className="dropdown_hp_content1">
                <Link to={"/our-services/doctor-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>
                    <p>Doctor at Home</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/online-medical-consultation"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>
                    <p>Online Medical Consulation</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/nursing-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>
                    <p>24/7 Nursing Service at Home</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/labtest-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>
                    <p>Labtest at Home</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/elderly-care-service-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>
                    <p>Elderely Care Service at Home</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/physiotherapy-service-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>
                    <p>Physiotherapy Service at Home</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/dental-care-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>
                    <p>Dental Care at Home</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/minor-procedure-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>
                    <p>Minor Procedure At Home</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/wound-care-and-dressing-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>
                    <p>Wound Care/ Dressing at Home</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/vaccination-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>
                    <p>Vaccination at Home</p>
                  </a>
                </Link>
                <Link to={"/our-services/MRI-and-CT-Scan-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>{" "}
                    <p>MRI/CT Scan Services</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/utility-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>{" "}
                    <p>USG/ ECG/ ECHO Service at Home</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/ambulance-service"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>{" "}
                    <p>Ambulance Services</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/medicine-deliverye"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>{" "}
                    <p>Medicine Delivery</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/alternative-medicine-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>{" "}
                    <p>Alternative Medicine at Home</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/medical-equipment-at-home"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>{" "}
                    <p>Medical Equipment at Home</p>{" "}
                  </a>
                </Link>

                <Link to={"/our-services/helicopter-service"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>{" "}
                    <p>Helicopter Service</p>{" "}
                  </a>
                </Link>
                <Link to={"/our-services/international-hospital-booking"}>
                  <a>
                    {" "}
                    <img
                      src={package_logo}
                      style={{
                        height: "1.5rem",
                      }}
                    ></img>{" "}
                    <p>International Hospital Booking</p>{" "}
                  </a>
                </Link>
              </div>
            </div>
          </li>
          <li className="menu-item common-menu">
            <Link
              to="/forbusiness"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              For Business
            </Link>

            {/* <div className="dropdown_hp_content">
              <div className="dropdown_hp_content1">
                {corporateType.map((item, index) => {
                  return (
                    <>
                      <Link
                        key={index}
                        to={{
                          pathname: "corporate-package",
                          state: { packageId: item.id, packageName: item.name },
                        }}
                      >
                        <img
                          src={package_logo}
                          style={{
                            height: "1.5rem",
                          }}
                        ></img>
                        <p>{item.name}</p>{" "}
                      </Link>
                    </>
                  );
                })}
              </div>
            </div> */}
          </li>
          <li className="menu-item common-menu">
            <Link
              to="/family-package"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              For Family
            </Link>

            {/* <div className="dropdown_hp_content">
              <div className="dropdown_hp_content1">
                {FamilyType.map((item, index) => {
                  return (
                    <>
                      <Link
                        key={index}
                        to={{
                          pathname: "family-package",
                          state: { packageId: item.id, packageName: item.name },
                        }}
                      >
                        <img
                          src={package_logo}
                          style={{
                            height: "1.5rem",
                          }}
                        ></img>
                        <p>{item.name}</p>{" "}
                      </Link>
                    </>
                  );
                })}
              </div>
            </div> */}
          </li>
          <li className="menu-item common-menu">
            <Link
              to="/digimedical-doctors"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Our Doctors
            </Link>
          </li>
          <li className="menu-item common-menu">
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              About Us
            </Link>
          </li>
          <li className="menu-item common-menu">
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Contact
            </Link>
          </li>
        </ul>
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
