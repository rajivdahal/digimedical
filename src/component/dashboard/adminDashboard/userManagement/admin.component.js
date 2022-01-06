import { useState, useEffect } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Cliploader from "../../../../utils/clipLoader";
import { useFormik } from "formik";
import { validateAdmin } from "./admin.helper";
import MaterialTable from 'material-table'
import Tableicons from "../../../../utils/materialicons";
import { Edit, Clear } from "@material-ui/icons";

const CreateAdmin = (props) => {

    const [loading, setLoading] = useState(false);
    const [adminId, setAdminId] = useState("")
    const [allAdmin, setAllAdmin] = useState([])
    const [adminInfo, setAdminInfo] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        dob: "",
        password: "",
        confirmPassword: "",
    })

    const getAllAdmin = () => {
        httpClient.GET("admin/get/all", false, true)
            .then(resp => {
                console.log(resp)
                let data = resp.data.data;
                setAllAdmin(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAllAdmin()
    }, [])


    const createAdmin = (values) => {
        setLoading(true)
        try {
            let data = {
                firstName: values.firstName,
                middleName: values.middleName,
                lastName: values.lastName,
                address: values.address,
                dob: values.dob,
                mobileNumber: values.mobileNumber,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            }

            httpClient.POST("admin/create", data, false, true)
                .then(resp => {
                    if (resp.data.status) {
                        console.log(resp.data.data);
                        notify.success(resp.data.message)
                        formik.resetForm();
                        getAllAdmin()
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
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: adminInfo,
        onSubmit: values => {
            if (adminId) {
                editAdminInfo(values)
            } else {
                createAdmin(values)
            }
        },
        validate: values => {
            let isEdit = adminId ? true : false;
            return validateAdmin(values, isEdit);
        },
    })

    const setAdminEditData = (e, data) => {
        setAdminId(data.id)
        if (data) {
            setAdminInfo({
                firstName: data.name,
                middleName: data.middleName,
                lastName: data.lastName,
                address: data.address,
                dob: data.dob,
                mobileNumber: data.mobileNumber
            })
            window.scrollTo(0, 0)
        }
    }

    const editAdminInfo = (values) => {
        setLoading(true)
        try {
            let data = {
                firstName: values.firstName,
                middleName: values.middleName,
                lastName: values.lastName,
                address: values.address,
                dob: values.dob,
                mobileNumber: values.mobileNumber,
            }

            httpClient.PUT("admin/update", data, false, true)
                .then(resp => {
                    if (resp.data.status) {
                        console.log(resp.data.data);
                        notify.success(resp.data.message)
                        formik.resetForm();
                        getAllAdmin()
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

    const handleCancelEdit = () => {
        setAdminId(null)
        setAdminInfo({
            firstName: "",
            middleName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            dob: "",
        })
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
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control type="date" name="dob"
                                    onChange={formik.handleChange} value={formik.values.dob} onBlur={formik.handleBlur} />
                                {formik.errors.dob && formik.touched.dob ?
                                    <div className="error-message">{formik.errors.dob}</div>
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
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address"
                                    onChange={formik.handleChange} value={formik.values.address} onBlur={formik.handleBlur} />
                                {formik.errors.address && formik.touched.address ?
                                    <div className="error-message">{formik.errors.address}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className="mb-3">

                        <Col md={12}>
                            {adminId ?
                                <></>
                                :
                                <Row>
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
                                            <Form.Control type="password" name="password" value={formik.values.password}
                                                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.password && formik.touched.password ?
                                                <div className="error-message">{formik.errors.password}</div>
                                                : null}
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" name="confirmPassword" value={formik.values.confirmPassword}
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

                    <div className="textAlign-right  mb-5">
                        {loading == true ?
                            <Cliploader isLoading={loading} />
                            :
                            <div>
                                {adminId ?
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


                <MaterialTable
                    title="Admins "
                    icons={Tableicons}
                    data={allAdmin}
                    columns={[
                        { title: "ID", field: "id" },
                        { title: 'Name', field: 'name' },
                        { title: 'DOB', field: 'dob' },
                        { title: 'Mobile Number', field: 'mobilenumber' },
                        { title: 'email', field: 'email' },
                        { title: 'Address', field: 'address' },

                    ]}

                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit Labtest',
                            onClick: (e, rowData) => { setAdminEditData(e, rowData) }
                        },

                    ]}

                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }
                    }}
                    isLoading={loading}
                />

            </Container>
        </div>
    )
}
export default CreateAdmin