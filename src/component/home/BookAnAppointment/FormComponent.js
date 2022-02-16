import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { httpClient } from "../../../utils/httpClient";
import { useEffect, useState } from "react";
import { notify } from "../../../services/notify";
import Cliploader from "../../../utils/clipLoader";
import { Todaydate } from "../../../services/todaydate";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import Clear from "@material-ui/icons/Clear";
import "./formcomponent.css";
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
  .col-md-6 {
    padding: 0px 15px 0px 0px;
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
    margin-top: 4px;
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
  useEffect(() => {
    httpClient
      .GET("services/get/true")
      .then((resp) => {
        setservices(resp.data.data);
      })
      .catch((err) => {
        notify.error("something went wrong during fetching data");
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      servicesId: "",
      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
    },
    validate: (values) => {
      let errors = {};

      if (values.firstName.length < 2) {
        errors.firstName = "Invalid First Name!";
      }
      if (!values.firstName) {
        errors.firstName = "First Name is required!";
      }

      if (values.lastName.length < 2) {
        errors.lastName = "Invalid Last Name!";
      }
      if (!values.lastName) {
        errors.lastName = "Last Name is required!";
      }
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
      ) {
        errors.email = "Invalid Email format";
      }
      if (!values.email) {
        errors.email = "Email is required!";
      }

      if (("" + values.mobileNumber).length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!";
      }
      if (!values.mobileNumber) {
        errors.mobileNumber = "Mobile Number is required!";
      }
      if (!values.servicesId) {
        errors.servicesId = "Service is required!";
      }
      if (!values.doctorId) {
        errors.doctorId = "Doctor is required!";
      }
      if (!values.appointmentDate) {
        errors.appointmentDate = "Appointment Date is required!";
      }
      if (!values.appointmentTime) {
        errors.appointmentTime = "Appointment Time is required!";
      }
      return errors;
    },
    onSubmit: (values) => {
      setisloading(true);
      httpClient
        .POST("create-external-user", values)
        .then((res) => {
          setappointmentsuccess(res.data.message);
          setTimeout(() => {
            prop.push({
              pathname: "/login",
              fromexternaluser: true,
              email: values.email,
            });
          }, 3000);
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
    },
  });
  const handleChange = (e) => {
    let serviceid = e.target.value;
    httpClient
      .GET(`doctor/get-related-doctor/${serviceid}`, false, false)
      .then((resp) => {
        setdoctors(resp.data.data);
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
  const datechange = (value, status) => {
    let date = "";
    date = value.year + "-" + value.month + "-" + value.day;

    if (status) {
      return (formikForLoggedInUser.values.appointmentDate = date);
    }
    setSelectedDay(value);
    formik.values.appointmentDate = date;
  };
  const formikForLoggedInUser = useFormik({
    initialValues: {
      servicesId: "",
      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.servicesId) {
        errors.serviceId = "Service is required!";
      }
      if (!values.doctorId) {
        errors.doctorId = "Doctor is required!";
      }
      if (!values.appointmentDate) {
        errors.appointmentDate = "Appointment Date is required!";
      }
      if (!values.appointmentTime) {
        errors.appointmentTime = "Appointment Time is required!";
      }
      return errors;
    },
    onSubmit: (value) => {
      httpClient
        .POST("create-appointment", value, false, true)
        .then((resp) => {
          notify.success("Appointment booked successfully");
        })
        .catch((err) => notify.error("Error in appointment booking"));
    },
  });
  const handleSubmitIsLoggedIn = () => {};
  return (
    <div className="formcompo_home">
      <FormSection>
        {!localStorage.getItem("dm-access_token") ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="fname">
                  First Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formik.errors.firstName}{" "}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="mname">Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="middleName"
                  placeholder="Middle Name"
                  {...formik.getFieldProps("middleName")}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="lname">
                  Last Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.errors.lastName && formik.touched.lastName ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formik.errors.lastName}{" "}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="email">
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formik.errors.email}{" "}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="phoneno">
                  Mobile No.<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNumber"
                  placeholder="PhoneNumber"
                  {...formik.getFieldProps("mobileNumber")}
                />
                {formik.errors.mobileNumber && formik.touched.mobileNumber ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formik.errors.mobileNumber}{" "}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="service">
                  Select Service<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="servicesId"
                  className="form-control"
                  {...formik.getFieldProps("servicesId")}
                  style={{ color: "black" }}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleChange(e);
                  }}
                >
                  <option value={null}></option>
                  {services.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.servicename}
                      </option>
                    );
                  })}
                </select>
                {formik.errors.servicesId && formik.touched.servicesId ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formik.errors.servicesId}{" "}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="doctor">
                  Select Doctor<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="doctorId"
                  className="form-control"
                  {...formik.getFieldProps("doctorId")}
                  style={{ color: "black" }}
                  onChange={(e) => {
                    formik.handleChange(e);
                    getdoctorinfo(e);
                  }}
                >
                  <option value={null}></option>
                  {doctors.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {formik.errors.doctorId && formik.touched.doctorId ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formik.errors.doctorId}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="appointment">
                  Appointment Date<span style={{ color: "red" }}>*</span>
                </label>
                <DatePicker
                  className="form-control"
                  shouldHighlightWeekends
                  value={selectedDay}
                  onChange={datechange}
                  minimumDate={minDate}
                  style={{ width: "40px" }}
                ></DatePicker>
                {formik.errors.appointmentDate &&
                formik.touched.appointmentDate ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formik.errors.appointmentDate}{" "}
                  </div>
                ) : null}
              </div>

              <div className="form-group col-md-6" style={{ marginTop: "" }}>
                <label htmlFor="time">
                  Time<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="time"
                  placeholder="select time"
                  id="appointmentTime"
                  className="form-control"
                  {...formik.getFieldProps("appointmentTime")}
                ></input>
                {formik.errors.appointmentTime &&
                formik.touched.appointmentTime ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formik.errors.appointmentTime}{" "}
                  </div>
                ) : null}
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
          </form>
        ) : (
          <form onSubmit={formikForLoggedInUser.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="service">
                  Select Service<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="serviceIdLoggedIn"
                  className="form-control"
                  {...formikForLoggedInUser.getFieldProps("servicesId")}
                  style={{ color: "black" }}
                  onChange={(e) => {
                    formikForLoggedInUser.handleChange(e);
                    handleChange(e);
                  }}
                >
                  <option value={null}></option>
                  {services.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.servicename}
                      </option>
                    );
                  })}
                </select>
                {formikForLoggedInUser.errors.servicesId &&
                formikForLoggedInUser.touched.servicesId ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formikForLoggedInUser.errors.servicesId}{" "}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="doctor">
                  Select Doctor<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="doctorId"
                  className="form-control"
                  {...formikForLoggedInUser.getFieldProps("doctorId")}
                  style={{ color: "black" }}
                  onChange={(e) => {
                    formikForLoggedInUser.handleChange(e);
                    getdoctorinfo(e);
                  }}
                >
                  <option value={null}></option>
                  {doctors.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {formikForLoggedInUser.errors.doctorId &&
                formikForLoggedInUser.touched.doctorId ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formikForLoggedInUser.errors.doctorId}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="appointment">
                  Appointment Date<span style={{ color: "red" }}>*</span>
                </label>
                <div className="formcompo_datepicker">
                  {" "}
                  <DatePicker
                    className="form-control"
                    shouldHighlightWeekends
                    value={selectedDay}
                    onChange={(value) => datechange(value, "fromLoggedInForm")}
                    minimumDate={minDate}
                    style={{ width: "40px" }}
                  ></DatePicker>
                </div>

                {formikForLoggedInUser.errors.appointmentDate &&
                formikForLoggedInUser.touched.appointmentDate ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formikForLoggedInUser.errors.appointmentDate}{" "}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6" style={{ marginTop: "" }}>
                <label htmlFor="time">
                  Time<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="time"
                  placeholder="select time"
                  id="appointmentTime"
                  className="form-control"
                  {...formikForLoggedInUser.getFieldProps("appointmentTime")}
                ></input>
                {formikForLoggedInUser.errors.appointmentTime &&
                formikForLoggedInUser.touched.appointmentTime ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {formikForLoggedInUser.errors.appointmentTime}{" "}
                  </div>
                ) : null}
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
            </div>
          </form>
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
    </div>
  );
}

export default FormComponent;
