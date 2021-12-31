import { useState, useEffect } from "react"
import MaterialTable from 'material-table';
import Tableicons from '../../../../utils/materialicons';
import { httpClient } from '../../../../utils/httpClient';
import { Add, Edit, Clear } from "@material-ui/icons";
import { Modal, Button } from 'react-bootstrap';
import { Container } from "@material-ui/core";
import { notify } from "../../../../services/notify";
import Cliploader from "../../../../utils/clipLoader";

const StaffPage = (props) => {

    const [allStaff, setAllStaff] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [staffStatus, setStatus] = useState("")
    const [staffID, setID] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const getStaffData = () => {
        httpClient.GET("staff/getall", false, true)
            .then(resp => {
                console.log(resp)
                let staffData = resp.data.data;
                staffData.forEach((staff) => {
                    staff.name = staff.firstName + " " + staff.middleName + " " + staff.lastName
                })
                if (resp.data.status) {
                    setAllStaff(resp.data.data)
                }
                setLoading(false)
            })
            .catch(err => {
                console.log(err.response)
                setLoading(false)
            })
    }

    useEffect(() => {
        getStaffData();
    }, [])

    const handleAddStaff=()=>{
        props.history.push("/dashboard/create-staff")
    }

    const handleEditStaff=(e,data)=>{
        console.log(data)
        props.history.push("/dashboard/create-staff", data)
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const handleDeactivateStaff = (e, data) => {
        setStatus(data.status)
        setID(data.id)
        setShowModal(true);
    }

    const changeStaffStatus = () => {
        setIsLoading(true)
        let status = staffStatus == true ? false : true;

        httpClient.PUT("staff/change-status/" + staffID + "/" + status, {}, null, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    notify.success(resp.data.message)
                    handleClose();
                    getStaffData();
                    setIsLoading(false)

                }

            })
            .catch(err => {
                console.log(err);
                setIsLoading(false)

            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    return (
        <div>
            <Container>
                <MaterialTable
                    title="Staff Data"
                    icons={Tableicons}
                    columns={[
                        { title: 'ID', field: 'id', },
                        { title: 'Name', field: 'name' },
                        { title: 'Post', field: 'post' },
                        { title: 'Ward No.', field: 'wardNo' },
                        { title: 'Street Name', field: 'streetName' },

                        {
                            title: 'Status', field: 'status',
                            render: rowData => rowData.status.toString() == "true" ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>

                        },

                    ]}
                    data={allStaff}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 5,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }
                    }}

                    actions={[

                        {
                            icon: Add,
                            tooltip: 'Add Staff',
                            isFreeAction: true,
                            onClick: () => { handleAddStaff() }
                        },
                        {
                            icon: Edit,
                            tooltip: 'Edit Service',
                            onClick: (e, rowData) => { handleEditStaff(e, rowData) }
                        },
                        {
                            icon: Clear,
                            tooltip: 'Change Status',
                            onClick: (e, rowData) => { handleDeactivateStaff(e, rowData) }
                        }

                    ]}
                    isLoading={loading}
                />

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title><b>Doctor Status</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >Do you really want to change this doctor status ?</Modal.Body>
                    <Modal.Footer>
                        {isLoading == true ?
                            <Cliploader isLoading={isLoading} />
                            :
                            <div>

                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="info" onClick={changeStaffStatus}>
                                    Change Status
                                </Button>
                            </div>
                        }
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    )
}
export default StaffPage