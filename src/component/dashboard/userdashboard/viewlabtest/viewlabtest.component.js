import React from 'react'
import { useState } from 'react'
import { TimeandDate } from '../../../../services/timeanddate'
import { CompletedLabTests } from './completedLabTest.component'
import { CancelledLabTest } from './cancelledLabTest.component'
import { LabTestImages } from './labTestImages.component'

export default function Viewlabtest() {
    
    // let [isDynamicCompletedClass,setisDynamicCompletedClass]=useState(true)
    let [isDynamicCompletedClass,setisDynamicCompletedClass]=useState(true)
    let [isDynamicPendingClass,setisDynamicPendingClass]=useState(false)
    const [showModel,setShowModel]=useState(false)
    let [today,settoday]=useState(TimeandDate.today())
    const [labTestData,setLabTestData]=useState({})
  
    const handleCompletedClass=()=>{
        setisDynamicCompletedClass(true)
        setisDynamicPendingClass(false)
    }
    const handlePendingClass=()=>{
        setisDynamicCompletedClass(false)
        setisDynamicPendingClass(true)
    }
    const showLabTest=(data)=>{
        // console.log("e and data are",data)
       
        setLabTestData(data)
        setShowModel(!showModel) 
        httpClient.GET("lab-report/get-all/"+props.labTestData.labtestbookingid,false,true)
        .then(resp=>{
            resp.data.data.map((item)=>{
                httpClient.GET("lab-report/download/"+item.labtestreportid)
                .then(resp=>{
                    console.log("response is",resp)
                    lab.push(resp.data)
                    // lab.push(URL.createObjectURL(resp.data))
                    // debugger
                    //   var reader=new FileReader()
                    // reader.readAsDataURL(resp.data)
                    // reader.onload=()=>{
                    //     var base64=reader.result
                    //     console.log("base 64 is",base64)
                    //     lab.push(base64)
                    // }
                    // reader.onerror=(error)=>{
                    //     console.log("error while reading url",error)
                    // }
                })
                .catch(err=>{
                    console.log("error occurred while fetching the image")
                })
            })
            console.log("response is",resp.data)
        })
        .catch(err=>{
            console.log("Something went wrong")
        })
        .finally(()=>{
            setlabTestReportId(lab)
        })  
    }
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
                                                <i className="mdi mdi-calendar"></i>Today- {today}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row" >
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="title-header">
                                            <p
                                             className=
                                             {`card-title ${isDynamicCompletedClass ? "title-focus" : null}`}
                                              onClick={handleCompletedClass}
                                             >Completed Labtest</p>
                                            <p
                                             className={`card-title ${isDynamicPendingClass ? "title-focus" : null}`} 
                                             onClick={handlePendingClass}
                                             >Pending Labtest</p>
                                        </div>
                                        {       
                                               isDynamicCompletedClass?<CompletedLabTests showLabTest={showLabTest}></CompletedLabTests>
                                                    : isDynamicPendingClass?<CancelledLabTest></CancelledLabTest>
                                                        : <h1>Please book your Lab Tests</h1>
                                        }
                                        {
                    showModel?
                    <LabTestImages
                    showLabTest={showLabTest}
                    labTestData={labTestData}

                    >
                    </LabTestImages>:null
                }
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>

            </div>

        </div>
    )
}


