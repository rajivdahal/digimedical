import "./prescribe.component.css"
import { Modal, Button } from 'react-bootstrap';
import React from 'react'
import { useState, useEffect } from "react"
import { Add } from "@material-ui/icons"
import { httpClient } from "../../../../utils/httpClient";
import { notify } from "../../../../services/notify";
import { Field, Formik, useFormik, ErrorMessage, Form, FieldArray } from "formik";
import Prescribefooter from "./prescribefooter.component";
export default function Prescribe(props) {
    const appointmentid=props.patient.id
    // console.log("props in prescribe are", props.patient.id)
    const [lining, setlining] = useState({
        hitbasicinfo: true,
        hitlabtest: false,
        hitprescription: false,
        confirm: false
    })
    const initialValues = {
        basicInfo: '',
        labTestId: [],
        appointmentId: null,
        medicine: []
    }
    const [data, setdata] = useState({
        description: ''
    })

    const [patientinfo, setpatientinfo] = useState({})
    const [services, setservices] = useState([])
    const [labtest, setlabtest] = useState(["", ""])
    const [medicine, setmedicine] = useState(["", ""])
    const [isdescriptionempty, setisdescriptionempty] = useState(true)
    const [fade, setfade] = useState(false)
    const [finaldata, setfinaldata] = useState({
        basicInfo: '',
        labTestId: [],
        medicine: "",
        appointmentId:null
    })
    const [refresh, setrefresh] = useState(false)
    useEffect(() => {
        httpClient.GET("lab-test/get-all", false, true)
            .then(resp => {
                setservices(resp.data.data)
            })
            .catch(err => {
                notify.error("something went wrong")
            })
            setfinaldata((prevdata)=>{
                return{
                    ...prevdata,
                    appointmentId:props.patient.id
                }
            })
    }, [])
    useEffect(() => {
        setpatientinfo(props.patient)
    })

    const labTest = () => {

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
    const handleNext = (values) => {
        console.log("inisde next")
        if (lining.hitbasicinfo) {
            console.log("lining.hitbasicinfo triggered")
            setlining((prevstate) => {
                return {
                    ...prevstate,
                    hitbasicinfo: false,
                    hitlabtest: true,
                }
            })
            setfinaldata((prevstate) => {
                return {
                    ...prevstate,
                    basicInfo: values.basicInfo
                }
            })
        }
        if (lining.hitlabtest) {
            console.log("lining.hitlabtest triggered")

            setlining((prevstate) => {
                return {
                    ...prevstate,
                    hitlabtest: false,
                    hitprescription: true,
                }
            })
            setfinaldata((prevstate) => {
                return {
                    ...prevstate,
                    labTestId: values.labTestId
                }
            })
        }
        if (lining.hitprescription) {
            console.log("lining.hitprescription triggered")
            setfade(true)
            let medicinenames = "" + values.medicine
            console.log("medicine is", medicinenames)
            setlining((prevstate) => {
                return {
                    ...prevstate,
                    hitprescription: false,
                    hitbasicinfo: true,
                    confirm: true

                }
            })
            setfinaldata((prevstate) => {
                return {
                    ...prevstate,
                    medicine: medicinenames,
                    appointmentId:appointmentid
                }
            })

            console.log("final values are", finaldata)


            // if(!finaldata.medicine){
            //    return  console.log("medicine not inside")
            // }
            // console.log("final values are>>>",finaldata)
            // // httpClient.POST("appointment-prescription/create",finaldata,false,true,{

            // // })

        }
        if(lining.confirm) {
            console.log("confirm triggered")
            httpClient.POST("appointment-prescription/create",finaldata,false,true)
            .then(resp=>{
                notify.success("Prescription Created Successfully")
                props.props.push("/dashboard/")
            })
            .catch(err=>{
                notify.error("Prescription could not be saved")
            })
            .finally(()=>{
                setlining(prev => {
                    return {
                        ...prev,
                        confirm: false
                    }
                   
                })
            
            })

            console.log("finaldata are", finaldata)
        }


    }
    const closeoverlappingmodel = () => {
        console.log("cancel triggered")
        setlining({
            confirm: false,
            hitbasicinfo: true
        })
        setfade(true)
}
    return (
        <>
            <Modal show={props.showModal} onHide={props.handlecancel || fade}>
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
                            <Formik initialValues={initialValues} onSubmit={handleNext} >
                                {lining.hitbasicinfo ?
                                    <div>
                                        <Form className="prescription-form">
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
                                                <Field className="textarea-input" as="textarea" rows="4" cols="50" name="basicInfo" id="basicInfo"></Field>
                                                {/* <ErrorMessage name="basicInfo"></ErrorMessage> */}
                                            </div>
                                            <Prescribefooter handleCancel={handleCancel} label="Next"></Prescribefooter>

                                            {/* {formik.errors.basicInfo && formik.touched.basicInfo?<div style={{ color: "red" }} className="errmsg" style={{ marginLeft: "30%", color: "red" }}>{formik.errors.basicInfo}</div> : null} */}
                                        </Form>
                                    </div>
                                    : null}
                            </Formik>
                            <Formik initialValues={initialValues} onSubmit={handleNext}>
                                {


                                    lining.hitlabtest ?
                                        <div className="prescription-form">
                                            {

                                                <Form>
                                                    <FieldArray name="labTestId">
                                                        {
                                                            (fieldarrayprops) => {
                                                                console.log("fieldarray", fieldarrayprops)
                                                                const { push, remove, form } = fieldarrayprops
                                                                const { values } = form
                                                                const { labTestId } = values
                                                                return <div>
                                                                    {
                                                                        labTestId.length ?
                                                                            labTestId.map((item, index) => (
                                                                                <div key={index}>
                                                                                    <label>Lab Test {index + 1}:</label>
                                                                                    <Field as="select" className="prescription-input" name={`labTestId[${index}]`}>
                                                                                        <option value={null}></option>
                                                                                        {
                                                                                           
                                                                                            services.map((item, index) => {
                                                                                                return <option value={item.id} key={index}>{item.name}</option>
                                                                                            })
                                                                                        }
                                                                                    </Field >
                                                                                    {
                                                                                        <button type="button" onClick={() => remove(index)}>-</button>
                                                                                    }
                                                                                </div>
                                                                            )) : <div>No any lab test</div>
                                                                    }
                                                                    <div className="form-items" onClick={() => push("")}>
                                                                        <label htmlFor="addmore" style={{ color: "blue" }}>Add Lab Test <Add></Add></label>
                                                                    </div>
                                                                </div>
                                                            }
                                                        }
                                                    </FieldArray>
                                                    <Prescribefooter handleCancel={handleCancel} label="Next"></Prescribefooter>
                                                </Form>
                                            }
                                        </div>
                                        : null
                                }
                            </Formik>
                            <Formik initialValues={initialValues} onSubmit={handleNext}>
                                {
                                    lining.hitprescription ?
                                        <div className="prescription-form">
                                            {
                                                <Form>
                                                    <FieldArray name="medicine">
                                                        {
                                                            (fieldarrayprops) => {
                                                                console.log("fieldarray", fieldarrayprops)
                                                                const { push, remove, form } = fieldarrayprops
                                                                const { values } = form
                                                                const { medicine } = values
                                                                return <div>
                                                                    {
                                                                        medicine.length ?
                                                                            medicine.map((item, index) => (
                                                                                <div key={index}>
                                                                                    <label>Medicine{index + 1}:</label>
                                                                                    <Field className="prescription-input" name={`medicine[${index}]`}></Field >
                                                                                    {
                                                                                        <button type="button" onClick={() => remove(index)}>-</button>
                                                                                    }
                                                                                </div>
                                                                            )) : <div>No any medicine</div>
                                                                    }
                                                                    <div className="form-items" onClick={() => push("")}>
                                                                        <label htmlFor="addmore" style={{ color: "blue" }}>Add Medicine <Add></Add></label>
                                                                    </div>

                                                                </div>
                                                            }
                                                        }
                                                    </FieldArray>
                                                    <Prescribefooter handleCancel={handleCancel} label="Submit"></Prescribefooter>
                                                </Form>
                                            }
                                        </div>
                                        : null
                                }
                            </Formik>

                        </div>

                    </div>

                </div>
            </Modal>



            <Modal show={lining.confirm} onHide={!lining.confirm} style={{ marginTop: "25%", height: "500px",marginLeft:"180px" }}>
                <Modal.Header >
                    <Modal.Title><b>Confirm Prescription?</b></Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Formik initialValues={initialValues} onSubmit={handleNext}>
                        <Form>
                            <Button variant="info" onClick={closeoverlappingmodel}>
                                Cancel
                            </Button>
                            <Button variant="danger" type="submit">
                                Confirm
                            </Button>
                        </Form>
                    </Formik>
                </Modal.Footer>
                {/* <Formik initialValues={initialValues} onSubmit={handleNext}>
                    <Form>
                        {
                            lining.confirm ? <div className="prescription-form">

                                <Prescribefooter handleCancel={closeoverlappingmodel} label="Confirm"></Prescribefooter>
                            </div> : null
                        }
                    </Form>
                </Formik> */}
            </Modal>
        </>
    )
}
