import MaterialTable from 'material-table';
import { Edit, DeleteOutline } from "@material-ui/icons";
import Tableicons from '../../../../utils/materialicons';
import { useEffect, useState } from 'react';
import { httpClient } from '../../../../utils/httpClient';
import { Col, Row, Container ,Card} from 'react-bootstrap';

import "./appointment.component.css"
const Appointment = (props) => {

    const [appointmentDetail, setAppointmentDetail] = useState([]);
    const [title, setTitle] = useState("Upcoming Appointment");
    const [isdynamicupcomingclass, setisdynamicupcomingclass] = useState(false)
    const [status, setStatus] = useState(0);
    const [color, setColor] = useState("grey");
    const [loading, setLoading] = useState(false)

    const getAppointment = async (status) => {
        setLoading(true);
        await httpClient.GET("getall-appointment/" + status, false, true)
            .then(resp => {
                console.log(resp)
                let appointment = resp.data.data;
                setAppointmentDetail(appointment);
                setLoading(false)
            })
            .catch(err => {
                console.log(err.response)
                setLoading(false)
            })
    }

    useEffect(() => {
        getAppointment(0);
    }, [])

    const handleAppointment = (title, status) => {
        setisdynamicupcomingclass(true)
        getAppointment(status)
        setTitle(title);
        setStatus(status);

    }

    return (
        <div>

            <Card>
                <Card.Body>
                    <Card.Text>
                        <Row className="appointmentRow">
                            <Col md={4} className="appointment" >
                                <div onClick={() => handleAppointment("Upcoming Appointment", 0)}>Upcoming Appointment</div>
                            </Col>
                            <Col md={4} className="appointment" >
                                <div onClick={() => handleAppointment("Completed Appointment", 1)}>Completed Appointment</div>
                            </Col>
                            <Col md={4} className="appointment" >
                                <div onClick={() => handleAppointment("Cancelled Appointment", 2)} >Cancelled Appointment</div>
                            </Col>
                        </Row>
                    </Card.Text>
                    <MaterialTable
                title={title}
                icons={Tableicons}
                columns={[
                    { title: 'NMC', field: 'nmcNo', },
                    { title: 'Patient', field: 'patientsName' },
                    { title: 'Doctor', field: 'doctorsName' },
                    { title: 'Service', field: 'serviceName' },
                    { title: 'Appointment Date', field: 'appointmentDate' },
                    { title: 'Appointment Time', field: 'appointmentTime' },

                ]}
                data={appointmentDetail}
                options={{
                    pageSize: 5,
                    headerStyle: {
                        backgroundColor: '#2745F0',
                        color: '#FFF'
                    }
                }}
                isLoading={loading}
            />
                  
                </Card.Body>
            </Card>


        </div>
    )
}
export default Appointment