import React from "react";
import { useDebugValue, useEffect, useState } from "react"
import { httpClient } from "../../utils/httpClient"
import { notify } from '../../services/notify'
import MaterialTable from 'material-table'
import Edit from '@material-ui/icons/Edit';
import { RestoreOutlined } from "@material-ui/icons";

const Services = (props) => {
    const tableRef = React.createRef();

    const[services,setServices] = useState([]);
    const [service, setService] = useState(
        {
            serviceName: "",
            serviceDescription: "",
        
        }
    )

    const refreshData=()=>{
        tableRef.current && tableRef.current.onQueryChange()
    } 

    useEffect(()=>{
        const getServices=()=>{
            httpClient.GETSERVICE("true")
            .then(resp => {
                if(resp.data.status==true){
                    // console.log(resp.data.status)
                    let serviceData = resp.data.data
                    setServices(serviceData)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
        }
        getServices();
    })

    const handleChange = (e) => {
        let tempService = { ...service, ...{ [e.target.name]: e.target.value } }
        setService(tempService);
    }

    const handleSubmit = () => {
        let serviceData = {
            serviceName: service.serviceName,
            serviceDescription: service.serviceDescription
        }

        httpClient.POSTSERVICE("create", serviceData)
            .then(resp => {
                if(resp.data.status){
                    setService({
                        serviceName: "",
                        serviceDescription: "",
                    })
                }

            })
            .catch(err => {
                console.log(err.response)
                notify.error(err.response.data.message)
            })
        console.log(service);
    }

    const columns = [
        { title: 'Service Name', field: 'serviceName' },
        { title: 'Service Description', field: 'serviceDescription' },
        { title: 'Status', field: 'status' },
    ]
    return (
        <>
            <div className="container">
                <form style={{ marginBottom: '30px' }}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group select-label">
                                <label >Service Name</label>
                                <input type="text" className="form-control" placeholder="Enter Service Name" name="serviceName"
                                    onChange={handleChange} value={service.serviceName} />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group select-label">
                                <label>Service Description</label>
                                <input type="text" className="form-control" placeholder="Enter Service Description" name="serviceDescription"
                                    onChange={handleChange} value={service.serviceDescription} />
                            </div>
                        </div>

                        <div>
                            <button type="button" className="btn" style={{ backgroundColor: '#2745F0', color: "#fff" }} onClick={handleSubmit}>Submit</button>
                        </div>

                    </div>
                </form>

                <MaterialTable
                    tableRef={tableRef}
                    columns={columns}
                    data={services}
                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => {
                            }
                        },

                        {
                            icon: 'add',
                            tooltip: 'Add User',
                            isFreeAction: false,
                            onClick: (event) => alert("You want to add a new row")
                        }
                    ]}

                    title="Service Details"
                    options={{
                        actionsColumnIndex: -1,
                        pageSize : 5,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }

                    }}
                />
            </div>
        </>
    )
}
export default Services