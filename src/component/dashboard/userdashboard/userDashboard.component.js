import { notify } from "./../../../services/notify"
import { useState } from "react"
import { TimeandDate } from "../../../services/timeanddate"
import "./userDashboard.component.css"
import { Link } from "react-router-dom"
const Userdashboard = (props) => {
  const [logoutstate, setlogoutstate] = useState({
    logout: false,
  })
  const Logout = (e) => {
    setlogoutstate({
      logout: true
    })
  }
  const logoutyes = () => {
    console.log("inside logout yes")
    localStorage.removeItem("dm-access_token")
    localStorage.removeItem("timeout")
    localStorage.removeItem("dm-refresh_token")
    props.props.push('/login')
    notify.success("Logout success! Please Login again")
  }
  const logoutno = () => {
    setlogoutstate({
      logoutno: true
    })
  }
  return (
    <>

      {/* nav starts*/}
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo mr-5" href="index.html"><img src="/images/dashboard/logo.png" className="mr-2" alt="logo" /></a>
          <a className="navbar-brand brand-logo-mini" href="index.html"><img src="/images/dashboard/logo.png" alt="logo" /></a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          {/* <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="icon-menu"></span>
          </button> */}
          <h3 className="font-weight-bold header-color">Welcome Shiva</h3>

          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item dropdown">
              <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                <i className="icon-bell mx-0"></i>
                <span className="count"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="ti-info-alt mx-0"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">Application Error</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Just now
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <i className="ti-settings mx-0"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">Settings</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Private message
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <i className="ti-user mx-0"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">New user registration</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      2 days ago
                    </p>
                  </div>
                </a>
              </div>

            </li>
            <li className="nav-item nav-profile dropdown">
              <a className="nav-link" href="#" data-toggle="dropdown" id="profileDropdown">
                <img src="/images/dashboard/user1.jpg" alt="profile" />
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                <div className="dropdown-item">
                  <i className="ti-settings text-primary"></i>
                  <span>Settings</span>
                </div>
                <div className="dropdown-item" onClick={Logout}>
                  <i className="ti-power-off text-primary"></i>
                  <span>Logout</span>
                </div>


              </div>
            </li>
            {
              logoutstate.logout ? <div className="logout-container">
                <div className="logout">
                  <p>Are you sure you want to Logout?</p>
                  <div className="buttons">
                    <button className="yes-logout" onClick={logoutyes}>Yes</button>
                    <button className="no-logout" onClick={logoutno}>No</button>
                  </div>
                </div>
              </div>
                :
                null
            }
            <li className="nav-item nav-settings d-none d-lg-flex">
              <a className="nav-link" href="#">
                <i className="icon-ellipsis"></i>
              </a>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="icon-menu"></span>
          </button>
        </div>
      </nav>

      {/* nav ends */}





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

        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" data-toggle="collapse" href="#appointment" aria-expanded="false" aria-controls="appointment">
                <i className="fas fa-user-clock menu-icon"></i>
                <span className="menu-title">Appointments</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="appointment">
                <ul className="nav flex-column sub-menu">
                  <Link to="/dashboard/viewappointment">
                  <li className="nav-item"> <a className="nav-link" href="">View Appointment</a></li>
                  </Link>
                  <li className="nav-item"> <a className="nav-link" href="">Book Appointment</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
                <i className="fas fa-user-md  menu-icon"></i>
                <span className="menu-title">Doctors</span>

              </a>

            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="collapse" href="#rooms" aria-expanded="false" aria-controls="rooms">
                <i className="fas fa-person-booth menu-icon"></i>
                <span className="menu-title">Room Allotment</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="rooms">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="">Alloted Rooms</a></li>
                  <li className="nav-item"> <a className="nav-link" href="">New Rooms</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                <i className="fas fa-money-check-alt menu-icon"></i>
                <span className="menu-title">Payments</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="collapse" id="auth">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href=""> All Payments </a></li>
                  <li className="nav-item"> <a className="nav-link" href=""> Add Payment </a></li>
                  <li className="nav-item"> <a className="nav-link" href=""> INvoice </a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
                <i className="fas fa-pager menu-icon"></i>
                <span className="menu-title">Lab reports</span>

              </a>

            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
                <i className="fas fa-file-medical menu-icon"></i>
                <span className="menu-title">Medical Reports</span>

              </a>

            </li>

          </ul>
        </nav>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="row">
                  <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                    <h6 className="font-weight-normal mb-0">All systems are running smoothly! You have <span className="sec-color">3 unread alerts!</span></h6>
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
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card tale-bg">
                  <div className="card-people mt-auto">
                    <img src="/images/dashboard/people.svg" alt="people" />
                    <div className="weather-info">
                      <div className="d-flex">
                        <div>
                          <h2 className="mb-0 font-weight-normal"><i className="icon-sun mr-2"></i>20<sup>C</sup></h2>
                        </div>
                        <div className="ml-2">
                          <h4 className="location font-weight-normal">Kathmandu</h4>
                          <h6 className="font-weight-normal">Nepal</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 grid-margin transparent">
                <div className="row">
                  <div className="col-md-6 mb-4 stretch-card transparent">
                    <div className="card card-tale">
                      <div className="card-body">
                        <p className="mb-4">Appointments</p>
                        <p className="fs-30 mb-2">4006</p>
                        <p>10.00% (30 days)</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                      <div className="card-body">
                        <p className="mb-4">Total Operations</p>
                        <p className="fs-30 mb-2">61344</p>
                        <p>22.00% (30 days)</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                    <div className="card card-light-blue">
                      <div className="card-body">
                        <p className="mb-4">Number of Patients</p>
                        <p className="fs-30 mb-2">34040</p>
                        <p>2.00% (30 days)</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 stretch-card transparent">
                    <div className="card card-light-danger">
                      <div className="card-body">
                        <p className="mb-4">Expenditure</p>
                        <p className="fs-30 mb-2">47033</p>
                        <p>0.22% (30 days)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" >
              <div className="col-md-8 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <p className="card-title">Upcoming Appointment</p>
                    <div className="row">
                      <div className="col-12">
                        <div className="table-responsive">
                          <table className="display expandable-table book-table" style={{ width: "100%" }}>
                            <thead>
                              <tr>
                                <th className="head_styling">Assigned Doctor</th>
                                <th>Date Of Appointment</th>
                                <th>Diseases</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="pl-2 table-img"><img src="/images/dashboard/user1.jpg" alt="" className="user-img-circle" /><span className="text-muted">Dr.Raj Manandhar</span></td>
                                <td className="text-muted">25/04/2020</td>
                                <td className="text-muted">
                                  <div className=" badge badge-outline-success">
                                    Corona
                                  </div>
                                </td>
                                <td className="action-img text-muted d-flex">
                                  
                                  <i className="fas fa-edit" style={{ fontSize: "22px", fontWidth: "600", color: "green", cursor: "pointer", marginTop: "2px" , marginRight: "10px" }} title="edit"></i>
                                  <i className="fas fa-trash-alt" style={{ fontSize: "25px", fontWidth: "600", color: "red", cursor: "pointer"}} title="delete"></i>
                                </td>
                              </tr>
                              <tr>
                                <td className="pl-2 table-img"><img src="/images/dashboard/user1.jpg" alt="" className="user-img-circle" /><span className="text-muted">Dr.Raj Manandhar</span></td>


                                <td className="text-muted">25/04/2020</td>
                                <td className="text-muted">
                                  <div className=" badge badge-outline-success">
                                    Corona
                                  </div>
                                </td>
                                <td className="action-img text-muted d-flex">
                                  
                                  <i className="fas fa-edit" style={{ fontSize: "22px", fontWidth: "600", color: "green", cursor: "pointer", marginTop: "2px" , marginRight: "10px" }} title="edit"></i>
                                  <i className="fas fa-trash-alt" style={{ fontSize: "25px", fontWidth: "600", color: "red", cursor: "pointer"}} title="delete"></i>
                                </td>
                              </tr>
                              <tr>
                                <td className="pl-2 table-img"><img src="/images/dashboard/user1.jpg" alt="" className="user-img-circle" /><span className="text-muted">Dr.Raj Manandhar</span></td>


                                <td className="text-muted">25/04/2020</td>
                                <td className="text-muted">
                                  <div className=" badge badge-outline-success">
                                    Corona
                                  </div>
                                </td>
                                <td className="action-img text-muted d-flex">
                                  
                                  <i className="fas fa-edit" style={{ fontSize: "22px", fontWidth: "600", color: "green", cursor: "pointer", marginTop: "2px" , marginRight: "10px" }} title="edit"></i>
                                  <i className="fas fa-trash-alt" style={{ fontSize: "25px", fontWidth: "600", color: "red", cursor: "pointer"}} title="delete"></i>
                                </td>
                              </tr>
                              <tr>
                                <td className="pl-2 table-img"><img src="/images/dashboard/user1.jpg" alt="" className="user-img-circle" /><span className="text-muted">Dr.Raj Manandhar</span></td>


                                <td className="text-muted">25/04/2020</td>
                                <td className="text-muted">
                                  <div className=" badge badge-outline-success">
                                    Corona
                                  </div>
                                </td>
                                <td className="action-img text-muted d-flex">
                                  
                                  <i className="fas fa-edit" style={{ fontSize: "22px", fontWidth: "600", color: "green", cursor: "pointer", marginTop: "2px" , marginRight: "10px" }} title="edit"></i>
                                  <i className="fas fa-trash-alt" style={{ fontSize: "25px", fontWidth: "600", color: "red", cursor: "pointer"}} title="delete"></i>
                                </td>
                              </tr>
                              <tr>
                                <td className="pl-2 table-img"><img src="/images/dashboard/user1.jpg" alt="" className="user-img-circle" /><span className="text-muted">Dr.Raj Manandhar</span></td>

                                <td className="text-muted">25/04/2020</td>
                                <td className="text-muted">
                                  <div className=" badge badge-outline-success">
                                    Corona
                                  </div>
                                </td>
                                <td className="action-img text-muted d-flex">
                                  
                                  <i className="fas fa-edit" style={{ fontSize: "22px", fontWidth: "600", color: "green", cursor: "pointer", marginTop: "2px" , marginRight: "10px" }} title="edit"></i>
                                  <i className="fas fa-trash-alt" style={{ fontSize: "25px", fontWidth: "600", color: "red", cursor: "pointer"}} title="delete"></i>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>





              <div className="col-md-4 stretch-card grid-margin">
                <div className="card">
                  <div className="card-body">
                    <p className="card-title">Notifications</p>
                    <ul className="icon-data-list">
                      <li>
                        <div className="d-flex">
                          <img src="/images/dashboard/user1.jpg" alt="user" />
                          <div>
                            <p className="text-info mb-1">Isabella Becker</p>
                            <p className="mb-0">Admin dashboard have been created</p>
                            <small>9:30 am</small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <img src="/images/dashboard/user1.jpg" alt="user" />
                          <div>
                            <p className="text-info mb-1">Adam Warren</p>
                            <p className="mb-0">You have done a great job</p>
                            <small>10:30 am</small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <img src="/images/dashboard/user1.jpg" alt="user" />
                          <div>
                            <p className="text-info mb-1">Leonard Thornton</p>
                            <p className="mb-0">Booking dashboard have been created</p>
                            <small>11:30 am</small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <img src="/images/dashboard/user1.jpg" alt="user" />
                          <div>
                            <p className="text-info mb-1">George Morrison</p>
                            <p className="mb-0">Booking dashboard have been created</p>
                            <small>8:50 am</small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <img src="/images/dashboard/user1.jpg" alt="user" />
                          <div>
                            <p className="text-info mb-1">Ryan Cortez</p>
                            <p className="mb-0">Herbs are fun and easy to grow.</p>
                            <small>9:00 am</small>
                          </div>
                        </div>
                      </li>
                    </ul>
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
export default Userdashboard