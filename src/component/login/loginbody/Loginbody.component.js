import { connect } from "react-redux"
import { loginuser } from "../../../actions/User.ac"
import React, { useEffect } from 'react'
import { Formik, useFormik } from "formik"
import { httpClient } from "../../../utils/httpClient"
import { Link } from "react-router-dom"
import { notify } from "../../../services/notify"
import Submitbtn from "../../common/Submitbtn/Submitbtn.component"
import { useState } from "react"
import "./Loginbody.component.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import CircularProgress from '@mui/material/CircularProgress';
import {useLocation} from "react-router-dom"
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Loginbodycomponent = (props) => {
    const fromexternaluser = props.history.location.fromexternaluser ? props.history.location.fromexternaluser : false
    const externaluseremail = props.history.location.email ? props.history.location.email : null
    const [isLoading, setisLoading] = useState(false)
    const [errMsg, seterrMsg] = useState('')
    const [ispassword, setispassword] = useState(true)
    const [isGoogleApiLoading,setIsGoogleApiLoading]=useState(false)
    let location=useLocation()
    console.log("location is",location)
    useEffect(() => {
        const timeoutMsg = props.timeoutMsg
        if (timeoutMsg) {
            notify.error(timeoutMsg);
        }
    }, [])
    const formik = useFormik({
        initialValues: {
            username: fromexternaluser ? externaluseremail : "",
            password: '',
        },

        onSubmit: values => {
            setisLoading(true)
            httpClient.UPLOAD('POST', 'oauth/token', values, "password", null)
                .then(resp => {
                    let response = JSON.parse(resp)
                    let { access_token, refresh_token, expires_in, status, userid } = response
                    localStorage.setItem("dm-access_token", access_token)
                    localStorage.setItem("dm-refresh_token", refresh_token)
                    localStorage.setItem("timeout", expires_in)
                    localStorage.setItem("status", status)
                    localStorage.setItem("userid", userid)
                    setTimeout(() => {
                        props.history.push({
                            pathname: `/dashboard/`,
                            fromexternaluser: fromexternaluser
                        })
                        // notify.success("Successfully Loggedin")
                    }, 3000)
                })
                .catch(err => {
                    if (!err) {
                        notify.error("something went wrong")
                        return setisLoading(false)
                    }
                    // seterrMsg(error.message)
                    let error = JSON.parse(err)
                    formik.errors.password = error.message
                    setisLoading(false)
                    notify.error("Login unsuccessful")
                })

        },
        validate: values => {
            let errors = {}
            if (!values.username) {
                errors.username = "Email is required!"
            }
            else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.username)) {
                errors.username = "Invalid email format!"
            }
            if (!values.password) {
                errors.password = "Password is required!"
            }
            return errors
        },
    })

    const vieworhidepassword = () => {
        setispassword(!ispassword)
    }
    // render() {
    const alert = props.usernameinfo ? props.usernameinfo : "not found"
    const responseGoogleSuccess = (response) => {
        console.log(response);
        const { tokenId } = response;
        // console.log("type of token id is", typeof tokenId, tokenId);
        setIsGoogleApiLoading(true)
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
              setIsGoogleApiLoading(false)
            }, 3000);
          })
          .catch((err) => {
            console.log("error is", err);
            notify.error("Login failed");
            setIsGoogleApiLoading(false)
          })
      };
      const responseGoogleFailure = (response) => {
        console.log("response from google login is", response);
      };
    return (
        <div>
            <section className="login">
                <div className="container">
                    <div className="row adjust-height">
                        <div className="col-md-6 adj-height">
                            <div className="login-img">
                                <img src="/images/login-bg.png" alt="" className="img-fluid" style={{ height: 700 }} />
                            </div>
                        </div>
                        <div className="col-md-6 adj-form">
                            <form className="login-form " onSubmit={formik.handleSubmit}>
                                <h2 className="fs-title text-center">Login</h2>
                                <h3 className="fs-subtitle text-center">Fill in your credentials</h3>
                                <p style={{ color: "blue" }}>{fromexternaluser ? `Please check your email and login with OTP provided at` : null}</p>
                                {/* <h4>{fromexternaluser?externaluseremail:null}</h4>  */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group select-label">
                                            <label>Email address<span style={{ color: 'red' }}>*</span> </label>
                                            <input type="username" className="form-control form-input" placeholder="username" id="username" {...formik.getFieldProps("username")} />
                                            {formik.errors.username && formik.touched.username ? <div style={{ color: "red" }} className="errmsg">{formik.errors.username}  </div> : null}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group select-label">
                                            <label>{fromexternaluser ? "OTP" : "Password"}<span style={{ color: 'red' }}>*</span> </label>
                                            <input type={ispassword ? "password" : "text"} className="form-control form-input" placeholder="Enter Password" id="password" {...formik.getFieldProps("password")} />
                                            {
                                                ispassword ? <i class="fas fa-eye eye-to-see-password" onClick={vieworhidepassword}></i> : <i class="fas fa-eye-slash eye-to-see-password" onClick={vieworhidepassword}></i>
                                            }
                                            {formik.errors.password && formik.touched.password ? <div style={{ color: "red" }} className="errmsg">{formik.errors.password}  </div> : null}
                                            {errMsg ? <div style={{ color: "red" }} className="errmsg">{errMsg}  </div> : null}
                                        </div>
                                    </div>
                                    <div className="sign-btn text-center w-100 mt-2">
                                        <a href="#">
                                            <Submitbtn enabledLabel="Login" disabledLabel="Logging in......" isSubmitting={isLoading}></Submitbtn>
                                        </a><br />

                                        <Link to="/forgot-password"><div className="pt-3 text-center w-100">Forgot Password?
                                            </div>
                                        </Link>
                                        <p className="text-center w-100 pt-3" style={{marginBottom: '20px'}}>OR</p>
                                        <Link to="/register">

                                            <button className="btn register-btn br/-0 mt-0">
                                                Register new
                                            </button>

                                        </Link>
                                        <div className="login-icons mt-3">
                                            <h2 className="fs-title text-center">Login With</h2>
                                            <ul>
                                                <li>
                                                    <a href="#"><i className="fa fa-facebook-f"></i></a>
                                                </li>
                                                {/* <li>
                                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                                </li> */}
                                                <li className="li-reg">
                          {
                            isGoogleApiLoading?<CircularProgress  style={{position:"relative",top:"12px",left:"5px"}}/>
                            :
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
                          }
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
        </div>
    )
}

const mapStateToProps = rootstore => {
    // return {
    //     a: 'abcd',
    //     usernameinfo: rootstore.user.profileImage
    // }
}

const mapDispatchToProps = dispatch => {
    // return {
    //     loginaction: (params) => dispatch(loginuser(params))
    // }
}
export const Loginbody = connect(mapStateToProps, mapDispatchToProps)(Loginbodycomponent)
