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
import { PaymentApi } from "./payment.service";
import { validatePayment } from "./payment.helper";

export function PaymentMaster(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [paymentID, setPaymentID] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [allPayment, setAllPaymentID] = useState([]);
    const [paymentInfo, setPaymentInfo] = useState({
        name: "",
        type: "",
        url: "",
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: paymentInfo,

        onSubmit: (values) => {
            console.log(values)
            if (paymentID) {
                editPaymentData(values);
            } else {
                createPaymentMaster(values);
            }
        },

        validate: values => {
            let isEdit = paymentID ? true : false;
            return validatePayment(values, isEdit);
        }

    })

    useEffect(() => {
        getAllPayment();
    }, [])

    const getAllPayment = async () => {
        setLoading(true)
        try {
            let resp = await PaymentApi.getAllPayment();
            if (resp.data.status) {
                let result = resp.data.data;
                setAllPaymentID(result);
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
    }

    const createPaymentMaster = async (values) => {
        setIsLoading(true);
        try {
            let resp = await PaymentApi.createPaymentMaster(values);
            if (resp.data.status) {
                getAllPayment();
                formik.resetForm();
                notify.success(resp.data.message);
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setIsLoading(false);
    }

    const getPaymentEditData = (e, data) => {
        setPaymentID(data.id)
        if (data) {
            setPaymentInfo({
                name: data.name,
                type: data.type,
                url: data.url,
            })
            window.scrollTo(0, 0)
        }
    }

    const editPaymentData = async (values) => {
        setIsLoading(true);
        try {
            let resp = await PaymentApi.editPaymentMaster(values, paymentID);
            if (resp.data.status) {
                getAllPayment();
                notify.success(resp.data.message);
                setPaymentID(null);
                setPaymentInfo({
                    name: "",
                    type: "",
                    url: "",
                })
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
        setPaymentID(null);
        setPaymentInfo({
            name: "",
            type: "",
            url: "",
        })
    }

    const handleClose = () => setShowModal(false);

    const paymentChangeStatus = (e, data) => {
        console.log(data)
        setShowModal(true)
        setPaymentID(data.id);
        setPaymentStatus(data.status)
    }

    const changePaymentStatus = async () => {
        setIsLoading(true);
        try {
            let resp = await PaymentApi.changePaymentStatus(paymentID, paymentStatus);
            if (resp.data.status) {
                getAllPayment();
                handleClose();
                notify.success(resp.data.message);
            }
        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setIsLoading(false)
    }

    return <div>
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
                            <Form.Label>Type</Form.Label>
                            <Form.Control type="text" name="type" onChange={formik.handleChange}
                                value={formik.values.type} onBlur={formik.handleBlur} className='formControl' />
                            {formik.touched.type && formik.errors.type ?
                                <div className="error-message">{formik.errors.type}</div>
                                : null}
                        </Form.Group>
                    </Col>

                </Row>

                <Row className="mb-3">

                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="text" name="url" onChange={formik.handleChange}
                                value={formik.values.url} onBlur={formik.handleBlur} className='formControl' />
                            {formik.errors.url && formik.touched.url ?
                                <div className="error-message">{formik.errors.url}</div>
                                : null}
                        </Form.Group>
                    </Col>
                </Row>

                <div className=" textAlign-right mb-5">
                    {isLoading ?
                        <Cliploader isLoading={isLoading} />
                        :
                        <div className="textAlign-right mb-5">
                            {paymentID ?
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
                </div>

            </Form>

            <MaterialTable
                data={allPayment}
                title="Payment Master "
                icons={Tableicons}
                isLoading={loading}
                columns={[
                    { title: '#', field: 'tableData.id', render: rowData => rowData.tableData.id + 1 },
                    { title: 'Name', field: 'name', },
                    { title: 'Type', field: 'type' },
                    {
                        title: 'Status', field: 'status',
                        render: rowData => rowData.status === true ?
                            <span style={{ color: '#18af69' }}>Active</span>
                            :
                            <span style={{ color: 'red' }}>inActive</span>
                    },
                ]}

                actions={[
                    {
                        icon: Edit,
                        tooltip: 'Edit Institute',
                        onClick: (e, rowData) => { getPaymentEditData(e, rowData) }
                    },
                    {
                        icon: DeleteOutline,
                        tooltip: 'Change Status',
                        onClick: (e, rowData) => { paymentChangeStatus(e, rowData) }
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
                    <Modal.Title><b>Payment Master Status</b></Modal.Title>
                </Modal.Header>
                <Modal.Body >Do you really want to change this payment master status ?</Modal.Body>
                <Modal.Footer>
                    {isLoading == true ?
                        <Cliploader isLoading={isLoading} />
                        :
                        <div>

                            <Button variant="danger" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="info"
                                onClick={changePaymentStatus}
                                style={{ marginLeft: '8px' }} >
                                Change Status
                            </Button>
                        </div>
                    }
                </Modal.Footer>
            </Modal>
        </Container>
    </div>
}