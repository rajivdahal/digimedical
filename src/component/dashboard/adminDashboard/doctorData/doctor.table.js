import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import MaterialTable from 'material-table';
import Tableicons from "../../../../utils/materialicons";
import { Add, Edit, Clear, DeleteOutline } from "@material-ui/icons";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import { Modal, Button,Card } from 'react-bootstrap';
const DoctorTable = (props) => {

    const [doctors, setDoctors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [doctorInfoModal,setDoctorInfoModal] = useState(false)
    const [doctorId, setDoctorId] = useState("");
    const [doctorStatus, setDoctorStatus] = useState("");
    const [loading, setLoading] = useState(false)
    const [doctorInfo , setDoctorInfo] =useState([]);

    const handleClose = () => {
        setShowModal(false);
        setDoctorInfoModal(false)
    }

    const getDoctor = () => {
        setLoading(true)
        httpClient.GET("doctor/getall", false, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    setDoctors(resp.data.data)
                }
                setLoading(false)
            })
            .catch(err => {
                console.log(err.response)
                setLoading(false)
            })
    }

     const getDoctorInfo=(id)=>{
        httpClient.GET("doctor/basic-info/" + id, false, true)
        .then(resp => {
            let responseData = resp.data.data;
            setDoctorInfo(responseData);
        })
        .catch(err => {
            console.log(err.response)
        })

    }
    useEffect(() => {
        getDoctor();
    }, [])


    const handleDeactivateDoctor = (e, data) => {
        console.log(data);
        setDoctorStatus(data.status)
        setDoctorId(data.id)
        setShowModal(true)
    }
    const changeDoctorStatus = () => {

        let tempDoctorStatus = {
            id: doctorId,
            status: doctorStatus == "true" ? false : true
        }

        console.log(tempDoctorStatus)
        httpClient.PUT("doctor/change-status", tempDoctorStatus, false, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    notify.success(resp.data.message)
                    getDoctor();
                    handleClose();
                }
            })
            .catch(err => {
                console.log(err.response.data);
                handleClose();
            })

    }

    // const doctorModal = (data) => {
    //     let doctorData = data;
    //     setDoctorInfo(doctorData)
    //     setDoctorInfoModal(true)
    // }

    const handleAddDoctor = () => {
        props.history.push("/dashboard/create-doctor")
    }

    const handleEditDoctor = (e, data) => {
        // setDoctorId(data.id)
        console.log(data)
        props.history.push("/dashboard/create-doctor", data)
    }

    return (
        <div>
            <Container>
                <MaterialTable
                 data={doctors}
                 title="All Doctor Details"
                 icons={Tableicons}
                    columns={[
                        { title: 'ID', field: 'id' },
                        { title: 'Name', field: 'name' },
                        { title: 'Description', field: 'description' },
                        { title: 'NMC', field: 'nmcNo', },
                        { title: 'Prefix', field: 'prefix' },
                        {
                            title: 'Status', field: 'status',
                            render: rowData => rowData.status.toString() == "true" ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>

                        },
                    ]}

                    actions={[

                        {
                            icon: Clear,
                            tooltip: 'Change Status',
                            onClick: (e, rowData) => { handleDeactivateDoctor(e, rowData) }
                        },
                        {
                            icon: Add,
                            tooltip: 'Add Doctor',
                            isFreeAction: true,
                            onClick: () => { handleAddDoctor() }
                        },
                        {
                            icon: Edit,
                            tooltip: 'Edit Service',
                            onClick: (e, rowData) => { handleEditDoctor(e, rowData) }
                        },

                    ]}
                    isLoading={loading}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 20,
                        filtering: false,
                        sorting: true,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }
                    }}
                />

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title><b>Doctor Status</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >Do you really want to change this doctor status ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="info" onClick={changeDoctorStatus}>
                            Change Status
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </div>
    )
}

export default DoctorTable