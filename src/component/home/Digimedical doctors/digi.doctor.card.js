import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validateAppointment } from "./appointment.helper";
import { httpClient } from "../../../utils/httpClient";
import { notify } from "../../../services/notify";
import { useHistory } from "react-router-dom";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import Accordion from "react-bootstrap/Accordion";
import DigiDoctorPayment from "../../common/popup/doctorPopup/selectPaymentMethod/forDigiDoctor/digiDoctorPayment";
import { setClosePopUp, setOpenPopUp } from "../../../actions/paymentPopUp.ac";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { digiDoctorAppointmentFixed, digiDoctorInfo } from "../../../actions/digiDoctorBooking.ac";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const DigiMedicalDoctorCard = (props) => {
  let dispatch=useDispatch()
  let history = useHistory();
  const [userLogin, setUserLogin] = useState(false);
  const [showForm, setForm] = useState(false);
  // const [paymentPopUp,setPaymentPopUp]=useState(false)


  // Redux implementation for pop up
  const closePaymentPopUp = bindActionCreators(setClosePopUp, dispatch);
  const setAppointmentFixed = bindActionCreators(digiDoctorAppointmentFixed, dispatch);
  const setDoctorInfo = bindActionCreators(digiDoctorInfo, dispatch);

  const openPaymentPopUp = bindActionCreators(setOpenPopUp, dispatch);

  const popupOpen = useSelector((state) => state.paymentPopUp);
  const appointmentBooking = useSelector((state) => state.digiDoctorAppointmentBooking);
  console.log("appointment booking data are",appointmentBooking)

  // end of redux implementation for pop up
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
  const date =
    selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day;
  const [appointmentData, setData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    appointmentTime: "",
    appointmentDate: date,
    mobileNumber: "",
  });

  useEffect(() => {
    const userLoginStatus = localStorage.getItem("status");
    if (userLoginStatus == 200) {
      setUserLogin(true);
    } else {
      setUserLogin(false);
    }
  }, []);

  useEffect(() => {
    if (props.selected) {
      setForm(true);
    }
  }, [props.selected]);

  const bookAppointment = (data) => {
    let tempForm = showForm === true ? false : true;
    console.log("props are",data)
    if(!showForm){
      setDoctorInfo(data)
    }
    setForm(tempForm);
  };

  const handleDateChange = (value) => {
    let date = "";
    date = value.year + "-" + value.month + "-" + value.day;
    setSelectedDay(value);
    formik.values.appointmentDate = date;
  };
  const submitAppointment = async (values) => {
    console.log("submit button clicked",values)
    if (userLogin === true) {
      let data = {
        appointmentDate: values.appointmentDate,
        appointmentTime: values.appointmentTime,
        servicesId: props.serviceId,
        doctorId: props.doctorId,
      };
      // setAppointmentFixed(data)
      // if(appointmentBooking.digiDoctorBookingIdAfterBooking){
      //   openPaymentPopUp(true)
      // }
      try {
        let resp = await httpClient.POST(
          "create-appointment",
          data,
          false,
          true
        );
        if (resp.data.status) {

          console.log("inside if",resp.data)
          setAppointmentFixed({data:resp.data.data,origin:"digidoctorBooking"})
          openPaymentPopUp(true)

          // setPaymentPopUp(true)
          // notify.success(resp.data.message);
          formik.resetForm();
          setForm(false);
        }
      }
       catch (err) {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          notify.error(err.response.data.message || "Something went wrong");
        }
      }
    } else {
      let data = {
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        email: values.email,
        mobileNumber: values.mobileNumber,
        appointmentDate: values.appointmentDate,
        appointmentTime: values.appointmentTime,
        servicesId: props.serviceId,
        doctorId: props.doctorId,
      };
      try {
        let resp = await httpClient.POST(
          "create-external-user",
          data,
          false,
          false
        );
        if (resp.data.status) {
          notify.success(resp.data.message);
          setForm(false);
        }
      } catch (err) {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          notify.error(err.response.data.message)
          if (localStorage.getItem("status") == 200) {
            notify.error(
              "Email already exists,please book appointment internally"
            );
            history.push("/dashboard");
          } else {
            notify.error(
              "Email already exist please login and book internally"
            );
            history.push("/login");
          }
        }
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: appointmentData,
    onSubmit: async (values) => {
      submitAppointment(values);
    },
    validate: (values) => {
      let isLogin = userLogin ? true : false;
      return validateAppointment(values, isLogin);
    }
  })
  return (
    <>
      <div className="digidoctor_apoint_card1">
        <div className="digidoc_card_img">
          <img
            src={REACT_APP_BASE_URL + "doctor/download/" + props.doctorId}
            onError={(e) => {
              e.target.onerror = null;
              props.gender == "1"
                ? (e.target.src = "/images/doctor.jpeg")
                : (e.target.src = "/images/femaledoctor.png");
            }}
            alt=""
            style={{
              height: "140px",
              width: "140px",
              borderRadius: "50%",
            }}
          />
        </div>
        <div className="digidoctor_about_desc">
          <div className="digidoc_about_desc_head">
            <p id="doc_name_card">{props.name}</p>
            <p id="doc_edu_brief">{props.prefix}</p>
          </div>

          <p id="digidoc_exp">
            <b> {props.specialist}</b>{" "}
          </p>
          <p>{props.desc}</p>
          <div className="doc_accordion">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Available consultation medium
                </Accordion.Header>
                <Accordion.Body className="acc-doc-body">
                  {props.digiServices.map((item) => {
                    return (
                      <ul className="accordion-body">
                        <li>{item.digiServiceName}</li>
                      </ul>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>

        <div className="digidoctor_card_but">
          {" "}
          <div>
            <button id="digidoctor_card_but" onClick={()=>bookAppointment(props)}>
              Book an appointment
            </button>
          </div>
        </div>
      </div>

      {showForm === true ? (
        userLogin === false ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="form_digi_doc">
              <div className="form_digidoc">
                <div className="digidoc_appoin_form1">
                  <p>First Name</p>
                  <input
                    value={formik.values.firstName}
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    id="firstName"
                    onChange={formik.handleChange}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="error-message">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div class="digidoc_appoin_form1">
                  <p>Middle Name</p>
                  <input
                    type="text"
                    placeholder="Enter Middle Name"
                    name="middleName"
                    id="middleName"
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                  />
                </div>
                <div class="digidoc_appoin_form1">
                  <p>Last Name</p>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    id="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="error-message">
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                </div>
                <div class="digidoc_appoin_form1">
                  <p>Email Address</p>
                  <input
                    type="text"
                    placeholder="Enter Email Address"
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error-message">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div class="digidoc_appoin_form1">
                  <p>Phone No.</p>
                  <input
                    type="text"
                    placeholder="Enter Phone no."
                    name="mobileNumber"
                    id="mobileNumber"
                    onChange={formik.handleChange}
                    value={formik.values.mobileNumber}
                  />
                  {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                    <div className="error-message">
                      {formik.errors.mobileNumber}
                    </div>
                  ) : null}
                </div>

                <div class="digidoc_appoin_form1">
                  <p>Appointment Date</p>
                  <DatePicker
                    className="form-control"
                    shouldHighlightWeekends
                    name="appointmentDate"
                    id="appointmentDate"
                    value={selectedDay}
                    onChange={handleDateChange}
                    minimumDate={minDate}
                    style={{ width: "40px" }}
                  ></DatePicker>
                  {formik.touched.appointmentDate &&
                  formik.errors.appointmentDate ? (
                    <div className="error-message">
                      {formik.errors.appointmentDate}
                    </div>
                  ) : null}
                </div>
                <div class="digidoc_appoin_form1">
                  <p>Appointment Time</p>
                  <input
                    type="time"
                    name="appointmentTime"
                    id="appointmentTime"
                    value={formik.values.appointmentTime}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.appointmentTime &&
                  formik.errors.appointmentTime ? (
                    <div className="error-message">
                      {formik.errors.appointmentTime}
                    </div>
                  ) : null}
                </div>

                <div class="digidoc_appoin_form1">
                  <button type="submit" className="submit-buttons">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="form_digidoc">
              {" "}
              <div class="digidoc_appoin_form1">
                <p>Appointment Date</p>

                <DatePicker
                  className="form-control"
                  shouldHighlightWeekends
                  name="appointmentDate"
                  id="appointmentDate"
                  value={selectedDay}
                  onChange={handleDateChange}
                  minimumDate={minDate}
                  style={{ width: "40px" }}
                ></DatePicker>
                {formik.touched.appointmentDate &&
                formik.errors.appointmentDate ? (
                  <div className="error-message">
                    {formik.errors.appointmentDate}
                  </div>
                ) : null}
              </div>
              <div class="digidoc_appoin_form1">
                <p>Appointment Time</p>
                <input
                  type="time"
                  name="appointmentTime"
                  id="appointmentTime"
                  onChange={formik.handleChange}
                />
                {formik.touched.appointmentTime &&
                formik.errors.appointmentTime ? (
                  <div className="error-message">
                    {formik.errors.appointmentTime}
                  </div>
                ) : null}
              </div>
              <div class="digidoc_appoin_form1">
                <button type="submit" className="submit-buttons">
                  Submit
                </button>
              </div>
            </div>
          </form>
        )
      ) : (
        <></>
      )}
      {
        popupOpen.trigger?<DigiDoctorPayment></DigiDoctorPayment>:null
      }

    </>
  );
};

export default DigiMedicalDoctorCard;
