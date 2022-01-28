import { notify } from "./../../../services/notify";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpClient } from "../../../utils/httpClient";
import dashavatar from "../../../assets/avatars.png";
import "./dashboardnavbar.component.css";
import logo from "../../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../../actions/User.ac";
import { dashboardClose, dashboardOpen } from "../../../actions/dashboard.ac";

export const Dashboardnavbar = (props) => {
  console.log("store is updates in navbarr");
  let [username, setusername] = useState("");
  const [logoutstate, setlogoutstate] = useState({
    logout: false,
  });
  const user = useSelector((state) => state.user);
  const sidebar = useSelector((state) => state.sidebar);
  console.log("sidebar isssss", sidebar);
  const dispatch = useDispatch();
  const fetchProfileImage = bindActionCreators(loginUser, dispatch);
  const openDashboard = bindActionCreators(dashboardOpen, dispatch);
  const closeDashboard = bindActionCreators(dashboardClose, dispatch);
  console.log("store state is", user);
  const Logout = (e) => {
    console.log("inside logoutttt");
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

  useEffect(async () => {
    console.log("inside useeffect");
    fetchProfileImage();
    await httpClient
      .GET("user-profile", false, true)
      .then((resp) => {
        console.log(resp);
        const name = resp.data.data.profileInfo.name;
        setusername(name);
      })
      .catch((err) => {
        notify.error("something went wrong");
      });
  }, []);
  const showDashboard = () => {
    if (sidebar.isopen) {
      return closeDashboard();
    }
    openDashboard();
  };
  console.log("logoutstate is", logoutstate);
  return (
    <>
      {console.log("rerendered navbar")}
      <div className="newdash_nav">
        <div className="newdash_hamburger" onClick={showDashboard}>
          <i class="fas fa-bars"></i>
        </div>
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
            <img
              src={user.profileImage ? user.profileImage : dashavatar}
              alt=""
            />
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
          <div className="logout-containerr">
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
