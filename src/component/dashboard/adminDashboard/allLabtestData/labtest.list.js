import MaterialTable from 'material-table';
import Tableicons from '../../../../utils/materialicons';
import { useEffect, useState } from 'react';
import { httpClient } from '../../../../utils/httpClient';
import { Col, Row, Container, Card } from 'react-bootstrap';
import { Visibility } from "@material-ui/icons";

const LabTestDetail = (props) => {

    const actions = {
        completed :[
            {
                icon: () => <Visibility fontSize="small" className="action-button" />,
                tooltip: "View Details",
                  onClick: (e, rowData) => {
                    showLabtestReport(e, rowData);
                  },

            },
        ],
        upcoming: [],
        cancelled: []
    }

    const [labtestDetail, setLabtestDetail] = useState([]);
    const [title, setTitle] = useState("Upcoming Appointment");
    const [status, setStatus] = useState(0);
    const [color, setColor] = useState("grey");
    const [loading, setLoading] = useState(false)
    const [selectedActions, setActions ] = useState(actions.upcoming);


    const getLabtest = async (status) => {
        setLoading(true);
        setStatus(status)
        await httpClient.GET("lab-booking/get-all/" + status, false, true)
            .then(resp => {
                // let appointment = resp.data.data;
                // appointment.forEach((item)=>{
                //     item.appointmentDate = item.appointmentDate.slice(0,10)
                // })
                setLabtestDetail(resp.data.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getLabtest(0);
    }, [])

    useEffect(()=>{
        let tempActions = [];
        if(status === 1){
            tempActions = actions.completed;
            setActions(tempActions)
        }else if(status === 0){
            tempActions = actions.upcoming;
            setActions(tempActions)
        }else{
            tempActions = actions.cancelled;
            setActions(tempActions) 
        }
    },[status])

    const handleLabtest = (title, status) => {
        setStatus(status);
        getLabtest(status)
        setTitle(title);
    }

    const showLabtestReport=(e,data)=>{
        props.history.push({
            pathname : "/dashboard/labtest-report",
            state : data,
        })

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
                            { title: '#', field: 'tableData.id', render:rowData => rowData.tableData.id+1},
                            { title: 'Patient', field: 'patientname' },
                            { title: 'Email', field: 'email' },
                            { title: 'Labtest', field: 'labtestname' },
                            { title: 'Subcategory', field: 'labtestcategoryname' },
                            { title: 'Price', field: 'price' },

                        ]}
                        data={labtestDetail}
                        options={{
                            pageSize: 10,
                            actionsColumnIndex: -1,
                            headerStyle: {
                                backgroundColor: '#2745F0',
                                color: '#FFF'
                            }
                        }}

                        actions={selectedActions}

                        isLoading={loading}
                    />

                </Card.Body>
            </Card>


        </div>
    )
}
export default LabTestDetail