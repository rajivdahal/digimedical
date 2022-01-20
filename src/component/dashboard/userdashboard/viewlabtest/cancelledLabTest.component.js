import { useState ,useEffect} from "react"
import { notify } from "../../../../services/notify"
import { httpClient } from "../../../../utils/httpClient"
import MaterialTable from 'material-table';
import { Add, Edit, Clear, DeleteOutline } from "@material-ui/icons";
import { Visibility } from "@material-ui/icons";
import Tableicons from "../../../../utils/materialicons";

export const CancelledLabTest=()=>{
    let [pendingLabTests, setpendingLabTests] = useState([])
    useEffect(()=>{
        httpClient.GET("lab-booking/get-booking/0", false, true)
        .then(resp => {
            setpendingLabTests(resp.data.data)
        })
        .catch(err => {
            notify.error("Error in fetching lab test")
        })
    },[])
    return (
       <>
       <MaterialTable
                 data={pendingLabTests}
                 title="Pending Lab Tests Details"
                 icons={Tableicons}
                    columns={[
                        {title:"Category",field:"category"},
                        { title: 'Sub-Category', field: 'subcategory' },
                        { title: 'description', field: 'description' },
                        { title: 'price', field: 'price' },  
                    ]}
                    // isLoading={true}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 5,
                        filtering: false,
                        sorting: true,
                        headerStyle: {
                            backgroundColor: '#2745F0',
                            color: '#FFF'
                        }
                    }}
                />
       </>
    )
}