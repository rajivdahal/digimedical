import React, { useRef } from "react";
import { useEffect, useState } from "react"
import { httpClient } from "../../../../utils/httpClient";
import { notify } from "../../../../services/notify";
import MaterialTable from 'material-table'
import Edit from '@material-ui/icons/Edit';
import Tableicons from "../../../../utils/materialicons";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Modal, Button } from 'react-bootstrap';
import "./services.component.css"
import ClipLoader from "../../../../utils/clipLoader";
import { Field, Form, Formik } from "formik";

const Createservices = (props) => {
    const [loading, setLoading] = useState(false);
    const [serviceStatusId, setServiceStatusId] = useState(null);
    const [serviceEditId, setServiceEditId] = useState(null);
    const [serviceStatus, setServiceStatus] = useState("");
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [service, setService] = useState({
        serviceName: "",
        serviceDescription: "",
        activeStatus: "",
    }
    )

    const getServices = () => {
        httpClient.GET("services/get-all", false, true)
            .then(resp => {
                if (resp.data.status) {
                    console.log(resp.data.data)
                    setServices(resp.data.data);
                }
            })
            .catch(err => {
                console.log(err.response)
            })

    }

    useEffect(() => {
        getServices();
    }, [])

    const handleSubmit = async (values, resetForm) => {
        setLoading(true)
        let serviceData = {
            serviceName: values.serviceName,
            serviceDescription: values.serviceDescription
        }

        await httpClient.POST("services/create", serviceData, false, true)
            .then(resp => {
                if (resp.data.status) {
                    resetForm();
                    getServices();
                    notify.success(resp.data.message)
                    setLoading(false)

                }
            })
            .catch(err => {
                setLoading(false)
                notify.error(err.response.data.message)

            })
    }

    const handleEditService = (e, data) => {
        setServiceEditId(data.id)
        // console.log(data.id);
        if (data) {
            setService({
                serviceName: data.serviceName,
                serviceDescription: data.serviceDescription,

            })
            window.scrollTo(0,0)
        }
    }

    const handleEdit = (values, resetForm) => {
        setLoading(true)
        let serviceData = {
            serviceName: values.serviceName,
            serviceDescription: values.serviceDescription
        }

        httpClient.PUT("services/" + serviceEditId, serviceData, false, true)
            .then(resp => {
                if (resp.data.status) {
                    setService({
                        serviceName: "",
                        serviceDescription: "",
                    })
                    resetForm();
                    setServiceEditId(null);
                    getServices();
                    notify.success(resp.data.message)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err.response)
                setLoading(false)
            })
    }

    const handleCancelEdit = () => {
        setServiceEditId(null);
        setService({
            serviceName: "",
            serviceDescription: ""
        })
    }

    const handleClose = () => setShowModal(false)

    const handleCancelService = (e, data) => {
        setServiceStatusId(data.id);
        setShowModal(true);
        setServiceStatus(data.activeStatus);
    }

    const changeServiceStatus = () => {
        setLoading(true)
        let tempServiceStatus = {
            id: serviceStatusId,
            status: serviceStatus == true ? false : true
        }

        httpClient.PUT("services/change-status", tempServiceStatus, false, true)
            .then(resp => {
                // console.log(resp)
                if (resp.data.status) {
                    notify.success(resp.data.message)
                    getServices();
                    handleClose();
                    setLoading(false)
                }

            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    const columns = [
        { title: 'Service Name', field: 'serviceName', },
        { title: 'Service Description', field: 'serviceDescription', sorting: false },
        { title: 'Status', field: 'activeStatus', filtering: false, sorting: false },
    ]


    function validateName(value) {
        let error;
        if (!value) {
            error = 'Required!';
        }
        return error;
    }

    function validateDescription(value) {
        let error;
        if (!value) {
            error = 'Required!';
        }
        return error;
    }


    return (
        <>

            <div className="container" >
                <h3>Add Service</h3>

                <Formik enableReinitialize={true}
                    initialValues={service}

                    onSubmit={(values, { resetForm }) => {
                        console.log(values);

                        {
                            serviceEditId ?
                                handleEdit(values, resetForm)
                                :
                                handleSubmit(values, resetForm)
                        }
                    }}
                >

                    {({ errors, touched }) => (
                        <Form className="mb-4">
                            <div className=" form-group select-label">
                                <label >Service Name : </label>
                                <Field name="serviceName" validate={validateName} className="form-control" />
                                {errors.serviceName && touched.serviceName && <div className="error-message">{errors.serviceName}</div>}
                            </div>

                            <div className="form-group select-label">
                                <label>Service Description : </label>
                                <Field name="serviceDescription" validate={validateDescription} className="form-control" />
                                {errors.serviceDescription && touched.serviceDescription && <div className="error-message">{errors.serviceDescription}</div>}
                            </div>

                            {serviceEditId ?

                                <div>
                                    {loading == true ?
                                        <ClipLoader isLoading={loading} />
                                        :

                                        <div className="textAlign-right">
                                            <button type="Submit" className="btn" style={{ backgroundColor: '#2745F0', color: "#fff" }}>
                                                Edit
                                            </button>
                                            <button type="button" className="btn" style={{ backgroundColor: '#2745F0', color: "#fff", marginLeft: '10px' }} onClick={handleCancelEdit}>
                                                Cancel
                                            </button>
                                        </div>
                                    }
                                </div>

                                :
                                <div >
                                    {loading == true ?
                                        <ClipLoader isLoading={loading} />
                                        :
                                        <div className="textAlign-right">
                                            <button type="Submit" className="btn" style={{ backgroundColor: '#2745F0', color: "#fff" }} >
                                                Submit
                                            </button>
                                        </div>
                                    }
                                </div>

                            }
                        </Form>
                    )}

                </Formik>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title><b>Service Status</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >Do you really want to deactivate this service ?</Modal.Body>
                    <Modal.Footer>
                        {loading == true ?
                            <ClipLoader isLoading={loading} />
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
                        { title: 'Service Name', field: 'serviceName', },
                        { title: 'Service Description', field: 'serviceDescription', sorting: false },
                        {
                            title: 'Status', field: 'activeStatus',
                            render: rowData => rowData.activeStatus == true ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>

                        },
                    ]}
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
                        pageSize: 15,
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