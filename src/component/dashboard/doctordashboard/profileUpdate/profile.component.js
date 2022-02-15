import { useEffect, useState } from "react";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import EditProfile from "./editProfile";
import ViewProfile from "./viewProfile";

const DoctorProfile = (props) => {
    const[services,setServices] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState({
        email: "",
        specialist: "",
        gender: "0",
        image: "",
        prefix: "MD",
        liscencedate: "",
        description: "",
        mobilenumber: "",
        firstname : "",
        middlename : "",
        lastname :"",
        id : "",
        hospitalid : "",
        availabledays : "",
        starttime : "",
        endtime :"",
    });
    const [isEdit, setIsEdit] = useState(false)

    const activateProfile = (edit) => {
        setIsEdit(edit)
    }

    const getDoctorDetails = async () => {

        try {
        let resp=await httpClient.GET("doctor/get-profile",false,true);
            if (resp.data.status) {
                let result = resp.data.data;
                let data = result.details;
                let doctorServices = result.services;
                setDoctorDetails(data);
                setServices(doctorServices);

            }
        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
    };

    useEffect(() => {
        getDoctorDetails();
    }, [])

    useEffect(() => {
        if (!isEdit) {
            getDoctorDetails();
        }
    }, [isEdit])

    const gotoView = () => activateProfile(false);

    return (

        <div className="container-fluid page-body-wrapper">
            <div className="main-panel newdash_content">
                <div className="content-wrapper">
                    <div className="profile-block">
                        <div className="profile-selection">
                            <div className={isEdit == false ? " profile-tab selected-tab" : "profile-tab"} onClick={() => activateProfile(false)}><span>Profile</span> </div>
                            <div className={isEdit == true ? "profile-tab selected-tab" : "profile-tab"} onClick={() => activateProfile(true)}><span>Edit Profile</span></div>
                        </div>

                        {isEdit == true ?
                            <EditProfile gotoView={() => gotoView()}  {...doctorDetails} services={services}></EditProfile>
                            :
                            <ViewProfile {...doctorDetails} services={services} ></ViewProfile>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}
export default DoctorProfile