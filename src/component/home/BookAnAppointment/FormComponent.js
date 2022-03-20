import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { httpClient } from "../../../utils/httpClient";
import { useEffect, useState } from "react";
import { notify } from "../../../services/notify";
import Cliploader from "../../../utils/clipLoader";
import { Todaydate } from "../../../services/todaydate";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import Clear from "@material-ui/icons/Clear";
import "./formcomponent.css";
import * as Yup from "yup";
import Select from "react-select";
import FormComponentForLoggedInCase from "./formComponentForLoggedInCase";
import { setDoctorInfo } from "../../../actions/hospitalAppointmentBooking.ac";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { digiDoctorAppointmentFixed, digiDoctorInfo } from "../../../actions/digiDoctorBooking.ac";
import { setOpenPopUp } from "../../../actions/paymentPopUp.ac";
import ExternalBookingPayment from '../../common/popup/doctorPopup/selectPaymentMethod/forexternalbooking/externalBookingPayment';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const FormSection = styled.div`
  margin-top: 25px;
  padding: 3rem;
  background-color: white;
  width: 500px;
  border-radius: 15px;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.06);
  box-shadow: -5px -5px 20px 0px rgba(0, 0, 0, 0.06);
  @media screen and (max-width: 1077px) {
    width: 100%;
    // height: 600px;
  }
  @media screen and (max-width: 767px) {
  }
  @media screen and (max-width: 500px) {
    padding: 1rem;
  }

  .col-md-12 {
    padding: 0;
  }
  .form-control {
    border-radius: 8px;
  }
  label {
    color: #192638;
    line-height: 19px;
    letter-spacing: 0.001rem;
  }
  .btn-block {
    background-color: #2745f0;
    // width: 100%;
  }
  .form-text {
    color: #8797a8;
    text-align: center;
    font-size: 12px;
    margin-top: 20px;
  }
`;

