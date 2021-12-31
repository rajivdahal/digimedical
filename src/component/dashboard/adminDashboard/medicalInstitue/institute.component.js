
import { useFormik } from "formik";
import { useState, useEffect, useRef } from "react";
import { Container, Form, Row, Col, Button, Modal, Image } from "react-bootstrap";
import { httpClient } from '../../../../utils/httpClient';
import Cliploader from "../../../../utils/clipLoader";
import { notify } from "../../../../services/notify";
import MaterialTable from 'material-table'
import Edit from '@material-ui/icons/Edit';
import Tableicons from "../../../../utils/materialicons";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { validateInstitute } from "./institute.helper";

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
        state: "",
        street: "",
    })

    const getAllInstitute = async () => {
        await httpClient.GET("medical-institute/get-all", false, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    let result = resp.data.data;
                    setAllInstitute(result);
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    useEffect(() => {
        getAllInstitute();
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: instituteInfo,

        onSubmit: (values) => {
            console.log(values)
            if(instituteID){
                editMedicalInstitute(values)
            }else{
            createInstitute(values)
           
            }
        },

        validate: values => {
            let isEdit = instituteID ? true : false;
            return validateInstitute(values, isEdit);
        }

    })

    const createInstitute = (values) => {
        console.log("inside create")
        try {
            setIsLoading(true)
            let medicalInstitute = {
                name: values.name,
                contactNo: values.contactNo,
                city: values.city,
                state: values.state,
                street: values.street,
            }
            httpClient.POST("medical-institute/create", medicalInstitute, false, true)
                .then(resp => {
                    console.log(resp)
                    if (resp.data.status) {
                        notify.success(resp.data.message)
                        formik.resetForm();
                        getAllInstitute();

                    }
                })
                .catch(err => {
                    console.log(err.response)
                    notify.error(err.response.data.message)
                })
                .finally(() => {
                    setIsLoading(false)

                })

        }
        catch (err) {
            console.log(err)
            notify.error("Something went wrong.")
            setIsLoading(false)
        }

    }

    const handleClose = () => setShowModal(false);

    const instituteChangeStatus = (e, data) => {
        setShowModal(true);
        console.log(data);
        setInstituteStatus(data.status)
        setInstituteID(data.id);
    }

    const changeInstituteStatus = () => {
        setIsLoading(true)
        let status = instituteStatus == true ? false : true;
        httpClient.PUT("medical-institute/" + status + "/" + instituteID, {}, null, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    notify.success(resp.data.message)
                    handleClose();
                    getAllInstitute();
                    setIsLoading(false)

                }

            })
            .catch(err => {
                console.log(err);
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
        console.log(data)
        if (data) {
            setInstituteInfo({
                name: data.name ?? "",
                contactNo : data.contactno ?? "",
                state: data.state ?? 0,
                city: data.city ?? 0,
                street: data.street ?? 0,

            })
            window.scrollTo(0, 0)
        }
    }

    const editMedicalInstitute=(values)=>{
        try {
            setIsLoading(true)
            let medicalInstitute = {
                name: values.name,
                contactNo: values.contactNo,
                city: values.city,
                state: values.state,
                street: values.street,
                id : instituteID,
            }
            httpClient.PUT("medical-institute/update", medicalInstitute, false, true)
                .then(resp => {
                    console.log(resp)
                    if (resp.data.status) {
                        notify.success(resp.data.message)
                        setInstituteInfo({
                            name: "",
                            contactNo: "",
                            city: "",
                            state: "",
                            street: "",
                        })
                        getAllInstitute();
                        setInstituteID(null)

                    }
                })
                .catch(err => {
                    console.log(err.response)
                    notify.error(err.response.data.message)
                })
                .finally(() => {
                    setIsLoading(false)

                })

        }
        catch (err) {
            console.log(err)
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
            state: "",
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
                                    value={formik.values.name} onBlur={formik.handleBlur} />
                                {formik.touched.name && formik.errors.name ?
                                    <div className="error-message">{formik.errors.name}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group >
                                <Form.Label>Contact</Form.Label>
                                <Form.Control type="text" name="contactNo" onChange={formik.handleChange}
                                    value={formik.values.contactNo} onBlur={formik.handleBlur} />
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
                                <Form.Control type="text" name="state" onChange={formik.handleChange}
                                    value={formik.values.state} onBlur={formik.handleBlur} />
                                {/* <select class="form-control"  name="state"
                                    onChange={formik.handleChange} value={formik.values.state} onBlur={formik.handleBlur} >
                                    <option value="0">Province No.1</option>
                                    <option value="1">Province No.2</option>
                                    <option value="bagmati">Bagmati Province</option>
                                    <option value="3">Gandaki Province</option>
                                    <option value="4">Lumbini Province</option>
                                    <option value="5">Karnali Province</option>
                                    <option value="6">Sudurpashchim Province</option>
                                </select> */}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" name="city" onChange={formik.handleChange}
                                    value={formik.values.city} onBlur={formik.handleBlur} />
                                {formik.touched.city && formik.errors.city ?
                                    <div className="error-message">{formik.errors.city}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="text" name="street" onChange={formik.handleChange}
                                    value={formik.values.street} onBlur={formik.handleBlur} />
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
                        { title: "ID", field: "id" },
                        { title: 'Name', field: 'name', },
                        { title: 'Contact', field: 'contactno' },
                        { title: 'State', field: 'state' },
                        { title: 'City', field: 'city' },
                        { title: 'Street', field: 'street' },

                        {
                            title: 'Status', field: 'activeStatus',
                            render: rowData => rowData.status == true ?
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
                    <Modal.Body >Do you really want to change this subcategory status ?</Modal.Body>
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