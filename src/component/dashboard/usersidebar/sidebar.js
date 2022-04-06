import React from "react";
import { Link } from "react-router-dom";
import "./usersidebar.component.css";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { dashboardClose } from "../../../actions/dashboard.ac";
export default function Sidebar(props) {
  let history = useHistory();
  const sidebar = useSelector((state) => state.sidebar);
  const isSidebaropen = sidebar.isopen;
  const navigateDashboard = () => {
    history.push("/dashboard");
  };
  const loadHospitals = () => {
    history.push("/dashboard/hospitals");
    // history.push("/dashboard/hospital-specialist");
  };
  const loadMedicalReport = () => {
    history.push("/dashboard/medical-reports");
  };

  const loadDigiDoctors = () => {
    history.push("/dashboard/digi-doctor");
  };
  const loadBodyCheckup = () => {
    history.push("/dashboard/body-checkup");
  };
  const loadUtilsInfo = () => {
    history.push("/dashboard/utils-info");
  };
  const loadServices = () => {
    history.push("/dashboard/services");
  };
  const loadFamilyPackage = () => {
    history.push("/dashboard/family-package");
  };
  const clickedOutside=()=>{
    setDashboardFalse()
    // console.log("clicked outside")
  }
   // redux implementation for the closing of sidebar on mobile view when clicked outside
   let dispatch=useDispatch()
   let sidebarStatus=useSelector((state)=>state.sidebar)
   let setDashboardFalse=bindActionCreators(dashboardClose,dispatch)
   // end of redux implementation for the closing of sidebar on mobile view when clicked outside
  return (
    <div>
      <div className="newdash_body">
        {
          !isSidebaropen? <div className="newdash_dash_main">
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
                            to="/dashboard/viewappointment"
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
                        {" "}
                        <i class="fas fa-file-medical"></i>
                      </span>
                      Labtest
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/lab-test"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Book Lab Tests</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/view-lab-test"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>My Lab Tests</p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
                <li onClick={loadHospitals} style={{ cursor: "pointer" }}>
                  <p id="newdash_dash1_cont1p">
                    {" "}
                    <span id="newdash_bar_ico">
                      <i class="fas fa-hospital"></i>
                    </span>{" "}
                    Hospitals
                  </p>
                </li>
                <li onClick={loadDigiDoctors} style={{ cursor: "pointer" }}>
                  <p id="newdash_dash1_cont1p">
                    {" "}
                    <span id="newdash_bar_ico">
                      <i class="fas fa-hospital"></i>
                    </span>{" "}
                    Doctors
                  </p>
                </li>
                <li onClick={loadMedicalReport} style={{ cursor: "pointer" }}>
                  <p id="newdash_dash1_cont1p">
                    {" "}
                    <span id="newdash_bar_ico">
                      <i class="fas fa-file-alt"></i>
                    </span>{" "}
                    Update Medical Info
                  </p>
                </li>
                <li onClick={loadBodyCheckup} style={{ cursor: "pointer" }}>
                  <p id="newdash_dash1_cont1p">
                    {" "}
                    <span id="newdash_bar_ico">
                      <i class="fas fa-file-alt"></i>
                    </span>{" "}
                    Load Body Checkup
                  </p>
                </li>
                <li onClick={loadServices} style={{ cursor: "pointer" }}>
                  <p id="newdash_dash1_cont1p">
                    {" "}
                    <span id="newdash_bar_ico">
                      <i class="fas fa-file-alt"></i>
                    </span>{" "}
                    Services
                  </p>
                </li>
              </ul>
            </Accordion>
          </div>
        </div>:



        // {/* mobile view sidebar */}

          <>
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
                      &nbsp;Dashboard
                    </p>
                  </li>
                  <li>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <span id="newdash_bar_ico">
                          <i class="fas fa-user-clock"></i>
                        </span>
                        &nbsp;Appointments
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/viewappointment"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <p style={{ cursor: "pointer" }}>
                                View Appointment
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/bookappointment"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
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
                          {" "}
                          <i class="fas fa-file-medical"></i>
                        </span>
                        &nbsp;Labtest
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/lab-test"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <p style={{ cursor: "pointer" }}>
                                Book Lab Tests
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/view-lab-test"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <p style={{ cursor: "pointer" }}>My Lab Tests</p>
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>
                  <li onClick={loadHospitals} style={{ cursor: "pointer" }}>
                    <p id="newdash_dash1_cont1p">
                      {" "}
                      <span id="newdash_bar_ico">
                        <i class="fas fa-hospital"></i>
                      </span>{" "}
                      &nbsp;Hospitals
                    </p>
                  </li>
                  <li onClick={loadDigiDoctors} style={{ cursor: "pointer" }}>
                    <p id="newdash_dash1_cont1p">
                      {" "}
                      <span id="newdash_bar_ico">
                        <i class="fas fa-hospital"></i>
                      </span>{" "}
                      &nbsp;Doctors
                    </p>
                  </li>
                  <li onClick={loadMedicalReport} style={{ cursor: "pointer" }}>
                    <p id="newdash_dash1_cont1p">
                      {" "}
                      <span id="newdash_bar_ico">
                        <i class="fas fa-file-alt"></i>
                      </span>{" "}
                      &nbsp;Update Medical Info
                    </p>
                  </li>
                  <li onClick={loadBodyCheckup} style={{ cursor: "pointer" }}>
                    <p id="newdash_dash1_cont1p">
                      {" "}
                      <span id="newdash_bar_ico">
                        <i class="fas fa-file-alt"></i>
                      </span>{" "}
                      &nbsp;Load Body Checkup
                    </p>
                  </li>

                  {/* <li>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <span id="newdash_bar_ico">
                          <i class="fas fa-user-clock"></i>
                        </span>
                        &nbsp;Package
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/book-package"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>
                                {" "}
                                Book Package
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/booked-packages"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>
                                {" "}
                                Booked Package
                              </p>
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
             <div style={{position:"absolute",marginLeft:"100px",height:"100vh",width:"40rem"}} onClick={clickedOutside}>
           </div>
           </>
      }

        // {/* mobile view sidebar */}
      </div>
    </div>
  );
}
