import React from "react";
import { httpClient } from "../../../../utils/httpClient";
import "./Internalappointmentbook.component.css";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { notify } from "../../../../services/notify";
import { formatDate } from "../../../../services/timeanddate";
import { Todaydate } from "../../../../services/todaydate";
import Clear from "@material-ui/icons/Clear";
import TimePicker from "react-time-picker";
import Select from "react-select";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Internalappointmentbook(prop) {
  const editdata = prop.location.data ? prop.location.data : null;
  console.log("to edit data is", editdata);
  const [appointmentsuccess, setappointmentsuccess] = useState(null);
  const [appointmentfailed, setappointmentfailed] = useState(null);
  const [services, setservices] = useState([]);
  const [doctors, setdoctors] = useState([]);
  const [doctorname, setdoctorname] = useState(null);
  const [service, setservicename] = useState(null);
  const [corporatememberemail, setcorporatememberemail] = useState([]);
  const [toeditdata, settoeditdata] = useState(editdata);
  const [isdoctorblurred, setisdoctorblurred] = useState(false);
  const [value, onChange] = useState("12:00");

  const [doctorfetched, setdoctorfetched] = useState({
    image: null,
    prefix: null,
    name: null,
    specialist: null,
    description: null,
  });
  var dt = new Date();
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
  if (toeditdata) {
    toeditdata["serviceId"] = toeditdata["servicesId"];
  }
  const callapi = (url, values) => {
    httpClient
      .POST(url, values, false, true)
      .then((resp) => {
        let message = resp.data.message;
        setappointmentsuccess(resp.data.message);
      })
      .catch((err) => {
        setappointmentfailed("Something went wrong");
      });
  };
  useEffect(() => {
    httpClient
      .GET("services/get/true", false, true)
      .then((resp) => {
        let allServices = resp.data.data;
        let options = allServices.map((service, index) => {
          return {
            label: service.serviceName,
            value: service.id,
          };
        });
        setservices(options);
      })
      .catch((err) => {
        notify.error("Something went wrong");
      });
    if (prop.location.pathname == "/dashboard/corporate/bookappointment") {
      httpClient
        .GET("corporate/get/members/name", false, true)
        .then((resp) => {
          setcorporatememberemail(resp.data.data);
        })
        .catch((err) => {
          notify.error("Something went wrong");
        });
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      servicesId: "",
      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
      email: "",
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
  });
  const handleChange = (item) => {
    console.log("inside handlechange", item);
    formik.setFieldValue("servicesId", item.value);
    httpClient
      .GET(`doctor/get-related-doctor/${item.value}`, false, true)
      .then((resp) => {
        let allDoctors = resp.data.data.map((doctor, index) => {
          return {
            label: doctor.name,
            value: doctor.id,
          };
        });
        setdoctors(allDoctors);
      })
      .catch((err) => {
        setdoctors([]);
        notify.error("No any doctors are available to this service");
      });
  };
  const handleeditchange = (e, suffix) => {
    let name;
    let value;
    if (!suffix) {
      console.log("inside if not suffix");
      name = e.target.name;
      value = e.target.value;
      console.log(
        "name and values are",
        name,
        value,
        "to edit data is",
        toeditdata
      );
      if (name === "servicesId") {
        httpClient
          .GET(`services/get-name/${value}`)
          .then((resp) => {
            setservicename(resp.data.data.servicename);
            settoeditdata((prevvalue) => {
              return {
                ...prevvalue,
                serviceName: null,
              };
            });
          })
          .catch((err) => {
            notify.error("something went wrong");
          });
      }
      if (name === "doctorId") {
        httpClient
          .GET(`doctor/doctor-name/${value}`)
          .then((resp) => {
            let doctorname = resp.data.data.name;
            setdoctorname(doctorname);
            settoeditdata((prevvalue) => {
              return {
                ...prevvalue,
                doctorsName: null,
              };
            });
          })
          .catch((err) => {
            notify.error("something went wrong");
          });
      }
    }
    if (suffix == "appointmentdate") {
      console.log("inside appintmentdate suffix");
      var completedate = e.year + "-" + e.month + "-" + e.day;
      console.log("completed date is", completedate);
      name = "appointmentdate";
      value = completedate;
      setSelectedDay({
        year: e.year,
        month: e.month,
        day: e.day,
      });
    }
    settoeditdata((prevvalue) => {
      return {
        ...prevvalue,
        [name]: value,
      };
    });
    setTimeout(() => {
      console.log("data changed", toeditdata);
    }, 4000);
  };
  useEffect(() => {
    console.log(toeditdata);
  }, [toeditdata]);
  const handlesubmit = (e) => {
    e.preventDefault();
    if (toeditdata) {
      let finaldata = {};
      finaldata["servicesId"] = toeditdata["serviceid"];
      finaldata["appointmentTime"] = toeditdata["appointmenttime"];
      finaldata["doctorId"] = toeditdata["doctorid"];
      finaldata["appointmentDate"] = toeditdata["appointmentdate"];
      // finaldata['appointmentId']=toeditdata['appointmentid']
      console.log("to edit data are>>>>", finaldata, toeditdata);
      return httpClient
        .PUT(
          `update-appointment/${toeditdata.appointmentid}`,
          finaldata,
          false,
          true
        )
        .then((resp) => {
          notify.success("Appointment updated successfully");
          prop.location.pathname == "/dashboard/corporate/bookappointment"
            ? prop.history.push("/dashboard/corporate/viewappointment")
            : prop.history.push("/dashboard/viewappointment");
        })
        .catch((err) => {
          notify.error("Error in updating the appointment");
        });
    }
    if (prop.location.pathname == "/dashboard/corporate/bookappointment") {
      callapi("create-appointment/corporate", formik.values);
      notify.success("Appointment booked successfully");

      return prop.history.push("/dashboard/corporate/viewappointment");
    }
    console.log(formik.values);
    callapi("create-appointment", formik.values);
    prop.history.push("/dashboard/viewappointment");
    notify.success("Appointment booked successfully");
  };
  const getdoctorinfo = (doctorid) => {
    if (!doctorid) {
      return setisdoctorblurred(false);
    }
    console.log(doctorid);
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
        console.log(resp.data.data);
      })
      .catch((err) => {
        notify.error("something went wrong");
      });
  };
  if (value) {
    formik.values.appointmentTime = value;
  }
  const clearpopup = () => {
    setisdoctorblurred(false);
  };
  const handleDoctorChange = (doctor) => {
    formik.setFieldValue("doctorId", doctor.value);
    getdoctorinfo(doctor.value);
  };
  const handleDateChange = (value) => {
    formik.values.appointmentDate =
      value.year + "-" + value.month + "-" + value.day;
    setSelectedDay({
      year: value.year,
      month: value.month,
      day: value.day,
    });
  };
  let formcontent = toeditdata ? (
    <div>
      {prop.location.pathname == "/dashboard/corporate/bookappointment" ? (
        <div className="form-row">
          <label htmlFor="service">Select Member</label>
          <select
            id="email"
            name="email"
            className="form-control"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            disabled
          >
            <option>{toeditdata.patientsname}</option>
          </select>
        </div>
      ) : null}
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="service">Select Service</label>
          <select
            name="servicesId"
            className="form-control manageZIndex"
            onChange={(e) => {
              handleChange(e);
            }}
            disabled
          >
            <option style={{ zIndex: "100" }}>{toeditdata.servicename}</option>
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="doctor">Select Doctor</label>
          <select
            id="doctorId"
            className="form-control"
            name="doctorId"
            onChange={(e) => {
              handleeditchange(e);
            }}
            disabled
          >
            <option>{toeditdata.doctorsname}</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label htmlFor="appointment">Appointment Date.</label>
          <br />
          <DatePicker
            className="form-control"
            shouldHighlightWeekends
            value={selectedDay}
            onChange={(value) => handleeditchange(value, "appointmentdate")}
            minimumDate={minDate}
          ></DatePicker>
          <h4>{formatDate(toeditdata.appointmentdate)}</h4>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            placeholder="select time"
            id="appointmenttime"
            name="appointmenttime"
            onChange={(e) => {
              handleeditchange(e);
            }}
          ></input>
          <h4>{toeditdata.appointmenttime}</h4>
        </div>
      </div>
    </div>
  ) : (
    <div>
      {prop.location.pathname == "/dashboard/corporate/bookappointment" ? (
        <div className="form-row">
          <label htmlFor="service">Select Member</label>
          <select
            id="email"
            name="email"
            className="form-control"
            style={{ color: "black" }}
            onChange={(e) => {
              formik.handleChange(e);
            }}
          >
            <option value={null}></option>
            {corporatememberemail.map((item, index) => {
              return (
                <option key={index} value={item.email}>
                  {item.email}
                </option>
              );
            })}
          </select>
          {formik.errors.email && formik.touched.email ? (
            <div style={{ color: "red" }} className="errmsg">
              {formik.errors.email}{" "}
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="service">Select Service</label>
          <Select options={services} onChange={handleChange} />
          {formik.errors.servicesId && formik.touched.servicesId ? (
            <div style={{ color: "red" }} className="errmsg">
              {formik.errors.servicesId}{" "}
            </div>
          ) : null}
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="doctor">Select Doctor</label>
          <Select options={doctors} onChange={handleDoctorChange} />
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
          <br />
          <DatePicker
            className="form-control"
            shouldHighlightWeekends
            value={selectedDay}
            onChange={handleDateChange}
            minimumDate={minDate}
          ></DatePicker>
          {formik.errors.appointmentDate && formik.touched.appointmentDate ? (
            <div style={{ color: "red" }} className="errmsg">
              {formik.errors.appointmentDate}{" "}
            </div>
          ) : null}
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="time">Time</label>
          <div>
            <TimePicker
              onChange={onChange}
              value={value}
              required
              className="time-picker"
            />
          </div>
          {formik.errors.appointmentTime && formik.touched.appointmentTime ? (
            <div style={{ color: "red" }} className="errmsg">
              {formik.errors.appointmentTime}{" "}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="marginadj">
        <form className="form-width-adjust">
          {formcontent}
          <div className="col-md-12 col-sm-12 col-xs-12 ">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handlesubmit}
            >
              {editdata ? "Save Changes" : "Make Appointment"}
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
        {isdoctorblurred ? (
          <div class="docs">
            <div class="doc bubbble">
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
        <img
          src="/images/dashboard/bookappointment/bookanappointment.png"
          alt="image.png"
          className="bookappimage"
        ></img>
      </div>
    </>
  );
}
