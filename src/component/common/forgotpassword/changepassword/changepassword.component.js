import Footer from "../../../Footer/Footer"
import Navbar from "../../../Navbar/Navbar"
import "./changepassword.component.css"
import { useState } from "react"
import Submitbtn from "../../Submitbtn/Submitbtn.component"
import { useFormik } from "formik"
import { httpClient } from "../../../../utils/httpClient"
import {notify} from "./../../../../services/notify"
export const Changepassword = (props) => {
    console.log(props)
    const [isLoading, setisLoading] = useState(false)
    const userName=props.location.username
    const Formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        onSubmit:values=>{
            values.userName=userName
            httpClient.PUT("update-password",values,false,false)
            .then(resp=>{
                notify.success("Password Successfully changed")
                props.history.push("/login")
            })
            .catch(err=>{
                notify.error("something went wrong!")
            })
        },
        validate:values=>{
            let errors={}
            if(!values.password){
                errors.password="Password must not be empty!"
            }
            if(!values.confirmPassword){
                errors.confirmPassword="Confirm password must not be empty!"
            }
            if (values.confirmPassword != values.password) {
                errors.confirmPassword = "Password doesn't match!"
            }
            return errors
        }
    })
    return (
        <>
            <Navbar></Navbar>
            <div className="container">
                <div className="adjust-center adjust-margin">
                    <h2 className="primary-color" >{props.location.fromexternaluser?"Enter Password":"Change Password"}</h2>
                </div>
                <form className="forgotpassword" onSubmit={Formik.handleSubmit}>
                    <label htmlFor="password">{props.location.fromexternaluser?"Password":"New Password"}</label>
                    <input type="password" id="password" className="form-control form-input"{...Formik.getFieldProps("password")} ></input>
                    {Formik.errors.password && Formik.touched.password ? <div style={{ color: "red" }} className="errmsg">{Formik.errors.password}</div> : null}
                    <label htmlFor="password" style={{ marginTop: "20px" }}>Confirm Password</label>
                    <input type="password" id="confirmPassword" className="form-control form-input" {...Formik.getFieldProps("confirmPassword")} ></input>
                    {Formik.errors.confirmPassword && Formik.touched.confirmPassword ? <div style={{ color: "red" }} className="errmsg">{Formik.errors.confirmPassword}</div> : null}
                    <div className="adjust-center" style={{ marginTop: "20px" }}>
                        <Submitbtn enabledLabel="Submit" isSubmitting={isLoading}></Submitbtn>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </>
    )
}