import React, { useRef } from "react";
import { useEffect, useState } from "react"
import { httpClient } from "../../../../utils/httpClient";
import { notify } from "../../../../services/notify";
import MaterialTable from 'material-table'
import Edit from '@material-ui/icons/Edit';
import Tableicons from "../../../../utils/materialicons";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Modal, Button } from 'react-bootstrap';
import ClipLoader from "../../../../utils/clipLoader";
import { Field, Form, Formik } from "formik";
import Cliploader from "../../../../utils/clipLoader";

const BodyCheckup = (props) => {
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [checkupId, setCheckupId] = useState(null);
    const [checkupStatus, setCheckupStatus] = useState("");
    const [allBodyCheckup, setAllCheckup] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [bodyCheckup, setCheckup] = useState({
        name: "",
        description: "",
    })

    const getAllCheckup = () => {
        setIsLoading(true);
        httpClient.GET("body-checkup/get-all", false, true)
            .then(resp => {
                if (resp.data.status) {
                    setAllCheckup(resp.data.data);
                }
            })
            .catch(err => {
                console.log(err.response)
            })
        setIsLoading(false)
    }

    useEffect(() => {
        getAllCheckup();
    }, [])

    const handleSubmit = async (values, resetForm) => {
        setLoading(true)
        try {
            let checkupData = {
                name: values.name,
                description: values.description
            }

            let resp = await httpClient.POST("body-checkup/create", checkupData, false, true)

            if (resp.data.status) {
                resetForm();
                getAllCheckup();
                notify.success(resp.data.message)
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)

    }

    const editBodyCheckup = (e, data) => {
        setCheckupId(data.id)
        if (data) {
            setCheckup({
                name: data.name,
                description: data.description,

            })
            window.scrollTo(0, 0)
        }
    }

    const handleEditCheckup = (values) => {
        setLoading(true)
        let checkupData = {
            name: values.name,
            description: values.description
        }

        httpClient.PUT("body-checkup/update/" + checkupId, checkupData, false, true)
            .then(resp => {
                if (resp.data.status) {
                    setCheckup({
                        name: "",
                        description: "",
                    })
                    setCheckupId(null);
                    getAllCheckup();
                    notify.success(resp.data.message)
                    setLoading(false)
                }
            })
            .catch(err => {
                notify.error(err.response.data.message)
                setLoading(false)
            })
    }

    const handleCancelEdit = () => {
        setCheckupId(null);
        setCheckup({
            name: "",
            description: ""
        })
    }

    const handleClose = () => setShowModal(false)

    const disableCheckup = (e, data) => {
        setCheckupId(data.id);
        setShowModal(true);
        setCheckupStatus(data.status);
    }

    const changeCheckupStatus = () => {
        setLoading(true)
        let tempStatus = checkupStatus == true ? false : true


        httpClient.PUT("body-checkup/change/" + checkupId + "/" + tempStatus, {}, false, true)
            .then(resp => {
                if (resp.data.status) {
                    notify.success(resp.data.message)
                    getAllCheckup();
                    handleClose();
                    setLoading(false)
                }

            })
            .catch(err => {
                setLoading(false)
            })
    }

    function validateName(value) {
        let error;
        if (!value) {
            error = 'Body Checkup Name is required!';
        }
        return error;
    }

    function validateDescription(value) {
        let error;
        if (!value) {
            error = 'Description is required!';
        }
        return error;
    }


    return (
        <>
            <div className="container" >
                <Formik enableReinitialize={true}
                    initialValues={bodyCheckup}

                    onSubmit={(values, { resetForm }) => {
                        {
                            checkupId ?
                                handleEditCheckup(values, resetForm)
                                :
                                handleSubmit(values, resetForm)
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="mb-4">
                            <div className=" form-group select-label">
                                <label >Body Checkup Name : </label>
                                <Field name="name" validate={validateName} className="form-control" />
                                {errors.name && touched.name && <div className="error-message">{errors.name}</div>}
                            </div>

                            <div className="form-group select-label">
                                <label>Description : </label>
                                <Field name="description" validate={validateDescription} className="form-control" />
                                {errors.description && touched.description && <div className="error-message">{errors.description}</div>}
                            </div>

                       

                            <div className=" textAlign-right mb-5">
                                {isLoading ?
                                    <Cliploader isLoading={loading} />
                                    :
                                    <div className="textAlign-right mb-5">
                                        {checkupId ?
                                                <div >
                                            <button type="Submit" className="btn" style={{ backgroundColor: '#2745F0', color: "#fff" }}>
                                                Edit
                                            </button>
                                            <button type="button" className="btn" style={{ backgroundColor: '#2745F0', color: "#fff", marginLeft: '10px' }} onClick={handleCancelEdit}>
                                                Cancel
                                            </button>
                                        
                                            </div>
                                            :
                                            <div>
                                            <button type="Submit" className="btn" style={{ backgroundColor: '#2745F0', color: "#fff" }} >
                                                Submit
                                            </button>
                                        </div>
                                        }
                                    </div>
                                }
                            </div>
                        </Form>
                    )}

                </Formik>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title><b>Body Checkup Status</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >Do you really want to change this checkup status ?</Modal.Body>
                    <Modal.Footer>
                        {loading == true ?
                            <ClipLoader isLoading={loading} />
                            :
                            <div>
                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="info" onClick={changeCheckupStatus} style={{ marginLeft: '8px' }} >
                                    Change Status
                                </Button>
                            </div>
                        }
                    </Modal.Footer>
                </Modal>

                <MaterialTable
                    columns={[
                        { title: '#', field: 'tableData.id', render: rowData => rowData.tableData.id + 1 },
                        { title: 'Name', field: 'name', },
                        { title: 'Description', field: 'description' },
                        {
                            title: 'Status', field: 'status',
                            render: rowData => rowData.status == true ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>

                        },
                    ]}
                    isLoading={isLoading}
                    data={allBodyCheckup}
                    title="Body Checkup"
                    icons={Tableicons}
                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit Body Checkup',
                            onClick: (e, rowData) => { editBodyCheckup(e, rowData) }
                        },
                        {
                            icon: DeleteOutline,
                            tooltip: 'Change Status',
                            onClick: (e, rowData) => { disableCheckup(e, rowData) }
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
                />

            </div>
        </>
    )

}
export default BodyCheckup