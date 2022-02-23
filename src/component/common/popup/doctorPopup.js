import React, { useState } from "react";
import "./doctorPopup.css";
import esewaLogo from "../../../assets/esewa.svg";
// import PayPop from "../../common/popup/paymentpopup/payment";
function DoctorPopup(props) {
  // const [PayPop, SetPayPop] = useState(false);
  const makeAppointment = () => {
    props.setTrigger(false);
  };
  return props.trigger ? (
    <div className="doc-pop-main">
      {/* <div className="doc-pop-inner">
        <div className="doc-pop-cont"> */}
      {/* <div className="doc-close-but">
        {" "}
      
        <button
          className="doc-close-butt"
          onClick={() => props.setTrigger(false)}
        >
          <span id="doc-popup-cross">
            <i class="fas fa-times"></i>
          </span>
        </button>
      </div> */}
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
              <a
                className="popup_lab_close"
                style={{ cursor: "pointer" }}
                onClick={() => props.setTrigger(false)}
              >
                <p>Cancel</p>
              </a>
              <a className="lab_popup_checkout" style={{ cursor: "pointer" }}>
                <p>Proceed</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="doc-pop-form">
            <div className="doc-form-row1">
              <div className="doc-form-input1">
                {" "}
                <label htmlFor="">First Name</label>
                <input type="text" placeholder="Your first name" />
              </div>
              <div className="doc-form-input1">
                {" "}
                <label htmlFor="">Middle Name</label>
                <input type="text" placeholder="Your first name" />
              </div>
              <div className="doc-form-input1">
                {" "}
                <label htmlFor="">Last Name</label>
                <input type="text" placeholder="Your first name" />
              </div>
            </div>
            <div className="doc-form-row2">
              <div className="doc-form-input1">
                {" "}
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Your first name" />
              </div>
              <div className="doc-form-input1">
                {" "}
                <label htmlFor="">Phone No.</label>
                <input type="text" placeholder="Your first name" />
              </div>
            </div>
            <div className="doc-form-row2">
              <div className="doc-form-input1">
                {" "}
                <label htmlFor="">Select Service</label>
                <select name="cars" id="cars" required>
                  <option value="" disabled selected hidden>
                    Select Service
                  </option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="doc-form-input1">
                {" "}
                <label htmlFor="">Select Doctors</label>
                <select name="cars" id="cars" required>
                  <option value="" disabled selected hidden>
                    Select doctor
                  </option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>
            <div className="doc-form-row2">
              <div className="doc-form-input1">
                {" "}
                <label htmlFor="">Appointmemt Date</label>
                <select name="cars" id="cars" required>
                  <option value="" disabled selected hidden>
                    Select doctor
                  </option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="doc-form-input1">
                <label htmlFor="">Appointment Time</label>
                <select name="cars" id="cars" required>
                  <option value="" disabled selected hidden>
                    Select doctor
                  </option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>
            <div className="doc-form-row3">
              {" "}
              <button onClick={() => makeAppointment()} id="pop-doc-but">
                Make Appointment
              </button>
              <div className="doc-form-last-sent">
                <p>We value your privacy. Your details are safe with us.</p>
              </div>
            </div>
          </div> */}
      {props.children}
      {/* </div>
      </div> */}
    </div>
  ) : (
    ""
  );
}

export default DoctorPopup;
