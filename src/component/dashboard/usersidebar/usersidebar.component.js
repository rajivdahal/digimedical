import React from 'react'
import { Link } from 'react-router-dom'
import "./usersidebar.component"
import DashboardIcon from '@material-ui/icons/Dashboard';
export default function Usersidebar(props) {
    console.log("props in sidebar is", props)
    const navigateLabreport = () => {
        props.props.push("/dashboard/lab-reports")
    }
    const navigateDashboard = () => {
        props.props.push("/dashboard")
    }
    const navigateMedicalreports = () => {
        props.props.push("/dashboard/medical-reports")
    }
    const navigateLabtest=()=>{
        props.props.push("/dashboard/lab-test")
    }
    return (
        <div >
            <nav className="sidebar sidebar-offcanvas" id="sidebar">

                <ul className="nav">
                    <li className="nav-item" onClick={navigateDashboard} style={{ cursor: "pointer" }}>
                        <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="doctors">
                            <i className="fas fa-bars menu-icon"></i>
                            <span className="menu-title">Dashboard</span>
                        </a>
                    </li>

                    {/* <li className="nav-item  style-yourself" onClick={navigateDashboard}>
                            <div className="nav-link dashboard-styling" data-toggle="collapse" aria-expanded="false" aria-controls="doctors" style={{ cursor: "pointer" }}>
                                <i className="fas fa-bars menu-icon"></i>
                                <DashboardIcon/>    
                                <span className="menu-title" style={{ color: "grey" }}>Dashboard</span>
                            </div>
                        </li>
                */}
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
                    <li className="nav-item" onClick={navigateLabtest} style={{ cursor: "pointer" }}>
                        <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="doctors">
                            <i className="fas  fa-file-medical menu-icon"></i>
                            <span className="menu-title">Labtest</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#medicalreports" aria-expanded="false" aria-controls="medicalreports">
                        <i className="fas fa-file-medical menu-icon"></i>
                            <span className="menu-title">Medical Reports</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="medicalreports">
                            <ul className="nav flex-column sub-menu">
                                <Link to="/dashboard/lab-reports">
                                    <li className="nav-item"> <a className="nav-link" href="">Lab Reports</a></li>
                                </Link>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
