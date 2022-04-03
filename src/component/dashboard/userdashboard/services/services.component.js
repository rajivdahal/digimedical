import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import { httpClient } from "../../../../utils/httpClient";
import * as Yup from "yup";
import "./services.component.css";
import { notify } from "../../../../services/notify";
import MaterialTable from "material-table";
import Tableicons from "../../../../utils/materialicons";
import { Check, Edit, Clear, Add } from "@material-ui/icons";
import {
  setClosePopUp,
  setOpenPopUp,
} from "../../../../actions/paymentPopUp.ac";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { digiDoctorAppointmentFixed } from "../../../../actions/digiDoctorBooking.ac";
import ServicePayment from "../../../common/popup/doctorPopup/selectPaymentMethod/forServicePayment/servicepayment";
import { internalServiceBooking } from "../../../../actions/service.action";

export default function UserServices(props) {
  // Redux implementation for pop up
  let dispatch = useDispatch();

  const closePaymentPopUp = bindActionCreators(setClosePopUp, dispatch);
  const setAppointmentFixed = bindActionCreators(
    digiDoctorAppointmentFixed,
    dispatch
  );
  // const setDoctorInfo = bindActionCreators(digiDoctorInfo, dispatch);

  const openPaymentPopUp = bindActionCreators(setOpenPopUp, dispatch);

  const popupOpen = useSelector((state) => state.paymentPopUp);

  // end of redux implementation for pop up

  const initialValues = {
    serviceId: "",
    date: "",
    time: "",
  };

  const schema = Yup.object().shape({
    serviceId: Yup.string().required("Service is required!"),
    date: Yup.object(),
    time: Yup.string().required("Time is required!"),
  });

  var dt = new Date();
  const [selectedDay, setSelectedDay] = useState({
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate(),
  });

  const [bodyCheckUpCategories, setBodyCHeckUpCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  let [date, setDate] = useState("");
  let [toDeleteData, setToDeleteData] = useState(null);
  let [deleteIndeedPopUp, setDeleteIndeedPopUp] = useState(false);
  let [deleteIndeed, setDeleteIndeed] = useState(false);

  let [serviceId, setServiceId] = useState("");

  useEffect(() => {
    getAllServices();
    getSelectedServices();
  }, []);

  const getAllServices = () => {
    console.log("inside get all services")
    httpClient.GET("digi-service/get-all").then((resp) => {
      console.log("all services are",resp.data.data)
      let allServices = resp.data.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });

      setAllServices(allServices);
    });
  };
  const getSelectedServices = () => {
    httpClient
      .GET("service-booking/get/0", false, true)
      .then((resp) => {
        console.log(resp.data.data);
        let finalData = resp.data.data.map((item) => {
          item.userName =
            item.firstName + " " + item.middleName + " " + item.lastName;
          return item;
        });
        setSelectedService(finalData);
      })
      .catch((err) => {
        notify.error("Error in fetching services");
      });
  };

  function DatePickerField({ name }) {
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <DatePicker
        value={field.value ? field.value : selectedDay}
        onChange={(value) => {
          console.log(value)
          formik.setFieldValue(name, value);
        }}
      />
    );
  }

  function TimePickerField({ name }) {
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <input
        type={"time"}
        className="prescription_input"
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
      ></input>
    );
  }
  function SelectField({ name }) {
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <Select
        options={allServices}
        className="select-category"
        onChange={(value) => {
          formik.setFieldValue(name, value.value);
        }}
      />
    );
  }
  const submit = (values, { resetForm }) => {
    console.log(values)
    console.log(selectedDay)
    let finaldata = {
      date: values.date
        ? values.date.year + "-" + values.date.month + "-" + values.date.day
        : selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day,
      digiServiceId: values.serviceId,
      time: values.time,
    };
    console.log(finaldata)

    httpClient
      .POST("service-booking/create", finaldata, false, true)
      .then((resp) => {
        if (resp.data.status) {
          finaldata.appointmentId = resp.data.data;
          dispatch(internalServiceBooking(finaldata));
          openPaymentPopUp(true);
          resetForm();
          getSelectedServices();
        }
      })
      .catch((err) => {
        notify.error("Error in updating");
      });
  };
  const columnsData = [
    { title: "Name", field: "serviceName" },
    { title: "Date", field: "date" },
    { title: "Time", field: "time" },
  ];
  if (props.origin == "admin") {
    columnsData.push({ title: "User Name", field: "userName" });
  }
  const deleteData = (data) => {
    setToDeleteData(data);
    setDeleteIndeedPopUp(true);
  };
  if (deleteIndeed) {
    httpClient
      .PUT("service-booking/cancel/" + toDeleteData.id, null, false, true)
      .then((resp) => {
        getSelectedServices();
        notify.success("Deleted Successfully");
        setDeleteIndeed(false);
      })
      .catch((err) => {
        notify.error("Problems in deleting");
      });
  }
  return (
    <div className="med_repo_main">
      <div className="main-psetImage  report-container">
        {props.origin != "admin" ? <h2>Select the service</h2> : null}

        <div className="row umi_row">
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body dash-service-body">
                {props.origin != "admin" ? (
                  <Formik
                    initialValues={initialValues}
                    onSubmit={submit}
                    validationSchema={schema}
                  >
                    {({ errors, touched }) => (
                      <Form className=" medical_repo_form">
                        <div className="margin-adjuster1">
                          <div className="labrepo_text_form labrepo_txt_form label">
                            <label htmlFor="date">Date </label>
                            <div className="field-lab-repo">
                              <div className="serviceDate">
                                <DatePickerField name="date" />
                              </div>
                              {errors.date && touched.date ? (
                                <div className="err-message-bottom">
                                  {errors.date}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="labrepo_text_form labrepo_txt_form label">
                            <label htmlFor="name">Time <span style={{ color: "red" }}>*</span></label>
                            <div className="field-lab-repo">
                              <TimePickerField name="time"></TimePickerField>
                              {errors.time && touched.time ? (
                                <div className="err-message-bottom">
                                  {errors.time}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="margin-adjuster2">
                          <div className="labrepo_text_form labrepo_txt_form label">
                            <label htmlFor="name">Service<span style={{ color: "red" }}>*</span></label>

                            <div className="field-lab-repo">
                              <SelectField name="serviceId"></SelectField>
                              {errors.serviceId && touched.serviceId ?
                                <div className="err-message-bottom">
                                  {errors.serviceId}
                                </div>
                              : null}
                            </div>
                          <button type="submit" className="button-submit" style={{zIndex:"100"}}>
                            Update
                          </button>
                        </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                ) : null}
                {deleteIndeedPopUp ? (
                  <div className="delete-container">
                    <div className="logout-container">
                      <div className="logout">
                        <p>Are you sure you want to Delete?</p>
                        <div className="buttons">
                          <button
                            className="yes-logout"
                            onClick={() => {
                              setDeleteIndeedPopUp(false);
                              setDeleteIndeed(true);
                            }}
                          >
                            Yes
                          </button>
                          <button
                            className="no-logout"
                            onClick={() => {
                              setDeleteIndeedPopUp(false);
                              setDeleteIndeed(false);
                            }}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="material-table">
                  <MaterialTable
                    data={selectedService}
                    title="Booked Services"
                    icons={Tableicons}
                    columns={columnsData}
                    options={{
                      actionsColumnIndex: -1,
                      pageSize: 5,
                      filtering: false,
                      sorting: true,
                      headerStyle: {
                        backgroundColor: "#2745F0",
                        color: "#FFF",
                      },
                    }}
                    actions={[
                      {
                        icon: "delete",
                        tooltip: "delete",
                        onClick: (event, rowData) => {
                          deleteData(rowData);
                        },
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        popupOpen.trigger?<ServicePayment getSelectedServices={()=>getSelectedServices()}></ServicePayment> : null
      }
    </div>
  );
}
