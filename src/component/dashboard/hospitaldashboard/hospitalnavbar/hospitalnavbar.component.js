import { useState } from 'react'
import { notify } from '../../../../services/notify'
import { useEffect } from 'react'
import { httpClient } from '../../../../utils/httpClient'
import { useHistory } from 'react-router-dom'
// import "./hospi.component.css"
import { Link } from 'react-router-dom'
const Hospitalnavbar = (props) => {
    let history=useHistory()
    let [username, setusername] = useState("")
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
    const gotoProfile = () => {
        history.push('/dashboard/settings/userprofile')
    }
    const changepassword = () => {
        history.push('/dashboard/settings/change-password')
    }
    return (
        <>
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <Link to="/">
                    <a className="navbar-brand" href="index.html">
                        <img src="/images/logo/logo4.png" className=" logoimg" alt="logo" />
                    </a>
                </Link>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">

                <h3 className="font-weight-bold welcome-shiva">Welcome Hospital</h3>

                <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item dropdown">
                        <div className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                           
                        </div>
                    </li>
                    <li className="nav-item nav-profile dropdown">
                        <div className="nav-link" href="#" data-toggle="dropdown" id="profileDropdown" style={{cursor:"pointer"}}>
                            <img src="/images/dashboard/user1.jpg" alt="profile" />
                        </div>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                            <div className="dropdown-item" onClick={gotoProfile}>
                                <i className="ti-user text-primary"></i>
                                <span>Profile</span>
                            </div>

                            <div className="dropdown-item" onClick={changepassword}>
                                <i className="ti-settings text-primary"></i>
                                <span>Change Password</span>
                            </div>
                            <div className="dropdown-item" onClick={Logout}>
                                <i className="ti-power-off text-primary"></i>
                                <span>Logout</span>
                            </div>


                        </div>
                    </li>
                    {
                        logoutstate.logout ? <div className="logout-container">
                            <div className="logout">
                                <p>Are you sure you want to Logout?</p>
                                <div className="buttons">
                                    <button className="yes-logout" onClick={logoutyes}>Yes</button>
                                    <button className="no-logout" onClick={logoutno}>No</button>
                                </div>
                            </div>
                        </div>
                            :
                            null
                    }

                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span className="icon-menu"></span>
                </button>
            </div>
        </nav>
        </>
    )
}

export default Hospitalnavbar;