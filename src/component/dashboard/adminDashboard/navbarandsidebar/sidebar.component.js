import { Link } from "react-router-dom"
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CoPresentRounded from "@mui/icons-material/CoPresentRounded";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import VaccinesRoundedIcon from '@mui/icons-material/VaccinesRounded';
import WysiwygRoundedIcon from '@mui/icons-material/WysiwygRounded';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import "./nav.component.css"

const Adminsidebar = (props) => {
  console.log("props in admin sidebar", props)
  const navigatedashboard = () => {
    props.props.push("/dashboard/")
  }
  return (
    <div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <p className="centered mt-3"><a href="profile.html">
        </a></p>
        <ul className="nav">
          <li className="nav-item" onClick={navigatedashboard} style={{cursor:"pointer"}}>
            <a className="nav-link" >
              <DashboardIcon className="dash-icon"></DashboardIcon>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#appointment" aria-expanded="false" aria-controls="appointment">
              <AssignmentIndOutlinedIcon className="dash-icon "></AssignmentIndOutlinedIcon>
              <span className="menu-title">Appointments</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="appointment">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/appointment">
                  <li className="nav-item"> <a className="nav-link" href="">View Appointment</a></li>
                </Link>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#labtest" aria-expanded="false" aria-controls="labtest">
              <VaccinesRoundedIcon className="dash-icon"></VaccinesRoundedIcon>
              <span className="menu-title">View Lab Tests</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="labtest">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/labtest">
                <li className="nav-item"> <a className="nav-link" href="">All Labtest</a></li>
                </Link>
                <Link to="/dashboard/booked-labtest">
                <li className="nav-item"> <a className="nav-link" href="">Booked Labtest</a></li>
                </Link>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link " data-toggle="collapse" href="#doctor" aria-expanded="false" aria-controls="doctor">
              <CoPresentRounded className="dash-icon"></CoPresentRounded>
              <span className="menu-title">Doctors</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="doctor">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/doctor-table">
                  <li className="nav-item"><a className="nav-link" href="">All Doctors</a></li>
                </Link>
                <Link to="/dashboard/create-doctor">
                  <li className="nav-item"><a className="nav-link" href="">Add Doctors</a></li>
                </Link>
              </ul>
            </div>
          </li>


          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#staffs" aria-expanded="false" aria-controls="staffs">
              {/* <i className="icon-bar-graph menu-icon"></i> */}
              <GroupRoundedIcon className="dash-icon"></GroupRoundedIcon>
              <span className="menu-title">User Management</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="staffs">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/role">
                <li className="nav-item"><a className="nav-link" href="">Role</a></li>
                </Link>
                <Link to="/dashboard/admin">
                <li className="nav-item"><a className="nav-link" href="">Admin</a></li>
                </Link>
                <Link to="/dashboard/permission">
                <li className="nav-item"><a className="nav-link" href="">Permission</a></li>
                </Link>
              </ul>
            </div>
          </li>


          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#hospital" aria-expanded="false" aria-controls="hospital">
              {/* <i className="icon-bar-graph menu-icon"></i> */}
              <LocalHospitalIcon className="dash-icon"></LocalHospitalIcon>
              <span className="menu-title">Hospital</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="hospital">
              <ul className="nav flex-column sub-menu">
              <Link to="/dashboard/hospital-table">
                  <li className="nav-item"><a className="nav-link" href="">All Hospitals</a></li>
                </Link>
                <Link to="/dashboard/add-hospital">
                <li className="nav-item"><a className="nav-link" href="">Add Hospital</a></li>
                </Link>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#corporate" aria-expanded="false" aria-controls="corporate">
              <CorporateFareOutlinedIcon className="dash-icon"></CorporateFareOutlinedIcon>
              <span className="menu-title">Corporate</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="corporate">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/corporate">
                <li className="nav-item"><a className="nav-link" href="">Add Corporate</a></li>
                </Link>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#masterdata" aria-expanded="false" aria-controls="masterdata">
              {/* <i className="icon-columns menu-icon"></i> */}
              <WysiwygRoundedIcon className="dash-icon"></WysiwygRoundedIcon>
              <span className="menu-title">Master Data</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="masterdata">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/create-services">
                  <li className="nav-item"> <a className="nav-link" href="">Services</a></li>
                </Link>
                <Link to="/dashboard/lab-test">
                  <li className="nav-item"> <a className="nav-link" href="">Lab Test</a></li>
                </Link>
                <Link to="/dashboard/labtest-subcategory">
                  <li className="nav-item"> <a className="nav-link" href="">Labtest Subcategory</a></li>
                </Link>
                <Link to="/dashboard/add-institute">
                  <li className="nav-item"><a className="nav-link" href="">Medical Institute</a></li>
                </Link>
                
              </ul>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  )
}
export default Adminsidebar