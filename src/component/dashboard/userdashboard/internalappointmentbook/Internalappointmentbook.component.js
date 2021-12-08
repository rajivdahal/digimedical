import React from 'react'
import { httpClient } from '../../../../utils/httpClient'
import "./Internalappointmentbook.component.css"
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { notify } from '../../../../services/notify';
export default function Internalappointmentbook(prop) {
    const editdata=prop.location.data?prop.location.data:null
    console.log("data are",editdata)
    const [appointmentsuccess, setappointmentsuccess] = useState(null)
    const [appointmentfailed, setappointmentfailed] = useState(null)
    const [services, setservices] = useState([])
    const [doctors, setdoctors] = useState([])
    const [isparameterschanged,setisparameterschanged]=useState({
        servicesId:true,
        doctorId:true,
        appointmentDate:true,
        appointmentTime:true
    })

    useEffect(() => {

        httpClient.GET("services/get/true", false, true)
            .then(resp => {
                setservices(resp.data.data)
            })
            .catch(err => {
                notify.error("Something went wrong")
            })

    }, [])
    

    const formik = useFormik({
        initialValues: {
            servicesId: '',
            doctorId: '',
            appointmentDate: '',
            appointmentTime: ''
        },
        validate: values => {
            let errors = {}

            if (!values.servicesId) {
                errors.servicesId = "Service is required!"
            }
            if (!values.doctorId) {
                errors.doctorId = "Doctor is required!"
            }
            if (!values.appointmentDate) {
                errors.appointmentDate = "Appointment date is required!"
            }
            if (!values.appointmentTime) {
                errors.appointmentTime = "Appointment time is required!"
            }
            return errors
        },
        onSubmit: values => {
            console.log("values are", values)
            httpClient.POST('create-appointment', values, false, true)
                .then(resp => {
                    let message = resp.data.message
                    setappointmentsuccess(resp.data.message)
                    setTimeout(() => {
                        prop.history.push("/dashboard/viewappointment")
                    }, 2000);
                })
                .catch(err => {
                    console.log(err)
                    setappointmentfailed("something went wrong")
                })

        }
    })
    const handleChange = (e) => {
        let{name,value}=e.target
        httpClient.GET(`doctor/get-related-doctor/${value}`, false, true)
            .then(resp => {
                setdoctors(resp.data.data)
                console.log(resp.data.data)
            })
            .catch(err => {
                setdoctors([])
                notify.error("No any doctors are available to this service")
            })
    }
    const changeparametersstatus=(e)=>{
        let {name,value}=e.target
        setisparameterschanged(prevvalue=>{
            return{
                ...prevvalue,
                [name]:false
            }
        })
        console.log("name and value are",name,value)
    }
    return (
        <>
            <div className="marginadj">
                <form onSubmit={formik.handleSubmit} className="form-width-adjust">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="service">Select Service</label>
                            
                            <select id="servicesId" className="form-control" style={{ color: "black" }}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    handleChange(e)
                                    changeparametersstatus(e)
                                }}
                                value="please select"
                            >
                               <option value={null}></option>
                                {

                                    services.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.serviceName}</option>
                                    })
                                }
                            </select>
                            <p>{editdata && isparameterschanged.servicesId?editdata.serviceName:null}</p>
                            {formik.errors.servicesId && formik.touched.servicesId ? <div style={{ color: "red" }} className="errmsg">{formik.errors.servicesId}  </div> : null}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="doctor">Select Doctor</label>
                            <select id="doctorId" className="form-control" {...formik.getFieldProps("doctorId")} style={{ color: "black" }}
                               onChange={(e) => {
                                formik.handleChange(e)
                                changeparametersstatus(e)
                            }}
                            >
                                <option value={null}></option>
                                {
                                    doctors.map((item, index) => {
                                        if (item.name) {
                                            return <option key={index} value={item.id}>{item.name}</option>
                                        }
                                    })
                                }
                            </select>
                            <p>{editdata && isparameterschanged.servicesId?editdata.doctorsName:null}</p>
                            {formik.errors.doctorId && formik.touched.doctorId ? <div style={{ color: "red" }} className="errmsg">{formik.errors.doctorId}</div> : null}
                       
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="appointment">Appointment Date.</label>
                            <input
                                type="date"
                                className="form-control"
                                id="appointmentDate"
                                placeholder="dd/mm/yyyy"
                                {...formik.getFieldProps("appointmentDate")}
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    changeparametersstatus(e)
                                }}
                            />
                            <p>{editdata ?editdata.appointmentDate:null}</p>
                            {formik.errors.appointmentDate && formik.touched.appointmentDate ? <div style={{ color: "red" }} className="errmsg">{formik.errors.appointmentDate}  </div> : null}
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="time">Time</label>
                            <input type="time" placeholder="select time" id="appointmentTime" className="form-control" {...formik.getFieldProps("appointmentTime")}
                             onChange={(e) => {
                                formik.handleChange(e)
                                changeparametersstatus(e)
                            }}
                            ></input>
                            <p>{editdata && isparameterschanged.appointmentTime?editdata.appointmentTime:null}</p>
                            {formik.errors.appointmentTime && formik.touched.appointmentTime ? <div style={{ color: "red" }} className="errmsg">{formik.errors.appointmentTime}  </div> : null}
                        </div>
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12 ">
                        <button type="submit" className="btn btn-primary btn-block">
                            {
                                editdata?"Save Changes":"Make Appointment"
                            }
                            
                        </button>
                        {
                            appointmentsuccess ? <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Success!</strong>
                                {appointmentsuccess}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> : null
                        }
                        {
                            appointmentfailed ? <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Error!</strong>
                                {appointmentfailed}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> : null
                        }
                    </div>
                    <div className="form-text">
                        We value your privacy. Your details are safe with us.
                    </div>
                </form>
                <img src="/images/dashboard/bookappointment/bookanappointment.png" alt="image.png" className="bookappimage"></img>
            </div>
        </>
    )
}
