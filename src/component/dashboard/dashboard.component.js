import { Redirect } from "react-router"
import AdminDashboard from "./adminDashboard/adminDashboard.component"
import { Dashboardnavbar } from "./Navbar/Dashboardnavbar.component"
import Userdashboard from "./userdashboard/userDashboard.component"
import Usersidebar from "./usersidebar/usersidebar.component"
import ProtectedRoute from "./../routing/Protectedroute.component";
import { Viewappointment } from "./viewappointment/Viewappointment.component"
import Internalappointmentbook from "./userdashboard/internalappointmentbook/Internalappointmentbook.component"
import Nav from "./adminDashboard/navbarandsidebar/nav.component"
import Adminsidebar from "./adminDashboard/navbarandsidebar/sidebar.component"
import DoctorTable from "./adminDashboard/doctorData/doctor.table"
import Createdoctor from "./adminDashboard/doctorData/doctor.component"
import Createservices from "./adminDashboard/servicesData/services.component"


const Dashboard = (props) => {
  const statusCode = localStorage.getItem("status")
  console.log("props in dashboard is", props)
  return (
    <>
      {
        statusCode == 200 ?
          <>
            <Dashboardnavbar props={props.history}></Dashboardnavbar>
            <Usersidebar props={props.history}></Usersidebar>
            {
              props.match.path === "/dashboard" ?
                <ProtectedRoute component={Userdashboard}></ProtectedRoute>
                : props.match.path === "/dashboard/viewappointment" ?
                  <ProtectedRoute component={Viewappointment}></ProtectedRoute>
                  : props.match.path === "/dashboard/bookappointment" ?
                    <ProtectedRoute component={Internalappointmentbook}></ProtectedRoute>
                    : null
            }
          </>
          : statusCode == 100 ?
            <>
              <Nav props={props.history}></Nav>
              <Adminsidebar props={props.history}></Adminsidebar>
              {
                props.match.path == "/dashboard" ?
                  <ProtectedRoute component={AdminDashboard}></ProtectedRoute>
                  :
                  props.match.path==="/dashboard/doctor-table"?
                  <ProtectedRoute component={DoctorTable}></ProtectedRoute>
                  :props.match.path==="/dashboard/create-doctor"?
                  <ProtectedRoute component={Createdoctor}></ProtectedRoute>
                  :props.match.path==="/dashboard/create-services"?
                  <ProtectedRoute component={Createservices}></ProtectedRoute>
                  :null

              }
            </>
            : <Redirect to="/login" timeoutMsg="Please login again"></Redirect>
      }
    </>
  )
}
export default Dashboard
