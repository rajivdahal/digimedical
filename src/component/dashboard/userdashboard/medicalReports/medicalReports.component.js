import { Formik, Form, Field } from "formik";
import "./medicalReports.component.css";
import { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Add, Edit, Clear, DeleteOutline } from "@material-ui/icons";
import { Visibility } from "@material-ui/icons";
import { CloudDownload } from "@material-ui/icons";
import Tableicons from "../../../../utils/materialicons";
import { httpClient } from "../../../../utils/httpClient";
import { notify } from "../../../../services/notify";

export const MedicalReports = (props) => {
  const medicalReport = {
    hospitalName: "",
    doctorName: "",
    visitedDate: "",
    followUpDate: "",
    description: "",
  };

  let [image, setImage] = useState([]);
  const [data, setData] = useState([]);
  const fetchdata = () => {
    httpClient.GET("medical-records/get-all", false, true).then((resp) => {
      setData(resp.data.data);
    });
  };
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
  const handleImageChange = (event) => {
    let file = [];
    file.push(event.target.files[0]);
    console.log(file);
    setImage(file);
  };
  setTimeout(() => {
    console.log(image);
  }, 3000);
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="med_repo_main">
      <div className="main-psetImage(event.currentTarget.files[0])anel newdash_content report-container">
        <h2>Update your previous report here</h2>
        <div className="previous-reports-wrapper">
          <Formik initialValues={medicalReport} onSubmit={upload}>
            {() => (
              <Form className=" medical_repo_form">
                <div className="margin-adjuster1">
                  <div className="labrepo_text_form ">
                    <label htmlFor="name">Hospital Name:</label>
                    <Field
                      name="hospitalName"
                      id="hospitalName"
                      className="prescription_input"
                    ></Field>
                  </div>
                  <div className="labrepo_text_form">
                    <label htmlFor="name">Doctor Name:</label>
                    <Field
                      name="doctorName"
                      id="doctorName"
                      className="prescription_input"
                    ></Field>
                  </div>
                  <div className="labrepo_text_form">
                    <label htmlFor="name">Visited Date:</label>
                    <Field
                      name="visitedDate"
                      id="visitedDate"
                      className="prescription_input"
                      placeholder="2020-01-01"
                    ></Field>
                  </div>
                  <div className="labrepo_text_form">
                    <label htmlFor="name">Follow Up Date:</label>
                    <Field
                      name="followUpDate"
                      id="followUpDate"
                      className="prescription_input"
                      placeholder="2020-01-01"
                    ></Field>
                  </div>
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
        <div className="material-table">
          <p id="medical_table_head">Report</p>
          <MaterialTable
            data={data}
            title="Completed Lab Tests Details"
            icons={Tableicons}
            columns={[
              { title: "Doctor Name", field: "doctorname" },
              { title: "Hospital Name", field: "hospitalname" },
              { title: "Visited Date", field: "visiteddate" },
              { title: "Follow Up Date", field: "followupdate" },
              { title: "Description", field: "description" },
              //   { title: 'Follow Up Date', field: 'followupdate' },
            ]}
            actions={
              [
                // {
                //   icon:()=>(
                //     <CloudDownload
                //     fontSize="medium"
                //     className="action-button"
                //     ></CloudDownload>
                //   ),
                //   tooltip:"Download",
                //   onClick:(e,rowData)=>{
                //     // props.download(rowData)
                //   }
                // } ,
                //   {
                //     icon: () => (
                //       <Visibility
                //       fontSize="medium"
                //         className="action-button"
                //       />
                //     ),
                //     tooltip: "View Lab Reports",
                //     onClick: (e, rowData) => {
                //     //   props.showLabTest(rowData,"fetch");
                //     },
                //   }
              ]
            }
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
  );
};
