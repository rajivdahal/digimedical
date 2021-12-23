import { Link } from "react-router-dom"


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
              <i className="icon-grid menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#appointment" aria-expanded="false" aria-controls="appointment">
              <i className="icon-layout menu-icon"></i>
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
              <i className="icon-layout menu-icon"></i>
              <span className="menu-title">Lab Tests</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="labtest">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/labtest">
                <li className="nav-item"> <a className="nav-link" href="">View Lab Test</a></li>
                </Link>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#doctor" aria-expanded="false" aria-controls="doctor">
              <i className="icon-layout menu-icon"></i>
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
              <i className="icon-bar-graph menu-icon"></i>
              <span className="menu-title">Staff</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="staff">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"><a className="nav-link" href="">All Staff</a></li>
                <li className="nav-item"><a className="nav-link" href="">Add Staff</a></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
              <i className="icon-columns menu-icon"></i>
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
              </ul>
            </div>
          </li>

        </ul>
      </nav>
    </div>
  )
}
export default Adminsidebar