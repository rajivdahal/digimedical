import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Cliploader from "../../../../utils/clipLoader";
import Tableicons from '../../../../utils/materialicons';
import MaterialTable from 'material-table';
import { notify } from "../../../../services/notify";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import UserManagementApi from "./userManageService";
import { httpClient } from '../../../../utils/httpClient';

const Role = (props) => {
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [allRoles, setAllRole] = useState([]);
    const [roleID, setRoleID] = useState("")
    const [roleData, setRoleData] = useState({
        name: "",
        description: "",

    })

    const getAllRoles = async () => {
        setLoading(true)
        try {
            let resp = await UserManagementApi.getRole();
            if (resp.data.status) {
                let result = resp.data.data;
                setAllRole(result)
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
        getAllRoles();
    }, [])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: roleData,
        onSubmit: (values) => {
            if (roleID) {
                editRoleData(values)
            } else {
                createRole(values)
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

    const createRole = (values) => {
        setLoading(true)
        try {
            let data = {
                roleName: values.name,
                roleDescription: values.description
            }
            console.log(data)
            httpClient.POST("role/create", data, false, true)
                .then(resp => {
                    notify.success(resp.data.message)
                    formik.resetForm();
                    getAllRoles()
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    notify.error(err.response.data.message)
                })
        }
        catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    const setEditRoleData = (e, data) => {
        console.log(data)
        setRoleID(data.id);
        setRoleData({
            name: data.name,
            description: data.description
        })
        window.scrollTo(0, 0)

    }

    const editRoleData = (values) => {
        setLoading(true)
        try {
            let data = {
                roleName: values.name,
                roleDescription: values.description
            }
            console.log(data)
            httpClient.PUT("role/update/" + roleID, data, false, true)
                .then(resp => {
                    console.log(resp)
                    notify.success(resp.data.message)
                    formik.resetForm();
                    setRoleData({
                        name: "",
                        description: "",
                    })
                    getAllRoles()
                    setLoading(false)
                    setRoleID(null)
                })
                .catch(err => {
                    console.log(err)
                    notify.error(err.response.data.message)
                })
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const handleCancelEdit = () => {
        setRoleID(null);
        setRoleData({
            name: "",
            description: "",
        })
    }
    return (
        <div>

            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Role Name :</Form.Label>
                                <Form.Control type="text" name="name" onChange={formik.handleChange}
                                    value={formik.values.name} onBlur={formik.handleBlur} />
                                {formik.errors.name && formik.touched.name ?
                                    <div className="error-message">{formik.errors.name}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group >
                                <Form.Label>Role Description :</Form.Label>
                                <Form.Control type="text" name="description" onChange={formik.handleChange}
                                    value={formik.values.description} onBlur={formik.handleBlur} />
                                {formik.touched.description && formik.errors.description ?
                                    <div className="error-message">{formik.errors.description}</div>
                                    : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="mb-5" >
                        {roleID ?
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
                    data={allRoles}
                    columns={[
                        { title: 'ID', field: 'id' },
                        { title: 'Name', field: 'name' },
                        { title: 'Description', field: 'description' },

                    ]}

                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit Role',
                            onClick: (e, rowData) => { setEditRoleData(e, rowData) }
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

export default Role;