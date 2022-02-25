import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { digiDoctorAppointmentFixed, selectedService, setPaymentType } from '../../../../../../actions/digiDoctorBooking.ac';
import esewaLogo from "../../../../../../assets/esewa.svg";
import { formatDate } from '../../../../../../services/timeanddate';
export default function DigiDoctorPayment(props) {
    console.log("props in digi doctor payment is",props)
    const [isPaymentOnline,setIsPaymentMethodOnline]=useState(true)
    // redux implementation
    const dispatch=useDispatch(props)
    const digiDoctorBooking=useSelector((state)=>state.digiDoctorAppointmentBooking)
    const setDigiDoctorAppointment=bindActionCreators(digiDoctorAppointmentFixed,dispatch)
    const setServiceType=bindActionCreators(selectedService,dispatch)
    const setDigiDoctorPaymentType=bindActionCreators(setPaymentType,dispatch)

    console.log("consoleeee is",digiDoctorBooking,setDigiDoctorAppointment)
    //end of redux implementation

    const closePaymentPopUp=()=>{
        props.props.setTrigger(false)
        }
    const handleChange=(e,data)=>{
        const {value}=e.target
        if(value=="home"){
            setIsPaymentMethodOnline(false)
            setDigiDoctorPaymentType("home")
        }
        else{
            setDigiDoctorPaymentType("online")
        }
        setServiceType(data)
    }
  return (
    <div className="doc-pop-main">
        <div className="pay-pop-inner">
          <div className="doc-pay-pop">
            {digiDoctorBooking.digiDoctorPaymentType==="online"?
            <div className="doc-pay-pop-head">
              <p>Payment Partner</p>
              <div className="pay-partner1">
                <img src={esewaLogo} alt="" />
              </div>
            </div>:null}
            <div className="doc-pay-appoint-det1">
              <p id="pay-appoint-det-p">Appointment Detail</p>
              <p id="pay-appoint-det-p">
                {formatDate(digiDoctorBooking.digiDoctorAppointmentDate,"llll").slice(0,-8)}
              </p>
            </div>
            <div className="doc-pay-doc-serv">
              <div className="payapp-det2">
                <p id="pay-doc-choose"> Doctor chosed</p>
                <p id="pay-appoint-det-p2"> Dr. {digiDoctorBooking.digiDoctorInfo.name}</p>
              </div>
              <div className="payapp-det2">
                <p id="pay-doc-choose">Service chosed</p>
                <p id="pay-appoint-det-p2">{digiDoctorBooking.digiDoctorInfo.specialist?digiDoctorBooking.digiDoctorInfo.specialist:"need to update from backend"}</p>
              </div>
            </div>
            <div className="doc-pay-appoint-det3">
              <p id="pay-appoint-det-p">Choose Checkup Medium</p>
            </div>
            <div className="pay-ctlt-checkbox">
              <div className="ctlt_institute_radio">
                  {
                      digiDoctorBooking.digiDoctorInfo.services.map((item,index)=>{
                        return  <div className="pay-radio1">
                        <div>
                          {" "}
                          <input
                            type="radio"
                            id="selectall"
                            name="fav_language"
                            value={item.type}
                            onChange={(e)=>handleChange(e,item)}
                          />
                          <label for="html">Get {item.digiServiceName}</label>
                        </div>

                        <p id="pay-appoint-det-p2">Rs.{item.amount}</p>
                      </div>
                      })
                  }

              </div>
            </div>
            <div className="doc-pay-appoint-det4">
              <div className="doc-pay-last-div ">
                <p>Total charge for appoinment</p>
                <p>Rs.{digiDoctorBooking.selectedService?digiDoctorBooking.selectedService.amount:"000"}</p>
              </div>

              <div className="popup_lab_cont4_foot pay-last-but">
                <a className="popup_lab_close" style={{ cursor: "pointer" }} onClick={closePaymentPopUp}>
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
    )
}
