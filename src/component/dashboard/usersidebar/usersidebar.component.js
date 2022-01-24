import React from "react";
import { Link } from "react-router-dom";
import "./usersidebar.component";
import DashboardIcon from "@material-ui/icons/Dashboard";
import logo from "./../../../assets/logo.png";
import dashavatar from "./../../../assets/avatars.png";
export default function Usersidebar(props) {
  console.log("props in sidebar is", props);
  const navigateLabreport = () => {
    props.props.push("/dashboard/lab-reports");
  };
  const navigateDashboard = () => {
    props.props.push("/dashboard");
  };
  const navigateMedicalreports = () => {
    props.props.push("/dashboard/medical-reports");
  };
  const loadHospitals = () => {
    props.props.push("/dashboard/hospitals");
  };
  const navigateFamilyMember = () => {
    props.props.push("/dashboard/add-member");
  };
  const loadMedicalReport = () => {
    props.props.push("/dashboard/medical-reports");
  };
  return (
    <div>
      <div className="newdash_body">
        <div className="newdash_dash_main" id="show_new_dash">
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
                    Medical Reports
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
