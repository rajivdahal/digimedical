import { Formik, useFormik } from "formik"
import Submitbtn from "../Submitbtn/Submitbtn.component"
import { useState } from "react"
import "./forgotpassword.component.css"
import { httpClient } from "../../../utils/httpClient"
import Navbar from "../../Navbar/Navbar"
import Footer from "../../Footer/Footer"
import { notify } from "../../../services/notify"

export const Forgotpassword = (props) => {
    console.log(props)
    const [isLoading, setisLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            username: '',
            // password: '',
            // confirmPassword: '',
        },
        onSubmit: values => {
            console.log(values)
            setisLoading(true)
            httpClient.PUT('forget-password', values)
                .then(resp => {
                    props.history.push({
                        pathname: "/forgot-password/verify-password",
                        email:values.username
                    }
                    )
                })
                .catch(err => {
                    notify.error("error occurred")
                })
                .finally(() => {
                    setisLoading(false)
                })
        }
    })
    return (
        <>
            <Navbar></Navbar>
            <div className="container">
                <div className="adjust-center adjust-margin">
                    <h2 className="primary-color" >Reset Password</h2>
                    <p>You will be provided an OTP on your gmail,please enter the your Email</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="forgotpassword">
                    <label htmlFor="email">email</label>
                    <input type="email" id="username" {...formik.getFieldProps("username")} className="form-control form-input"></input>

                    {/* <label htmlFor="password">New Password</label>
                <input type="password" id="password" {...formik.getFieldProps("password")} className="form-control form-input"></input>

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" {...formik.getFieldProps("confirmPassword")} className="form-control form-input"></input> */}
                    <div className="adjust-center" style={{ marginTop: "20px" }}>
                        <Submitbtn enabledLabel="Reset Password" isSubmitting={isLoading}></Submitbtn>
                    </div>

                </form>
            </div>
            <Footer></Footer>
        </>
    )
}