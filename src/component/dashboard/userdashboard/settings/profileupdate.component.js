import { useState } from "react";
// import { Card } from "react-bootstrap";
// import EditProfile from "./components/editProfile";
// import ViewProfile from "./components/viewProfile";
import "./userprofile.css";

const UserProfile = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [isprofile, setisprofile] = useState({
        profile: true,
        editprofile: false
    })

    const handleEditProfile = () => {
        setIsEdit(true)
    }

    const handleViewProfile = () => {
        setIsEdit(false)
    }
    const activateProfile = () => {
        setisprofile((prevvalue) => {
            return {
                editprofile: false,
                profile: true
            }
        })
    }
    const activateEditProfile = () => {
        setisprofile((prevvalue) => {
            return {
                editprofile: true,
                profile: false
            }
        })
    }
    return (
        <div className="adj-position">
            <div className="profile-container">
                <div className="profile-selection">
                    <div className={isprofile.profile ? "editProfile-tab profile-tab" : "editProfile-tab"} onClick={activateProfile}><span>Profile</span> </div>
                    <div className={isprofile.editprofile ? "editProfile-tab profile-tab" : "editProfile-tab"} onClick={activateEditProfile}><span>Edit Profile</span></div>
                </div>
                {
                    isprofile.profile ? <>
                        <div className="profile-body">
                            <div className="profile-body-left">
                                <img src="/dashboard/images/logo.png" alt="hello"></img>
                                <div className="credentials">
                                    <div className="credentials-name">Peter Parker</div>
                                    <div className="credentials-email">Spiderpeter@gmail.com</div>
                                </div>
                            </div>
                            <div className="profile-body-right">
                                <div className="profile-body-right-left">
                                    <div className="profile-body-right-wrapper">
                                        <div className="profile-details">
                                            <div>Age</div>
                                            <div>:</div>
                                            <div>22</div>
                                        </div>
                                        <div className="profile-details">
                                            <div>Role</div>
                                            <div>:</div>
                                            <div>Patient</div>
                                        </div>
                                        <div className="profile-details">
                                            <div>Age</div>
                                            <div>:</div>
                                            <div>22</div>
                                        </div>
                                        <div className="profile-details">
                                            <div>Contact</div>
                                            <div>:</div>
                                            <div>9840095855</div>
                                        </div>
                                        <div className="profile-details">
                                            <div>Blood Group</div>
                                            <div>:</div>
                                            <div>A+ve</div>
                                        </div>
                                        <div className="profile-details">
                                            <div>Address</div>
                                            <div>:</div>
                                            <div>Jhapa</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-body-right-right">
                                    <div className="profile-body-right-wrapper">
                                        <div className="profile-details">
                                            <div>Address</div>
                                            <div>:</div>
                                            <div>Jhapa</div>
                                        </div>
                                        <div className="profile-details">
                                            <div>Gender</div>
                                            <div>:</div>
                                            <div>Male</div>
                                        </div>

                                        <div className="profile-details">
                                            <div>Height</div>
                                            <div>:</div>
                                            <div>5.6ft</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </> :
                        <>

                            <div className="profile-body-left">
                                <img src="/dashboard/images/logo.png" alt="hello"></img>

                            </div>
                            <div className="profile-body-right">
                                <div className="profile-body-right-left">
                                    <div className="profile-body-right-wrapper">



                                    </div>
                                </div>
                                <div className="profile-body-right-right">
                                    <div className="profile-body-right-wrapper">
                                        <div>
                                            <label htmlFor="name">Name:</label>
                                            <br />
                                            <input className="edit-profile-input"></input>
                                        </div>
                                        <div>
                                            <label htmlFor="name">Email:</label>
                                            <br />
                                            <input className="edit-profile-input"></input>
                                        </div>
                                        <div>
                                            <label htmlFor="name">Gender:</label>
                                            <br />
                                            <select className="edit-profile-input">
                                                <option></option>
                                            </select>

                                        </div>
                                        <div>
                                            <label htmlFor="name">Date of Birth:</label>
                                            <br />
                                            <input className="edit-profile-input" type="date"></input>

                                        </div>
                                        <div>
                                            <label htmlFor="name">Height:</label>
                                            <br />
                                            <input className="edit-profile-input"></input>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </>

                }


            </div>
        </div >
    )
}
export default UserProfile