import React from "react";
import { useDebugValue, useEffect, useState } from "react"
import { httpClient } from "../../utils/httpClient"
import { notify } from '../../services/notify'
import MaterialTable from 'material-table'
import Edit from '@material-ui/icons/Edit';
import tableIcons from "../../material.icons/icons";

const Services = (props) => {
    const tableRef = React.createRef();
    const [services, setServices] = useState([]);
    const [service, setService] = useState({
        serviceName: "",
        serviceDescription: "",
    }
    )

    const refreshData = () => {
        tableRef.current && tableRef.current.onQueryChange()
    }

    const handleChange = (e) => {
        let tempService = {
             ...service, 
             ...{ [e.target.name]: e.target.value } 
            }
        setService(tempService);
    }

    const getServices = () => {
        httpClient.GET("services/true",)
            .then(resp => {
                console.log("service created and response is>",resp)
                if (resp.data.status == true) {
                    let serviceData = resp.data.data
                    setServices(serviceData)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    useEffect(()=>{
        getServices();

    },[])

    const handleSubmit = () => {
        let serviceData = {
            serviceName: service.serviceName,
            serviceDescription: service.serviceDescription
        }

        httpClient.POST("services/create", serviceData)
            .then(resp => {
                if (resp.data.status) {
                    console.log(resp.data)
                    setService({
                        serviceName: "",
                        serviceDescription: "",
                    })
                    refreshData();
                }

            })
            .catch(err => {
                console.log("inside catch block")
                console.log(err.response)
                notify.error(err.response.data.message)
            })

        console.log(service);
    }

    const handleEditService = (e, data) => {
        console.log(data);
        httpClient.GET("services/")
        .then(resp => {
            console.log(resp)
            if(resp.data.status){
                console.log(resp.data.data)
            }
        })
        .catch(err => {
            console.log(err.response.data)

        })

    }

    const columns = [
        { title: 'Service Name', field: 'serviceName' },
        { title: 'Service Description', field: 'serviceDescription' },
        { title: 'Status', field: 'activeStatus' },
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
                    columns={columns}
                    data={services} 
                    title="Service Details"
                    tableRef={tableRef}
                    icons={tableIcons}
                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Edit User',
                            onClick: (e, rowData) => { handleEditService(e, rowData) }
                        },
                    ]}

                    options={{
                        actionsColumnIndex: -1,
                        sorting: true,
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