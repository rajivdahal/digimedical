import { useFormik } from "formik";
import Select from 'react-select'
import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button,Modal } from "react-bootstrap";
import Cliploader from "../../../../utils/clipLoader";
import Tableicons from '../../../../utils/materialicons';
import MaterialTable from 'material-table';
import { notify } from "../../../../services/notify";
import PackageApi from "./package.service";
import { validatePackage } from "./package.helper";
import { Edit, Clear } from "@material-ui/icons";

const MembershipPackage = (props) => {

    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [packages, setPackages] = useState([]);
    const [allPackages, setAllPackages] = useState([]);
    const [packageID, setPackageID] = useState("");
    const [packageStatus,setPackageStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [packageData, setPackageData] = useState({

        packageId: "",
        selectedPackage: [],
        packageName: "",
        price: "",
        launchingOffer: "",
        labDiscount: "",

    })

    const getAllPackages = async () => {
        setLoading(true);
        try {
            let resp = await PackageApi.getAllPackage();
            if (resp.data.status) {
                let truePackage = resp.data.data;
                let option = truePackage.map((item, index) => {
                    return {
                        label: item.name,
                        value: item.id,
                    }
                })
                setPackages(option)

            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
    }

    const getPackages = async () => {
        setLoading(true);
        try {
            let resp = await PackageApi.getAllPackage();
            if (resp.data.status) {
                setAllPackages(resp.data.data)
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
        getPackages();
        getAllPackages()
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: packageData,
        onSubmit: (values) => {
            console.log(values)
            if (packageID) {
                handleEditPackage(values)
            } else {
            createPackage(values);
                
            }
        },

        validate: (values) => {
            let isEdit = packageID ? true : false;
            return validatePackage(values, isEdit);
        },

    })


    const createPackage = async (values) => {
        setLoading(true)
        try {
            let resp = await PackageApi.createPackage(values);
            if (resp.data.status) {
                notify.success(resp.data.message)
                formik.resetForm();
                getPackages();
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
    }

    const handleClose = () => setShowModal(false)

    const deactivatePackage = async (e,data) => {
        console.log(data)
        setShowModal(true)
        setPackageID(data.id);
        setPackageStatus(data.status)
    }

    const changePackageStatus=async()=>{
        setLoading(true)
        try {
            let resp = await PackageApi.changeStatus(packageID, packageStatus);
            if (resp.data.status) {
                notify.success(resp.data.message)
                getPackages();
            }
        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
        handleClose();

    }

    const setEditPackageData = (e,data)=>{
        setPackageID(data.id);
        setPackageData({
            packageName : data.name ?? "",
            price : data.amount ?? 0,
            labDiscount : data.laboratoryPercentage ?? 0,
            launchingOffer : data.lunchingOfferPrice ?? 0,
        })
        window.scrollTo(0,0);
    }


    const handleEditPackage = async (values) => {
        setLoading(true)
        try {
            let resp = await PackageApi.editPackage(values,packageID);
            if (resp.data.status) {
                notify.success(resp.data.message)
                setPackageData({
                    packageName: "",
                    price: "",
                    launchingOffer: "",
                    labDiscount: "",
                })
                setPackageData(null)
                getPackages();
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
    }

    const handleCancelEdit=()=>{
        setPackageData({
            packageName: "",
            price: "",
            launchingOffer: "",
            labDiscount: "",
        })
        setPackageData(null)
    }

    const handlePackageChange = (item) => {
        formik.setFieldValue('selectedPackage', item)
    }

    return (
        <div>
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">

                    <Col md={4}>
                            <Form.Group>
                                <Form.Label>Package Name</Form.Label>
                                <Select
                                    value={formik.values.selectedPackage}
                                    options={packages}
                                    name="packageId"
                                    onChange={handlePackageChange}
                                >
                                </Select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Sub Package Name :</Form.Label>
                                <Form.Control type="text" name="packageName" onChange={formik.handleChange}
                                    value={formik.values.packageName} onBlur={formik.handleBlur} />
                                {formik.errors.packageName && formik.touched.packageName ?
                                    <div className="error-message">{formik.errors.packageName}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Actual Price :</Form.Label>
                                <Form.Control type="text" name="price" onChange={formik.handleChange}
                                    value={formik.values.price} onBlur={formik.handleBlur} />
                                {/* {formik.touched.price && formik.errors.price ?
                                    <div className="error-message">{formik.errors.price}</div>
                                    : null} */}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">

                        <Col md={6}>
                            <Form.Group >
                                <Form.Label>Launching Offer</Form.Label>
                                <Form.Control type="text" name="launchingOffer" onChange={formik.handleChange}
                                    value={formik.values.launchingOffer} onBlur={formik.handleBlur} />
                                {formik.touched.launchingOffer && formik.errors.launchingOffer ?
                                    <div className="error-message">{formik.errors.launchingOffer}</div>
                                    : null}
                            </Form.Group>

                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Laboratory Discount</Form.Label>
                                <Form.Control type="text" name="labDiscount" onChange={formik.handleChange}
                                    value={formik.values.labDiscount} onBlur={formik.handleBlur} />
                                {formik.errors.labDiscount && formik.touched.labDiscount ?
                                    <div className="error-message">{formik.errors.labDiscount}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mb-5" >
                        {packageID ?
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

                <MaterialTable
                    title="Role "
                    icons={Tableicons}
                    data={allPackages}
                    columns={[
                        { title: '#', field: 'tableData.id', render:rowData => rowData.tableData.id+1},
                        { title: 'Name', field: 'name' },
                        { title: 'Actual Price', field: 'amount' },
                        { title: 'Launching Price', field: 'lunchingOfferPrice' },
                        { title: 'Lab Discount', field: 'laboratoryPercentage' },
                        {
                            title: "Status",
                            field: "status",
                            render: (rowData) =>
                                rowData.status.toString() == true.toString() ? (
                                    <span style={{ color: "#18af69" }}>Active</span>
                                ) : (
                                    <span style={{ color: "red" }}>inActive</span>
                                ),
                        },
                    ]}

                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit Package',
                            onClick: (e, rowData) => { setEditPackageData(e, rowData) }
                        },

                        {
                            icon: Clear,
                            tooltip: "Change Status",
                            onClick: (e, rowData) => {deactivatePackage(e, rowData) },
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

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>
                            <b>Change Package Status</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you really want to change this package status ?
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

        </div>
    )
}

export default MembershipPackage