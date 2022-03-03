import React,{useEffect,useState} from 'react'
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker'
import {Form, Formik ,useFormikContext} from 'formik'
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { hospitalAppointmentBookingReducer } from '../../../../../reducers/hospitalAppointmentBooking.red';
import { appointmentFixed } from '../../../../../actions/hospitalAppointmentBooking.ac';
import SelectPaymentMethod from '../selectPaymentMethod/selectPaymentMethod';
import CircularProgress from '@mui/material/CircularProgress';
// import PayPop from '../../paymentpopup/payment';
import { callApiForInitialBooking, digiDoctorAppointmentBookLoading, digiDoctorAppointmentBookNotLoading, digiDoctorAppointmentFixed } from '../../../../../actions/digiDoctorBooking.ac';

export default function LoggedInCase(props) {
  console.log("props in main page is",props)
  var dt = new Date();
    const [selectedDay, setSelectedDay] = useState({
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate(),
        });
const initialValues={
  date:"",
  time:""
}
const schema = Yup.object().shape({
  date: Yup.object(),
  time: Yup.string().required("Time is required!"),
});


  // Redux implementation
  const dispatch = useDispatch();
  // start for hospital doctor booking
  const appointmentBooking = useSelector((state) => state.appointmentBooking);
  const setAppointmentFixed=bindActionCreators(appointmentFixed,dispatch)
  console.log("store  data are from logged in case",appointmentBooking)
  // end for hospital doctor booking

  // start for digi doctor booking
  const digiDoctorBooking=useSelector((state)=>state.digiDoctorAppointmentBooking)
  const setDigiDoctorAppointment=bindActionCreators(digiDoctorAppointmentFixed,dispatch)
  const doctorAppointmentBookLoading=bindActionCreators(digiDoctorAppointmentBookLoading,dispatch)
  const doctorAppointmentBookNotLoading=bindActionCreators(digiDoctorAppointmentBookNotLoading,dispatch)
  const apiCallForInitialBooking=bindActionCreators(callApiForInitialBooking,dispatch)
  console.log("consoleeee is",digiDoctorBooking,setDigiDoctorAppointment)
  // end for digi doctor booking
  // end of redux implementation

function DatePickerField({ name }) {
        const formik = useFormikContext();
        const field = formik.getFieldProps(name);
        console.log("field issss",field)
        return (
          <DatePicker
            value={field.value?field.value:selectedDay}
            onChange={value => {
              console.log("values are",value)
              formik.setFieldValue(name, value)
            }}
          />
        );
      }
  function TimePickerField({name}){
    const formik = useFormikContext();
    const field=formik.getFieldProps(name)
    console.log("field iss",field)
    return (
      <input type={"time"}
      onChange={
        e=>{
          console.log("event is",e)
          formik.setFieldValue(name,e.target.value)
        }
      }
      ></input>
    )
  }
  const getFinalData=(values)=>{
    console.log("undefined valus",values)
    let finaldata={
      appointmentDate:values.date?
                      values.date.year+"-"+values.date.month+"-"+values.date.day:
                      selectedDay.year+"-"+selectedDay.month+"-"+selectedDay.day,
      appointmentTime:values.time
    }
    return finaldata
  }
  const submit=(values)=>{
    let finaldata=getFinalData(values)
    setAppointmentFixed(finaldata)
  }
  const submitDigiDoctorBooking=(values)=>{
    let finaldata=getFinalData(values)
    console.log("final data after submitting from only doctor is",finaldata)
    doctorAppointmentBookLoading(true)
    setDigiDoctorAppointment({
      servicesId:digiDoctorBooking.digiDoctorInfo.serviceid,
      doctorId:digiDoctorBooking.digiDoctorInfo.doctorId,
      ...finaldata
    })
    // apiCallForInitialBooking({
    //   appointmentDate:digiDoctorBooking.digiDoctorAppointmentDate,
    //   appointmentTime:digiDoctorBooking.digiDoctorAppointmentTime,
    // }
    //   )
    // doctorAppointmentBookNotLoading(false)
  }

  return (
    //logic for  digimedical doctor appointment booking
  props.origin?

    <div className="doc-pop-main">
    <div className="doc-pop-inner">
    {
      !digiDoctorBooking.isDigiDoctorAppointmentFixed?
      <div className="doc-pop-cont">
      <div className="doc-close-but">
        {" "}
        <button
          className="doc-close-butt"
          onClick={() => props.props.setTrigger(false)}
        >
          <span id="doc-popup-cross">
            <i class="fas fa-times"></i>
          </span>
        </button>
      </div>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submitDigiDoctorBooking}>
          {
              ({ errors, touched})=><div className="doc-pop-form">
                  <Form>
                  <div className="doc-form-row2">
                <div className="doc-form-input1">
                  {" "}
                  <label htmlFor="">Appointmemt Date</label>
                  <DatePickerField name="date"></DatePickerField>
                  {
                      errors.date && touched.date?<div style={{color:"red"}}>{errors.date}</div>:null
                  }
                </div>
                <div className="doc-form-input1">
                  <label htmlFor="">Appointment Time</label>
                  <TimePickerField name="time"></TimePickerField>
                  {
                    errors.time && touched.time?<div style={{color:"red"}}>{errors.time}</div>:null
                  }
                </div>
              </div>
              <div className="doc-form-row3">
                {" "}
                {
                  digiDoctorBooking.isLoadingAppointmentBooking?<CircularProgress />:  <button
                  id="pop-doc-but" type='submit'>
                   Make Appointment
                 </button>
                }



                <div className="doc-form-last-sent">
                  <p>We value your privacy. Your details are safe with us.</p>
                </div>
              </div>
                  </Form>
            </div>
          }
      </Formik>
    </div>:
    digiDoctorBooking.isDigiDoctorAppointmentFixed?
    <SelectPaymentMethod props={props}></SelectPaymentMethod>
    :null
    }
    </div>
  </div>
    //end of logic for  digimedical doctor appointment booking
  :
    //logic for  hospital doctor appointment booking
  <div className="doc-pop-main">
    <div className="doc-pop-inner">
     {!appointmentBooking.isAppointmentFixed?
     <div className="doc-pop-cont">
        <div className="doc-close-but">
          {" "}
          <button
            className="doc-close-butt"
            onClick={() => props.props.setTrigger(false)}
          >
            <span id="doc-popup-cross">
              <i class="fas fa-times"></i>
            </span>
          </button>
        </div>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
            {
                ({ errors, touched})=><div className="doc-pop-form">
                    <Form>
                    <div className="doc-form-row2">
                  <div className="doc-form-input1">
                    {" "}
                    <label htmlFor="">Appointmemt Date</label>
                    <DatePickerField name="date"></DatePickerField>
                    {
                        errors.date && touched.date?<div style={{color:"red"}}>{errors.date}</div>:null
                    }
                  </div>
                  <div className="doc-form-input1">
                    <label htmlFor="">Appointment Time</label>
                    <TimePickerField name="time"></TimePickerField>
                    {
                      errors.time && touched.time?<div style={{color:"red"}}>{errors.time}</div>:null
                    }
                  </div>
                </div>
                <div className="doc-form-row3">
                  {" "}
                  <button
                  // onClick={() => props.props.setTrigger(false)}
                   id="pop-doc-but" type='submit'>
                    Make Appointment
                  </button>
                  <div className="doc-form-last-sent">
                    <p>We value your privacy. Your details are safe with us.</p>
                  </div>
                </div>
                    </Form>

              </div>
            }
        </Formik>
      </div>
      :
      appointmentBooking.isAppointmentFixed
      ?
      <SelectPaymentMethod props={props}></SelectPaymentMethod>
      :null

    }
    </div>
  </div>
    //end of logic for  hospital doctor appointment booking
  )
}
