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

const CorporateTypes = (props) => {
    const [loading, setLoading] = useState(false);
    // const [tpeId, setServiceStatusId] = useState(null);
    const [typeId, setTypeId] = useState(null);
    const [typeStatus, setTypeStatus] = useState("");
    const [allCorporatesTypes, setTypes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [corporateType, setCorporateType] = useState({
        typeName: "",
        typeDescription: "",
        activeStatus: "",
    })

    const getCorporateType = () => {
        httpClient.GET("corporate-types/get-all", false, true)
            .then(resp => {
                if (resp.data.status) {
                    console.log(resp.data.data)
                    setTypes(resp.data.data);
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        getCorporateType();
    }, [])

    const handleSubmit = async (values, resetForm) => {
        setLoading(true)
        try {
            let corporateData = {
                name: values.typeName,
                description: values.typeDescription
            }

            let resp = await httpClient.POST("corporate-types/create", corporateData, false, true)

            if (resp.data.status) {
                resetForm();
                getCorporateType();
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

    const editCorporateType = (e, data) => {
        setTypeId(data.id)
        // console.log(data.id);
        if (data) {
            setCorporateType({
                typeName: data.name,
                typeDescription: data.description,

            })
            window.scrollTo(0, 0)
        }
    }

    const handleEditType = (values, resetForm) => {
        setLoading(true)
        let corporateData = {
            name: values.typeName,
            description: values.typeDescription
        }

        httpClient.PUT("corporate-types/update/" + typeId, corporateData, false, true)
            .then(resp => {
                if (resp.data.status) {
                    setCorporateType({
                        typeName: "",
                        typeDescription: "",
                    })
                    setTypeId(null);
                    getCorporateType();
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
        setTypeId(null);
        setCorporateType({
            typeName: "",
            typeDescription: ""
        })
    }

    const handleClose = () => setShowModal(false)

    const handleCancelType = (e, data) => {
        setTypeId(data.id);
        setShowModal(true);
        setTypeStatus(data.status);
    }

    const changeTypeStatus = () => {
        setLoading(true)
        let tempTypeStatus = typeStatus == true ? false : true


        httpClient.PUT("corporate-types/change/" + typeId + "/" + tempTypeStatus, {}, false, true)
            .then(resp => {
                // console.log(resp)
                if (resp.data.status) {
                    notify.success(resp.data.message)
                    getCorporateType();
                    handleClose();
                    setLoading(false)
                }

            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

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
                <Formik enableReinitialize={true}
                    initialValues={corporateType}

                    onSubmit={(values, { resetForm }) => {
                        {
                            typeId ?
                                handleEditType(values, resetForm)
                                :
                                handleSubmit(values, resetForm)
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="mb-4">
                            <div className=" form-group select-label">
                                <label >Corporate Type : </label>
                                <Field name="typeName" validate={validateName} className="form-control" />
                                {errors.typeName && touched.typeName && <div className="error-message">{errors.typeName}</div>}
                            </div>

                            <div className="form-group select-label">
                                <label>Corporate Type Description : </label>
                                <Field name="typeDescription" validate={validateDescription} className="form-control" />
                                {errors.typeDescription && touched.typeDescription && <div className="error-message">{errors.typeDescription}</div>}
                            </div>

                            {typeId ?

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
                        <Modal.Title><b>Corporate Type Status</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >Do you really want to change this corporate type status ?</Modal.Body>
                    <Modal.Footer>
                        {loading == true ?
                            <ClipLoader isLoading={loading} />
                            :
                            <div>
                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="info" onClick={changeTypeStatus} style={{ marginLeft: '8px' }} >
                                    Change Status
                                </Button>
                            </div>
                        }
                    </Modal.Footer>
                </Modal>

                <MaterialTable
                    columns={[
                        { title: '#', field: 'tableData.id', render: rowData => rowData.tableData.id + 1 },
                        { title: 'Type Name', field: 'name', },
                        { title: 'Type Description', field: 'description', sorting: false },
                        {
                            title: 'Status', field: 'status',
                            render: rowData => rowData.status == true ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>

                        },
                    ]}
                    // loading={isLoading}
                    data={allCorporatesTypes}
                    title="Corporate Types"
                    icons={Tableicons}
                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit Service',
                            onClick: (e, rowData) => { editCorporateType(e, rowData) }
                        },
                        {
                            icon: DeleteOutline,
                            tooltip: 'Change Status',
                            onClick: (e, rowData) => { handleCancelType(e, rowData) }
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
export default CorporateTypes