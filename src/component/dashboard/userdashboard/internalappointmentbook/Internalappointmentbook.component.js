import React from 'react'
import { httpClient } from '../../../../utils/httpClient'
import "./Internalappointmentbook.component.css"
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { notify } from '../../../../services/notify';
import { formatDate } from '../../../../services/timeanddate';
export default function Internalappointmentbook(prop) {
    console.log("props are", prop)
    const editdata = prop.location.data ? prop.location.data : null

    const [appointmentsuccess, setappointmentsuccess] = useState(null)
    const [appointmentfailed, setappointmentfailed] = useState(null)
    const [services, setservices] = useState([])
    const [doctors, setdoctors] = useState([])
    const [doctorname, setdoctorname] = useState(null)
    const [service, setservicename] = useState(null)
    // const [isparameterschanged, setisparameterschanged] = useState({
    //     servicesId: true,
    //     doctorId: true,
    //     appointmentDate: true,
    //     appointmentTime: true
    // })
    const [toeditdata, settoeditdata] = useState(editdata)
    if (toeditdata) {
        toeditdata['serviceId'] = toeditdata['servicesId']
    }
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
            console.log("inside submit")
            httpClient.POST('create-appointment', values, false, true)
                .then(resp => {
                    let message = resp.data.message
                    setappointmentsuccess(resp.data.message)
                    setTimeout(() => {
                        prop.history.push("/dashboard/viewappointment")
                    }, 2000);
                })
                .catch(err => {
                    setappointmentfailed("something went wrong")
                })
        }
    })
    const handleChange = (e) => {
        let { name, value } = e.target
        httpClient.GET(`doctor/get-related-doctor/${value}`, false, true)
            .then(resp => {
                setdoctors(resp.data.data)
            })
            .catch(err => {
                setdoctors([])
                notify.error("No any doctors are available to this service")
            })
    }
    const handleeditchange = (e) => {
        let { name, value } = e.target
        let servicesId
        if (name === "servicesId") {
            httpClient.GET(`services/get-name/${value}`)
                .then(resp => {
                    setservicename(resp.data.data.servicename)
                    settoeditdata(prevvalue => {
                        return {
                            ...prevvalue,
                            serviceName: null,

                        }
                    })
                })
                .catch(err => {
                    notify.error("something went wrong")
                })
        }
        if (name === "doctorId") {

            httpClient.GET(`doctor/doctor-name/${value}`)
                .then(resp => {
                    let doctorname = resp.data.data.name
                    setdoctorname(doctorname)
                    settoeditdata(prevvalue => {
                        return {
                            ...prevvalue,
                            doctorsName: null
                        }
                    })
                })
                .catch(err => {
                    notify.error("something went wrong")
                })
        }

        settoeditdata(prevvalue => {
            return {
                ...prevvalue,
                [name]: value
            }
        })

    }
    useEffect(() => {
        console.log(toeditdata)
    }, [toeditdata])
    const handlesubmit = (e) => {
        if (toeditdata) {
            httpClient.PUT(`update-appointment/${toeditdata.appointmentId}`, toeditdata, false, true)
                .then(resp => {
                    notify.success("Appointment updated successfully")
                    prop.history.push("/dashboard/viewappointment")
                })
                .catch(err => {
                    notify.error("Error in updating the appointment")
                })
        }


    }
    let formcontent = toeditdata ?
        <div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="service">Select Service</label>
                    <select name="servicesId" className="form-control" style={{ color: "black" }}
                        onChange={(e) => {
                            handleChange(e)
                            handleeditchange(e)
                        }}
                    >
                        <option value={null}></option>
                        {
                            services.map((item, index) => {
                                return <option key={index} value={item.id}>{item.serviceName}</option>
                            })
                        }
                    </select>
                    <h4>{toeditdata.serviceName ? toeditdata.serviceName : service}</h4>

                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="doctor">Select Doctor</label>
                    <select id="doctorId" className="form-control" name="doctorId" style={{ color: "black" }}
                        onChange={(e) => {
                            handleeditchange(e)
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
                    <h4>{toeditdata.doctorsName ? toeditdata.doctorsName : doctorname}</h4>
                    {/* <h4>{!doctorname && toeditdata.doctorsName ?toeditdata.doctorsName:doctorname}</h4> */}

                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <label htmlFor="appointment">Appointment Date.</label>
                    <input
                        type="date"
                        className="form-control"
                        id="appointmentDate"
                        name="appointmentDate"
                        placeholder="dd/mm/yyyy"
                        onChange={(e) => {
                            handleeditchange(e)
                        }}
                    />
                    <h4>{formatDate(toeditdata.appointmentDate)}</h4>
                </div>
                <div className="form-group col-md-12">
                    <label htmlFor="time">Time</label>
                    <input type="time" placeholder="select time" id="appointmentTime" name="appointmentTime" className="form-control"
                        onChange={(e) => {
                            handleeditchange(e)
                        }}
                    ></input>
                    <h4>{toeditdata.appointmentTime}</h4>
                </div>
            </div>
        </div> :
        <div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="service">Select Service</label>
                    <select id="servicesId" className="form-control" style={{ color: "black" }}
                        onChange={(e) => {
                            formik.handleChange(e)
                            handleChange(e)
                        }}
                    >
                        <option value={null}></option>
                        {
                            services.map((item, index) => {
                                return <option key={index} value={item.id}>{item.serviceName}</option>
                            })
                        }
                    </select>
                    {formik.errors.servicesId && formik.touched.servicesId ? <div style={{ color: "red" }} className="errmsg">{formik.errors.servicesId}  </div> : null}
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="doctor">Select Doctor</label>
                    <select id="doctorId" className="form-control" {...formik.getFieldProps("doctorId")} style={{ color: "black" }}
                        onChange={(e) => {
                            formik.handleChange(e)
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

                        }}
                    />
                    {formik.errors.appointmentDate && formik.touched.appointmentDate ? <div style={{ color: "red" }} className="errmsg">{formik.errors.appointmentDate}  </div> : null}
                </div>

                <div className="form-group col-md-12">
                    <label htmlFor="time">Time</label>
                    <input type="time" placeholder="select time" id="appointmentTime" className="form-control" {...formik.getFieldProps("appointmentTime")}
                        onChange={(e) => {
                            formik.handleChange(e)

                        }}
                    ></input>
                    {formik.errors.appointmentTime && formik.touched.appointmentTime ? <div style={{ color: "red" }} className="errmsg">{formik.errors.appointmentTime}  </div> : null}
                </div>
            </div>

        </div>
    return (
        <>
            <div className="marginadj">
                <form onSubmit={formik.handleSubmit} className="form-width-adjust">
                    {formcontent}
                    <div className="col-md-12 col-sm-12 col-xs-12 ">
                        <button type="submit" className="btn btn-primary btn-block" onClick={handlesubmit}>
                            {
                                editdata ? "Save Changes" : "Make Appointment"
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
