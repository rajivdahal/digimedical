import Footer from "../../../Footer/Footer";
import Navbar from "../../../Navbar/Navbar";
import "./changepassword.component.css";
import { useState } from "react";
import Submitbtn from "../../Submitbtn/Submitbtn.component";
import { useFormik } from "formik";
import { httpClient } from "../../../../utils/httpClient";
import { notify } from "./../../../../services/notify";
import { useHistory } from "react-router-dom";
export const Changepassword = (props) => {
  console.log("props in change password are", props);
  const [isLoading, setisLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const userName = props.location.username;
  const history = useHistory();
  const Formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      oldPassword: "",
      newPassword: "",
    },
    onSubmit: (values) => {
      setisLoading(true);
      if (!userName) {
        return httpClient
          .PUT("update-user-password", values, false, true)
          .then((resp) => {
            notify.success("Password successfully changed.");
            props.history.push("/dashboard/");
          })
          .catch((err) => {
            console.log(err.response);
            values.newPassword = "";
            values.confirmPassword = "";
            values.oldPassword = "";

            return notify.error("Old password does not match");
          })
          .finally(() => {
            setisLoading(false);
          });
      }
      values.userName = userName;
      httpClient
        .PUT("update-password", values, false, false)
        .then((resp) => {
          notify.success("Password Successfully changed");
          props.history.push("/login");
        })
        .catch((err) => {
          notify.error("something went wrong!");
        })
        .finally(() => {
          setisLoading(false);
        });
    },
    validate: (values) => {
      let errors = {};
      if (props.location.pathname !== "/dashboard/settings/change-password") {
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(values.password)) {
          errors.password =
            "Password should at least be 8 characters of one uppercase ,one lowercase and one special character!";
        }
        if (!values.password) {
          errors.password = "Password must not be empty!";
        }

        if (!values.confirmPassword) {
          errors.confirmPassword = "Confirm password must not be empty!";
        }
        if (values.confirmPassword != values.password) {
          errors.confirmPassword = "Password doesn't match!";
        }
      } else {
        if (!values.oldPassword) {
          errors.oldPassword = "Old password is required!";
        }

        if (
          !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(values.newPassword)
        ) {
          errors.newPassword = "Weak password!";
        }
        if (values.confirmPassword != values.newPassword) {
          errors.confirmPassword = "Password doesn't match!";
        }
        if (!values.newPassword) {
          errors.newPassword = "Please enter new Password!";
        }
      }

      return errors;
    },
  });
  const handleCancel = () => {
    history.push("/dashboard");
  };

  const changeType = (field) => {
    if (field == "showNewPassword") {
      setNewPassword(!newPassword);
    }

    if (field == "showCurrentPassword") {
      setCurrentPassword(!currentPassword);
    }
    // switch (field) {
    //   case "showNewPassword":

    //     setShowPassword(showpass)
    //     break;
    //   case "showCurrentPassword":
    //     showpass.showCurrentPassword=!showpass.showCurrentPassword
    //     setShowPassword(showpass)
    //   default:
    //     break;
    // }
  };
  return (
    <div className="changepass_main">
      {props.location.pathname ===
      "/dashboard/settings/change-password" ? null : (
        <Navbar></Navbar>
      )}

      {props.location.pathname === "/dashboard/settings/change-password" ? (
        <div className="changepassword-body">
          <div className="changepassword-box">
            <h1>
              {props.location.fromexternaluser
                ? "Enter Password"
                : "Change Password"}
            </h1>
            <form
              action=""
              className="change_pass_form"
              onSubmit={Formik.handleSubmit}
            >
              <div className="form_cont_changepass">
                {props.location.pathname ===
                "/dashboard/settings/change-password" ? (
                  <div>
                    <p id="label_cp">Current Password</p>
                    <input
                      type={currentPassword ? "text" : "password"}
                      id="password"
                      {...Formik.getFieldProps("oldPassword")}
                    />

                    <i
                      className={
                        currentPassword ? "fas fa-eye" : "fas fa-eye-slash"
                      }
                      id="icon_eye_cp"
                      onClick={() => changeType("showCurrentPassword")}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                ) : null}
              </div>

              <div className="form_cont_changepass">
                <p id="label_cp">
                  {props.location.fromexternaluser
                    ? "Password"
                    : "New Password"}
                </p>
                <input
                  type={newPassword ? "text" : "password"}
                  id="password"
                  {...Formik.getFieldProps("newPassword")}
                />
                <i
                  className={newPassword ? "fas fa-eye" : "fas fa-eye-slash"}
                  id="icon_eye_cp"
                  onClick={() => changeType("showNewPassword")}
                  style={{ cursor: "pointer" }}
                ></i>
                {Formik.errors.newPassword && Formik.touched.newPassword ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {Formik.errors.newPassword}
                  </div>
                ) : null}
              </div>

              <div className="form_cont_changepass">
                <p id="label_cp">Confirm Password</p>
                <input
                  type="password"
                  id="confirmPassword"
                  {...Formik.getFieldProps("confirmPassword")}
                />
                {Formik.errors.confirmPassword &&
                Formik.touched.confirmPassword ? (
                  <div style={{ color: "red" }} className="errmsg">
                    {Formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <div className="but_chang_pass">
                <button id="cancel_chang_pass" onClick={handleCancel}>
                  Cancel
                </button>
                <button id="submit_chang_pass" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="adjust-center adjust-margin">
            <h2 className="primary-color">Change Password</h2>
          </div>
          <form className="forgotpassword" onSubmit={Formik.handleSubmit}>
            <label htmlFor="password" style={{ marginTop: "20px" }}>
              New Password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              id="password"
              className="form-control form-input"
              {...Formik.getFieldProps("password")}
            ></input>
            {Formik.errors.password && Formik.touched.password ? (
              <div style={{ color: "red" }} className="errmsg">
                {Formik.errors.password}
              </div>
            ) : null}

            <label htmlFor="password" style={{ marginTop: "25px" }}>
              Confirm Password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control form-input"
              {...Formik.getFieldProps("confirmPassword")}
            ></input>
            {Formik.errors.confirmPassword && Formik.touched.confirmPassword ? (
              <div style={{ color: "red" }} className="errmsg">
                {Formik.errors.confirmPassword}
              </div>
            ) : null}
            <div className="adjust-center" style={{ marginTop: "20px" }}>
              <Submitbtn
                enabledLabel="Submit"
                isSubmitting={isLoading}
              ></Submitbtn>
            </div>
          </form>
        </div>
      )}

      {props.location.pathname ===
      "/dashboard/settings/change-password" ? null : (
        <Footer></Footer>
      )}
    </div>
  );
};
