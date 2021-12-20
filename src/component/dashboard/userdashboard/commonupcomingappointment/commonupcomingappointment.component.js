import { httpClient } from "../../../../utils/httpClient";
import { useEffect } from "react"
import { useState } from "react"
import { notify } from "../../../../services/notify";
import { Check, Edit, Clear ,Add} from "@material-ui/icons";
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
// import "./upcomingappointment.component.css"
import { formatDate } from "../../../../services/timeanddate";
import MaterialTable from 'material-table'
import Cliploader from "../../../../utils/clipLoader";
import { Showmodal, ShowPrescription } from "../../../../utils/showmodal";
import Prescribe from "../../doctordashboard/prescribe/prescribe.component";

export const Commonupcomingappointment = (props) => {
    console.log("props in commmonupcoming appointment is",props)
    const userid = localStorage.getItem("userid")
    const [isloading, setisloading] = useState(false)
    const fromdoctorcomponent = props.fromdoctorcomponent ? props.fromdoctorcomponent : null
    const [pendingData, setpendingData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showPrescriptionModal, setshowPrescriptionModal] = useState(false)
    const [refresh, setrefresh] = useState()
    const [id, setid] = useState()
    const [patient,setpatient]=useState({})
    useEffect(() => {
        setisloading(true)
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
                    setisloading(false)
                })
                .catch(err => {
                    notify.error("something went wrong")
                    setisloading(false)
                })
        }
        else {
            setisloading(true)
            httpClient.GET("get-user-pending-appointments", false, true)
                .then(resp => {
                    let data = resp.data.data
                    console.log("data are",data)
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
                    setisloading(false)
                    notify.error("something went wrong")
                })
        }
    }, [])
    useEffect(() => {
        setisloading(true)
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
                    setisloading(false)
                })
                .catch(err => {
                    notify.error("something went wrong")
                })
        }
        else {
            setisloading(true)
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
        const appointmentid = data.appointmentId
        console.log("appointment id is",appointmentid)
        setid(appointmentid)
        setShowModal(true)
    }
    const handlecancel = () => {
        setShowModal(false)
        setshowPrescriptionModal(false)
    }
    const fademodel=()=>{
        console.log("fade model triggered")
        setshowPrescriptionModal(false)
    }
    const deleteindeed = () => {
        console.log("inside delete")
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
    const handleAddAppointment=()=>{
        props.props.push("/dashboard/bookappointment")
    }
    const proceedprescription=(e,rowdata)=>{
        
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
                                onClick: (e, rowData) => { proceedprescription(e, rowData)}
                            }]
                            : null}
                    ></MaterialTable>
            }
            <Prescribe showModal={showPrescriptionModal}  handlecancel={()=>fademodel()} patient={patient}></Prescribe>
            {/* <Prescribe></Prescribe> */}
           <Showmodal showModal={showModal} handlecancel={()=>handlecancel()} deleteindeed={()=>deleteindeed()}></Showmodal>
        </>
    )
}