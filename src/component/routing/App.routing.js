import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../register/Register.component";
import Dashboard from "../dashboard/dashboard.component";
import { Forgotpassword } from "../forgotpassword/forgotpassword.component";
import { Home } from "../home/home.component";
import { Login } from "../login/login.component";
import { Pagenotfound } from "../pagenotfound/Pagenotfound.component";
import Services from "../servicesData/services.component";
import { Viewappointment } from "./../dashboard/viewappointment/Viewappointment.component"
import { Bookappointment } from "../dashboard/bookappointment/Bookappointment.component";
import ProtectedRoute from "./Protectedroute.component";
import { PublicRoute } from "./publicroute";

export const Approuting = (props) => {

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/login" component={Login}></PublicRoute>
        <PublicRoute exact path="/" component={Home}></PublicRoute>
        <ProtectedRoute path="/services" component={Services}></ProtectedRoute>
        <PublicRoute exact path="/register" component={Register}></PublicRoute>
        <PublicRoute exact path="/forgot-password" component={Forgotpassword}></PublicRoute>
        <ProtectedRoute exact path="/dashboard" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/viewappointment" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/bookappointment" component={Dashboard}></ProtectedRoute>
        <PublicRoute path="/" component={Pagenotfound}></PublicRoute>
      </Switch>
    </BrowserRouter>
  );
};
