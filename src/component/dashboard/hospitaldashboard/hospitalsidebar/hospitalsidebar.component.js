import { Link } from "react-router-dom"
import CoPresentRounded from "@mui/icons-material/CoPresentRounded";

const Hospitalsidebar = (props) => {
  const navigateDashboard = () => {
    // props.props.push("/dashboard/")
    console.log("navbar clicked")
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
            <div className="nav-link" data-toggle="collapse" href="#appointment" aria-expanded="false" aria-controls="appointment" style={{cursor:"pointer"}}>
              <i className="icon-layout menu-icon"></i>
              <span className="menu-title">Appointments</span>
              <i className="menu-arrow"></i>
            </div>
            {/* <Link to="/dashboard/viewappointment"> */}
              <div className="collapse" id="appointment">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <div className="nav-link" href="">View Appointment</div></li>
                </ul>
              </div>
            {/* </Link> */}
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
         

        </ul>
      </nav>
      </div>
    </>
  )
}
export default Hospitalsidebar