import { useEffect, useState } from "react"
import { notify } from "../../../../services/notify";
import MaterialTable from 'material-table'
import Tableicons from "../../../../utils/materialicons";
import { Container } from "react-bootstrap";
import { httpClient } from '../../../../utils/httpClient';

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

    useEffect(()=>{
        getBookedLabtest(0);
    },[])
    return (
        <div>
            <Container>
                <MaterialTable
                    columns={[
                        // { title: "ID", field: "labtestid" },
                        { title: 'Patient Name', field: 'patientname'},
                        // { title: 'Age', field: 'age'},
                        { title: 'Lab Test', field: 'labtestname', },
                        { title: 'Subcategory', field: 'labtestcategoryname'},
                        { title: 'Price', field: 'priceString' },
                        // { title: 'Date', field: 'date' },
                        
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
                    isLoading={loading}

                />
            </Container>
        </div>
    )
}

export default BookedLabtest