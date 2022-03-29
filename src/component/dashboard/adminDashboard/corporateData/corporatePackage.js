import Select from 'react-select'
import { useState, useEffect } from "react"
import { Form, Button, Container, Row, Col, Modal, Nav, Image } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import { useFormik } from "formik";
import { validateCorporate } from "./corporate.helper";
import MaterialTable from 'material-table'
import { Edit, Clear } from "@material-ui/icons";
import Cliploader from "../../../../utils/clipLoader";
import Tableicons from "../../../../utils/materialicons";
import "../button.css";
import { validateCorporatePackage } from './corporate.package.helper';
import { formatDate } from '../../../../utils/dateHelper';

const CorporatePacakge = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [corporateID, setCorporateID] = useState("");
    const [corporateStatus, setCorporateStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [allCorporate, setAllCorporate] = useState([]);
    const [corporatePackage, setCorporatePackage] = useState([]);
    const [allCorporatePackage, setAllCorporatePackage] = useState([]);

    const today = formatDate();
    console.log(today);

    const [corporateInfo, setCorporateInfo] = useState({
        fromDate: today,
        toDate: today,
        selectedCorporate: {},
        corporateId: "",
        selectedPackage: {},
        packageId: "",
        freeBooking: "",
    })


    const getAllCorporate = async () => {
        try {
            let resp = await httpClient.GET("corporate/get/all", false, true)
            console.log(resp);
            if (resp.data.status) {
                let data = resp.data.data;
                let options = data.map((test, index) => {
                    return {
                        label: test.name,
                        value: test.id
                    }
                })
                console.log(options)
                setAllCorporate(options)
            }
        } catch (err) {
            console.log(err)
        }

    }

    const getCorporatePackage = async () => {
        try {
            let resp = await httpClient.GET("membership-packages/get-all/0", false, true)
            console.log(resp);
            if (resp.data.status) {
                let data = resp.data.data;
                let options = data.map((test, index) => {
                    return {
                        label: test.name,
                        value: test.id
                    }
                })
                console.log(options)
                setCorporatePackage(options)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const getAllCorporatePackage = async () => {
        try {
            let resp = await httpClient.GET("corporate-package/get-all", false, true)
            console.log(resp);
            if (resp.data.status) {
                let data = resp.data.data;
                setAllCorporatePackage(data)
            }
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getAllCorporate();
        getCorporatePackage();
        getAllCorporatePackage();
    }, [])

    const createCorporate = (values) => {
        try {
            setLoading(true)
            let packageId = formik.values.selectedPackage.value;
            let corporateId = formik.values.selectedCorporate.value;

            let data = {
                corporateId: corporateId,
                membershipPackageId: packageId,
                fromDate: values.fromDate,
                toDate: values.toDate,
                freeBookings: values.freeBooking,
            }

            httpClient.POST("corporate-package/create", data, false, true)
                .then(resp => {
                    if (resp.data.status) {
                        notify.success(resp.data.message)
                        formik.resetForm();
                        getAllCorporatePackage();
                    }
                })
                .catch(err => {
                    if (err.response || err.response.data) {
                        notify.error(err.response.data.message || "Something went wrong")
                        setLoading(false)
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        catch (err) {
            setLoading(false)
        }
    }

    const getEditInfo = (e, data) => {
        console.log(data)
        setCorporateID(data.corporatepackageid);
        let corporateName = {
            label: data.corporatename,
            value: data.corporateid
        }

        let packageName = {
            label: data.packagename,
            value: data.packageid
        }
        if (data) {
            setCorporateInfo({
                fromDate: data.fromdate,
                toDate: data.todate,
                freeBooking: data.freebookings,
                selectedCorporate: corporateName,
                selectedPackage: packageName,

            })
            window.scrollTo(0, 0)
        }
    }

    const editCorporateInfo = (values) => {
        try {
            setLoading(true);
            let packageId = formik.values.selectedPackage.value;
            let corporateId = formik.values.selectedCorporate.value;

            let data = {
                corporateId: corporateId,
                membershipPackageId: packageId,
                fromDate: values.fromDate,
                toDate: values.toDate,
                freeBookings: values.freeBooking,
            }
            httpClient.PUT("corporate-package/update/" + corporateID, data, false, true)
                .then(resp => {
                    if (resp.data.status) {
                        notify.success(resp.data.message);
                        setLoading(false)
                        getAllCorporate();
                        setCorporateInfo({
                            fromDate: today,
                            toDate: today,
                            corporateId: "",
                            packageId: "",
                            freeBooking: "",

                        })
                        setCorporateID(null);

                    }
                })
                .catch(err => {
                    notify.error(err.response.data.message || "Something went wrong")
                    setLoading(false)
                })

                .finally(() => {
                    setLoading(false)
                })
        }
        catch (err) {
            notify.error(err)
        }
    }

    const handleCancelEdit = () => {
        setCorporateID(null);
        setCorporateInfo({
            fromDate: today,
            toDate: today,
            freeBooking: "",
        })

    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: corporateInfo,
        onSubmit: values => {
            if (corporateID) {
                editCorporateInfo(values)
            } else {
                createCorporate(values)
            }
        },
        validate: values => {
            let isEdit = corporateID ? true : false;
            return validateCorporatePackage(values, isEdit);
        },
    })

    const handleClose = () => setShowModal(false)

    const deactivateCorporate = (e, data) => {
        console.log(data)
        setShowModal(true)
        setCorporateID(data.corporatepackageid);
        setCorporateStatus(data.status);
    }

    const changeCorporateStatus = () => {
        setLoading(true)
        let status = corporateStatus == true ? false : true;

        httpClient.PUT("corporate-package/update/" + corporateID + "/" + status, {}, null, true)
            .then(resp => {
                if (resp.data.status) {
                    notify.success(resp.data.message)
                    handleClose();
                    getAllCorporate();
                    setLoading(false)
                }

            })
            .catch(err => {
                setLoading(false)

            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handlePackageChange = (item) => {
        formik.setFieldValue('selectedPackage', item)
    }

    const handleCorporateChange = (item) => {
        formik.setFieldValue('selectedCorporate', item)
    }
    return (
        <div>
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Corporate Name</Form.Label>
                                <Select
                                    value={formik.values.selectedCorporate}
                                    options={allCorporate}
                                    name="corporateId" className='formControl roleSelect'
                                    onChange={handleCorporateChange}
                                >
                                </Select>
                                {formik.errors.selectedCorporate && formik.touched.selectedCorporate ?
                                    <div className="error-message">{formik.errors.selectedCorporate}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group >
                                <Form.Label>Package Name</Form.Label>
                                <Select
                                    value={formik.values.selectedPackage}
                                    options={corporatePackage}
                                    name="packageId" className='formControl roleSelect'
                                    onChange={handlePackageChange}
                                >
                                </Select>
                                {formik.errors.selectedPackage && formik.touched.selectedPackage ?
                                    <div className="error-message">{formik.errors.selectedPackage}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Free Booking</Form.Label>
                                <Form.Control type="text" name="freeBooking" className='formControl'
                                    onChange={formik.handleChange} value={formik.values.freeBooking} onBlur={formik.handleBlur} />
                                {formik.errors.freeBooking && formik.touched.freeBooking ?
                                    <div className="error-message">{formik.errors.freeBooking}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>From Date</Form.Label>
                                <Form.Control type="date" name="fromDate" className='formControl'
                                    onChange={formik.handleChange} value={formik.values.fromDate} onBlur={formik.handleBlur} />
                                {formik.errors.fromDate && formik.touched.fromDate ?
                                    <div className="error-message">{formik.errors.fromDate}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>To Date</Form.Label>
                                <Form.Control type="date" name="toDate" className='formControl'
                                    onChange={formik.handleChange} value={formik.values.toDate} onBlur={formik.handleBlur} />
                                {formik.errors.toDate && formik.touched.toDate ?
                                    <div className="error-message">{formik.errors.toDate}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                    </Row>

                    <div className="textAlign-right mb-3">
                        {loading == true ?
                            <Cliploader isLoading={loading} />
                            :
                            <div>
                                {corporateID ?
                                    <div >
                                        <Button className="cancel-button" type="button" onClick={handleCancelEdit}>
                                            Cancel
                                        </Button>
                                        <Button className="change-button" style={{ marginLeft: '10px' }} type="submit">
                                            Save
                                        </Button>
                                    </div>
                                    :
                                    <div >
                                        <Button variant="info" type="submit" >
                                            Create
                                        </Button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </Form>

                <MaterialTable
                    data={allCorporatePackage}
                    title="Corporate Pacakge Details"
                    icons={Tableicons}
                    columns={[
                        { title: '#', field: 'tableData.id', render: rowData => rowData.tableData.id + 1, width: "10%" },
                        { title: 'Corporate Name', field: 'corporatename' },
                        { title: 'Package Name', field: 'packagename' },
                        {
                            title: 'Status', field: 'status',
                            render: rowData => rowData.status.toString() == "true" ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>
                        },
                    ]}

                    actions={[

                        {
                            icon: Edit,
                            tooltip: 'Edit Corporate',
                            onClick: (e, rowData) => { getEditInfo(e, rowData) }
                        },
                        {
                            icon: Clear,
                            tooltip: 'Change Status',
                            onClick: (e, rowData) => { deactivateCorporate(e, rowData) }
                        }

                    ]}
                    isLoading={loading}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }
                    }}
                />

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title><b>Corporate Package Status</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >Do you really want to change this corporate package status ?</Modal.Body>
                    <Modal.Footer>
                        {loading == true ?
                            <Cliploader isLoading={loading} />
                            :
                            <div>
                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="info" onClick={changeCorporateStatus} style={{ marginLeft: '8px' }} >
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
export default CorporatePacakge
