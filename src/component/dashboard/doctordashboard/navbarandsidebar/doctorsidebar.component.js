import { Link } from "react-router-dom"

const Doctorsidebar = (props) => {
  const navigateDashboard = () => {
    props.props.push("/dashboard/")
  }
  return (
    <>
<div className="newdash_body">
      
      <div className="newdash_dash_main">
        <div className="newdash_dash1">
          <div className="newdash_dash1_dashboard">
            <div className="newdash_dash1_cont1">
              <div className="newdash_dash1_cont1p" onClick={navigateDashboard}  style={{cursor:"pointer"}}>
                <p id="newdash_dash1_cont1p">
                  {" "}
                  <span id="newdash_bar_ico">
                    {" "}
                    <i class="fas fa-bars"></i>
                  </span>{" "}
                  Dashboard
                </p>
              </div>
            </div>
          </div>
          <div className="newdash_dash1_dashboard">
            <div className="newdash_dash1_cont1">
              <div className="newdash_dash1_cont2p">
                {" "}
                <p id="newdash_dash1_cont1p">
                  {" "}
                  <span id="newdash_bar_ico">
                    <i class="fas fa-user-clock"></i>
                  </span>
                  Appointments
                  <span id="newdash_arrow">
                    <i class="fas fa-chevron-right"></i>
                  </span>
                </p>
              </div>

              <div className="newdash_dash1_cont2">
              <Link to="/dashboard/viewappointment" style={{ textDecoration: "none", color: "inherit" }}>
                <p style={{cursor:"pointer"}}>View Appointment</p>
                </Link>
              </div>
            </div>
          </div>
  
        </div>
       
      </div>
    </div>
      {/* <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <p className="centered mt-3"><div href="profile.html">

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
         
        </ul>
      </nav> */}

    </>
  )
}
export default Doctorsidebar