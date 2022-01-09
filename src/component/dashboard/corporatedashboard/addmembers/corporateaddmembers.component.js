import React, { useState ,useEffect} from 'react'
import "./corporateaddmembers.component.css"
import MaterialTable from 'material-table'
import { Check, Edit, Clear, Add } from "@material-ui/icons";
import { Formik, Field,Form } from 'formik';
import * as Yup from 'yup';
import { httpClient } from '../../../../utils/httpClient';
import { notify } from '../../../../services/notify';
export default function Corporateaddmember(props) {
    let [addmember, setaddmember] = useState(false)
    let [members,setmembers]=useState([])
    let [ismemberadded,setismemberadded]=useState(false)
    let initialValues = {
        email: ""
    }
    const getuser=()=>{
        httpClient.GET("corporate/get/members",false,true)
        .then(resp=>{
            setmembers(resp.data.data)   
        })
        .catch(err=>{
            notify.error("Something went wrong")
        })
    }
     useEffect(()=>{
        getuser()
    },[])
    const columns = [
        {
            title: "Member id", field: "userid"
        },
        {
            title: "Member Name", field: "membername"
        },
        {
            title: "Email", field: "email"
        },
        {
            title:"Status",field:"status"
        }
    ]
    const handleEdit = (e, data) => {

    }
    const handledelete = (e, data) => {

    }
    const handleSubmit=(values,onsubmittingprops)=>{
        httpClient.POST("corporate/add/members",values,false,true)
        .then(resp=>{
            getuser()
            notify.success("Member added successfully")
        })
        .catch(err=>{
            notify.error(err.response.data.message)
        })
        .finally(()=>{
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

    return (
        <div className='content-wrapper adjust-height-width custom-content-wrapper'>
            {
                addmember ? <>
                    <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={handleSubmit} validateOnMount>
                        {
                            (values) => {
                                console.log("values in formik are",values)
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
                        icon: Edit,
                        tooltip: 'Edit appointment',
                        onClick: (e, rowData) => { handleEdit(e, rowData) }
                    },
                    {
                        icon: Clear,
                        tooltip: 'cancel appointment',
                        onClick: (e, rowData) => { handledelete(e, rowData) }
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
        </div>
    )
}