function FormComponent(props) {
  const today = Todaydate();
  const prop = props.history.history
    ? props.history.history
    : props.history.props.props.history;
  const [appointmentsuccess, setappointmentsuccess] = useState(null);
  const [appointmentfailed, setappointmentfailed] = useState(null);
  const [services, setservices] = useState([]);
  const [doctors, setdoctors] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [doctorFullInfo,setDoctorFullInfo]=useState([])
  console.log("services are", services);



        // redux implementation
        const dispatch=useDispatch()
        const popupOpen = useSelector((state) => state.paymentPopUp);
        const setAppointmentFixed = bindActionCreators(digiDoctorAppointmentFixed, dispatch);
        const setDoctorInfo = bindActionCreators(digiDoctorInfo, dispatch);
        const openPaymentPopUp = bindActionCreators(setOpenPopUp, dispatch);
        const appointmentBooking = useSelector((state) => state.digiDoctorAppointmentBooking);
        console.log("appointmentBooking is",appointmentBooking)
        // end of redux implementation
  const [doctorfetched, setdoctorfetched] = useState({
    image: null,
    prefix: null,
    name: null,
    specialist: null,
    description: null,
  });

  var dt = new Date();
  const [isdoctorblurred, setisdoctorblurred] = useState(false);
  const [selectedDay, setSelectedDay] = useState({
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate(),
  });
  const [minDate, setminDate] = useState({
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate(),
  });
  const [value,setValue]=useState(null)
  const [doctor,setDoctor]=useState(null)
  useEffect(() => {
    httpClient
      .GET("services/get/true")
      .then((resp) => {
        let allServices = resp.data.data.map((item) => {
          return {
            label: item.servicename,
            value: item.id,
          };
        });
        setservices(allServices);
      })
      .catch((err) => {
        notify.error("something went wrong during fetching data");
      });
  }, []);
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    servicesId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
  };
  const schema = Yup.object().shape({
    firstName: Yup.string()
    .min(2,"Invalid First Name!")
    .required("Firstname is required!"),
    middleName: Yup.string(),
    lastName: Yup.string()
    .min(2,"Invalid Last Name!")
    .required("Lastname is required!"),
    mobileNumber: Yup.string()
    .length(10, 'Mobile Number Must be of 10 digit.')
    .required("Mobile Number is required!"),
    servicesId: Yup.string()
    .required("Service is required!"),
    email: Yup.string()
    .email("Must be a valid email!")
    .required("Email is required!"),
    doctorId: Yup.string().required("Doctor is required!"),
    appointmentDate: Yup.object(),
    appointmentTime: Yup.string().required("Appointment time is required!"),
  });

  function DatePickerField({ name }) {
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <DatePicker
        minimumDate={minDate}
        value={field.value ? field.value : selectedDay}
        onChange={(value) => {
          formik.setFieldValue(name, value);
        }}
      />
    );
  }
  function InputSelectField({ name }) {
    console.log("name is,,,,", name);
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <input
        type={"text"}
        className="prescription_input"
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
        placeholder="120/80 mmHg"
      ></input>
    );
  }
  function SelectField({ name }) {
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <Select
        options={services}
        className="select-category"
        value={{label: value}}
        onChange={(value) => {
          formik.setFieldValue(name, value.value);
          setValue(value.label)
          handleChange(value);
        }}
      />
    );
  }
  function SelectFieldDoctor({ name }) {
    console.log("name is", name);
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <Select
        options={doctors}
        value={{label: doctor}}
        className="select-category"
        onChange={(value) => {
          formik.setFieldValue(name, value.value.doctorid);
          setDoctor(value.label)
          setDoctorFullInfo(value.value)
        }}
      />
    );
  }

  const handleChange = (value) => {
    console.log("value", value);
    httpClient
      .GET(`doctor/get-related-doctor/${value.value}`, false, false)
      .then((resp) => {
        if (!resp.data.data.length) {
          return notify.error("No any doctors are available to this service");
        }
        let doctors = resp.data.data.map((item, index) => {
          return {
            label: item.name,
            value: item,
          };
        });
        setdoctors(doctors);
      })
      .catch((err) => {
        setdoctors([]);
        notify.error("No any doctors are available to this service");
      });
  };
  const getdoctorinfo = (e) => {
    let doctorid = e.target.value;
    if (!doctorid) {
      return setisdoctorblurred(false);
    }
    let image = BASE_URL + "doctor/download/" + doctorid;
    httpClient
      .GET(`doctor/public-info/${doctorid}`)
      .then((resp) => {
        const { prefix, name, specialist, description } = resp.data.data;
        setdoctorfetched({
          image: image,
          prefix: prefix,
          name: name,
          specialist: specialist,
          description: description,
        });
        setisdoctorblurred(true);
      })
      .catch((err) => {
        notify.error("something went wrong");
      });
  };
  const clearpopup = () => {
    setisdoctorblurred(false);
  };
  const initialValuesForLoggedInCase = {
      servicesId: "",
      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
    },
    handleSubmit = (values) => {
      let finaldata = {
        ...values,
        appointmentDate: values.appointmentDate
          ? values.appointmentDate.year +
            "-" +
            values.appointmentDate.month +
            "-" +
            values.appointmentDate.day
          : selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day,
      };
      // console.log(finaldata)
      setisloading(true);
      httpClient
        .POST("create-external-user", finaldata)
        .then((res) => {
          setappointmentsuccess(res.data.message);
          setAppointmentFixed({data:res.data.data,origin:"digidoctorBooking"})
          let doctorInfo=doctorFullInfo
          doctorInfo={...doctorInfo,...finaldata}
          setDoctorInfo(doctorInfo)
          openPaymentPopUp(true)
          console.log("doctor info is",doctorFullInfo)
          // setTimeout(() => {
          //   prop.push({
          //     pathname: "/login",
          //     fromexternaluser: true,
          //     email: values.email,
          //   });
          // }, 3000);
        })
        .catch((err) => {
          if (!err) {
            return setappointmentfailed("something went wrong");
          }
          if (err.response.data.message === "Email already exists") {
            setappointmentfailed(
              err.response.data.message + " redirecting to dashboard...."
            );
            return setTimeout(() => {
              let token = localStorage.getItem("dm-access_token");
              token
                ? prop.push("/dashboard")
                : prop.push({
                    pathname: "/login",
                    timeoutMsg: "please login",
                  });
            }, 2000);
          }
          notify.error("something went wrong ");
        })
        .finally(() => {
          setisloading(false);
        });
        if(localStorage.getItem("dm-access_token")){
          httpClient
          .POST("create-appointment", finaldata, false,false)
          .then((resp) => {
            notify.success("Appointment booked successfully");
          })
          .catch((err) => notify.error("Error in appointment booking"));
        }
    };
  const submitForLoggedInCase = (values) => {
  console.log("values are", values);
  };

  return (
    <div className="formcompo_home">
      <FormSection>
        {!localStorage.getItem("dm-access_token") ? (
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="fname">
                    First Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    name="firstName"
                  />
                  <ErrorMessage name="firstName">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="mname">Middle Name</label>
                  <Field
                    type="text"
                    className="form-control"
                    id="middleName"
                    placeholder="Middle Name"
                    name="middleName"
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="lname">
                    Last Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                    name="lastName"
                  />
                  <ErrorMessage name="lastName">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="email">
                    Email<span style={{ color: "red" }}>*</span>
                  </label>
                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                  />
                  <ErrorMessage name="email">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="phoneno">
                    Mobile No.<span style={{ color: "red" }}>*</span>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="mobileNumber"
                    placeholder="PhoneNumber"
                    name="mobileNumber"
                  />
                  <ErrorMessage name="mobileNumber">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 home-form-sel-serv">
                  <label htmlFor="service">
                    Select Service<span style={{ color: "red" }}>*</span>
                  </label>
                  <SelectField name={"servicesId"}></SelectField>
                  <ErrorMessage name="servicesId">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="doctor">
                    Select Doctor<span style={{ color: "red" }}>*</span>
                  </label>
                  <SelectFieldDoctor name={"doctorId"}></SelectFieldDoctor>
                  <ErrorMessage name="doctorId">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <div className="home_not_logged_in_datepick">
                    <label htmlFor="appointment">
                      Appointment Date
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <DatePickerField name={"appointmentDate"}></DatePickerField>
                    <ErrorMessage name="appointmentDate">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="form-group col-md-6" style={{ marginTop: "" }}>
                  <label htmlFor="time">
                    Time<span style={{ color: "red" }}>*</span>
                  </label>
                  <Field
                    type="time"
                    placeholder=""
                    id="appointmentTime"
                    className="form-control"
                    name="appointmentTime"
                  ></Field>
                  <ErrorMessage name="appointmentTime">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12 ">
                {isloading ? (
                  <Cliploader></Cliploader>
                ) : (
                  <button type="submit" className="btn btn-primary btn-block">
                    Make Appointment
                  </button>
                )}
                {appointmentsuccess ? (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    <strong>Success!</strong>
                    {appointmentsuccess},You are registered-please check your
                    email to change the password
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                ) : null}
                {appointmentfailed ? (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    {appointmentfailed}
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="form-text">
                We value your privacy. Your details are safe with us.
              </div>
            </Form>
          </Formik>
        ) : (
          <FormComponentForLoggedInCase
            services={services}
          ></FormComponentForLoggedInCase>
        )}
      </FormSection>
      {isdoctorblurred ? (
        <div class="docs">
          <div class="doc bubble">
            <Clear className="clear-icon" onClick={clearpopup}></Clear>
            <div class="imag1">
              <img src={doctorfetched.image} />
            </div>
            <div class="description">
              <p id="doc_name">Dr. {doctorfetched.name}</p>
              <p id="doc_skill">{doctorfetched.specialist}</p>
              <p id="doc_edu">{doctorfetched.prefix}</p>
              <p id="doc_exp">{doctorfetched.description}</p>
            </div>
          </div>
        </div>
      ) : null}
      {
            popupOpen.trigger?<ExternalBookingPayment></ExternalBookingPayment>:null
          }
    </div>
  );
}

export default FormComponent;
