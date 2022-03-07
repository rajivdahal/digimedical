import { useState } from 'react'
import { notify } from '../../../../services/notify'
import { useEffect } from 'react'
import { httpClient } from '../../../../utils/httpClient'
import { useHistory } from 'react-router-dom';
import logo from "../../../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { dashboardClose, dashboardOpen } from "../../../../actions/dashboard.ac";

// import "./hospi.component.css"
import { Link } from 'react-router-dom'
const Hospitalnavbar = (props) => {
    let history = useHistory()
    const dispatch = useDispatch();

    let [username, setusername] = useState("");

    const sidebar = useSelector((state) => state.sidebar);
    const openDashboard = bindActionCreators(dashboardOpen, dispatch);
    const closeDashboard = bindActionCreators(dashboardClose, dispatch);

    const [logoutstate, setlogoutstate] = useState({
        logout: false,
    })
    const Logout = (e) => {
        setlogoutstate({
            logout: true
        })
    }
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
    const changepassword = () => {
        history.push("/dashboard/settings/change-password");
    };

    const showDashboard = () => {
        if (sidebar.isopen) {
            return closeDashboard();
        }
        openDashboard();
    }

    return (
        <>
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
          <p>Welcome Hospital</p>
        </div>
        <div className="newdash_user">
          <div className="newdash_user_img">
            <img
              src="/images/dashboard/user1.jpg"
              alt="profile"
            />
          </div>
          <div className="newdash_user_optionmain">
            {" "}
            <div className="newdash_user_option">
              <div className="newdash_user_option1" >
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
    )
}

export default Hospitalnavbar;