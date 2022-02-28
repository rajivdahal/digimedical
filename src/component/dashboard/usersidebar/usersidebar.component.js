import React from "react";
import { Link } from "react-router-dom";
import "./usersidebar.component.css";
import { useSelector } from "react-redux";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import Accordion from "react-bootstrap/Accordion";

export default function Usersidebar(props) {
  console.log("props in sidebar is", props);
  const sidebar = useSelector((state) => state.sidebar);
  const isSidebaropen = sidebar.isopen;
  console.log("is sidebar open or not", isSidebaropen);
  const navigateDashboard = () => {
    props.props.push("/dashboard");
  };
  const loadHospitals = () => {
    props.props.push("/dashboard/hospitals");
    // props.props.push("/dashboard/hospital-specialist");
  };
  const loadMedicalReport = () => {
    props.props.push("/dashboard/medical-reports");
  };

  const loadDigiDoctors = () => {
    props.props.push("/dashboard/digi-doctor");
  };
  const loadBodyCheckup = () => {
    props.props.push("/dashboard/body-checkup");
  };
  const loadUtilsInfo = () => {
    props.props.push("/dashboard/utils-info");
  };
  const loadServices = () => {
    props.props.push("/dashboard/services");
  };
  return (
    <div>
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
                        Labtest
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
                </ul>
              </Accordion>
            </div>
          </div>
        ) : null}

        {/* mobile view sidebar */}
      </div>
    </div>
  );
}
