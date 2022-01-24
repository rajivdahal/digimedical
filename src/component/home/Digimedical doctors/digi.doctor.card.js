import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { validateAppointment } from "./appointment.helper";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const DigiMedicalDoctorCard = (props) => {

    const [appointmentData, setData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        appointmentTime: "",
        appointmentDate: "",
        mblNumber: "",
        serviceId: "",
    })
    console.log("propsss are,,,",props)
    const [showForm, setForm] = useState(false);

    useEffect(() => {
        console.log(props)
    })

    const bookAppointment = () => {
        let tempForm = showForm === true ? false : true
        setForm(tempForm);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: appointmentData,
        onSubmit: async (values) => {
            console.log(values)
        },
        validate: (values) => {
            return validateAppointment(values);
        },
    });

    return (
        <div className="digidoctor_apoint_card">
            {
                props.allDigiDoctors.map((item,index)=>{
                    if(item){
                        return <div className="digidoctor_apoint_card1">
                        <div className="digidoc_card_img">
                            <img
                                src={REACT_APP_BASE_URL + "doctor/download/" + item.doctorId}
                                alt=""
                                style={{
                                    height: "140px",
                                    width: "140px",
                                    borderRadius: "50%",
                                }}
                            />
                        </div>
                        <div className="digidoctor_about_desc">
                            <div className="doc_about_desc_head">
                                <p id="doc_name_card">{item.name}</p>
                                <p id="doc_edu_brief">{item.prefix}</p>
                            </div>

                            <p id="digidoc_exp"> {item.specialist} </p>
                            <p >{item.desc}</p>

                        </div>

                        <div className="digidoctor_card_but">
                            {" "}
                            <button id="digidoctor_card_but" onClick={bookAppointment}>Book an appointment</button>
                        </div>
                    </div>
                    }


                })
            }

            {showForm === true ?
                <form onSubmit={formik.handleSubmit}>
                    <div className="form_digi_doc">
                        <div className="form_digidoc">
                            <div className="digidoc_appoin_form1">
                                <p>First Name</p>
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    name="firstName"
                                    id="firstName"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.firstName && formik.errors.firstName ?
                                    <div className="error-message">{formik.errors.firstName}</div>
                                    : null}
                            </div>
                            <div class="digidoc_appoin_form1">
                                <p>Middle Name</p>
                                <input
                                    type="text"
                                    placeholder="Enter Middle Name"
                                    name="middleName"
                                    id="middleName"
                                    onChange={formik.handleChange}
                                />

                            </div>
                            <div class="digidoc_appoin_form1">
                                <p>Last Name</p>
                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    name="lastName"
                                    id="lastName"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.lastName && formik.errors.lastName ?
                                    <div className="error-message">{formik.errors.lastName}</div>
                                    : null}
                            </div>
                            <div class="digidoc_appoin_form1">
                                <p>Email Address</p>
                                <input
                                    type="text"
                                    placeholder="Enter Email Address"
                                    name="email"
                                    id="email"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.email && formik.errors.email ?
                                    <div className="error-message">{formik.errors.email}</div>
                                    : null}
                            </div>
                            <div class="digidoc_appoin_form1">
                                <p>Phone No.</p>
                                <input
                                    type="text"
                                    placeholder="Enter Phone no."
                                    name="mblNumber"
                                    id="mobileNumber"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.mblNumber && formik.errors.mblNumber ?
                                    <div className="error-message">{formik.errors.mblNumber}</div>
                                    : null}
                            </div>

                            <div class="digidoc_appoin_form1">
                                <p>Appointment Date</p>

                                <input
                                    type="date"
                                    name="appointmentDate"
                                    id="appointmentDate"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.appointmentDate && formik.errors.appointmentDate ?
                                    <div className="error-message">{formik.errors.appointmentDate}</div>
                                    : null}
                            </div>
                            <div class="digidoc_appoin_form1">
                                <p>Appointment Time</p>
                                <input
                                    type="time"
                                    name="appointmentTime"
                                    id="appointmentTime"
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.appointmentTime && formik.errors.appointmentTime ?
                                    <div className="error-message">{formik.errors.appointmentTime}</div>
                                    : null}
                            </div>
                            <div class="digidoc_appoin_form1">
                                <p>Select Service Type</p>
                                <select name="cars" id="cars">
                                    <optgroup label="Swedish Cars">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                    </optgroup>
                                    <optgroup label="German Cars">
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div class="digidoc_appoin_form1">
                                <button type="submit" className="submit-buttons">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                :
                <></>
            }
        </div>
    )
}

export default DigiMedicalDoctorCard;