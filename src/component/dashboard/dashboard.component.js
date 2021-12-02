import { Redirect } from "react-router"
import AdminDashboard from "./adminDashboard/adminDashboard.component"
import { Dashboardnavbar } from "./Navbar/Dashboardnavbar.component"
import Userdashboard from "./userdashboard/userDashboard.component"
import Usersidebar from "./usersidebar/usersidebar.component"
import {PublicRoute} from "./../routing/App.routing"


const Dashboard = (props) => {
  const statusCode = localStorage.getItem("status")
  const { children } = props;


  // const statusCode=props.location.state.status
  // console.log("props deom dashboard>>",props.location.state.status)
  return (
    <>

      {
        statusCode == 200 ?
          <>
            <Dashboardnavbar props={props.history}></Dashboardnavbar>
           
            {/* <PublicRoute
                        appRoutes={children}
                        redirectPath={{ from: "/", to: "/user-management" }}
            /> */}

           
            <Usersidebar props={props.history}></Usersidebar>
          </>
          : statusCode == 100 ?
            <>
              {/* <Dashboardnavbar props={props.history}></Dashboardnavbar> */}
              <AdminDashboard props={props.history}></AdminDashboard>
            </>
            : <Redirect to="/login" timeoutMsg="Please login again"></Redirect>
      }
    </>
  )
}
export default Dashboard
