import Select from 'react-select'
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";
import Cliploader from "../../../../utils/clipLoader";
import Tableicons from '../../../../utils/materialicons';
import MaterialTable from 'material-table';
import { notify } from "../../../../services/notify";
import PackageApi from "./package.service";
import { validatePackage, validatePackageDetails } from "./package.helper";
import { Edit, Clear } from "@material-ui/icons";
import "./package.css";

const MembershipPackageDetails = (props) => {

    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [allPackages, setAllPackages] = useState([]);
    const [packageDetail, setPackageDetail] = useState([]);
    const [detailID, setDetailID] = useState("");
    const [packageData, setPackageData] = useState({

        packageId: "",
        selectedPackage: {},
        details: "",
        allDetails: [],
    })


    const getPackages = async () => {
        setLoading(true);
        try {
            let resp = await PackageApi.getAllPackage();
            if (resp.data.status) {
                let tempPackage = resp.data.data;
                let truePackage = tempPackage.filter((item)=>{
                    return item.status == true
                })
                let option = truePackage.map((item, index) => {
                    return {
                        label: item.name,
                        value: item.id,
                    }
                })
                setAllPackages(option)

            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
    }

    const getPackageDetails = async () => {
        setLoading(true);
        try {
            let resp = await PackageApi.getPackageDetails();
            if (resp.data.status) {
                let data = resp.data.data;
                console.log(data)
                setPackageDetail(data)
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
        getPackageDetails();
    }, [])

    const createPackageDetails = async (values) => {
        setLoading(true);
        try {
            let resp = await PackageApi.createPackageDetail(values);
            if (resp.data.status) {
                notify.success(resp.data.message)
                formik.resetForm();
                getPackageDetails();
                formik.setFieldValue("allDetails", [])
            }

        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
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
            return validatePackageDetails(values,isEdit);
        },

    })

    const handleAddDetails = (values) => {
        if (!values.details) return;
        let tempArr = values.allDetails;
        tempArr.push(values.details);
        formik.setFieldValue('allDetails', tempArr)
        formik.setFieldValue('details', "")
    }

    const handlePackageChange = (item) => {
        formik.setFieldValue('selectedPackage', item)
    }

    const editPackageDetail = (e, data) => {
        console.log(data);
        setDetailID(data.id)
        if (data) {
            let packageData = {
                label: data.name,
                value: data.membershippackageid
            }
            setPackageData({
                selectedPackage: packageData,
                details: data.points

            })
            window.scrollTo(0, 0)
        }
    }

    const handleEditDetails = async (values) => {
        setLoading(true);
        try {
            let resp = await PackageApi.editPackageDetails(values, detailID);
            if (resp.data.status) {
                notify.success(resp.data.message);
                setDetailID(null);
                setPackageData({
                    packageId: "",
                    selectedPackage: {},
                    details: "",
                    allDetails: [],
                })
                getPackageDetails();
            }

        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
    }


    const handleCancelEdit = () => {
        setDetailID(null);
        setPackageData({
            packageId: "",
            selectedPackage: {},
            details: "",
            allDetails: [],
        })
    }

    const removeDetail = (index) => {
        let tempArr = [...formik.values.allDetails];
        tempArr.splice(index,1);
        formik.setFieldValue('allDetails',tempArr)
    }

    return (
        <div>
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Package Name</Form.Label>
                                <Select className="roleSelect formControl"
                                    value={formik.values.selectedPackage}
                                    options={allPackages}
                                    name="packageId"
                                    onChange={handlePackageChange}
                                >
                                </Select>
                                {formik.errors.selectedPackage && formik.touched.selectedPackage ?
                                    <div className="error-message">{formik.errors.selectedPackage}</div>
                                    : null}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group >
                                <Form.Label>Details : </Form.Label>
                                <Form.Control className='formControl' type="text" name="details" onChange={formik.handleChange}
                                    value={formik.values.details} onBlur={formik.handleBlur} />
                                {formik.touched.details && formik.errors.details ?
                                    <div className="error-message">{formik.errors.details}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        {!detailID ?
                            <Col md={2}>
                                <br></br>
                                <Button variant="info"  className='formControl' onClick={() => handleAddDetails(formik.values)}>Add</Button>
                            </Col>
                            :
                            <></>
                        }

                    </Row>

                    <Row>
                        <Col md={4}></Col>
                        <Col md={6}>
                            {formik.values && formik.values.allDetails ?
                                <ul>
                                    {formik.values && formik.values.allDetails.map((item,index) => {
                                        return <div className='clearfix'>
                                            <li className='purposeList'>
                                                <span className='flaotLeft'>{item}</span>
                                                <span className="removeBtn floatRight" 
                                                onClick={()=>removeDetail(index)}>Remove</span>
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
                    columns={[
                        { title: '#', field: 'tableData.id', render:rowData => rowData.tableData.id+1},
                        { title: "Name", field: "name" },
                        { title: "Points", field: "points" },
                    ]}
                    data={packageDetail}
                    title="Pacakges Details"
                    icons={Tableicons}

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

                    ]}
                />

            </Container>


        </div>
    )
}

export default MembershipPackageDetails