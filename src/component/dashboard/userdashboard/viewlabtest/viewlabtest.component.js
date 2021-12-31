import React from 'react'
import { useEffect, useState } from 'react'
import { notify } from '../../../../services/notify'
import { TimeandDate } from '../../../../services/timeanddate'
import { httpClient } from '../../../../utils/httpClient'
import MaterialTable from 'material-table';
import { Add, Edit, Clear, DeleteOutline } from "@material-ui/icons";

import Tableicons from "../../../../utils/materialicons";

export default function Viewlabtest() {
    let [labtests, setlabtests] = useState([])
    useEffect(() => {
        httpClient.GET("lab-booking/get-booking/0", false, true)
            .then(resp => {
                setlabtests(resp.data.data)

            })
            .catch(err => {
                notify.error("Error in fetching lab test")
            })
    }, [])
    return (
        <div className="container-fluid page-body-wrapper">
            <div id="right-sidebar" className="settings-panel">
                <i className="settings-close ti-close"></i>
                <ul className="nav nav-tabs border-top" id="setting-panel" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="todo-tab" data-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true">TO DO LIST</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="chats-tab" data-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">CHATS</a>
                    </li>
                </ul>
                <div className="tab-content" id="setting-content">
                    <div className="tab-pane fade show active scroll-wrapper" id="todo-section" role="tabpanel" aria-labelledby="todo-section">
                        <div className="add-items d-flex px-3 mb-0">
                            <form className="form w-100">
                                <div className="form-group d-flex">
                                    <input type="text" className="form-control todo-list-input" placeholder="Add To-do" />
                                    <button type="submit" className="add btn btn-primary todo-list-add-btn" id="add-task">Add</button>
                                </div>
                            </form>
                        </div>
                        <div className="list-wrapper px-3">
                            <ul className="d-flex flex-column-reverse todo-list">
                                <li>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="checkbox" type="checkbox" />
                                            Team review meeting at 3.00 PM
                                        </label>
                                    </div>
                                    <i className="remove ti-close"></i>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="checkbox" type="checkbox" />
                                            Prepare for presentation
                                        </label>
                                    </div>
                                    <i className="remove ti-close"></i>
                                </li>
                                <li>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="checkbox" type="checkbox" />
                                            Resolve all the low priority tickets due today
                                        </label>
                                    </div>
                                    <i className="remove ti-close"></i>
                                </li>
                                <li className="completed">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="checkbox" type="checkbox" />
                                            Schedule meeting for next week
                                        </label>
                                    </div>
                                    <i className="remove ti-close"></i>
                                </li>
                                <li className="completed">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="checkbox" type="checkbox" />
                                            Project review
                                        </label>
                                    </div>
                                    <i className="remove ti-close"></i>
                                </li>
                            </ul>
                        </div>
                        <h4 className="px-3 text-muted mt-5 font-weight-light mb-0">Events</h4>
                        <div className="events pt-4 px-3">
                            <div className="wrapper d-flex mb-2">
                                <i className="ti-control-record text-primary mr-2"></i>
                                <span>Feb 11 2018</span>
                            </div>
                            <p className="mb-0 font-weight-thin text-gray">Creating component page build a js</p>
                            <p className="text-gray mb-0">The total number of sessions</p>
                        </div>
                        <div className="events pt-4 px-3">
                            <div className="wrapper d-flex mb-2">
                                <i className="ti-control-record text-primary mr-2"></i>
                                <span>Feb 7 2018</span>
                            </div>
                            <p className="mb-0 font-weight-thin text-gray">Meeting with Alisa</p>
                            <p className="text-gray mb-0 ">Call Sarah Graves</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <div className="row">
                                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                    <h6 className="font-weight-normal mb-0">All systems are running smoothly!</h6>
                                </div>
                                <div className="col-12 col-xl-4">
                                    <div className="justify-content-end d-flex">
                                        <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                                            <button className="btn btn-sm btn-light bg-white dropdown-toggle" type="button" id="dropdownMenuDate2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                <i className="mdi mdi-calendar"></i>Today- {TimeandDate.today()}
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <MaterialTable
                 data={labtests}
                 title="All Labtests Details"
                 icons={Tableicons}
                    columns={[
                        { title: 'Name', field: 'labtestname' },
                        { title: 'description', field: 'description' },
                        { title: 'price', field: 'price' },
                        
                    ]}
                    actions={[

                
                        {
                            icon: Edit,
                            tooltip: 'Edit Service',
                            // onClick: (e, rowData) => { handleEditDoctor(e, rowData) }
                        },

                    ]}

                    // isLoading={}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 20,
                        filtering: false,
                        sorting: true,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }
                    }}
                />

                    {/* <div className="row">
                        <table class="table">
                            <caption>List of users</caption>
                            <thead>
                                <tr>
                                    <th scope="col">S.No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    labtests?
                                    labtests.map((item, index) => {
                                        return <tr>
                                            <th scope="row">{index+1}</th>
                                            <td>{item.labtestname}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td>Pending</td>
                                            <td>  </td>
                                        </tr>
                                    }):<p>No data found</p>
                                }

                            </tbody>
                        </table>
                    </div> */}
                </div>

            </div>

        </div>
    )
}


