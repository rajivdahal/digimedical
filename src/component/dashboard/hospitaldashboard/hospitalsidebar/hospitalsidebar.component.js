import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import CoPresentRounded from "@mui/icons-material/CoPresentRounded";
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';


const Hospitalsidebar = (props) => {
  const history = useHistory();

  const sidebar = useSelector((state) => state.sidebar);
  const isSidebaropen = sidebar.isopen;

  const navigateDashboard = () => {
    history.push("/dashboard/")


  }
  return (
    <>

      <div className="newdash_body">
        <div className="newdash_dash_main">
          <div className="newdash_dash1">
            <Accordion>
              <ul>
                <li onClick={navigateDashboard} style={{ cursor: "pointer" }}>
                  <p id="newdash_dash1_cont1p">
                    {" "}
                    <span id="newdash_bar_ico">
                      {" "}
                      <i class="fas fa-bars"></i>
                    </span>{" "}
                    Dashboard
                  </p>
                </li>
                <li>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        <i class="fas fa-user-clock"></i>
                      </span>
                      Appointments
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/hospital-appointment"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              View Appointment
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/bookappointment"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              {" "}
                              Book Appointment
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
                <li>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        <i class="fas fa-user-clock"></i>
                      </span>
                      Doctors
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/hospital-doctor"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              All Doctors
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/add-doctor"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              {" "}
                              Add Doctors
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
                {/* <li>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        {" "}
                        <i class="fas fa-file-medical"></i>
                      </span>
                      Services
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/hospital-service"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Add Service</p>
                          </Link>
                        </li>
                        
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li> */}
                
              </ul>
            </Accordion>
          </div>
        </div>

        {/* mobile view sidebar */}
        {isSidebaropen ? (
          <div class="mobile-dashboard">
            <div className="newdash_dash1">
            <Accordion>
              <ul>
                <li onClick={navigateDashboard} style={{ cursor: "pointer" }}>
                  <p id="newdash_dash1_cont1p">
                    {" "}
                    <span id="newdash_bar_ico">
                      {" "}
                      <i class="fas fa-bars"></i>
                    </span>{" "}
                    Dashboard
                  </p>
                </li>
                <li>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        <i class="fas fa-user-clock"></i>
                      </span>
                      Appointments
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/hospital-appointment"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              View Appointment
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/bookappointment"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              {" "}
                              Book Appointment
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
                <li>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        <i class="fas fa-user-clock"></i>
                      </span>
                      Doctors
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/hospital-doctor"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              All Doctors
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/add-doctor"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              {" "}
                              Add Doctors
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
                {/* <li>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        {" "}
                        <i class="fas fa-file-medical"></i>
                      </span>
                      Services
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/hospital-service"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Add Service</p>
                          </Link>
                        </li>
                        
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li> */}
                
              </ul>
            </Accordion>
            </div>
          </div>
        ) : null}

        {/* mobile view sidebar */}
      </div>

      {/* <div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <p className="centered mt-3"><div href="profile.html">
          <img className="img-circle user-img-circle img-fluid" width="80" />
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
      </div> */}
    </>
  )
}
export default Hospitalsidebar