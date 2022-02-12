import { Link,useHistory } from "react-router-dom"
import CoPresentRounded from "@mui/icons-material/CoPresentRounded";
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
const Hospitalsidebar = (props) => {
  const history=useHistory()
  console.log("props in sidebar is",props)
  const navigateDashboard = () => {
    history.push("/dashboard/")
  }
  return (
    <>
      <div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <p className="centered mt-3"><div href="profile.html">
          {/* <img className="img-circle user-img-circle img-fluid" width="80" /> */}
        </div></p>
        <ul className="nav">
          <li className="nav-item" onClick={navigateDashboard} style={{ cursor: "pointer" }}>
            <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="doctors">
              <i className="fas fa-bars menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link " data-toggle="collapse" href="#appointment" aria-expanded="false" aria-controls="appointment">
            <AssignmentIndOutlinedIcon className="dash-icon "></AssignmentIndOutlinedIcon>
              <span className="menu-title">Appointments</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="appointment">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/hospital-appointment">
                  <li className="nav-item"><a className="nav-link" href="">View Appointment</a></li>
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
                <Link to="/dashboard/hospital-doctor">
                  <li className="nav-item"><a className="nav-link" href="">All Doctors</a></li>
                </Link>
                <Link to="/dashboard/add-doctor">
                  <li className="nav-item"><a className="nav-link" href="">Add Doctors</a></li>
                </Link>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link " data-toggle="collapse" href="#services" aria-expanded="false" aria-controls="services">
              <CoPresentRounded className="dash-icon"></CoPresentRounded>
              <span className="menu-title">Services</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="services">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/hospital-service">
                  <li className="nav-item"><a className="nav-link" href="">Add Services</a></li>
                </Link>

              </ul>
            </div>
          </li>


        </ul>
      </nav>
      </div>
    </>
  )
}
export default Hospitalsidebar