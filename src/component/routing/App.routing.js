import { Redirect } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../register/Register.component";
import { notify } from "../../services/notify";
import { httpClient } from "../../utils/httpClient";
import Dashboard from "../dashboard/dashboard.component";
import { Forgotpassword } from "../forgotpassword/forgotpassword.component";
import { Home } from "../home/home.component";
import { Login } from "../login/login.component";
import { Pagenotfound } from "../pagenotfound/Pagenotfound.component";
import Services from "../servicesData/services.component";
import {Viewappointment} from "./../dashboard/viewappointment/Viewappointment.component"
import { Bookappointment } from "../dashboard/bookappointment/Bookappointment.component";


export const Approuting = (props) => {
  console.log("inside app routing");
  const ProtectedRoute = ({ component: Component, ...rest }) => {


    const expiry_time = localStorage.getItem("timeout");
    console.log(expiry_time);
    setTimeout(() => {
      localStorage.removeItem("dm-access_token");
      const refresh_token = localStorage.getItem("dm-refresh_token");
      const data = {};
      data.refresh_token = refresh_token;
      if (refresh_token) {
        httpClient
          .UPLOAD("POST", "oauth/token", data, "refresh_token", null)
          .then((resp) => {
            let response = JSON.parse(resp);
            localStorage.setItem("dm-access_token", response.access_token);
            localStorage.setItem("dm-refresh_token", response.refresh_token);
            localStorage.setItem("timeout", response.expires_in);
            localStorage.setItem("status", response.status);
          })
          .catch((err) => {
            notify.error(err);
          });
      } else {
        <Redirect
          to={{
            pathname: "/login",
            timeoutMsg: "session expired please Login again",
          }}
        ></Redirect>;
      }
    }, expiry_time);

    return (
      <Route
        {...rest}
        render={(routeProps) => {
          return localStorage.getItem("dm-access_token") ? (
            <div>
              <Component {...routeProps}></Component>
            </div>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                timeoutMsg: "session expired please Login again",
              }}
            ></Redirect>
          );
        }}
      ></Route>
    );
  };
 const PublicRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(routeProps) => {
          return (
            <div>
              <Component {...routeProps}></Component>
            </div>
          );
        }}
      ></Route>
    );
  };
  return (
    <BrowserRouter>
     
      <Switch>
        <PublicRoute exact path="/login" component={Login}></PublicRoute>
        <PublicRoute exact path="/" component={Home}></PublicRoute>
        <ProtectedRoute path="/services" component={Services}></ProtectedRoute>
        <PublicRoute exact path="/register" component={Register}></PublicRoute>
        <PublicRoute exact path="/forgot-password" component={Forgotpassword}></PublicRoute>
        <ProtectedRoute exact path="/dashboard" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/viewappointment" component={Viewappointment}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/bookappointment" component={Bookappointment}></ProtectedRoute>
        <PublicRoute path="/" component={Pagenotfound}></PublicRoute>
      </Switch>
     
    </BrowserRouter>
  );
};
