import React from 'react'
import "./corporateaddmembers.component.css"
import MaterialTable from 'material-table'
import { Check, Edit, Clear ,Add} from "@material-ui/icons";

export default function Corporateaddmember(props) {
    
    const columns =[
        {
            title: "Member id", field: "id"
        },
        {
            title: "Member Name", field: "patientsName"
        },
        {
            title: "Hospital", field: "hospitalname"
        },
        {
            title: "Service", field: "serviceName"
        }
    ]
    const handleEdit=(e,data)=>{

    }
    const handledelete=(e,data)=>{

    }
    return (
        <div className='content-wrapper adjust-height-width'>
            <div>saldna</div>
            <input type={"email"} placeholder='Enter your email' className='corporate-email'></input>
            <MaterialTable
                        title="Appointments"
                        columns={columns}
                        // data={pendingData}
                        options={{
                            paging: true,
                            // exportButton: props.isexportavailable,
                            searchFieldAlignment: "left",
                            pageSizeOptions: [5, 10, 20, 25, 50],
                            pageSize: 5,
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
                            }
                        ]}
                    ></MaterialTable>
        </div>
    )
}
