import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { setClosePopUp } from "../../../../../../actions/paymentPopUp.ac";
import esewaLogo from "../../../../../../assets/esewa.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { httpClient } from "../../../../../../utils/httpClient";
import { useHistory } from "react-router-dom";
import { notify } from "../../../../../../services/notify";
import { Redirect } from "react-router-dom";
import { formatDate } from "../../../../../../services/timeanddate";
import { resetServicesInfo } from "../../../../../../actions/service.action";

export default function ServicePayment(props) {
  let history = useHistory();

  const [paymentUrl,setPaymentUrl]=useState(null)
  // redux implementation
  const dispatch = useDispatch(props);

  const closeDoctorPopUp = bindActionCreators(setClosePopUp, dispatch);
  const resetService=bindActionCreators(resetServicesInfo,dispatch)
  const popUpActionsData = useSelector((state) => state.paymentPopUp);

  // const closeDoctorPopUp = bindActionCreators(setClosePopUp, dispatch);
  const digiDoctorBooking = useSelector((state) => state.digiServiceBooking);
  const services = useSelector((state) => state.digiServiceBooking);

  console.log("data from store are",services)
  //end of redux implementation

  const [bookedService,setBookedService]  = useState({
    name :"",
    amount : 0,
    id : 0,
    appointmenID: 0,
  })

  const closePaymentPopUp = () => {

    closeDoctorPopUp(true);
    if (props.props) {
      props.props.setTrigger(false);
    }
    resetService(true)
  };

  const getAllServices = () => {
    httpClient.GET("digi-service/get-all")
     .then((resp) => {
      if(resp.data && resp.data.data){
        let services = resp.data.data;
        let selected = services.find((service)=>{
          return digiDoctorBooking.data.digiServiceId === service.id
        })
        let {name,amount,id} = selected;
        setBookedService({
          name: name,
          amount : amount,
          id: id
        })
      }
    });
  };



  useEffect(()=>{
    if(digiDoctorBooking && digiDoctorBooking.data && digiDoctorBooking.data.digiServiceId){
      getAllServices();
    }
  },[digiDoctorBooking])


  const proceed = () => {
    let id = digiDoctorBooking.data.appointmentId;
    console.log("id is",digiDoctorBooking)
    let finalData = {
      paymentStatus: 0,
    };
    httpClient
      .PUT(
        "service-booking/update-payment/" +id,
        finalData,false
      )
      .then((resp) => {
        closeDoctorPopUp(true)
        // if(localStorage.getItem("dm-access_token")){
        //   history.push("/dashboard/viewappointment")
        // }
        notify.success("Appointment Successfully created,Please check your email");
      })

      .catch((err) => {
        notify.error("Error in Appointment Booking");
        // closePaymentPopUp();
      });
  };
  const payNow=()=>{

    let finalData={
      serviceBookingId : digiDoctorBooking.data.appointmentId,
      paymentStatus : 2,
      paymentSource : "esewa"
    }
    httpClient.PUT("generate-payment-link/service-booking",finalData,false,localStorage.getItem("dm-access_token")?true:false)
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
  }

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
                {digiDoctorBooking.data?formatDate(digiDoctorBooking.data.date):"date"}{" "}
                {digiDoctorBooking.data?digiDoctorBooking.data.time:"time"}

              </p>
            </div>
            <div className="doc-pay-appoint-det4">
              <div className="doc-pay-last-div ">
                {/* <p>Total charge for appoinment</p> */}
                <p>{bookedService.name}{"    "}
                  Rs. {bookedService.amount}
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
                <a className="lab_popup_checkout"  onClick={payNow}>
                  <p>Pay now</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
