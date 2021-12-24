import { notify } from "../../../../services/notify";
import { useState } from "react";
import { useEffect } from "react";
import { httpClient } from "../../../../utils/httpClient";
import { formatDate } from "../../../../services/timeanddate";
import { Modal, Button, Image, Row, Col } from 'react-bootstrap';
import MaterialTable from 'material-table'
import Cliploader from "../../../../utils/clipLoader";
import Edit from '@material-ui/icons/Edit';
import DigiMedicalLogo from "../../../../assets/logo.png"
import { Visibility} from "@material-ui/icons";
import "./prescriptionView.css"

export const Completedappointment = (props) => {
    const fromdoctorcomponent = props.fromdoctorcomponent ? props.fromdoctorcomponent : null
    const [isloading, setisloading] = useState(false)
    const [pendingData, setpendingData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showPrescription, setShowPrescription] = useState(false)
    const [id, setid] = useState()
    const [refresh, setrefresh] = useState()
    const [prescriptionData,setPrescriptionData] = useState("")
    const [tableData,setTableData] = useState("");
    const [appointmentId,setAppointmentId]=useState("");
    useEffect(() => {
        setisloading(true)
        if (fromdoctorcomponent) {
            httpClient.GET("getall-appointments-by/1", false, true)
                .then(resp => {
                    let data = resp.data.data
                    data = data.map((item, index) => {
                        item.appointmentDate = formatDate(item.appointmentDate.slice(0, 10))
                        item.appointmentTime = item.appointmentTime.slice(0, 5)
                        return item
                    })
                    console.log(data)
                    setpendingData(resp.data.data)
                    setisloading(false)
                })
                .catch(err => {
                    notify.error("something went wrong")
                    setisloading(false)
                })
        }
        else {
            setisloading(true)
            httpClient.GET("get-user-completed-appointments", false, true)
                .then(resp => {
                    let data = resp.data.data
                    data = data.map((item, index) => {
                        item.appointmentDate = formatDate(item.appointmentDate.slice(0, 10))
                        item.appointmentTime = item.appointmentTime.slice(0, 5)
                        return item
                    })
                    console.log(data)
                    setpendingData(resp.data.data)
                    setisloading(false)
                })
                .catch(err => {
                    notify.error("something went wrong")
                    setisloading(false)
                })
        }
    }, [refresh])
    const columns = !props.fromdoctorcomponent ? [
        {
            title: "Assigned Doctor", field: "doctorsName"
        },
        {
            title: "Date Of Appointment", field: "appointmentDate"
        },
        {
            title: "Time Of Appointment", field: "appointmentTime"
        },
        {
            title: "Service", field: "serviceName"
        }
    ] : [
        {

            title: "Patient Name", field: "patientsName"
        },
        {
            title: "Date Of Appointment", field: "appointmentDate"
        },
        {
            title: "Time Of Appointment", field: "appointmentTime"
        },
        {
            title: "Service", field: "serviceName"
        }
    ]
    const handledelete = (e, data) => {
        const appointmentid = data.id
        setid(appointmentid)
        setShowModal(true)
    }
    const handlecancel = () => {
        setShowModal(false)
    }
    const deleteindeed = () => {
        if (id) {
            httpClient.PUT(`cancel-appointment/${id}`, null, false, true)
                .then(resp => {
                    setShowModal(false)
                    setrefresh(true)

                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }

    const getPrescriptionData=(id)=>{
        httpClient.GET("appointment-labTest/get/appointment/"+id,false,true)
        .then(resp =>{
            console.log(resp)
            let data = resp.data.data
            setPrescriptionData(data)
        })
        .catch(err =>{
            console.log(err)
        })
    }
    const showPrescriptionModal = (e, data) => {
        setShowPrescription(true)
        setTableData(data);
        let id = data.appointmentId;
        setAppointmentId(id)
        getPrescriptionData(id)       
    }

    const handleClose = () => {
        setShowPrescription(false)
    }
    
    return (
        <>
            {
                isloading ? <Cliploader></Cliploader> :
                    <MaterialTable
                        title="Completed Appointments"
                        columns={columns}
                        data={pendingData}
                        options={{
                            paging: true,
                            exportButton: true,
                            searchFieldAlignment: "left",
                            pageSizeOptions: [5, 10, 20, 25, 50],
                            pageSize: 5,
                            showFirstLastPageButtons: false,
                            paginationType: "stepped",
                            paginationPosition: "bottom",
                            exportAllData: true,
                            actionsColumnIndex: -1,
                            headerStyle: {
                                backgroundColor: '#2745F0',
                                color: '#FFF'
                            }
                        }}

                        actions={[
                            {
                                icon: Visibility,
                                tooltip: 'Edit Labtest',
                                onClick: (e, rowData) => { showPrescriptionModal(e, rowData) }
                            },

                        ]}
                    ></MaterialTable>
            }


            <Modal show={showModal} onHide={handlecancel}>
                <Modal.Header >
                    <Modal.Title><b>Upcomming Appointment</b></Modal.Title>
                </Modal.Header>
                <Modal.Body >Do you really want to delete the appointment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handlecancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteindeed}>
                        Delete
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal show={showPrescription} onHide={handleClose}>
                <div className="logo-div">
                    <Image src={DigiMedicalLogo} fluid />
                </div>
                <Modal.Body >
                    {/* <div>
                        <Row>
                            <Col md={5}>
                            </Col>
                            <Col md={2}>
                            </Col>
                            <Col md={5}>
                            </Col>
                        </Row>
                    </div> */}
                    <Row>
                        <Col md={12}>
                        <div className="prescription-block">
                            <span className="prescription-label">Name</span>
                            <span className="colon">:</span>
                            <span className="prescription-value">{prescriptionData.patientname}</span>
                        </div>
                        </Col>                    
                    </Row>
                    <Row>
                        <Col md={12}>
                        <div className="prescription-block">
                            <span className="prescription-label">Date Of Birth</span>
                            <span className="colon">:</span>
                            <span className="prescription-value">{prescriptionData.dobad}</span>
                        </div>
                        </Col>                    
                    </Row>
                    <Row>
                        <Col md={12}>
                        <div className="prescription-block">
                            <span>Age</span>
                            <span className="colon">:</span>
                            <span >{prescriptionData.age}</span>
                        </div> 
                        </Col>                   
                    </Row>
                    <Row>
                        <Col md={12}>
                        <div className="prescription-block">
                            <span>Weight</span>
                            <span className="colon">:</span>
                            <span >{prescriptionData.weight}</span>
                        </div>  
                        </Col>                  
                    </Row>
                    <Row>
                        <Col md={12}>
                        <div className="prescription-block">
                            <span>Height</span>
                            <span className="colon">:</span>
                            <span >{prescriptionData.height}</span>
                        </div> 
                        </Col>                   
                    </Row>
                    <Row>
                        <Col md={12}>
                        <div className="prescription-block">
                            <span>Blood Group</span>
                            <span className="colon">:</span>
                            <span >{prescriptionData.bloodgroup}</span>
                        </div> 
                        </Col>                   
                    </Row>
                    <Row>
                        <Col md={12}>
                        <div className="prescription-block">
                            <span>Doctor Name</span>
                            <span className="colon">:</span>
                            <span >{tableData.doctorsName}</span>
                        </div> 
                        </Col>                   
                    </Row>
                    <Row>
                        <Col md={12}>
                        <div className="prescription-block">
                            <span>Service Name</span>
                            <span className="colon">:</span>
                            <span >{tableData.serviceName}</span>
                        </div> 
                        </Col>                   
                    </Row>
                    <Row>
                        <Col md={12}>
                        <div className="prescription-block">
                            <span>Appointment Date</span>
                            <span className="colon">:</span>
                            <span >{tableData.appointmentDate}</span>
                        </div> 
                        </Col>                   
                    </Row>
                    <Row>
                        <Col>
                        <div className="prescription-block">
                            <span>Labtest</span>
                            <span className="colon">:</span>
                            <span >{prescriptionData.labtest}</span>
                        </div> 
                        </Col>                   
                    </Row>

                    <Row>
                        <Col md={12}>
                        <div className="prescription-block">
                            <span className="info-label">Medicine</span>
                            <span className="colon">:</span>
                            <span className="info-value">{prescriptionData.medecine}</span>
                        </div>
                        </Col>                    
                    </Row>
                    <Row>
                        <Col md={12}>
                        <div className="prescription-block">
                            <span className="info-label">Description</span>
                            <span className="colon">:</span>
                            <span className="info-value">{prescriptionData.description}</span>
                        </div>
                        </Col>                    
                    </Row>

                </Modal.Body>
            </Modal>


        </>
    )
}