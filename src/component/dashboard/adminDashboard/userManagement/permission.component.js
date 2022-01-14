import { useFormik } from "formik";
import Select from "react-select";
import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import Cliploader from "../../../../utils/clipLoader";
import Tableicons from '../../../../utils/materialicons';
import MaterialTable from 'material-table';
import { notify } from "../../../../services/notify";
import Edit from '@material-ui/icons/Edit';
import UserManagementApi from "./userManageService";
const Permission = (props) => {

    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [permissionId, setPermissionID] = useState("");
    const [allRoles, setAllRoles] = useState([]);
    const [allScreens, setAllScreens] = useState([]);
    const [permissionData, setPermissionData] = useState({
        role: "",
        roleId: "",
        screens: "",
        screenId: "",
    })

    const getAllRoles = async () => {
        setLoading(true)
        try {
            let resp = await UserManagementApi.getRole();
            if (resp.data.status) {
                let result = resp.data.data;
                let options = result.map((item) => {
                    return {
                        label: item.name,
                        value: item.id,
                    };
                });
                setAllRoles(options);
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
    }

    const getAllScreens = async () => {
        setLoading(true)
        console.log("screen")
        try {
            let resp = await UserManagementApi.getAllScreen();
            if (resp.data.status) {
                let result = resp.data.data;
                console.log(result)
                let options = result.map((item) => {
                    return {
                        label: item.name,
                        value: item.id,
                    };
                });
                console.log(options)
                setAllScreens(options)
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
        getAllScreens();
        getAllRoles()
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: permissionData,
        onSubmit: (values) => {
            console.log(values)
            createPermission(values);
            // if (screenID) {
            //     editScreenData(values)
            // } else {
            //     createScreen(values)
            // }
        },

        // validate: (values) => {
        //     let errors = {};
        //     if (!values.screenName) {
        //         errors.screenName = 'Required!'
        //     }
        //     if (!values.description) {
        //         errors.description = 'Required!'
        //     }
        //     return errors;
        // },

    })

    const createPermission=(values)=>{
       
    }

    const handleRoleChange=(item) =>{
        console.log(item);
        formik.setFieldValue("role", item);
    }
    const handleScreenChange = (item) => {
        console.log(item);
        formik.setFieldValue("screens", item);
    };
    return (
        <div>
            <Container>

                <Card className="mb-5" >
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Role</Form.Label>
                                        <Select
                                            value={formik.values.role}
                                            options={allRoles}
                                            name="roleId"
                                            onChange={handleRoleChange}
                                        ></Select>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group >
                                        <Form.Label>Screen </Form.Label>
                                        <Select
                                            value={formik.values.screens}
                                            isMulti
                                            options={allScreens}
                                            name="screenId"
                                            onChange={handleScreenChange}
                                        ></Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div>
                                {permissionId ?
                                    <div>
                                        {isLoading == true ?
                                            <Cliploader isLoading={isLoading} />
                                            :
                                            <div className="textAlign-right">
                                                <Button variant="info" type="submit">
                                                    Edit
                                                </Button>
                                                {/* <Button variant="danger" style={{ marginLeft: '10px' }} onClick={handleCancelEdit}>
                                            Cancel
                                        </Button> */}
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
                    </Card.Body>
                </Card>

                {/* <MaterialTable
                    title="Screen Permission "
                    icons={Tableicons}
                    // data={}
                    columns={[
                        { title: 'ID', field: 'id' },
                        { title: 'Screen Name', field: 'name' },
                        { title: 'Description', field: 'description' },
                        {
                            title: 'Status', field: 'enabled',
                            render: (rowData) =>
                                rowData.enabled == true ? (
                                    <span style={{ color: "#18af69" }}>Enable</span>
                                ) : (
                                    <span style={{ color: "red" }}>Disable</span>
                                )
                        }
                    ]}

                    // actions={[
                    //     {
                    //         icon: Edit,
                    //         tooltip: 'Edit Role',
                    //         onClick: (e, rowData) => { setEditScreenData(e, rowData) }
                    //     },

                    // ]}

                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }
                    }}
                    isLoading={loading}
                />  */}
            </Container>
        </div>
    )
}
export default Permission