import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../register/Register.component";
import Dashboard from "../dashboard/dashboard.component";
import { Forgotpassword } from "../forgotpassword/forgotpassword.component";
import { Home } from "../home/home.component";
import { Login } from "../login/login.component";
import { Pagenotfound } from "../pagenotfound/Pagenotfound.component";
import ProtectedRoute from "./Protectedroute.component";
import { PublicRoute } from "./publicroute";

export const Approuting = (props) => {

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/login" component={Login}></PublicRoute>
        <PublicRoute exact path="/" component={Home}></PublicRoute>
        <PublicRoute exact path="/register" component={Register}></PublicRoute>
        <PublicRoute exact path="/forgot-password" component={Forgotpassword}></PublicRoute>
        <ProtectedRoute exact path="/dashboard" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/viewappointment" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/bookappointment" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/doctor-table" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/create-doctor" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/create-services" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/doctors" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/all-payments" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/add-payments" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/invoice" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/lab-reports" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/medical-reports" component={Dashboard}></ProtectedRoute>

        <ProtectedRoute exact path="/dashboard/all-patients" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/appointment" component={Dashboard}></ProtectedRoute>

         <ProtectedRoute exact path="/dashboard/doctor-create" component={Dashboard}></ProtectedRoute>
        <PublicRoute path="/" component={Pagenotfound}></PublicRoute>
      </Switch>
    </BrowserRouter>
  );
};
