
import { Dashboardnavbar } from "../Navbar/Dashboardnavbar.component"
import { Link } from "react-router-dom"
import "./Bookappointment.component.css"
import Internalappointmentbook from "../userdashboard/internalappointmentbook/Internalappointmentbook.component"
import Usersidebar from "../usersidebar/usersidebar.component"
export const Bookappointment = (props) => {
    return (
        <>
            <Dashboardnavbar props={props.history}></Dashboardnavbar>
            <Internalappointmentbook props={props.history}></Internalappointmentbook>
        </>
    )
}