import { Link } from "react-router-dom";
import "./doctorsidebar.component.css";
const Doctorsidebar = (props) => {
  const navigateDashboard = () => {
    props.props.push("/dashboard/");
  };
  return (
    <>
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
                  </p>
                </div>

                <div className="newdash_dash1_cont2">
                  <Link
                    to="/dashboard/viewappointment"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p id="newdash_dash1_cont1p" style={{ cursor: "pointer" }}>
                      View Appointment
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};
export default Doctorsidebar;
