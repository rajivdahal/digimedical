import { useEffect, useRef, useState } from "react";
import { Form, Button, Container, Row, Col, Nav, Image } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Cliploader from "../../../../utils/clipLoader";
import "./doctor.component.css"
import { useFormik } from "formik";
import { validateDoctor } from "./doctor.helper";
import Avatar from "../../../../assets/avatars.png";
import Select from 'react-select';
import { Link } from "react-router-dom";

const Createdoctor = (props) => {

    // all services
    const [services, setServices] = useState([]);
    const imageSelectRef = useRef();

    // const [doctorInfo, setDoctorInfo] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedImage, setImage] = useState("");
    const [selectedImgName, setImgName] = useState("");
    const [doctorData, setDoctorData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        prefix: "MD",
        nmcNumber: "",
        specialist: "",
        description: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        licensedDate: "",
        doctorImage: "",
        serviceID: "",
        doctorServices: [],
    })

    
    useEffect(() => {
        initialize();
    }, [])

    const initialize = async () => {
        let allServices = await getServices();
        if (props.location.state && props.location.state.id != null) {
            await getDoctorById(allServices);
        }
    }

    const getServices = async () => {
        let allServices = await httpClient.GET("services/true", false, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    let data = resp.data.data;
                    return data;
                }
            })
            .catch(err => {
                console.log("inside catch block")
                // console.log(err.response)
                return [];
            })
        
        console.log(allServices)
        let options = allServices.map((service,index)=>{
            return {
                label : service.serviceName,
                value : service.id
            }
        })
        setServices(options);
        return allServices;

    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: doctorData,
        onSubmit: values => {
            if (doctorId) {
                editDoctorDetail(values)

            } else {
                handleCreateDoctor(values);
            }
        },
        validate: values => {
            let isEdit = doctorId ? true : false;
            return validateDoctor(values, isEdit);
        },
    })



    const handleCreateDoctor = (values) => {
        try{
        setLoading(true)       
        let selectedId = [];
        values.doctorServices.forEach((service, index) => {
            selectedId.push(service.value)
        })

        let formData = new FormData();
        
        if (values.doctorImage) {
            formData.append("image", values.doctorImage);

        }
        formData.append("firstName", values.firstName);
        formData.append("middleName", values.middleName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("prefix", values.prefix);
        formData.append("nmcNo", values.nmcNumber);
        formData.append("specialist", values.specialist);
        formData.append("description", values.description);
        formData.append("password", values.password);
        formData.append("confirmPassword", values.confirmPassword);
        formData.append("liscenceDate", values.licensedDate);
        formData.append("mobileNumber", values.mobileNumber);
        formData.append("serviceId", selectedId);

        httpClient.POST("doctor/create", formData, false, true, "formdata")
            .then(resp => {
                if (resp.data.status) {
                    console.log(resp.data.data);
                    notify.success(resp.data.message)
                    props.history.push("/dashboard/doctor-table")
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
        catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    const getDoctorById = (allServices) => {
        
        // get doctor id
        let id = props.location.state.id;
        if (id == null) return;
        
        setDoctorId(id)

        // get doctor details
        httpClient.GET("doctor/basic-info/" + id, false, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    // get doctor services + basic details
                    let responseData = resp.data.data;
                    let data = responseData.basicDetails;
                    let serviceData = responseData.services;
                    console.log(serviceData);

                    // get services details from service data
                    let savedServices = [];
                    allServices.forEach((service) => {
                        let found = serviceData.filter((item) => {
                            return (item.id.toString() == service.id.toString())
                        })
                        if (found.length > 0) {
                            console.log(found)
                            savedServices.push({
                                label : service.serviceName,
                                value : service.id
                            });
                        } 
                    })

                    console.log(savedServices);
                    if (data) {

                        let url = "http://103.90.86.77:8082/api/doctor/download/" + id;
                        setImage(url)

                        setDoctorData({
                            firstName: data.firstName,
                            lastName: data.lastName,
                            middleName: data.middleName,
                            email: data.email,
                            prefix: data.prefix,
                            nmcNumber: data.nmcNo,
                            specialist: data.specialist,
                            description: data.description,
                            mobileNumber: data.mobilenumber,
                            licensedDate: data.liscenceDate,
                            doctorServices: savedServices,
                            serviceID: null,

                        })
                        setImgName(data.image);
                    }
                }
            })
            .catch(err => {
                console.log(err);
                console.log(err.response)
            })

    }

    const editDoctorDetail = (values) => {
        setLoading(true)
        let selectedId = [];
        values.doctorServices.forEach((service, index) => {
            selectedId.push(service.value)
        })

        let formData = new FormData();
        if (values.doctorImage) {
            formData.append("image", values.doctorImage);
        }
        formData.append("firstName", values.firstName);
        formData.append("middleName", values.middleName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("prefix", values.prefix);
        formData.append("nmcNo", values.nmcNumber);
        formData.append("specialist", values.specialist);
        formData.append("description", values.description);
        formData.append("liscenceDate", values.licensedDate);
        formData.append("mobileNumber", values.mobileNumber);
        formData.append("serviceId", selectedId);

        console.log(formData);
        httpClient.PUT("doctor/update/" + doctorId, formData, false, true, "formdata")
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    notify.success(resp.data.message);
                    props.history.push("/dashboard/doctor-table")
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
        setDoctorId(null);
        setDoctorData({
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            prefix: "MD",
            nmcNumber: "",
            specialist: "",
            description: "",
            password: "",
            confirmPassword: "",
            mobileNumber: "",
            licensedDate: "",
            serviceID: "",
            doctorServices: [],
            doctorImage: "",
        })
        setImage("");
        setImgName("");
        props.history.replace('/dashboard/create-doctor', null);


    }

    const handleAddImage = () => {
        imageSelectRef.current.click();
    }

    const handleChangeImage = (e) => {
        let files = e.target.files[0];
        let reader = new FileReader();
        formik.setFieldValue('doctorImage', files);
        reader.onloadend = () => {
            setImage(reader.result.toString());
            setImgName(files.name);
        };
        reader.readAsDataURL(files);
    }

    const removeImage=()=>{
        setImage(null);
        setImgName(null);
        formik.setFieldValue('doctorImage', null);
        
    }

    const handleServiceChange=(item)=>{
        console.log(item);
        formik.setFieldValue('doctorServices',item)
    }
    return (
        <div >
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Prefix</Form.Label>
                                <select class="form-select" aria-label="Default select example" name="prefix"
                                    onChange={formik.handleChange} value={formik.values.prefix} onBlur={formik.handleBlur} >
                                    <option value="MD">MD</option>
                                    <option value="MBBS">MBBS</option>
                                    <option value="Both">Both</option>
                                </select>
                               
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="firstName"
                                    onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur} />
                                {formik.touched.firstName && formik.errors.firstName ?
                                    <div className="error-message">{formik.errors.firstName}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        <Col md={3}>
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
                                <Form.Label>NMC Number</Form.Label>
                                <Form.Control type="text" name="nmcNumber"
                                    onChange={formik.handleChange} value={formik.values.nmcNumber} onBlur={formik.handleBlur} />
                                {formik.errors.nmcNumber && formik.touched.nmcNumber ?
                                    <div className="error-message">{formik.errors.nmcNumber}</div>
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

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Registered Date</Form.Label>
                                <Form.Control type="date" name="licensedDate"
                                    onChange={formik.handleChange} value={formik.values.licensedDate} onBlur={formik.handleBlur} />
                                {formik.errors.licensedDate && formik.touched.licensedDate ?
                                    <div className="error-message">{formik.errors.licensedDate}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className="mb-3">

                        <Col md={6}>
                            <Row className="mb-3">
                                <Col md={11}>
                                   <Form.Label>Service </Form.Label>
                                    
                                    <Select 
                                        value={formik.values.doctorServices}
                                        isMulti options={services} 
                                        name="serviceID"
                                        onChange={handleServiceChange} >
                                        
                                    </Select>                                   
                                </Col>
                            </Row>

                        </Col>

                        <Col md={6}>
                            <Row>
                                <Col md={5}>
                                    <Form.Label>Choose Photo  </Form.Label>
                                    <Button variant="info" onClick={handleAddImage}>Browse</Button>
                                    <input onChange={(e) => handleChangeImage(e)} type="file" name="doctorImage" 
                                    style={{ display: "none" }} ref={imageSelectRef}  accept="image/png, image/jpg, image/jpeg" ></input>
                                </Col>

                                <Col md={5}>
                                   
                                    <Image src={selectedImage ? selectedImage : Avatar} fluid className="image ml-3" roundedCircle ></Image>                                    
                                    <div>
                                        {selectedImgName}
                                    </div>
                                    
                                </Col>
                                <Col md={2}>
                                    <a style={{color:'red'}} onClick={removeImage}>x</a>

                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Specialist</Form.Label>
                                <Form.Control type="text" name="specialist"
                                    onChange={formik.handleChange} value={formik.values.specialist} onBlur={formik.handleBlur} />
                                {formik.errors.specialist && formik.touched.specialist ?
                                    <div className="error-message">{formik.errors.specialist}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description"
                                    onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                                {formik.errors.description && formik.touched.description ?
                                    <div className="error-message">{formik.errors.description}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

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

                        <Col md={8}>
                            {doctorId ?
                                <></>
                                :
                                <Row>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" name="password"
                                                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.password && formik.touched.password ?
                                                <div className="error-message">{formik.errors.password}</div>
                                                : null}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
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

                        </Col>

                    </Row>

                    <Row className="mb-3">

                    </Row>

                    {loading == true ?
                        <Cliploader isLoading={loading} />
                        :
                        <div>
                            {doctorId ?
                                <div className="textAlign-right">
                                    <Button variant="info" type="submit" >
                                        Edit
                                    </Button>
                                    <Button variant="danger" type="button" style={{ marginLeft: '10px' }} onClick={handleCancelEdit}>
                                        Cancel
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

export default Createdoctor