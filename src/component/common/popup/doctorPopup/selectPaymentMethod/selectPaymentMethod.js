import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { selectAppointmentMethod } from '../../../../../actions/hospitalAppointmentBooking.ac';

export default function SelectPaymentMethod() {

  // Redux implementation
  const dispatch = useDispatch();
  const appointmentBooking = useSelector((state) => state.appointmentBooking);
  const AppointmentMethod=bindActionCreators(selectAppointmentMethod,dispatch)
  console.log("set is appointment fixed is",AppointmentMethod)
  console.log("appointmtment booking status",appointmentBooking)
  // end of redux implementation

  const selectEsewa=()=>{
    AppointmentMethod("esewa")
  }
  return (
    <div>
        <div onClick={selectEsewa}>Online</div>
        <br/>
        <br/>
        <br/>
        <br/>

        <div>Cash On Delivery</div>
    </div>
  )
}
