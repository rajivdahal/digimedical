import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import MaterialTable from 'material-table';
import Tableicons from "../../../../utils/materialicons";
import { Add, Edit, Clear, DeleteOutline } from "@material-ui/icons";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import { Modal, Button, Card } from 'react-bootstrap';
import doctorApi from "./doctor.services";
const DoctorTable = (props) => {

    const [doctors, setDoctors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [doctorInfoModal, setDoctorInfoModal] = useState(false)
    const [doctorId, setDoctorId] = useState("");
    const [doctorStatus, setDoctorStatus] = useState("");
    const [loading, setLoading] = useState(false)
    const [doctorInfo, setDoctorInfo] = useState([]);

    const  createDoctorPath= {
        "hospital" : "/dashboard/add-doctor",
        "admin" : "/dashboard/create-doctor",
    }
    const handleClose = () => {
        setShowModal(false);
        setDoctorInfoModal(false)
    }

    const getDoctor = async () => {
        setLoading(true)
        try {
            let resp;
            if (props.isHospital) {
                resp = await doctorApi.getHospitalDoctor();
            } else {
                resp = await doctorApi.getAdminDoctor();
            }
            if (resp.data.status) {
                resp.data.data.forEach((item) => {
                    if (item.description) {
                        let splitDesc = item.description.split(" ");

                        if (splitDesc.length < 10) {
                            item.description = item.description
                        } else {
                            let sliceDesc = splitDesc.slice(0, 10);
                            let joinDesc = sliceDesc.join(" ") + " ...";
                            item.description = joinDesc;
                        }
                    }
                })
                setDoctors(resp.data.data)
            }
        }
        catch (err) {
            console.log(err.response)
        }
        setLoading(false)
    }

    useEffect(() => {
        getDoctor();
    }, [])


    const handleDeactivateDoctor = (e, data) => {
        setDoctorStatus(data.status)
        setDoctorId(data.id)
        setShowModal(true)
    }

    const changeDoctorStatus = async () => {
        setLoading(true);
        try {
            let resp = await doctorApi.adminDoctorStatus(doctorId, doctorStatus);
            if (resp.data.status) {
                notify.success(resp.data.message)
                getDoctor();
                handleClose();
            }
        } catch (err) {
            console.log(err.response.data);
            notify.error(err.response.data.message)
            handleClose();
        }
        setLoading(false)
    }

    const handleAddDoctor = () => {
        let hospital = props.isHospital;
        // console.log(hospital)
        // props.history.push("/dashboard/create-doctor")
        // props.history.push(hospital ? createDoctorPath.hospital : createDoctorPath.admin);   

    }

    const addHospitalDoctor=()=>{
        props.history.push("/dashboard/add-doctor")

    }
    const handleEditDoctor = (e, data) => {
        props.history.push("/dashboard/create-doctor", data)
    }

    return (
        <div>
            <Container>
                {
                    props.isHospital ?
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
                                    icon: Add,
                                    tooltip: 'Add Doctor',
                                    isFreeAction: true,
                                    onClick: () => { addHospitalDoctor() }
                                },
                                // {
                                //     icon: Edit,
                                //     tooltip: 'Edit Service',
                                //     onClick: (e, rowData) => { handleEditDoctor(e, rowData) }
                                // },
                                {
                                    icon: Clear,
                                    tooltip: 'Change Status',
                                    onClick: (e, rowData) => { handleDeactivateDoctor(e, rowData) }
                                }

                            ]}
                            isLoading={loading}
                            options={{
                                actionsColumnIndex: -1,
                                pageSize: 20,
                                headerStyle: {
                                    backgroundColor: '#2745F0',
                                    color: '#FFF'
                                }
                            }}
                        />
                        :
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
                                {
                                    icon: Clear,
                                    tooltip: 'Change Status',
                                    onClick: (e, rowData) => { handleDeactivateDoctor(e, rowData) }
                                }

                            ]}
                            isLoading={loading}
                            options={{
                                actionsColumnIndex: -1,
                                pageSize: 20,
                                headerStyle: {
                                    backgroundColor: '#2745F0',
                                    color: '#FFF'
                                }
                            }}
                        />
                }


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