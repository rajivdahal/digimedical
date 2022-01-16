import Select from 'react-select'
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";
import Cliploader from "../../../../utils/clipLoader";
import Tableicons from '../../../../utils/materialicons';
import MaterialTable from 'material-table';
import { notify } from "../../../../services/notify";
import PackageApi from "./package.service";
import { validatePackage } from "./package.helper";
import { Edit, Clear } from "@material-ui/icons";

const MembershipPackageDetails = (props) => {

    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [allPackages, setAllPackages] = useState([]);
    const [packageID, setPackageID] = useState("");
    const [packageStatus, setPackageStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [packageData, setPackageData] = useState({
        packageId: "",
        selectedPackage: [],
        description: "",
        details :"",
        allDetails: [],
    })


    const getPackages = async () => {
        setLoading(true);
        try {
            let resp = await PackageApi.getAllPackage();
            if (resp.data.status) {
                let truePackage = resp.data.data;
                console.log(truePackage)
                let option = truePackage.map((item, index) => {
                    return {
                        label: item.name,
                        value: item.id,
                    }
                })
                console.log(option)
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

    useEffect(() => {
        getPackages();
    }, [])

    const createPackageDetails = (values) => {
        setLoading(true);
        try {
            let selectedId = values.selectedPackage.value;
            let  data ={
                membershipPackageId : selectedId,
                description : values.description,

            }
            console.log(data)

            
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
            createPackageDetails(values);

            // if (packageID) {
            //     handleEditPackage(values)
            // } else {
            // createPackage(values);

            // }
        },

        // validate: (values) => {
        //     let isEdit = packageID ? true : false;
        //     return validatePackage(values, isEdit);
        // },

    })

    const handleAddDetails=()=>{

    }
    
    const handlePackageChange = (item) => {
        console.log(item);
        formik.setFieldValue('selectedPackage', item)
    }

    return (
        <div>
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Package Name</Form.Label>
                                <Select
                                    value={formik.values.selectedPackage}
                                    options={allPackages}
                                    name="packageId"
                                    onChange={handlePackageChange}
                                    defaultInputValue="Please Select One value"
                                >
                                </Select>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group >
                                <Form.Label>Description :</Form.Label>
                                <Form.Control type="text" name="description" onChange={formik.handleChange}
                                    value={formik.values.description} onBlur={formik.handleBlur} />
                                {formik.touched.description && formik.errors.description ?
                                    <div className="error-message">{formik.errors.description}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group >
                                <Form.Label>Details : </Form.Label>
                                <Form.Control type="text" name="details"
                                    value={formik.values.details} onBlur={formik.handleBlur}/>
                                {formik.touched.details && formik.errors.details ?
                                    <div className="error-message">{formik.errors.details}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <br></br>
                            <Button variant="info" onClick={handleAddDetails}>Add More</Button>
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
                                        <Button variant="danger" style={{ marginLeft: '10px' }} >
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

            </Container>

        </div>
    )
}

export default MembershipPackageDetails