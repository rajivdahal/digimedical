import { useState } from 'react'
import { notify } from '../../../../services/notify'
import { useEffect } from 'react'
import { httpClient } from '../../../../utils/httpClient'
import { useHistory } from 'react-router-dom';
import logo from "./../../../../assets/logo.png"
import dashavatar from "./../../../../assets/avatars.png";
import { Link } from 'react-router-dom';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const Corporatenavbar = (props) => {
  let history = useHistory()

  let [username, setusername] = useState("");
  let id = localStorage.getItem("userid");
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
  useEffect(() => {
    httpClient.GET("user-profile", false, true)
      .then(resp => {
        console.log(resp)
        const name = resp.data.data.profileInfo.name
        setusername(name)
      })
      .catch(err => {
        notify.error("something went wrong")
      })
  })
  const gotoProfile = () => {
    props.props.push('/dashboard/settings/userprofile')
  }
  const changepassword = () => {
    props.props.push('/dashboard/settings/change-password')
  }

  return (

    <div className="newdash_nav">
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
          <img src={dashavatar} className=" logoimg" alt="logo" />

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

  )
}

export default Corporatenavbar;