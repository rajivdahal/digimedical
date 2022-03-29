import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./successResponse.css";
import Ramimg from "../../../../../../assets/ram.svg";
import { httpClient } from "../../../../../../utils/httpClient";
import Navbar from "../../../../../Navbar/Navbar";
import Footer from "../../../../../Footer/Footer";
import { Link } from "react-router-dom";

export default function SuccessResponse() {
  const location = useLocation()
  const querryResponse = location.search.split("=")[1]
  const codedQuerryResponse = querryResponse === "fu" ? 2 : 1
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("dm-access_token") ? true : false)
  useEffect(() => {
    httpClient.PUT(`appointment/update-after-payment/${localStorage.getItem("paymentToken")}/${codedQuerryResponse}`, false, false, true)
      .then(resp => {
        console.log("response is", resp)
      })
      .catch(err => {
        console.log("error is", err)
      })
  }, [])
  return (
    <>
      {
        <Navbar></Navbar>
      }
      <div className="hospital_booking">
        <div className="hospital_bookcont_from_user">
          {
            codedQuerryResponse === 1 ? <div className="payment-success-body">
              <div className="pay-suc-check-but">
                <p>
                  <span>
                    <i class="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div className="payment-success-body1">
                <div className="pay-suc-desc">
                  {/* <div className="pay-suc-user-img">
                {" "}
                <img src={Ramimg} alt="" />
              </div> */}
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
                    {
                      localStorage.getItem("dm-access_token") ? <><Link to="/dashboard">Click here</Link> to go dashboard</> : null
                    }
                  </div>
                </div>
              </div>
            </div> :
              <div className="payment-success-body">
                <div className="pay-not-suc-check-but">
                  <p>
                    <span>
                      <i class="fas fa-times"></i>
                    </span>
                  </p>
                </div>
                <div className="payment-success-body1">
                  <div className="pay-suc-desc">
                    {/* <div className="pay-suc-user-img">
              {" "}
              <img src={Ramimg} alt="" />
            </div> */}
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
                      {
                        localStorage.getItem("dm-access_token") ? <><Link to="/dashboard">Click here</Link> to go dashboard</> : null
                      }

                    </div>
                  </div>
                </div>
              </div>
          }
        </div>
      </div>
      {
        <Footer></Footer>
      }
    </>
  );
}
