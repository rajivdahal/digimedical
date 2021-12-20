import { Link } from "react-router-dom"

const Adminsidebar = (props) => {
  return (
    <div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <p className="centered mt-3"><a href="profile.html">
          {/* <img className="img-circle user-img-circle img-fluid" width="80" /> */}
        </a></p>
        <h4 className="centered mt-5"><b>Admin Dashboard</b></h4>
        <h5 className="centered">Sam Soffes</h5>

        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#dash" aria-expanded="false" aria-controls="dash">
              <i className="icon-grid menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </a>
            <div className="collapse" id="dash">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="">Doctor Dashboard</a></li>
                <li className="nav-item"> <a className="nav-link" href="">Patient Dashboard</a></li>
              </ul>
            </div>
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
            <a className="nav-link" data-toggle="collapse" href="#patients" aria-expanded="false" aria-controls="patients">
              <i className="icon-grid-2 menu-icon"></i>
              <span className="menu-title">Patients</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="patients">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="">All Patients</a></li>
                <li className="nav-item"> <a className="nav-link" href="">Add Patients</a></li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#rooms" aria-expanded="false" aria-controls="rooms">
              <i className="icon-contract menu-icon"></i>
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