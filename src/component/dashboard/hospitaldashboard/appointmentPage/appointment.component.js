import MaterialTable from "material-table";
import Tableicons from "../../../../utils/materialicons";
import { useEffect, useState } from "react";
import { httpClient } from "../../../../utils/httpClient";
import { Col, Row, Card } from "react-bootstrap";
import { notify } from "../../../../services/notify";
// import "./appointment.component.css"
// import Select from 'react-select';
const HospitalAppointment = (props) => {
  const [appointmentDetail, setAppointmentDetail] = useState([]);
  const [title, setTitle] = useState("Upcoming Appointment");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAppointment = async (status) => {
    setLoading(true);
    try {
      let resp = await httpClient.GET(
        "get/hospital/appointments/" + status,
        false,
        true
      );

      console.log(resp);
      let appointment = [];
      if(resp.data.status){
        appointment = resp.data.data;
        console.log(appointment)
        appointment.forEach((item) => {
          item.appointmentdate = item.appointmentdate.slice(0, 10);
        });
        console.log(appointment);
        setAppointmentDetail(appointment);
      }


    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getAppointment(0);
  }, []);

  const handleAppointment = (title, status) => {
    setStatus(status);
    getAppointment(status);
    setTitle(title);
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Text>
            <Row>
              <Col md={4} className="appointment">
                <div
                  className={
                    status == 0 ? "appointment-focus" : "appointment-tab"
                  }
                  onClick={() => handleAppointment("Upcoming Appointment", 0)}
                >
                  Upcoming Appointment
                </div>
              </Col>
              <Col md={4} className="appointment">
                <div
                  className={
                    status == 1 ? " appointment-focus" : "appointment-tab"
                  }
                  onClick={() => handleAppointment("Completed Appointment", 1)}
                >
                  Completed Appointment
                </div>
              </Col>
              <Col md={4} className="appointment">
                <div
                  className={
                    status == 2 ? " appointment-focus " : "appointment-tab"
                  }
                  onClick={() => handleAppointment("Cancelled Appointment", 2)}
                >
                  Cancelled Appointment
                </div>
              </Col>
            </Row>
          </Card.Text>

          <MaterialTable
            title={title}
            icons={Tableicons}
            columns={[
              { title: "Doctor Name", field: "doctorname" },
              { title: "Patient Name", field: "patientname" },
              { title: "Service Name", field: "servicename" },
              { title: "Appointment Date", field: "appointmentdate" },
              { title: "Appointment Time", field: "appointmenttime" },
            ]}
            data={appointmentDetail}
            options={{
              pageSize: 5,
              headerStyle: {
                backgroundColor: "#2745F0",
                color: "#FFF",
              },
            }}
            isLoading={loading}
          />
        </Card.Body>
      </Card>
    </div>
  );
};
export default HospitalAppointment;
