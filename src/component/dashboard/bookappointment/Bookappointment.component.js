// import "./Bookappointment.component.css"
// import Internalappointmentbook from "../userdashboard/internalappointmentbook/Internalappointmentbook.component"
// export const Bookappointment = (props) => {
//     return (
//         <>
//             <Internalappointmentbook props={props.history}></Internalappointmentbook>
//         </>
//     )
// }
import React from "react";
import { httpClient } from "./../../../utils/httpClient";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { notify } from "./../../../services/notify";

import "./Bookappointment.component.css";
export default function Bookappointment(prop) {
  //   const prop=props.history.history
  const [appointmentsuccess, setappointmentsuccess] = useState(null);
  const [appointmentfailed, setappointmentfailed] = useState(null);
  const [services, setservices] = useState([]);
  let servicearray = [];
  useEffect(() => {
    httpClient
      .GET("services/true")
      .then((resp) => {
        // console.log(resp.data.data)
        setservices(resp.data.data);
        //let dataarray=resp.data.data
      })
      .catch((err) => {
        notify.error("Something went wrong");
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      servicesId: "",
      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.servicesId) {
        errors.servicesId = "Service is required!";
      }
      if (!values.doctorId) {
        errors.doctorId = "Doctor is required!";
      }
      if (!values.appointmentDate) {
        errors.appointmentDate = "Appointment date is required!";
      }
      if (!values.appointmentTime) {
        errors.appointmentTime = "Appointment time is required!";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log("values are", values);
      httpClient
        .POST("create-appointment", values)
        .then((resp) => {
          let message = resp.data.message;
          setappointmentsuccess(resp.data.message);
          setTimeout(() => {
            prop.props.push("/dashboard/viewappointment");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setappointmentfailed("something went wrong");
        });
    },
  });
  return (
    <>
      <div className="marginadj">
        <form onSubmit={formik.handleSubmit} className="form-width-adjust">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="service">Select Service</label>
              <select
                id="servicesId"
                className="form-control"
                {...formik.getFieldProps("servicesId")}
                style={{ color: "black" }}
              >
                <option value={null}></option>
                {services.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.serviceName}
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
              <label htmlFor="doctor">Select Doctor</label>
              <select
                id="doctorId"
                className="form-control"
                {...formik.getFieldProps("doctorId")}
                style={{ color: "black" }}
              >
                <option value={null}></option>
                <option>1</option>
                <option>1</option>
                <option>2</option>
              </select>
              {formik.errors.doctorId && formik.touched.doctorId ? (
                <div style={{ color: "red" }} className="errmsg">
                  {formik.errors.doctorId}
                </div>
              ) : null}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="appointment">Appointment Date.</label>
              <input
                type="date"
                className="form-control"
                id="appointmentDate"
                placeholder="dd/mm/yyyy"
                {...formik.getFieldProps("appointmentDate")}
              />
              {formik.errors.appointmentDate &&
              formik.touched.appointmentDate ? (
                <div style={{ color: "red" }} className="errmsg">
                  {formik.errors.appointmentDate}{" "}
                </div>
              ) : null}
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                placeholder="select time"
                id="appointmentTime"
                className="form-control"
                {...formik.getFieldProps("appointmentTime")}
              ></input>
              {/* <select id="time" className="form-control" {...formik.getFieldProps("time")}>
              <option selected>Select time</option>
            </select> */}
              {formik.errors.appointmentTime &&
              formik.touched.appointmentTime ? (
                <div style={{ color: "red" }} className="errmsg">
                  {formik.errors.appointmentTime}{" "}
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-xs-12 ">
            <button type="submit" className="btn btn-primary btn-block">
              Make Appointment
            </button>
            {appointmentsuccess ? (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>Success!</strong>
                {appointmentsuccess}
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
                <strong>Error!</strong>
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
        <img
          src="/images/dashboard/bookappointment/bookanappointment.png"
          alt="image.png"
          className="bookappimage"
        ></img>
      </div>
    </>
  );
}
