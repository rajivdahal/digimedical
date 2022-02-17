import React from 'react';
import { Formik,Field,ErrorMessage,Form } from 'formik';
import { useState,useEffect } from 'react';
import { httpClient } from '../../../../utils/httpClient';
import { notify } from '../../../../services/notify';
import * as Yup from "yup";
import Select from "react-select";
import { bindActionCreators } from "redux";
import {setUtilsInfoOpen } from '../../../../actions/medicalReports.ac';
import { CommonUtilityreportTable } from '../medicalReports/commonMedicalreportTable';
export default function UtilsInfo() {
    const [bodyCheckUpCategories, setBodyCHeckUpCategories] = useState([]);
    const [bodyCheckUp, setBodyCHeckUp] = useState([]);
    const [bodyCheckUpCategoryId, setBodyCheckUpCategoryId] = useState(null);


    const bodyCheckUpValues = {
        bodyCheckupId: null,
        checkUpDate: "",
        value: "",
      };
      const bodyCheckUpSchema = Yup.object().shape({
        checkUpDate: Yup.string().required("Checkup date is required!"),
        value: Yup.string().required("Value is required!"),
      });

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
        const updateBodyCheckUp = (values, { resetForm }) => {
    // console.log("inside body checkup",values)
    let finaldata = values;
    finaldata.bodyCheckupId = bodyCheckUpCategoryId;
    console.log("finaldata",finaldata)
    httpClient
      .POST("body-checkup/detail/create", finaldata, false, true)
      .then((resp) => {
        console.log("response data is",resp.data.message)
        notify.success(resp.data.message);
        fetchUserBodyCheckup();
        resetForm();
      })
      .catch((err) => {
        notify.error("Error in updating");
      })
  };
  const handleCategoryChange = (value) => {
    setBodyCheckUpCategoryId(value.value);
  };
  useEffect(() => {
    fetchBodyCheckUpCategories();
    fetchUserBodyCheckup();
  }, []);
  return<div className="med_repo_main">
  <div className="main-psetImage  report-container">
    <h2>Update your Body Checkup data here</h2>
    <div className="row umi_row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">

          <Formik
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
          // style={{color:"red"}}
          name="checkUpDate"
          render={(msg) => (
            <div style={{color:"red"}}>{msg}</div>
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
          name="value"
          render={(msg) => (
            <div style={{color:"red"}}>{msg}</div>
          )}
        />
        <button type="submit" className="button-submit">
          Update
        </button>
      </div>
    </Form>
  )}
</Formik>
<CommonUtilityreportTable
                    bodyCheckUp={bodyCheckUp}
                  ></CommonUtilityreportTable>


          </div>
            </div>
          </div>
        </div>
      </div>
    </div>




}
