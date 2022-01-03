import { useState, useEffect, useRef } from "react";
import { Container, } from "react-bootstrap";
import { httpClient } from '../../../../utils/httpClient';
import MaterialTable from 'material-table'
import { Add, Edit, Clear, DeleteOutline } from "@material-ui/icons";
import Tableicons from "../../../../utils/materialicons";

const HospitalTable = (props) => {

    const [allHospital, setAllHospital] = useState([]);

    const getAllHospital = async () => {
        await httpClient.GET("hospital/all", false, true)
            .then(resp => {
                console.log(resp)
                if (resp.data.status) {
                    let data = resp.data.data;
                    setAllHospital(data)
                }
            })
            .catch(err => {
                console.log("inside catch block")

            })
    }

    useEffect(() => {
        getAllHospital()
    })
    const handleAddHospital = () => {
        props.history.push("/dashboard/add-hospital");
    }
    return (
        <div>
            <Container>
                <MaterialTable
                    columns={[
                        { title: "ID", field: "id" },
                        { title: 'Name', field: 'name', },
                        { title: 'Contact', field: 'contactno' },
                        { title: 'State', field: 'state' },
                        { title: 'City', field: 'city' },
                        { title: 'Street', field: 'street' },

                        {
                            title: 'Status', field: 'activeStatus',
                            render: rowData => rowData.status == true ?
                                <span style={{ color: '#18af69' }}>Active</span>
                                :
                                <span style={{ color: 'red' }}>inActive</span>

                        },
                    ]}
                    data={allHospital}
                    title="Hospitals "
                    icons={Tableicons}
                    actions={[
                        {
                            icon: Add,
                            tooltip: 'Add Doctor',
                            isFreeAction: true,
                            onClick: () => { handleAddHospital() }
                        },
                        {
                            icon: Edit,
                            tooltip: 'Edit Institute',
                            // onClick: (e, rowData) => { getEditData(e, rowData) }
                        },
                        {
                            icon: DeleteOutline,
                            tooltip: 'Change Status',
                            // onClick: (e, rowData) => { instituteChangeStatus(e, rowData) }
                        },
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        filtering: false,
                        sorting: true,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }
                    }}
                />
            </Container>
        </div>
    )
}
export default HospitalTable