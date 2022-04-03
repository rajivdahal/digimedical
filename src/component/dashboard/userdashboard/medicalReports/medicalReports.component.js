import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import "./medicalReports.component.css";
import { useEffect, useState } from "react";
import { httpClient } from "../../../../utils/httpClient";
import { notify } from "../../../../services/notify";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { setMedicalReportOpen } from "../../../../actions/medicalReports.ac";
import { FileUploader } from "react-drag-drop-files";
import { CommonMedicalreportTable } from "./commonMedicalreportTable";
import CircularProgress from "@mui/material/CircularProgress";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
// const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const fileTypes = ["JPG", "PNG", "GIF"];

export const MedicalReports = (props) => {
  // const date = selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day;

  const dispatch = useDispatch();
  let [image, setImage] = useState([]);
  const [medicalData, setMedicalData] = useState([]);
  const [imageUploadError, setImgUploadError] = useState(null);
  const medicalReport = {
    hospitalName: "",
    doctorName: "",
    visitedDate: "",
    followUpDate: "",
    description: "",
    medicalReportImage: "",
  };

  var dt = new Date();

  const [selectedDay, setSelectedDay] = useState({
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate(),
  });

  const [isLoading, setLoading] = useState(false);


  const medicalReportSchema = Yup.object().shape({
    hospitalName: Yup.string().required("Hospital name is required!"),
    doctorName: Yup.string().required("Doctor name is required!"),
    medicalReportImage: Yup.mixed().required("Image is required!"),
  });

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

  function DatePickerField1({ name }) {
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <DatePicker
        value={field.value ? field.value : selectedDay}
        // minimumDate={selectedDay}
        onChange={(value) => {
          console.log(value);
          formik.setFieldValue(name, value);
        }}
      />
    );
  }
  function DatePickerField2({ name }) {
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
    return (
      <DatePicker
        value={field.value ? field.value : selectedDay}
        // minimumDate={selectedDay}
        onChange={(value) => {
          console.log(value);
          formik.setFieldValue(name, value);
        }}
      />
    );
  }

  const upload = (values, { resetForm }) => {
    setLoading(true);
    let finalData = {
      hospitalName: values.hospitalName,
      doctorName: values.doctorName,
      followUpdate: values.followUpDate
        ? values.followUpDate.year +
        "-" +
        values.followUpDate.month +
        "-" +
        values.followUpDate.day
        : "",

      visitedDate: values.visitedDate
        ? values.visitedDate.year +
        "-" +
        values.visitedDate.month +
        "-" +
        values.visitedDate.day
        : selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day,

      description: values.description,
    };
    httpClient
      .UPLOAD("post", "medical-records/create", finalData, false, image, true)
      .then((resp) => {
        notify.success("Medical Record Is Successfully Created");
        fetchdata();
        resetForm();
        setIsMedicalReportOpen();
        setImage(null)
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        notify.error("Something went wrong", err);
      });
  };

  const handleImageChange = (files, setFieldValue) => {
    console.log(files)
    let file = [];
    file.push(files);
    setImage(file);
    setFieldValue("medicalReportImage", file)
    setImgUploadError(null)
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const formikContent = null;

  return (
    <>
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
                    {({ setFieldValue }) => (
                      <Form className=" medical_repo_form ">
                        <div className="margin-adjuster1">
                          <div className="labrepo_text_form ">
                            <label htmlFor="name">
                              Hospital Name
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="field-lab-repo">
                              <Field
                                name="hospitalName"
                                id="hospitalName"
                                className="prescription_input"
                              ></Field>
                              <ErrorMessage
                                name="hospitalName"
                                render={(msg) => (
                                  <div className="err-message-bottom">
                                    {msg}
                                  </div>
                                )}
                              />
                            </div>
                          </div>

                          <div className="labrepo_text_form">
                            <label htmlFor="name">
                              Doctor Name<span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="field-lab-repo">
                              <Field
                                name="doctorName"
                                id="doctorName"
                                className="prescription_input"
                              ></Field>
                              <ErrorMessage
                                name="doctorName"
                                render={(msg) => (
                                  <div className="err-message-bottom">
                                    {msg}
                                  </div>
                                )}
                              />
                            </div>
                          </div>

                          <div className="labrepo_text_form">
                            <label htmlFor="name">
                              Visited Date
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="field-lab-repo med-repo-timepicker1">
                              <DatePickerField1 name="visitedDate" />
                              <ErrorMessage
                                name="visitedDate"
                                render={(msg) => (
                                  <div className="err-message-bottom">
                                    {msg}
                                  </div>
                                )}
                              />
                            </div>
                          </div>

                          <div className="labrepo_text_form">
                            <label htmlFor="name">Follow Up Date </label>
                            <div className="field-lab-repo med-repo-timepicker2">
                              <DatePickerField2
                                name="followUpDate"
                                className="prescription_input"
                              />

                            </div>
                            <ErrorMessage
                              name="followUpDate"
                              render={(msg) => (
                                <div className="err-message-bottom">
                                  {msg}
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        <div className="margin-adjuster2">
                          <div className="labrepo_text_form">
                            <label htmlFor="name">Image of Report<span style={{ color: "red" }}>*</span></label>

                            <div className="file-uploader-lt">
                              <FileUploader
                                handleChange={(e) => handleImageChange(e, setFieldValue)}
                                name="medicalReportImage"
                                maxSize={1}
                                types={fileTypes}
                                onSizeError={(file) => setImgUploadError('Image must be less than or equal to 1 MB!')}
                                // onTypeError={(err)=> setImgUploadError("not supported")}
                              />
                              {imageUploadError && <div className="err-message-bottom">
                                {imageUploadError}
                              </div>}
                              <ErrorMessage
                                name="medicalReportImage"
                                render={(msg) => (

                                  <div className="err-message-bottom">
                                    {msg}
                                  </div>
                                )}
                              />

                            </div>
                          </div>


                          <div className="labrepo_text_form">
                            <label htmlFor="name">Description</label>
                            <Field
                              name="description"
                              className="prescription_inputdesc"
                              style={{ height: "100px" }}
                            ></Field>
                          </div>

                          {isLoading ? (<button type="submit" disabled className="button-submit">
                            Update
                          </button>) : (<button type="submit" className="button-submit">
                            Update
                          </button>)}


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
    </>
  );
};
