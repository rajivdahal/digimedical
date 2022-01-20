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
    const loadHospitals=()=>{
        props.props.push("/dashboard/hospitals")
    }
    const navigateFamilyMember=()=>{
        props.props.push("/dashboard/add-member")
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
                        <a className="nav-link" data-toggle="collapse" href="#labreports" aria-expanded="false" aria-controls="labreports">
                        <i className="fas fa-file-medical menu-icon"></i>
                            <span className="menu-title">Lab Tests</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="labreports">
                            <ul className="nav flex-column sub-menu">
                                <Link to="/dashboard/lab-test">
                                    <li className="nav-item"> <a className="nav-link" href="">Book Lab Tests</a></li>
                                </Link>
                            </ul>
                            <ul className="nav flex-column sub-menu">
                                <Link to="/dashboard/view-lab-test">
                                    <li className="nav-item"> <a className="nav-link" href="">My Lab Tests</a></li>
                                </Link>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item"  style={{ cursor: "pointer" }} onClick={loadHospitals}>
                        <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="doctors">
                        <i class="fas fa-hospital menu-icon"></i>
                            <span className="menu-title">Hospitals</span>
                        </a>
                    </li>
                    {/* <li className="nav-item" onClick={navigateFamilyMember} style={{ cursor: "pointer" }}>
                        <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="doctors">
                            <i class="fas fa-people-carry menu-icon"></i>
                            <span className="menu-title">Add Family Member</span>
                        </a>
                    </li> */}
                </ul>
            </nav>
        </div>
    )
}
