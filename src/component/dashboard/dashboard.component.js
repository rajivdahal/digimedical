import { Redirect } from "react-router";

// home
import { Dashboardnavbar } from "./Navbar/Dashboardnavbar.component";
import ProtectedRoute from "./../routing/Protectedroute.component";
import { Viewappointment } from "./viewappointment/Viewappointment.component";
import { Dashboardpagenotfound } from "./dashboardpagenotfound/dashboardpagenotfound.component";
import { Changepassword } from "../common/forgotpassword/changepassword/changepassword.component";
import Hospitalbookingcomponent from "../home/Hospital Booking/hospitalbooking.component";
import Hospital_doctors from "../home/Hospital Booking/viewdoctor.component";

// admin
import AdminDashboard from "./adminDashboard/adminDashboard.component";
import Nav from "./adminDashboard/navbarandsidebar/nav.component";
import Adminsidebar from "./adminDashboard/navbarandsidebar/sidebar.component";
import DoctorTable from "./adminDashboard/doctorData/doctor.table";
import Createdoctor from "./adminDashboard/doctorData/doctor.component";
import Createservices from "./adminDashboard/servicesData/services.component";
import Appointment from "./adminDashboard/appointmentPage/appointment.component";
import Labtest from "./adminDashboard/labtestData/labtest.component";
import LabtestSubcategory from "./adminDashboard/labtestData/labtest.subcategory";
import BookedLabtest from "./adminDashboard/allLabtestData/booked.labtest";
import MedicalInstitute from "./adminDashboard/medicalInstitue/institute.component";
import Hospital from "./adminDashboard/hospitalData/hospital.component";
import HospitalTable from "./adminDashboard/hospitalData/hospital.table";
import CorporatePage from "./adminDashboard/corporateData/corporate.component";
import Role from "./adminDashboard/userManagement/role.component";
import CreateAdmin from "./adminDashboard/userManagement/admin.component";
import LabTestDetail from "./adminDashboard/allLabtestData/labtest.list";
import Permission from "./adminDashboard/userManagement/permission.component";
import MembershipPackage from "./adminDashboard/packageData/membership.package";
import MembershipPackageDetails from "./adminDashboard/packageData/package.details";
import LabtestReport from "./adminDashboard/allLabtestData/labtest.report";
import BodyCheckup from "./adminDashboard/bodyCheckup/bodyCheckup";
import CorporateTypes from "./adminDashboard/corporateData/corporate.type";
import PackageDescription from "./adminDashboard/packageData/package.desc";
import NewServicePage from "./adminDashboard/newServiceData/newServicePage";

// hospital
import Hospitalnavbar from "./hospitaldashboard/hospitalnavbar/hospitalnavbar.component";
import Hospitalsidebar from "./hospitaldashboard/hospitalsidebar/hospitalsidebar.component";
import HospitalDashboard from "./hospitaldashboard/hospitalDashboard";
import HospitalDoctor from "./hospitaldashboard/doctorPage/hospital.doctor";
import AddDoctor from "./hospitaldashboard/doctorPage/addHospitalDoctor";
// import HospitalAppointment from "./hospitaldashboard/appointmentPage/"
import HospitalAppointment from "./hospitaldashboard/appointmentPage/appointment.component";
import HospitalService from "./hospitaldashboard/hospitalService/hospitalService";
import HospitalSpecialist from "../home/Hospital Booking/hospitalSpecialist";
// import HospitalService from "./hospitaldashboard/hospitalService/hospitalService";

// corporate
import Corporatenavbar from "./corporatedashboard/corporatenavbar/corporatenavbar.component";
import Corporatesidebar from "./corporatedashboard/corporatesidebar/corporatesidebar.component";
import { Corporatedashboard } from "./corporatedashboard/corporatedashboard/corporatedashboard.component";
import Corporateaddmember from "./corporatedashboard/addmembers/corporateaddmembers.component";
import Viewcorporateappointment from "./corporatedashboard/corporateappointments/corporateviewappointment/corporateviewappointment.component";
import CorporateUser from "./corporatedashboard/addmembers/corporate.user";
import BookPackage from "./corporatedashboard/packages/package.component";

