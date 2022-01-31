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
import "./admin.component.css"
const Permission = (props) => {

    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [permissionId, setPermissionID] = useState("");
    const [allRoles, setAllRoles] = useState([]);
    const [roleId, setRoleId] = useState("");
    const [allScreens, setAllScreens] = useState([]);
    const [allPermission, setAllPermission] = useState([]);
    const [permissionData, setPermissionData] = useState(
        {
            role: "",
            roleId: "",
            screens: "",
            screenId: [],
        }
    )

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

    const getAllScreenRole = async () => {
        setLoading(true)
        try {
            let resp = await UserManagementApi.getAllScreenRole();
            console.log(resp)
            if (resp.data.status) {
                let result = resp.data.data;
                setAllPermission(result)
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false)
    }

    const getScreenByRole = async (id) => {
        try {
            let resp = await UserManagementApi.getScreenbyId(id);
            if (resp.data.status) {
                let result = resp.data.data.Screen;
                let tempArr = [];
                result.forEach((item) => {
                    console.log(item);
                    let filteredArr = allScreens.filter((screen) => {
                        return screen.value.toString() === item.screenid.toString()
                    })
                    console.log(filteredArr[0]);
                    if (filteredArr.length > 0) {
                        tempArr.push(filteredArr[0]);
                    }
                })
                console.log(tempArr);
                formik.setFieldValue('screens', tempArr)

            }
        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
    }
    useEffect(() => {
        getAllScreens();
        getAllRoles();
        getAllScreenRole();
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: permissionData,
        onSubmit: (values) => {
            console.log(values)
            editPermission(values);

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

    const editPermission = async (values) => {
        setLoading(true);
        try {
            console.log(roleId);
            let resp = await UserManagementApi.editPermission(values, roleId);
            if (resp.data.status) {
                notify.success(resp.data.message);
                formik.resetForm();
                getAllScreenRole();
            }
        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setLoading(false);
    }

    const handleRoleChange = (item) => {

        if(!item) return;
        formik.setFieldValue("role", item);
        let id = item.value;
        setRoleId(id)
        getScreenByRole(id);
    }
    const handleScreenChange = (item) => {
        formik.setFieldValue("screens", item);
    }

    const setEditScreenData = (e, data) => {
        console.log(data);
        if (data) {
            let id = data.roleid;
            setRoleId(id)
            getScreenByRole(id);
            let roleData = {
                label: data.rolename,
                value: id
            }
            setPermissionData({
                role:roleData
            })
            window.scrollTo(0, 0)
        }
    }

    const handleCancelEdit = () => {
        formik.resetForm();
        setPermissionData({
                role: "",
                roleId: "",
                screens: "",
                screenId: [],
        })
    }

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
                                        <Select className="roleSelect formControl"
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
                                            isMulti className="roleSelect formControl"
                                            options={allScreens}
                                            name="screenId"
                                            onChange={handleScreenChange}
                                        ></Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div>
                                {formik.values && formik.values.role ?
                                    <div>
                                        {isLoading == true ?
                                            <Cliploader isLoading={isLoading} />
                                            :
                                            <div className="textAlign-right">
                                                <Button variant="info" type="submit">
                                                    Update
                                                </Button>
                                                <Button variant="danger" style={{ marginLeft: '10px' }} onClick={handleCancelEdit}>
                                                    Cancel
                                                </Button>
                                            </div>

                                        }
                                    </div>

                                    :
                                    <></>
                                }


                            </div>
                        </Form>
                    </Card.Body>
                </Card>

                <MaterialTable
                    title="Screen Permission "
                    icons={Tableicons}
                    data={allPermission}
                    columns={[
                        { title: '#', field: 'tableData.id', render:rowData => rowData.tableData.id+1},
                        { title: 'Screen Name', field: 'screens' },
                        { title: 'Role Name', field: 'rolename' },
                        {
                            title: 'Status', field: 'isactive',
                            render: (rowData) =>
                                rowData.isactive === true ? (
                                    <span style={{ color: "#18af69" }}>Active</span>
                                ) : (
                                    <span style={{ color: "red" }}>inActive</span>
                                )
                        }
                    ]}

                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit Role',
                            onClick: (e, rowData) => { setEditScreenData(e, rowData) }
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
export default Permission