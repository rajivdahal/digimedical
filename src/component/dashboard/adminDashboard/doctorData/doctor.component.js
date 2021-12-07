import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Nav } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import ClipLoader from "react-spinners/ClipLoader";


const Createdoctor = (props) => {
    // const [loading, setLoading] = useState(false),
    // const [color, setColor] = useState("#000"),
    // const [doctorStatus, setDoctorStatus] = useState("");

    // all services
    const [services, setServices] = useState([]);

    // selectable services
    const [availableServices, setAvailableServices] = useState([]);

    const [doctorId, setDoctorId] = useState("");
    const [doctorData, setDoctorData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        contactNumber: "",
        prefix: "md",
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

    const handleChange = (e) => {
        let tempDoctor = { ...doctorData, ...{ [e.target.name]: e.target.value } }
        setDoctorData(tempDoctor);
    }

    const getServices = () => {
        httpClient.GET("services/true")
            .then(resp => {
                if (resp.data.status) {
                    let data = resp.data.data;
                    let tempData = { ...doctorData };
                    tempData.serviceID = data[0].id;
                    setServices(data);
                    setAvailableServices(data);
                    setDoctorData(tempData);
                }
            })
            .catch(err => {
                console.log("inside catch block")
                // console.log(err.response)
            })

    }

    const getDoctorData = () => {
        console.log(props)
        let data = props.history.location.state;
        setDoctorId(data.id)
        console.log(data);
        console.log(doctorId)
        if (data) {
            setDoctorData({
                firstName: data.firstName,
                lastName: data.lastName,
                middleName: data.middleName,
                nmcNumber: data.nmcNo,
                description: data.description,
            })
        }

    }

    useEffect(() => {

        getServices();
        // if(props){
        // getDoctorData();
        // }
    }, [])

    const handleCreateDoctor = () => {


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
        httpClient.POST("doctor/create", doctorDetail)
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
                    // setLoading(false)
                    props.history.push("/doctor-table")
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    notify.error(err.response.data.message)
                }
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


    // const handleUpload = () => {
    //     // inputRef.current?.click();

    // }

    return (
        <div>

            <Container>
                <Form className="mb-3 mt-5">
                    <Row className="mb-3">
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Prefix</Form.Label>
                                <select class="form-select" aria-label="Default select example" name="prefix" onChange={handleChange} value={doctorData.prefix} >
                                    <option value="md">MD</option>
                                    <option value="mbbs">MBBS</option>
                                    <option value="both">Both</option>
                                </select>
                                {/* <Form.Control type="text" placeholder="Enter Last Name" name="prefix"
                                    onChange={handleChange} /> */}
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
                            <Button className="mt-4" onClick={handleAddService}>Add</Button>
                        </Col>

                        <Col md={1}></Col>

                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            {doctorData.doctorServices.map((service, index) => {
                                return <div key={index} className="m"><p>{service.serviceName}</p>
                                </div>
                            })}

                        </Col>

                        <Col md={1}></Col>

                    </Row>

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
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Last Name" name="password"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Last Name" name="confirmPassword"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label>Choose file :  </Form.Label>
                            <input className="d-none" type="file" />
                            <Button variant="primary" style={{ marginLeft: '10px' }} onClick={handleUpload}>Upload</Button>
                        </Col>

                    </Row> */}

                    {doctorId ?
                        <div>
                            <Button variant="info" type="button" >
                                Edit
                            </Button>
                            <Button variant="info" type="button">
                                Cancel
                            </Button>
                        </div>

                        :

                        <Button variant="info" type="button" onClick={handleCreateDoctor}>
                            Create
                        </Button>
                    }
                </Form>

                {/* <ClipLoader color={color} loading={loading} size={150} /> */}

            </Container>
        </div>
    )
}

export default Createdoctor