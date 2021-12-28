import { useState, useEffect } from "react";
import { Image, Row, Col, Container } from "react-bootstrap"
import Avatar from "../../../../../assets/avatars.png"
import "../userprofile.css"
import "./editProfile.css"
const ViewProfile = (props) => {

    const [selectedImage, setImage] = useState("");

    const getUser = () => {
        let id = localStorage.getItem('userid');
        // console.log(id)
        console.log(props);
        if (props) {
            let url = "http://103.90.86.77:8082/api/download/" + id;
            setImage(url)
        }
    }
    useEffect(() => {
        getUser();
    }, [])

    return (
        <Container>
            <Row>
                <Col md={3} >
                    <div >                        
                        <div className="image-profile textAlign-center" >
                            <Image src={selectedImage.status == false ? Avatar : selectedImage } fluid roundedCircle></Image>

                        </div>
                        <div className="textAlign-center">
                            <div className="credentials-name">{props.firstname} {props.middlename} {props.lastname}</div>
                            <div className="credentials-email">{props.email}</div>
                        </div>
                    </div>
                </Col>

                <Col md={9}>
                    {/* <Container> */}
                    <Row>
                        <Col md={6}>
                            <div className="info-block">
                                <span className="info-label">Role</span>
                                <span>:</span>
                                <span className="info-value">Patient</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="info-block">
                                <span className="info-label">Address </span>
                                <span>:</span>
                                <span className="info-value">{props.address}</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="info-block">
                                <span className="info-label">Date Of Birth</span>
                                <span>:</span>
                                <span className="info-value">{props.dateofbirth}</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="info-block">
                                <span className="info-label">Age</span>
                                <span>:</span>
                                <span className="info-value">{props.age}</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="info-block">
                                <span className="info-label">Height</span>
                                <span>:</span>
                                <span className="info-value">{props.height}</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="info-block">
                                <span className="info-label">Weight</span>
                                <span>:</span>
                                <span className="info-value">{props.weight}</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="info-block">
                                <span className="info-label">Blood Group</span>
                                <span>:</span>
                                <span className="info-value">{props.bloodgroup}</span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="info-block">
                                <span className="info-label">Gender</span>
                                <span>:</span>
                                <span className="info-value">{props.gender == "0" ? "Male" : "Female"}</span>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="info-block">
                                <span className="info-label">Contact</span>
                                <span>:</span>
                                <span className="info-value">{props.mobilenumber}</span>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="info-block">
                                <span className="info-label">Father's Name</span>
                                <span>:</span>
                                <span className="info-value">{props.fathername}</span>
                            </div>
                        </Col>

                    </Row>

                    {/* </Container> */}
                </Col>

            </Row>

        </Container>
    )

}

export default ViewProfile