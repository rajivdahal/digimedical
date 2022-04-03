import { useState, useEffect } from "react";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import { Modal, Button } from "react-bootstrap";
import { formatDate, TimeandDate } from "../../../../services/timeanddate";
import "./corporatedashboard.component.css";
import MaterialTable from 'material-table';
import { width } from "@mui/system";

export const Corporatedashboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [totalappointments, settotalappointments] = useState();
  const [appointmentCount,setAppointmentCount] = useState({});

  const getUpcomingAppointment = async () => {
    setLoading(true);
    try {
      let resp = await httpClient.GET("get/corporate/appointments/0", false, true);
      if (resp.data.status) {
        let appointment = resp.data.data;
        appointment.forEach((item) => {
          if (item.appointmenttime) {

            let tempstartArr = item.appointmenttime.split(":");
            tempstartArr.splice(2, 1);
            item.appointmentTime = tempstartArr.join(":");
            let hours = parseInt(tempstartArr[0]);
            if (hours > 0 && hours < 12) {
              item.appointmentTime += " AM";
            } else {
              item.appointmentTime += " PM";
            }
          }

          if(item.appointmentdate){ 
            item.date = formatDate(item.appointmentdate);
          }
        })
        settotalappointments(appointment)
      }
    } catch (err) {
      notify.error("Total appointments-unable to fetch")

    }
    setLoading(false)
  }

  const getTotalAppointment=async()=>{
    try{
      let resp = await httpClient.GET("corporate/total-appointments",false,true)
      console.log(resp);
      if(resp.data.status){

      }
    }catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUpcomingAppointment();
    getTotalAppointment();
  }, [])

  const columns = [
    { title: '#', field: 'tableData.id', render: rowData => rowData.tableData.id + 1, width: "10%" },
    {
      title: "Member Name", field: "personname"
    }, {
      title: "Doctor", field: "doctorsname"
    }, {
      title: "Service", field: "servicename"
    }, {
      title: "Appointment Date", field: "date"
    }, {
      title: "Appointment time", field: "appointmentTime"
    }
  ]
  return (
    <div className="fam-package-user-dash ">
      <div className="hospital_bookcont_from_user">
        <div className="corporate-dashboard-main">
          <div className="corporate-dashboard-main1">
            <p id="corp-dash-head-txt">Dashboard</p>
            <div className="corp-dash-date-time">
              <p id="corp-date-time-txt">
                <span></span> Today {TimeandDate.today()}
              </p>
            </div>
          </div>
          <div className="corporate-dashboard-main2">
            <div className="corp-dash-calendar corp-dash-calendar1">
              <div className="corp-calendar-body1">
                <h1>20</h1>
                <div className="corp-calendar-1">
                  <span>
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                </div>
              </div>
              <div className="corp-calendar-bottom">
                <p>Total Pending Appointment</p>
              </div>
            </div>
            <div className="corp-dash-calendar corp-dash-calendar2">
              <div className="corp-calendar-body1">
                <h1>20</h1>
                <div className="corp-calendar-2">
                  <span>
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                </div>
              </div>
              <div className="corp-calendar-bottom">
                <p>Total Cancelled Appointment</p>
              </div>
            </div>
            <div className="corp-dash-calendar corp-dash-calendar3">
              <div className="corp-calendar-body1">
                <h1>20</h1>
                <div className="corp-calendar-3">
                  <span>
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                </div>
              </div>
              <div className="corp-calendar-bottom">
                <p>Total Completed Appointment</p>
              </div>
            </div>
            <div className="corp-dash-calendar corp-dash-calendar4">
              <div className="corp-calendar-body1">
                <h1>20</h1>
                <div className="corp-calendar-4">
                  <span>
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                </div>
              </div>
              <div className="corp-calendar-bottom">
                <p>Total Appointment</p>
              </div>
            </div>
          </div>
        </div>

        <MaterialTable
          title="Upcoming Appointments"
          columns={columns}
          isLoading={loading}
          data={totalappointments}
          options={{
            paging: true,
            pageSizeOptions: [5, 10, 20, 25, 50],
            pageSize: 10,
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
        />
      </div>


    </div>
  );
};
