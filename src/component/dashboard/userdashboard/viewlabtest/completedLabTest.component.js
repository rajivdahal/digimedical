import { useEffect,useState } from "react"
import { notify } from "../../../../services/notify"
import { httpClient } from "../../../../utils/httpClient"
import MaterialTable from 'material-table';
import { Add, Edit, Clear, DeleteOutline } from "@material-ui/icons";
import { Visibility } from "@material-ui/icons";
import Tableicons from "../../../../utils/materialicons";
import { useHistory } from 'react-router-dom'
import { Modal } from "@material-ui/core";
import { LabTestImages } from "./labTestImages.component";
import { BsDisplay } from "react-icons/bs";
import { display } from "@mui/system";

export const CompletedLabTests=(props)=>{
    let [completedLabTests, setcompletedLabTests] = useState([])
    const [showModel,setShowModel]=useState(false)
    let history=useHistory()
    useEffect(() => {
        httpClient.GET("lab-booking/get-booking/1", false, true)
        .then(resp => {
            setcompletedLabTests(resp.data.data)
        })
        .catch(err => {
            notify.error("Error in fetching lab test")
        })
}, [])


// const handleClose = () => setShowModel(false)
    return (
       <>
       {
           !showModel?<MaterialTable
           data={completedLabTests}
           title="Completed Lab Tests Details"
           icons={Tableicons}
              columns={[
                  {title:"Category",field:"category"},
                  { title: 'Sub-Category', field: 'subcategory' },
                  { title: 'description', field: 'description' },
                  { title: 'price', field: 'price' },  
              ]}

              actions={[
                  {
                    icon: () => (
                      <Visibility fontSize="medium"
                        className="action-button"
                      />
                    ),
                    tooltip: "View prescription",
                    onClick: (e, rowData) => {
                      props.showLabTest(rowData);
                    },
                  }, 
                ]}
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
          /> :null
       }
                
              
       </>
    )
}