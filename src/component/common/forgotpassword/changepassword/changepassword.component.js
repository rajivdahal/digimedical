import Footer from "../../../Footer/Footer"
import Navbar from "../../../Navbar/Navbar"
import "./changepassword.component.css"
import { useState } from "react"
import Submitbtn from "../../Submitbtn/Submitbtn.component"
import { useFormik } from "formik"
import { httpClient } from "../../../../utils/httpClient"
import { notify } from "./../../../../services/notify"
export const Changepassword = (props) => {
    console.log("props in change password are", props)
    const [isLoading, setisLoading] = useState(false)
    const userName = props.location.username
    const Formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
            oldPassword: '',
            newPassword: ''
        },
        onSubmit: values => {
            console.log("submit triggered")
            setisLoading(true)
            if (!userName) {
                return httpClient.PUT("update-user-password", values, false, true)
                    .then(resp => {
                        notify.success("Password successfully changed")
                        props.history.push("/dashboard")
                    })
                    .catch(err => {
                        console.log(err.response)
                        values.newPassword=""
                        values.confirmPassword=""
                        values.oldPassword=""
                        Formik.errors.confirmPassword=err.response.data.message
                        return notify.error("Old password does not match")
                    })
                    .finally(()=>{
                        setisLoading(false)
                    })
            }
            values.userName = userName
            httpClient.PUT("update-password", values, false, false)
                .then(resp => {
                    notify.success("Password Successfully changed")
                    props.history.push("/login")
                })
                .catch(err => {
                    notify.error("something went wrong!")
                })
                .finally(()=>{
                    setisLoading(false)
                })
        },
        validate: values => {
            let errors = {}
            if(props.location.pathname !== "/dashboard/settings/change-password"){
                if (!values.password) {
                    errors.password = "Password must not be empty!"
                }
                if (!values.confirmPassword) {
                    errors.confirmPassword = "Confirm password must not be empty!"
                }
                if (values.confirmPassword != values.password) {
                    errors.confirmPassword = "Password doesn't match!"
                }
            }
            else{
                if(!values.oldPassword){
                    errors.oldPassword="Old password is required!"
                }
                if (values.confirmPassword != values.newPassword) {
                    errors.confirmPassword = "Password doesn't match!"
                }
                if(!values.newPassword){
                    errors.newPassword="Please enter new Password!"
                }  
            }
          
           
            
            return errors
        }
    })
    return (
        <>
            {
                props.location.pathname === "/dashboard/settings/change-password" ?
                    null : <Navbar></Navbar>
            }

            <div className={props.location.pathname === "/dashboard/settings/change-password" ? "manage-responsive" : "container"}>
                <div className="adjust-center adjust-margin">
                    <h2 className="primary-color" >{props.location.fromexternaluser ? "Enter Password" : "Change Password"}</h2>
                </div>
                <form className="forgotpassword" onSubmit={Formik.handleSubmit}>
                    {
                        props.location.pathname === "/dashboard/settings/change-password" ?
                            <>
                                <label htmlFor="password">Old Password</label>
                                <input type="password" id="password" className="form-control form-input"{...Formik.getFieldProps("oldPassword")} ></input>
                            </> : null
                    }
                    {
                        props.location.pathname === "/dashboard/settings/change-password" ?
                            <>
                                <label htmlFor="password">{props.location.fromexternaluser ? "Password" : "New Password"}</label>
                                <input type="password" id="password" className="form-control form-input"{...Formik.getFieldProps("newPassword")} ></input>
                                {Formik.errors.newPassword && Formik.touched.newPassword ? <div style={{ color: "red" }} className="errmsg">{Formik.errors.newPassword}</div> : null}
                            </> :
                            <>
                                <label htmlFor="password">{props.location.fromexternaluser ? "Password" : "New Password"}</label>
                                <input type="password" id="password" className="form-control form-input"{...Formik.getFieldProps("password")} ></input>
                                {Formik.errors.password && Formik.touched.password ? <div style={{ color: "red" }} className="errmsg">{Formik.errors.password}</div> : null}
                            </>
                    }
                    <label htmlFor="password" style={{ marginTop: "20px" }}>Confirm Password</label>
                    <input type="password" id="confirmPassword" className="form-control form-input" {...Formik.getFieldProps("confirmPassword")} ></input>
                    {Formik.errors.confirmPassword && Formik.touched.confirmPassword ? <div style={{ color: "red" }} className="errmsg">{Formik.errors.confirmPassword}</div> : null}
                    <div className="adjust-center" style={{ marginTop: "20px" }}>
                        <Submitbtn enabledLabel="Submit" isSubmitting={isLoading}></Submitbtn>
                    </div>
                </form>
            </div>
            {
                props.location.pathname === "/dashboard/settings/change-password" ?
                    null : <Footer></Footer>
            }

        </>
    )
}