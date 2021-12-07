import { httpClient } from "../../../../utils/httpClient"
import { useEffect } from "react"
import { useState } from "react"
import { notify } from "./../../../../services/notify"
import PropagateLoader from "react-spinners/PropagateLoader"
import "./upcomingappointment.component.css"
import { formatDate } from "../../../../services/timeanddate"
import MaterialTable from 'material-table'
export const Upcomingappointment = () => {
    const [pendingData, setpendingData] = useState([])
    const [isLoading, setisLoading] = useState(false)
    let [color, setColor] = useState("blue");
    useEffect(() => {
        setisLoading(true)
        httpClient.GET("get-user-pending-appointments", false, true)
            .then(resp => {
               let data=resp.data.data
                data=data.map((item,index)=>{
                    item.appointmentDate=formatDate(item.appointmentDate.slice(0,10))
                    item.appointmentTime=item.appointmentTime.slice(0,5)
                    return item
                })
                console.log(data)
                setpendingData(resp.data.data)
            })
            .catch(err => {
                notify.error("something went wrong")
            })
            .finally(() => {
                setisLoading(false)
            })
    }, [])
    const columns = [{
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

    ]
   const handleDeactivateDoctor=()=>{

    }
    const handleAddDoctor=()=>{

    }
    const handleEditDoctor=()=>{

    }
    return (
        <>

            <MaterialTable
                title="Upcoming appointments"
                columns={columns}
                data={pendingData}
                options={{
                    paging:true,
                    exportButton:true,
                    searchFieldAlignment:"left",
                    pageSizeOptions:[5,10,20,25,50],
                    pageSize:2,
                    showFirstLastPageButtons:false,
                    paginationType:"stepped",
                    paginationPosition:"bottom",
                    exportAllData:true,
                 

                }}
                // editable={{
                //     onRowUpdate:(newrow,oldrow)=>new Promise((resolve,reject)=>{
                //         history.push
                //     }),
                //     onRowDelete:(selectedrow)=>new Promise((resolve,reject)=>{
                //         console.log(selectedrow)
                //         httpClient.
                //         resolve()
                //     })
                    
                // }}
                // actions={[
                //     {
                //         icon: <i className="fa fas-user"></i>,
                //         tooltip: 'Change Status',
                //         onClick: (e, rowData) => { handleDeactivateDoctor(e, rowData) }
                //     },
                //     {
                //         icon:<i className="fa fas-user"></i>,
                //         tooltip: 'Add Doctor',
                //         isFreeAction: true,
                //         onClick: () => { handleAddDoctor() }
                //     },
                //     {
                //         icon: <i className="fa fas-user"></i>,
                //         tooltip: 'Edit Service',
                //         onClick: (e, rowData) => { handleEditDoctor(e, rowData) }
                //     },
                // ]}
            ></MaterialTable>

            {/* <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="display expandable-table book-table" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th className="head_styling">Assigned Doctor</th>
                                    <th>Date Of Appointment</th>
                                    <th>Time Of Appointment</th>
                                    <th>Service</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {

                                    pendingData.map((item, index) => {
                                        return <tr key={index}>
                                            <td className="pl-2 table-img"><img src="/images/dashboard/user1.jpg" alt="" className="user-img-circle" /><span className="text-muted">{item.doctorsName}</span></td>
                                            <td className="text-muted">
                                                {formatDate(item.appointmentDate.slice(0,10))}
                                                </td> 
                                            <td className="text-muted">{item.appointmentTime.slice(0,5)}</td>
                                            <td className="text-muted">
                                                <div className=" badge badge-outline-success">
                                                    {item.serviceName}
                                                </div>
                                            </td>
                                            <td className="action-img text-muted d-flex">
                                                <i className="fas fa-edit" style={{ fontSize: "22px", fontWidth: "600", color: "green", cursor: "pointer", marginTop: "2px", marginRight: "10px" }} title="edit"></i>
                                                <i className="fas fa-trash-alt" style={{ fontSize: "25px", fontWidth: "600", color: "red", cursor: "pointer" }} title="delete"></i>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        {
                            isLoading ?
                                <div className="proploader">
                                    Loading...
                                    <PropagateLoader color={color}></PropagateLoader>
                                </div>
                                : null
                        }

                    </div>
                </div>
            </div> */}
        </>
    )
}