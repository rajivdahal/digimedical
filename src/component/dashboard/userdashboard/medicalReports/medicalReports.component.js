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
} from "../../../../actions/medicalReports.ac";
import { CommonMedicalreportTable } from "./commonMedicalreportTable";
import { CommonUtilityreportTable } from "./commonMedicalreportTable";

export const MedicalReports = (props) => {
  const dispatch = useDispatch();
  const medicalReport = {
    hospitalName: "",
    doctorName: "",
    visitedDate: "",
    followUpDate: "",
    description: "",
  };
  const medicalReportSchema = Yup.object().shape({
    hospitalName: Yup.string().required("Hospital name is required!"),
    doctorName: Yup.string().required("Doctor name is required!"),
    visitedDate: Yup.string().required("Visited Date required!").matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, "Please enter valid date"),
    followUpDate: Yup.string().required("Follow up date is required!").matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, "Please enter valid date"),
  });
  let [image, setImage] = useState([]);
  const [medicalData, setMedicalData] = useState([]);

  const tableVisibilityInfo = useSelector((state) => state.medicalReports);

  const setIsMedicalReportOpen = bindActionCreators(
    setMedicalReportOpen,
    dispatch
  );
  const showMedicalInformation = (e) => {
    setIsMedicalReportOpen(true);
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

  const upload = (values, { resetForm }) => {
    httpClient
      .UPLOAD("post", "medical-records/create", values, false, image, true)
      .then((resp) => {
        notify.success("Medical Record Is Successfully Created");
        fetchdata();
        resetForm();
        setIsMedicalReportOpen();
      })
      .catch((err) => {
        notify.error("Something went wrong", err);
      });
  };


  const handleImageChange = (event) => {
    let file = [];
    file.push(event.target.files[0]);
    console.log(file);
    setImage(file);
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const formikContent=null

  return (
    <div className="med_repo_main">
      <div className="main-psetImage  report-container">
        <h2>Update your previous report here</h2>
        <div className="row umi_row">
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">


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


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
