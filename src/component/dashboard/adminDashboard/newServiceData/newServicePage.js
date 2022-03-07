import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { notify } from "../../../../services/notify";
import MaterialTable from 'material-table'
import Edit from '@material-ui/icons/Edit';
import Tableicons from "../../../../utils/materialicons";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Modal, Button, Row, Col, Form, Image, Container } from 'react-bootstrap';
import { useFormik } from "formik";
import Cliploader from "../../../../utils/clipLoader";
import DigiServiceApi from "./newservices.service";
import { validateService } from "../servicesData/service.helper";
import { validateNewService } from "./newService.helper";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const NewServicePage = (props) => {

    const imageSelectServiceRef = useRef();
    const imageSelectIconRef = useRef();

    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serviceStatusId, setServiceStatusId] = useState(null);
    const [serviceEditId, setServiceEditId] = useState(null);
    const [serviceStatus, setServiceStatus] = useState("");
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [serviceImage, setServiceImage] = useState("");
    const [iconImage, setIconImage] = useState("");
    const [service, setService] = useState({
        serviceName: "",
        serviceDescription: "",
        price: "",
        serviceImg: "",
        iconImg: "",
        type: "online",
    })


    const getServices = async () => {
        setLoading(true)
        try {
            let resp = await DigiServiceApi.getAllDigiServices();
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

    const handleSubmit = async (values) => {
        setIsLoading(true)
        try {
            let resp = await DigiServiceApi.createDigiService(values);
            if (resp.data.status) {
                getServices();
                formik.resetForm();
                notify.success(resp.data.message);
                setIconImage(null);
                setServiceImage(null);
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
            let serviceUrl = REACT_APP_BASE_URL + "digi-service/download/" + data.id;
            setServiceImage(serviceUrl);
            let iconUrl = REACT_APP_BASE_URL + "download-icon/" + data.id;
            setIconImage(iconUrl);

            setService({
                serviceName: data.name,
                serviceDescription: data.description,
                price: data.amount,
                type: data.type,
            })
            window.scrollTo(0, 0)
        }
    }

    const handleEdit = async (values) => {
        setIsLoading(true)
        try {
            let resp = await DigiServiceApi.editDigiService(values, serviceEditId);
            if (resp.data.status) {
                getServices();
                notify.success(resp.data.message);
                setService({
                    serviceName: "",
                    serviceDescription: "",
                    serviceImg: "",
                    price: "",
                    iconImg: "",
                    type: "",
                })
                setServiceEditId(null);
                setIconImage(null);
                setServiceImage(null);
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                console.log(err.response)
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
            serviceImg: "",
            price: "",
            iconImg: "",
            type: "",
        })
        setIconImage(null);
        setServiceImage(null);
    }

    const handleCancelService = (e, data) => {
        setServiceStatusId(data.id);
        setShowModal(true);
        setServiceStatus(data.status);
    }

    const changeServiceStatus = async () => {

        setIsLoading(true)
        try {
            let resp = await DigiServiceApi.changeServiceStatus(serviceStatus, serviceStatusId);
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: service,
        onSubmit: (values) => {
            if (serviceEditId) {
                let isEdit = serviceEditId ? true : false;
                console.log(isEdit)
                handleEdit(values, isEdit);
            } else {
                handleSubmit(values);
            }

        },
        validate: (values) => {
            let isEdit = serviceEditId ? true : false;
            return validateNewService(values, isEdit);
        }
    });

    const handleClose = () => setShowModal(false);

    const handleAddImage = () => {
        imageSelectServiceRef.current.click();
    };

    const handleChangeImage = (e, img) => {
        let files = e.target.files[0];
        let reader = new FileReader();
        formik.setFieldValue("serviceImg", files);
        reader.onloadend = () => {
            setServiceImage(reader.result.toString());
        };
        reader.readAsDataURL(files);
    }

    const removeImage = () => {
        setServiceImage(null);
        formik.setFieldValue("serviceImg", null);
    }

    const handleAddIconImage = () => {
        imageSelectIconRef.current.click();
    };

    const handleChangeIconImage = (e) => {
        let files = e.target.files[0];
        let reader = new FileReader();
        formik.setFieldValue("iconImg", files);
        reader.onloadend = () => {
            setIconImage(reader.result.toString());
        };
        reader.readAsDataURL(files);
    }

    const removeIconImage = () => {
        setIconImage(null);
        formik.setFieldValue("iconImg", null);
    }

    return (
        <Container >
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
                    <Col md={8}>
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
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <select
                                class="select-control formControl"
                                name="type"
                                onChange={formik.handleChange}
                                value={formik.values.type}
                                onBlur={formik.handleBlur}
                            >
                                <option value="online">Online</option>
                                <option value="physical">Physical</option>
                            </select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={5}>
                        <Form.Label>Choose Service Photo </Form.Label>
                        <Button variant="info" onClick={handleAddImage}>
                            Browse
                        </Button>
                        <input
                            onChange={(e) => handleChangeImage(e)}
                            type="file" name="serviceImg"
                            style={{ display: "none" }}
                            ref={imageSelectServiceRef} accept=".jpg, .png , .jpeg"
                        ></input>
                        {formik.touched.serviceImg && formik.errors.serviceImg ? (
                            <div className="error-message">{formik.errors.serviceImg}</div>
                        ) : null}
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

                <Row>
                    <Col md={5}>
                        <Form.Label>Choose Icon Photo </Form.Label>
                        <Button variant="info" onClick={handleAddIconImage}>
                            Browse
                        </Button>

                        <input
                            onChange={(e) => handleChangeIconImage(e)}
                            type="file" name="iconImg"
                            style={{ display: "none" }}
                            ref={imageSelectIconRef} accept=".jpg, .png , .jpeg"
                        ></input>
                        {formik.touched.iconImg && formik.errors.iconImg ? (
                            <div className="error-message">{formik.errors.iconImg}</div>
                        ) : null}
                    </Col>

                    <Col md={4}>
                        <Image
                            src={iconImage}
                            fluid
                            className="image ml-3"
                        ></Image>
                    </Col>
                    {iconImage ?
                        <Col md={2}>
                            <span style={{ color: 'red', cursor: 'pointer' }} onClick={removeIconImage}>x</span>
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
                            <Button variant="info"
                                onClick={changeServiceStatus}
                                style={{ marginLeft: '8px' }} >
                                Change Status
                            </Button>
                        </div>
                    }
                </Modal.Footer>
            </Modal>

            <MaterialTable
                columns={[
                    { title: '#', field: 'tableData.id', render: rowData => rowData.tableData.id + 1 },
                    { title: 'Service Name', field: 'name', },
                    { title: 'Service Price', field: 'amount', },
                    { title: 'Service Type', field: 'type', },
                    { title: 'Service Description', field: 'description', sorting: false },
                    {
                        title: 'Status', field: 'status',
                        render: rowData => rowData.status == true ?
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
                    sorting: true,
                    headerStyle: {
                        backgroundColor: '#2745F0',
                        color: '#FFF'
                    }
                }}
            />

        </Container>
    )

}
export default NewServicePage;