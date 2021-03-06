import PropagateLoader from "react-spinners/PropagateLoader"
import { notify } from "../../../../services/notify"
import { httpClient } from "../../../../utils/httpClient"
import { useState } from "react"
import { useEffect } from "react"
import { Modal, Button } from 'react-bootstrap';
import { formatDate } from "../../../../services/timeanddate"
import MaterialTable from 'material-table'
import { Edit, Delete } from "@material-ui/icons";
import Cliploader from "../../../../utils/clipLoader"

export const Cancelledappointment = (props) => {
    const fromdoctorcomponent = props.fromdoctorcomponent ? props.fromdoctorcomponent : null
    const [isloading, setisloading] = useState(false);
    const [tableLoading,setTableLoading] = useState(false);
    const [pendingData, setpendingData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [id, setid] = useState()
    const [refresh, setrefresh] = useState()

    const httpcall=(url)=>{

        httpClient.GET(url, false, true)
        .then(resp => {
            console.log("inside then",resp.data)
            let data = resp.data.data
            data = data.map((item, index) => {
                item.appointmentDate = formatDate(item.appointmentdate?item.appointmentdate.slice(0, 10):item.appointmentDate.slice(0, 10))
                item.appointmentTime = item.appointmenttime?item.appointmenttime.slice(0, 5):item.appointmentTime.slice(0, 5)
                return item
            })
            setpendingData(resp.data.data)
            setTableLoading(false)
        })
        .catch(err => {
            // notify.error("something went wrong")
            console.log(err.response.data)
            setisloading(false)
        })
    }
    useEffect(() => {
        setTableLoading(true)
        if (props.fromdoctorcomponent) {
            httpcall("getall-appointments-by/2")
        }
        if (props.fromcorporatecomponent) {
            httpcall("get/corporate/appointments/2")
        }
        else {
            httpcall("get-user-canceled-appointments")
        }
    }, [])

    const columns =  props.fromdoctorcomponent ? [
        {
            title: "Patient Name", field: "patientsName"
        },
        {
            title: "Hospital", field: "hospitalname"
        },
        {
            title: "Date Of Appointment", field: "appointmentdate"
        },
        {
            title: "Time Of Appointment", field: "appointmenttime"
        },
        {
            title: "Service", field: "serviceName"
        }
    ] :  props.fromcorporatecomponent ? [
        {
            title: "Member Name", field: "patientsname"
        },
        {
            title: "Assigned Doctor", field: "doctorsname"
        },
        {
            title: "Date Of Appointment", field: "appointmentdate"
        },
        {
            title: "Time Of Appointment", field: "appointmenttime"
        },
        {
            title: "Service", field: "servicename"
        }
    ] :[
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
    return (
        <>
            {
                isloading ? <Cliploader></Cliploader> :
                    <MaterialTable
                        title="Completed Appointments"
                        columns={columns}
                        isLoading={tableLoading}

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

        </>
    )
}