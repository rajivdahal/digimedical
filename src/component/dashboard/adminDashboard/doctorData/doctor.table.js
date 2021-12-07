import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import MaterialTable from 'material-table';
import Tableicons from "../../../../utils/materialicons";
import { Add, Edit, Clear, DeleteOutline } from "@material-ui/icons";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import { Modal, Button } from 'react-bootstrap';

const DoctorTable = (props) => {

    const [doctors, setDoctors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [doctorId, setDoctorId] = useState("");
    const [doctorStatus, setDoctorStatus] = useState("");

    const columns = [
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
        { title: 'NMC', field: 'nmcNo', },
        { title: 'Prefix', field: 'prefix' },
        { title: 'Status', field: 'status' },

    ]

    const handleClose = () => setShowModal(false)

    const getDoctor = () => {
        httpClient.GET("doctor/getall",false,true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    setDoctors(resp.data.data)
                }
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
        httpClient.PUT("doctor/change-status", tempDoctorStatus)
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

    const handleAddDoctor = () => {
        props.history.push("/doctor")
    }

    const handleEditDoctor = (e, data) => {
        console.log(data)
        props.history.push("/doctor", data)
    }

    return (
        <div className="mt-5">
            <Container>
                <MaterialTable
                    columns={columns}
                    data={doctors}
                    title="All Doctor Details"
                    icons={Tableicons}
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
                    <Modal.Body >Do you really want to deactivate this doctor ?</Modal.Body>
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