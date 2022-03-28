// import "./doctordashboard.component.css"
// import { Commonupcomingappointment } from "./../../userdashboard/commonupcomingappointment/commonupcomingappointment.component"
import { useEffect } from "react";
import { useState } from "react";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import { Modal, Button } from "react-bootstrap";
import { TimeandDate } from "../../../../services/timeanddate";
import "./corporatedashboard.component.css";
export const Corporatedashboard = (props) => {
  const [totalappointments, settotalappointments] = useState();
  //   useEffect(() => {
  //     httpClient.GET("doctor/total-appointments", false, true)
  //       .then(resp => {
  //         settotalappointments(resp.data.data.totalAppointments)
  //       })
  //       .catch(err => {
  //         notify.error("Total appointments-unable to fetch")
  //       })
  //   })
  console.log("props are in doctordashboard", props);

  return (
    <div className="fam-package-user-dash ">
      <div className="hospital_bookcont_from_user">
        <div className="corporate-dashboard-main">
          <div className="corporate-dashboard-main1">
            <p id="corp-dash-head-txt">Dashboard</p>
            <div className="corp-dash-date-time">
              <p id="corp-date-time-txt">
                <span></span> Today {TimeandDate.today()}
              </p>
            </div>
          </div>
          <div className="corporate-dashboard-main2">
            <div className="corp-dash-calendar corp-dash-calendar1">
              <div className="corp-calendar-body1">
                <h1>20</h1>
                <div className="corp-calendar-1">
                  <span>
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                </div>
              </div>
              <div className="corp-calendar-bottom">
                <p>Total Pending Appointment</p>
              </div>
            </div>
            <div className="corp-dash-calendar corp-dash-calendar2">
              <div className="corp-calendar-body1">
                <h1>20</h1>
                <div className="corp-calendar-2">
                  <span>
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                </div>
              </div>
              <div className="corp-calendar-bottom">
                <p>Total Cancelled Appointment</p>
              </div>
            </div>
            <div className="corp-dash-calendar corp-dash-calendar3">
              <div className="corp-calendar-body1">
                <h1>20</h1>
                <div className="corp-calendar-3">
                  <span>
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                </div>
              </div>
              <div className="corp-calendar-bottom">
                <p>Total Completed Appointment</p>
              </div>
            </div>
            <div className="corp-dash-calendar corp-dash-calendar4">
              <div className="corp-calendar-body1">
                <h1>20</h1>
                <div className="corp-calendar-4">
                  <span>
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                </div>
              </div>
              <div className="corp-calendar-bottom">
                <p>Total Appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
