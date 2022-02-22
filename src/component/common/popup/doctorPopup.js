import React from "react";
import "./doctorPopup.css";
function doctorPopup(props) {
  return props.trigger ? (
    <div className="doc-pop-main">
      <div className="doc-pop-inner">
        <div className="doc-pop-cont">
          <div className="doc-close-but">
            {" "}
            <button
              className="doc-close-butt"
              onClick={() => props.setTrigger(false)}
            >
              <span id="doc-popup-cross">
                <i class="fas fa-times"></i>
              </span>
            </button>
          </div>
          <div className="doc-pop-form">
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
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="doc-form-input1">
                <label htmlFor="">Appointment Time</label>
                <select name="cars" id="cars" required>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>
            <div className="doc-form-row3">
              <button id="pop-doc-but">Make Appointment</button>
              <div className="doc-form-last-sent">
                <p>We value your privacy. Your details are safe with us.</p>
              </div>
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default doctorPopup;
