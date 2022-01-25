import { Formik, Form, Field,ErrorMessage } from "formik";
import "./medicalReports.component.css";
import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Tableicons from "../../../../utils/materialicons";
import { httpClient } from "../../../../utils/httpClient";
import { notify } from "../../../../services/notify";
import { Visibility } from "@material-ui/icons";
import * as Yup from "yup";
import Select from "react-select";

export const MedicalReports = (props) => {
  const medicalReport = {
    hospitalName: "",
    doctorName: "",
    visitedDate: "",
    followUpDate: "",
    description: "",
  };
  const bodyCheckUpValues={
    bodyCheckupId:null,
    checkUpDate:"",
    value:""
  }
  const bodyCheckUpSchema = Yup.object().shape({
    checkUpDate: Yup.string()
      .required('Required!'),
       value: Yup.string()
      .required('Required!'),
  });
  const medicalReportSchema=Yup.object().shape({
    hospitalName: Yup.string()
    .required('Required!'),
    doctorName: Yup.string()
    .required('Required!'),
    visitedDate:Yup.string()
    .required('Required!'),
    followUpDate:Yup.string()
    .required('Required!')
  })
  let [image, setImage] = useState([]);
  const [medicalData, setMedicalData] = useState([]);
  const [bodyCheckUpCategories,setBodyCHeckUpCategories]=useState([])
  const [bodyCheckUp,setBodyCHeckUp]=useState([])
  const [bodyCheckUpCategoryId,setBodyCheckUpCategoryId]=useState(null)
  let combineInfo
  const fetchdata = () => {
    httpClient.GET("medical-records/get-all", false, true).then((resp) => {
      let revisedMedicalData= resp.data.data.map((item)=>{
        item.category="Medical report"
        if(!item.description.length)
              item.description="none"
        if(!item.followupdate)
              item.followupdate="none"
        if(!item.visiteddate)
              item.visiteddate="none"
        if(!item.hospitalname)
              item.hospitalname="none"
        if(!item.doctorname)
              item.doctorname="none"
        return item
      })
      setMedicalData(revisedMedicalData);
    });
  };
  const fetchBodyCheckUpCategories=()=>{
    httpClient.GET("body-checkup/get-all",false,true)
    .then(resp=>{
      let checkUpCategoryOnly = resp.data.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setBodyCHeckUpCategories(checkUpCategoryOnly)
    })
    .catch(err=>{
      notify.error("Something went wrong")
    })

  }
  const fetchUserBodyCheckup=()=>{
    httpClient.GET("body-checkup/detail/get-all",false,true)
    .then(resp=>{
      let bodyCheckUpData=resp.data.data.map((item)=>{
        item.category="General information"
        item.description=item.value
        item.visiteddate=item.checkupdate
        item.hospitalname="none"
        item.doctorName="none"
        item.followupdate="none"
        return item
      })
      setBodyCHeckUp(bodyCheckUpData)
    })
  }
  const combineMedicalInfoAndBodyInfo=()=>{
    let newCombineInfo=[...medicalData,...bodyCheckUp]
    combineInfo=newCombineInfo

  }
  const upload = (values, { resetForm }) => {
    console.log(values, image);
    httpClient
      .UPLOAD("post", "medical-records/create", values, false, image, true)
      .then((resp) => {
        notify.success("Success");
        fetchdata();
        resetForm();
      })
      .catch((err) => {
        notify.error("Something went wrong", err);
      });
  };

  const updateBodyCheckUp=(values,{resetForm})=>{
    let finaldata=values
    finaldata.bodyCheckupId=bodyCheckUpCategoryId
    httpClient.POST("body-checkup/detail/create",finaldata,false,true)
    .then(resp=>{
      notify.success("saved")
      fetchUserBodyCheckup()
      resetForm()
    })
    .catch(err=>{
      notify.error("Error in updating")
    })
  }

  const handleImageChange = (event) => {
    let file = [];
    file.push(event.target.files[0]);
    console.log(file);
    setImage(file);
  };
  const handleCategoryChange=(value)=>{
    setBodyCheckUpCategoryId(value.value)
  }
  useEffect(() => {
    fetchdata();
    fetchBodyCheckUpCategories()
    fetchUserBodyCheckup()

  }, []);
  const viewPopUp=(data)=>{
    console.log("data is",data)
  }
  combineMedicalInfoAndBodyInfo()
  console.log("combine info is",combineInfo)
  return (
    <div className="med_repo_main">
      <div className="main-psetImage newdash_content report-container">
        <h2>Update your previous report here</h2>

        <div className="previous-reports-wrapper">
          <h4>Update Utility Information</h4>
        <Formik initialValues={bodyCheckUpValues} onSubmit={updateBodyCheckUp} validationSchema={bodyCheckUpSchema}>
            {() => (
              <Form className=" medical_repo_form">
                <div className="margin-adjuster1">
                  <div className="labrepo_text_form">
                    <label htmlFor="name">Category:</label>
                    <Select options={bodyCheckUpCategories} onChange={handleCategoryChange} className="select-category"/>
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
                  <ErrorMessage name="checkUpDate" render={msg => <div className="err-message-bottom">{msg}</div>}/>
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
                  <ErrorMessage name="checkUpDate" render={msg => <div className="err-message-bottom">{msg}</div>}/>

                  <button type="submit" className="button-submit">
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>




           <div className="medical-report-button">
          <h4>Update Medical Information</h4>

          <Formik initialValues={medicalReport} onSubmit={upload} validationSchema={medicalReportSchema}>

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
                  <ErrorMessage name="hospitalName" render={msg => <div className="err-message-bottom">{msg}</div>}/>

                  <div className="labrepo_text_form">
                    <label htmlFor="name">Doctor Name:</label>
                    <Field
                      name="doctorName"
                      id="doctorName"
                      className="prescription_input"
                    ></Field>

                  </div>
                  <ErrorMessage name="doctorName" render={msg => <div className="err-message-bottom">{msg}</div>}/>

                  <div className="labrepo_text_form">
                    <label htmlFor="name">Visited Date:</label>
                    <Field
                      name="visitedDate"
                      id="visitedDate"
                      className="prescription_input"
                      placeholder="2020-01-01"
                    ></Field>
                  </div>
                  <ErrorMessage name="visitedDate" render={msg => <div className="err-message-bottom">{msg}</div>}/>

                  <div className="labrepo_text_form">
                    <label htmlFor="name">Follow Up Date:</label>
                    <Field
                      name="followUpDate"
                      id="followUpDate"
                      className="prescription_input"
                      placeholder="2020-01-01"
                    ></Field>
                  </div>
                  <ErrorMessage name="followUpDate" render={msg => <div className="err-message-bottom">{msg}</div>}/>

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
          </div>
        </div>
        <div className="material-table">
          <p id="medical_table_head">Report</p>
          <MaterialTable
            data={combineInfo}
            title="Previous Details"
            icons={Tableicons}
            columns={[
              { title: "Category",field: "category" },
              { title: "Doctor Name", field: "doctorname" },
              { title: "Hospital Name", field: "hospitalname" },
              { title: "CheckUp Date", field: "visiteddate" },
              { title: "FollowUp Date", field: "followupdate" },
              { title: "Description/Value", field:"description",},
            ]}
            // actions={[
            //   (rowData) => {
            //     return {
            //       icon: "bug_report",
            //       tooltip: "View",
            //       disabled: rowData.category === "General information",
            //       // hidden: rowData.status === "active",
            //       onClick: (event, rowData) =>
            //           viewPopUp(rowData)
            //     };
            //   }
            // ]}
            options={{
              actionsColumnIndex: -1,
              pageSize: 20,
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
  );
};
