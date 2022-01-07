import React from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import Pagination from "../../common/pagination/pagination.component";
import "./viewdoctor.component.css";
import doctor1 from "../../../assets/client1.png";
import phone from "../../../assets/phone.png";
import { httpClient } from "../../../utils/httpClient";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import { Field, Formik, Form } from "formik";
import { notify } from "../../../services/notify";
// import hospital_ico from "../../../assets/hospital_icon.png";
export default function Hospital_doctors(props) {
  console.log("props are", props)
  // const [props.location.state,setprops.location.state]=useState(props.location.state)
  let [alldoctors, setallDoctors] = useState([])
  const [selectedDay, setSelectedDay] = useState(null);
  let [searcheddoctors, setsearcheddoctors] = useState([])
  let [issearched, setIssearched] = useState(false)
  const history = useHistory()
  useEffect(() => {
    httpClient.GET("hospital/get-all/doctors/" + props.location.state.id)
      .then(resp => {
        console.log("data after fetching API are", alldoctors)
        setallDoctors(resp.data.data)
      })
  }, [])
  let [doctorappointmentindex, setdoctorappointmentindex] = useState(null)
  const showappointment = (item, index) => {
    console.log("doctor appointment index is", doctorappointmentindex)
    if (!doctorappointmentindex) {
      return setdoctorappointmentindex(parseInt(index) + 1)
    }
    setdoctorappointmentindex(null)
  }
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    appointmentDate: "",
    appointmentTime: ""
  }
  const handleSubmit = (values, doctor, index) => {
    let finaldata = {}
    finaldata = { ...values, hospitalId: props.location.state.id, doctorId: doctor.doctorid, servicesId: doctor.serviceid }
    httpClient.POST(props.match.url == "/dashboard/hospitals/view-doctors" ? "create-appointment" : "create-external-user", finaldata, false, props.match.url == "/dashboard/hospitals/view-doctors" ? true : false)
      .then(resp => {
        notify.success("Appointment successfully created")
        if (props.match.url != "/dashboard/hospitals/view-doctors") {
          notify.promise(new Promise(function (resolve, reject) {
            resolve("Please check your email to verify account")
          }))
        }
        else{
          history.push("/dashboard")
        }
        showappointment(doctor, index)
      })
      .catch(err => {
        if (props.match.url != "/dashboard/hospitals/view-doctors") {
          if (err.response.data.message == "Email already exists") {
            if (localStorage.getItem("status") == 200) {
              notify.success("Email already exists,please book hospital appointment internally")
              return history.push("/dashboard")
            }
            else {
              history.push("/login")
              return notify.promise(new Promise(function (resolve, reject) {
                resolve("Email already exist please login and book internally")
              }))

            }

          }

        }
        notify.error("Something went wrong")
      })
  }
  const searchDoctors = (e) => {
    setIssearched(true)

    let searched = alldoctors.filter((item, index) => {
      console.log("item is", item)
      if (item.doctorname.toLowerCase().includes(e.target.value)) {
        return true
      }
    })
    setsearcheddoctors(searched)
  }
  return (
    <div>
      {
        props.match.url == "/dashboard/hospitals/view-doctors" ? null : <Navbar></Navbar>
      }

      <div className="hospital_doc_appoint">
        <div>
          {
            props.match.url != "/dashboard/hospitals/view-doctors" ? <div className="hospital_doc_checkroute">
              <p>Home</p>
              <p>
                <i class="doc_arrow doc_right"></i>
              </p>
              <Link to={"/hospitals"}> <p>Hospitals</p></Link>
              <p>
                <i class="doc_arrow doc_right"></i>
              </p>
              <p id="hospital_name">{props.location.state.name}</p>
            </div> : null
          }

          <div></div>
        </div>
        <div className={props.location ? props.location.pathname = "/dashboard/hospitals/view-doctors" ? "doc_appoint_main1_user" : "doc_appoint_main1_user" : "doc_appoint_main1"}>
          {" "}
          <div className="take_doc_appoint">
            <div className="doc_appoint_head">
              <div>
                <h1>Doctors</h1>
                <p>Select or search available doctors</p>
              </div>
              <div className="doc_booksearch">
                <form class="doc_example" action="/action_page.php">
                  <input
                    type="text"
                    placeholder="Search Doctors .."
                    name="search"
                    onChange={searchDoctors}
                  />
                  <button type="submit" disabled>
                    <i class="fa fa-search"></i>
                  </button>
                </form>
              </div>
            </div>
            <div className="doc_appoint_main">

              {
                !searcheddoctors.length && !issearched ?
                  alldoctors.length ?
                    alldoctors.map((doctor, doctorindex) => {
                      return <div className="doc_apoint_card">
                        <div className="doc_apoint_card1">
                          <div className="doc_card_img">
                            <img src={doctor1} alt="" />
                          </div>
                          <div className="doc_about_desc">
                            <p id="doc_name_card">{doctor.prefix}. {doctor.doctorname}</p>
                            <p>{doctor.specialist} </p>
                            <p id="doc_available_days">
                              Availabile days :{" "}
                              <span id="span1_doc_card">Sunday, Teusday, Friday</span>
                            </p>
                            <p>
                              Availabile time :{" "}
                              <span id="span1_doc_card">10am - 1pm</span>
                            </p>
                          </div>{" "}
                          <div className="hosp_card_but">
                            {" "}
                            <button id="hosp_card_but" onClick={() => showappointment(doctor, doctorindex)}>Book an appointment</button>
                          </div>
                        </div>
                        {/* after clicking book an appointment */}
                        {
                          doctorappointmentindex == doctorindex + 1 ?
                            <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values, doctor, doctorindex)} >
                              {
                                (values)=>{
                                console.log("form values are",values)
                                  return  <Form className="form_doc">
                                  {
                                    props.match.url != "/dashboard/hospitals/view-doctors" ? <>
                                      <div className="doc_appoin_form1">
                                        <p>First Name</p>
                                        <Field
                                          type="text"
                                          placeholder="Enter First Name"
                                          name="firstName"
                                          id="firstName"
                                        />
                                      </div>
                                      <div class="doc_appoin_form1">
                                        <p>Middle Name</p>
                                        <Field
                                          type="text"
                                          placeholder="Enter Middle Name"
                                          name="middleName"
                                          id="middleName"
                                        />
                                      </div>
                                      <div class="doc_appoin_form1">
                                        <p>Last Name</p>
                                        <Field
                                          type="text"
                                          placeholder="Enter Last Name"
                                          name="lastName"
                                          id="lastName"
                                        />
                                      </div>
                                      <div class="doc_appoin_form1">
                                        <p>Email Address</p>
                                        <Field
                                          type="text"
                                          placeholder="Enter Email Address"
                                          name="email"
                                          id="email"
                                        />
                                      </div>
                                      <div class="doc_appoin_form1">
                                        <p>Phone No.</p>
                                        <Field
                                          type="text"
                                          placeholder="Enter Phone no."
                                          name="mobileNumber"
                                          id="mobileNumber"
                                        />
                                      </div>
                                    </> : null
                                  }
  
  
                                  <div class="doc_appoin_form1">
                                    <p>Appointment Date</p>
                                    {/* <DatePicker
                                  value={selectedDay}
                                  onChange={setSelectedDay}
                                  inputPlaceholder="Select a day"
                                  shouldHighlightWeekends
                                  name="appointmentDate"
                                  id="appointmentDate"
                                /> */}
                                    <Field type="date" name="appointmentDate"
                                      id="appointmentDate" />
                                  </div>
                                  <div class="doc_appoin_form1">
                                    <p>Appointment Time</p>
                                    <Field type="time" name="appointmentTime"
                                      id="appointmentTime" />
                                  </div>
                                  <button type="submit" className="submit-button" disabled={!values.dirty && !values.errors}>Submit</button>
                                </Form>
                                }
                              }
                            </Formik>
                            : null
                        }

                      </div>
                    })
                    :
                    <h3>No any doctors found</h3>
                  : searcheddoctors.length && issearched ?

                    searcheddoctors.map((doctor, doctorindex) => {
                      return <div className="doc_apoint_card">
                        <div className="doc_apoint_card1">
                          <div className="doc_card_img">
                            <img src={doctor1} alt="" />
                          </div>
                          <div className="doc_about_desc">
                            <p id="doc_name_card">{doctor.prefix}. {doctor.doctorname}</p>
                            <p>{doctor.specialist} </p>
                            <p id="doc_available_days">
                              Availabile days :{" "}
                              <span id="span1_doc_card">Sunday, Teusday, Friday</span>
                            </p>
                            <p>
                              Availabile time :{" "}
                              <span id="span1_doc_card">10am - 1pm</span>
                            </p>
                          </div>{" "}
                          <div className="hosp_card_but">
                            {" "}
                            <button id="hosp_card_but" onClick={() => showappointment(doctor, doctorindex)}>Book an appointment</button>
                          </div>
                        </div>
                        {/* after clicking book an appointment */}
                        {
                          doctorappointmentindex == doctorindex + 1 ?
                            <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values, doctor, doctorindex)} >
                              <Form className="form_doc">
                                {
                                  props.match.url != "/dashboard/hospitals/view-doctors" ? <>
                                    <div className="doc_appoin_form1">
                                      <p>First Name</p>
                                      <Field
                                        type="text"
                                        placeholder="Enter First Name"
                                        name="firstName"
                                        id="firstName"
                                      />
                                    </div>
                                    <div class="doc_appoin_form1">
                                      <p>Middle Name</p>
                                      <Field
                                        type="text"
                                        placeholder="Enter Middle Name"
                                        name="middleName"
                                        id="middleName"
                                      />
                                    </div>
                                    <div class="doc_appoin_form1">
                                      <p>Last Name</p>
                                      <Field
                                        type="text"
                                        placeholder="Enter Last Name"
                                        name="lastName"
                                        id="lastName"
                                      />
                                    </div>
                                    <div class="doc_appoin_form1">
                                      <p>Email Address</p>
                                      <Field
                                        type="text"
                                        placeholder="Enter Email Address"
                                        name="email"
                                        id="email"
                                      />
                                    </div>
                                    <div class="doc_appoin_form1">
                                      <p>Phone No.</p>
                                      <Field
                                        type="text"
                                        placeholder="Enter Phone no."
                                        name="mobileNumber"
                                        id="mobileNumber"
                                      />
                                    </div>
                                  </> : null
                                }
                                <div class="doc_appoin_form1">
                                  <p>Appointment Date</p>
                                  {/* <DatePicker
                                  value={selectedDay}
                                  onChange={setSelectedDay}
                                  inputPlaceholder="Select a day"
                                  shouldHighlightWeekends
                                  name="appointmentDate"
                                  id="appointmentDate"
                                /> */}
                                  <Field type="date" name="appointmentDate"
                                    id="appointmentDate" />
                                </div>
                                <div class="doc_appoin_form1">
                                  <p>Appointment Time</p>
                                  <Field type="time" name="appointmentTime"
                                    id="appointmentTime" />
                                </div>
                                <button type="submit" className="submit-button">Submit</button>
                              </Form>
                            </Formik>
                            : null
                        }
                      </div>
                    })
                    : <h3>No any doctors found</h3>


              }
            </div>
          </div>
          <div className="doc_appoin_hosp_desc">
            <div className="hosp_desc_hosp">
              <img src={doctor1} alt="" />
              <p id="hosp_name_doc">{props.location.state.name}</p>
              <p>
                <i class="fas fa-map-marker-alt"></i> &nbsp; {props.location.state.address}
              </p>
              <p id="hosp_ph_no">
                <img src={phone} alt="" />
                &nbsp; {props.location.state.contactnumber}; {props.location.state.mobilenumber}
              </p>
              <p>
                <i class="fas fa-envelope"></i>&nbsp; info@norvichospital.com
              </p>
              <p id="hosp_ph_no">
                {" "}
                <i class="fas fa-link"></i>
                {/* <img src={hospital_ico} alt="" /> */}
                &nbsp; www.norvichospital.com.np
              </p>
            </div>
          </div>
        </div>
        {
          alldoctors.length ?
            issearched && !searcheddoctors.length ?
              null :
              <Pagination></Pagination>
            : null
        }
        {/* <Pagination></Pagination> */}
      </div>
      {
        props.match.url != "/dashboard/hospitals/view-doctors" ? <Footer></Footer> : null
      }

    </div>
  );
}