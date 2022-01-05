import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import EditProfile from "./components/editProfile";
import ViewProfile from "./components/viewProfile";
import { httpClient } from "../../../../utils/httpClient"
import "./userprofile.css";

const UserProfile = (props) => {

    const [userDetails, setUserDetails] = useState("");
    const [isprofile, setisprofile] = useState({
        profile: true,
        editprofile: false
    })
    const activateProfile = () => {
        setisprofile({
            editprofile: false,
            profile: true
        })
    }
    const activateEditProfile = () => {
        setisprofile({
            editprofile: true,
            profile: false
        })
    }

    const getUserDetails = () => {

        httpClient.GET("get-user-details", false, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    let details = resp.data.data;
                    // console.log("user details is",details);
                    setUserDetails(details);
                }
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return (

        <div className="container-fluid page-body-wrapper">
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="profile-block">
                    <div className="profile-selection">
                        <div className={isprofile.profile ? " profile-tab selected-tab" : "profile-tab"} onClick={activateProfile}><span>Profile</span> </div>
                        <div className={isprofile.editprofile ? "profile-tab selected-tab" : "profile-tab"} onClick={activateEditProfile}><span>Edit Profile</span></div>
                    </div>

                    {isprofile.editprofile ?
                        <EditProfile {...userDetails}></EditProfile>
                        :
                        <ViewProfile {...userDetails}></ViewProfile>
                    }
                    </div>
                </div>
            </div>
        </div>









    )
}
export default UserProfile