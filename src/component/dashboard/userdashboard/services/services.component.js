import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';
import { ErrorMessage, Field, Form, Formik ,useFormikContext} from 'formik'
import React from 'react'
import { useState ,useEffect} from 'react';
import Select from "react-select";
import { httpClient } from '../../../../utils/httpClient';
import * as Yup from "yup";
import "./services.component.css"
import { notify } from '../../../../services/notify';
import MaterialTable from 'material-table';
import Tableicons from '../../../../utils/materialicons';
import { Check, Edit, Clear, Add } from "@material-ui/icons";


export default function UserServices() {
  console.log("inside user services")
  const initialValues={
    serviceId:"",
    date:"",
    time:""
}

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
    const [allServices,setAllServices]=useState([])
    const [selectedService,setSelectedService]=useState([])
    let [date,setDate]=useState("")
    let [serviceId,setServiceId]=useState("")
      useEffect(()=>{
          getAllServices()
          getSelectedServices()
      },[])

    const getAllServices=()=>{
        httpClient.GET("services/get-all")
        .then(resp=>{
            let allServices = resp.data.data.map((item) => {
                return {
                  label: item.serviceName,
                  value: item.id,
                };
              });
              console.log("all services is",allServices)
            setAllServices(allServices)
        })
        .catch(err=>{
            console.log("error is",err)
        })
    }
    const getSelectedServices=()=>{
      httpClient.GET("service-booking/get/0",false,true)
      .then(resp=>{
        setSelectedService(resp.data.data)
      })
      .catch(err=>{
        notify.error("Error in fetching services")
      })
    }

function DatePickerField({ name }) {
  const formik = useFormikContext();
  const field = formik.getFieldProps(name);
  console.log("field issss",field)
  return (
    <DatePicker
      value={field.value?field.value:selectedDay}
      onChange={value => {
        formik.setFieldValue(name, value)
      }}
    />
  );
}
function TimePickerField({name}){
  const formik=useFormikContext()
  const field=formik.getFieldProps(name);
  return(
    <input type={"time"} className="prescription_input" onChange={e=>{
      formik.setFieldValue(name,e.target.value)
    }}></input>
  )
}
function SelectField({name}){
  const formik=useFormikContext()
  const field=formik.getFieldProps(name);
  return (
    <Select
    options={allServices}
    className="select-category"
    onChange={(value)=>{
      console.log("value is",value)
      formik.setFieldValue(name,value.value)
    }}
    />
  )
}
  const submit=(values,{ resetForm })=>{
      console.log("values are",values)
      let finaldata={
        date:values.date?
                        values.date.year+"-"+values.date.month+"-"+values.date.day:
                        selectedDay.year+"-"+selectedDay.month+"-"+selectedDay.day,
        digiServiceId:values.serviceId,
        time:values.time
      }
      console.log(finaldata)
      httpClient.POST("service-booking/create",finaldata,false,true)
      .then(resp=>{
        notify.success("Updated Successfully")
        resetForm()
        getSelectedServices()
      })
      .catch(err=>{
        notify.error("Error in updating")
      })
  }
  return (
    <div className="med_repo_main">
    <div className="main-psetImage  report-container">
      <h2>Select the service</h2>
      <div className="row umi_row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
            <Formik
        initialValues={initialValues}
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={schema}
    >

    {({ errors, touched}) => (
      <Form className=" medical_repo_form">
        <div className="margin-adjuster1">
          <div className="labrepo_text_form">
          <label htmlFor="date">Date:</label>
          <div className='serviceDate'>
          <DatePickerField name="date" />
          </div>
          </div>
          {
            errors.date && touched.date?<div style={{color:"red"}}>{errors.date}</div>:null
          }
          <div className="labrepo_text_form">
            <label htmlFor="name">Time:</label>
            <TimePickerField name="time"></TimePickerField>
          </div>
          {
            errors.time && touched.time?<div style={{color:"red"}}>{errors.time}</div>:null
          }
        </div>
        <div className="margin-adjuster2">
          <div className="labrepo_text_form">
            <label htmlFor="name">Value:</label>
            <SelectField name="serviceId"></SelectField>
          </div>
          {
            errors.serviceId && touched.serviceId?<div style={{color:"red"}}>{errors.serviceId}</div>:null
          }
          <button type="submit" className="button-submit">
            Update
          </button>
        </div>
      </Form>
    )}
  </Formik>
  <div className="material-table">
  <p id="medical_table_head">Report</p>
  <MaterialTable
    data={selectedService}
    title="Selected Services"
    icons={Tableicons}
    columns={[
      { title: "Name",field: "serviceName" },
      { title: "Date", field: "date" },
      { title: "Time", field:"time"},
    ]}
    options={{
      actionsColumnIndex: -1,
      pageSize: 5,
      filtering: false,
      sorting: true,
      headerStyle: {
      backgroundColor: "#2745F0",
      color: "#FFF",
      }
    }}

    actions={[
      {
        icon: 'edit',
        tooltip: 'Edit',
        onClick: (event, rowData) => {
          // Do save operation
        }
      },
      {
        icon: 'delete',
        tooltip: 'delete',
        onClick: (event, rowData) => {
          // Do save operation
        }
      }

    ]}

  />
</div>;
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  )
}
