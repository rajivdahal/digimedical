import React from "react";
import { httpClient } from "../../../../utils/httpClient";
import "./Internalappointmentbook.component.css";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { notify } from "../../../../services/notify";
import { formatDate } from "../../../../services/timeanddate";
import Clear from "@material-ui/icons/Clear";
import TimePicker from "react-time-picker";
import Select from "react-select";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import DigiDoctorPayment from "./../../../../component/common/popup/doctorPopup/selectPaymentMethod/forDigiDoctor/digiDoctorPayment";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { setOpenPopUp } from "../../../../actions/paymentPopUp.ac";
import CircularProgress from "@mui/material/CircularProgress";
import {
  callApiForInitialBooking,
  digiDoctorAppointmentBookLoading,
  digiDoctorAppointmentBookNotLoading,
  digiDoctorAppointmentFixed,
} from "../../../../actions/digiDoctorBooking.ac";
import { dateEquivalator } from "../../../../utils/dateHelper";
import {
  splitAlphabeticDate,
  convertAlphabeticMonthToNumeric,
} from "../../../../utils/dateHelper";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Internalappointmentbook(prop) {
  console.log("edit data are", prop.location.data);
  const editdata = prop.location.data ? prop.location.data : null;
  const [appointmentsuccess, setappointmentsuccess] = useState(null);
  const [appointmentfailed, setappointmentfailed] = useState(null);
  const [services, setservices] = useState([]);
  const [doctors, setdoctors] = useState([]);
  const [doctorname, setdoctorname] = useState(null);
  const [service, setservicename] = useState(null);
  const [corporatememberemail, setcorporatememberemail] = useState([]);
  const [toeditdata, settoeditdata] = useState(editdata);
  const [isdoctorblurred, setisdoctorblurred] = useState(false);
  const [value, onChange] = useState(
    toeditdata ? toeditdata.appointmenttime : "11:00"
  );

  const [finalData, setFinalData] = useState(null);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
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
  // if (toeditdata) {
  //   toeditdata["serviceId"] = toeditdata["serviceId"];
  // }
  const callapi = (url, values) => {
    // console.log("values are",values)
    httpClient
      .POST(url, values, false, true)
      .then((resp) => {
        if (prop.location.pathname == "/dashboard/corporate/bookappointment") {
          // prop.history.push("/dashboard/corporate/viewappointment");
          notify.success("Appointment booked successfully");
        } else {
          // prop.history.push("/dashboard/viewappointment");
          notify.success("Appointment booked successfully");
        }
      })
      .catch((err) => {
        setappointmentfailed("Something went wrong");
        notify.error("Appointment unable to book");
      });
  };
  useEffect(() => {
    // debugger
    httpClient
      .GET("services/get/true", false, true)
      .then((resp) => {
        let allServices = resp.data.data;
        let options = allServices.map((service, index) => {
          return {
            label: service.servicename,
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
    // convert the date format March 3, 2022 to
    if (toeditdata) {
      let date = toeditdata.appointmentdate;
      let parsedDate = splitAlphabeticDate(date);
      parsedDate.month = convertAlphabeticMonthToNumeric(parsedDate.month);
      setSelectedDay(parsedDate);
      // console.log("parsed Month is",parsedMonth)
      // let year=""
      // let month=""
      // let day=""
      // // let month=date.replace(/[^A-Za-z]/g, '')
      // // console.log("month equivalator is",dateEquivalator)
      // for (let index = date.length-1; index >=0; index--) {
      //   if(index>date.length-5){
      //     year=year+date[index]
      //   }
      //   if(index>date.length-9 && index<date.length-6){
      //     day=day+date[index]
      //   }
      //   if(index<date.length-9){
      //     month=month+date[index]
      //   }
      // }
      // year=year.split("").reverse().join("");
      // month=month.split("").reverse().join("");
      // day=day.split("").reverse().join("");

      // console.log("month and year issss",month,year,day)
      // for (const key in dateEquivalator){
      //    if(key===month){
      //      month=dateEquivalator[key]
      //    }
      // }
      // console.log("parsed month is",month)
    }

    //end of convert the date format March 3, 2022 to
  }, []);
  const formik = useFormik({
    initialValues: {
      servicesId: "",
      doctorId: "",
      appointmentDate: toeditdata ? "" : date,
      appointmentTime: "",
      email: "",
      serviceName: "",
      doctorName: "",
      doctorService: null,
    },
    validate: (values) => {
      if (toeditdata) {
        return;
      }
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
      // debugger

      if (toeditdata) {
        let finaldata = {};
        finaldata["servicesId"] = toeditdata["serviceId"];
        finaldata["appointmentTime"] = values.appointmentTime;
        finaldata["doctorId"] = toeditdata["doctorId"];
        finaldata["appointmentDate"] = values.appointmentDate;
        // console.log("to edit data are>>>>", finaldata, toeditdata);
        return httpClient
          .PUT(
            `update-appointment/${toeditdata.appointmentId}`,
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
        return callapi("create-appointment/corporate", formik.values);
      }
      doctorAppointmentBookLoading(true);
      setDigiDoctorAppointment(values);
      // apiCallForInitialBooking(values)
      setFinalData(values);
      openDoctorPopUp(true);
    },
  });
  // Redux implementation
  const dispatch = useDispatch();
  const popUpActionsData = useSelector((state) => state.paymentPopUp);
  const digiDoctorAppointmentBookingData = useSelector(
    (state) => state.digiDoctorAppointmentBooking
  );
  const openDoctorPopUp = bindActionCreators(setOpenPopUp, dispatch);
  const setDigiDoctorAppointment = bindActionCreators(
    digiDoctorAppointmentFixed,
    dispatch
  );
  const doctorAppointmentBookLoading = bindActionCreators(
    digiDoctorAppointmentBookLoading,
    dispatch
  );
  const doctorAppointmentBookNotLoading = bindActionCreators(
    digiDoctorAppointmentBookNotLoading,
    dispatch
  );
  const apiCallForInitialBooking = bindActionCreators(
    callApiForInitialBooking,
    dispatch
  );

  console.log(
    "Digi doctor appointment booking data are",
    digiDoctorAppointmentBookingData
  );
  // end of redux implementation

  const handleChange = (item) => {
    delete formik.errors.servicesId;
    formik.setFieldValue("servicesId", item.value);
    formik.setFieldValue("serviceName", item.label);
    httpClient
      .GET(`doctor/get-related-doctor/${item.value}`, false, true)
      .then((resp) => {
        if (!resp.data.data.length) {
          return notify.error("No any doctors are available to this service");
        }
        let allDoctors = resp.data.data.map((doctor, index) => {
          return {
            label: doctor.name,
            value: doctor,
          };
        });
        setdoctors(allDoctors);
      })
      .catch((err) => {
        setdoctors([]);
        notify.error("No any doctors are available to this service");
      });
  };
  const handleTimeChange = (value) => {
    toeditdata.appointmenttime = value;
    onChange(value);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (toeditdata) {
      let finaldata = {};
      finaldata["servicesId"] = toeditdata["serviceid"];
      finaldata["appointmentTime"] = toeditdata["appointmenttime"];
      finaldata["doctorId"] = toeditdata["doctorid"];
      finaldata["appointmentDate"] = toeditdata["appointmentdate"];
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
      return callapi("create-appointment/corporate", formik.values);
    }
    return callapi("create-appointment", formik.values);
  };
  const getdoctorinfo = (doctorid) => {
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
  if (value) {
    formik.values.appointmentTime = value;
    formik.values.appointmentDate =
      selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day;
  }
  const clearpopup = () => {
    setisdoctorblurred(false);
  };
  const handleDoctorChange = (doctor) => {
    formik.setFieldValue("doctorId", doctor.value.doctorid);
    formik.setFieldValue("doctorName", doctor.value.name);
    formik.setFieldValue("doctorService", doctor.value.digiService);
    getdoctorinfo(doctor.value.doctorid);
  };
  const handleDateChange = (value) => {
    // console.log("date is",value)

    let date = value.year + "-" + value.month + "-" + value.day;
    if (toeditdata) {
      toeditdata.appointmentdate = date;
    } else {
      formik.values.appointmentDate = date;
    }
    setSelectedDay({
      year: value.year,
      month: value.month,
      day: value.day,
    });
  };
  // for edit data case
  let formcontent = toeditdata ? (
    <div>
      {prop.location.pathname == "/dashboard/corporate/bookappointment" ? (
        <div className="form-row bkapn-corp-selmem">
          <label htmlFor="service">Select Member</label>
          <select
            id="email"
            name="email"
            className=""
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
            disabled
          >
            <option>{toeditdata.doctorsName}</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label htmlFor="appointment">Appointment Date.</label>
          <br />
          <div className="internal-appointment-datepicker-edit">
            <DatePicker
              className="form-control"
              shouldHighlightWeekends
              value={selectedDay}
              minimumDate={minDate}
              onChange={handleDateChange}
            ></DatePicker>
          </div>
          {/* <h4>{
          toeditdata?
          formatDate(toeditdata.appointmentdate)
        :null
        }</h4> */}
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="time">Time</label>
          <TimePicker
            onChange={handleTimeChange}
            value={value}
            required
            className="time-picker"
          />
        </div>
        {/* <h4>{
          toeditdata?
          toeditdata.appointmenttime
        :null
        }</h4> */}
      </div>
    </div>
  ) : (
    // end of edit data case
    // start of making appointment case
    <div>
      {prop.location.pathname == "/dashboard/corporate/bookappointment" ? (
        <div className="form-row bkapn-corp-selmem">
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
        <div className="form-group col-md-12">
          <label htmlFor="appointment">Appointment Date</label>

          <br />
          <div className="internal-appointment-datepicker">
            <DatePicker
              // className="form-control"
              style={{}}
              shouldHighlightWeekends
              value={selectedDay}
              onChange={handleDateChange}
              minimumDate={minDate}
            ></DatePicker>
          </div>
          {formik.errors.appointmentDate && formik.touched.appointmentDate ? (
            <div style={{ color: "red" }} className="errmsg">
              {formik.errors.appointmentDate}{" "}
            </div>
          ) : null}
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="time">Time</label>

          <div className="intappoin_timepicker">
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
          {formik.errors.appointmentTime && formik.touched.appointmentTime ? (
            <div style={{ color: "red" }} className="errmsg">
              {formik.errors.appointmentTime}{" "}
            </div>
          ) : null}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label htmlFor="service">Select Service</label>
          <Select options={services} onChange={handleChange} />
          {console.log("rendered rendered")}
          {formik.errors.servicesId && formik.touched.servicesId ? (
            <div style={{ color: "red" }} className="errmsg">
              {formik.errors.servicesId}{" "}
            </div>
          ) : null}
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="doctor">Select Doctor</label>
          <Select options={doctors} onChange={handleDoctorChange} />
          {formik.errors.doctorId && formik.touched.doctorId ? (
            <div style={{ color: "red" }} className="errmsg">
              {formik.errors.doctorId}
            </div>
          ) : null}
          {isdoctorblurred ? (
            <div class="dash_docs">
              <div class="dash_doc bubbble">
                <Clear className="clear-icon" onClick={clearpopup}></Clear>
                <div class="imag1">
                  <img src={doctorfetched.image} />
                </div>
                <div class="doc-pop-description">
                  <div>
                    {" "}
                    <p id="doc_name">Dr. {doctorfetched.name}</p>
                    <p id="doc_edu">{doctorfetched.prefix}</p>
                  </div>
                  <p id="doc_skill">{doctorfetched.specialist}</p>

                  <p id="doc_exp">{doctorfetched.description}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
  // end of making appointment case
  return (
    <div className="Hello_w">
      <div className="marginadj">
        <form className="form-width-adjust">
          {formcontent}
          <div className="col-md-12 col-sm-12 col-xs-12 ">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={formik.handleSubmit}
            >
              {editdata ? (
                "Save Changes"
              ) : digiDoctorAppointmentBookingData.isLoadingAppointmentBooking ? (
                <CircularProgress></CircularProgress>
              ) : (
                "Make Appointment"
              )}
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
      {popUpActionsData.trigger ? (
        <DigiDoctorPayment
          origin="appointmentBooking"
          directBookAppointmentProps={finalData}
        ></DigiDoctorPayment>
      ) : null}
    </div>
  );
}
