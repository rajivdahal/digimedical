import React from "react";
import login from "../../../assets/login.png";
import user from "../../../assets/user.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import "./login_signup.css";
import { useHistory } from "react-router-dom";
import { notify } from "../../../services/notify";
export default function login_signup() {
  const Navbar = (props) => {
    let history = useHistory();
    console.log("props are", props);
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
    });
    const handlelogout = () => {};
    const Logout = (e) => {
      setlogoutstate({
        logout: true,
      });
    };
    return (
      <div>
        <div className="right-div">
          {isuserloggedin ? (
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
              <div
                style={{ color: "blue", cursor: "pointer" }}
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
          )}
          {logoutstate.logout ? (
            <div className="logout-container">
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
      </div>
    );
  };
}
