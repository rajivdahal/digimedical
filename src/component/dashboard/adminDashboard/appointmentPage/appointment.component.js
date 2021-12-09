import MaterialTable from 'material-table';
import { Add, Edit, Clear, DeleteOutline } from "@material-ui/icons";
import Tableicons from '../../../../utils/materialicons';
import { useEffect, useState } from 'react';
import { httpClient } from '../../../../utils/httpClient';
import { Col, Row } from 'react-bootstrap';
const Appointment=(props)=>{

    const[appointmentDetail,setAppointmentDetail] = useState();

    const getAppointment=()=>{
        httpClient.GET("getall-appointment",false,true)
        .then(resp =>{
            console.log(resp)
            let appointment = resp.data.data;
            setAppointmentDetail(appointment)
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    
    useEffect(()=>{
        getAppointment();
    },[])

    const columns = [
        { title: 'NMC', field: 'nmcNo', },
        { title: 'Doctor', field: 'name' },
        { title: 'Patient', field: 'patientsName' },
        { title: 'Appointment Date', field: 'appointmentDate' },
        { title: 'Service', field: 'serviceName' },

    ]

    return (
        <div>
            <Row>
                <Col md={4}>
                
                </Col>
                <Col md={4}>
                
                </Col>
                <Col md={4}>
                
                </Col>
            </Row>

            
            <MaterialTable
                title="Appointments"
                icons={Tableicons}
                columns={columns}
                data={appointmentDetail}
                options={{
                    pageSize: 10,
                }}
                actions={[
                    {
                        icon: Edit,
                        tooltip: 'Edit',
                        // onClick: (e, rowData) => { handleEdit(e, rowData) }
                    },
                    {
                        icon: DeleteOutline,
                        tooltip: 'Delete',
                        // onClick: (e, rowData) => { handledelete(e, rowData) }
                    },
                ]}
            />
        </div>
    )
}
export default Appointment