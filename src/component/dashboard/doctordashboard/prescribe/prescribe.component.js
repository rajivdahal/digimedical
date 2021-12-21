import "./prescribe.component.css"
import { Modal, Button } from 'react-bootstrap';
import React from 'react'
import { useState, useEffect } from "react"
import { Add } from "@material-ui/icons"
import { httpClient } from "../../../../utils/httpClient";
import { notify } from "../../../../services/notify";
import { useFormik } from "formik";
export default function Prescribe(props) {
    console.log("props in prewscribe are", props)
    const [lining, setlining] = useState({
        hitbasicinfo: true,
        hitlabtest: false,
        hitprescription: false
    })
    const formik = useFormik({
        initialValues: {
            basicInfo: '',
            labTestId: [],
            appointmentId: null,
            medicine: ""
        },
        validate: values => {
            let errors = {}
            if (!values.basicInfo) {
                errors.basicInfo = "Required!"
            }
            return errors
        }
    })
    const [data, setdata] = useState({
        description: ''
    })

    const [patientinfo, setpatientinfo] = useState(props.patient)
    const [services, setservices] = useState([])
    const [labtest, setlabtest] = useState(["", ""])
    const [medicine, setmedicine] = useState(["", ""])
    const [isdescriptionempty, setisdescriptionempty] = useState(true)
    useEffect(() => {
        setpatientinfo(props.patient)
        httpClient.GET("lab-test/get-all", false, true)
            .then(resp => {
                setservices(resp.data.data)
            })
            .catch(err => {
                notify.error("something went wrong")
            })
    }, [])

    const labTest = () => {
        if (formik.errors.basicInfo) {
            return
        }
        setlining((prevstate) => {
            return {
                hitbasicinfo: false,
                hitprescription: false,
                hitlabtest: true
            }
        })
    }
    const basicInfo = () => {
        setlining((prevstate) => {
            return {
                hitbasicinfo: true,
                hitprescription: false,
                hitlabtest: false
            }
        })
    }
    const prescription = () => {
        setlining((prevstate) => {
            return {
                hitbasicinfo: false,
                hitprescription: true,
                hitlabtest: false
            }
        })
    }
    const handleCancel = () => {
        console.log("cancel triggered")
        props.handlecancel()
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        if (name === "labTestId") {
            formik.values.labTestId.push(value)
        }
        console.log(formik.values)
    }
    const addMore = (e) => {

        setlabtest((prevstate) => {
            return [...prevstate, ""]
        })
    }
    const addMoreMedicine = () => {
        setmedicine((prevstate) => {
            return [...prevstate, ""]
        })
    }
    const handleNext = () => {
        console.log(formik.values)
        if (lining.hitbasicinfo && !formik.errors.basicInfo) {
            setlining((prevstate) => {
                return {
                    hitbasicinfo: false,
                    hitprescription: false,
                    hitlabtest: true
                }
            })
        }
        if (lining.hitlabtest) {
            setlining((prevstate) => {
                return {
                    hitbasicinfo: false,
                    hitprescription: true,
                    hitlabtest: false
                }
            })
        }


    }
    return (
        <>
            <Modal show={props.showModal} onHide={props.handlecancel}>
                <div className='manage-positioning'>
                    <div className="prescription-container">
                        <div className="prescription-header">
                            <img src="/images/logo/logo4.png"></img>
                        </div>
                        <div className="prescription-category">
                            <div className={lining.hitbasicinfo ? "prescription-item" : null} onClick={basicInfo}> Basic Info </div>
                            <span className="prescription-header-line" style={lining.hitbasicinfo || lining.hitlabtest ? { display: "none" } : { display: "block" }}>|</span>
                            <div onClick={labTest} className={lining.hitlabtest ? "prescription-item" : null}> Lab Test</div>
                            <span className="prescription-header-line" style={lining.hitbasicinfo || lining.hitprescription ? { display: "none" } : { display: "block" }}>|</span>
                            <div onClick={prescription} className={lining.hitprescription ? "prescription-item" : null}> Prescription</div>
                        </div>
                        <div>
                            {lining.hitbasicinfo ? <form className="prescription-form">
                                <div className="form-items">
                                    <label htmlFor="name">Patient Name:</label>
                                    <input name="name" className="prescription-input" value={patientinfo.patientsName} ></input>
                                </div>
                                <div className="form-items">
                                    <label htmlFor="age">Age:</label>
                                    <input name="age" className="prescription-input" value={patientinfo.id}></input>
                                </div>
                                {
                                    patientinfo.weight ? <div className="form-items">
                                        <label htmlFor="bodyWeight">Body Weight:</label>
                                        <input name="bodyWeight" className="prescription-input" value={patientinfo.weight}></input>
                                    </div> : null
                                }
                                <div className="form-items">
                                    <label htmlFor="description" >Description:</label>
                                    <textarea className="textarea-input" rows="4" cols="50" {...formik.getFieldProps("basicInfo")}></textarea>

                                </div>
                                {formik.errors.basicInfo && formik.touched.basicInfo ? <div style={{ color: "red" }} className="errmsg" style={{ marginLeft: "30%", color: "red" }}>{formik.errors.basicInfo}</div> : null}
                            </form> : null}
                            {
                                lining.hitlabtest ?
                                    <div className="prescription-form">
                                        {
                                            labtest.map((item, index) => {
                                                return (
                                                    <>
                                                        <div className="form-items" key={index}>
                                                            <label htmlFor="labtest1">Lab Test {index + 1}:</label>
                                                            <select className="prescription-input" name="labTestId" onChange={handleChange}>
                                                                <option value={null}></option>
                                                                {
                                                                    services.map((item, index) => {
                                                                        return <option value={item.id} key={index}>{item.name}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                        <div className="form-items" onClick={addMore}>
                                            <label htmlFor="addmore" style={{ color: "blue" }}>Add More <Add></Add></label>
                                        </div>
                                    </div>
                                    : null
                            }
                            {
                                lining.hitprescription ?
                                    <div className="prescription-form">
                                        {
                                            medicine.map((item, index) => {
                                                return <>
                                                    <div className="form-items" key={index}>
                                                        <label htmlFor="name">Medicine {index + 1}:</label>
                                                        <input className="prescription-input"{...formik.getFieldProps("medicine")}></input>
                                                    </div>
                                                        </>
                                            })
                                        }
                                        <div className="form-items" onClick={addMoreMedicine}>
                                            <label htmlFor="addmore" style={{ color: "blue" }}>Add More <Add></Add></label>
                                        </div>

                                    </div>
                                    : null

                            }
                        </div>
                        <div className="prescription-footer">
                            <div className="footer-wrapper">
                                <div className="footer-button" onClick={handleCancel}> Cancel</div>
                                <button className="footer-button next-button" onClick={handleNext}> Next</button>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    )
}
