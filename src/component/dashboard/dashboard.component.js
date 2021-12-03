import AdminDashboard from "./adminDashboard/adminDashboard.component"
import Userdashboard from "./userdashboard/userDashboard.component"

const Dashboard=(props)=>{
  const statusCode=props.location.state.status
  console.log("props deom dashboard>>",props.location.state.status)
    return(
        <>  
        {
          statusCode==200?<Userdashboard props={props.history}></Userdashboard>: <AdminDashboard props={props.history}></AdminDashboard>
        }    
        </>
    )
}
export default Dashboard
