import React from 'react'
import { Link } from 'react-router-dom'
import "./usersidebar.component"
export default function Usersidebar() {
    return (
        <div >
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
                            <i className="fas fa-bars menu-icon"></i>
                            <span className="menu-title">Dashboard</span>
                        </a>
                    </li>
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
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
                            <i className="fas fa-user-md  menu-icon"></i>
                            <span className="menu-title">Doctors</span>

                        </a>

                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#rooms" aria-expanded="false" aria-controls="rooms">
                            <i className="fas fa-person-booth menu-icon"></i>
                            <span className="menu-title">Room Allotment</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="rooms">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="">Alloted Rooms</a></li>
                                <li className="nav-item"> <a className="nav-link" href="">New Rooms</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                            <i className="fas fa-money-check-alt menu-icon"></i>
                            <span className="menu-title">Payments</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="auth">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href=""> All Payments </a></li>
                                <li className="nav-item"> <a className="nav-link" href=""> Add Payment </a></li>
                                <li className="nav-item"> <a className="nav-link" href=""> INvoice </a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
                            <i className="fas fa-pager menu-icon"></i>
                            <span className="menu-title">Lab reports</span>

                        </a>

                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
                            <i className="fas fa-file-medical menu-icon"></i>
                            <span className="menu-title">Medical Reports</span>
                        </a>

                    </li>

                </ul>
            </nav>
        </div>
    )
}
