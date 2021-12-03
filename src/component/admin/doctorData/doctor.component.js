import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Nav } from "react-bootstrap";
import { notify } from "../../../services/notify";
import { httpClient } from "../../../utils/httpClient";
import MaterialTable from 'material-table';
import Edit from '@material-ui/icons/Edit';
import tableIcons from "../../../material.icons/icons";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Add, RestoreOutlined } from "@material-ui/icons";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
const Doctor = (props) => {

    const [doctorId, setDoctorId] = useState("");
    const [doctor, setDoctor] = useState([]);
    const [doctorData, setDoctorData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        contactNumber: "",
        prefix: "",
        nmcNumber: "",
        specialist: "",
        description: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        licensedDate : "",
        serviceID : 1,

    })

    const handleChange = (e) => {
        let tempDoctor = { ...doctorData, ...{ [e.target.name]: e.target.value } }
        setDoctorData(tempDoctor);
    }

    const getDoctor = () => {
        httpClient.GET("doctor/getall")
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    setDoctor(resp.data.data)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        getDoctor();
        // setInputFile(document.getElementById("input-file") as HTMLInputElement);
    }, [])

    const handleCreateDoctor = () => {
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
            confrimpassword: doctorData.confirmPassword,
            mobileNumber: doctorData.mobileNumber,
            liscenceDate : doctorData.licensedDate,
            serviceId : doctorData.serviceID
        }
        httpClient.POST("doctor/create", doctorDetail)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    console.log(resp.data.data);
                    setDoctorData({
                        firstName: "",
                        lastName: "",
                        middleName: "",
                        email: "",
                        contactNumber: "",
                        prefix: "",
                        nmcNumber: "",
                        specialist: "",
                        description: "",
                        password: "",
                        confirmPassword: "",
                        mobileNumber: "",
                        serviceID : 1,
                    })
                    notify.success(resp.data.message)
                    getDoctor();
                }
            })
            .catch(err => {
                console.log(err.response.data);
                notify.error(err.response.data.message)
            })
    }

    const handleDeactivateDoctor = (e, data) => {
        console.log(data);
        let id = data.tableData.id;
        console.log(id)
        if (id) {
            setDoctorId(id);
        }
        httpClient.DELETE("doctor/delete/" + doctorId)
            .then(resp => {
                console.log(resp)
                if (resp.data.status == false) {
                    notify.success(resp.data.message)
                }
                getDoctor();
            })
            .catch(err => {
                console.log(err.response.data);
            })

    }
    const handleUpload = () => {
        // inputRef.current?.click();

    }


    const columns = [
        // { title : 'ID' , name : 'id'}
        { title: 'Doctor Name', field: 'name' },
        { title: 'Doctor Description', field: 'description' },
        { title: 'NMC', field: 'nmcNo', },
        { title: 'Prefix', field: 'prefix' },
        { title: 'Status', field: 'status' },

    ]

    return (
        <div>

            <Container>
                <Form className="mb-3">
                    <Row className="mb-3">
                    <Col md={2}>
                            <Form.Group>
                                <Form.Label>Prefix</Form.Label>
                                <select class="form-select" aria-label="Default select example" name="prefix" onChange={handleChange} >
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
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Middle Name" name="middleName"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" name="lastName"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">


                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>NMC Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" name="nmcNumber"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" name="mobileNumber"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Registered Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter Last Name" name="licensedDate"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>


                    </Row>

                    <Row className="mb-3">

                    <Col md={4}>
                            <Form.Label>Service </Form.Label>
                            <select class="form-select" aria-label="Default select example" onChange={handleChange} >
                                <option value="md">MD</option>
                                <option value="mbbs">MBBS</option>
                                <option value="both">Both</option>
                            </select>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Specialist</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" name="specialist"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" name="description" name="description"
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>
 
                    </Row>
                    <Row className="mb-3">
                    <Col md={4}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Last Name" name="email"
                                    onChange={handleChange} />
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
                    <Row className="mb-3">


                        <Col md={6}>
                            <Form.Label>Choose file :  </Form.Label>
                            <input className="d-none" type="file" />
                            <Button variant="primary" style={{ marginLeft: '10px' }} onClick={handleUpload}>Upload</Button>
                        </Col>

                    </Row>

                    <Button variant="info" type="button" onClick={handleCreateDoctor}>
                        Create
                    </Button>
                </Form>

                <MaterialTable
                    columns={columns}
                    data={doctor}
                    title="Doctor Details"
                    icons={tableIcons}
                    actions={[

                        {
                            icon: Clear,
                            tooltip: 'Change Status',
                            onClick: (e, rowData) => { handleDeactivateDoctor(e, rowData) }
                        },
                        {
                            icon: Add,
                            tooltip: 'Add Doctor',
                            isFreeAction: true,
                            // onClick: (e, rowData) => { handleCancelService(e, rowData.id) }
                        },
                        
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        filtering: false,
                        sorting: true,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }
                    }}
                />

            </Container>
        </div>
    )
}

export default Doctor