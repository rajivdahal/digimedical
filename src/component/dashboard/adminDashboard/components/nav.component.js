import './../adminDashboard.component.css'

import { useState } from 'react'
import { notify } from '../../../../services/notify'

const Nav = (props) => {

    const [logoutstate, setlogoutstate] = useState({
        logout: false,
    })
    const Logout = (e) => {
        setlogoutstate({
            logout: true
        })
    }
    const logoutyes = () => {
        console.log("inside logout yes")
        localStorage.removeItem("dm-access_token")
        localStorage.removeItem("timeout")
        localStorage.removeItem("dm-refresh_token")
        props.props.push('/login')
        notify.success("Logout success! Please Login again")
    }
    const logoutno = () => {
        setlogoutstate({
            logoutno: true
        })
    }

    return (
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a className="navbar-brand brand-logo mr-5" href="index.html"><img src="/images/dashboard/logo.png" className="mr-2" alt="logo" /></a>
                <a className="navbar-brand brand-logo-mini" href="index.html"><img src="/images/dashboard/logo.png" alt="logo" /></a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">

                <h4 className="font-weight-bold header-color">Welcome Shiva</h4>

                <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item dropdown">
                        <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                            <i className="icon-bell mx-0"></i>
                            <span className="count"></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                            <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                            <a className="dropdown-item preview-item">
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
                            </a>
                            <a className="dropdown-item preview-item">
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
                            </a>
                            <a className="dropdown-item preview-item">
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
                            </a>
                        </div>

                    </li>
                    <li className="nav-item nav-profile dropdown">
                        <a className="nav-link" href="#" data-toggle="dropdown" id="profileDropdown">
                            <img src="/images/dashboard/user1.jpg" alt="profile" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                            <div className="dropdown-item">
                                <i className="ti-settings text-primary"></i>
                                <span>Settings</span>
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

export default Nav;