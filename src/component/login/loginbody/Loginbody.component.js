import { connect } from "react-redux"
import { loginuser } from "../../../actions/User.ac"
import React, { useEffect } from 'react'
import { useFormik } from "formik"
import { httpClient } from "../../../utils/httpClient"
import { Link } from "react-router-dom"
import { notify } from "../../../services/notify"
import Submitbtn from "../../common/Submitbtn/Submitbtn.component"
import { useState } from "react"
import "./Loginbody.component.css"
const Loginbodycomponent = (props) => {
    const [isLoading, setisLoading] = useState(false)
    const [errMsg, seterrMsg] = useState('')
    useEffect(() => {
        const timeoutMsg = props.timeoutMsg
        console.log(timeoutMsg)
        if (timeoutMsg) {
            notify.error(timeoutMsg);
        }
    }, [])
    console.log(props)
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: values => {
            setisLoading(true)
            httpClient.UPLOAD('POST', 'oauth/token', values, "password", null)
                .then(resp => {
                    let response = JSON.parse(resp)
                    console.log(response)
                    let { access_token, refresh_token, expires_in,status } = response
                    localStorage.setItem("dm-access_token", access_token)
                    localStorage.setItem("dm-refresh_token", refresh_token)
                    localStorage.setItem("timeout", expires_in)
                    localStorage.setItem("status",status)
                    setTimeout(() => {
                        props.history.push({
                            pathname: `/dashboard/${response.userid}`
                        })
                        // notify.success("Successfully Loggedin")
                    }, 3000)
                })
                .catch(err => {
                    console.log("inside err")
                    if (!err) {
                        notify.error("something went wrong")
                        return setisLoading(false)
                    }
                    // seterrMsg(error.message)
                    let error = JSON.parse(err)
                    formik.errors.password = error.message
                    setisLoading(false)
                })
        },
        validate: values => {
            let errors = {}
            if (!values.username) {
                errors.username = "Email required!"
            }
            else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.username)) {
                errors.username = "Invalid email format"
            }
            if (!values.password) {
                errors.password = "Password required!"
            }
            return errors
        },
    })




                        
    // render() {
    const alert = props.usernameinfo ? props.usernameinfo : "not found"

    return (
        <div>
            <section className="login">
                <div className="container">
                    <div className="row adjust-height">
                        <div className="col-md-6 adj-height">
                            <div className="login-img">
                                <img src="/images/login-bg.png" alt="" className="img-fluid"  style={{height:700}}/>
                            </div>
                        </div>
                        <div className="col-md-6 adj-form">
                            <form className="login-form " onSubmit={formik.handleSubmit}>
                                <h2 className="fs-title text-center">Login</h2>
                                <h3 className="fs-subtitle text-center">Fill in your credentials</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group select-label">
                                            <label>Email address </label>
                                            <input type="username" className="form-control form-input" placeholder="username" id="username" {...formik.getFieldProps("username")} />
                                            {formik.errors.username && formik.touched.username ? <div style={{ color: "red" }} className="errmsg">{formik.errors.username}  </div> : null}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group select-label">
                                            <label>Password </label>
                                            <input type="password" className="form-control form-input" placeholder="Enter Password" id="password" {...formik.getFieldProps("password")} />
                                            {formik.errors.password && formik.touched.password ? <div style={{ color: "red" }} className="errmsg">{formik.errors.password}  </div> : null}
                                            {errMsg ? <div style={{ color: "red" }} className="errmsg">{errMsg}  </div> : null}
                                        </div>
                                    </div>
                                    <div className="sign-btn text-center w-100 mt-2">
                                        <a href="#">
                                            <Submitbtn enabledLabel="Login" disabledLabel="Logging in......" isSubmitting={isLoading}></Submitbtn>
                                        </a><br />

                                        <a href="#" className="pt-3 text-center w-100">Forgot Password?
                                            <br />(request a new one)</a>
                                        <p className="text-center w-100 pt-3">OR</p>
                                        <Link to="/register">

                                            <button className="btn register-btn br/-0 mt-0">

                                                Register new
                                            </button>

                                        </Link>
                                        <div className="login-icons mt-3">
                                            <h2 className="fs-title text-center">Login With</h2>
                                            <ul>
                                                <li>
                                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                                </li>
                                                <li>
                                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                                </li>
                                                <li>
                                                    <a href="#"><i className="fab fa-google-plus-g"></i></a>
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
    return {
        a: 'abcd',
        usernameinfo: rootstore.login.username,
        // isloading:rootstore.product.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginaction: (params) => dispatch(loginuser(params))
    }
}
export const Loginbody = connect(mapStateToProps, mapDispatchToProps)(Loginbodycomponent)
