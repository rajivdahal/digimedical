// import "./doctordashboard.component.css"
// import { Commonupcomingappointment } from "./../../userdashboard/commonupcomingappointment/commonupcomingappointment.component"
import { useEffect } from "react";
import { useState } from "react";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import { Modal, Button } from "react-bootstrap";
import { TimeandDate } from "../../../../services/timeanddate";
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
    <div className="fam-package-user-dash">
      <div className="hospital_bookcont_from_user">
        <h1>Hello</h1>
      </div>
    </div>
  );
};
