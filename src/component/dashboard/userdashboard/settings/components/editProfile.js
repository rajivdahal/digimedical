import { Form, Formik, Field } from "formik";
import { useState, useRef, useEffect } from "react";
import { Col, Container, Row, Button, Image } from "react-bootstrap"
import { httpClient } from "../../../../../utils/httpClient"
import Avatar from "../../../../../assets/avatars.png"
import { notify } from "../../../../../services/notify";
import "./editProfile.css"
import "../userprofile.css"
const EditProfile = (props) => {
    const imageSelectRef = useRef();
    const [selectedImage, setImage] = useState("");
    const [userID, setUserID] = useState("")
    const [userProfile, setUserProfile] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        name: "",
        address: "",
        email: "",
        contactNo: "",
        dob: "",
        height: "",
        weight: "",
        previousDisease: "",
        fatherName: "",
        gender:  0,
        image: "",
        bloodGroup: "A+"
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
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            error = "Invalid email format!"
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

    const getUser = () => {
        let id = localStorage.getItem('userid');
        // console.log(id)
        console.log(props);
        if (props) {
            let url = "http://103.90.86.77:8082/api/download/" + id;
            setImage(url)
            setUserProfile({
                firstName: props.firstname,
                middleName: props.middlename,
                lastName: props.lastname,
                address: props.address,
                email: props.email,
                contactNo: props.mobilenumber,
                dob: props.dateofbirth,
                height: props.height,
                weight: props.weight,
                previousDisease: props.disease,
                fatherName: props.fathername,
                bloodGroup : props.bloodgroup,
                gender: props.gender,

            })
        }
    }
    useEffect(() => {
        getUser();
    }, [])

    const updateProfile = (values) => {
        let formData = new FormData();
        if (values.image) {
            formData.append("image", values.image);
        }
        if(values.middleName){
            formData.append("middleName", values.middleName);
        }
        if(values.previousDisease) {
            formData.append("previousDisease", values.previousDisease)
        }
        if(values.bloodGroup){
            formData.append("bloodGroup",values.bloodGroup)

        }
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("address", values.address);
        formData.append("weight", values.weight);
        formData.append("height", values.height);
        formData.append("gender", values.gender);
        formData.append("dobAd", values.dob);
        formData.append("mobileNumber", values.contactNo);
        formData.append("fatherName", values.fatherName);

        console.log(formData)
        httpClient.PUT("update-user", formData, false, true, "formdata")
            .then(resp => {
                console.log(resp);
                notify.success(resp.data.message)
                // getUser();
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const cancelProfileEdit = () => {
        setUserProfile({
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
    }

    const handleAddImage = () => {
        imageSelectRef.current.click();
    }

    const handleChangeImage = (e, setFieldValue) => {
        let files = e.target.files[0];
        let reader = new FileReader();
        setFieldValue('image', files);
        reader.onloadend = () => {
            setImage(reader.result.toString());
        };
        reader.readAsDataURL(files);
    }

    return (
        <div className="edit-profile">
            <Container>
                <Formik enableReinitialize={true}
                    initialValues={userProfile}

                    onSubmit={(values) => {
                        console.log(values);
                        updateProfile(values);
                    }}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>
                            <Row>
                                <Col md={3} >
                                    <div className="image-wrapper" >
                                        <Image src={selectedImage ? selectedImage : Avatar} fluid roundedCircle></Image>
                                        <Button variant="secondary" onClick={handleAddImage} className="change-photo">Change Photo</Button>
                                            <input onChange={(e) => handleChangeImage(e, setFieldValue)} type="file" name="image" 
                                            style={{ display: "none" }} ref={imageSelectRef}  ></input>
                                   
                                    </div>
                                    
                                </Col>

                                <Col md={9}>
                                    <Container>
                                        <Row>
                                            <Col md={4}>
                                                <div className=" form-group select-label">
                                                    <label > First Name : </label>
                                                    <Field name="firstName" validate={validateName} className="form-control profile-field" />
                                                    {errors.name && touched.name && <div className="error-message">{errors.name}</div>}
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className=" form-group select-label">
                                                    <label > Middle Name : </label>
                                                    <Field name="middleName" className="form-control profile-field" />
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className=" form-group select-label">
                                                    <label > Last Name : </label>
                                                    <Field name="lastName" validate={validateName} className="form-control profile-field" />
                                                    {errors.name && touched.name && <div className="error-message">{errors.name}</div>}
                                                </div>
                                            </Col>

                                            <Col md={6}>
                                                <div className=" form-group">
                                                    <label >Address : </label>
                                                    <Field name="address" validate={validateAddress} className="form-control profile-field" />
                                                    {errors.address && touched.address && <div className="error-message">{errors.address}</div>}
                                                </div>
                                            </Col>
                                            
                                            <Col md={6}>
                                                <div className=" form-group ">
                                                    <label >Email : </label>
                                                    <Field name="email" validate={validateEmail} className="form-control profile-field" />
                                                    {errors.email && touched.email && <div className="error-message">{errors.email}</div>}
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <label >Gender : </label>
                                                <Field class="form-control profile-field" as='select' name="gender">
                                                    <option value="0">Male</option>
                                                    <option value="1">Female</option>
                                                    <option value="2">Other</option>
                                                </Field>

                                            </Col>
                                            <Col md={4}>
                                            <label >Blood Group : </label>
                                                <Field class="form-control profile-field" as='select' name="bloodGroup">
                                                    <option value="A+">A-postivie</option>
                                                    <option value="A-">A-negative</option>
                                                    <option value="B+">B-postivite</option>
                                                    <option value="B-">B-negative</option>
                                                    <option value="O+">O-positive</option>
                                                    <option value="O-">O-negative</option>
                                                    <option value="AB+">AB-postive</option>
                                                    <option value="AB-">AB-negative</option>
                                                </Field>

                                            </Col>
                                            <Col md={4}>
                                                <div className=" form-group">
                                                    <label >Date Of Birth : </label>
                                                    <Field name="dob" validate={validateDob} className="form-control profile-field" type="date" />
                                                    {errors.dob && touched.dob && <div className="error-message">{errors.dob}</div>}
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className=" form-group">
                                                    <label >Weight : </label>
                                                    <Field name="weight" validate={validateWeight} className="form-control profile-field" />
                                                    {errors.weight && touched.weight && <div className="error-message">{errors.weight}</div>}
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className=" form-group">
                                                    <label >Height : </label>
                                                    <Field name="height" validate={validateHeight} className="form-control profile-field" />
                                                    {errors.height && touched.height && <div className="error-message">{errors.height}</div>}
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className=" form-group">
                                                    <label >Contact Number : </label>
                                                    <Field name="contactNo" validate={validateContactNo} className="form-control profile-field" />
                                                    {errors.contactNo && touched.contactNo && <div className="error-message">{errors.contactNo}</div>}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className=" form-group">
                                                    <label >Father's Name : </label>
                                                    <Field name="fatherName" validate={validateFatherName} className="form-control profile-field" />
                                                    {errors.fatherName && touched.fatherName && <div className="error-message">{errors.fatherName}</div>}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className=" form-group">
                                                    <label >Previous Diseases : </label>
                                                    <Field name="previousDisease" className="form-control profile-field" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>

                            </Row>

                            <Row className="mb-4">
                                <div className="textAlign-right">
                                    <Button type="button" className="cancel-btn" onClick={cancelProfileEdit}>
                                        Cancel
                                    </Button>
                                    <Button  type="submit" style={{ marginLeft: '8px' }}>
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