import MaterialTable from "material-table";
import Tableicons from "../../../../utils/materialicons";
import { useEffect, useState } from "react";
import { httpClient } from "../../../../utils/httpClient";
import { Col, Row, Card } from "react-bootstrap";
import "./appointment.component.css";
import { notify } from "../../../../services/notify";
// import Select from 'react-select';
const Appointment = (props) => {
  const [appointmentDetail, setAppointmentDetail] = useState([]);
  const [title, setTitle] = useState("Upcoming Appointment");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAppointment = async (status) => {
    setLoading(true);
    try {
      let resp = await httpClient.GET(
        "getall-appointment/" + status,
        false,
        true
      );
      let appointment = resp.data.data;
      appointment.forEach((item) => {
        item.appointmentDate = item.appointmentDate.slice(0, 10);
      });
      setAppointmentDetail(appointment);
      setLoading(false);
    } catch (err) {
      if (err.response || err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
        setLoading(false);
      }
    }
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
            <Row className="appointmentRow">
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
              { title: "NMC", field: "nmcNo" },
              { title: "Doctor Name", field: "doctorsName" },
              { title: "Patient Name", field: "patientsName" },
              { title: "Service", field: "serviceName" },
              { title: "Appointment Date", field: "appointmentDate" },
              { title: "Appointment Time", field: "appointmentTime" },
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
export default Appointment;
