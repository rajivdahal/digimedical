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
import DoctorAtHome from "../DoctorAtHome/DoctorAtHome";
import HomeLabtest from "../home/Labtest/labtest";
import Hospitalbooking from "../home/Hospital Booking/hospital.booking.component";
import Hospital_doctors from "../home/Hospital Booking/viewdoctor.component";

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
          path="/doctor-at-home"
          component={DoctorAtHome}
        ></PublicRoute>
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
          path="/dashboard/add-payments"
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
        {/* <ProtectedRoute
          exact
          path="/dashboard/medical-reports"
          component={Dashboard}
        ></ProtectedRoute> */}
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
          path="/dashboard/hospital-doctor"
          component={Dashboard}
        ></ProtectedRoute>
        {/* TO DO */}
        <ProtectedRoute
          exact="/dashboard/settings/change-password"
          component={Dashboard}
        ></ProtectedRoute>
        {/* <ProtectedRoute exact path="/dashboard/userprofile" component={Dashboard}></ProtectedRoute> */}

        {/* admin route */}
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
          path="/dashboard/create-services"
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
          path="/dashboard/role"
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/add-institute"
          component={Dashboard}
        >
        </ProtectedRoute>
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

        <PublicRoute path="/" component={Pagenotfound}></PublicRoute>
      </Switch>
    </BrowserRouter>
  );
};
