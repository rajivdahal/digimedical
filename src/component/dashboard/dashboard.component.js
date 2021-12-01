import { Redirect } from "react-router"
import AdminDashboard from "./adminDashboard/adminDashboard.component"
import Userdashboard from "./userdashboard/userDashboard.component"

const Dashboard=(props)=>{
  const statusCode=localStorage.getItem("status")
  // const statusCode=props.location.state.status
  // console.log("props deom dashboard>>",props.location.state.status)
    return(
        <>  
        {
          statusCode==200?<Userdashboard props={props.history}></Userdashboard>:statusCode==100?<AdminDashboard props={props.history}></AdminDashboard>:<Redirect to="/login" timeoutMsg="Please login again"></Redirect>
        }    
        </>
    )
}
export default Dashboard
