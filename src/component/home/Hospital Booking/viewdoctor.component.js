import React from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import Pagination from "../../common/pagination/pagination.component";
import "./viewdoctor.component.css";
import phone from "../../../assets/phone.png";
import { httpClient } from "../../../utils/httpClient";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { notify } from "../../../services/notify";
import * as yup from "yup";
import { firstUpperCase } from "../../../utils/stringUppercase";
import DoctorPopup from "../../common/popup/doctorPopup/doctorPopup";
// import DocPopup from "../../common/popup/doctorPopup";
import Accordion from "react-bootstrap/Accordion";
import PayPop from "../../common/popup/paymentpopup/payment";
import BookAnAppointment from "../BookAnAppointment/BookAnAppointment";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { setDoctorInfo } from "../../../actions/hospitalAppointmentBooking.ac";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Hospital_doctors(props) {
  let [alldoctors, setallDoctors] = useState([]);
  let [searcheddoctors, setsearcheddoctors] = useState([]);
  let [issearched, setIssearched] = useState(false);
  const [docPopup, SetDocPopup] = useState(false);
  let [doctorappointmentindex, setdoctorappointmentindex] = useState(null);
  const history = useHistory();
  useEffect(() => {
    httpClient
      .GET("hospital/get-all/doctors/" + props.location.state.id)
      .then((resp) => {
        let data = resp.data.data;
        console.log(resp);
        data.forEach((item) => {
          if (item.availabledays) {
            item.formattedDays = item.availabledays.split(",");
            item.formattedDays = item.formattedDays.map((days) => {
              return firstUpperCase(days);
            });
          }

          if (item.starttime) {
            let tempstartArr = item.starttime.split(":");
            tempstartArr.splice(2,1);
            item.startTime = tempstartArr.join(":");
            let hours = parseInt(tempstartArr[0]);
            if (hours > 0 && hours < 12) {
              item.startTime += " AM";
            }
          }

          if (item.endtime) {
            let tempEndArr = item.endtime.split(":");
            tempEndArr.splice(2,1);
            item.endTime = tempEndArr.join(":");
            let hours = parseInt(tempEndArr[0]);
            if (hours > 11 && hours < 24) {
              item.endTime += " PM";
            }
          }
        })
        setallDoctors(data);
      });
    window.scrollTo(0, 0);
  }, []);


  const showappointment = (item, index) => {
    if (!doctorappointmentindex) {
      return setdoctorappointmentindex(parseInt(index) + 1);
    }
    setdoctorappointmentindex(null);
  };
  var dt = new Date();
  const [selectedDay, setSelectedDay] = useState({
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate(),
  });
  const [minDate, setminDate] = useState({
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate()
  })
  // const [initialValues,setInitialValues]=useState({
  //   firstName: "",
  //   middleName: "",
  //   lastName: "",
  //   email: "",
  //   mobileNumber: "",
  //   appointmentDate: "",
  //   appointmentTime: "",
  // })
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    appointmentTime: "",
  };
  const [appointmentDate, setAppointmentDate] = useState(
    dt.getFullYear() + "-" + parseInt(dt.getMonth() + 1) + "-" + dt.getDate()
  );

  let schema = yup.object().shape({
    appointmentTime: yup.string().required(" Appointment Time is Required"),
  });

  const handleSubmit = (values, doctor, index) => {
    // console.log("values are", values,appointmentDate);
    // console.log(values.appointmentDate,values.appointmentTime)
    let finaldata = {};
    finaldata = {
      ...values,
      hospitalId: props.location.state.id,
      doctorId: doctor.doctorid,
      servicesId: doctor.serviceid,
      appointmentDate:appointmentDate
    }
    httpClient
      .POST(
        props.match.url == "/dashboard/hospitals/view-doctors"
          ? "create-appointment"
          : "create-external-user",
        finaldata,
        false,
        props.match.url == "/dashboard/hospitals/view-doctors" ? true : false
      )
      .then((resp) => {
        if (props.match.url != "/dashboard/hospitals/view-doctors") {
          notify.promise(
            new Promise(function (resolve, reject) {
              resolve(
                "Booking success! Please check your email to verify account"
              );
            })
          );
          history.push({
            pathname: "/login",
            fromexternaluser: true,
          });
        } else {
          history.push("/dashboard");
          notify.success("Hospital appointment booked successfully");
        }
        showappointment(doctor, index);
      })
      .catch((err) => {
        if (props.match.url != "/dashboard/hospitals/view-doctors") {
          if (err.response.data.message == "Email already exists") {
            if (localStorage.getItem("status") == 200) {
              notify.success(
                "Email already exists,please book hospital appointment internally"
              );
              return history.push("/dashboard");
            } else {
              history.push("/login");
              return notify.promise(
                new Promise(function (resolve, reject) {
                  resolve(
                    "Email already exist please login and book internally"
                  );
                })
              );
            }
          }
        }
        notify.error("Something went wrong");
      });
  };
  const searchDoctors = (e) => {
    setIssearched(true);
    let searched = alldoctors.filter((item, index) => {
      if (item.doctorname.toLowerCase().includes(e.target.value)) {
        return true;
      }
    });
    setsearcheddoctors(searched);
  };
  const datechange = (value, status) => {
    let date = ""
    date = value.year + "-" + value.month + "-" + value.day
    setAppointmentDate(date);
    setSelectedDay(value)
  }

    // Redux implementation
    const dispatch = useDispatch();
    const appointmentBooking = useSelector((state) => state.appointmentBooking);
    const settingDoctorInfo=bindActionCreators(setDoctorInfo,dispatch)

    // end of redux implementation

  const bookAnAppointment=(doctor)=>{
    console.log("doctor is",doctor)
    SetDocPopup(true)
    settingDoctorInfo(doctor)
  }

  return (
    <div>
      {props.match.url == "/dashboard/hospitals/view-doctors" ? null : (
        <Navbar></Navbar>
      )}

      <div className="hospital_doc_appoint">
        <div>
          {props.match.url != "/dashboard/hospitals/view-doctors" ? (
            <div className="hospital_doc_checkroute">
              <p>Home</p>
              <p>
                <i className="doc_arrow doc_right"></i>
              </p>
              <Link to={"/hospitals"}>
                {" "}
                <p>Hospitals</p>
              </Link>
              <p>
                <i className="doc_arrow doc_right"></i>
              </p>
              <p id="hospital_name">{props.location.state.name}</p>
            </div>
          ) : null}
        </div>
        <div
          className={
            props.location
              ? (props.location.pathname = "/dashboard/hospitals/view-doctors"
                  ? "doc_appoint_main1_user"
                  : "doc_appoint_main1_user")
              : "doc_appoint_main1"
          }
        >
          {" "}
          <div className="take_doc_appoint">
            <div className="doc_appoint_head">
              <div>
                <h1>Doctors</h1>
                <p>Select or search available doctors</p>
              </div>
              <div className="doc_booksearch">
                <form className="doc_example" action="/action_page.php">
                  <input
                    type="text"
                    placeholder="Search Doctors .."
                    name="search"
                    onChange={searchDoctors}
                  />
                  <button>
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </div>
            </div>

            <div className="doc_appoint_main">
              <PayPop></PayPop>
              {!searcheddoctors.length && !issearched ? (
                alldoctors.length ? (
                  alldoctors.map((doctor, doctorindex) => {
                    return (
                      <div className="doc_apoint_card">
                        <div className="doc_apoint_card1">
                          <div className="doc_card_img">
                            <img
                              src={
                                REACT_APP_BASE_URL +
                                "doctor/download/" +
                                doctor.doctorid
                              }
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/images/doctor.jpeg";
                              }}
                              alt=""
                              style={{
                                height: "140px",
                                width: "140px",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                          <div className="doc_about_desc">
                            <div className="doc_about_desc_head">
                              {" "}
                              <p id="doc_name_card">
                                {doctor.prefix}. {doctor.doctorname}
                              </p>
                              <p id="doc_edu_brief">{doctor.prefix}</p>
                            </div>

                            <p>{doctor.specialist} </p>
                            <p id="doc_available_days">
                              Available days :{" "}
                              {doctor.formattedDays ? (
                                doctor.formattedDays.map((day, index) => {
                                  return (
                                    <span id="span1_doc_card">
                                      {day}{" "}
                                      {index ==
                                      doctor.formattedDays.length - 1 ? (
                                        <></>
                                      ) : (
                                        <span>, </span>
                                      )}
                                    </span>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </p>

                            <p>
                              Available time :{" "}
                              <span id="span1_doc_card">{doctor.startTime} - {doctor.endTime}</span>

                            </p>
                            <div className="doc_accordion">
                              <Accordion>
                                <Accordion.Item eventKey="0">
                                  <Accordion.Header>
                                    Available consultation medium
                                  </Accordion.Header>
                                  <Accordion.Body className="acc-doc-body">
                                    <ul className="accordion-body">
                                      <li>Doctor at Home</li>
                                      <li>Consult Online</li>
                                      <li>Book at Hospital</li>
                                    </ul>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </div>
                          </div>{" "}
                          <div className="doc_card_but">
                            {" "}
                            <button
                              onClick={() => bookAnAppointment(doctor)}
                              id="doc_card_but"
                            >
                              Book an appointment
                            </button>
                          </div>
                          <DoctorPopup
                            trigger={docPopup}
                            setTrigger={SetDocPopup}
                          ></DoctorPopup>
                          <div id="popup5" className="overlay1">
                            <div className="popup">
                              <h2>Here i am</h2>
                              <a className="close" >
                                &times;
                              </a>
                              <div className="content">
                                Thank to pop me out of that button, but now i'm
                                done so you can close this window.
                              </div>
                            </div>
                          </div>
                        </div>
                        {doctorappointmentindex == doctorindex + 1 ? (
                          <Formik
                            initialValues={initialValues}
                            onSubmit={(values) =>
                              handleSubmit(values, doctor, doctorindex)
                            }
                            validationSchema={schema}
                          >
                            {(values) => {
                              console.log("form values are", values);
                              return (
                                <Form className="form_doc">
                                  {props.match.url !=
                                  "/dashboard/hospitals/view-doctors" ? (
                                    <>
                                      <div className="doc_appoin_form1">
                                        <p>First Name</p>
                                        <Field
                                          type="text"
                                          placeholder="Enter First Name"
                                          name="firstName"
                                          id="firstName"
                                        />
                                      </div>
                                      <div className="doc_appoin_form1">
                                        <p>Middle Name</p>
                                        <Field
                                          type="text"
                                          placeholder="Enter Middle Name"
                                          name="middleName"
                                          id="middleName"
                                        />
                                      </div>
                                      <div className="doc_appoin_form1">
                                        <p>Last Name</p>
                                        <Field
                                          type="text"
                                          placeholder="Enter Last Name"
                                          name="lastName"
                                          id="lastName"
                                        />
                                      </div>
                                      <div className="doc_appoin_form1">
                                        <p>Email Address</p>
                                        <Field
                                          type="text"
                                          placeholder="Enter Email Address"
                                          name="email"
                                          id="email"
                                        />
                                      </div>
                                      <div className="doc_appoin_form1">
                                        <p>Phone No.</p>
                                        <Field
                                          type="text"
                                          placeholder="Enter Phone no."
                                          name="mobileNumber"
                                          id="mobileNumber"
                                        />
                                      </div>
                                    </>
                                  ) : null}
                                  <div className="doc_appoin_form1">
                                    <p>Appointment Date</p>
                                    <DatePicker
                                      value={selectedDay}
                                      minimumDate={minDate}
                                      onChange={datechange}
                                      inputPlaceholder="Select a day"
                                      shouldHighlightWeekends
                                      name="appointmentDate"
                                      id="appointmentDate"
                                    />
                                  </div>
                                  <div className="doc_appoin_form1">
                                    <p>Appointment Time</p>
                                    <Field
                                      type="time"
                                      name="appointmentTime"
                                      id="appointmentTime"
                                    />
                                    <ErrorMessage
                                      name="appointmentTime"
                                      render={(msg) => (
                                        <div className="err-message-bottom-doctor">
                                          {msg}
                                        </div>
                                      )}
                                    ></ErrorMessage>
                                  </div>
                                  <button
                                    type="submit"
                                    className="submit-button"
                                    style={{ marginTop: "30px" }}
                                  >
                                    Submit
                                  </button>
                                </Form>
                              );
                            }}
                          </Formik>
                        ) : null}
                      </div>
                    );
                  })
                ) : (
                  <h3>No any doctors found</h3>
                )
              ) : searcheddoctors.length && issearched ? (
                searcheddoctors.map((doctor, doctorindex) => {
                  return (
                    <div className="doc_apoint_card">
                      <div className="doc_apoint_card1">
                        <div className="doc_card_img">
                          <img
                            src={
                              REACT_APP_BASE_URL +
                              "doctor/download/" +
                              doctor.doctorid
                            }
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/doctor.jpeg";
                            }}
                            alt=""
                            style={{
                              height: "142px",
                              width: "190px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <div className="doc_about_desc">
                          <p id="doc_name_card">
                            {doctor.prefix}. {doctor.doctorname}
                          </p>
                          <p>{doctor.specialist} </p>
                          <p id="doc_available_days">
                            Available days :{" "}
                            {doctor.formattedDays ? (
                              doctor.formattedDays.map((day, index) => {
                                return (
                                  <span id="span1_doc_card">
                                    {day}{" "}
                                    {index ==
                                    doctor.formattedDays.length - 1 ? (
                                      <></>
                                    ) : (
                                      <span>, </span>
                                    )}
                                  </span>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </p>
                          <p>
                            Available time :{" "}
                            <span id="span1_doc_card">
                              {doctor.starttime} - {doctor.endtime}
                            </span>
                          </p>
                        </div>{" "}
                        <div className="hosp_card_but">
                          {" "}
                          <button
                            id="hosp_card_but"
                            onClick={() => showappointment(doctor, doctorindex)}
                          >
                            Book an appointment
                          </button>
                        </div>
                      </div>
                      {/* after clicking book an appointment */}
                      {doctorappointmentindex == doctorindex + 1 ? (
                        <Formik
                          initialValues={initialValues}
                          onSubmit={(values) =>
                            handleSubmit(values, doctor, doctorindex)
                          }
                        >
                          <Form className="form_doc">
                            {props.match.url !=
                            "/dashboard/hospitals/view-doctors" ? (
                              <>
                                <div className="doc_appoin_form1">
                                  <p>First Name</p>
                                  <Field
                                    type="text"
                                    placeholder="Enter First Name"
                                    name="firstName"
                                    id="firstName"
                                  />
                                </div>
                                <div className="doc_appoin_form1">
                                  <p>Middle Name</p>
                                  <Field
                                    type="text"
                                    placeholder="Enter Middle Name"
                                    name="middleName"
                                    id="middleName"
                                  />
                                </div>
                                <div className="doc_appoin_form1">
                                  <p>Last Name</p>
                                  <Field
                                    type="text"
                                    placeholder="Enter Last Name"
                                    name="lastName"
                                    id="lastName"
                                  />
                                </div>
                                <div className="doc_appoin_form1">
                                  <p>Email Address</p>
                                  <Field
                                    type="text"
                                    placeholder="Enter Email Address"
                                    name="email"
                                    id="email"
                                  />
                                </div>
                                <div className="doc_appoin_form1">
                                  <p>Phone No.</p>
                                  <Field
                                    type="text"
                                    placeholder="Enter Phone no."
                                    name="mobileNumber"
                                    id="mobileNumber"
                                  />
                                </div>
                              </>
                            ) : null}
                            <div className="doc_appoin_form1">
                              <p>Appointment Date</p>
                              <Field
                                type="date"
                                name="appointmentDate"
                                id="appointmentDate"
                              />
                            </div>
                            <div className="doc_appoin_form1">
                              <p>Appointment Time</p>
                              <Field
                                type="time"
                                name="appointmentTime"
                                id="appointmentTime"
                              />
                            </div>
                            <button type="submit" className="submit-button">
                              Submit
                            </button>
                          </Form>
                        </Formik>
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <h3>No any doctors found</h3>
              )}
            </div>
          </div>
          <div className="doc_appoin_hosp_desc">
            <div className="hosp_desc_hosp">
              <img
                src={
                  REACT_APP_BASE_URL +
                  "hospital/download/" +
                  props.location.state.id
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/hospital.jpeg";
                }}
                alt="hospital book image"
                style={{
                  height: "160px",
                  width: "160px",
                  borderRadius: "50%",
                }}
                alt=""
              />
              <p id="hosp_name_doc">{props.location.state.name}</p>
              <p>
                <i className="fas fa-map-marker-alt"></i> &nbsp;{" "}
                {props.location.state.address}
              </p>
              <p id="hosp_ph_no">
                <img src={phone} alt="" />
                &nbsp; {props.location.state.contactnumber};{" "}
                {props.location.state.mobilenumber}
              </p>
              <p>
                <i className="fas fa-envelope"></i>&nbsp;
                {props.location.state.address}
              </p>
              <p id="hosp_ph_no">
                {props.location.state.establisheddate ? (
                  <>{props.location.state.establisheddate}</>
                ) : null}
              </p>
            </div>
          </div>
        </div>
        {alldoctors.length ? (
          issearched && !searcheddoctors.length ? null : (
            <Pagination></Pagination>
          )
        ) : null}
        {/* <Pagination></Pagination> */}
      </div>
      {props.match.url != "/dashboard/hospitals/view-doctors" ? (
        <Footer></Footer>
      ) : null}
    </div>
  );
}
