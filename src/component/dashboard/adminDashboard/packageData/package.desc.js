import Select from 'react-select'
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";
import Cliploader from "../../../../utils/clipLoader";
import Tableicons from '../../../../utils/materialicons';
import MaterialTable from 'material-table';
import { notify } from "../../../../services/notify";
import PackageApi from "./package.service";
import { validateMasterPackage, validatePackage } from "./package.helper";
import { Edit, Clear } from "@material-ui/icons";
import "./package.css"

const PackageDescription = (props) => {

    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [allPackages, setAllPackages] = useState([]);
    const [detailID, setDetailID] = useState("");
    const [packageStatus, setPackageStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [purposeEdit, setPurposeEdit] = useState({
        isEdit: false,
        editIndex: null,
    })
    const [packageData, setPackageData] = useState({
        name: "",
        description: "",
        packageType: "0",
        purpose: "",
        allPurpose: [],
    })

    const getPackageDetails = async () => {
        setLoading(true);
        try {
            let resp = await PackageApi.getPackageDesc();
            console.log(resp)
            if (resp.data.status) {
                let data = resp.data.data;
                console.log(data)
                setAllPackages(data)
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
        getPackageDetails();
    }, [])

    const createPackageDetails = async (values) => {
        setLoading(true);
        try {
            let resp = await PackageApi.createPackageDesc(values);
            if (resp.data.status) {
                notify.success(resp.data.message)
                formik.resetForm();
                getPackageDetails();
                formik.setFieldValue("allPurpose", [])
            }

        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: packageData,
        onSubmit: (values) => {
            console.log(values)

            if (detailID) {
                handleEditDetails(values)
            } else {
                createPackageDetails(values);

            }
        },

        validate: (values) => {
            let isEdit = detailID ? true : false;
            return validateMasterPackage(values,isEdit);
        },

    })

    const handleAddDetails = (values) => {

        if (!values.purpose) return;
        let tempArr = values.allPurpose;
        tempArr.push(values.purpose);
        formik.setFieldValue('allPurpose', tempArr)
        formik.setFieldValue('purpose', "")
    }

    const editPackageDetail = async (e, data) => {
        console.log(data);
        setDetailID(data.id)
        try {
            let resp = await PackageApi.getPackageByID(data.id);
            console.log(resp);
            if (resp.data.status) {
                let packageData = resp.data.data.MasterPackage;
                let purposeArr = resp.data.data.Purposes;
                setPackageData({
                    name: packageData.name,
                    description: packageData.description,
                    allPurpose: purposeArr,
                    packageType: packageData.packagetypes
                })

            }
        } catch (err) {
            console.log(err)
        }
        window.scrollTo(0, 0)

    }

    const handleEditDetails = async (values) => {
        setLoading(true);
        try {
            let resp = await PackageApi.editPackageDesc(values, detailID);
            if (resp.data.status) {
                notify.success(resp.data.message);
                setDetailID(null);
                setPackageData({
                    name: "",
                    description: "",
                    purpose: "",
                    packageType: "0",
                    allPurpose: [],
                })
                getPackageDetails();
            }

        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
    }


    const handleCancelEdit = () => {
        setDetailID(null);
        setPackageData({
            name: "",
            description: "",
            purpose: "",
            packageType: "0",
            allPurpose: [],
        })
        setPurposeEdit({
            isEdit: false,
            editIndex: null,
        })
    }

    const editPurpose = (index) => {
        console.log(index)
        setPurposeEdit({
            isEdit: true,
            editIndex: index
        })
        formik.setFieldValue('purpose', formik.values.allPurpose[index])
    }

    const handleEditPurpose = (values) => {
        if (!values.purpose) return;
        let tempArr = values.allPurpose;
        tempArr.splice(purposeEdit.editIndex, 1, values.purpose);
        formik.setFieldValue('allPurpose', tempArr)
        formik.setFieldValue('purpose', " ")
        setPurposeEdit({
            isEdit: false,
            editIndex: null,
        })
    }

    const removeDetail = (index) => {
        console.log(index)
        let tempArr = [...formik.values.allPurpose];
        console.log(tempArr)
        tempArr.splice(index, 1);
        formik.setFieldValue('allPurpose', tempArr)
    }

    const handleClose = () => setShowModal(false);

    const disablePackage = (e, data) => {
        setShowModal(true);
        setPackageStatus(data.status)
        setDetailID(data.id)
    }

    const changePackageStatus = async () => {
        setLoading(true)
        try {
            let resp = await PackageApi.packageStatus(detailID, packageStatus);
            if (resp.data.status) {
                notify.success(resp.data.message)
                getPackageDetails();
            }
        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
        handleClose();
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <Form onSubmit={formik.handleSubmit}>
                            <Row className="mb-3">
                            <Col md={6}>
                                    <Form.Group >
                                        <Form.Label>Package Type : </Form.Label>
                                        <select
                                            class="select-control formControl"
                                            aria-label="Default select example"
                                            name="packageType"
                                            onChange={formik.handleChange}
                                            value={formik.values.packageType}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value="0">Corporate Package</option>
                                            <option value="1">Family Package</option>
                                        </select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>

                                        <Form.Label>Master Package Name</Form.Label>
                                        <Form.Control className='formControl' type="text" name="name" onChange={formik.handleChange}
                                            value={formik.values.name} onBlur={formik.handleBlur} />
                                        {formik.touched.name && formik.errors.name ?
                                            <div className="error-message">{formik.errors.name}</div>
                                            : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                            <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control className='formControl' as="textarea" rows={2} name="description" onChange={formik.handleChange}
                                            value={formik.values.description} onBlur={formik.handleBlur} />
                                        {formik.touched.description && formik.errors.description ?
                                            <div className="error-message">{formik.errors.description}</div>
                                            : null}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className='mb-3'>
                                <Col md={10}>
                                    <Form.Group >
                                        <Form.Label>Purpose : </Form.Label>
                                        <Form.Control className='formControl' type="text" name="purpose" onChange={formik.handleChange}
                                            value={formik.values.purpose} onBlur={formik.handleBlur} />
                                        {formik.touched.purpose && formik.errors.purpose ?
                                            <div className="error-message">{formik.errors.purpose}</div>
                                            : null}
                                    </Form.Group>
                                </Col>

                                <Col md={2}>
                                    <br></br>
                                    {purposeEdit.isEdit === true ?
                                        <Button variant="info" className='formControl' onClick={() => handleEditPurpose(formik.values)}>Edit</Button>
                                        :
                                        <Button variant="info" className='formControl' onClick={() => handleAddDetails(formik.values)}>Add</Button>
                                    }
                                </Col>

                            </Row>
                            
                            <Row className='mb-3'>
                            <Col md={10}>
                            {formik.values && formik.values.allPurpose ?
                                        <ul>
                                            {formik.values && formik.values.allPurpose.map((item, index) => {
                                                return <div className='clearfix'>
                                                    <li className='purposeList'>
                                                        <span className='flaotLeft'>{item}</span>
                                                        <span  className="removeBtn floatRight "
                                                            onClick={() => removeDetail(index)}>Remove</span>
                                                        <span onClick={() => editPurpose(index)} className="editBtn floatRight">Edit</span>
                                                    </li>
                                                </div>
                                            })}
                                        </ul>
                                        :
                                        <></>
                                    }
                            </Col>
                            
                            </Row>

                            <div className="mb-5" >
                                {detailID ?
                                    <div>
                                        {isLoading == true ?
                                            <Cliploader isLoading={isLoading} />
                                            :
                                            <div className="textAlign-right">
                                                <Button variant="info" type="submit">
                                                    Save
                                                </Button>
                                                <Button variant="danger" style={{ marginLeft: '10px' }} onClick={handleCancelEdit}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        }
                                    </div>
                                    :
                                    <div>
                                        {isLoading == true ?
                                            <Cliploader isLoading={isLoading} />
                                            :
                                            <div className="textAlign-right">
                                                <Button variant="info" type="submit">
                                                    Create
                                                </Button>
                                            </div>
                                        }
                                    </div>
                                }

                            </div>
                        </Form>
                    </Col>
                </Row>
                
                <MaterialTable
                    columns={[
                        { title: '#', field: 'tableData.id', render: rowData => rowData.tableData.id + 1 },
                        { title: "Name", field: "name" },
                        { title: "Description", field: "description" },
                        {
                            title: "Status",
                            field: "status",
                            render: (rowData) =>
                                rowData.status.toString() === true.toString() ? (
                                    <span style={{ color: "#18af69" }}>Active</span>
                                ) : (
                                    <span style={{ color: "red" }}>inActive</span>
                                ),
                        },
                    ]}
                    data={allPackages}
                    title="Pacakges Description"
                    icons={Tableicons}
                    loading={loading}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        filtering: false,
                        sorting: true,
                        headerStyle: {
                            backgroundColor: "#2745F0",
                            color: "#FFF",
                        },
                    }}

                    actions={[
                        {
                            icon: Edit,
                            tooltip: "Edit Hospital",
                            onClick: (e, rowData) => {
                                editPackageDetail(e, rowData);
                            },
                        },
                        {
                            icon: Clear,
                            tooltip: "Change Status",
                            onClick: (e, rowData) => {
                                disablePackage(e, rowData);
                            },
                        },

                    ]}
                />

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>
                            <b>Doctor Status</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you really want to change this doctor status ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="info" onClick={changePackageStatus}>
                            Change Status
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>


        </div >
    )
}

export default PackageDescription