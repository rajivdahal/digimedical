import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { httpClient } from "../../../utils/httpClient";
import { useEffect, useState } from "react";
import { notify } from "../../../services/notify";
import Cliploader from "../../../utils/clipLoader";
import { Todaydate } from "../../../services/todaydate";
const FormSection = styled.div`
  height: auto;
  margin-top: 25px;
  padding: 3rem;
  background-color: white;
  width: 500px;
  border-radius: 15px;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.06);
  box-shadow: -5px -5px 20px 0px rgba(0, 0, 0, 0.06);

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
 const today=Todaydate()
  const prop = props.history.history?props.history.history:props.history.props.props.history

  const [appointmentsuccess, setappointmentsuccess] = useState(null)
  const [appointmentfailed, setappointmentfailed] = useState(null)
  const [services, setservices] = useState([])
  const [doctors, setdoctors] = useState([])
  const [isloading, setisloading] = useState(false)
  useEffect(() => {
    httpClient.GET("services/get/true")
      .then(resp => {
        setservices(resp.data.data)
      })
      .catch(err => {
        notify.error("something went wrong during fetching data")
      })
  }, [])

  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      servicesId: '',
      doctorId: '',
      appointmentDate: '',
      appointmentTime: ''
    },
    validate: values => {
      let errors = {}
      if (!values.firstName) {
        errors.firstName = "Required!"
      }
      if (!values.lastName) {
        errors.lastName = "Required!"
      }
      if (!values.email) {
        errors.email = "Required!"
      }
      else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = "Invalid email format"
      }
      if (!values.mobileNumber) {
        errors.mobileNumber = "Required!"
      }
      if (("" + values.mobileNumber).length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!"
      }
      if (!values.servicesId) {
        errors.servicesId = "Required!"
      }
      if (!values.doctorId) {
        errors.doctorId = "Required!"
      }
      if (!values.appointmentDate) {
        errors.appointmentDate = "Required!"
      }
      if (!values.appointmentTime) {
        errors.appointmentTime = "Required!"
      }
      return errors
    },
    onSubmit: values => {
      setisloading(true)
      httpClient.POST('create-external-user', values)
        .then((res) => {
          setappointmentsuccess(res.data.message)
          setTimeout(() => {
            prop.push({
              pathname:"/login",
              fromexternaluser:true,
              email:values.email
            })
          },3000);
        })
        .catch(err => {
          console.log(err.response)
          if (!err) {
            return setappointmentfailed("something went wrong")
          }
          console.log("inside error")
          if (err.response.data.message === "Email already exists") {
            setappointmentfailed(err.response.data.message + " redirecting to dashboard....")
            return setTimeout(() => {
              let token = localStorage.getItem("dm-access_token")
              token ? prop.push("/dashboard") : prop.push({
                pathname: '/login',
                timeoutMsg: "please login"
              })
            }, 2000)
          }
          notify.error("something went wrong ")
        })
        .finally(() => {
          setisloading(false)
        })
    }
  })
  console.log(formik.values)
  const handleChange = (e) => {
    let serviceid = e.target.value
    httpClient.GET(`doctor/get-related-doctor/${serviceid}`, false, false)
      .then(resp => {

        setdoctors(resp.data.data)
        console.log(resp.data.data)
      })
      .catch(err => {
        setdoctors([])
        notify.error("No any doctors are available to this service")
      })
  }
 
  

  return (
    <FormSection>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              {...formik.getFieldProps("firstName")}

            />
            {formik.errors.firstName && formik.touched.firstName ? <div style={{ color: "red" }} className="errmsg">{formik.errors.firstName}  </div> : null}
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
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              {...formik.getFieldProps("lastName")}
            />
            {formik.errors.lastName && formik.touched.lastName ? <div style={{ color: "red" }} className="errmsg">{formik.errors.lastName}  </div> : null}

          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}

            />
            {formik.errors.email && formik.touched.email ? <div style={{ color: "red" }} className="errmsg">{formik.errors.email}  </div> : null}

          </div>
          <div className="form-group col-md-6">
            <label htmlFor="phoneno">Mobile No.</label>
            <input
              type="text"
              className="form-control"
              id="mobileNumber"
              placeholder="PhoneNumber"
              {...formik.getFieldProps("mobileNumber")}
            />
            {formik.errors.mobileNumber && formik.touched.mobileNumber ? <div style={{ color: "red" }} className="errmsg">{formik.errors.mobileNumber}  </div> : null}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="service">Select Service</label>
            <select id="servicesId" className="form-control" {...formik.getFieldProps("servicesId")} style={{ color: "black" }}
              onChange={(e) => {
                formik.handleChange(e)
                handleChange(e)
              }}
            >
              <option value={null}></option>
              {
                services.map((item, index) => {
                  return <option key={index} value={item.id}>{item.serviceName}</option>
                })
              }
            </select>
            {formik.errors.servicesId && formik.touched.servicesId ? <div style={{ color: "red" }} className="errmsg">{formik.errors.servicesId}  </div> : null}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="doctor">Select Doctor</label>
            <select id="doctorId" className="form-control" {...formik.getFieldProps("doctorId")} style={{ color: "black" }}>
              <option value={null}></option>
              {
                doctors.map((item, index) => {

                  return <option key={index} value={item.id}>{item.name}</option>

                })
              }
            </select>
            {formik.errors.doctorId && formik.touched.doctorId ? <div style={{ color: "red" }} className="errmsg">{formik.errors.doctorId}</div> : null}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="appointment">Appointment Date.</label>
            <input
              type="date"
              className="form-control"
              id="appointmentDate"
              placeholder="dd/mm/yyyy"
              min={today}
              max=""
              {...formik.getFieldProps("appointmentDate")}
            />
            {formik.errors.appointmentDate && formik.touched.appointmentDate ? <div style={{ color: "red" }} className="errmsg">{formik.errors.appointmentDate}  </div> : null}
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="time">Time</label>
            <input type="time" placeholder="select time" id="appointmentTime" className="form-control" {...formik.getFieldProps("appointmentTime")}></input>
            {formik.errors.appointmentTime && formik.touched.appointmentTime ? <div style={{ color: "red" }} className="errmsg">{formik.errors.appointmentTime}  </div> : null}
          </div>
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12 ">
          {
            isloading ?
              <Cliploader></Cliploader>
              :
              <button type="submit" className="btn btn-primary btn-block">
                Make Appointment
              </button>
          }
          {
            appointmentsuccess ? <div className="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Success!</strong>
              {appointmentsuccess},You are registered-please check your email to change the password
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div> : null
          }
          {
            appointmentfailed ? <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {appointmentfailed}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div> : null
          }
        </div>
        <div className="form-text">
          We value your privacy. Your details are safe with us.
        </div>
      </form>
    </FormSection>
  );
}

export default FormComponent;
