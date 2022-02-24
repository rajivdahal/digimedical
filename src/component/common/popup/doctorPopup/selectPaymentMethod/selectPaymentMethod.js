import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { selectAppointmentMethod } from "../../../../../actions/hospitalAppointmentBooking.ac";
import esewaLogo from "../../../../../assets/esewa.svg";
export default function SelectPaymentMethod() {
  // Redux implementation
  const dispatch = useDispatch();
  const appointmentBooking = useSelector((state) => state.appointmentBooking);
  const AppointmentMethod = bindActionCreators(
    selectAppointmentMethod,
    dispatch
  );
  console.log("set is appointment fixed is", AppointmentMethod);
  console.log("appointmtment booking status", appointmentBooking);

  const selectEsewa = () => {
    AppointmentMethod("esewa");
  };
  return (
    <div>
      <div className="doc-pop-main">
        <div className="pay-pop-inner">
          <div className="doc-pay-pop">
            <div className="doc-pay-pop-head">
              <p>Payment Partner</p>
              <div className="pay-partner1">
                <img src={esewaLogo} alt="" />
              </div>
            </div>
            <div className="doc-pay-appoint-det1">
              <p id="pay-appoint-det-p">Appointment Detail</p>
              <p id="pay-appoint-det-p">Tue, Janauary 9, 2021</p>
            </div>
            <div className="doc-pay-doc-serv">
              <div className="payapp-det2">
                <p id="pay-doc-choose"> Doctor chosed</p>
                <p id="pay-appoint-det-p2"> Dr. Ram kumar Yadav</p>
              </div>
              <div className="payapp-det2">
                <p id="pay-doc-choose">Service chosed</p>
                <p id="pay-appoint-det-p2">Dermatologists</p>
              </div>
            </div>
            <div className="doc-pay-appoint-det3">
              <p id="pay-appoint-det-p">Choose Checkup Medium</p>
            </div>
            <div className="pay-ctlt-checkbox">
              <div className="ctlt_institute_radio">
                <div className="pay-radio1">
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      id="selectall"
                      name="fav_language"
                      value="allsel"
                    />
                    <label for="html">Get Doctor At Home</label>
                  </div>

                  <p id="pay-appoint-det-p2">Rs.200</p>
                </div>
                <div className="pay-radio1">
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      id="selectall"
                      name="fav_language"
                      value="allsel"
                    />
                    <label for="html">Get Doctor At Home</label>
                  </div>

                  <p id="pay-appoint-det-p2">Rs.200</p>
                </div>
              </div>
            </div>
            <div className="doc-pay-appoint-det4">
              <div className="doc-pay-last-div ">
                <p>Total charge for appoinment</p>
                <p>Rs.000</p>
              </div>

              <div className="popup_lab_cont4_foot pay-last-but">
                <a className="popup_lab_close" style={{ cursor: "pointer" }}>
                  <p>Cancel</p>
                </a>
                <a className="lab_popup_checkout" style={{ cursor: "pointer" }}>
                  <p>Proceed</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
