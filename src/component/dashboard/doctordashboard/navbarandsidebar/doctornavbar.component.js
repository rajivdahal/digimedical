import { useState } from 'react'
import { notify } from '../../../../services/notify'
import { useEffect } from 'react'
import { httpClient } from '../../../../utils/httpClient'
import "./doctornavbar.component.css"
import { Link } from 'react-router-dom'
const Doctornavbar = (props) => {
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
        props.props.push('/login')
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
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <Link to="/">
                    <a className="navbar-brand" href="index.html">
                        <img src="/images/logo/logo4.png" className=" logoimg" alt="logo" />
                    </a>
                </Link>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">

                <h3 className="font-weight-bold welcome-shiva">Welcome Dr. {username}</h3>

                <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item dropdown">
                        <div className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                            {/* <i className="icon-bell mx-0"></i>
                            <span className="count"></span> */}
                        </div>
                        {/* <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                            <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                            <div className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-success">
                                        <i className="ti-info-alt mx-0"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <h6 className="preview-subject font-weight-normal">Application Error</h6>
                                    <p className="font-weight-light small-text mb-0 text-muted">
                                        Just now
                                    </p>
                                </div>
                            </div>
                            <div className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-warning">
                                        <i className="ti-settings mx-0"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <h6 className="preview-subject font-weight-normal">Settings</h6>
                                    <p className="font-weight-light small-text mb-0 text-muted">
                                        Private message
                                    </p>
                                </div>
                            </div>
                            <div className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-info">
                                        <i className="ti-user mx-0"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <h6 className="preview-subject font-weight-normal">New user registration</h6>
                                    <p className="font-weight-light small-text mb-0 text-muted">
                                        2 days ago
                                    </p>
                                </div>
                            </div>
                        </div> */}

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
    )
}

export default Doctornavbar;