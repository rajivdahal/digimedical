import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Nav } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Cliploader from "../../../../utils/clipLoader";
import "./doctor.component.css"

const Createdoctor = (props) => {
    // const [loading, setLoading] = useState(false),
    // const [color, setColor] = useState("#000"),
    // const [doctorStatus, setDoctorStatus] = useState("");

    // all services
    const [services, setServices] = useState([]);

    // selectable services
    const [availableServices, setAvailableServices] = useState([]);
    const [doctorInfo, setDoctorInfo] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [loading, setLoading] = useState(false);
    const [doctorData, setDoctorData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        contactNumber: "",
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

    })

    const initialize = async () => {
        console.log(props)
        let allServices = await getServices();
        if (props.location.state && props.location.state.id != null) {
            await getDoctorById(allServices);
        }
    }

    useEffect(() => {
        initialize();
    }, [])

    const handleChange = (e) => {
        let tempDoctor = { ...doctorData, ...{ [e.target.name]: e.target.value } }
        setDoctorData(tempDoctor);
    }

    const getServices = async () => {
        let allServices = await httpClient.GET("services/true", false, true)
            .then(resp => {
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

        let tempData = { ...doctorData };
        tempData.serviceID = allServices[0].id;
        setServices(allServices);
        setAvailableServices(allServices);
        setDoctorData(tempData);
        return allServices;
    }

    const handleCreateDoctor = () => {
        setLoading(true)
        let selectedId = [];
        doctorData.doctorServices.forEach((service, index) => {
            selectedId.push(service.id)
        })

        let doctorDetail = {
            firstName: doctorData.firstName,
            middleName: doctorData.middleName,
            lastName: doctorData.lastName,
            email: doctorData.email,
            contactNumber: doctorData.contactNumber,
            prefix: doctorData.prefix,
            nmcNo: doctorData.nmcNumber,
            specialist: doctorData.specialist,
            description: doctorData.description,
            password: doctorData.password,
            confirmPassword: doctorData.confirmPassword,
            mobileNumber: doctorData.mobileNumber,
            liscenceDate: doctorData.licensedDate,
            serviceId: selectedId,
        }

        console.log(doctorDetail);
        httpClient.POST("doctor/create", doctorDetail, false, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    console.log(resp.data.data);
                    // setDoctorData({
                    //     firstName: "",
                    //     lastName: "",
                    //     middleName: "",
                    //     email: "",
                    //     contactNumber: "",
                    //     prefix: "",
                    //     nmcNumber: "",
                    //     specialist: "",
                    //     description: "",
                    //     password: "",
                    //     confirmPassword: "",
                    //     mobileNumber: "",
                    //     serviceID: "",
                    // })
                    notify.success(resp.data.message)
                    setLoading(false)
                    props.history.push("/dashboard/doctor-table")
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    notify.error(err.response.data.message)
                    setLoading(false)

                }
            })
    }

    const getDoctorById = (allServices) => {
        // get doctor id
        let id = props.location.state.id;
        console.log(id);
        if (id == null) return;
        setDoctorId(id)

        // get doctor details
        httpClient.GET("doctor/basic-info/" + id, false, true)
            .then(resp => {

                // get docotr services + basic details
                let responseData = resp.data.data;
                let data = responseData.basicDetails;
                let serviceData = responseData.services;

                // get services details from service data
                let savedServices = [], remainServices = [];
                allServices.forEach((service) => {
                    let found = serviceData.includes(service.id.toString());
                    if (found) {
                        savedServices.push(service);
                    } else {
                        remainServices.push(service)
                    }
                })

                if (data) {
                    setDoctorData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        middleName: data.middleName,
                        email: data.email,
                        prefix: data.prefix,
                        nmcNumber: data.nmcNo,
                        specialist: data.specialist,
                        description: data.description,
                        mobileNumber: data.mobileNumber,
                        doctorServices: savedServices,
                        serviceID: remainServices[0].id
                    })
                    setAvailableServices(remainServices);
                }

            })
            .catch(err => {
                console.log(err);
                // console.log(err.response)
            })

    }

    const editDoctorDetail = () => {
        setLoading(true)
        let selectedId = [];
        doctorData.doctorServices.forEach((service, index) => {
            selectedId.push(service.id)
        })
        let editedDoctorDetail = {
            firstName: doctorData.firstName,
            middleName: doctorData.middleName,
            lastName: doctorData.lastName,
            email: doctorData.email,
            prefix: doctorData.prefix,
            nmcNo: doctorData.nmcNumber,
            specialist: doctorData.specialist,
            description: doctorData.description,
            mobileNumber: doctorData.mobileNumber,
            liscenceDate: doctorData.licensedDate,
            serviceId: selectedId
        }

        console.log(editedDoctorDetail);
        httpClient.PUT("doctor/update/" + doctorId, editedDoctorDetail, false, true)
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
                notify.error(err.response.data.message)
                setLoading(false)

            })

    }

    const handleAddService = () => {
        let selectedService = services.filter((service) => {
            return (service.id == doctorData.serviceID)
        })
        let tempAvailable = availableServices.filter((service, index) => service.id != doctorData.serviceID);
        setAvailableServices(tempAvailable);
        if (tempAvailable.length > 0) {
            let doctorServiceArr = { ...doctorData }
            doctorServiceArr.doctorServices.push(selectedService[0]);
            doctorServiceArr.serviceID = tempAvailable[0].id;
            setDoctorData(doctorServiceArr);
        }

    }

    const removeService = (e, id) => {
        console.log(id)
        let remainingService = doctorData.doctorServices.filter((service) => {
            return (service.id != id)
        })

        console.log(remainingService);

        if (remainingService.length > 0) {
            let doctorServiceArr = { ...doctorData, ...{ doctorServices: remainingService } }
            let notSelected = [];
            services.forEach((service) => {

                let found = remainingService.includes(service);
                if (!found) {
                    notSelected.push(service)
                }
            })
            setDoctorData(doctorServiceArr)
            setAvailableServices(notSelected)
        }
    }

    return (
        <div >

            <Container>
                <Form >
                    <Row className="mb-3">
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Prefix</Form.Label>
                                <select class="form-select" aria-label="Default select example" name="prefix" onChange={handleChange} value={doctorData.prefix} >
                                    <option value="MD">MD</option>
                                    <option value="MBBS">MBBS</option>
                                    <option value="Both">Both</option>
                                </select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" name="firstName"
                                    onChange={handleChange} value={doctorData.firstName} />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Middle Name" name="middleName"
                                    onChange={handleChange} value={doctorData.middleName} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" name="lastName"
                                    onChange={handleChange} value={doctorData.lastName} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>NMC Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" name="nmcNumber"
                                    onChange={handleChange} value={doctorData.nmcNumber} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" name="mobileNumber"
                                    onChange={handleChange} value={doctorData.mobileNumber} />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Registered Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter Last Name" name="licensedDate"
                                    onChange={handleChange} value={doctorData.licensedDate} />
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className="mb-3">

                        <Col md={4}>
                            <Form.Label>Service </Form.Label>
                            <select class="form-select" aria-label="Default select example" name="serviceID" onChange={handleChange} >
                                {availableServices.map((service, index) => {
                                    return <option value={service.id} key={service.id}>{service.serviceName}</option>
                                })}
                            </select>
                        </Col>

                        <Col md={1}>
                            <Button variant="info" className="mt-4" onClick={handleAddService}>Add</Button>
                        </Col>

                        <Col md={1}></Col>

                    </Row>

                    <div className="mb-3 clearfix">

                        {doctorData.doctorServices.map((service, index) => {
                            return <span className="service" key={index} onClick={(e) => removeService(e, service.id)}>
                                <span>{service.serviceName}</span>
                            </span>
                        })}

                    </div>

                    <Row className="mb-3">

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Specialist</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" name="specialist"
                                    onChange={handleChange} value={doctorData.specialist} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" name="description" name="description"
                                    onChange={handleChange} value={doctorData.description} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Last Name" name="email"
                                    onChange={handleChange} value={doctorData.email} />
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
                                            <Form.Control type="password" placeholder="Enter Last Name" name="password"
                                                onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Last Name" name="confirmPassword"
                                                onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            } 


                        </Col>

                    </Row>

                    {/* <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label>Choose file :  </Form.Label>
                            <input className="d-none" type="file" />
                            <Button variant="primary" style={{ marginLeft: '10px' }} onClick={handleUpload}>Upload</Button>
                        </Col>

                    </Row> */}
                    {loading == true ?
                        <Cliploader isLoading={loading} />
                        :
                        <div>
                            {doctorId ?
                                <div className="textAlign-right">
                                    <Button variant="info" type="button" onClick={editDoctorDetail}>
                                        Edit
                                    </Button>
                                    <Button variant="info" type="button" style={{ marginLeft: '10px' }}>
                                        Cancel
                                    </Button>
                                </div>

                                :
                                <div className="textAlign-right">
                                <Button variant="info" type="button" onClick={handleCreateDoctor}>
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