// user
import Userdashboard from "./userdashboard/userDashboard.component";
import Usersidebar from "./usersidebar/usersidebar.component";
import Internalappointmentbook from "./userdashboard/internalappointmentbook/Internalappointmentbook.component";
import UserProfile from "./userdashboard/settings/profileupdate.component";
import { Userlabtest } from "./userdashboard/labtest/userlabtest.component";
import Viewlabtest from "./userdashboard/viewlabtest/viewlabtest.component";
import AddFamilyMember from "./userdashboard/familyMember/addFamilyMember.component";
import { MedicalReports } from "./userdashboard/medicalReports/medicalReports.component";
import DigimedicalDoctor from "./userdashboard/digimedicalDoctor/digiMedicalDoctor";
import UtilsInfo from "./userdashboard/utilsinformation/utilsInfo.component";
// import BodyCheckUpUser  from "./userdashboard/bodyCheckup/bodyCheckUp.component";
import BodyCheckUpUser from "./userdashboard/bodyCheckup/bodyCheckUp.component";

// doctor
import Doctornavbar from "./doctordashboard/navbarandsidebar/doctornavbar.component";
import Doctorsidebar from "./doctordashboard/navbarandsidebar/doctorsidebar.component";
import { Doctordashboard } from "./doctordashboard/doctordashboard/doctordashboard.component";
import Viewdoctorappointment from "./doctordashboard/viewappointment/viewappointment.component";
import Prescribe from "./doctordashboard/prescribe/prescribe.component";
import DoctorProfile from "./doctordashboard/profileUpdate/profile.component";
import Service from "../Service/Service";
import UserServices from "./userdashboard/services/services.component";
import SpecialityDoctor from "./userdashboard/digimedicalDoctor/specialityDoctor";

// hospital
// import HospitalService from "./hospitaldashboard/hospitalService/hospitalService";
// corporate
import ViewServicesBookedOfUser from "./adminDashboard/services/services.component";
import { PaymentMaster } from "./adminDashboard/paymentMaster/paymentMaster";
import SuccessResponse from "../common/popup/doctorPopup/selectPaymentMethod/successResponse/successResponse";
import FamilyPackage from "./userdashboard/familyPackage/familyPackage.component";

