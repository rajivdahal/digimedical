import PropagateLoader from "react-spinners/PropagateLoader"
import { notify } from "../../../../services/notify"
import { httpClient } from "../../../../utils/httpClient"
import { useState } from "react"
import { useEffect } from "react"
export const Cancelledappointment = () => {
    const [cancelledData, setcancelledData] = useState([])
    const [isLoading, setisLoading] = useState(false)
    let [color, setColor] = useState("blue");
    useEffect(() => {
        setisLoading(true)
        httpClient.GET("get-user-canceled-appointments", false, true)
            .then(resp => {
                setcancelledData(resp.data.data)
            })
            .catch(err => {
                notify.error("something went wrong")
            })
            .finally(() => {
                setisLoading(false)
            })
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="display expandable-table book-table" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th className="head_styling">Assigned Doctor</th>
                                    <th>Date Of Appointment</th>
                                    <th>Diseases</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cancelledData.length ?
                                    cancelledData.map((item, index) => {
                                        return <tr key={index}>
                                            <td className="pl-2 table-img"><img src="/images/dashboard/user1.jpg" alt="" className="user-img-circle" /><span className="text-muted">{item.doctorsName}</span></td>
                                            <td className="text-muted">{item.appointmentDate}</td>
                                            <td className="text-muted">{item.appointmentTime}</td>
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
                                    : <tr>
                                        <td>no data found</td>
                                    </tr>
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
            </div>
        </>
    )
}