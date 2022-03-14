import React from "react";
import "./successResponse.css";
import Ramimg from "../../../../../../assets/ram.svg";
export default function SuccessResponse() {
  return (
    <div className="hospital_booking">
      <div className="hospital_bookcont_from_user">
        <div className="payment-success-body">
          <div className="pay-suc-check-but">
            <p>
              <span>
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div className="payment-success-body1">
            <div className="pay-suc-desc">
              <div className="pay-suc-user-img">
                {" "}
                <img src={Ramimg} alt="" />
              </div>
              <div className="pay-suc-desc1">
                <div>
                  <p>Hi Ram,</p>
                  <p>ram1999@gmail.com</p>
                </div>
                <div>
                  <p>Dear ram , Your appointment has been approved.</p>
                </div>
                <div>
                  <p>
                    Appointment name : <span> ENT</span>
                  </p>{" "}
                  <p>
                    Your Doctor : <span>Dr.Hari Bahadur</span>{" "}
                  </p>{" "}
                  <p>
                    Appointment Date/Time : <span>Jan 1 , 2022 / 9:30 am</span>{" "}
                  </p>
                </div>
                <div>
                  {" "}
                  <p>From,</p> <p>Degimedical Team.</p>
                </div>
                <div className="pay-suc-contact">
                  <p>Need any help?</p>
                  <p>Call us on : 9814017327</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="payment-success-body">
          <div className="pay-not-suc-check-but">
            <p>
              <span>
                <i class="fas fa-times"></i>
              </span>
            </p>
          </div>
          <div className="payment-success-body1">
            <div className="pay-suc-desc">
              <div className="pay-suc-user-img">
                {" "}
                <img src={Ramimg} alt="" />
              </div>
              <div className="pay-suc-desc1">
                <div>
                  <p>Hi Ram,</p>
                  <p>ram1999@gmail.com</p>
                </div>
                <div>
                  <p>Dear ram , Your appointment has not been approved.</p>
                </div>

                <div>
                  {" "}
                  <p>From,</p> <p>Degimedical Team.</p>
                </div>
                <div className="pay-suc-contact">
                  <p>Need any help?</p>
                  <p>Call us on : 9814017327</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
