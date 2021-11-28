import React, { useState } from 'react'
import { httpClient } from '../../utils/httpClient'
import { Header } from '../common/Header/Header.component'
import { notify } from '../../services/notify'
import { useFormik } from 'formik'
import Submitbtn from '../common/Submitbtn/Submitbtn.component'
import './Register.component.css'

const RegisterComponent = (props) => {
    const [isLoading,setisLoading]=useState(false)

    const formik = useFormik({
        initialValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            mobileNumber: '',
            email: '',
            password: '',
            confrimpassword: '',
        },
        validate: values => {
            let errors = {}
            if (!values.firstName) {
                errors.firstName = "Firstname Required"
            }
            if (!values.lastName) {
                errors.lastName = "LastName Required"
            }
            if (!values.mobileNumber) {
                errors.mobileNumber = "MobileNumber Required"
            }

            if (("" + values.mobileNumber).length != 10) {
                errors.mobileNumber = "Mobile Number must be of 10 digits"
            }
            if (("" + values.mobileNumber).includes('-')) {
                errors.mobileNumber = "Phone Number can't be Negative"
            }
            if (!values.email) {
                errors.email = "Email Required"
            }
            else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
                errors.email = "invalid email format"
            }

            if (values.password.length < 8) {
                errors.password = "password must be greater than 8 digits"
            }
            if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(values.password)) {
                errors.password = "password Should contain  minimum 8 characters of at least  one uppercase ,one lowercase, one special character "
            }
            if (!values.password) {
                errors.password = "Password must not be Empty"
            }
            if (!values.confrimpassword) {
                errors.confrimpassword = "Please confirm your Password"
            }
            if (values.confrimpassword != values.password) {
                errors.confrimpassword = "Password doesn't match"
            }
            return errors
        },
        onSubmit: values => {
            setisLoading(true)
            httpClient.POST("create-user", values)
                .then(resp => {
                    setTimeout(()=>{
                        notify.success("Register Successful please Sign In to Continue")
                        props.history.push('/login')
                    },3000)
                  
                })
                .catch(err => {
                    notify.error(err.response.data.message)
                })
        }
    })
    return (
        <>
            <Header></Header>
            <div className="banner-area banner-bg" style={{ background: "url(/images/healthcare.jpg)" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="banner">
                                <h2>Dont wait to SignUp today</h2>
                                <ul className="page-title-link">
                                    <li><a href="home.html">Home</a></li>
                                    <li><a href="">Register</a></li>
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
                                <h3 className="fs-subtitle text-center">Fill in your credentials</h3>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group select-label">
                                            <label>First Name </label>
                                            <input type="text" className="form-control form-input" placeholder="First Name" id="firstName" name="firstName" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.firstName && formik.touched.firstName ? <div style={{ color: "red" }}>{formik.errors.firstName}</div> : null}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group select-label">
                                            <label>Middle Name </label>
                                            <input type="text" className="form-control form-input" placeholder="Middle Name" id="middleName" name="middleName" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.middleName && formik.touched.middleName ? <div style={{ color: "red" }}>{formik.errors.middleName}</div> : null}

                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group select-label">
                                            <label>Last Name </label>
                                            <input type="text" className="form-control form-input" placeholder="Last Name" id="lastName" name="lastName" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.lastName && formik.touched.lastName ? <div style={{ color: "red" }}>{formik.errors.lastName}</div> : null}


                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group select-label">
                                            <label>Phone </label>
                                            <input type="number" className="form-control form-input" placeholder="" id="mobileNumber" name="mobileNumber" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.mobileNumber && formik.touched.mobileNumber ? <div style={{ color: "red" }}>{formik.errors.mobileNumber}</div> : null}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group select-label">
                                            <label>Email address </label>
                                            <input type="email" className="form-control form-input" placeholder="" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.email && formik.touched.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : null}


                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group select-label">
                                            <label>Password </label>
                                            <input type="password" className="form-control form-input" placeholder="" id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.password && formik.touched.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group select-label">
                                            <label>Confirm Password </label>
                                            <input type="password" className="form-control form-input" placeholder="" id="confrimpassword" name="confrimpassword" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.confrimpassword && formik.touched.confrimpassword ? <div style={{ color: "red" }}>{formik.errors.confrimpassword}</div> : null}
                                        </div>
                                    </div>
                                    <div className="sign-btn text-center w-100 mt-4">
                                        <a href="register.html">
                                           <Submitbtn fieldName="Register" isSubmitting={isLoading} enabledLabel="Register"></Submitbtn>
                                        </a>
                                        <p className="text-center w-100 pt-3">OR</p>
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
        </>
    )
}
export default RegisterComponent
