import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form, useFormikContext } from "formik";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import * as Yup from "yup";
import { httpClient } from "../../../utils/httpClient";
import { notify } from "../../../services/notify";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { digiDoctorAppointmentFixed, digiDoctorInfo } from "../../../actions/digiDoctorBooking.ac";
import { setOpenPopUp } from "../../../actions/paymentPopUp.ac";
import ExternalServicePayment from "../../common/popup/doctorPopup/selectPaymentMethod/forServicePayment/externalServicePayment";
import ServicePayment from "../../common/popup/doctorPopup/selectPaymentMethod/forServicePayment/servicepayment";
import { externalServiceBooking, internalServiceBooking } from "../../../actions/service.action";

const Root = styled.div`
  width: 45%;

  padding: 1rem;
  background: #ffffff;
  box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  @media screen and (max-width: 1280px) {
    width: 40%;
  }
  @media screen and (max-width: 1200px) {
    width: 45%;
  }
  @media screen and (max-width: 1200px) {
    width: 50%;
  }
  @media screen and (max-width: 1000px) {
    width: 55%;
  }
  @media screen and (max-width: 960px) {
    width: 60%;
  }
  @media screen and (max-width: 870px) {
    width: 65%;
  }
  @media screen and (max-width: 820px) {
    width: 70%;
  }
  @media screen and (max-width: 770px) {
    width: 80%;
  }
  @media screen and (max-width: 730px) {
    width: 90%;
  }
  @media screen and (max-width: 650px) {
    width: 100%;
  }
  .btn {
    background-color: #2745f0;
    border-radius: 0.5rem;
    // height: 3rem;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 500;

    line-height: 17px;
    /* identical to box height */

    letter-spacing: 0.01em;
  }
  Form {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;


    @media screen and (max-width: 500px) {
     display:flex;
     flex-direction:column;
    }
`;
// const Form = styled.div`
//   //
//   }
// `;
const DoctorAtHomeForm = () => {
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(null);
  // let [isLoading,setIsLoading]=useState(false)


  // redux implementation
  const dispatch = useDispatch()
  const popupOpen = useSelector((state) => state.paymentPopUp);
  const setAppointmentFixed = bindActionCreators(digiDoctorAppointmentFixed, dispatch);
  const setDoctorInfo = bindActionCreators(digiDoctorInfo, dispatch);
  const openPaymentPopUp = bindActionCreators(setOpenPopUp, dispatch);
  const setExternalServiceBooking = bindActionCreators(externalServiceBooking, dispatch);

  const appointmentBooking = useSelector((state) => state.digiDoctorAppointmentBooking);
  console.log("appointmentBooking is", appointmentBooking)
  // end of redux implementation


  console.log("location is", location.state.id);
  var dt = new Date();
  const [selectedDay, setSelectedDay] = useState({
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate(),
  });
  const schema = Yup.object().shape({
    firstName: Yup.string().required("FirstName is required!"),
    middleName: Yup.string(),
    lastName: Yup.string().required("LastName is required!"),
    email: Yup.string().required("Email is required!"),
    mobileNumber: Yup.number().required("mobilenumber is required!"),
    time: Yup.string().required("Time is required!"),
    date: Yup.object(),
  });
  if (!location.state) {
    history.push("/services");
  }
  const initialValues = {
    time: "",
    date: "",
    digiServiceId: location.state.id,
    email: "",
    mobileNumber: "",
    firstName: "",
    lastName: "",
    middleName: "",
  };
  console.log("initialvalues",initialValues)
  function DatePickerField({ name }) {
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <DatePicker
        value={field.value ? field.value : selectedDay}
        onChange={(value) => {
          formik.setFieldValue(name, value);
        }}
      />
    );
  }
  const handleSubmit = (value, { resetForm }) => {
    value.date = !value.date
      ? selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day
      : value.date.year + "-" + value.date.month + "-" + value.date.day;
    console.log("values are", value);
    httpClient
      .POST("service-booking/create-external-booking", value)
      .then((resp) => {
          const serviceBookingId=resp.data.data

        // notify.success(
        //   "Success, you will be notified via phone or E-mail please check your email soon"
        // );
        resetForm();
        value.appointmentId=resp.data.data
        setExternalServiceBooking(value)
        openPaymentPopUp(true)
      })
      .catch((err) => {
        if (err.response.data.message == "Email already exists") {
          notify.error(
            err.response.data.message + " please login to book service"
          );
          resetForm();
          return history.push("/login");
        }
        notify.error("Failed to book the service");
      });
    // .finally(setIsLoading(null))
  };
  return (
    <Root>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div class="form-group">
            <label for="inputAddress">First Name</label>
            <Field
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Name"
              name="firstName"
            />
            <ErrorMessage name="firstName">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </div>
          <div class="form-group">
            <label for="inputAddress">Middle Name</label>
            <Field
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="phone"
              name="middleName"
            />
          </div>
          <div class="form-group">
            <label for="inputAddress">Last Name</label>
            <Field
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="phone"
              name="lastName"
            />
            <ErrorMessage name="lastName">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </div>
          <div class="form-group">
            <label for="inputAddress">E-mail</label>
            <Field
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="phone"
              name="email"
            />
            <ErrorMessage name="email">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </div>
          <div class="form-group">
            <label for="inputAddress">Phone no</label>
            <Field
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="phone"
              name="mobileNumber"
            />
            <ErrorMessage name="mobileNumber">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </div>

          <div class="form-group ourserv-form-date">
            <label for="inputAddress">Date</label>
            <DatePickerField name={"date"}></DatePickerField>
          </div>
          <div class="form-group">
            <label for="inputAddress">Time</label>
            <Field
              type="time"
              class="form-control"
              id="inputAddress"
              placeholder="phone"
              name="time"
            />
            <ErrorMessage name="time">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            style={{
              gridColumnStart: "1",
              gridColumnEnd: "3",
              cursor: "pointer",
              zIndex: "10",
            }}
          // disabled={isLoading?true:false}
          >
            Send Now
            {/* {
            isLoading?<CircularProgress/>:"Send Now"
          } */}
          </button>
        </Form>
      </Formik>
      {
        popupOpen.trigger?
        <ServicePayment
          origin="serviceBooking"
        // directBookAppointmentProps={finalData}
        ></ServicePayment>
        :null
      }

    </Root>
  );
};

export default DoctorAtHomeForm;
