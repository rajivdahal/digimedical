import React from 'react'
import { httpClient } from '../../../../utils/httpClient'
import "./Internalappointmentbook.component.css"
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { notify } from '../../../../services/notify';
import { formatDate } from '../../../../services/timeanddate';
import { Todaydate } from '../../../../services/todaydate';
import Clear from "@material-ui/icons/Clear";
import TimePicker from 'react-time-picker';
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Internalappointmentbook(prop) {
    const editdata = prop.location.data ? prop.location.data : null
    console.log("to edit data is", editdata)
    const [appointmentsuccess, setappointmentsuccess] = useState(null)
    const [appointmentfailed, setappointmentfailed] = useState(null)
    const [services, setservices] = useState([])
    const [doctors, setdoctors] = useState([])
    const [doctorname, setdoctorname] = useState(null)
    const [service, setservicename] = useState(null)
    const [corporatememberemail, setcorporatememberemail] = useState([])

    const [toeditdata, settoeditdata] = useState(editdata)
    const [isdoctorblurred, setisdoctorblurred] = useState(false);
    const [value, onChange] = useState('12:00');

    const [doctorfetched, setdoctorfetched] = useState({
        image: null,
        prefix: null,
        name: null,
        specialist: null,
        description: null,
    });
    if (toeditdata) {
        toeditdata['serviceId'] = toeditdata['servicesId']
    }
    const callapi = (url, values) => {
        httpClient.POST(url, values, false, true)
            .then(resp => {
                let message = resp.data.message
                setappointmentsuccess(resp.data.message)
                setTimeout(() => {
                    prop.location.pathname == "/dashboard/corporate/bookappointment" ? prop.history.push("/dashboard/corporate/viewappointment") : prop.history.push("/dashboard/viewappointment")
                }, 2000);
            })
            .catch(err => {
                setappointmentfailed("Something went wrong")
            })
    }
    useEffect(() => {
        httpClient.GET("services/get/true", false, true)
            .then(resp => {
                setservices(resp.data.data)
            })
            .catch(err => {
                notify.error("Something went wrong")
            })
        if (prop.location.pathname == "/dashboard/corporate/bookappointment") {
            httpClient.GET("corporate/get/members/name", false, true)
                .then(resp => {
                    setcorporatememberemail(resp.data.data)
                })
                .catch(err => {
                    notify.error("Something went wrong")
                })
        }

    }, [])
    const formik = useFormik({
        initialValues: {
            servicesId: '',
            doctorId: '',
            appointmentDate: '',
            appointmentTime: '',
            email: ""
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
            console.log("inside submit", values)
            if (prop.location.pathname == "/dashboard/corporate/bookappointment") {
                return callapi('create-appointment/corporate', values)
            }
            callapi('create-appointment', values)
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
    const getdoctorinfo = (e) => {
        let doctorid = e.target.value;
        if (!doctorid) {
            return setisdoctorblurred(false);
        }
        console.log(doctorid);
        let image = BASE_URL + "doctor/download/" + doctorid;
        httpClient
            .GET(`doctor/public-info/${doctorid}`)
            .then((resp) => {
                const { prefix, name, specialist, description } = resp.data.data;
                setdoctorfetched({
                    image: image,
                    prefix: prefix,
                    name: name,
                    specialist: specialist,
                    description: description,
                });
                setisdoctorblurred(true);
                console.log(resp.data.data);
            })
            .catch((err) => {
                notify.error("something went wrong");
            });
    };
    if (value) {
        formik.values.appointmentTime = value
    }
    const clearpopup = () => {
        setisdoctorblurred(false);
    };
    let formcontent = toeditdata ?

        <div>
            {
                prop.location.pathname == "/dashboard/corporate/bookappointment" ?
                    <div className="form-row">
                        <label htmlFor="service">Select Member</label>
                        <select id="email" name="email" className="form-control" 
                            onChange={(e) => {
                                formik.handleChange(e)
                            }}
                          disabled 
                        >
                            
                           <option>{toeditdata.patientsname}</option>
                        </select>
                        {/* <h4>{toeditdata.patientsname}</h4> */}
                        {/* {formik.errors.email && formik.touched.email ? <div style={{ color: "red" }} className="errmsg">{formik.errors.email}  </div> : null} */}
                    </div> : null
            }
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="service">Select Service</label>
                    <select name="servicesId" className="form-control" style={{ color: "black" }}
                        onChange={(e) => {
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
                    <h4>{toeditdata.servicename ? toeditdata.servicename : service}</h4>

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
                    <h4>{toeditdata.doctorsname ? toeditdata.doctorsname : doctorname}</h4>
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
                        min={Todaydate()}
                        onChange={(e) => {
                            handleeditchange(e)
                        }}
                    />
                    <h4>{formatDate(toeditdata.appointmentdate)}</h4>
                </div>
                <div className="form-group col-md-12">
                    <label htmlFor="time">Time</label>
                    <input type="time" placeholder="select time" id="appointmentTime" name="appointmentTime" className="form-control"
                        onChange={(e) => {
                            handleeditchange(e)
                        }}
                    ></input>
                    <h4>{toeditdata.appointmenttime}</h4>
                </div>
            </div>
        </div> :
        <div>
            {
                prop.location.pathname == "/dashboard/corporate/bookappointment" ? <div className="form-row">
                    <label htmlFor="service">Select Member</label>
                    <select id="email" name="email" className="form-control" style={{ color: "black" }}
                        onChange={(e) => {
                            formik.handleChange(e)
                        }}
                    >
                        <option value={null}></option>
                        {
                            corporatememberemail.map((item, index) => {
                                return <option key={index} value={item.email}>{item.email}</option>
                            })
                        }
                    </select>
                    {formik.errors.email && formik.touched.email ? <div style={{ color: "red" }} className="errmsg">{formik.errors.email}  </div> : null}
                </div> : null
            }
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
                            getdoctorinfo(e);
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
                    <div>
                        <TimePicker
                            onChange={onChange}
                            value={value}
                            required
                            className="time-picker"
                        />
                    </div>
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
                {isdoctorblurred ? (
                    <div class="docs">
                        <div class="doc bubbble">
                            <Clear className="clear-icon" onClick={clearpopup}></Clear>
                            <div class="imag1">
                                <img src={doctorfetched.image} />
                            </div>
                            <div class="description">
                                <p id="doc_name">Dr. {doctorfetched.name}</p>
                                <p id="doc_skill">{doctorfetched.specialist}</p>
                                <p id="doc_edu">{doctorfetched.prefix}</p>
                                <p id="doc_exp">{doctorfetched.description}</p>
                            </div>
                        </div>
                    </div>
                ) : null}
                <img src="/images/dashboard/bookappointment/bookanappointment.png" alt="image.png" className="bookappimage"></img>
            </div>
        </>
    )
}
