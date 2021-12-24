import { Link } from "react-router-dom"

const Doctorsidebar = (props) => {
  const navigateDashboard = () => {
    props.props.push("/dashboard/")
  }
  return (
    <>

      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <p className="centered mt-3"><div href="profile.html">
          {/* <img className="img-circle user-img-circle img-fluid" width="80" /> */}
        </div></p>
        <ul className="nav">
          <li className="nav-item" onClick={navigateDashboard} style={{ cursor: "pointer" }}>
            <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="doctors">
              <i className="fas fa-bars menu-icon"></i>
              <span className="menu-title">dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <div className="nav-link" data-toggle="collapse" href="#appointment" aria-expanded="false" aria-controls="appointment" style={{cursor:"pointer"}}>
              <i className="icon-layout menu-icon"></i>
              <span className="menu-title">Appointments</span>
              <i className="menu-arrow"></i>
            </div>
            <Link to="/dashboard/viewappointment">
              <div className="collapse" id="appointment">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <div className="nav-link" href="">View Appointment</div></li>
                </ul>
              </div>
            </Link>
          </li>


          <li className="nav-item">
            <div className="nav-link" data-toggle="collapse" href="#patients" aria-expanded="false" aria-controls="patients" style={{cursor:"pointer"}}>
              <i className="icon-grid-2 menu-icon"></i>
              <span className="menu-title">Patients</span>
              <i className="menu-arrow"></i>
            </div>
            <div className="collapse" id="patients">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/all-patients">
                  <li className="nav-item"> <div className="nav-link" href="">All Patients</div></li>
                </Link>

              </ul>
            </div>
          </li>
          {/* <li className="nav-item">
              <div className="nav-link" data-toggle="collapse" href="#rooms" aria-expanded="false" aria-controls="rooms">
                <i className="icon-contract menu-icon"></i>
                <span className="menu-title">Room Allotment</span>
                <i className="menu-arrow"></i>
              </div>
              <div className="collapse" id="rooms">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <div className="nav-link" href="">Alloted Rooms</div></li>
                  <li className="nav-item"> <div className="nav-link" href="">New Rooms</div></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                <i className="icon-head menu-icon"></i>
                <span className="menu-title">Payments</span>
                <i className="menu-arrow"></i>
              </div>
              <div className="collapse" id="auth">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <div className="nav-link" href=""> All Payments </div></li>
                  <li className="nav-item"> <div className="nav-link" href=""> Add Payment </div></li>
                  <li className="nav-item"> <div className="nav-link" href=""> INvoice </div></li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <div className="nav-link" data-toggle="collapse" href="#masterdata" aria-expanded="false" aria-controls="masterdata">
                <i className="icon-layout menu-icon"></i>
                <span className="menu-title">Master Data</span>
                <i className="menu-arrow"></i>
              </div>

              <div className="collapse" id="masterdata">
                <ul className="nav flex-column sub-menu">
                  <Link to="/dashboard/create-services">
                    <li className="nav-item"> <div className="nav-link" href="">Services</div></li>
                  </Link>
                </ul>
              </div>
            </li> */}

        </ul>
      </nav>

    </>
  )
}
export default Doctorsidebar