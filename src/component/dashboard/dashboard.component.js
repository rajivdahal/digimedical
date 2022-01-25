import { Redirect } from "react-router";
import AdminDashboard from "./adminDashboard/adminDashboard.component";
import { Dashboardnavbar } from "./Navbar/Dashboardnavbar.component";
import Userdashboard from "./userdashboard/userDashboard.component";
import Usersidebar from "./usersidebar/usersidebar.component";
import ProtectedRoute from "./../routing/Protectedroute.component";
import { Viewappointment } from "./viewappointment/Viewappointment.component";
import Internalappointmentbook from "./userdashboard/internalappointmentbook/Internalappointmentbook.component";
import Nav from "./adminDashboard/navbarandsidebar/nav.component";
import Adminsidebar from "./adminDashboard/navbarandsidebar/sidebar.component";
import DoctorTable from "./adminDashboard/doctorData/doctor.table";
import Createdoctor from "./adminDashboard/doctorData/doctor.component";
import Createservices from "./adminDashboard/servicesData/services.component";
import { Dashboardpagenotfound } from "./dashboardpagenotfound/dashboardpagenotfound.component";
import Doctornavbar from "./doctordashboard/navbarandsidebar/doctornavbar.component";
import Doctorsidebar from "./doctordashboard/navbarandsidebar/doctorsidebar.component";
import { Doctordashboard } from "./doctordashboard/doctordashboard/doctordashboard.component";
import Viewdoctorappointment from "./doctordashboard/viewappointment/viewappointment.component";

import Appointment from "./adminDashboard/appointmentPage/appointment.component";
import { Changepassword } from "../common/forgotpassword/changepassword/changepassword.component";
import Prescribe from "./doctordashboard/prescribe/prescribe.component";
import Labtest from "./adminDashboard/labtestData/labtest.component";
import LabtestSubcategory from "./adminDashboard/labtestData/labtest.subcategory";
import UserProfile from "./userdashboard/settings/profileupdate.component";
import LabTestDetail from "./adminDashboard/allLabtestData/labtest.list";
import { Userlabtest } from "./userdashboard/labtest/userlabtest.component";
import Viewlabtest from "./userdashboard/viewlabtest/viewlabtest.component";
import BookedLabtest from "./adminDashboard/allLabtestData/booked.labtest";
import MedicalInstitute from "./adminDashboard/medicalInstitue/institute.component";
import Hospital from "./adminDashboard/hospitalData/hospital.component";
import HospitalTable from "./adminDashboard/hospitalData/hospital.table";
import CorporatePage from "./adminDashboard/corporateData/corporate.component";
import Role from "./adminDashboard/userManagement/role.component";
import CreateAdmin from "./adminDashboard/userManagement/admin.component";

import Hospitalnavbar from "./hospitaldashboard/hospitalnavbar/hospitalnavbar.component";
import Hospitalsidebar from "./hospitaldashboard/hospitalsidebar/hospitalsidebar.component";
import Hospitalbookingcomponent from "../home/Hospital Booking/hospitalbooking.component";
import Hospital_doctors from "../home/Hospital Booking/viewdoctor.component";
import Corporatenavbar from "./corporatedashboard/corporatenavbar/corporatenavbar.component";
import Corporatesidebar from "./corporatedashboard/corporatesidebar/corporatesidebar.component";
import { Corporatedashboard } from "./corporatedashboard/corporatedashboard/corporatedashboard.component";
import Corporateaddmember from "./corporatedashboard/addmembers/corporateaddmembers.component";

import HospitalDashboard from "./hospitaldashboard/hospitalDashboard"
import HospitalDoctor from "./hospitaldashboard/doctorPage/hospital.doctor"
import AddDoctor from "./hospitaldashboard/doctorPage/addHospitalDoctor"
import Viewcorporateappointment from "./corporatedashboard/corporateappointments/corporateviewappointment/corporateviewappointment.component"
import HospitalAppointment from "./hospitaldashboard/appointmentPage/appointment.component"
import Permission from "./adminDashboard/userManagement/permission.component"
import AddFamilyMember from "./userdashboard/familyMember/addFamilyMember.component"
import MembershipPackage from "./adminDashboard/packageData/membership.package"
import MembershipPackageDetails from "./adminDashboard/packageData/package.details"
import LabtestReport from "./adminDashboard/allLabtestData/labtest.report"
import CorporateUser from "./corporatedashboard/addmembers/corporate.user"
import BodyCheckup from "./adminDashboard/bodyCheckup/bodyCheckup";
import { MedicalReports } from "./userdashboard/medicalReports/medicalReports.component";
import CorporateTypes from "./adminDashboard/corporateData/corporate.type";
import BodyCheckUp from "./userdashboard/commonupcomingappointment/bodyCheckup/bodyCheckUp.component";

