import { useFormik } from "formik";
import { useState, useEffect, useRef } from "react";
import { Container, Form, Row, Col, Button, Modal, Image } from "react-bootstrap";
import Cliploader from "../../../../utils/clipLoader";
import Tableicons from '../../../../utils/materialicons';
import MaterialTable from 'material-table';
import { httpClient } from '../../../../utils/httpClient';
import { notify } from "../../../../services/notify";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';

const Labtest = (props) => {
    const imageSelectRef = useRef();
    const [selectedImage, setImage] = useState("");
    const [selectedImgName, setImgName] = useState("");
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [allLabtest, setAllLabtest] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [labtestStatusId, setlabtestStatusId] = useState(null);
    const [labtestStatus, setLabTestStatus] = useState("");
    const [labtestData, setLabTest] = useState({
        name: "",
        description: "",
        image: "",
        date: "",
        price: "",
    })

    const handleClose = () => setShowModal(false)


    const getLabtestData = async () => {
        await httpClient.GET("lab-test/get-all", false, true)

            .then(resp => {
                resp.data.data.forEach((item) => {
                    let splitDesc = item.description.split(" ");
                    if (splitDesc.length < 10) {
                        item.description = item.description
                    } else {
                        let sliceDesc = splitDesc.slice(0, 10);
                        let joinDesc = sliceDesc.join(" ") + " ...";
                        item.description = joinDesc;
                    }

                    item.priceString = "Rs." + item.price;
                })

                if (resp.data.status) {
                    let result = resp.data.data;
                    setAllLabtest(result)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getLabtestData();
    }, [])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: labtestData,
        onSubmit: (values, { resetForm }) => {
            if (labtestStatusId) {
                handleEditLabtestData(values, resetForm);
            } else {
                createLabtest(values)
            }
        },

        validate: (values) => {
            let errors = {};
            if (!values.name) {
                errors.name = 'Required!'
            }
            if (!values.description) {
                errors.description = 'Required!'
            }
            return errors;
        },

    })

    const handleAddImage = () => {
        imageSelectRef.current.click();
    }

    const handleChangeImage = (e) => {
        let files = e.target.files[0];
        console.log(files);
        let reader = new FileReader();
        formik.setFieldValue('image', files);
        reader.onloadend = () => {
            setImage(reader.result.toString());
            setImgName(files.name);
        };
        reader.readAsDataURL(files);
    }   

    const createLabtest = (values) => {
        try {
         
        setIsLoading(true)

        let formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('issueDate', values.date);
        formData.append('price', values.price);
        formData.append('image', values.image);
        console.log(values.image)
        httpClient.POST("lab-test/create", formData, false, true, "formdata")
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    console.log(resp.data.data);
                    notify.success(resp.data.message)
                    setIsLoading(false)
                    getLabtestData();
                    formik.resetForm();
                    setImage("");
                    setImgName("");
                }
            })
            .catch(err => {
                console.log(err.response)
                setIsLoading(false)
                notify.error(err.response.data.message || "Something went wrong")

            })
        }
        catch(err){
            console.log(err)
        }
    }

    const handleStatusModal = (e, data) => {
        setlabtestStatusId(data.id)
        setShowModal(true);
        setLabTestStatus(data.status)
    }

    const changeLabtestStatus = () => {
        setIsLoading(true)

        let labstatus = labtestStatus == true ? false : true;

        httpClient.PUT("lab-test/change-status/" + labtestStatusId + "/" + labstatus, {}, null, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    notify.success(resp.data.message)
                    handleClose();
                    getLabtestData();
                    setIsLoading(false)

                }

            })
            .catch(err => {
                console.log(err);
                // console.log(err.response.data)
                setIsLoading(false)

            })
    }

    const setLabtestData = (e, data) => {
        let id = data.id;
        setlabtestStatusId(id)
        console.log(data);
        if (data) {
            let url = "http://202.51.74.219:8082/api/lab-test/download/" + id;
            setImage(url)
            setLabTest({
                name: data.name,
                description: data.description,
                date: data.issueDate,
                price: data.price,
            })
            window.scrollTo(0, 0)
        }
    }

    const handleEditLabtestData = (values) => {
        setIsLoading(true)
        let formData = new FormData();
        if (values.image) {
            formData.append("image", values.image);
        }
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('issueDate', values.date);
        formData.append('price', values.price);
        formData.append('id', labtestStatusId)
        console.log(values.date);

        httpClient.PUT("lab-test/update", formData, false, true, "formdata")
            .then(resp => {
                // console.log(resp)
                if (resp.data.status) {
                    notify.success(resp.data.message);
                    setIsLoading(false)
                    getLabtestData();
                    // formik.resetForm();
                    setLabTest({
                        name: "",
                        description: "",
                        image: "",
                        date: "",
                        price: "",
                    })
                    setImage("");
                    setImgName("");
                    setlabtestStatusId(null);

                }
            })
            .catch(err => {
                console.log(err.response.data.message)
                notify.error(err.response.data.message || "Something went wrong")
                setIsLoading(false)
            })
    }

    const handleCancelEdit = () => {
        setlabtestStatusId(null);
        setImgName("");
        setImage("")
        setLabTest({
            name: "",
            description: "",
            image: "",
            date: "",
            price: "",
        })
    }
    return (
        <div>

            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Lab Test Name</Form.Label>
                                <Form.Control type="text" name="name" onChange={formik.handleChange}
                                    value={formik.values.name} onBlur={formik.handleBlur} />
                                {formik.errors.name && formik.touched.name ?
                                    <div className="error-message">{formik.errors.name}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group >
                                <Form.Label>Lab Test Description</Form.Label>
                                <Form.Control type="text" name="description" onChange={formik.handleChange}
                                    value={formik.values.description} onBlur={formik.handleBlur} />
                                {formik.touched.description && formik.errors.description ?
                                    <div className="error-message">{formik.errors.description}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <Form.Label>Choose Photo :  </Form.Label><br></br>
                            <Button variant="info" onClick={handleAddImage}>Browse</Button>
                            <input onChange={(e) => handleChangeImage(e)} type="file" name="image" style={{ display: "none" }} ref={imageSelectRef}  ></input>
                        </Col>

                        <Col md={5}>
                            <div>
                                {selectedImgName}
                            </div>
                            <Image src={selectedImage} fluid className="image ml-3" ></Image>
                        </Col>
                    </Row>

                    <div className="mb-5" >
                        {labtestStatusId ?
                            <div>
                                {isLoading == true ?
                                    <Cliploader isLoading={isLoading} />
                                    :
                                    <div className="textAlign-right">
                                        <Button variant="info" type="submit">
                                            Edit
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

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title><b>Change Labtest Status</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >Do you really want to change this labtest status ?</Modal.Body>
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

                <MaterialTable
                    title="Laboratory Test "
                    icons={Tableicons}
                    data={allLabtest}
                    columns={[
                        { title: '#', field: 'tableData.id', render:rowData => rowData.tableData.id+1},
                        { title: 'Name', field: 'name' },
                        { title: 'Description', field: 'description' },
                        {
                            title: 'Status', field: 'status',
                            render: rowData => rowData.status == true ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>

                        },
                    ]}

                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit Labtest',
                            onClick: (e, rowData) => { setLabtestData(e, rowData) }
                        },
                        {
                            icon: DeleteOutline,
                            tooltip: 'Change Status',
                            onClick: (e, rowData) => { handleStatusModal(e, rowData) }
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
                    isLoading={loading}
                />
            </Container>
        </div>
    )
}

export default Labtest;