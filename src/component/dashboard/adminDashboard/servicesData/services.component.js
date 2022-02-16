import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { notify } from "../../../../services/notify";
import MaterialTable from 'material-table'
import Edit from '@material-ui/icons/Edit';
import Tableicons from "../../../../utils/materialicons";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import "./services.component.css";
import { useFormik } from "formik";
import ServiceApi from "./services.service";
import { validateService } from "./service.helper";
import Cliploader from "../../../../utils/clipLoader";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const Createservices = (props) => {
    const imageSelectRef = useRef();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serviceStatusId, setServiceStatusId] = useState(null);
    const [serviceEditId, setServiceEditId] = useState(null);
    const [serviceStatus, setServiceStatus] = useState("");
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [serviceImage, setImage] = useState("");
    const [service, setService] = useState({
        serviceName: "",
        serviceDescription: "",
        price: "",
        activeStatus: "",
        image: "",
    })

    const getServices = async () => {
        console.log(props)
        setLoading(true)
        try {
            let resp;
            if (props.isHospital) {
                resp = await ServiceApi.getHospitalServices();
            } else {
                resp = await ServiceApi.getAllServices();
            }
            if (resp.data.status) {
                let result = resp.data.data;
                setServices(result);
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        getServices();
    }, [])

    const handleSubmit = async (values, resetForm) => {
        setIsLoading(true)
        try {
            let resp = await ServiceApi.createService(values);
            if (resp.data.status) {
                getServices();
                formik.resetForm();
                notify.success(resp.data.message);
                setImage(null);
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setIsLoading(false);
    }

    const handleEditService = (e, data) => {
        setServiceEditId(data.id)
        if (data) {
            let url = REACT_APP_BASE_URL + "services/download/" + data.id;
            setImage(url);

            setService({
                serviceName: data.servicename,
                serviceDescription: data.servicedescription,
                price: data.price,

            })
            window.scrollTo(0, 0)
        }
    }

    const handleEdit = async (values) => {
        setIsLoading(true)
        try {
            let resp = await ServiceApi.editService(values, serviceEditId);
            if (resp.data.status) {
                getServices();
                notify.success(resp.data.message);
                setService({
                    serviceName: "",
                    serviceDescription: "",
                    price: "",
                    image: "",
                })
                setImage(null);

            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setIsLoading(false);
    }

    const handleCancelEdit = () => {
        setServiceEditId(null);
        setService({
            serviceName: "",
            serviceDescription: "",
            price: "",
            image: "",
        })
        setImage(null);
    }

    const handleClose = () => setShowModal(false)

    const handleCancelService = (e, data) => {
        setServiceStatusId(data.id);
        setShowModal(true);
        setServiceStatus(data.activestatus);
    }

    const changeServiceStatus = async () => {

        setIsLoading(true)
        try {
            let resp = await ServiceApi.changeServiceStatus(serviceStatus, serviceStatusId);
            if (resp.data.status) {
                getServices();
                notify.success(resp.data.message);
                handleClose();
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setIsLoading(false);

    }

    const handleAddImage = () => {
        imageSelectRef.current.click();
    };

    const handleChangeImage = (e) => {
        let files = e.target.files[0];
        let reader = new FileReader();
        formik.setFieldValue("image", files);
        reader.onloadend = () => {
            setImage(reader.result.toString());
        };
        reader.readAsDataURL(files);
    };

    const removeImage = () => {
        setImage(null);
        formik.setFieldValue("image", null);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: service,
        onSubmit: (values) => {
            if (serviceEditId) {
                handleEdit(values);
            } else {
                handleSubmit(values);
            }
        },
        validate: (values) => {
            let isEdit = serviceEditId ? true : false;
            return validateService(values, isEdit);
        }
    });

    return (
        <>

            <div className="container" >
                <h3>Add Service</h3>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Col md={8}>
                            <Form.Group>
                                <Form.Label>Service Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="serviceName" className='formControl'
                                    onChange={formik.handleChange}
                                    value={formik.values.serviceName}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.serviceName && formik.errors.serviceName ? (
                                    <div className="error-message">{formik.errors.serviceName}</div>
                                ) : null}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="price" className='formControl'
                                    onChange={formik.handleChange}
                                    value={formik.values.price}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.price && formik.errors.price ? (
                                    <div className="error-message">
                                        {formik.errors.price}
                                    </div>
                                ) : null}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="serviceDescription" className='formControl'
                                    onChange={formik.handleChange}
                                    value={formik.values.serviceDescription}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.serviceDescription && formik.errors.serviceDescription ? (
                                    <div className="error-message">{formik.errors.serviceDescription}</div>
                                ) : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <Form.Label>Choose Photo </Form.Label>
                            <Button variant="info" onClick={handleAddImage}>
                                Browse
                            </Button>
                            <input
                                onChange={(e) => handleChangeImage(e)}
                                type="file"
                                name="image"
                                style={{ display: "none" }}
                                ref={imageSelectRef}
                                accept="image/png, image/jpg, image/jpeg"
                            ></input>
                        </Col>

                        <Col md={4}>
                            <Image
                                src={serviceImage}
                                fluid
                                className="image ml-3"
                            ></Image>
                        </Col>
                        {serviceImage ?
                            <Col md={2}>
                                <span style={{ color: 'red', cursor: 'pointer' }} onClick={removeImage}>x</span>

                            </Col>
                            :
                            <></>
                        }

                    </Row>

                    <div className="textAlign-right  mb-5">
                        {isLoading === true ? (
                            <Cliploader isLoading={isLoading} />
                        ) : (
                            <div>
                                {serviceEditId ? (
                                    <div>
                                        <Button variant="info" type="submit">
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            type="button"
                                            style={{ marginLeft: "10px" }}
                                            onClick={handleCancelEdit}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <Button variant="info" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </Form>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title><b>Service Status</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >Do you really want to change this service status ?</Modal.Body>
                    <Modal.Footer>
                        {isLoading == true ?
                            <Cliploader isLoading={isLoading} />
                            :
                            <div>
                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="info" onClick={changeServiceStatus} style={{ marginLeft: '8px' }} >
                                    Change Status
                                </Button>
                            </div>
                        }
                    </Modal.Footer>
                </Modal>

                <MaterialTable
                    columns={[
                        { title: '#', field: 'tableData.id', render: rowData => rowData.tableData.id + 1 },
                        { title: 'Service Name', field: 'servicename', },
                        { title: 'Service Price', field: 'price', },
                        { title: 'Service Description', field: 'servicedescription', sorting: false },
                        {
                            title: 'Status', field: 'activestatus',
                            render: rowData => rowData.activestatus == true ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>

                        },
                    ]}
                    isLoading={loading}
                    data={services}
                    title="Service Details"
                    icons={Tableicons}
                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit Service',
                            onClick: (e, rowData) => { handleEditService(e, rowData) }
                        },
                        {
                            icon: DeleteOutline,
                            tooltip: 'Change Status',
                            onClick: (e, rowData) => { handleCancelService(e, rowData) }
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

            </div>
        </>
    )

}
export default Createservices