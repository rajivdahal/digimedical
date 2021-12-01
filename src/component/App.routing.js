import { Redirect } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { notify } from "../services/notify";
import { httpClient } from "../utils/httpClient";
import Dashboard from "./dashboard/dashboard.component";
import { Home } from "./home/home.component";
import { Login } from "./login/login.component";
import Service from "../component/Service/Service";
import Register from "./register/Register.component";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Contact from "./Contact/ContactUs";
export const Approuting = (props) => {
  console.log("inside app routing");
  const ProtectedRoute = ({ component: Component, ...rest }) => {
    const expiry_time = localStorage.getItem("timeout");
    console.log(expiry_time);
    setTimeout(() => {
      localStorage.removeItem("dm-access_token");
      const refresh_token = localStorage.getItem("dm-refresh_token");
      console.log("refresh_token", refresh_token);
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
      <Navbar />
      <Switch>
        {/* <PublicRoute exact path="/login" component={Login}></PublicRoute> */}
        <PublicRoute exact path="/" component={Home}></PublicRoute>
        <PublicRoute path="/service" component={Service}></PublicRoute>
        <PublicRoute path="/contact" component={Contact}></PublicRoute>

        {/* <PublicRoute exact path="/register" component={Register}></PublicRoute> */}
        <ProtectedRoute
          exact
          path="/dashboard/:id"
          component={Dashboard}
        ></ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};
