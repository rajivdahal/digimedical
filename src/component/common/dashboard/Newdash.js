import React from "react";
import "./Newdash.css";
import logo from "../../../assets/logo.png";
import dashavatar from "../../../assets/avatars.png";

function Newdash() {
  return (
    <div className="newdash_body">
      <div className="newdash_nav">
        <div className="newdash_nav_img">
          <img src={logo} alt="" />
        </div>
        <div className="Welcome_client">
          <p>Welcome Digimedical Client</p>
        </div>
        <div className="newdash_user">
          <div className="newdash_user_img">
            <img src={dashavatar} alt="" />
          </div>
          <div className="newdash_user_optionmain">
            {" "}
            <div className="newdash_user_option">
              <div className="newdash_user_option1">
                <div className="newdash_user_icon">
                  <i class="fas fa-user-alt"></i>
                </div>
                <div>
                  <p>Profile</p>
                </div>
              </div>
              <div className="newdash_user_option1">
                <div className="newdash_user_icon">
                  <i class="fas fa-cog"></i>
                </div>
                <div>
                  <p>Change Password</p>
                </div>
              </div>
              <div className="newdash_user_option1">
                <div className="newdash_user_icon">
                  <i class="fas fa-power-off"></i>
                </div>
                <div>
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="newdash_dash_main">
        <div className="newdash_dash1">
          <div className="newdash_dash1_dashboard">
            <div className="newdash_dash1_cont1">
              <div className="newdash_dash1_cont1p">
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
                <p>View Appointment</p>
                <p>Book Appointment</p>
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
                <p>Book Lab Tests</p>
                <p>My Lab Tests</p>
              </div>
            </div>
          </div>
          <div className="newdash_dash1_dashboard">
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
        </div>
        <div className="newdash_content"></div>
      </div>
    </div>
  );
}

export default Newdash;
