import { Link } from "react-router-dom"
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import "./nav.component.css"
import CoPresentRounded from "@mui/icons-material/CoPresentRounded";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import VaccinesRoundedIcon from '@mui/icons-material/VaccinesRounded';
import WysiwygRoundedIcon from '@mui/icons-material/WysiwygRounded';

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
              <GridViewRoundedIcon className="dash-icon"> </GridViewRoundedIcon>
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
              <span className="menu-title">Staff</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="staffs">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/staff-table">
                <li className="nav-item"><a className="nav-link" href="">All Staffs</a></li>
                </Link>
                <Link to="/dashboard/create-staff">
                <li className="nav-item"><a className="nav-link" href="">Add Staffs</a></li>
                </Link>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
              {/* <i className="icon-columns menu-icon"></i> */}
              <WysiwygRoundedIcon className="dash-icon"></WysiwygRoundedIcon>
              <span className="menu-title">Master Data</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="doctors">
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
                {/* <Link to="/dashboard/hospital">
                  <li className="nav-item"><a className="nav-link" href="">Hospital</a></li>
                </Link> */}
              </ul>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  )
}
export default Adminsidebar