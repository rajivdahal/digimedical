import { useEffect, useState } from "react";
import EditProfile from "./components/editProfile";
import ViewProfile from "./components/viewProfile";
import { httpClient } from "../../../../utils/httpClient"
import "./userprofile.css";
import { notify } from "../../../../services/notify";

const UserProfile = (props) => {
    const [userDetails, setUserDetails] = useState("");
    const [isEdit, setIsEdit] = useState(false)


    const activateProfile = (edit) => {
        setIsEdit(edit)
    }

    const getUserDetails = () => {

        httpClient.GET("get-user-details", false, true)
            .then(resp => {
                if (resp.data.status) {
                    let details = resp.data.data;
                    setUserDetails(details);
                }
            })
            .catch(err => {
                if (err && err.response && err.response.data) {
                    notify.error(err.response.data.message || "Something went wrong");
                  }
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
            <div className="main-panel newdash_content">
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