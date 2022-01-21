import { notify } from "./../../../services/notify";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpClient } from "../../../utils/httpClient";
import dashavatar from "../../../assets/avatars.png";
import "./dashboardnavbar.component.css";
import logo from "../../../assets/logo.png";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
export const Dashboardnavbar = (props) => {
  const [userImage, setImage] = useState("");
  let [username, setusername] = useState("");
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
    props.props.push("/login");
    notify.success("Logout success! Please Login again");
  };
  const logoutno = () => {
    setlogoutstate({
      logoutno: true,
    });
  };
  const gotoProfile = () => {
    props.props.push("/dashboard/settings/userprofile");
  };
  const changepassword = () => {
    props.props.push("/dashboard/settings/change-password");
  };

  const getImage = () => {
    let id = localStorage.getItem("userid");
    let url = REACT_APP_BASE_URL + "download/" + id;
    console.log(url);
    setImage(url);
  };

  useEffect(async () => {
    await httpClient
      .GET("user-profile", false, true)
      .then((resp) => {
        console.log(resp);
        const name = resp.data.data.profileInfo.name;
        setusername(name);
        getImage();
      })
      .catch((err) => {
        notify.error("something went wrong");
      });
  }, []);

  return (
    <>
      <div className="newdash_nav">
        <a className="newdash_hamburger" href="#show_new_dash">
          <i class="fas fa-bars"></i>
        </a>
        <Link to="/">
          <div className="newdash_nav_img">
            <img src={logo} alt="" />
          </div>
        </Link>
        <div className="Welcome_client">
          <p>Welcome {username}</p>
        </div>
        <div className="newdash_user">
          <div className="newdash_user_img">
            <img src={dashavatar} alt="" />
          </div>
          <div className="newdash_user_optionmain">
            {" "}
            <div className="newdash_user_option">
              <div className="newdash_user_option1" onClick={gotoProfile}>
                <div className="newdash_user_icon">
                  <i class="fas fa-user-alt"></i>
                </div>
                <div>
                  <p>Profile</p>
                </div>
              </div>
              <div className="newdash_user_option1" onClick={changepassword}>
                <div className="newdash_user_icon">
                  <i class="fas fa-cog"></i>
                </div>
                <div>
                  <p>Change Password</p>
                </div>
              </div>
              <div className="newdash_user_option1" onClick={Logout}>
                <div className="newdash_user_icon">
                  <i class="fas fa-power-off"></i>
                </div>
                <div>
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
};