const Dashboard = (props) => {
  const statusCode = localStorage.getItem("status");

  return (
    <>
      {statusCode == 200 && props.location.fromexternaluser ? (
        <Changepassword></Changepassword>
      ) : statusCode == 200 ? (
        <>
          <Dashboardnavbar props={props.history}></Dashboardnavbar>

          <Usersidebar></Usersidebar>

          {props.location.pathname === "/dashboard" ||
          props.location.pathname === "/dashboard/" ? (
            <ProtectedRoute component={Userdashboard}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/viewappointment" ? (
            <ProtectedRoute component={Viewappointment}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/bookappointment" ? (
            <ProtectedRoute
              component={Internalappointmentbook}
            ></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/settings/userprofile" ? (
            <ProtectedRoute component={UserProfile} />
          ) : props.location.pathname === "/dashboard/bookappointment" ? (
            <ProtectedRoute
              component={Internalappointmentbook}
            ></ProtectedRoute>
          ) : props.location.pathname ===
            "/dashboard/settings/change-password" ? (
            <ProtectedRoute component={Changepassword}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/lab-test" ? (
            <ProtectedRoute component={Userlabtest}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/view-lab-test" ? (
            <ProtectedRoute component={Viewlabtest}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/hospitals" ? (
            <ProtectedRoute
              component={Hospitalbookingcomponent}
            ></ProtectedRoute>
          ) : props.location.pathname ===
            "/dashboard/hospitals/view-doctors" ? (
            <ProtectedRoute component={Hospital_doctors}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/add-member" ? (
            <ProtectedRoute component={AddFamilyMember}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/medical-reports" ? (
            <ProtectedRoute component={MedicalReports}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/body-checkup" ? (
            <ProtectedRoute component={BodyCheckUpUser}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/digi-doctor" ? (
            <ProtectedRoute component={DigimedicalDoctor}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/utils-info" ? (
            <ProtectedRoute component={UtilsInfo}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/speciality-doctors" ? (
            <ProtectedRoute component={SpecialityDoctor}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/services" ? (
<<<<<<< HEAD
            <ProtectedRoute component={UserServices}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/hospital-specialist" ? (
            <ProtectedRoute component={HospitalSpecialist}></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/payment-response" ? (
            <ProtectedRoute component={SuccessResponse}></ProtectedRoute>
          ) : null}
=======
              <ProtectedRoute component={UserServices}></ProtectedRoute>
          ) : props.location.pathname ===
          "/dashboard/hospital-specialist" ? (
          <ProtectedRoute component={HospitalSpecialist}></ProtectedRoute>
        ) :
        props.location.pathname ===
        "/dashboard/family-package" ? (
        <ProtectedRoute component={FamilyPackage}></ProtectedRoute>
      ):
          null}
>>>>>>> 5cb4b124b652e1e19f116a8ec93ad73e48e2a619
        </>
      ) : statusCode == 100 ? (
        <>
          <Nav props={props.history}></Nav>
          <Adminsidebar props={props.history}></Adminsidebar>
          <div className="content-wrapper adjust-height-width custom-content-wrapper ">
            {/* <div className="container-fluid ">
                  <div className="main-panel">
                    <div className="content-wrapper"> */}
            {props.location.pathname === "/dashboard" ||
            props.location.pathname === "/dashboard/" ? (
              <ProtectedRoute component={AdminDashboard}></ProtectedRoute>
            ) : props.location.pathname === "/dashboard/services" ? (
              <ProtectedRoute
                component={ViewServicesBookedOfUser}
              ></ProtectedRoute>
            ) : props.location.pathname === "/dashboard/doctor-table" ? (
              <ProtectedRoute component={DoctorTable}></ProtectedRoute>
            ) : props.location.pathname === "/dashboard/create-doctor" ? (
              <ProtectedRoute component={Createdoctor}></ProtectedRoute>
            ) : props.location.pathname === "/dashboard/create-speciality" ? (
              <ProtectedRoute component={Createservices}></ProtectedRoute>
            ) : props.location.pathname === "/dashboard/create-services" ? (
              <ProtectedRoute component={NewServicePage}></ProtectedRoute>
            ) : props.location.pathname === "/dashboard/appointment" ? (
              <ProtectedRoute component={Appointment} />
            ) : props.location.pathname === "/dashboard/lab-test" ? (
              <ProtectedRoute component={Labtest} />
            ) : props.location.pathname === "/dashboard/labtest" ? (
              <ProtectedRoute component={LabTestDetail} />
            ) : props.location.pathname ===
              "/dashboard/settings/change-password" ? (
              <ProtectedRoute component={Changepassword}></ProtectedRoute>
            ) : props.location.pathname === "/dashboard/labtest-subcategory" ? (
              <ProtectedRoute component={LabtestSubcategory} />
            ) : props.location.pathname === "/dashboard/admin" ? (
              <ProtectedRoute component={CreateAdmin} />
            ) : props.location.pathname === "/dashboard/role" ? (
              <ProtectedRoute component={Role} />
            ) : props.location.pathname === "/dashboard/booked-labtest" ? (
              <ProtectedRoute component={BookedLabtest} />
            ) : props.location.pathname === "/dashboard/add-institute" ? (
              <ProtectedRoute component={MedicalInstitute} />
            ) : props.location.pathname === "/dashboard/hospital-table" ? (
              <ProtectedRoute component={HospitalTable} />
            ) : props.location.pathname === "/dashboard/add-hospital" ? (
              <ProtectedRoute component={Hospital} />
            ) : props.location.pathname === "/dashboard/corporate" ? (
              <ProtectedRoute component={CorporatePage} />
            ) : props.location.pathname === "/dashboard/permission" ? (
              <ProtectedRoute component={Permission} />
            ) : props.location.pathname === "/dashboard/membership-package" ? (
              <ProtectedRoute component={MembershipPackage} />
            ) : props.location.pathname === "/dashboard/package-details" ? (
              <ProtectedRoute component={MembershipPackageDetails} />
            ) : props.location.pathname === "/dashboard/package-description" ? (
              <ProtectedRoute component={PackageDescription} />
            ) : props.location.pathname === "/dashboard/labtest-report" ? (
              <ProtectedRoute component={LabtestReport} />
            ) : props.location.pathname === "/dashboard/body-checkup" ? (
              <ProtectedRoute component={BodyCheckup} />
            ) : props.location.pathname == "/dashboard/add/corporate-types" ? (
              <ProtectedRoute
                component={CorporateTypes}
                props={props}
              ></ProtectedRoute>
            ) : props.location.pathname === "/dashboard/payment-master" ? (
              <ProtectedRoute component={PaymentMaster} />
            ) : (
              <ProtectedRoute
                component={Dashboardpagenotfound}
              ></ProtectedRoute>
            )}
            {/* </div>
                  </div>
                  </div> */}
          </div>
        </>
      ) : statusCode == 300 ? (
        <>
          <Doctornavbar props={props.history}></Doctornavbar>
          <Doctorsidebar props={props.history}></Doctorsidebar>
          {props.location.pathname == "/dashboard/" ||
          props.location.pathname == "/dashboard" ? (
            <ProtectedRoute
              component={Doctordashboard}
              props={props}
            ></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/viewappointment" ? (
            <ProtectedRoute
              component={Viewdoctorappointment}
              props={props}
            ></ProtectedRoute>
          ) : props.location.pathname === "/dashboard/prescribe/:id" ? (
            <ProtectedRoute
              component={Prescribe}
              props={props}
            ></ProtectedRoute>
          ) : props.location.pathname ===
            "/dashboard/settings/change-password" ? (
            <ProtectedRoute component={Changepassword}></ProtectedRoute>
          ) : props.location.pathname ===
            "/dashboard/settings/doctor-profile" ? (
            <ProtectedRoute component={DoctorProfile} />
          ) : (
            <ProtectedRoute component={Dashboardpagenotfound}></ProtectedRoute>
          )}
        </>
      ) : statusCode == 400 ? (
        <>
          <Hospitalnavbar></Hospitalnavbar>
          <Hospitalsidebar></Hospitalsidebar>
          <div className="container-fluid page-body-wrapper">
            <div className="main-panel">
              <div className="content-wrapper">
                {props.location.pathname === "/dashboard" ||
                props.location.pathname === "/dashboard/" ? (
                  <ProtectedRoute
                    component={HospitalDashboard}
                  ></ProtectedRoute>
                ) : props.location.pathname === "/dashboard/hospital-doctor" ? (
                  <ProtectedRoute component={HospitalDoctor}></ProtectedRoute>
                ) : props.location.pathname === "/dashboard/add-doctor" ? (
                  <ProtectedRoute component={AddDoctor}></ProtectedRoute>
                ) : props.location.pathname ===
                  "/dashboard/hospital-appointment" ? (
                  <ProtectedRoute
                    component={HospitalAppointment}
                  ></ProtectedRoute>
                ) : props.location.pathname ===
                  "/dashboard/hospital-service" ? (
                  <ProtectedRoute component={HospitalService}></ProtectedRoute>
                ) : props.location.pathname ===
                  "/dashboard/settings/change-password" ? (
                  <ProtectedRoute component={Changepassword}></ProtectedRoute>
                ) : (
                  <ProtectedRoute
                    component={Dashboardpagenotfound}
                  ></ProtectedRoute>
                )}
              </div>
            </div>
          </div>
        </>
      ) : statusCode == 500 ? (
        <>
          <Corporatenavbar></Corporatenavbar>
          <Corporatesidebar></Corporatesidebar>
          {props.location.pathname == "/dashboard/" ||
          props.location.pathname == "/dashboard" ? (
            <ProtectedRoute
              component={Corporatedashboard}
              props={props}
            ></ProtectedRoute>
          ) : props.location.pathname == "/dashboard/corporate/add-members" ? (
            <ProtectedRoute
              component={Corporateaddmember}
              props={props}
            ></ProtectedRoute>
          ) : props.location.pathname == "/dashboard/corporate/add-users" ? (
            <ProtectedRoute
              component={CorporateUser}
              props={props}
            ></ProtectedRoute>
          ) : props.location.pathname ==
            "/dashboard/corporate/viewappointment" ? (
            <ProtectedRoute
              component={Viewcorporateappointment}
              props={props}
            ></ProtectedRoute>
          ) : props.location.pathname ==
            "/dashboard/corporate/bookappointment" ? (
            <ProtectedRoute
              component={Internalappointmentbook}
              props={props}
              fromcorporateappointment={true}
            ></ProtectedRoute>
          ) : props.location.pathname ==
            "/dashboard/corporate/book-packages" ? (
            <ProtectedRoute component={BookPackage} props={props} />
          ) : props.location.pathname ===
            "/dashboard/settings/change-password" ? (
            <ProtectedRoute component={Changepassword} />
          ) : (
            <ProtectedRoute component={Dashboardpagenotfound}></ProtectedRoute>
          )}
        </>
      ) : (
        <Redirect to="/login" timeoutMsg="Please login again"></Redirect>
      )}
    </>
  );
};
export default Dashboard;
