import { useState, useEffect, useRef } from "react"
import { Form, Button, Container, Row, Col, Nav, Image } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Cliploader from "../../../../utils/clipLoader";
import { useFormik } from "formik";
import Avatar from "../../../../assets/avatars.png";
import { validateStaff } from "./staff.helper";

const StaffTable = (props) => {

    const imageSelectRef = useRef();
    const [loading, setLoading] = useState(false);
    const [staffId, setStaffId] = useState("")
    const [selectedImage, setImage] = useState("");
    const [selectedImgName, setImgName] = useState("");
    const [staffInfo, setStaffInfo] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        streetName: "",
        localBodies: "Metropolitan",
        wardNo: "",
        post: "",
        gender: "",
        image: "",
    })


    useEffect(() => {
        initialize();
    }, [])

    const initialize = async () => {
        if (props.location.state && props.location.state.id != null) {
            await getStaffById();
        }
    }

    const createStaff = (values) => {
        try {
            setLoading(true)

            let formData = new FormData();

            if (values.image) {
                formData.append("image", values.image);

            }
            formData.append("firstName", values.firstName);
            formData.append("middleName", values.middleName);
            formData.append("lastName", values.lastName);
            // formData.append("email", values.email);
            formData.append("post", values.post);
            formData.append("streetName", values.streetName);
            formData.append("localBodies", values.localBodies);
            formData.append("wardNo", values.wardNo);
            formData.append("mobileNumber", values.mobileNumber);

            httpClient.POST("staff/create", formData, false, true, "formdata")
                .then(resp => {
                    if (resp.data.status) {
                        console.log(resp.data.data);
                        notify.success(resp.data.message)
                        props.history.push("/dashboard/staff-table")
                    }
                })
                .catch(err => {
                    if (err.response || err.response.data) {
                        notify.error(err.response.data.message || "Something went wrong")
                        setLoading(false)
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }


    const getStaffById = () => {
        let id = props.location.state.id;
        if (id == null) return;
        setStaffId(id);
        httpClient.GET("staff/get/" + id, false, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    let data = resp.data.data;

                    if (data) {

                        // let url = "http://103.90.86.77:8082/api/doctor/download/" + id;
                        // setImage(url)

                        setStaffInfo({
                            firstName: data.firstname,
                            lastName: data.lastname,
                            middleName: data.middlename,
                            email: data.email,
                            post: data.post,
                            wardNo: data.wardno,
                            localBodies: data.localbodies,
                            streetName: data.streetname,
                            mobileNumber: data.mobilenumber,


                        })
                        // setImgName(data.image);
                    }
                }
            })
            .catch(err => {
                console.log(err);
                console.log(err.response)
            })
    }

    const editStaffInfo = (values) => {
        try {
            setLoading(true)

            let formData = new FormData();

            if (values.image) {
                formData.append("image", values.image);

            }
            formData.append("firstName", values.firstName);
            formData.append("middleName", values.middleName);
            formData.append("lastName", values.lastName);
            // formData.append("email", values.email);
            formData.append("post", values.post);
            formData.append("streetName", values.streetName);
            formData.append("localBodies", values.localBodies);
            formData.append("wardNo", values.wardNo);
            formData.append("mobileNumber", values.mobileNumber);
            formData.append("id", staffId)

            httpClient.PUT("staff/update", formData, false, true, "formdata")
                .then(resp => {
                    console.log(resp)
                    if (resp.data.status) {
                        notify.success(resp.data.message);
                        props.history.push("/dashboard/staff-table")
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
        catch (err) {
            console.log(err)
            notify.error(err)
        }
    }

    const handleCancelEdit = () => {
        setStaffId(null);
        setStaffInfo({
            firstName: "",
            middleName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            streetName: "",
            localBodies: "",
            wardNo: "",
            post: "",
            gender: "",
            image: "",
        })
        props.history.replace('/dashboard/create-doctor', null);

    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: staffInfo,
        onSubmit: values => {
            if (staffId) {
                editStaffInfo(values)
            } else {
                createStaff(values)
            }
        },
        validate: values => {
            let isEdit = staffId ? true : false;
            return validateStaff(values, isEdit);
        },
    })

    const handleAddImage = () => {
        imageSelectRef.current.click();
    }

    const handleChangeImage = (e) => {
        let files = e.target.files[0];
        let reader = new FileReader();
        formik.setFieldValue('image', files);
        reader.onloadend = () => {
            setImage(reader.result.toString());
        };
        reader.readAsDataURL(files);
    }

    const removeImage = () => {
        setImage(null);
        setImgName(null);
        formik.setFieldValue('image', null);

    }


    return (
        <div>
            <Container>
                {/* <div><h3>Add Staff</h3></div> */}
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="firstName"
                                    onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur} />
                                {formik.touched.firstName && formik.errors.firstName ?
                                    <div className="error-message">{formik.errors.firstName}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control type="text" name="middleName"
                                    onChange={formik.handleChange} value={formik.values.middleName} onBlur={formik.handleBlur} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="lastName"
                                    onChange={formik.handleChange} value={formik.values.lastName} onBlur={formik.handleBlur} />
                                {formik.touched.lastName && formik.errors.lastName ?
                                    <div className="error-message">{formik.errors.lastName}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Post</Form.Label>
                                <Form.Control type="text" name="post"
                                    onChange={formik.handleChange} value={formik.values.post} onBlur={formik.handleBlur} />
                                {formik.errors.post && formik.touched.post ?
                                    <div className="error-message">{formik.errors.post}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        {/* <Col md={4}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email"
                                    onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                                {formik.errors.email && formik.touched.email ?
                                    <div className="error-message">{formik.errors.email}</div>
                                    : null}
                            </Form.Group>
                        </Col> */}
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

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Local Bodies</Form.Label>
                                <select class="form-select" name="localBodies"
                                    onChange={formik.handleChange} value={formik.values.localBodies} onBlur={formik.handleBlur} >
                                    <option value="0">Metropolitan</option>
                                    <option value="1">Sub Metropolitan</option>
                                    <option value="2">Municipality</option>
                                    <option value="3">VDC</option>

                                </select>
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className="mb-3">
                        {/* <Col md={4}>
                            <Form.Group>
                                <Form.Label>Local Bodies</Form.Label>
                                <select class="form-select"  name="localBodies"
                                    onChange={formik.handleChange} value={formik.values.localBodies} onBlur={formik.handleBlur} >
                                    <option value="0">Metropolitan</option>
                                    <option value="1">Sub Metropolitan</option>
                                    <option value="2">Municipality</option>
                                    <option value="3">VDC</option>

                                </select>
                            </Form.Group>
                        </Col> */}

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Street Name</Form.Label>
                                <Form.Control type="text" name="streetName"
                                    onChange={formik.handleChange} value={formik.values.streetName} onBlur={formik.handleBlur} />
                                {formik.errors.streetName && formik.touched.streetName ?
                                    <div className="error-message">{formik.errors.streetName}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Ward No.</Form.Label>
                                <Form.Control type="text" name="wardNo"
                                    onChange={formik.handleChange} value={formik.values.wardNo} onBlur={formik.handleBlur} />
                                {formik.errors.wardNo && formik.touched.wardNo ?
                                    <div className="error-message">{formik.errors.wardNo}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className="mb-3">

                        <Col md={6}>
                            <Row>
                                <Col md={5}>
                                    <Form.Label>Choose Photo  </Form.Label>
                                    <Button variant="info" onClick={handleAddImage}>Browse</Button>
                                    <input onChange={(e) => handleChangeImage(e)} type="file" name="image"
                                        style={{ display: "none" }} ref={imageSelectRef} accept="image/png, image/jpg, image/jpeg" ></input>
                                </Col>

                                <Col md={5}>

                                    <Image src={selectedImage ? selectedImage : Avatar} fluid className="image ml-3" roundedCircle ></Image>
                                    <div>
                                        {selectedImgName}
                                    </div>

                                </Col>
                                <Col md={2}>
                                    <a style={{ color: 'red' }} onClick={removeImage}>x</a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>


                    <div className="textAlign-right">
                        {loading == true ?
                            <Cliploader isLoading={loading} />
                            :
                            <div>
                                {staffId ?
                                    <div >
                                        <Button variant="info" type="submit" >
                                            Edit
                                        </Button>
                                        <Button variant="danger" type="button" style={{ marginLeft: '10px' }} onClick={handleCancelEdit}>
                                            Cancel
                                        </Button>
                                    </div>

                                    :
                                    <div >
                                        <Button variant="info" type="submit" >
                                            Create
                                        </Button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </Form>

            </Container>
        </div>
    )
}
export default StaffTable