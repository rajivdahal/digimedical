import React from "react";
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

    const handleChange = (e) => {
        let tempService = { ...service, ...{ [e.target.name]: e.target.value } }
        setService(tempService);
    }

    const getServices = () => {
        httpClient.GET("services/get-all", false, true)
            .then(resp => {
                if (resp.data.status) {
                    let data = resp.data.data;
                    // console.log(data)
                    setServices(data);
                }
            })
            .catch(err => {
                console.log(err.response)
            })

    }

    useEffect(() => {
        getServices();
    }, [])

    const handleSubmit = () => {
        setLoading(true)
        let serviceData = {
            serviceName: service.serviceName,
            serviceDescription: service.serviceDescription
        }

        httpClient.POST("services/create", serviceData, false, true)
            .then(resp => {
                if (resp.data.status) {
                    setService({
                        serviceName: "",
                        serviceDescription: "",
                    })
                    getServices();
                    notify.success(resp.data.message)
                    setLoading(false)

                }
            })
            .catch(err => {
                // console.log("inside catch block")
                // console.log(err.response)
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
        }
    }

    const handleEdit = () => {
        setLoading(true)
        let serviceData = {
            serviceName: service.serviceName,
            serviceDescription: service.serviceDescription
        }

        httpClient.PUT("services/" + serviceEditId, serviceData, false, true)
            .then(resp => {
                if (resp.data.status) {
                    setService({
                        serviceName: "",
                        serviceDescription: "",
                    })
                    setServiceEditId(null);
                    getServices();
                    notify.success(resp.data.message)
                    setLoading(false)
                }
            })
            .catch(err => {
                // console.log("inside catch block")
                console.log(err.response)
                setLoading(false)
                // notify.error(err.response.data.message)
            })

        // console.log(service);
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

        console.log(tempServiceStatus)
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

    return (
        <>

            <div className="container">
                <h3>Add Service</h3>

                <form className="mb-4">

                    <div className=" form-group select-label">
                        <label >Service Name : </label>
                        <input type="text" className="form-control" placeholder="Enter Service Name" name="serviceName"
                            onChange={handleChange} value={service.serviceName} />
                    </div>

                    <div className="form-group select-label">
                        <label>Service Description : </label>
                        <input type="text" className="form-control" placeholder="Enter Service Description" name="serviceDescription"
                            onChange={handleChange} value={service.serviceDescription} />
                    </div>

                    <div>
                        { loading == true ?
                            <ClipLoader isLoading={loading} />
                            :
                            <div>
                                {serviceEditId ?

                                    <div>
                                        <button type="button" className="btn" style={{ backgroundColor: '#2745F0', color: "#fff" }} onClick={handleEdit}>
                                            Edit
                                        </button>
                                        <button type="button" className="btn" style={{ backgroundColor: '#2745F0', color: "#fff", marginLeft: '10px' }} onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    </div>

                                    :

                                    <button type="button" className="btn" style={{ backgroundColor: '#2745F0', color: "#fff" }} onClick={handleSubmit}>
                                        Submit
                                    </button>
                                }
                            </div>
                        }
                    </div>

                </form>

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
                    columns={columns}
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