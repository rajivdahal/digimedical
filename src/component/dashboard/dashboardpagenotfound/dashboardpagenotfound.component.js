import { Link } from "react-router-dom"
import "./dashboardpagenotfound.component.css"
export const Dashboardpagenotfound = () => {
    return (
        <>
     
            <div className="body-dashboard">
                <h1>page not found</h1>
                <img src="/images/404notfound/404.jpg"></img><br/>
                <h4> <Link to="/dashboard"> <span className="span">Click here</span> </Link>to go to Dashboard</h4>
            </div>
        </>
    )
}