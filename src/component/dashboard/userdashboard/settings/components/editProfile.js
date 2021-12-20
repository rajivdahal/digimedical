import { Form, Formik, Field } from "formik";
import { useState,useRef } from "react";
import { Col, Container, Row, Button, Image } from "react-bootstrap"
import { httpClient } from "../../../../../utils/httpClient";
import "./editProfile.css"
import Avatar from "../../../../../assets/avatars.png"
const EditProfile = () => {
    const imageSelectRef = useRef();
    const [selectedImage, setImage] = useState("");

    const [userProfile, setUserProfile] = useState({
        // firstName: "",
        // middleName: "",
        // lastName: "",
        name: "",
        address: "",
        email: "",
        contactNo: "",
        dob: "",
        height: "",
        weight: "",
        previousDisease: "",
        fatherName: "",
        gender: "",
        image: "",
    })

    function validateName(value) {
        let error;
        if (!value) {
            error = 'Required!';
        }
        return error;
    }
    function validateEmail(value) {
        let error;
        if (!value) {
            error = "Required!"
        }
        return error;
    }

    function validateAddress(value) {
        let error;
        if (!value) {
            error = "Required!"
        }
        return error;
    }
    function validateContactNo(value) {
        let error;
        if (!value) {
            error = "Required!"
        } else if (("" + value).length != 10) {
            error = "Mobile Number must be of 10 digits!"
        }
        else if (("" + value).includes('-')) {
            error.contactNo = "Mobile Number can't be Negative!"
        }
        return error;
    }
    function validateWeight(value) {
        let error;
        if (!value) {
            error = "Required!"
        }
        return error;
    }
    function validateHeight(value) {
        let error;
        if (!value) {
            error = "Required!"
        }
        return error;
    }

    function validateGender(value) {
        let error;
        if (!value) {
            error = "Required!"
        }
        return error;
    }

    function validateFatherName(value) {
        let error;
        if (!value) {
            error = "Required!"
        }
        return error;
    }

    function validateDob(value) {
        let error;
        if (!value) {
            error = "Required!"
        }
        return error;
    }

    function validateBloodgroup(value) {
        let error;
        if (!value) {
            error = "Required!"
        }
        return error;
    }

    const updateProfile = (values) => {
        let formData = new FormData();
        if (values.image) {
            formData.append("image", values.image);
        }
        // formData.append("firstName", values.firstName);
        formData.append("name", values.name);
        // formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("address", values.address);
        formData.append("weight", values.weight);
        formData.append("height", values.height);
        formData.append("gender", values.gender);
        formData.append("dob", values.dob);
        formData.append("contactNo", values.contactNo);

        // httpClient.PUT("update-user/",formData,false,true,"formData")
        // .then(resp => {
        //     console.log(resp)
        // })
        // .catch(err =>{
        //     console.log(err.response)
        // })
    }

    return (
        <div>

            <Container>

                <Formik enableReinitialize={true}
                    initialValues={userProfile}

                    onSubmit={(values, { resetForm ,setFieldValue}) => {
                        console.log(values);
                        updateProfile(values);

                    }}
                >

                    {({ errors, touched }) => (
                        <Form>
                            <Row>
                                <Col md={3} >
                                    <Container>

                                        <div className="con-flex1-col textAlign-center">
                                            <div className="con-flex layout">
                                                <div className="con-flex2-row">
                                                    <div className="con-cover-group3 layout" >
                                                        <Image src={Avatar} fluid className="profile-image" roundedCircle ></Image>
                                                    </div>
                                                </div>
                                                <h4 className="con-peter-parker layout">Peter Parker</h4>
                                                <div className="con-text-body layout">
                                                    Spideypeter@gmail.com
                                                </div>
                                            </div>
                                        </div>
                                    </Container>
                                </Col>

                                <Col md={9}>
                                    <Container>
                                        <Row>
                                            <Col md={6}>
                                                <div className=" form-group select-label">
                                                    <label >Name : </label>
                                                    <Field name="name" validate={validateName} className="form-control" />
                                                    {errors.name && touched.name && <div className="error-message">{errors.name}</div>}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className=" form-group select-label">
                                                    <label >Email : </label>
                                                    <Field name="email" validate={validateEmail} className="form-control" />
                                                    {errors.email && touched.email && <div className="error-message">{errors.email}</div>}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className=" form-group">
                                                    <label >Address : </label>
                                                    <Field name="address" validate={validateAddress} className="form-control" />
                                                    {errors.address && touched.address && <div className="error-message">{errors.address}</div>}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className=" form-group">
                                                    <label >Contact Number : </label>
                                                    <Field name="contactNo" validate={validateContactNo} className="form-control" />
                                                    {errors.contactNo && touched.contactNo && <div className="error-message">{errors.contactNo}</div>}
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className=" form-group">
                                                    <label >Gender : </label>
                                                    <Field name="gender" validate={validateGender} className="form-control" />
                                                    {errors.gender && touched.gender && <div className="error-message">{errors.gender}</div>}
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className=" form-group">
                                                    <label >Blood Group : </label>
                                                    <Field name="bloodGroup" validate={validateBloodgroup} className="form-control" />
                                                    {errors.bloodGroup && touched.bloodGroup && <div className="error-message">{errors.bloodGroup}</div>}
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className=" form-group">
                                                    <label >Date Of Birth : </label>
                                                    <Field name="dob" validate={validateDob} className="form-control" type="date" />
                                                    {errors.dob && touched.dob && <div className="error-message">{errors.dob}</div>}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className=" form-group">
                                                    <label >Weight : </label>
                                                    <Field name="weight" validate={validateWeight} className="form-control" />
                                                    {errors.weight && touched.weight && <div className="error-message">{errors.weight}</div>}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className=" form-group">
                                                    <label >Height : </label>
                                                    <Field name="height" validate={validateHeight} className="form-control" />
                                                    {errors.height && touched.height && <div className="error-message">{errors.height}</div>}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className=" form-group">
                                                    <label >Father's Name : </label>
                                                    <Field name="fatherName" validate={validateFatherName} className="form-control" />
                                                    {errors.fatherName && touched.fatherName && <div className="error-message">{errors.fatherName}</div>}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className=" form-group">
                                                    <label >Previous Diseases : </label>
                                                    <Field name="previousDisease" className="form-control" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>

                            </Row>

                            <Row>
                                <div className="textAlign-right">
                                    <Button variant="danger" type="button">
                                        Cancel
                                    </Button>
                                    <Button variant="info" type="submit" style={{ marginLeft: '8px' }}>
                                        Save Changes
                                    </Button>
                                </div>
                            </Row>

                        </Form>
                    )}
                </Formik>


            </Container>

        </div>
    )

}

export default EditProfile