import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import { httpClient } from "../../../../utils/httpClient";
import * as Yup from "yup";
// import "./services.component.css"
import { notify } from "../../../../services/notify";
import MaterialTable from "material-table";
import Tableicons from "../../../../utils/materialicons";
import { Check, Edit, Clear, Add } from "@material-ui/icons";
import "./bodyCheckUp.css";
export default function BodyCheckUpUser(props) {
  const initialValues = {
    serviceId: "",
    date: "",
    value: "",
  };

  const schema = Yup.object().shape({
    serviceId: Yup.string().required("Service is required!"),
    value: Yup.string().required("Value is required!"),
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
    httpClient.GET("body-checkup/get-all", false, true).then((resp) => {
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
      .GET("body-checkup/detail/get-all", false, true)
      .then((resp) => {
        console.log("resp.data is", resp.data.data);
        // let finalData=resp.data.data.map((item)=>{
        //     item.userName=item.firstName+" "+item.middleName+" "+item.lastName
        //     return item
        // })
        setSelectedService(resp.data.data);
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
          formik.setFieldValue(name, value);
        }}
      />
    );
  }
  function InputSelectField({ name }) {
    console.log("name is,,,,", name);
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <input
        type={"text"}
        className="prescription_input"
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
        placeholder="120/80 mmHg"
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
    let finaldata = {
      checkUpDate: values.date
        ? values.date.year + "-" + values.date.month + "-" + values.date.day
        : selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day,
      bodyCheckupId: values.serviceId,
      value: values.value,
    };
    console.log("finaldata", finaldata);
    httpClient
      .POST("body-checkup/detail/create", finaldata, false, true)
      .then((resp) => {
        notify.success("Updated Successfully");
        resetForm();
        getSelectedServices();
      })
      .catch((err) => {
        notify.error("Error in updating");
      });
  };
  const columnsData = [
    { title: "Name", field: "name" },
    { title: "Date", field: "checkupdate" },
    { title: "Value", field: "value" },
  ];
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
        <div className="row umi_row">
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                {props.origin != "admin" ? (
                  <Formik
                    initialValues={initialValues}
                    // initialValues={initialValues}
                    onSubmit={submit}
                    validationSchema={schema}
                  >
                    {({ errors, touched }) => (
                      <Form className=" medical_repo_form">
                        <div className="margin-adjuster1">
                          <div className="labrepo_text_form labrepo_txt_form">
                            <label htmlFor="date">Date<span style={{ color: "red" }}>*</span></label>
                            <div className="serviceDate">
                              <DatePickerField name="date" />
                              {errors.date && touched.date ? (
                                <div className="err-message-bottom">
                                  {errors.date}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="labrepo_text_form labrepo_txt_form">
                            <label htmlFor="name">Service<span style={{ color: "red" }}>*</span></label>
                            <div className="field-lab-repo">
                              <SelectField name="serviceId"></SelectField>
                              {errors.serviceId && touched.serviceId ? (
                                <div className="err-message-bottom">
                                  {errors.serviceId}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="margin-adjuster2">
                          <div className="labrepo_text_form labrepo_txt_form">
                            <label htmlFor="value">Value<span style={{ color: "red" }}>*</span></label>
                            <div className="field-lab-repo">
                              <InputSelectField name="value"></InputSelectField>
                              {errors.value && touched.value ? (
                                <div className="err-message-bottom">
                                  {errors.value}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <button type="submit" className="button-submit">
                            Update
                          </button>
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
                    title="Your Details"
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
