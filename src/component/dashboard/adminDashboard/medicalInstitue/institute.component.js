
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { httpClient } from '../../../../utils/httpClient';
import Cliploader from "../../../../utils/clipLoader";
import { notify } from "../../../../services/notify";
import MaterialTable from 'material-table'
import Edit from '@material-ui/icons/Edit';
import Tableicons from "../../../../utils/materialicons";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { validateInstitute } from "./institute.helper";
import "./institute.css"

const MedicalInstitute = (props) => {
    const [instituteID, setInstituteID] = useState("");
    const [instituteStatus, setInstituteStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [subCategory, setSubCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [allInstitute, setAllInstitute] = useState([]);
    const [instituteInfo, setInstituteInfo] = useState({
        name: "",
        contactNo: "",
        city: "",
        province: "0",
        street: "",
    })

    const getAllInstitute = async () => {
        try {
            let resp = await httpClient.GET("medical-institute/get-all", false, true)
            if (resp.data.status) {
                let result = resp.data.data;
                setAllInstitute(result);
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }        
        }

    }

    useEffect(() => {
        getAllInstitute();
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: instituteInfo,

        onSubmit: (values) => {
            console.log(values)
            if (instituteID) {
                editMedicalInstitute(values)
            } else {
                createInstitute(values)

            }
        },

        validate: values => {
            let isEdit = instituteID ? true : false;
            return validateInstitute(values, isEdit);
        }

    })

    const createInstitute = (values) => {
        try {
            setIsLoading(true)
            let medicalInstitute = {
                name: values.name,
                contactNo: values.contactNo,
                city: values.city,
                province: values.province,
                street: values.street,
            }
            httpClient.POST("medical-institute/create", medicalInstitute, false, true)
                .then(resp => {
                    if (resp.data.status) {
                        notify.success(resp.data.message)
                        formik.resetForm();
                        getAllInstitute()
                    }
                })
                .catch(err => {
                    if (err && err.response && err.response.data) {
                        notify.error(err.response.data.message || "Something went wrong");
                    }        
                })
                .finally(() => {
                    setIsLoading(false)
                })

        }
        catch (err) {
            notify.error("Something went wrong.")
            setIsLoading(false)
        }

    }

    const handleClose = () => setShowModal(false);

    const instituteChangeStatus = (e, data) => {
        setShowModal(true);
        setInstituteStatus(data.status)
        setInstituteID(data.id);
    }

    const changeInstituteStatus = () => {
        setIsLoading(true)
        let status = instituteStatus == true ? false : true;
        httpClient.PUT("medical-institute/" + status + "/" + instituteID, {}, null, true)
            .then(resp => {
                if (resp.data.status) {
                    notify.success(resp.data.message)
                    handleClose();
                    getAllInstitute();
                    setIsLoading(false)

                }

            })
            .catch(err => {
                notify.error("Something went wrong.")
                setIsLoading(false);
                handleClose()

            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const getEditData = (e, data) => {
        setInstituteID(data.id)
        if (data) {
            setInstituteInfo({
                name: data.name ?? "",
                contactNo: data.contactno ?? "",
                province: data.province ?? 0,
                city: data.city ?? 0,
                street: data.street ?? 0,

            })
            window.scrollTo(0, 0)
        }
    }

    const editMedicalInstitute = (values) => {
        try {
            setIsLoading(true)
            let medicalInstitute = {
                name: values.name,
                contactNo: values.contactNo,
                city: values.city,
                province: values.province,
                street: values.street,
                id: instituteID,
            }
            httpClient.PUT("medical-institute/update", medicalInstitute, false, true)
                .then(resp => {
                    if (resp.data.status) {
                        notify.success(resp.data.message)
                        setInstituteInfo({
                            name: "",
                            contactNo: "",
                            city: "",
                            province: "",
                            street: "",
                        })
                        getAllInstitute();
                        setInstituteID(null)

                    }
                })
                .catch(err => {
                    notify.error(err.response.data.message)
                })
                .finally(() => {
                    setIsLoading(false)

                })

        }
        catch (err) {
            notify.error("Something went wrong.")
            setIsLoading(false)
        }
    }

    const handleCancelEdit = () => {
        setInstituteID(null);
        setInstituteInfo({
            name: "",
            contactNo: "",
            city: "",
            province: "",
            street: "",
        })
    }

    return (
        <div>
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" onChange={formik.handleChange}
                                    value={formik.values.name} onBlur={formik.handleBlur} className='formControl' />
                                {formik.touched.name && formik.errors.name ?
                                    <div className="error-message">{formik.errors.name}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group >
                                <Form.Label>Contact</Form.Label>
                                <Form.Control type="text" name="contactNo" onChange={formik.handleChange}
                                    value={formik.values.contactNo} onBlur={formik.handleBlur} className='formControl' />
                                {formik.touched.contactNo && formik.errors.contactNo ?
                                    <div className="error-message">{formik.errors.contactNo}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>State</Form.Label>
                                <select class="select-control formControl" name="province" onChange={formik.handleChange}
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
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" name="city" onChange={formik.handleChange}
                                    value={formik.values.city} onBlur={formik.handleBlur} className='formControl' />
                                {formik.touched.city && formik.errors.city ?
                                    <div className="error-message">{formik.errors.city}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="text" name="street" onChange={formik.handleChange}
                                    value={formik.values.street} onBlur={formik.handleBlur} className='formControl'/>
                                {formik.errors.street && formik.touched.street ?
                                    <div className="error-message">{formik.errors.street}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    {isLoading ?
                        <Cliploader isLoading={isLoading} />
                        :
                        <div className="textAlign-right mb-5">
                            {instituteID ?
                                <div >
                                    <Button variant="info" type="submit">
                                        Edit
                                    </Button>
                                    <Button variant="danger" style={{ marginLeft: '10px' }} onClick={handleCancelEdit} >
                                        Cancel
                                    </Button>
                                </div>
                                :
                                <Button variant="info" type="submit">
                                    Create
                                </Button>
                            }
                        </div>
                    }
                </Form>

                <MaterialTable
                    columns={[
                        { title: '#', field: 'tableData.id', render:rowData => rowData.tableData.id+1},
                        { title: 'Name', field: 'name', },
                        { title: 'Contact', field: 'contactno' },
                        { title: 'State', field: 'province' },
                        { title: 'City', field: 'city' },
                        { title: 'Street', field: 'street' },

                        {
                            title: 'Status', field: 'activeStatus',
                            render: rowData => rowData.status === true ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>

                        },
                    ]}
                    data={allInstitute}
                    title="Medical Institute "
                    icons={Tableicons}
                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit Institute',
                            onClick: (e, rowData) => { getEditData(e, rowData) }
                        },
                        {
                            icon: DeleteOutline,
                            tooltip: 'Change Status',
                            onClick: (e, rowData) => { instituteChangeStatus(e, rowData) }
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

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title><b>Institute Status</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >Do you really want to change this institute status ?</Modal.Body>
                    <Modal.Footer>
                        {isLoading == true ?
                            <Cliploader isLoading={isLoading} />
                            :
                            <div>

                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="info" onClick={changeInstituteStatus} style={{ marginLeft: '8px' }} >
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

export default MedicalInstitute