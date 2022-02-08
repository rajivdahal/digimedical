import { useEffect, useState } from 'react'
import { TimeandDate } from '../../../services/timeanddate';
import { httpClient } from '../../../utils/httpClient';

const HospitalDashboard = (props) => {
  const[totalAppointments,setTotalAppointment] = useState("");
  let [today,settoday]=useState(TimeandDate.today())
  const getTotalAppointments=()=>{
    httpClient.GET("total-appointments-admin",false,true)
    .then(resp => {
      console.log(resp)
      setTotalAppointment(resp.data.data.totalAppointments)
    })
    .catch(err =>{
      console.log(err.response)
    })
  }

  useEffect(()=>{
    getTotalAppointments();
  },[])
  return (
    <>

      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="row">
            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
              <h5 className="font-weight-normal mb-0">All systems are running smoothly!</h5>
            </div>
            <div className="col-12 col-xl-4">
              <div className="justify-content-end d-flex">
                <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                  <div className="btn btn-sm btn-light bg-white " >
                    <span className="mdi mdi-calendar"></span> Today {today}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div class="col-md-6 grid-margin stretch-card">
          <div class="card tale-bg">
            <div class="card-people mt-auto">
              <img src="images/people.svg" alt="people" />
              <div class="weather-info">
                <div class="d-flex">
                  <div>
                    <h2 class="mb-0 font-weight-normal"><i class="icon-sun mr-2"></i>20<sup>C</sup></h2>
                  </div>
                  <div class="ml-2">
                    <h4 class="location font-weight-normal">Kathmandu</h4>
                    <h6 class="font-weight-normal">Nepal</h6>
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
                  <p className="fs-30 mb-2">{totalAppointments}</p>
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
                  <p className="mb-4">Number of Paitents</p>
                  <p className="fs-30 mb-2">34040</p>
                  <p>2.00% (30 days)</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 stretch-card transparent">
              <div className="card card-light-danger">
                <div className="card-body">
                  <p className="mb-4">Earnings</p>
                  <p className="fs-30 mb-2">47033</p>
                  <p>0.22% (30 days)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default HospitalDashboard