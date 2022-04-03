import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import Select from "react-select";
import { httpClient } from "../../../utils/httpClient";
import { notify } from "../../../services/notify";
import Cliploader from "../../../utils/clipLoader";
import SelectPaymentMethod from "../../common/popup/doctorPopup/selectPaymentMethod/selectPaymentMethod";
import ExternalBookingPayment from "../../common/popup/doctorPopup/selectPaymentMethod/forexternalbooking/externalBookingPayment";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  digiDoctorAppointmentFixed,
  digiDoctorInfo,
} from "../../../actions/digiDoctorBooking.ac";
import { setOpenPopUp } from "../../../actions/paymentPopUp.ac";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function FormComponentForLoggedInCase(props) {
  console.log("props services are", props.services);
  const [doctors, setdoctors] = useState([]);
  //const [services, setservices] = useState(props.services);
  const [isdoctorblurred, setisdoctorblurred] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [value, setValue] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [doctorFullInfo, setDoctorFullInfo] = useState([]);

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
  const [doctorfetched, setdoctorfetched] = useState({
    image: null,
    prefix: null,
    name: null,
    specialist: null,
    description: null,
  });

  const initialValues = {
    servicesId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
  };
  const schema = Yup.object().shape({
    servicesId: Yup.string().required("Service is required!"),
    doctorId: Yup.string().required("Doctor is required!"),
    appointmentDate: Yup.object(),
    appointmentTime: Yup.string().required("Appointment time is required!"),
  });

  function SelectFieldService({ name }) {
    console.log("name is", name);
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <Select
        options={props.services}
        className="select-category"
        value={{ label: value }}
        onChange={(value) => {
          formik.setFieldValue(name, value.value);
          setValue(value.label);
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
        className="select-category"
        value={{ label: doctor }}
        onChange={(value) => {
          console.log("value is", value);
          formik.setFieldValue(name, value.value.doctorid);
          setDoctor(value.label);
          setDoctorFullInfo(value.value);
        }}
      />
    );
  }
  const handleChange = (value) => {
    // let serviceid = e.target.value;
    console.log("value", value);
    httpClient
      .GET(`doctor/get-related-doctor/${value.value}`, false, false)
      .then((resp) => {
        if (!resp.data.data.length) {
          return notify.error("No any doctors are available to this service");
        }
        console.log("response", resp.data.data);
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
  const handleSubmit = (values, { resetForm }) => {
    console.log("values are", values, doctorFullInfo);
    let finalData = {
      doctorId: values.doctorId,
      servicesId: values.servicesId,
      appointmentDate: values.appointmentDate
        ? values.appointmentDate.year +
          "-" +
          values.appointmentDate.month +
          "-" +
          values.appointmentDate.day
        : selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day,
      appointmentTime: values.appointmentTime,
      origin: "externalAppointmentBookForLoggedInCase",
    };
    setAppointmentFixed(finalData);
    let doctorInfo = doctorFullInfo;
    doctorInfo = { ...doctorInfo, ...finalData };
    setDoctorInfo(doctorInfo);
    openPaymentPopUp(true);
  };

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

  // redux implementation
  const dispatch = useDispatch();
  const popupOpen = useSelector((state) => state.paymentPopUp);
  const setAppointmentFixed = bindActionCreators(
    digiDoctorAppointmentFixed,
    dispatch
  );
  const setDoctorInfo = bindActionCreators(digiDoctorInfo, dispatch);
  const openPaymentPopUp = bindActionCreators(setOpenPopUp, dispatch);
  const appointmentBooking = useSelector(
    (state) => state.digiDoctorAppointmentBooking
  );
  console.log("appointmentBooking is", appointmentBooking);
  // end of redux implementation
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-row">
            <div className="form-group col-md-6 home-form-sel-serv">
              <label htmlFor="service">
                Select Service<span style={{ color: "red" }}>*</span>
              </label>
              <SelectFieldService name={"servicesId"}></SelectFieldService>
              <ErrorMessage name="servicesId">
                {(msg) => (
                  <div className="error-mssg" style={{ color: "red" }}>
                    {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>
            <div className="form-group col-md-6 home-form-sel-serv">
              <label htmlFor="doctor">
                Select Doctor<span style={{ color: "red" }}>*</span>
              </label>
              <SelectFieldDoctor name={"doctorId"}></SelectFieldDoctor>
              <ErrorMessage name="doctorId">
                {(msg) => (
                  <div className="error-mssg" style={{ color: "red" }}>
                    {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="appointment">
                  Appointment Date<span style={{ color: "red" }}>*</span>
                </label>
                <div className="formcompo_datepicker">
                  {" "}
                  <DatePickerField name="appointmentDate"></DatePickerField>
                  <ErrorMessage name="appointmentDate">
                    {(msg) => (
                      <div className="error-mssg" style={{ color: "red" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <div className="form-group col-md-6" style={{ marginTop: "" }}>
                <label htmlFor="time">
                  Time<span style={{ color: "red" }}>*</span>
                </label>
                <Field
                  type="time"
                  placeholder="select time"
                  id="appointmentTime"
                  name="appointmentTime"
                  className="form-control"
                ></Field>
                <ErrorMessage name="appointmentTime">
                  {(msg) => (
                    <div className="error-mssg" style={{ color: "red" }}>
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>
            </div>
            <div className="col-md-12 col-sm-12 col-xs-12 ">
              {isloading ? (
                <Cliploader></Cliploader>
              ) : (
                <button
                  type="submit"
                  className="btn-filter-ma btn btn-primary btn-block"
                >
                  Make Appointment
                </button>
              )}
            </div>
          </div>
        </Form>
      </Formik>
      {popupOpen.trigger ? (
        <ExternalBookingPayment></ExternalBookingPayment>
      ) : null}
    </div>
  );
}
