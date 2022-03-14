import React from "react";
import DigiDoctorPayment from "./forDigiDoctor/digiDoctorPayment";
import HospitalDoctorPayment from "./forHospitalDoctor/hospitalDoctorPayment";
import ServicePayment from "./forServicePayment/servicepayment";

export default function SelectPaymentMethod(props) {
  console.log("props in select payment method is",props)
  return (
    <div>
      {
        props.props.origin?
        props.props.origin==="serviceBooking"?
        <ServicePayment props={props.props.props}></ServicePayment>
        : <DigiDoctorPayment props={props.props.props}></DigiDoctorPayment>
        :<HospitalDoctorPayment props={props.props.props}></HospitalDoctorPayment>
      }
    </div>
  );
}