const Dashboard = (props) => {
  const statusCode = localStorage.getItem("status");
  console.log("props in dashboard is", props);
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
                              :
                              props.location.pathname === "/dashboard/view-lab-test" ?
                                <ProtectedRoute component={Viewlabtest}></ProtectedRoute>
                                :
                                props.location.pathname === "/dashboard/hospitals" ?
                                  <ProtectedRoute component={Hospitalbookingcomponent}></ProtectedRoute> :
                                  props.location.pathname === "/dashboard/hospitals/view-doctors" ?
                                    <ProtectedRoute component={Hospital_doctors}></ProtectedRoute> :
                                    props.location.pathname === "/dashboard/add-member" ?
                                      <ProtectedRoute component={AddFamilyMember}></ProtectedRoute> :
                                      props.location.pathname === "/dashboard/medical-reports" ?
                                        <ProtectedRoute component={MedicalReports}></ProtectedRoute> :
                                        props.location.pathname === "/dashboard/body-checkup" ?
                                        <ProtectedRoute component={BodyCheckUp}></ProtectedRoute> :
                                        null
              }
            </> :
            statusCode == 100 ?
              <>
                <Nav props={props.history}></Nav>
                <Adminsidebar props={props.history}></Adminsidebar>
                <div className='content-wrapper adjust-height-width custom-content-wrapper '>

                  {/* <div className="container-fluid ">
                  <div className="main-panel">
                    <div className="content-wrapper"> */}
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
                                      <ProtectedRoute component={LabtestSubcategory} />
                                      : props.location.pathname === "/dashboard/admin" ?
                                        <ProtectedRoute component={CreateAdmin} />
                                        : props.location.pathname === "/dashboard/role" ?
                                          <ProtectedRoute component={Role} />
                                          : props.location.pathname === "/dashboard/booked-labtest" ?
                                            <ProtectedRoute component={BookedLabtest} />
                                            : props.location.pathname === "/dashboard/add-institute" ?
                                              <ProtectedRoute component={MedicalInstitute} />
                                              : props.location.pathname === "/dashboard/hospital-table" ?
                                                <ProtectedRoute component={HospitalTable} />
                                                : props.location.pathname === "/dashboard/add-hospital" ?
                                                  <ProtectedRoute component={Hospital} />
                                                  : props.location.pathname === "/dashboard/corporate" ?
                                                    <ProtectedRoute component={CorporatePage} />
                                                    : props.location.pathname === "/dashboard/permission" ?
                                                      <ProtectedRoute component={Permission} />
                                                      : props.location.pathname === "/dashboard/membership-package" ?
                                                        <ProtectedRoute component={MembershipPackage} />
                                                        : props.location.pathname === "/dashboard/package-details" ?
                                                          <ProtectedRoute component={MembershipPackageDetails} />
                                                          : props.location.pathname === "/dashboard/labtest-report" ?
                                                            <ProtectedRoute component={LabtestReport} />
                                                            : props.location.pathname === "/dashboard/body-checkup" ?
                                                              <ProtectedRoute component={BodyCheckup} />
                                                              : props.location.pathname == "/dashboard/add/corporate-types" ?
                                                              <ProtectedRoute component={CorporateTypes} props={props}></ProtectedRoute>

                                                              : <ProtectedRoute component={Dashboardpagenotfound}></ProtectedRoute>
                  }
                  {/* </div>
                  </div>
                  </div> */}
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
                statusCode == 400 ?
                  <>
                    <Hospitalnavbar></Hospitalnavbar>
                    <Hospitalsidebar></Hospitalsidebar>
                    <div className="container-fluid page-body-wrapper">
                      <div className="main-panel">
                        <div className="content-wrapper">
                          {
                            props.location.pathname === "/dashboard" || props.location.pathname === "/dashboard/" ?
                              <ProtectedRoute component={HospitalDashboard}></ProtectedRoute>
                              :
                              props.location.pathname === "/dashboard/hospital-doctor" ?
                                <ProtectedRoute component={HospitalDoctor}></ProtectedRoute>
                                : props.location.pathname === "/dashboard/add-doctor" ?
                                  <ProtectedRoute component={AddDoctor}></ProtectedRoute>
                                  : props.location.pathname === "/dashboard/hospital-appointment" ?
                                    <ProtectedRoute component={HospitalAppointment}></ProtectedRoute>
                                    : <ProtectedRoute component={Dashboardpagenotfound}></ProtectedRoute>
                          }
                        </div>
                      </div>
                    </div>
                  </> :
                  statusCode == 500 ?
                    <>
                      <Corporatenavbar></Corporatenavbar>
                      <Corporatesidebar></Corporatesidebar>
                      {
                        props.location.pathname == "/dashboard/" || props.location.pathname == "/dashboard" ?
                          <ProtectedRoute component={Corporatedashboard} props={props}></ProtectedRoute> :
                          props.location.pathname == "/dashboard/corporate/add-members" ?
                            <ProtectedRoute component={Corporateaddmember} props={props}></ProtectedRoute> :
                            props.location.pathname == "/dashboard/corporate/add-users" ?
                              <ProtectedRoute component={CorporateUser} props={props}></ProtectedRoute> :
                              props.location.pathname == "/dashboard/corporate/viewappointment" ?
                                <ProtectedRoute component={Viewcorporateappointment} props={props}></ProtectedRoute> :
                                props.location.pathname == "/dashboard/corporate/bookappointment" ?
                                  <ProtectedRoute component={Internalappointmentbook} props={props} fromcorporateappointment={true}></ProtectedRoute> :

                                    <ProtectedRoute component={Dashboardpagenotfound}></ProtectedRoute>
                      }
                    </> :
                    <Redirect to="/login" timeoutMsg="Please login again"></Redirect>
      }
    </>
  );
};
export default Dashboard;
