import { Redirect } from "react-router";
import { httpClient } from "../../utils/httpClient";
import { notify } from "../../services/notify";
import { Route } from "react-router";
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
}
export default ProtectedRoute