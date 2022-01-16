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
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { notify } from "../../services/notify";
import { useHistory } from "react-router-dom";
// import { logoutyes } from "../common/logoutLoginResponse/logoutLoginResponse";
const Root = styled.div``;
const Heading = styled.div`
  @media screen and (max-width: 1077px) {
    display: none;
  }
  //   padding: 18px 197.53px 18px 197.53px;
  padding-left: 140px;
  padding-top: 14px;
  padding-right: 140px;
  padding-bottom: 14px;
  display: flex;
  justify-content: space-between;

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

    margin-left: 0.528rem;
    font-wight: 400;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.01em;
  }
  .email-div {
    margin-left: 2.063rem;
    font-wight: 400;
    font-size: 13px;
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
  console.log("props are", props)
  let [isuserloggedin, setisuserloggedin] = useState(null)
  const [logoutstate, setlogoutstate] = useState({
    logout: false,
  })
  
  const logoutyes = () => {
    localStorage.removeItem("dm-access_token")
    localStorage.removeItem("timeout")
    localStorage.removeItem("dm-refresh_token")
    localStorage.removeItem("status")
    localStorage.removeItem("userid")
    history.push('/login')
    notify.success("Logout success! Please Login again")
  }
  const logoutno = () => {
    setlogoutstate({
      logoutno: true
    })
  }
  useEffect(() => {
    const isuserlogged = localStorage.getItem("dm-access_token")
    if (isuserlogged) {
      setisuserloggedin(isuserlogged)
    }
  })
  const handlelogout = () => {

  }
  const Logout = (e) => {
    setlogoutstate({
      logout: true
    })
  }
  return (
    <Root>
      <Heading>
        <div className="left-div">
          <div className="phone-div">
            <img src={phone} className="phone-img"></img>
            <div className="phone-number-div">
              <span style={{ marginRight: "1rem" }}>+977 9843346605</span>
              <span>|</span>
              <span style={{ marginLeft: "1rem" }}>01 5909141</span>
            </div>
          </div>
          <div className="email-div">
            <img
              src={mail}
              className="email-img"
              style={{ height: "10px" }}
            ></img>
            <span style={{ marginLeft: "0.563rem" }}>info@digimedicalsewa.com</span>
          </div>
          <div className="emergencyService-div">Emergency service 24/7</div>
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
          {
            isuserloggedin ?
              <>
                <Link to="/dashboard/">
                  <div>
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
                <div style={{ color: "blue", cursor: "pointer" }} onClick={Logout}>
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
              </> :
              <>
                <Link to="/login">
                  <div>
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
                  <div>
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
          }
          {
            logoutstate.logout ? <div className="logout-container">
              <div className="logout">
                <p>Are you sure you want to Logout?</p>
                <div className="buttons">
                  <button className="yes-logout" onClick={logoutyes()}>Yes</button>
                  <button className="no-logout" onClick={logoutno}>No</button>
                </div>
              </div>
            </div>
              :
              null
          }
        </div>
      </Heading>
      <NavbarMenuItems />
    </Root>
  );
};

export default Navbar;
