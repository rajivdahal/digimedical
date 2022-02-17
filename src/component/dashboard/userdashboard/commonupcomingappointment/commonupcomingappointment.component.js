import { httpClient } from "../../../../utils/httpClient";
import { useEffect } from "react"
import { useState } from "react"
import { notify } from "../../../../services/notify";
import { Check, Edit, Clear, Add } from "@material-ui/icons";
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
// import "./upcomingappointment.component.css"
import { formatDate } from "../../../../services/timeanddate";
import MaterialTable from 'material-table'
import Cliploader from "../../../../utils/clipLoader";
import { Showmodal, ShowPrescription } from "../../../../utils/showmodal";
import Prescribe from "../../doctordashboard/prescribe/prescribe.component";
import { useHistory } from "react-router-dom";
export const Commonupcomingappointment = (props) => {
    const history=useHistory()
    const userid = localStorage.getItem("userid")
    const [isloading, setisloading] = useState(false)
    const fromdoctorcomponent = props.fromdoctorcomponent ? props.fromdoctorcomponent : null
    const fromcorporatecomponent = props.fromcorporatecomponent ? props.fromcorporatecomponent : null
    const [pendingData, setpendingData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showPrescriptionModal, setshowPrescriptionModal] = useState(false)
    // const [refresh, setrefresh] = useState(null)
    const [id, setid] = useState()
    const [patient, setpatient] = useState({})

    const httpcall = (callingurl) => {
        console.log("inside httpcall")
        httpClient.GET(callingurl, false, true)
            .then(resp => {
                let data = resp.data.data
                console.log("data before is", resp)
                data = data.map((item, index) => {
                    item.appointmentdate = formatDate(item.appointmentdate?item.appointmentdate.slice(0, 10):item.appointmentDate.slice(0, 10))
                    item.appointmenttime =item.appointmenttime?item.appointmenttime.slice(0, 5):item.appointmentTime.slice(0, 5)
                    return item
                })
                setpendingData(data)

            })
            .catch(err => {
                notify.error("something went wrong")
            })
            .finally(() => {
                setisloading(false)
            })
    }
    useEffect(() => {
        setisloading(true)
        if (fromdoctorcomponent) {
            console.log("inside from doctor component")
            return httpcall(`getall-appointments-by/0`)
        }
        if (fromcorporatecomponent) {
            console.log("inside from corporate component")
            return httpcall(`get/corporate/appointments/0`)
        }
        else {
            console.log("inside from else component")
            httpcall(`get-user-pending-appointments`)
        }
    }, [])

    const columns = props.fromdoctorcomponent ? [
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
    ] : props.fromcorporatecomponent ? [
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
    ] : [
        {
            title: "Assigned Doctor", field: "doctorsname"
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
            title: "Service", field: "servicename"
        }
    ]
    const handleEdit = (e, data) => {
        props.fromcorporatecomponent?
        history.push({
            pathname: "/dashboard/corporate/bookappointment",
            data: data,
        }):history.push({
            pathname: "/dashboard/bookappointment",
            data: data,
        })
    }
    const handledelete = (e, data) => {
        setid(data.appointmentid)
        setShowModal(true)
    }
    const handlecancel = () => {
        setShowModal(false)
        setshowPrescriptionModal(false)
    }
    const fademodel = () => {
        setshowPrescriptionModal(false)
    }
    const deleteindeed = () => {
        if (id) {
            httpClient.PUT(`cancel-appointment/${id}`, null, false, true)
                .then(resp => {
                    notify.success("Deleted successfully")
                    setShowModal(false)
                })
                .catch(err => {
                    notify.error("Item cannot be deleted")
                })
                .finally(() => {
                    if (fromcorporatecomponent) {
                        console.log("inside from corporate component")
                        httpcall(`get/corporate/appointments/0`)
                    }
                    if (fromdoctorcomponent) {
                        httpcall(`getall-appointments-by/0`)
                    }
                    else {
                        httpcall(`get-user-pending-appointments`)
                    }
                })
        }
    }
    const handleAddAppointment = () => {
        props.fromcorporatecomponent?props.props.history.push("/dashboard/corporate/bookappointment"):props.props.push("/dashboard/bookappointment")
    }
    const proceedprescription = (e, rowdata) => {

        setshowPrescriptionModal(true)
        setpatient(rowdata)
        // props.props.history.push(`/dashboard/prescribe/${rowdata.id}`)
    }
    return (
        <>
            {
                isloading ? <Cliploader></Cliploader> :
                    <MaterialTable
                        title="Appointments"
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
                                tooltip: 'Edit appointment',
                                onClick: (e, rowData) => { handleEdit(e, rowData) }
                            },
                            {
                                icon: Clear,
                                tooltip: 'cancel appointment',
                                onClick: (e, rowData) => { handledelete(e, rowData) }
                            },
                            {
                                icon: Add,
                                tooltip: 'Add Appintment',
                                isFreeAction: true,
                                onClick: () => { handleAddAppointment() }
                            },
                        ] : props.isactionavailable && fromdoctorcomponent ? [
                            {
                                icon: CallMissedOutgoingIcon,
                                tooltip: 'Proceed for Prescription',
                                onClick: (e, rowData) => { proceedprescription(e, rowData) }
                            }]
                            : null}
                    ></MaterialTable>
            }
            <Prescribe showModal={showPrescriptionModal} handlecancel={() => fademodel()} patient={patient} props={props.props ? props.props.history : null}></Prescribe>
            <Showmodal showModal={showModal} handlecancel={() => handlecancel()} deleteindeed={() => deleteindeed()}></Showmodal>
        </>
    )
}