import { Link } from "react-router-dom"
import "./Pagenotfound.component.css"
export const Pagenotfound = () => {
    return (
        <>
            <div className="body">
                <h1>page not found</h1>
                <img src="/images/404notfound/404.jpg"></img><br/>
                <h4> <Link to="/"> <span className="span">Click here</span> </Link>to go to Homepage</h4>
            </div>
        </>
    )
}