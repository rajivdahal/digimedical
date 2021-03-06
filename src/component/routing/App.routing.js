import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../register/Register.component";
import Dashboard from "../dashboard/dashboard.component";
import { Forgotpassword } from "../common/forgotpassword/forgotpassword.component";
import { Home } from "../home/home.component";
import { Login } from "../login/login.component";
import { Pagenotfound } from "../pagenotfound/Pagenotfound.component";
import ProtectedRoute from "./Protectedroute.component";
import { PublicRoute } from "./publicroute";
import { Verifypassword } from "../common/forgotpassword/verifypassword.component";
import { Changepassword } from "../common/forgotpassword/changepassword/changepassword.component";
import AboutPage from "../AboutPage/AboutPage";
import Service from "../Service/Service";
import ContactUs from "../Contact/ContactUs";
import HomeLabtest from "../home/Labtest/labtest";
import Hospitalbooking from "../home/Hospital Booking/hospital.booking.component";
import Hospital_doctors from "../home/Hospital Booking/viewdoctor.component";
import OurServices from "../home/Our Services/ourServicesContent";
import Digi_doctors from "../home/Digimedical doctors/Digimedical_doctors";
import Newdash from "../common/dashboard/Newdash.js";
import FamilyPackage from "../home/For Family/Family_Care_Package/Family_care_p";
import CorporatePackage from "../home/forCorporate/corporatePackagePage";
import DigimedicalDoctor from "../dashboard/userdashboard/digimedicalDoctor/digiMedicalDoctor";
import ForBusiness from "../home/For Business/forbusiness";
import Digimedical_doctors from "../home/Digimedical doctors/Digimedical_doctors";
import AllSpecialist from "../home/Digimedical doctors/allSpecialist";
import Services from "../dashboard/adminDashboard/services/services.component";
import SuccessResponse from "../common/popup/doctorPopup/selectPaymentMethod/successResponse/successResponse";
export const Approuting = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/login" component={Login}></PublicRoute>
        <PublicRoute exact path="/" component={Home}></PublicRoute>
        <PublicRoute exact path="/register" component={Register}></PublicRoute>
        <PublicRoute exact path="/about" component={AboutPage}></PublicRoute>
        <PublicRoute exact path="/services" component={Service}></PublicRoute>
        <PublicRoute exact path="/contact" component={ContactUs}></PublicRoute>
        <PublicRoute
          exact
          path="/digi-doctors"
          component={Digimedical_doctors}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/all-speciality"
          component={AllSpecialist}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/digi-doctors"
          component={Digimedical_doctors}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/all-speciality"
          component={AllSpecialist}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/success-response"
          component={SuccessResponse}
        ></PublicRoute>

        <PublicRoute
          exact
          path="/our-services/:subservice"
          component={OurServices}
        ></PublicRoute>
        <ProtectedRoute
          exact
          path="/payment-response"
          component={SuccessResponse}
        ></ProtectedRoute>
        <PublicRoute
          exact
          path="/forgot-password"
          component={Forgotpassword}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/change-password"
          component={Changepassword}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/forbusiness"
          component={ForBusiness}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/family-package"
          component={FamilyPackage}
        ></PublicRoute>

        <PublicRoute
          exact
          path="/corporate-package"
          component={CorporatePackage}
        ></PublicRoute>

        <PublicRoute
          exact
          path="/forgot-password/verify-password"
          component={Verifypassword}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/verify-password"
          component={Verifypassword}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/lab-test"
          component={HomeLabtest}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/hospitals"
          component={Hospitalbooking}
        ></PublicRoute>
        <PublicRoute
          exact
          path="/hospitals/view-doctors"
          component={Hospital_doctors}
        ></PublicRoute>

        <ProtectedRoute
          exact
          path="/dashboard/book-package"
          component={Dashboard}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/dashboard/package/add-new-member"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/booked-packages"
          component={Dashboard}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/dashboard/package-details"
          component={Dashboard}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/dashboard"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/viewappointment"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/bookappointment"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/doctors"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/hospitals"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/medical-reports"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/utils-info"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/services"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/body-checkup"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/speciality-doctors"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/edit-package-member"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/body-checkup"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/hospitals/view-doctors"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/all-payments"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/hospital-specialist"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/invoice"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/lab-reports"
          component={Dashboard}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/dashboard/view-lab-test"
          component={Dashboard}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/dashboard/view-lab-test/:id"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/add-member"
          component={Dashboard}
        ></ProtectedRoute>
        <PublicRoute
          exact
          path="/dashboard/payment-response"
          component={SuccessResponse}
        ></PublicRoute>

        <ProtectedRoute
          exact
          path="/dashboard/all-patients"
          component={Dashboard}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/dashboard/prescribe/:id"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/settings/userprofile"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/settings/doctor-profile"
          component={Dashboard}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/dashboard/hospital-doctor"
          component={Dashboard}
        ></ProtectedRoute>
        {/* TO DO */}
        <ProtectedRoute
          exact="/dashboard/settings/change-password"
          component={Dashboard}
        ></ProtectedRoute>

        <ProtectedRoute
          exact="/dashboard/digi-doctor"
          component={DigimedicalDoctor}
        ></ProtectedRoute>

        {/* adminRoutes */}
        <ProtectedRoute
          exact
          path="/dashboard/doctor-table"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/create-doctor"
          component={Dashboard}
        ></ProtectedRoute>
         <ProtectedRoute
          exact
          path="/dashboard/add/corporate-package"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/create-services"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/create-speciality"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/appointment"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/lab-test"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/booked-labtest"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/labtest-subcategory"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/admin"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/admin"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/role"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/add-institute"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/payment-master"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/hospital-table"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/add-hospital"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/corporate"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/membership"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/package-details"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/package-description"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/labtest-report"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/body-checkup"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/family-package"
          component={Dashboard}
        ></ProtectedRoute>
        {/* hospitalRoute */}
        <ProtectedRoute
          exact
          path="/dashboard/add-doctor"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/hospital-doctor"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/hospital-appointment"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/hospital-service"
          component={Dashboard}
        ></ProtectedRoute>

        {/* CorporateRoutes */}
        <ProtectedRoute
          exact
          path="/dashboard/corporate/add-users"
          component={Dashboard}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/dashboard/add/corporate-types"
          component={Dashboard}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="dashboard/corporate/book-packages"
          component={Dashboard}
        ></ProtectedRoute>
        <PublicRoute path="/" component={Pagenotfound}></PublicRoute>
      </Switch>
    </BrowserRouter>
  );
};
