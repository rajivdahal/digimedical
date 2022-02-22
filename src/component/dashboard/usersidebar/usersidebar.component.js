import React from "react";
import { Link } from "react-router-dom";
import "./usersidebar.component.css";
import { useSelector } from "react-redux";
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';

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
  };
  const loadMedicalReport = () => {
    props.props.push("/dashboard/medical-reports");
  };

  const loadDigiDoctors=()=>{
    props.props.push("/dashboard/digi-doctor");
  }
  const loadBodyCheckup = () => {
    props.props.push("/dashboard/body-checkup");
  };
  const loadUtilsInfo=()=>{
    props.props.push("/dashboard/utils-info");
  }
  const loadServices=()=>{
    props.props.push("/dashboard/services")
  }
  return (
    <div>
      <div className="newdash_body">
        <div className="newdash_dash_main">
          <div className="newdash_dash1">
            <div className="newdash_dash1_dashboard">
              <div className="newdash_dash1_cont1">
                <div
                  className="newdash_dash1_cont1p"
                  onClick={navigateDashboard}
                  style={{ cursor: "pointer" }}
                >
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
                  <Link
                    to="/dashboard/viewappointment"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p style={{ cursor: "pointer" }}>View Appointment</p>
                  </Link>
                  <Link
                    to="/dashboard/bookappointment"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p style={{ cursor: "pointer" }}> Book Appointment</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="newdash_dash1_dashboard">
              <div className="newdash_dash1_cont1">
                <div className="newdash_dash1_cont2p">
                  <p id="newdash_dash1_cont1p">
                    {" "}
                    <span id="newdash_bar_ico">
                      {" "}
                      <i class="fas fa-file-medical"></i>
                    </span>{" "}
                    Labtest
                    <span id="newdash_arrow">
                      <i class="fas fa-chevron-right"></i>
                    </span>
                  </p>
                </div>
                <div className="newdash_dash1_cont2">
                  <Link
                    to="/dashboard/lab-test"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p style={{ cursor: "pointer" }}>Book Lab Tests</p>
                  </Link>
                  <Link
                    to="/dashboard/view-lab-test"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p style={{ cursor: "pointer" }}>My Lab Tests</p>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="newdash_dash1_dashboard"
              onClick={loadHospitals}
              style={{ cursor: "pointer" }}
            >
              <div className="newdash_dash1_cont1">
                <div className="newdash_dash1_cont1p">
                  {" "}
                  <p id="newdash_dash1_cont1p">
                    <span id="newdash_bar_ico">
                      <i class="fas fa-hospital"></i>
                    </span>{" "}
                    Hospitals
                  </p>
                </div>
              </div>
            </div>

            <div
              className="newdash_dash1_dashboard"
              onClick={loadDigiDoctors}
              style={{ cursor: "pointer" }}
            >
              <div className="newdash_dash1_cont1">
                <div className="newdash_dash1_cont1p">
                  {" "}
                  <p id="newdash_dash1_cont1p">
                    <span id="newdash_bar_ico">
                      <i class="fas fa-hospital"></i>
                    </span>{" "}
                    Doctors
                  </p>
                </div>
              </div>
            </div>

            <div
              className="newdash_dash1_dashboard"
              onClick={loadMedicalReport}
              style={{ cursor: "pointer" }}
            >
              <div className="newdash_dash1_cont1">
                <div className="newdash_dash1_cont1p">
                  {" "}
                  <p id="newdash_dash1_cont1p">
                    <span id="newdash_bar_ico">
                      <i class="fas fa-file-alt"></i>
                    </span>{" "}
                    Update Medical Info
                  </p>
                </div>
              </div>

            </div>
            <div
              className="newdash_dash1_dashboard"
              onClick={loadUtilsInfo}
              style={{ cursor: "pointer" }}
            >
              <div className="newdash_dash1_cont1">
                <div className="newdash_dash1_cont1p">
                  {" "}
                  <p id="newdash_dash1_cont1p">
                    <span id="newdash_bar_ico">
                      <i class="fas fa-file-alt"></i>
                    </span>{" "}
                    Update Utils Info
                  </p>
                </div>
              </div>

            </div>
            <div
              className="newdash_dash1_dashboard"
              onClick={loadServices}
              style={{ cursor: "pointer" }}
            >
              <div className="newdash_dash1_cont1">
                <div className="newdash_dash1_cont1p">
                  {" "}
                  <p id="newdash_dash1_cont1p">
                    <span id="newdash_bar_ico">
                      <i class="fas fa-file-alt"></i>
                    </span>{" "}
                    Services
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* mobile view sidebar */}
        {isSidebaropen ? (
          <div class="mobile-dashboard">
            <div className="newdash_dash1">
              <div className="newdash_dash1_dashboard">
                <div className="newdash_dash1_cont1">
                  <div
                    className="newdash_dash1_cont1p"
                    onClick={navigateDashboard}
                    style={{ cursor: "pointer" }}
                  >
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
                    <Link
                      to="/dashboard/viewappointment"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <p style={{ cursor: "pointer" }}>View Appointment</p>
                    </Link>
                    <Link
                      to="/dashboard/bookappointment"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <p style={{ cursor: "pointer" }}> Book Appointment</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="newdash_dash1_dashboard">
                <div className="newdash_dash1_cont1">
                  <div className="newdash_dash1_cont2p">
                    <p id="newdash_dash1_cont1p">
                      {" "}
                      <span id="newdash_bar_ico">
                        {" "}
                        <i class="fas fa-file-medical"></i>
                      </span>{" "}
                      Labtest
                      <span id="newdash_arrow">
                        <i class="fas fa-chevron-right"></i>
                      </span>
                    </p>
                  </div>
                  <div className="newdash_dash1_cont2">
                    <Link
                      to="/dashboard/lab-test"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <p style={{ cursor: "pointer" }}>Book Lab Tests</p>
                    </Link>
                    <Link
                      to="/dashboard/view-lab-test"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <p style={{ cursor: "pointer" }}>My Lab Tests</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="newdash_dash1_dashboard"
                onClick={loadHospitals}
                style={{ cursor: "pointer" }}
              >
                <div className="newdash_dash1_cont1">
                  <div className="newdash_dash1_cont1p">
                    {" "}
                    <p id="newdash_dash1_cont1p">
                      <span id="newdash_bar_ico">
                        <i class="fas fa-hospital"></i>
                      </span>{" "}
                      Hospitals
                    </p>
                  </div>
                </div>
              </div>

              <div
              className="newdash_dash1_dashboard"
              onClick={loadDigiDoctors}
              style={{ cursor: "pointer" }}
            >
              <div className="newdash_dash1_cont1">
                <div className="newdash_dash1_cont1p">
                  {" "}
                  <p id="newdash_dash1_cont1p">
                    <span id="newdash_bar_ico">
                      <i class="fas fa-hospital"></i>
                    </span>{" "}
                    Doctors
                  </p>
                </div>
              </div>
            </div>

              <div
                className="newdash_dash1_dashboard"
                onClick={loadMedicalReport}
                style={{ cursor: "pointer" }}
              >
                <div className="newdash_dash1_cont1">
                  <div className="newdash_dash1_cont1p">
                    {" "}
                    <p id="newdash_dash1_cont1p">
                      <span id="newdash_bar_ico">
                        <i class="fas fa-file-alt"></i>
                      </span>{" "}
                      Update Medical Info
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="newdash_dash1_dashboard"
                onClick={loadBodyCheckup}
                style={{ cursor: "pointer" }}
              ></div>
            </div>
          </div>
        ) : null}

        {/* mobile view sidebar */}
      </div>
    </div>
  );
}
