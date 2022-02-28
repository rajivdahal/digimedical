import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notify } from "../../../../services/notify";
import Accordion from "react-bootstrap/Accordion";
import { httpClient } from "../../../../utils/httpClient";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import "./digiDoctor.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import DoctorPopup from "../../../common/popup/doctorPopup/doctorPopup";
import { digiDoctorInfo, resetDigiDoctorState } from "../../../../actions/digiDoctorBooking.ac";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const UserDoctorCard = (props) => {
        // Redux implementation
        const dispatch = useDispatch();
        const digiAppointmentBooking = useSelector((state) => state.digiDoctorAppointmentBooking);
        const setDigiDoctorInfo = bindActionCreators(digiDoctorInfo,dispatch);
        const resetDigiDoctorInfo = bindActionCreators(resetDigiDoctorState,dispatch);
        console.log("dataaaaaa is",digiAppointmentBooking)
        // end of redux implementation

    const [showForm, setForm] = useState(false);
    var dt = new Date();
    const [selectedDay, setSelectedDay] = useState({
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate(),
    });
    const [minDate, setminDate] = useState({
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate(),
    });
    const date = selectedDay.year + "-" + selectedDay.month + "-" + selectedDay.day;
    const [appointmentData, setData] = useState({
        appointmentTime: "",
        appointmentDate: date,
    });
    const [docPopup, SetDocPopup] = useState(false);

    const handleDateChange = (value) => {
        console.log(value)
        let date = "";
        date = value.year + "-" + value.month + "-" + value.day;
        setSelectedDay(value);
        formik.values.appointmentDate = date;
    };

    const bookAppointment = (data) => {
        console.log("doctor data is",data)
        SetDocPopup(true)
        // check if previous booking from doctor is done if yes remove the data and update to latest doctor

        resetDigiDoctorInfo()
        // end check if previous booking from doctor is done if yes remove the data and update to latest doctor

        // set Doctor Info
        setDigiDoctorInfo(data)
        //end set Doctor Info
    };

    const submitAppointment = async (values) => {
        let serviceid = props.doctorServices;
        let data = {
            appointmentDate: values.appointmentDate,
            appointmentTime: values.appointmentTime,
            servicesId: serviceid,
            doctorId: props.doctorId,
        };
        try {
            let resp = await httpClient.POST(
                "create-appointment",
                data,
                false,
                true
            );
            if (resp.data.status) {
                notify.success(resp.data.message);
                setForm(false);
            }
        } catch (err) {
            if (
                err &&
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: appointmentData,
        onSubmit: async (values) => {
            console.log(values);
            submitAppointment(values);
        },
        validate: (values) => {
            let errors = {};
            if (!values.appointmentTime) {
                errors.appointmentTime = 'Appointment Time is required!'
            }
            return errors;
        },
    });
    return (
        <>
                        <DoctorPopup
                            trigger={docPopup}
                            setTrigger={SetDocPopup}
                            origin="digiDoctor"
                          ></DoctorPopup>

        <div className="outerCard">
            <div className="hospital_book_card1">
                <img
                    src={REACT_APP_BASE_URL + "doctor/download/" + props.doctorId}
                    onError={(e) => {
                        e.target.onerror = null;
                        props.gender == "1"
                            ? (e.target.src = "/images/doctor.jpeg")
                            : (e.target.src = "/images/femaledoctor.png");
                    }}
                    style={{
                        height: "140px",
                        width: "140px",
                        borderRadius: "50%",
                    }}
                    alt=""
                />

                <div className="digidoctor_about_desc">
                    <div className="digidoc_about_desc_head">
                        <p id="doc_name_card">{props.name}</p>
                        <p id="doc_edu_brief">{props.prefix}</p>
                    </div>

                    <p id="digidoc_exp"><b>{props.specialist} </b> </p>
                    <p2>{props.desc.slice(0, 50)}.....</p2>
                    <div className="doc_accordion">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    Available consultation medium
                                </Accordion.Header>
                                <Accordion.Body className="acc-doc-body">
                                    {props.digiServices.map((item) => {
                                        return <ul className="accordion-body">
                                            <li>{item.digiServiceName}</li>
                                        </ul>
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
                <div className="hosp_card_but_main">
                    {" "}

                    <button id="hosp_card_but_user" onClick={()=>bookAppointment(props)}>
                        Book an appointment
                    </button>
                </div>

            </div>

        </div>
        </>
    )
}

export default UserDoctorCard;