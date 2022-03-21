import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {digiDoctorAppointmentFixed,
  digiDoctorInfo,
  resetDigiDoctorState,
  selectedService,
  setPaymentType,
} from "../../../../../../actions/digiDoctorBooking.ac";
import { setClosePopUp } from "../../../../../../actions/paymentPopUp.ac";
import esewaLogo from "../../../../../../assets/esewa.svg";
import { formatDate } from "../../../../../../services/timeanddate";
import CircularProgress from "@mui/material/CircularProgress";
import { httpClient } from "../../../../../../utils/httpClient";
import { useHistory } from "react-router-dom";
import { notify } from "../../../../../../services/notify";
import { Redirect } from "react-router-dom";

export default function DigiDoctorPayment(props) {
  let history = useHistory();
  // NOTE:
  // data from the internal appointment booking component are in props
  // data from the normal speciality doctor booking app are from the store
  // end of note

  console.log("props in digi doctor payment is", props);
  const [isPaymentOnline, setIsPaymentMethodOnline] = useState(false);
  const [paymentUrl,setPaymentUrl]=useState(null)
  // redux implementation
  const dispatch = useDispatch(props);
  const digiDoctorBooking = useSelector(
    (state) => state.digiDoctorAppointmentBooking
  );

  const setServiceType = bindActionCreators(selectedService, dispatch);
  const setDigiDoctorPaymentType = bindActionCreators(setPaymentType, dispatch);
  const closeDoctorPopUp = bindActionCreators(setClosePopUp, dispatch);
  const setDigimedicalDoctorInfo = bindActionCreators(digiDoctorInfo, dispatch);
  const resetDoctorInfo = bindActionCreators(resetDigiDoctorState, dispatch);
  const popUpActionsData = useSelector((state) => state.paymentPopUp);


  const setDigiDoctorAppointment = bindActionCreators(
    digiDoctorAppointmentFixed,
    dispatch
  );
  // const closeDoctorPopUp = bindActionCreators(setClosePopUp, dispatch);

  console.log("store data are", digiDoctorBooking);
  //end of redux implementation

  const closePaymentPopUp = () => {
    closeDoctorPopUp(true);
    if (props.props) {
      props.props.setTrigger(false);
    }
  };
  useEffect(() => {
    if (props.origin == "appointmentBooking") {
      setDigimedicalDoctorInfo(props.directBookAppointmentProps);
      // setDigiDoctorAppointment({date:props.directBookAppointmentProps.appointmentDate,time:props.directBookAppointmentProps.appointmentTime})
    }
  }, []);
  const handleChange = (e, data) => {
    const { value } = e.target;
    console.log("value isss", e, value, data);
    if (value == "home") {
      setDigiDoctorPaymentType("home");
    } else {
      setDigiDoctorPaymentType("online");
    }
    setIsPaymentMethodOnline(true);
    setServiceType(data);
  };
  const proceed = () => {
    if(!digiDoctorBooking.selectedService){
      return notify.error("Please select at least one service")
    }
    let finalData = {
      digiServiceId: digiDoctorBooking.selectedService.digiServiceId,
      paymentStatus: 0,
    };
    // console.log("proceed payment done", digiDoctorBooking);
    httpClient
      .PUT(
        "appointment/after-payment/" +
          digiDoctorBooking.digiDoctorBookingIdAfterBooking,
        finalData
      )
      .then((resp) => {
        resetDoctorInfo(true)
        closeDoctorPopUp(true)
        if(localStorage.getItem("dm-access_token")){
          history.push("/dashboard/viewappointment")
        }
        notify.success("Appointment Successfully created");
      })
      .catch((err) => notify.error("Error in Appointment Booking"));
  };
  const payNow=()=>{
    console.log("pay now ")
    if(!digiDoctorBooking.selectedService){
      return notify.error("Please select at least one service")
    }
    let finalData={
      digiServiceId:digiDoctorBooking.selectedService.digiServiceId,
      paymentStatus: 2,
      appointmentId: digiDoctorBooking.digiDoctorBookingIdAfterBooking
    }
    httpClient.PUT("generate-payment-link",finalData,false,true)
    .then(resp=>{
      let paymentUrl=resp.data.data.paymentUrl
      localStorage.setItem("paymentToken",resp.data.data.token)
      window.location.assign("http://"+paymentUrl,
      // '_blank'
      );
      // closeDoctorPopUp(true)
      // if(localStorage.getItem("dm-access_token")){
      //   history.push("/dashboard/viewappointment")
      // }

    })
    .catch(err=>{
      console.log("error is",err)
    })
    // console.log("finaldata",finalData)
  }
  console.log("payment url is",paymentUrl)
  return (
    <div className="doc-pop-main">
      <div className="pay-pop-inner">
        <div className="doc-pay-pop">

            <div className="doc-pay-pop-head">
              <div className="doc-pay-pop-head-cont">
                <p>Payment Partner</p>
                <div className="pay-partner1-img">
                  <img src={esewaLogo} alt="" />
                </div>
              </div>
            </div>

          <div className="doc-pay-pop-body">
            <div className="doc-pay-appoint-det1">
              <p id="pay-appoint-det-p">Appointment Detail</p>
              <p id="pay-appoint-det-p">
                {/* {formatDate(digiDoctorBooking.digiDoctorAppointmentDate)} */}
              </p>
            </div>
            <div className="doc-pay-doc-serv">
              <div className="payapp-det2">
                <p id="pay-doc-choose"> Doctor chosed</p>
                <p id="pay-appoint-det-p2">
                  {" "}
                  Dr.{" "}
                  {props.origin == "appointmentBooking"
                    ? props.directBookAppointmentProps.doctorName?
                    props.directBookAppointmentProps.doctorName
                    :null
                    : digiDoctorBooking.digiDoctorInfo?
                    digiDoctorBooking.digiDoctorInfo.name
                  :null}
                </p>
              </div>
              <div className="payapp-det2">
                <p id="pay-doc-choose">Service chosed</p>
                <p id="pay-appoint-det-p2">
                  {props.origin != "appointmentBooking"
                    ? digiDoctorBooking.digiDoctorInfo?
                    digiDoctorBooking.digiDoctorInfo.specialist
                    :null
                      ? digiDoctorBooking.digiDoctorInfo?
                      digiDoctorBooking.digiDoctorInfo.specialist
                      :null
                      : "need to update from backend"
                    : props.origin == "appointmentBooking"
                    ? props.directBookAppointmentProps.serviceName
                    : null}
                </p>
              </div>
            </div>
            <div className="doc-pay-appoint-det3">
              <p id="pay-appoint-det-p">Choose Checkup Medium</p>
            </div>
            <div className="pay-ctlt-checkbox">
              <div className="ctlt_institute_radio">
                {props.origin == "appointmentBooking"
                  ? props.directBookAppointmentProps.doctorService.map(
                      (item, index) => {
                        return (
                          <div className="pay-radio1">
                            <div>
                              <div style={{ marginTop: "10px" }}>
                                {" "}
                                <input
                                  type="radio"
                                  id="selectall"
                                  name="fav_language"
                                  value={item.type}
                                  onChange={(e) => handleChange(e, item)}
                                />
                                <label for="html">
                                  &nbsp; Get {item.digiServiceName}
                                </label>
                              </div>
                            </div>

                            <p id="pay-appoint-det-p2">Rs.{item.amount}</p>
                          </div>
                        );
                      }
                    )
                    // starting for digi doctor logged in case
                  : digiDoctorBooking.digiDoctorInfo?
                  digiDoctorBooking.digiDoctorInfo.digiServices.map(
                      (item, index) => {
                        return (
                          <div className="pay-radio1">
                            <div>
                              {" "}
                              <input
                                type="radio"
                                id="selectall"
                                name="fav_language"
                                value={item.type}
                                onChange={(e) => handleChange(e, item)}
                              />
                              <label for="html">
                                Get {item.digiServiceName}
                              </label>
                            </div>

                            <p id="pay-appoint-det-p2">Rs.{item.amount}</p>
                          </div>
                        );
                      }
                    ):null
                    // end for logged in digi doctor booking case
                  }
              </div>
            </div>
            <div className="doc-pay-appoint-det4">
              <div className="doc-pay-last-div ">
                <p>Total charge for appoinment</p>
                <p>
                  Rs.
                  {digiDoctorBooking.selectedService
                    ? digiDoctorBooking.selectedService.amount
                    : "000"}
                </p>
              </div>

              <div className="popup_lab_cont4_foot pay-last-but">
                <a
                  className="popup_lab_close"
                  style={{ cursor: "pointer" }}
                  onClick={closePaymentPopUp}
                >
                  <p>Cancel</p>
                </a>
                <a className="lab_popup_checkout" onClick={proceed}>
                  <p>Proceed</p>
                </a>
                {
                  isPaymentOnline && localStorage.getItem("dm-access_token")?<a className="lab_popup_checkout"  onClick={payNow}>
                  <p>Pay now</p>
                </a>:null
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
