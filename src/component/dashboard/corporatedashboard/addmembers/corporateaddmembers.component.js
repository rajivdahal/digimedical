import React, { useState, useEffect } from 'react'
import "./corporateaddmembers.component.css"
import MaterialTable from 'material-table'
import { Clear, Add } from "@material-ui/icons";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { httpClient } from '../../../../utils/httpClient';
import { notify } from '../../../../services/notify';
import { Button, Modal } from "react-bootstrap";
import Cliploader from '../../../../utils/clipLoader';


export default function Corporateaddmember(props) {

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [memberID, setMemberID] = useState("");
    const [memberStatus, setMemberStatus] = useState("");

    let [addmember, setaddmember] = useState(false)
    let [members, setmembers] = useState([])
    let [ismemberadded, setismemberadded] = useState(false)
    let initialValues = {
        email: ""
    }
    const getuser = () => {
        setLoading(true)
        httpClient.GET("corporate/get/members", false, true)
            .then(resp => {
                setmembers(resp.data.data);
                setLoading(false)
            })
            .catch(err => {
                notify.error("Something went wrong")
                setLoading(false)
            })
    }
    useEffect(() => {
        getuser()
    }, [])
    const columns = [
        { title: '#', field: 'tableData.id', render: rowData => rowData.tableData.id + 1 },
        {
            title: "Member Name", field: "membername"
        },
        {
            title: "Email", field: "email"
        },
        // {
        //     title: "Contact No", field: "email"
        // },
        {
            title: "Gender", field: "gender",
            render: (rowData) =>
                rowData.gender == 0 ? (
                    <span>Male</span>
                ) : (
                    <span>Female</span>
                ),
        },
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
    ]

    const handleSubmit = (values, onsubmittingprops) => {
        httpClient.POST("corporate/add/members", values, false, true)
            .then(resp => {
                getuser()
                notify.success("Member added successfully")
            })
            .catch(err => {
                notify.error(err.response.data.message)
            })
            .finally(() => {
                setaddmember(!addmember)
                onsubmittingprops.resetForm()
            })
    }

    const handleAdd = () => {
        setaddmember(!addmember)
    }

    const validateSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const handleClose = () => setShowModal(false);

    const changeMemberStatus = (e, data) => {
        console.log(data)
        setShowModal(true);
        setMemberStatus(data.status)
        setMemberID(data.id);
    }

    const handleMemberStatus = async () => {
        setIsLoading(true)
        try {
            let status = memberStatus == true ? false : true;
            let resp = await httpClient.PUT("corporate/change/members/" + status + "/" + memberID, {}, null, true);
            console.log(resp)
            if (resp.data.status) {
                notify.success(resp.data.message)
                handleClose();
                getuser();
            }
        }
        catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
        setIsLoading(false)
    }

    return (
        <div className='content-wrapper adjust-height-width custom-content-wrapper'>
            {
                addmember ? <>
                    <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={handleSubmit} validateOnMount>
                        {
                            (values) => {
                                console.log("values in formik are", values)
                                return (
                                    <Form>
                                        <Field name="email"></Field>
                                        <button type="submit" disabled={values.errors.email}>Add Member</button>
                                    </Form>
                                )

                            }
                        }

                    </Formik>
                </> : null
            }

            <MaterialTable
                title="Members"
                columns={columns}
                isLoading={loading}
                data={members}
                options={{
                    paging: true,
                    searchFieldAlignment: "left",
                    pageSizeOptions: [5, 10, 20, 25, 50],
                    pageSize: 10,
                    showFirstLastPageButtons: false,
                    paginationType: "stepped",
                    paginationPosition: "bottom",
                    exportAllData: true,
                    actionsColumnIndex: -1,
                    search: props.issearchavailable,
                    headerStyle: {
                        backgroundColor: '#2745F0',
                        color: '#FFF'
                    }
                }}
                actions={[
                    {
                        icon: Clear,
                        tooltip: 'Change Status',
                        onClick: (e, rowData) => { changeMemberStatus(e, rowData) }
                    },
                    {
                        icon: Add,
                        tooltip: 'Add Member',
                        position: "toolbar",
                        // className:"add-button",
                        // isFreeAction: true,
                        onClick: (e, rowData) => { handleAdd() }
                    },
                ]}
            ></MaterialTable>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title><b>Institute Status</b></Modal.Title>
                </Modal.Header>
                <Modal.Body >Do you really want to change this institute status ?</Modal.Body>
                <Modal.Footer>
                    {isLoading == true ?
                        <Cliploader isLoading={isLoading} />
                        :
                        <div>

                            <Button variant="danger" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="info" onClick={handleMemberStatus} style={{ marginLeft: '8px' }} >
                                Change Status
                            </Button>
                        </div>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}
