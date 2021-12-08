import "./Viewappointment.component.css"
import { TimeandDate } from "../../../services/timeanddate"
import { Upcomingappointment } from "./upcomingappointment/upcomingappointment.component"
import { useState } from "react"
import { Cancelledappointment } from "./cancelledappointment/Cancelledappointment.component"
import { Completedappointment } from "./completedappointment/completedappointment.component"
export const Viewappointment = (props) => {
    const fromdoctorcomponent=props.fromdoctorcomponent?props.fromdoctorcomponent:null
    const [pendingappointment, setpendingappointment] = useState(false)
    const [cancelledappointment, setcancelledappointment] = useState(false)
    const [upcomingappointment, setupcomingappointment] = useState(true)
    const [isdynamicbookedclass, setisdynamicbookedclass] = useState(false)
    const [isdynamicCancelledclass, setisdynamicCancelledclass] = useState(false)
    const [isdynamicupcomingclass, setisdynamicupcomingclass] = useState(true)
    const handleupcomingclass = (e) => {
        setisdynamicupcomingclass(true)
        setupcomingappointment(true)
        setisdynamicCancelledclass(false)
        setcancelledappointment(false)
        setisdynamicbookedclass(false)
        setpendingappointment(false)
    }
    const handlebookedclass = (e) => {
        setisdynamicupcomingclass(false)
        setupcomingappointment(false)
        setisdynamicCancelledclass(false)
        setcancelledappointment(false)
        setisdynamicbookedclass(true)
        setpendingappointment(true)
    }
    const handleCancelledclass = (e) => {
        setisdynamicupcomingclass(false)
        setupcomingappointment(false)
        setisdynamicCancelledclass(true)
        setcancelledappointment(true)
        setisdynamicbookedclass(false)
        setpendingappointment(false)
    }
    return (
        <>
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
                        <div className="tab-pane fade" id="chats-section" role="tabpanel" aria-labelledby="chats-section">
                            <div className="d-flex align-items-center justify-content-between border-bottom">
                                <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">Friends</p>
                                <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">See All</small>
                            </div>
                            <ul className="chat-list">
                                <li className="list active">
                                    <div className="profile"><img src="/images/dashboard/user1.jpg" alt="image" /><span className="online"></span></div>
                                    <div className="info">
                                        <p>Thomas Douglas</p>
                                        <p>Available</p>
                                    </div>
                                    <small className="text-muted my-auto">19 min</small>
                                </li>
                                <li className="list">
                                    <div className="profile"><img src="/images/dashboard/user1.jpg" alt="image" /><span className="offline"></span></div>
                                    <div className="info">
                                        <div className="wrapper d-flex">
                                            <p>Catherine</p>
                                        </div>
                                        <p>Away</p>
                                    </div>
                                    <div className="badge badge-success badge-pill my-auto mx-2">4</div>
                                    <small className="text-muted my-auto">23 min</small>
                                </li>
                                <li className="list">
                                    <div className="profile"><img src="/images/dashboard/user1.jpg" alt="image" /><span className="online"></span></div>
                                    <div className="info">
                                        <p>Daniel Russell</p>
                                        <p>Available</p>
                                    </div>
                                    <small className="text-muted my-auto">14 min</small>
                                </li>
                                <li className="list">
                                    <div className="profile"><img src="/images/dashboard/user1.jpg" alt="image" /><span className="offline"></span></div>
                                    <div className="info">
                                        <p>James Richardson</p>
                                        <p>Away</p>
                                    </div>
                                    <small className="text-muted my-auto">2 min</small>
                                </li>
                                <li className="list">
                                    <div className="profile"><img src="/images/dashboard/user1.jpg" alt="image" /><span className="online"></span></div>
                                    <div className="info">
                                        <p>Madeline Kennedy</p>
                                        <p>Available</p>
                                    </div>
                                    <small className="text-muted my-auto">5 min</small>
                                </li>
                                <li className="list">
                                    <div className="profile"><img src="/images/dashboard/user1.jpg" alt="image" /><span className="online"></span></div>
                                    <div className="info">
                                        <p>Sarah Graves</p>
                                        <p>Available</p>
                                    </div>
                                    <small className="text-muted my-auto">47 min</small>
                                </li>
                            </ul>
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

                        <div className="row">

                        </div>

                        <div className="row" >
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body ">
                                        <div className="title-header">
                                            <p className={`card-title ${isdynamicupcomingclass ? "title-focus" : null}`} onClick={handleupcomingclass}>Upcoming Appointment</p>
                                            <p className={`card-title ${isdynamicbookedclass ? "title-focus" : null}`} onClick={handlebookedclass}>Completed Appointment</p>
                                            <p className={`card-title ${isdynamicCancelledclass ? "title-focus" : null}`} onClick={handleCancelledclass}>Cancelled Appointment</p>
                                        </div>
                                        {
                                            upcomingappointment ? <Upcomingappointment props={props.history} fromdoctorcomponent={fromdoctorcomponent}></Upcomingappointment>
                                                :
                                                pendingappointment ? <Completedappointment fromdoctorcomponent={fromdoctorcomponent}></Completedappointment>
                                                    : cancelledappointment ? <Cancelledappointment fromdoctorcomponent={fromdoctorcomponent}></Cancelledappointment>
                                                        : <h1>you don't have any appointment</h1>
                                        }

                                    </div>
                                </div>
                            </div>






                        </div>


                    </div>

                </div>

            </div>
        </>
    )
}