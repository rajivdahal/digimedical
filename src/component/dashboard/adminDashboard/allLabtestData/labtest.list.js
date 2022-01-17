import MaterialTable from 'material-table';
import Tableicons from '../../../../utils/materialicons';
import { useEffect, useState } from 'react';
import { httpClient } from '../../../../utils/httpClient';
import { Col, Row, Container, Card} from 'react-bootstrap';
const LabTestDetail = (props) => {

    const [labtestDetail, setLabtestDetail] = useState([]);
    const [title, setTitle] = useState("Upcoming Appointment");
    const [status, setStatus] = useState(0);
    const [color, setColor] = useState("grey");
    const [loading, setLoading] = useState(false)

    const getLabtest = async (status) => {
        setLoading(true);

        await httpClient.GET("lab-booking/get-all/" + status, false, true)
            .then(resp => {
                console.log(resp)
                // let appointment = resp.data.data;
                // appointment.forEach((item)=>{
                //     item.appointmentDate = item.appointmentDate.slice(0,10)
                // })
                setLabtestDetail(resp.data.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        getLabtest(0);
    },[])

    const handleLabtest = (title, status) => {
        setStatus(status);
        getLabtest(status)
        setTitle(title);
    }

    return (
        <div>

            <Card>
                <Card.Body>
                    <Card.Text>
                        <Row className="appointmentRow">

                            <Col md={4} className="appointment" >
                                <div className={status == 0 ? ' appointment-focus ' : 'appointment-tab'} onClick={() => handleLabtest("Upcoming Lab Test", 0)}>Upcoming Lab Test</div>
                            </Col>
                            <Col md={4} className="appointment" >
                                <div className={status == 1 ? ' appointment-focus ' : 'appointment-tab'} onClick={() => handleLabtest("Completed Lab Test", 1)}>Completed LabTest</div>
                            </Col>
                            <Col md={4} className="appointment" >
                                <div className={status == 2 ? ' appointment-focus ' : 'appointment-tab'} onClick={() => handleLabtest("Cancelled Lab Test", 2)} >Cancelled Lab Test</div>
                            </Col>
                        </Row>
                    </Card.Text>

                    <MaterialTable
                        title={title}
                        icons={Tableicons}
                        columns={[
                            // { title: 'Appointment ID', field: 'appointmentid' },
                            { title: 'Patient', field: 'patientname' },
                            { title: 'Email', field: 'email' },
                            { title: 'Labtest', field: 'labtestname' },
                            { title: 'Subcategory', field: 'labtestcategoryname' },
                            { title: 'Price', field: 'price' },

                        ]}
                        data={labtestDetail}
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
export default LabTestDetail