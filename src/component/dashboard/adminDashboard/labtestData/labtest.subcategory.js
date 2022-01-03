import Select from 'react-select'
import { useFormik } from "formik";
import MaterialTable from 'material-table'
import Edit from '@material-ui/icons/Edit';
import { useState, useEffect, useRef } from "react";
import { notify } from "../../../../services/notify";
import Cliploader from "../../../../utils/clipLoader";
import Tableicons from "../../../../utils/materialicons";
import { httpClient } from '../../../../utils/httpClient';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Container, Form, Row, Col, Button, Modal, Image } from "react-bootstrap";

const LabtestSubcategory = (props) => {

    const [subCategoryID, setSubCategoryID] = useState("");
    const [subCategory, setSubCategory] = useState([]);
    const [categoryStatus, setCategoryStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [allLabtest, setAllLabtest] = useState([]);
    const [allInstitue, setAllInstitute] = useState([]);

    const [labtestSubcategory, setLabTestSubcategory] = useState({
        selectedLabtest: {},
        labtestID: "",
        selectedInstitute: {},
        instituteId: "",
        subCategory: "",
        description: "",
        price: "",
    })

    const getAllLabtest = async () => {
        let labtest = await httpClient.GET("lab-test/get-all", false, true)
            .then(resp => {
                if (resp.data.status) {
                    let result = resp.data.data;
                    return result;
                }
            })
            .catch(err => {
                console.log(err)
            })

        let trueLabtest = labtest.filter((item, index) => {
            return (item.status == true)
        })
        let options = trueLabtest.map((test, index) => {
            return {
                label: test.name,
                value: test.id
            }
        })
        setAllLabtest(options)
    }

    const getAllInstitute = async () => {
        let institute = await httpClient.GET("medical-institute/get-all", false, true)
            .then(resp => {

                if (resp.data.status) {
                    let result = resp.data.data;
                    return result;
                }
            })
            .catch(err => {
                console.log(err)
            })

        if (institute) {
            let trueInstitute = institute.filter((item, index) => {
                return (item.status == true)
            })
            let options = trueInstitute.map((item, index) => {
                return {
                    label: item.name,
                    value: item.id
                }
            })
        setAllInstitute(options)

        }
    }

    const getSubcategory = () => {
        httpClient.GET("labtest/category/get-all", false, true)
            .then(resp => {
                console.log(resp)
                resp.data.data.forEach((item) => {
                    console.log(item.description)
                    if (item.description) {
                        let splitDesc = item.description.split(" ");

                        if (splitDesc.length < 10) {
                            item.description = item.description
                        } else {
                            let sliceDesc = splitDesc.slice(0, 10);
                            let joinDesc = sliceDesc.join(" ") + " ...";
                            item.description = joinDesc;
                        }
                    }

                    item.priceString = "Rs." + item.price;
                })
                if (resp.data.status) {
                    let data = resp.data.data;
                    setSubCategory(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAllLabtest();
        getSubcategory();
        getAllInstitute();
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: labtestSubcategory,

        onSubmit: (values) => {
            console.log(values)
            if (subCategoryID) {
                editSubcategoryData(values)
            } else {
                createSubCategory(values)
            }
        },

        validate: (values) => {
            let errors = {};

            if (!values.description) {
                errors.description = 'Required!'
            }
            let decimalREGEX = /^\d*\.?\d*$/;

            if (!values.subCategory) {
                errors.subCategory = "Required!"
            }
            if (!decimalREGEX.test(values.price)) {
                errors.price = "Must be a number";
            }
            if (!values.price) {
                errors.price = "Required!"
            }
            if (values.price < 0) {
                errors.price = "Must be positive!"
            }
            return errors;
        },

    })

    const createSubCategory = (values) => {

        try {
            setIsLoading(true)
            let labtestId = formik.values.selectedLabtest.value;
            let instituteId = formik.values.selectedInstitute.value;

            let labSubcategory = {
                name: values.subCategory,
                description: values.description,
                price: values.price,
                labTestId: labtestId,
                medicalInstituteId: instituteId,
            }
            httpClient.POST("labtest/category/create", labSubcategory, false, true)
                .then(resp => {
                    console.log(resp)
                    if (resp.data.status) {
                        notify.success(resp.data.message)
                        formik.resetForm();
                        getSubcategory();
                    }
                })
                .catch(err => {
                    console.log(err.response)
                    notify.error(err.response.data.message)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }

    }


    const handleLabtestChange = (item) => {
        console.log(item);
        formik.setFieldValue('selectedLabtest', item)
    }

    const handleInstituteChange = (item) => {
        console.log(item);
        formik.setFieldValue('selectedInstitute', item)
    }
    const handleClose = () => {
        setShowModal(false);
    }

    const subcategoryChangeStatus = (e, data) => {
        setShowModal(true);
        setCategoryStatus(data.status)
        setSubCategoryID(data.id);
    }

    const changeLabtestStatus = () => {
        setIsLoading(true)
        let subCategoryStatus = categoryStatus == true ? false : true;
        httpClient.PUT("labtest/category/change/" + subCategoryID + "/" + subCategoryStatus, {}, null, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    notify.success(resp.data.message)
                    handleClose();
                    getSubcategory();
                    setIsLoading(false)
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const getEditSubcategory = (e, data) => {
        setSubCategoryID(data.id)
        if (data) {
            let labtestData = {
                label: data.labtestname,
                value: data.labtestid
            }

            let instituteData = {
                label: data.institutename,
                value: data.medicalinstituteid
            }
            console.log(instituteData)
            setLabTestSubcategory({
                selectedLabtest: labtestData,
                selectedInstitute: instituteData,
                subCategory: data.name ?? "",
                description: data.description ?? "",
                price: data.price ?? 0
            })
            window.scrollTo(0, 0)
        }
    }

    const editSubcategoryData = (values) => {
        setIsLoading(true)
        try {
            let labtestId = values.selectedLabtest.value;
            let instituteid = values.selectedInstitute.value
            let labSubcategory = {
                name: values.subCategory,
                description: values.description,
                price: values.price,
                labTestId: labtestId,
                medicalInstituteId: instituteid,
                labTestCategoryId: subCategoryID,
            }
            console.log("EDIT PAYLOAD");
            console.log(labSubcategory);
            httpClient.PUT("labtest/category/update", labSubcategory, false, true)
                .then(resp => {
                    console.log(resp)
                    if (resp.data.status) {
                        notify.success(resp.data.message)
                        clearForm();
                        getSubcategory();
                    }
                })
                .catch(err => {
                    if (err.response && err.response.data && err.response.data.data.length > 0) {
                        const errMessage = err.response.data.data[0].errorMsg;
                        notify.error(errMessage)
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    const clearForm = () => {
        formik.resetForm();
        setLabTestSubcategory({
            labtestID: "",
            instituteId: "",
            subCategory: "",
            description: "",
            price: "",
            selectedLabtest: {},
            selectedInstitute: {},
        })
        setSubCategoryID(null);
    }

    const handleCancelEdit = () => {
        setSubCategoryID(null);
        setLabTestSubcategory({
            labtestID: "",
            instituteId: "",
            subCategory: "",
            description: "",
            price: "",
        })
    }

    return (
        <div>
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Lab Test Name</Form.Label>
                                <Select
                                    value={formik.values.selectedLabtest}
                                    options={allLabtest}
                                    name="labtestID"
                                    onChange={handleLabtestChange}
                                >
                                </Select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Sub Category</Form.Label>
                                <Form.Control type="text" name="subCategory" onChange={formik.handleChange}
                                    value={formik.values.subCategory} onBlur={formik.handleBlur} />
                                {formik.touched.subCategory && formik.errors.subCategory ?
                                    <div className="error-message">{formik.errors.subCategory}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Institute</Form.Label>
                                <Select
                                    value={formik.values.selectedInstitute}
                                    options={allInstitue}
                                    name="instituteId"
                                    onChange={handleInstituteChange}
                                >
                                </Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group >
                                <Form.Label>Sub Category Description</Form.Label>
                                <Form.Control type="text" name="description" onChange={formik.handleChange}
                                    value={formik.values.description} onBlur={formik.handleBlur} />
                                {formik.touched.description && formik.errors.description ?
                                    <div className="error-message">{formik.errors.description}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group >
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" name="price" onChange={formik.handleChange}
                                    value={formik.values.price} onBlur={formik.handleBlur} />
                                {formik.errors.price && formik.touched.price ?
                                    <div className="error-message">{formik.errors.price}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    {isLoading ?
                        <Cliploader isLoading={isLoading} />
                        :
                        <div className="textAlign-right mb-5">
                            {subCategoryID ?
                                <div >
                                    <Button variant="info" type="submit">
                                        Edit
                                    </Button>
                                    <Button variant="danger" style={{ marginLeft: '10px' }} onClick={handleCancelEdit}>
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
                        { title: 'Lab Test Name', field: 'labtestname', },
                        { title: 'Subcategory', field: 'name', sorting: false },
                        { title: 'Description', field: 'description' },
                        { title: 'Institute', field: 'institutename' },
                        { title: 'Price', field: 'priceString' },
                        {
                            title: 'Status', field: 'activeStatus',
                            render: rowData => rowData.status == true ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>

                        },
                    ]}
                    data={subCategory}
                    title="Lab Test Subcategory "
                    icons={Tableicons}
                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit Service',
                            onClick: (e, rowData) => { getEditSubcategory(e, rowData) }
                        },
                        {
                            icon: DeleteOutline,
                            tooltip: 'Change Status',
                            onClick: (e, rowData) => { subcategoryChangeStatus(e, rowData) }
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
                        <Modal.Title><b>Labtest Subcategory Status</b></Modal.Title>
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
                                <Button variant="info" onClick={changeLabtestStatus} style={{ marginLeft: '8px' }} >
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

export default LabtestSubcategory