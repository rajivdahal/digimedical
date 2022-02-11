import { Formik, Form, Field, ErrorMessage } from "formik";
import "./medicalReports.component.css";
import { useEffect, useState } from "react";
import { httpClient } from "../../../../utils/httpClient";
import { notify } from "../../../../services/notify";
import * as Yup from "yup";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setMedicalReportOpen,
  setUtilsInfoOpen,
} from "../../../../actions/medicalReports.ac";
import { CommonMedicalreportTable } from "./commonMedicalreportTable";
import { CommonUtilityreportTable } from "./commonMedicalreportTable";

export const MedicalReports = (props) => {
  const medicalReport = {
    hospitalName: "",
    doctorName: "",
    visitedDate: "",
    followUpDate: "",
    description: "",
  };
  const bodyCheckUpValues = {
    bodyCheckupId: null,
    checkUpDate: "",
    value: "",
  };
  const bodyCheckUpSchema = Yup.object().shape({
    checkUpDate: Yup.string().required("Checkup date is required!"),
    value: Yup.string().required("Value is required!"),
  });
  const medicalReportSchema = Yup.object().shape({
    hospitalName: Yup.string().required("Hospital name is required!"),
    doctorName: Yup.string().required("Doctor name is required!"),
    visitedDate: Yup.string().required("Visited Date required!"),
    followUpDate: Yup.string().required("Follow up date is required!"),
  });
  let [image, setImage] = useState([]);
  const [medicalData, setMedicalData] = useState([]);
  const [bodyCheckUpCategories, setBodyCHeckUpCategories] = useState([]);
  const [bodyCheckUp, setBodyCHeckUp] = useState([]);
  const [bodyCheckUpCategoryId, setBodyCheckUpCategoryId] = useState(null);
  const tableVisibilityInfo = useSelector((state) => state.medicalReports);
  const dispatch = useDispatch();
  const setIsMedicalReportOpen = bindActionCreators(
    setMedicalReportOpen,
    dispatch
  );
  const setIsUtilityOpen = bindActionCreators(setUtilsInfoOpen, dispatch);

  const showMedicalInformation = (e) => {
    setIsMedicalReportOpen(true);
  };
  const showUtilityInformation = (e) => {
    setIsUtilityOpen(true);
  };
  const fetchdata = () => {
    httpClient.GET("medical-records/get-all", false, true).then((resp) => {
      let revisedMedicalData = resp.data.data.map((item) => {
        item.category = "Medical report";
        if (!item.description.length) item.description = "none";
        if (!item.followupdate) item.followupdate = "none";
        if (!item.visiteddate) item.visiteddate = "none";
        if (!item.hospitalname) item.hospitalname = "none";
        if (!item.doctorname) item.doctorname = "none";
        return item;
      });
      setMedicalData(revisedMedicalData);
    });
  };
  const fetchBodyCheckUpCategories = () => {
    httpClient
      .GET("body-checkup/get-all", false, true)
      .then((resp) => {
        let checkUpCategoryOnly = resp.data.data.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        });
        setBodyCHeckUpCategories(checkUpCategoryOnly);
      })
      .catch((err) => {
        notify.error("Something went wrong");
      });
  };
  const fetchUserBodyCheckup = () => {
    httpClient.GET("body-checkup/detail/get-all", false, true).then((resp) => {
      let bodyCheckUpData = resp.data.data.map((item) => {
        item.category = "General information";
        item.description = item.value;
        item.visiteddate = item.checkupdate;
        item.hospitalname = "none";
        item.doctorName = "none";
        item.followupdate = "none";
        return item;
      });
      setBodyCHeckUp(bodyCheckUpData);
    });
  };
  const upload = (values, { resetForm }) => {
    httpClient
      .UPLOAD("post", "medical-records/create", values, false, image, true)
      .then((resp) => {
        notify.success("Success");
        fetchdata();
        resetForm();
        setIsMedicalReportOpen();
      })
      .catch((err) => {
        notify.error("Something went wrong", err);
      });
  };

  const updateBodyCheckUp = (values, { resetForm }) => {
    console.log("inside body checkup",values)
    let finaldata = values;
    finaldata.bodyCheckupId = bodyCheckUpCategoryId;
    httpClient
      .POST("body-checkup/detail/create", finaldata, false, true)
      .then((resp) => {
        notify.success("saved");
        fetchUserBodyCheckup();
        resetForm();
        setIsUtilityOpen();
      })
      .catch((err) => {
        notify.error("Error in updating");
      })
  };
  const handleImageChange = (event) => {
    let file = [];
    file.push(event.target.files[0]);
    console.log(file);
    setImage(file);
  };
  const handleCategoryChange = (value) => {
    setBodyCheckUpCategoryId(value.value);
  };
  useEffect(() => {
    fetchdata();
    fetchBodyCheckUpCategories();
    fetchUserBodyCheckup();
  }, []);
  const formikContent=<Formik
  initialValues={bodyCheckUpValues}
    onSubmit={updateBodyCheckUp}
    validationSchema={bodyCheckUpSchema}
  >
  {() => (
    <Form className=" medical_repo_form">
      <div className="margin-adjuster1">
        <div className="labrepo_text_form">
          <label htmlFor="name">Category:</label>
          <Select
            options={bodyCheckUpCategories}
            onChange={handleCategoryChange}
            className="select-category"
          />
        </div>
        <div className="labrepo_text_form">
          <label htmlFor="name">Measured Date:</label>
          <Field
            name="checkUpDate"
            id="checkUpDate"
            className="prescription_input"
            placeholder="2020-01-01"
          ></Field>
        </div>
        <ErrorMessage
          name="checkUpDate"
          render={(msg) => (
            <div >{msg}</div>
           )}
        />
      </div>
      <div className="margin-adjuster2">
        <div className="labrepo_text_form">
          <label htmlFor="name">Value:</label>
          <Field
            name="value"
            id="value"
            className="prescription_input"
            placeholder="120/80 mm"
          ></Field>
        </div>
        <ErrorMessage
          name="checkUpDate"
          render={(msg) => (
            <div >{msg}</div>
          )}
        />
        <button type="submit" className="button-submit">
          Update
        </button>
      </div>
    </Form>
  )}
