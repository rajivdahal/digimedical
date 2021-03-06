import React, { useState } from "react";
import { httpClient } from "../../utils/httpClient";
import { notify } from "../../services/notify";
import { useFormik } from "formik";
import Submitbtn from "../common/Submitbtn/Submitbtn.component";
import "./Register.component.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import CircularProgress from "@mui/material/CircularProgress";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const RegisterComponent = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [ispassword, setispassword] = useState(true);
  const [isGoogleApiLoading, setIsGoogleApiLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.firstName) {
        errors.firstName = "Firstname is required!";
      }

      if (!values.lastName) {
        errors.lastName = "LastName is required!";
      }
      if (values.lastName.length < 2) {
        errors.lastName = "Invalid Lastname!";
      }
      let decimalREGEX = /^\d*\.?\d*$/;

      if (!decimalREGEX.test(values.mobileNumber)) {
        errors.mobileNumber = "Must be a number";
      }
      if (!values.mobileNumber) {
        errors.mobileNumber = "Mobile Number  is required!";
      } else if (values.mobileNumber.length != 10) {
        errors.mobileNumber = "Mobile Number must be of 10 digits!";
      } else if (("" + values.mobileNumber).includes("-")) {
        errors.mobileNumber = "Phone Number can't be Negative!";
      }
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
      ) {
        errors.email = "invalid email format!";
      }

      if (values.password.length < 8) {
        errors.password = "password must be greater than 8 digits!";
      }
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(values.password)) {
        errors.password =
          "Password should at least be 8 characters of one uppercase ,one lowercase and one special character!";
      }
      if (!values.password) {
        errors.password = "Password must not be empty!";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Please confirm your Password!";
      }
      if (values.confirmPassword != values.password) {
        errors.confirmPassword = "Password doesn't match!";
      }
      if (values.firstName.length < 2) {
        errors.firstName = "Invalid firstname!";
      }
      return errors;
    },
    onSubmit: (values) => {
      setisLoading(true);
      httpClient
        .POST("create-user", values)
        .then((resp) => {
          setTimeout(() => {
            notify.success("Register Successful please Sign In to Continue");
            props.history.push("/login");
          }, 3000);
        })
        .catch((err) => {
          if (!err) {
            notify.error("something went wrong");
            return setisLoading(false);
          }
          err.response
            ? notify.error(err.response.data.message)
            : notify.error("Register unsuccessful");
          setisLoading(false);
        });
    },
  });
  const vieworhidepassword = () => {
    setispassword(!ispassword);
  };
  const responseGoogleSuccess = (response) => {
    console.log(response);
    const { tokenId } = response;
    // console.log("type of token id is", typeof tokenId, tokenId);
    setIsGoogleApiLoading(true);
    httpClient
      .POST("google-signin", { tokenId: tokenId })
      .then((resp) => {
        console.log("response is", resp.data.data);
        let { access_token, refresh_token, expires_in, status, userid } =
          resp.data.data;
        localStorage.setItem("dm-access_token", access_token);
        localStorage.setItem("dm-refresh_token", refresh_token);
        localStorage.setItem("timeout", expires_in);
        localStorage.setItem("status", status);
        localStorage.setItem("userid", userid);
        setTimeout(() => {
          props.history.push({
            pathname: `/dashboard/`,
          });
          setIsGoogleApiLoading(false);
        }, 3000);
      })
      .catch((err) => {
        console.log("error is", err);
        notify.error("Login failed");
        setIsGoogleApiLoading(false);
      });
  };
  const responseGoogleFailure = (response) => {
    console.log("response from google login is", response);
  };
  return (
    <>
      <Navbar></Navbar>
      <div
        className="banner-area banner-bg"
        style={{ background: "url(/images/healthcare.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="banner">
                <h2>Dont wait to SignUp today</h2>
                <ul className="page-title-link">
                  <li>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>Register</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="register-img">
                <img src="images/login-bg.png" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6">
              <form className="register-form" onSubmit={formik.handleSubmit}>
                <h2 className="fs-title text-center">Register</h2>
                <h3 className="fs-subtitle text-center">
                  Fill in your credentials
                </h3>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group select-label">
                      <label>
                        First Name<span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        placeholder="First Name"
                        id="firstName"
                        name="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.firstName && formik.touched.firstName ? (
                        <div style={{ color: "red" }} className="errmsg">
                          {formik.errors.firstName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group select-label">
                      <label>Middle Name </label>
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Middle Name"
                        id="middleName"
                        name="middleName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.middleName && formik.touched.middleName ? (
                        <div style={{ color: "red" }} className="errmsg">
                          {formik.errors.middleName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group select-label">
                      <label>
                        Last Name<span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Last Name"
                        id="lastName"
                        name="lastName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.lastName && formik.touched.lastName ? (
                        <div style={{ color: "red" }} className="errmsg">
                          {formik.errors.lastName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group select-label">
                      <label>
                        Phone<span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        placeholder=""
                        id="mobileNumber"
                        name="mobileNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.mobileNumber &&
                      formik.touched.mobileNumber ? (
                        <div style={{ color: "red" }} className="errmsg">
                          {formik.errors.mobileNumber}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group select-label">
                      <label>
                        Email address<span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="email"
                        className="form-control "
                        placeholder=""
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <div style={{ color: "red" }} className="errmsg">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group select-label">
                      <label>
                        Password<span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="password"
                        className="form-control "
                        placeholder=""
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <div style={{ color: "red" }} className="errmsg">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group select-label">
                      <label>
                        Confirm Password<span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <input
                        type="password"
                        className="form-control "
                        placeholder=""
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword ? (
                        <div style={{ color: "red" }} className="errmsg">
                          {formik.errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="sign-btn text-center w-100 mt-4">
                    <a href="register.html">
                      <Submitbtn
                        fieldName="Register"
                        isSubmitting={isLoading}
                        enabledLabel="Register"
                      ></Submitbtn>
                    </a>
                    <div className="login-button-on-reg">
                      <Submitbtn
                        fieldName="Login"
                        enabledLabel="Login"
                      ></Submitbtn>
                    </div>
                    <p className="text-center w-100 pt-3">OR</p>
                    <div className="login-icons mt-3">
                      <h2 className="fs-title text-center">Login With</h2>
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fa fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li className="li-reg">
                          {isGoogleApiLoading ? (
                            <CircularProgress
                              style={{
                                position: "relative",
                                top: "12px",
                                left: "5px",
                              }}
                            />
                          ) : (
                            <GoogleLogin
                              clientId={googleClientId}
                              render={(renderProps) => (
                                <button
                                  onClick={renderProps.onClick}
                                  disabled={renderProps.disabled}
                                >
                                  <span>
                                    <i class="fab fa-google"></i>
                                  </span>
                                </button>
                              )}
                              buttonText=""
                              onSuccess={responseGoogleSuccess}
                              onFailure={responseGoogleFailure}
                              cookiePolicy={"single_host_origin"}
                            />
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};
export default RegisterComponent;
