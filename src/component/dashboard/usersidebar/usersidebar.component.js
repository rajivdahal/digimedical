import React from 'react'
import { Link } from 'react-router-dom'
import "./usersidebar.component"
import DashboardIcon from '@material-ui/icons/Dashboard';
export default function Usersidebar() {
    return (
        <div >
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <Link to="/dashboard" >
                        <li className="nav-item">
                            <div className="nav-link dashboard-styling" data-toggle="collapse" aria-expanded="false" aria-controls="doctors" style={{ cursor: "pointer" }}>
                                <i className="fas fa-bars menu-icon"></i>
                                {/* <DashboardIcon/>     */}
                                <span className="menu-title" style={{ color: "grey" }}>Dashboard</span>
                            </div>
                        </li>
                    </Link>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#appointment" aria-expanded="false" aria-controls="appointment">
                            <i className="fas fa-user-clock menu-icon"></i>
                            
                            
                            <span className="menu-title">Appointments</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="appointment">
                            <ul className="nav flex-column sub-menu">
                                <Link to="/dashboard/viewappointment">
                                    <li className="nav-item"> <div className="nav-link">View Appointment</div></li>
                                </Link>
                                <Link to="/dashboard/bookappointment">
                                    <li className="nav-item"> <div className="nav-link" >Book Appointment</div></li>
                                </Link>
                            </ul>
                        </div>
                    </li>
                    <Link to="/dashboard/doctors">
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="doctors">
                                <i className="fas fa-user-md  menu-icon"></i>
                                <span className="menu-title" >Doctors</span>
                            </a>
                        </li>
                    </Link>

                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                            <i className="fas fa-money-check-alt menu-icon"></i>
                            <span className="menu-title">Payments</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="auth">
                            <ul className="nav flex-column sub-menu">
                                <Link to="/dashboard/all-payments">
                                    <li className="nav-item"> <a className="nav-link" href=""> All Payments </a></li>
                                </Link>
                                <Link to="/dashboard/add-payments">
                                    <li className="nav-item"> <a className="nav-link" href=""> Add Payment </a></li>
                                </Link>
                                <Link to="/dashboard/invoice">
                                    <li className="nav-item"> <a className="nav-link" href=""> Invoice </a></li>
                                </Link>
                            </ul>
                        </div>
                    </li>
                    <Link to="/dashboard/lab-reports">
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
                            <i className="fas fa-pager menu-icon"></i>
                            <span className="menu-title">Lab reports</span>

                        </a>

                    </li>
                    </Link>
                    <Link to="/dashboard/medical-reports">
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
                            <i className="fas fa-file-medical menu-icon"></i>
                            <span className="menu-title">Medical Reports</span>
                        </a>
                    </li>
                    </Link>

                </ul>
            </nav>
        </div>
    )
}
