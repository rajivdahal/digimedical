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
import { Dashboardpagenotfound } from "./dashboardpagenotfound/dashboardpagenotfound.component"
import Doctornavbar from "./doctordashboard/navbarandsidebar/doctornavbar.component"
import Doctorsidebar from "./doctordashboard/navbarandsidebar/doctorsidebar.component"
import { Doctordashboard } from "./doctordashboard/doctordashboard/doctordashboard.component"
import Viewdoctorappointment from "./doctordashboard/viewappointment/viewappointment.component"

import Appointment from "./adminDashboard/appointmentPage/appointment.component"
import { Changepassword } from "../common/forgotpassword/changepassword/changepassword.component"
import Prescribe from "./doctordashboard/prescribe/prescribe.component"
import Labtest from "./adminDashboard/labtestData/labtest.component"
import LabtestSubcategory from "./adminDashboard/labtestData/labtest.subcategory"
import UserProfile from "./userdashboard/settings/profileupdate.component"
import LabTestDetail from "./adminDashboard/allLabtestData/labtest.list"
import { Userlabtest } from "./userdashboard/labtest/userlabtest.component"


const Dashboard = (props) => {
  const statusCode = localStorage.getItem("status")
  console.log("props in dashboard is", props)
  return (
    <>
      {
        statusCode == 200 && props.location.fromexternaluser ?
          <Changepassword></Changepassword>
          : statusCode == 200 ?
            <>
              <Dashboardnavbar props={props.history}></Dashboardnavbar>
              <Usersidebar props={props.history}></Usersidebar>
              {
                props.location.pathname === "/dashboard" || props.location.pathname === "/dashboard/" ?
                  <ProtectedRoute component={Userdashboard}></ProtectedRoute>
                  : props.location.pathname === "/dashboard/viewappointment" ?
                    <ProtectedRoute component={Viewappointment}></ProtectedRoute>
                    : props.location.pathname === "/dashboard/bookappointment" ?
                      <ProtectedRoute component={Internalappointmentbook}></ProtectedRoute>
                      : props.location.pathname === "/dashboard/settings/userprofile" ?
                        <ProtectedRoute component={UserProfile} />
                        : props.location.pathname === "/dashboard/bookappointment" ?
                          <ProtectedRoute component={Internalappointmentbook}></ProtectedRoute> :
                          props.location.pathname === "/dashboard/settings/change-password" ?
                            <ProtectedRoute component={Changepassword}></ProtectedRoute>
                            :
                            props.location.pathname === "/dashboard/lab-test" ?
                              <ProtectedRoute component={Userlabtest}></ProtectedRoute>
                              : <ProtectedRoute component={Dashboardpagenotfound}></ProtectedRoute>
              }
            </> :
            statusCode == 100 ?
              <>
                <Nav props={props.history}></Nav>
                <Adminsidebar props={props.history}></Adminsidebar>
                <div className="container-fluid page-body-wrapper">
                  <div className="main-panel">
                    <div className="content-wrapper">
                      {
                        props.location.pathname === "/dashboard" || props.location.pathname === "/dashboard/" ?
                          <ProtectedRoute component={AdminDashboard}></ProtectedRoute>
                          :
                          props.location.pathname === "/dashboard/doctor-table" ?
                            <ProtectedRoute component={DoctorTable}></ProtectedRoute>
                            : props.location.pathname === "/dashboard/create-doctor" ?
                              <ProtectedRoute component={Createdoctor}></ProtectedRoute>
                              : props.location.pathname === "/dashboard/create-services" ?
                                <ProtectedRoute component={Createservices}></ProtectedRoute>
                                : props.location.pathname === "/dashboard/appointment" ?
                                  <ProtectedRoute component={Appointment} />
                                  :
                                  props.location.pathname === "/dashboard/lab-test" ?
                                    <ProtectedRoute component={Labtest} />
                                    : props.location.pathname === "/dashboard/labtest" ?
                                      <ProtectedRoute component={LabTestDetail} />
                                      : props.location.pathname === "/dashboard/settings/change-password" ?
                                        <ProtectedRoute component={Changepassword}></ProtectedRoute>
                                        : props.location.pathname === "/dashboard/labtest-subcategory" ?
                                        <ProtectedRoute component={LabtestSubcategory}/>
                                        : <ProtectedRoute component={Dashboardpagenotfound}></ProtectedRoute>
                      }
                    </div>
                  </div>
                </div>
              </> :
              statusCode == 300 ?
                <>
                  <Doctornavbar props={props.history}></Doctornavbar>
                  <Doctorsidebar props={props.history}></Doctorsidebar>
                  {
                    props.location.pathname == "/dashboard/" || props.location.pathname == "/dashboard" ?
                      <ProtectedRoute component={Doctordashboard} props={props}></ProtectedRoute>
                      :
                      props.location.pathname === "/dashboard/viewappointment" ?
                        <ProtectedRoute component={Viewdoctorappointment} props={props}></ProtectedRoute> :
                        props.location.pathname === "/dashboard/prescribe/:id" ?
                          <ProtectedRoute component={Prescribe} props={props}></ProtectedRoute>
                          :
                          props.location.pathname === "/dashboard/settings/change-password" ?
                            <ProtectedRoute component={Changepassword}></ProtectedRoute> :
                            props.location.pathname === "/dashboard/settings/change-password" ?
                              <ProtectedRoute component={Changepassword}></ProtectedRoute>
                              : props.location.pathname === "/dashboard/settings/userprofile" ?
                                <ProtectedRoute component={UserProfile} />
                                : <ProtectedRoute component={Dashboardpagenotfound}></ProtectedRoute>
                  }
                </>
                :
                <Redirect to="/login" timeoutMsg="Please login again"></Redirect>
      }
    </>
  )
}
export default Dashboard
