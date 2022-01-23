import { useEffect, useState } from "react"
import { notify } from "../../../../services/notify";
import MaterialTable from 'material-table'
import Tableicons from "../../../../utils/materialicons";
import { Container } from "react-bootstrap";
import { httpClient } from '../../../../utils/httpClient';
import { Visibility } from "@material-ui/icons";

const BookedLabtest=(props)=>{

    const[bookedLabtest,setBookedLabtest] = useState([])
    const [loading, setLoading] = useState(false)
    const getBookedLabtest=async(status)=>{

        setLoading(false);

        await httpClient.GET("lab-booking/get-all/" + status, false, true)
        .then(resp => {
            console.log(resp)
            let bookedLabtest = resp.data.data;
            bookedLabtest.forEach((item) => {
                if(item.date){
                item.date = item.date.slice(0, 10)
                }
                item.priceString = "Rs." + item.price;

            })
            console.log(bookedLabtest)
            setBookedLabtest(bookedLabtest)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    const showLabtestReport=(e,data)=>{
        props.history.push("/dashboard/labtest-report",data)
    }

    useEffect(()=>{
        getBookedLabtest(0);
    },[])
    return (
        <div>
            <Container>
                <MaterialTable
                    columns={[
                        { title: '#', field: 'tableData.id', render:rowData => rowData.tableData.id+1},
                        { title: 'Patient Name', field: 'patientname'},
                        { title: 'Lab Test', field: 'labtestname', },
                        { title: 'Subcategory', field: 'labtestcategoryname'},
                        { title: 'Price', field: 'priceString' },
                        
                    ]}
                    data={bookedLabtest}
                    title="Booked Lab Test "
                    icons={Tableicons}
            
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }
                    }}

                    actions={[
                        {
                          icon: () => <Visibility fontSize="small" className="action-button"/>,
                          tooltip: "View Details",
                          onClick: (e, rowData) => {
                            showLabtestReport(e, rowData);
                          },
                          
                        }, 
                      ]}
                    isLoading={loading}

                />
            </Container>
        </div>
    )
}

export default BookedLabtest