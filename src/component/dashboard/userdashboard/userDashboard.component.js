import { TimeandDate } from "../../../services/timeanddate"
import "./userDashboard.component.css"
import { Link } from "react-router-dom"
import { Commonupcomingappointment } from "./commonupcomingappointment/commonupcomingappointment.component"
import { useEffect } from "react"
import { http, httpClient } from "../../../utils/httpClient"
import { notify } from "../../../services/notify"
import { useState } from "react"
const Userdashboard = (props) => {
  let [pendingappointment, setpendingappointments] = useState(0)
  let [completedappointments, setcompletedappointments] = useState(0)
  let [cancelledappointments, setcancelledappointments] = useState(0)
  let [weather, setWeather] = useState({})
  let [weatherDescription, setWeatherDescription] = useState({})
  let [currentTemperature, setCurrentTemperature] = useState("")
  const [totalappointments, settotalappointments] = useState()
  useEffect(() => {
    httpClient.GET("totoal-appointments-patients", false, true)
      .then(resp => {
        settotalappointments(resp.data.data.totalAppointments)
      })
      .catch(err => {
        notify.error("Total appointments-unable to fetch")
      })
    httpClient.GET("get-user-pending-appointments", false, true)
      .then(resp => {
        setpendingappointments(resp.data.data.length)
      })
    httpClient.GET("get-user-completed-appointments", false, true)
      .then(resp => {
        setcompletedappointments(resp.data.data.length)
      })
    httpClient.GET("get-user-canceled-appointments", false, true)
      .then(resp => {
        setcancelledappointments(resp.data.data.length)
      })
      
    navigator.geolocation.getCurrentPosition(function(done,err){
      if(done){
          let latitude=done.coords.latitude
          let longitude=done.coords.longitude 
          http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=47056d723585bc46aefd6a866267557a`)
          .then(resp=>{
            console.log(resp.data)
            setWeather(resp.data)
            setWeatherDescription(resp.data.weather[0])
            setCurrentTemperature((resp.data.main.temp-273.15).toString())
          })
          .catch(err=>{
            console.log("error in fetching the data after api")
          })
      }
      else{
        console.log("geolocation is not working",err)
      }
    })
  }, [])
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

        {/* <Usersidebar></Usersidebar> */}
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
                        <div className="btn btn-sm btn-light bg-white " >
                          <span className="mdi mdi-calendar"></span> Today {TimeandDate.today()}
                        </div>
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
                          <h2 className="mb-0 font-weight-normal" >
                            <img src={`http://openweathermap.org/img/w/${weatherDescription.icon}.png`} style={{height:"70px",width:"70px"}}/>
                            {currentTemperature.slice(0,6)}<sup>C</sup></h2>
                        </div>
                        <div className="ml-2">
                          <h4 className="location font-weight-normal">{weather.name}</h4>
                          {
                            weather.sys?<h6 className="font-weight-normal">{weather.sys.country}</h6>:<h6 className="font-weight-normal">Nepal</h6>
                          }
                          
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
                        <p className="mb-4">Total Appointments</p>
                        <p className="fs-30 mb-2">{totalappointments}</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4 stretch-card transparent">
                    <div className="card card-dark-blue">
                      <div className="card-body">
                        <p className="mb-4">Total Pending Appointments</p>
                        <p className="fs-30 mb-2">{pendingappointment}</p>
                        {/* <p>22.00% (30 days)</p> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                    <div className="card card-light-blue">
                      <div className="card-body">
                        <p className="mb-4">Total Completed Appointments</p>
                        <p className="fs-30 mb-2">{completedappointments}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 stretch-card transparent">
                    <div className="card card-light-danger">
                      <div className="card-body">
                        <p className="mb-4">Total Cancelled Appointments</p>
                        <p className="fs-30 mb-2">{cancelledappointments}</p>

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
                    <Link to="/dashboard/viewappointment" style={{ textDecoration: "none" }}>
                      <p className="card-title">Upcoming Appointments</p>
                    </Link>
                    <Commonupcomingappointment isexportavailable={false} issearchavailable={false} isactionavailable={false}></Commonupcomingappointment>
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