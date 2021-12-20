import { useState } from "react";
import { Card } from "react-bootstrap";
import EditProfile from "./components/editProfile";
import ViewProfile from "./components/viewProfile";
import "./userprofile.css";

const UserProfile = (props) => {

    const [isEdit, setIsEdit] = useState(false);

    const handleEditProfile = () => {
        setIsEdit(true)
    }

    const handleViewProfile = () => {
        setIsEdit(false)
    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <div className="con-cover-group layout" >
                        <div className="con-group1 layout">
                            <div className="con-cover-group1 layout">
                                <div className="con-flex layout3">
                                    <div className="con-flex-row">
                                        <div className="con-content-box layout">
                                            <div className="con-content-box-col">
                                                <div className="con-cover-group2 layout">
                                                    <h4 className="con-profile layout cursor" onClick={handleViewProfile}>Profile</h4>
                                                </div>
                                            </div>
                                            <div className="con-content-box-spacer"></div>
                                            <h4 className="con-edit-profile layout cursor" onClick={handleEditProfile}>Edit Profile</h4>
                                        </div>
                                    </div>
                                    {isEdit ?
                                        <EditProfile></EditProfile>
                                        :
                                        <ViewProfile></ViewProfile>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>

        </div >
    )
}
export default UserProfile