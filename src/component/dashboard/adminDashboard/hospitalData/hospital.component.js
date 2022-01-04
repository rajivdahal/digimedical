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

    const [hospitalID,setHospitalID] = useState("")
    const [hospitalData, setHospitalData] = useState({
        name: "",
        description: "",     
        establishedDate: "",
        contactNumber: "",
        mobileNumber : "",
        vatNo: "",
        panNo: "",
        country: "",
        province: "0",
        district : "",
        street : "",
        localBodies : "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: hospitalData,
        onSubmit: values => {
            console.log(values)
            // if (hospitalID) {
            //     editDoctorDetail(values)

            // } else {
            //     handleCreateDoctor(values);
            // }
        },
        validate: values => {
            let isEdit = hospitalID ? true : false;
            return validateHospital(values, isEdit);
        },
    })

    return (
        <div>
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Group >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name"
                                    onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                {formik.touched.name && formik.errors.name ?
                                    <div className="error-message">{formik.errors.name}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description"
                                    onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                                    {formik.touched.description && formik.errors.description ?
                                    <div className="error-message">{formik.errors.description}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Established Date</Form.Label>
                                <Form.Control type="text" name="establishedDate"
                                    onChange={formik.handleChange} value={formik.values.establishedDate} onBlur={formik.handleBlur} />
                                {formik.touched.establishedDate && formik.errors.establishedDate ?
                                    <div className="error-message">{formik.errors.establishedDate}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>PAN Number</Form.Label>
                                <Form.Control type="text" name="panNumber"
                                    onChange={formik.handleChange} value={formik.values.panNumber} onBlur={formik.handleBlur} />
                                {formik.errors.panNumber && formik.touched.panNumber ?
                                    <div className="error-message">{formik.errors.panNumber}</div>
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
                                <Form.Control type="date" name="mobileNumber"
                                    onChange={formik.handleChange} value={formik.values.mobileNumber} onBlur={formik.handleBlur} />
                                {formik.errors.mobileNumber && formik.touched.mobileNumber ?
                                    <div className="error-message">{formik.errors.mobileNumber}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className="mb-3">

                    <Col md={4}>
                            <Form.Group >
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" name="country" onChange={formik.handleChange}
                                    value={formik.values.country} onBlur={formik.handleBlur} />
                                {formik.errors.country && formik.touched.country ?
                                    <div className="error-message">{formik.errors.country}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Province</Form.Label>
                                {/* <Form.Control type="text" name="province" onChange={formik.handleChange}
                                    value={formik.values.province} onBlur={formik.handleBlur} /> */}
                                <select class="select-control"  name="province" onChange={formik.handleChange} 
                                value={formik.values.province} onBlur={formik.handleBlur} >
                                    <option value="0">Province No.1</option>
                                    <option value="1">Province No.2</option>
                                    <option value="2">Bagmati Province</option>
                                    <option value="3">Gandaki Province</option>
                                    <option value="4">Lumbini Province</option>
                                    <option value="5">Karnali Province</option>
                                    <option value="6">Sudurpashchim Province</option>
                                </select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>District</Form.Label>
                                <Form.Control type="text" name="district" onChange={formik.handleChange}
                                    value={formik.values.district} onBlur={formik.handleBlur} />
                                {formik.touched.district && formik.errors.district ?
                                    <div className="error-message">{formik.errors.district}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        
                    </Row>

                    <Row className="mb-3">
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
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" name="city" onChange={formik.handleChange} 
                                value={formik.values.city} onBlur={formik.handleBlur} />
                                {formik.errors.city && formik.touched.city ?
                                    <div className="error-message">{formik.errors.city}</div>
                                    : null}
                            </Form.Group>
                        </Col>

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
                    </Row>

                    <Row className="mb-3">
                        

                        <Col md={8}>
                            {/* {doctorId ?
                                <></>
                                : */}
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
                            {/* } */}

                        </Col>

                    </Row>

                    <Row className="mb-3">

                    </Row>

                    <Button variant="info" type="submit" >
                        Create
                    </Button>

                </Form>
            </Container>
        </div>
    )
}

export default Hospital


