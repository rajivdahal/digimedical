import { httpClient } from "../../../../utils/httpClient";
import { useEffect } from "react"
import { useState } from "react"
import { notify } from "../../../../services/notify";
import { Add, Edit, Delete, FlashOffRounded } from "@material-ui/icons";
// import "./upcomingappointment.component.css"
import { formatDate } from "../../../../services/timeanddate";
import MaterialTable from 'material-table'
import { Modal, Button } from 'react-bootstrap';

export const Commonupcomingappointment = (props) => {
    const userid = localStorage.getItem("userid")
    console.log("user id is", userid)
    const fromdoctorcomponent = props.fromdoctorcomponent ? props.fromdoctorcomponent : null
    const [pendingData, setpendingData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [refresh, setrefresh] = useState()
    const [id, setid] = useState()
    useEffect(() => {
        if (fromdoctorcomponent) {
            httpClient.GET(`getall-appointments-by/0`, false, true)
                .then(resp => {
                    let data = resp.data.data
                    data = data.map((item, index) => {
                        item.appointmentDate = formatDate(item.appointmentDate.slice(0, 10))
                        item.appointmentTime = item.appointmentTime.slice(0, 5)
                        return item
                    })
                    console.log(data)
                    setpendingData(resp.data.data)
                })
                .catch(err => {
                    notify.error("something went wrong")
                })
        }
        else {
            httpClient.GET("get-user-pending-appointments", false, true)
                .then(resp => {
                    let data = resp.data.data
                    data = data.map((item, index) => {
                        item.appointmentDate = formatDate(item.appointmentDate.slice(0, 10))
                        item.appointmentTime = item.appointmentTime.slice(0, 5)
                        return item
                    })
                    console.log(data)
                    setpendingData(resp.data.data)
                })
                .catch(err => {
                    notify.error("something went wrong")
                })
        }

    }, [])
    useEffect(() => {
        if (fromdoctorcomponent) {
            httpClient.GET("getall-appointments-by/0", false, true)
                .then(resp => {
                    let data = resp.data.data
                    data = data.map((item, index) => {
                        item.appointmentDate = formatDate(item.appointmentDate.slice(0, 10))
                        item.appointmentTime = item.appointmentTime.slice(0, 5)
                        return item
                    })
                    console.log(data)
                    setpendingData(resp.data.data)
                })
                .catch(err => {
                    notify.error("something went wrong")
                })
        }
        else {
            httpClient.GET("get-user-pending-appointments", false, true)
                .then(resp => {
                    let data = resp.data.data
                    data = data.map((item, index) => {
                        item.appointmentDate = formatDate(item.appointmentDate.slice(0, 10))
                        item.appointmentTime = item.appointmentTime.slice(0, 5)
                        return item
                    })
                    console.log(data)
                    setpendingData(resp.data.data)
                })
                .catch(err => {
                    notify.error("something went wrong")
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
    const handleEdit = (e, data) => {
        console.log("e is", e)
        console.log("data is", data)
        props.props.push({
            pathname: "/dashboard/bookappointment",
            data: data,
        })
    }
    const handledelete = (e, data) => {
        console.log("delete triggered", data)
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
    return (
        <>
            <MaterialTable
                title="Upcoming appointments"
                columns={columns}
                data={pendingData}
                options={{
                    paging: true,
                    exportButton: props.isexportavailable,
                    searchFieldAlignment: "left",
                    pageSizeOptions: [5, 10, 20, 25, 50],
                    pageSize: 5,
                    showFirstLastPageButtons: false,
                    paginationType: "stepped",
                    paginationPosition: "bottom",
                    exportAllData: true,
                    actionsColumnIndex: -1,
                    search: props.issearchavailable,
                    headerStyle: {
                        backgroundColor: '#2745F0',
                        color: '#FFF'
                    }

                }}
                actions={props.isactionavailable && !fromdoctorcomponent ? [
                    {
                        icon: Edit,
                        tooltip: 'Edit',
                        onClick: (e, rowData) => { handleEdit(e, rowData) }
                    },
                    {
                        icon: Delete,
                        tooltip: 'Delete',
                        onClick: (e, rowData) => { handledelete(e, rowData) }
                    },
                ] : [
                    {
                        icon: Delete,
                        tooltip: 'Delete',
                        onClick: (e, rowData) => { handledelete(e, rowData) }
                    },
                ]}
            ></MaterialTable>
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
        </>
    )
}