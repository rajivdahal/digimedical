import { Formik, useFormik } from "formik"
import Submitbtn from "../common/Submitbtn/Submitbtn.component"
import { useState } from "react"
import "./forgotpassword.component.css"
import { httpClient } from "../../utils/httpClient"

export const Forgotpassword = () => {
    const [isLoading, setisLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
                email: '',
                // password: '',
                // confirmPassword: '',
        },
        onSubmit: values => {
            setisLoading(true)
            httpClient.POST('forgetemail',values)
            .then(resp=>{
                console.log(resp)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
    return (
        <>
            <form onSubmit={formik.handleSubmit} className="forgotpassword">
                <label htmlFor="email">email</label>
                <input type="email" id="email" {...formik.getFieldProps("email")} className="form-control form-input"></input>

                {/* <label htmlFor="password">New Password</label>
                <input type="password" id="password" {...formik.getFieldProps("password")} className="form-control form-input"></input>

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" {...formik.getFieldProps("confirmPassword")} className="form-control form-input"></input> */}

                <Submitbtn enabledLabel="Reset Password" isSubmitting={isLoading}></Submitbtn>
            </form>

        </>
    )
}