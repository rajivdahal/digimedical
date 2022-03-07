import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { resetHospitalDoctorState, selectAppointmentMethod, selectHospitalDoctorPaymentMethod, setHospitalDoctorService } from '../../../../../../actions/hospitalAppointmentBooking.ac';
import esewaLogo from "../../../../../../assets/esewa.svg";
import { notify } from '../../../../../../services/notify';
import { formatDate } from '../../../../../../services/timeanddate';
import { httpClient } from '../../../../../../utils/httpClient';
import { useHistory } from 'react-router-dom';
export default function HospitalDoctorPayment(props) {
  const [isPaymentOnline,setIsPaymentMethodOnline]=useState(true)
  const [totalChanrge,setTotalCharge]=useState(null)

  let history=useHistory()

      // Redux implementation
  const dispatch = useDispatch();
  const appointmentBooking = useSelector((state) => state.appointmentBooking);
  // const appointmentBooking = useSelector((state) => state.appointmentBooking);

  const AppointmentMethod = bindActionCreators(selectAppointmentMethod,dispatch
  );
  const setDoctorPaymentType=bindActionCreators(selectHospitalDoctorPaymentMethod,dispatch)
  const setHospitalDoctorServiceType=bindActionCreators(setHospitalDoctorService,dispatch)
  const resetHospitalDoctors=bindActionCreators(resetHospitalDoctorState,dispatch)


  console.log("incoming store data are",appointmentBooking)
// end of redux implementation
const closePaymentPopUp=()=>{
    props.props.setTrigger(false)
    resetHospitalDoctors(true)
    }
const handleChange=(e,data)=>{
      setTotalCharge(data.amount)
      const {value}=e.target
      console.log("value isss",e,value,data)
      if(value=="home"){
          setIsPaymentMethodOnline(false)
          setDoctorPaymentType("home")
      }
      else{
        setDoctorPaymentType("online")
          // setDigiDoctorPaymentType("online")
      }
      setHospitalDoctorServiceType(data)
  }
const proceed=()=>{
  if(!appointmentBooking.selectedHospitalDoctorService){
    notify.error("Please select a service")
    return
  }
  console.log("call api over here")
  httpClient.PUT("appointment/after-payment/"+appointmentBooking.hospitalDoctorBookingIdAfterBooking,{digiServiceId:appointmentBooking.selectedHospitalDoctorService.digiServiceId,paymentStatus:0})
  .then(resp=>{
    notify.success("Appointment successfully booked")
    history.push("/dashboard/viewappointment")
  })
  .catch(err=>notify.error("Something went wrong"))
  // let finalData={
  //   appointmentDate:appointmentBooking.appointmentDate,
  //   appointmentTime:appointmentBooking.appointmentTime,
  //   servicesId:appointmentBooking.selectedHospitalDoctorService.digiServiceId,
  //   hospitalId:appointmentBooking.hospitalInfo.id,
  //   doctorId:appointmentBooking.doctorInfo.doctorid
  // }
  // httpClient.POST("create-appointment",finalData,false,true)
  // .then(resp=>{
  //   notify.success("Appintment booked")
  //   history.push("/dashboard/viewappointment")
  // })
  // .catch(err=>notify.error("error occurred"))
  // console.log("proceed clicked",finalData)
}
  return (
    <div className="doc-pop-main">
    <div className="pay-pop-inner">
      <div className="doc-pay-pop">
        {
          isPaymentOnline?

        <div className="doc-pay-pop-head">
          <p>Payment Partner</p>
          <div className="pay-partner1">
            <img src={esewaLogo} alt="" />
          </div>
        </div>
        :null
}
        <div className="doc-pay-appoint-det1">
          <p id="pay-appoint-det-p">Appointment Detail</p>
          <p id="pay-appoint-det-p">
            {formatDate(appointmentBooking.appointmentDate,"llll").slice(0,-8)}
          </p>
        </div>
        <div className="doc-pay-doc-serv">
          <div className="payapp-det2">
            <p id="pay-doc-choose"> Doctor chosed</p>
            <p id="pay-appoint-det-p2"> Dr. {appointmentBooking.doctorInfo.doctorname}</p>
          </div>
          <div className="payapp-det2">
            <p id="pay-doc-choose">Service chosed</p>
            <p id="pay-appoint-det-p2">{appointmentBooking.doctorInfo.specialist}</p>
          </div>
        </div>
        <div className="doc-pay-appoint-det3">
          <p id="pay-appoint-det-p">Choose Checkup Medium</p>
        </div>
        <div className="pay-ctlt-checkbox">
          <div className="ctlt_institute_radio">
            {
              appointmentBooking.doctorInfo.digiService.length?
              appointmentBooking.doctorInfo.digiService.map((item,index)=>{
                return <div className="pay-radio1">
                <div>
                  <input
                    type="radio"
                    id="selectall"
                    name="fav_language"
                    value={item.type}
                    onChange={(e)=>handleChange(e,item)}                  />
                  <label for="html">{item.digiServiceName}</label>
                </div>

                <p id="pay-appoint-det-p2">Rs.{item.amount}</p>
              </div>
              })
              :null
            }
          </div>
        </div>
        <div className="doc-pay-appoint-det4">
          <div className="doc-pay-last-div ">
            <p>Total charge for appoinment</p>
            <p>Rs.{totalChanrge?totalChanrge:"000"}</p>
          </div>

          <div className="popup_lab_cont4_foot pay-last-but">
            <a className="popup_lab_close" style={{ cursor: "pointer" }} onClick={closePaymentPopUp}>
              <p>Cancel</p>
            </a>
            <a className="lab_popup_checkout" style={{ cursor: "pointer" }} onClick={proceed}>
              <p>Proceed</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
