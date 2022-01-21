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
        <div className="main-panel newdash_content">
         
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


    </>
  )
}
export default Userdashboard