</Formik>
  return (
    <div className="med_repo_main">
      <div className="main-psetImage  report-container">
        <h2>Update your previous report here</h2>
        <div className="row umi_row">
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="title-header">
                  <p
                    className={`card-title ${
                      tableVisibilityInfo.reports ? "title-focus" : null
                    }`}
                    onClick={showMedicalInformation}
                  >
                    Medical Information
                  </p>
                  <p
                    className={`card-title ${
                      tableVisibilityInfo.utilsInfo ? "title-focus" : null
                    }`}
                    onClick={showUtilityInformation}
                  >
                    Utility Information
                  </p>
                </div>
                {tableVisibilityInfo.reports ? (
                  <>
                    <h4>Update Medical Information</h4>
                    <Formik
                      initialValues={medicalReport}
                      onSubmit={upload}
                      validationSchema={medicalReportSchema}
                    >
                      {() => (
                        <Form className=" medical_repo_form ">
                          <div className="margin-adjuster1">
                            <div className="labrepo_text_form ">
                              <label htmlFor="name">Hospital Name:</label>
                              <Field
                                name="hospitalName"
                                id="hospitalName"
                                className="prescription_input"
                              ></Field>
                            </div>
                            <ErrorMessage
                              name="hospitalName"
                              render={(msg) => (
                                <div className="err-message-bottom">{msg}</div>
                              )}
                            />

                            <div className="labrepo_text_form">
                              <label htmlFor="name">Doctor Name:</label>
                              <Field
                                name="doctorName"
                                id="doctorName"
                                className="prescription_input"
                              ></Field>
                            </div>
                            <ErrorMessage
                              name="doctorName"
                              render={(msg) => (
                                <div className="err-message-bottom">{msg}</div>
                              )}
                            />

                            <div className="labrepo_text_form">
                              <label htmlFor="name">Visited Date:</label>
                              <Field
                                name="visitedDate"
                                id="visitedDate"
                                className="prescription_input"
                                placeholder="2020-01-01"
                              ></Field>
                            </div>
                            <ErrorMessage
                              name="visitedDate"
                              render={(msg) => (
                                <div className="err-message-bottom">{msg}</div>
                              )}
                            />

                            <div className="labrepo_text_form">
                              <label htmlFor="name">Follow Up Date:</label>
                              <Field
                                name="followUpDate"
                                id="followUpDate"
                                className="prescription_input"
                                placeholder="2020-01-01"
                              ></Field>
                            </div>
                            <ErrorMessage
                              name="followUpDate"
                              render={(msg) => (
                                <div className="err-message-bottom">{msg}</div>
                              )}
                            />
                          </div>
                          <div className="margin-adjuster2">
                            <div className="labrepo_text_form">
                              <label htmlFor="name">Image of Report:</label>
                              <input
                                name="image"
                                className="prescription_inputimage"
                                type={"file"}
                                onChange={(event) => {
                                  handleImageChange(event);
                                }}
                              ></input>
                            </div>

                            <div className="labrepo_text_form">
                              <label htmlFor="name">Description:</label>
                              <Field
                                name="description"
                                className="prescription_inputdesc"
                                style={{ height: "100px" }}
                              ></Field>
                            </div>

                            <button type="submit" className="button-submit">
                              Update
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  <CommonMedicalreportTable
                    medicalData={medicalData}
                  ></CommonMedicalreportTable>
                  </>
                ) : tableVisibilityInfo.utilsInfo ? (
                  <>
                  <h4>Update Utility Information</h4>
                    {
                      formikContent
                    }
                  <CommonUtilityreportTable
                    bodyCheckUp={bodyCheckUp}
                  ></CommonUtilityreportTable>
                  </>
                ) : (
                  <h1>You don't have any appointments</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
