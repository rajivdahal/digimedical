import React from "react";
import styled from "styled-components";
import phone from "../../assets/phone.png";
import mail from "../../assets/emai.png";
import facebook from "../../assets/facebook.png";
import insta from "../../assets/insta.png";
import twitter from "../../assets/twitter.png";
import line from "../../assets/line.png";
import login from "../../assets/login.png";
import user from "../../assets/user.png";
import NavbarMenuItems from "./NavbarMenuItems";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { notify } from "../../services/notify";
import { useHistory } from "react-router-dom";
// import { logoutyes } from "../common/logoutLoginResponse/logoutLoginResponse";
const Root = styled.div``;

const Heading = styled.div`
  @media screen and (max-width: 1000px) {
    display: none;
  }
  padding: 1.25rem 6.5rem;
  display: flex;
  justify-content: space-between;

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .left-div {
    display: flex;
    align-items: center;
    color: #596579;
  }
  .phone-div {
    display: flex;
    align-items: center;
  }
  .phone-img {
    height: 13px;
  }
  .phone-number-div {
    display: flex;
    flex-direction: column;
    margin-left: 0.528rem;
    font-wight: 400;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.01em;
  }

  ul.phone-number-div li.number h5 {
    display: inline-block;
  }
  .email-div {
    margin-left: 2.063rem;
    font-wight: 400;
    font-size: 13px;
    display: flex;
  }
  //   .email-img: {
  //     height: 10px;
  //   }
  .emergencyService-div {
    margin-left: 1.5rem;
    font-style: normal;

    font-weight: 700;
    font-weight: bold;
    font-size: 14px;
    line-height: 26px;

    letter-spacing: 0.01em;

    color: #2745f0;
  }

  .right-div {
    display: flex;
    align-items: center;
    color: #7b8698;
    justify-content: center;
    font-size: 14px;
    .login {
      margin-left: 0.5rem;
    }
  }
`;
const NavbarContainer = styled.div``;

const Navbar = (props) => {
  let history = useHistory();
  let [isuserloggedin, setisuserloggedin] = useState(null);
  const [logoutstate, setlogoutstate] = useState({
    logout: false,
  });

  const logoutyes = () => {
    localStorage.removeItem("dm-access_token");
    localStorage.removeItem("timeout");
    localStorage.removeItem("dm-refresh_token");
    localStorage.removeItem("status");
    localStorage.removeItem("userid");
    history.push("/login");
    notify.success("Logout success! Please Login again");
  };
  const logoutno = () => {
    setlogoutstate({
      logoutno: true,
    });
  };
  useEffect(() => {
    const isuserlogged = localStorage.getItem("dm-access_token");
    if (isuserlogged) {
      setisuserloggedin(isuserlogged);
    }
  },[]);
  const handlelogout = () => {};
  const Logout = (e) => {
    setlogoutstate({
      logout: true,
    });
  };
  return (
    <Root>
      <Heading>
        <div className="left-div">
          <div className="phone-div">
            <img src={phone} className="phone-img"></img>

            <ul className="phone-number-div">
              <li className="number" style={{ fontSize: "15px" }}>
                +977 9843346605
              </li>
              <li className="number" style={{ fontSize: "15px" }}>
                01 5909141
              </li>
            </ul>
          </div>
          <div className="email-div">
            <img
              src={mail}
              className="email-img"
              style={{ height: "10px" }}
            ></img>
            <span style={{ marginLeft: "0.563rem", fontSize: "15px" }}>
              info@digimedicalsewa.com
            </span>
          </div>
          <div className="emergencyService-div" style={{ fontSize: "15px" }}>
            Emergency service 24/7
          </div>
        </div>
        <div className="right-div">
          <img
            src={facebook}
            style={{ height: "13px", marginRight: "0.5rem" }}
          ></img>
          <img
            src={insta}
            style={{ height: "13px", marginRight: "0.5rem" }}
          ></img>
          <img src={twitter} style={{ height: "13px" }}></img>
          <img
            src={line}
            style={{ width: "1.8px", height: "2rem", marginLeft: "1rem" }}
          ></img>
          {isuserloggedin ? (
            <>
              <Link to="/dashboard/">
                <div style={{ fontSize: "15px" }}>
                  {" "}
                  <img
                    src={user}
                    style={{
                      height: "13px",
                      marginLeft: "1rem",
                      marginRight: "0.5rem",
                    }}
                  ></img>
                  Dashboard
                </div>
              </Link>
              <div
                style={{ color: "blue", cursor: "pointer", fontSize: "15px" }}
                onClick={Logout}
              >
                {" "}
                <img
                  src={login}
                  style={{
                    height: "13px",
                    marginLeft: "1rem",
                    marginRight: "0.5rem",
                  }}
                ></img>
                Logout
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <div className="log-item" style={{ fontSize: "15px" }}>
                  {" "}
                  <img
                    src={login}
                    style={{
                      height: "13px",
                      marginLeft: "1rem",
                      marginRight: "0.5rem",
                    }}
                  ></img>
                  Login
                </div>
              </Link>
              <Link to="/register">
                <div className="log-item" style={{ fontSize: "15px" }}>
                  {" "}
                  <img
                    src={user}
                    style={{
                      height: "13px",
                      marginLeft: "1rem",
                      marginRight: "0.5rem",
                    }}
                  ></img>
                  Sign up{" "}
                </div>
              </Link>
            </>
          )}
          {logoutstate.logout ? (
            <div className="logout-container">
              <div className="logout">
                <p>Are you sure you want to Logout?</p>
                <div className="buttons">
                  <button className="yes-logout" onClick={logoutyes()}>
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
      </Heading>

      <NavbarMenuItems />
    </Root>
  );
};

export default Navbar;
