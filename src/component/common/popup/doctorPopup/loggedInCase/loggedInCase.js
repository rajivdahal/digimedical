import React,{useEffect,useState} from 'react'
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker'
import {ErrorMessage, Form, Formik ,useFormikContext} from 'formik'
import * as Yup from "yup";
export default function LoggedInCase(props) {
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
  const submit=(values)=>{
    let finaldata={
      date:values.date?
                      values.date.year+"-"+values.date.month+"-"+values.date.day:
                      selectedDay.year+"-"+selectedDay.month+"-"+selectedDay.day,
      time:values.time
    }
    console.log("values",finaldata)
  }
  return (
    <div className="doc-pop-main">
    <div className="doc-pop-inner">
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
    </div>
  </div>
  )
}
