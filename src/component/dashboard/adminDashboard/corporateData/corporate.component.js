import Select from 'react-select'
import { useState, useEffect } from "react"
import { Form, Button, Container, Row, Col, Modal, Nav, Image } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import { useFormik } from "formik";
import { validateCorporate } from "./corporate.helper";
import MaterialTable from 'material-table'
import { Edit, Clear } from "@material-ui/icons";
import Cliploader from "../../../../utils/clipLoader";
import Tableicons from "../../../../utils/materialicons";
import "../button.css"
const CorporatePage = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [corporateID, setCorporateID] = useState("");
    const [corporateStatus, setCorporateStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [corporateData, setCorporateData] = useState([]);
    const [corporateType, setCorporateTypes] = useState([]);
    const [corporateInfo, setCorporateInfo] = useState({
        name: "",
        status: "",
        address: "",
        establishDate: "",
        panNumber: "",
        contactNumber: "",
        contactPersonName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNum: "",
        selectedType: {},
        typeId: "",
    })


    const getAllCorporate = () => {
        httpClient.GET("corporate/get/all", false, true)
            .then(resp => {
                console.log(resp)
                let data = resp.data.data;
                setCorporateData(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getCorporateType = async () => {
        let labtest = await httpClient.GET("corporate-types/get-all", false, true)
            .then(resp => {
                if (resp.data.status) {
                    let result = resp.data.data;
                    return result;
                }
            })
            .catch(err => {
                console.log(err)
            })

        let trueLabtest = labtest.filter((item, index) => {
            return (item.status == true)
        })
        let options = trueLabtest.map((test, index) => {
            return {
                label: test.name,
                value: test.id
            }
        })
        setCorporateTypes(options)
    }

    useEffect(() => {
        getAllCorporate();
        getCorporateType();
    }, [])

    const createCorporate = (values) => {
        try {
            setLoading(true)
            let corporateId = formik.values.selectedType.value;
            console.log(corporateId)
            let data = {
                name: values.name,
                // status : values.status,
                address: values.address,
                panNo: values.panNumber,
                contactNumber: values.contactNumber,
                establishDate: values.establishDate,
                contactPersonName: values.personName,
                mobileNumber: values.mobileNum,
                email: values.email,
                corporateTypeId : corporateId,
                password: values.password,
                confirmPassword: values.confirmPassword,
            }

            httpClient.POST("corporate/create", data, false, true)
                .then(resp => {
                    if (resp.data.status) {
                        console.log(resp.data.data);
                        notify.success(resp.data.message)
                        formik.resetForm();
                        getAllCorporate()
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

    const getEditInfo = (e, data) => {
        setCorporateID(data.id);
        if (data) {
            setCorporateInfo({
                name: data.name,
                address: data.address,
                contactNumber: data.contactnumber,
                personName: data.contactpersonname,
                panNumber: data.panno,
                establishDate: data.establishdate,
                mobileNum: data.mobileNumber
            })
            window.scrollTo(0, 0)
        }
    }

    const editCorporateInfo = (values) => {
        try {
            setLoading(true)
            let data = {
                name: values.name,
                address: values.address,
                panNo: values.panNumber,
                contactNumber: values.contactNumber,
                establishDate: values.establishDate,
                contactPersonName: values.personName,
                mobileNumber: values.mobileNum
            }
            httpClient.PUT("corporate/" + corporateID, data, false, true)
                .then(resp => {
                    console.log(resp)
                    if (resp.data.status) {
                        notify.success(resp.data.message);
                        setLoading(false)
                        getAllCorporate();
                        setCorporateInfo({
                            name: "",
                            address: "",
                            establishDate: "",
                            panNumber: "",
                            contactNumber: "",
                            mobileNum: "",
                            personName: "",
                        })
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
        setCorporateID(null);
        setCorporateInfo({
            name: "",
            address: "",
            establishDate: "",
            panNumber: "",
            contactNumber: "",
            mobileNum: "",
            personName: "",
        })

    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: corporateInfo,
        onSubmit: values => {
            if (corporateID) {
                editCorporateInfo(values)
            } else {
                createCorporate(values)
            }
        },
        validate: values => {
            let isEdit = corporateID ? true : false;
            return validateCorporate(values, isEdit);
        },
    })

    const handleClose = () => setShowModal(false)

    const deactivateCorporate = (e, data) => {
        setShowModal(true)
        setCorporateID(data.id);
        setCorporateStatus(data.status);
    }

    const changeCorporateStatus = () => {
        setLoading(true)
        let status = corporateStatus == 2 ? 3 : 2;

        httpClient.PUT("corporate/change/" + status + "/" + corporateID, {}, null, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    notify.success(resp.data.message)
                    handleClose();
                    getAllCorporate();
                    setLoading(false)
                }

            })
            .catch(err => {
                console.log(err);
                setLoading(false)

            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleTypeChange=(item)=>{
        console.log(item);
        formik.setFieldValue('selectedType', item)
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
                            <Form.Group >
                                <Form.Label>Type</Form.Label>
                                <Select
                                    value={formik.values.selectedType}
                                    options={corporateType}
                                    name="typeId"
                                    onChange={handleTypeChange}
                                >
                                </Select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Established Date</Form.Label>
                                <Form.Control type="date" name="establishDate"
                                    onChange={formik.handleChange} value={formik.values.establishDate} onBlur={formik.handleBlur} />
                                {formik.errors.establishDate && formik.touched.establishDate ?
                                    <div className="error-message">{formik.errors.establishDate}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group>
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
                                <Form.Label>Contact Person Name</Form.Label>
                                <Form.Control type="text" name="personName"
                                    onChange={formik.handleChange} value={formik.values.personName} onBlur={formik.handleBlur} />
                                {formik.errors.personName && formik.touched.personName ?
                                    <div className="error-message">{formik.errors.personName}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address"
                                    onChange={formik.handleChange} value={formik.values.address} onBlur={formik.handleBlur} />
                                {formik.errors.address && formik.touched.address ?
                                    <div className="error-message">{formik.errors.address}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="text" name="mobileNum" value={formik.values.mobileNum}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.errors.mobileNum && formik.touched.mobileNum ?
                                    <div className="error-message">{formik.errors.mobileNum}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        {corporateID ?
                            <></>
                            :
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
                        }

                    </Row>

                    <Row className="mb-3">

                        <Col md={12}>
                            {corporateID ?
                                <></>
                                :
                                <Row>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" name="password" value={formik.values.password}
                                                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.password && formik.touched.password ?
                                                <div className="error-message">{formik.errors.password}</div>
                                                : null}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
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

                    <div className="textAlign-right mb-3">
                        {loading == true ?
                            <Cliploader isLoading={loading} />
                            :
                            <div>
                                {corporateID ?
                                    <div >
                                        <Button className="cancel-button" type="button" onClick={handleCancelEdit}>
                                            <span>Cancel</span>
                                        </Button>
                                        <Button className="change-button" style={{ marginLeft: '10px' }} type="submit">
                                            Save
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
                    data={corporateData}
                    title="Corporate Details"
                    icons={Tableicons}
                    columns={[
                        { title: '#', field: 'tableData.id', render:rowData => rowData.tableData.id+1},
                        { title: 'Name', field: 'name' },
                        { title: 'PAN', field: 'panno' },
                        { title: 'Address', field: 'address', },
                        { title: 'Contact No', field: 'contactnumber' },
                        { title: 'Contact Person', field: 'contactpersonname' },
                        {
                            title: 'Status', field: 'status',
                            render: rowData => rowData.status.toString() == "2" ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>
                        },
                    ]}

                    actions={[

                        {
                            icon: Edit,
                            tooltip: 'Edit Corporate',
                            onClick: (e, rowData) => { getEditInfo(e, rowData) }
                        },
                        {
                            icon: Clear,
                            tooltip: 'Change Status',
                            onClick: (e, rowData) => { deactivateCorporate(e, rowData) }
                        }

                    ]}
                    isLoading={loading}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }
                    }}
                />

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title><b>Corporate Status</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >Do you really want to change this corporate status ?</Modal.Body>
                    <Modal.Footer>
                        {loading == true ?
                            <Cliploader isLoading={loading} />
                            :
                            <div>
                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="info" onClick={changeCorporateStatus} style={{ marginLeft: '8px' }} >
                                    Change Status
                                </Button>
                            </div>
                        }
                    </Modal.Footer>
                </Modal>

            </Container>
        </div>
    )
}
export default CorporatePage
