import { useEffect, useState } from "react";
import EditProfile from "./components/editProfile";
import ViewProfile from "./components/viewProfile";
import { httpClient } from "../../../../utils/httpClient"
import "./userprofile.css";
const REACT_APP_BASE_URL=process.env.REACT_APP_BASE_URL

const UserProfile = (props) => {

    const [userDetails, setUserDetails] = useState("");
    const [isEdit, setIsEdit] = useState(false)


    const activateProfile = (edit) => {
        setIsEdit(edit)
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
                // console.log(err.response.data)
                console.log(err)
            })
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    useEffect(() => {
        if(!isEdit){
            getUserDetails();
        }
    }, [isEdit])

    const gotoView = ( ) => activateProfile(false);
    

    return (

        <div className="container-fluid page-body-wrapper">
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="profile-block">
                    <div className="profile-selection">
                        <div className={isEdit ==false? " profile-tab selected-tab" : "profile-tab"} onClick={()=>activateProfile(false)}><span>Profile</span> </div>
                        <div className={isEdit ==true? "profile-tab selected-tab" : "profile-tab"} onClick={()=>activateProfile(true)}><span>Edit Profile</span></div>
                    </div>

                    {isEdit == true ?
                        <EditProfile gotoView={()=>gotoView()}  {...userDetails}></EditProfile>
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