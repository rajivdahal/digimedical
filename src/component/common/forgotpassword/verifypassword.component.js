import Footer from "../../Footer/Footer"
import Navbar from "../../Navbar/Navbar"
import Submitbtn from "../Submitbtn/Submitbtn.component"
import "./verifypasssword.component.css"
import { useState } from "react"
import { httpClient } from "../../../utils/httpClient"
import { notify } from "../../../services/notify"
export const Verifypassword = (props) => {
    console.log("props are",props)
    const [isLoading,setisLoading]=useState(false)
    const [otp,setotp]=useState()
    const handlechange=(e)=>{
        console.log(e.target.value)
        setotp(e.target.value)
    }
    const handlesubmit=(e)=>{
        e.preventDefault()
        const data={}
        data.username=props.location.email;
        data.otp=otp
        console.log("data is",data)
        setisLoading(true)
        httpClient.PUT("verify-otp",data,false)
        .then(resp=>{
            notify.success("OTP matched,Change your password")
            props.history.push({
                pathname:"/change-password",
                username:props.location.email
            })
        })
        .catch(err=>{
            if(err.response.message==="OTP Does Not Match"){
                return notify.error("OTP doesn't match")
            }
           notify.error("Something went wrong!") 
        })
        .finally(()=>{
            setisLoading(false)
        })
    }
    return (
        <>
            <Navbar></Navbar>
            <div className="container">
                <div className="adjust-center adjust-margin">
                    <h2 className="primary-color" >Verify OTP</h2>
                    <p>Please check your email and confirm the OTP provided!</p>
                </div>
                <form className="forgotpassword" onSubmit={handlesubmit}>
                    <label htmlFor="OTP">OTP</label>
                    <input type="number" id="OTP" className="form-control form-input" onChange={handlechange}></input>
                    <div className="adjust-center" style={{ marginTop: "20px" }}>
                        <Submitbtn enabledLabel="Verify" isSubmitting={isLoading}></Submitbtn>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </>
    )
}