import { useEffect, useRef, useState } from "react";
import { Form, Button, Container, Row, Col, Nav, Image } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Cliploader from "../../../../utils/clipLoader";
import { useFormik } from "formik";
import { validateHospital } from "./hospital.helper";
import Avatar from "../../../../assets/avatars.png";
import Select from 'react-select';

const Hospital = (props) => {

    const imageSelectRef = useRef();
    const [loading, setLoading] = useState(false);
    const [hospitalID, setHospitalID] = useState("")
    const [selectedImage, setImage] = useState("");
    const [selectedImgName, setImgName] = useState("");
    const [hospitalData, setHospitalData] = useState({
        name: "",
        description: "",
        establishedDate: "",
        panNo: "",
        contactNumber: "",
        mobileNumber: "",
        address: "",
        hospitalImage: "",
        link : "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const initialize = async () => {
        if (props.location.state && props.location.state.id != null) {
            await getHospitalById();
        }
    }

    useEffect(() => {
        initialize()
    }, [])

    const getHospitalById = () => {
        let id = props.location.state.id;
        if (id == null) return;

        setHospitalID(id)
        httpClient.GET("hospital/get/" + id, false, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    let data = resp.data.data;

                    if (data) {
                        let url = "http://202.51.74.219:8082/api/hospital/download/" + id;
                        setImage(url)

                        setHospitalData({
                            name: data.name,
                            email: data.email,
                            mobileNumber: data.mobilenumber,
                            contactNumber: data.contactnumber,
                            panNo: data.panno,
                            description: data.description,
                            establishedDate: data.establisheddate,
                            address: data.address,
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err);
                console.log(err.response)
            })
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: hospitalData,
        onSubmit: values => {
            console.log(values)
            if (hospitalID) {
                editHospitalDetail(values)

            } else {
                handleCreateHospital(values);
            }
        },
        validate: values => {
            let isEdit = hospitalID ? true : false;
            return validateHospital(values, isEdit);
        },
    })

    const handleCreateHospital = (values) => {
        try {
            setLoading(true)

            let formData = new FormData();
            if (values.hospitalImage) {
                formData.append("image", values.hospitalImage);
            }
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("establishedDate", values.establishedDate);
            formData.append("panNo", values.panNo);
            formData.append("contactNo", values.contactNumber);
            formData.append("phoneNumber", values.mobileNumber);
            formData.append("address", values.address);
            formData.append("hospitalEmail", values.email);
            formData.append("password", values.password);
            formData.append("confirmPassword", values.confirmPassword);

            httpClient.POST("hospital/create", formData, false, true, "formdata")
                .then(resp => {
                    if (resp.data.status) {
                        console.log(resp.data.data);
                        notify.success(resp.data.message)
                        props.history.push("/dashboard/hospital-table")
                    }
                })
                .catch(err => {
                    if (err.response) {
                        notify.error("Something went wrong")
                        setLoading(false)
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        catch (err) {
            console.log(err)
            notify.error("Something went wrong")
            setLoading(false)
        }
    }

    const editHospitalDetail = (values) => {
        console.log("edited")

        setLoading(true)

        let formData = new FormData();

        if (values.hospitalImage) {
            formData.append("image", values.hospitalImage);
        }
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("panNo", values.panNo);
        formData.append("contactNo", values.contactNumber);
        formData.append("phoneNumber", values.mobileNumber);
        formData.append("address", values.address);
        formData.append("establishedDate", values.establishedDate);
        formData.append("hospitalId", hospitalID)

        httpClient.PUT("hospital/update", formData, false, true, "formdata")
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    notify.success(resp.data.message);
                    props.history.push("/dashboard/hospital-table")
                    setLoading(false)

                }
            })
            .catch(err => {
                console.log(err.response)
                console.log(err.response.data.message)
                notify.error(err.response.data.message || "Something went wrong")
                setLoading(false)
            })

            .finally(() => {
                setLoading(false)
            })

    }

    const handleCancelEdit = () => {
        setHospitalID(null);
        setImage(null);
        setImgName(null);
        setHospitalData({
            name: "",
            description: "",
            establishedDate: "",
            panNo: "",
            contactNumber: "",
            mobileNumber: "",
            address: "",
            email: "",
            hospitalImage: "",
        })
        props.history.replace('/dashboard/add-hospital', null);

    }


    const handleAddImage = () => {
        imageSelectRef.current.click();
    }

    const handleChangeImage = (e) => {
        let files = e.target.files[0];
        let reader = new FileReader();
        formik.setFieldValue('hospitalImage', files);
        reader.onloadend = () => {
            setImage(reader.result.toString());
            setImgName(files.name);
        };
        reader.readAsDataURL(files);
    }

    const removeImage = () => {
        setImage(null);
        setImgName(null);
        formik.setFieldValue('hospitalImage', null);

    }

    return (
        <div>
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name"
                                    onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                {formik.touched.name && formik.errors.name ?
                                    <div className="error-message">{formik.errors.name}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Established Date</Form.Label>
                                <Form.Control type="date" name="establishedDate"
                                    onChange={formik.handleChange} value={formik.values.establishedDate} onBlur={formik.handleBlur} />
                                {formik.touched.establishedDate && formik.errors.establishedDate ?
                                    <div className="error-message">{formik.errors.establishedDate}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>PAN Number</Form.Label>
                                <Form.Control type="text" name="panNo"
                                    onChange={formik.handleChange} value={formik.values.panNo} onBlur={formik.handleBlur} />
                                {formik.errors.panNo && formik.touched.panNo ?
                                    <div className="error-message">{formik.errors.panNo}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" onChange={formik.handleChange}
                                    value={formik.values.address} onBlur={formik.handleBlur} />
                                {formik.errors.address && formik.touched.address ?
                                    <div className="error-message">{formik.errors.address}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="text" name="contactNumber"
                                    onChange={formik.handleChange} value={formik.values.contactNumber} onBlur={formik.handleBlur} />
                                {formik.errors.contactNumber && formik.touched.contactNumber ?
                                    <div className="error-message">{formik.errors.contactNumber}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="text" name="mobileNumber"
                                    onChange={formik.handleChange} value={formik.values.mobileNumber} onBlur={formik.handleBlur} />
                                {formik.errors.mobileNumber && formik.touched.mobileNumber ?
                                    <div className="error-message">{formik.errors.mobileNumber}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description"
                                    onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                                {formik.touched.description && formik.errors.description ?
                                    <div className="error-message">{formik.errors.description}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Link</Form.Label>
                                <Form.Control type="file" name="link"
                                    onChange={formik.handleChange} value={formik.values.link} onBlur={formik.handleBlur} />
                                {formik.touched.link && formik.errors.link ?
                                    <div className="error-message">{formik.errors.link}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                    </Row>

                    {hospitalID ?
                        <></>
                        :
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email"
                                        onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                                    {formik.errors.email && formik.touched.email ?
                                        <div className="error-message">{formik.errors.email}</div>
                                        : null}
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password"
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.errors.password && formik.touched.password ?
                                        <div className="error-message">{formik.errors.password}</div>
                                        : null}
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name="confirmPassword"
                                        onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.errors.confirmPassword && formik.touched.confirmPassword ?
                                        <div className="error-message">{formik.errors.confirmPassword}</div>
                                        : null}
                                </Form.Group>
                            </Col>
                        </Row>
                    }

                    <Row className="mb-3">
                        <Col md={5}>
                            <Form.Label>Choose Photo  </Form.Label>
                            <Button variant="info" onClick={handleAddImage}>Browse</Button>
                            <input onChange={(e) => handleChangeImage(e)} type="file" name="hospitalImage"
                                style={{ display: "none" }} ref={imageSelectRef} accept="image/png, image/jpg, image/jpeg" ></input>
                        </Col>

                        <Col md={5}>

                            <Image src={selectedImage} fluid className="image ml-3" ></Image>
                            {/* <div>
                                {selectedImgName}
                            </div> */}

                        </Col>
                        <Col md={2}>
                            <a style={{ color: 'red' }} onClick={removeImage}>x</a>
                        </Col>
                    </Row>

                    {loading == true ?
                        <Cliploader isLoading={loading} />
                        :
                        <div>
                            {hospitalID ?
                                <div className="textAlign-right">
                                    <Button variant="danger" type="button" onClick={handleCancelEdit}>
                                        Cancel
                                    </Button>
                                    <Button variant="info" type="submit" style={{ marginLeft: '10px' }}>
                                        Edit
                                    </Button>

                                </div>

                                :
                                <div className="textAlign-right">
                                    <Button variant="info" type="submit" >
                                        Create
                                    </Button>
                                </div>
                            }
                        </div>
                    }

                </Form>
            </Container>
        </div>
    )
}

export default Hospital


