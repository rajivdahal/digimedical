import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import "./Pagenotfound.component.css"
export const Pagenotfound = () => {
    return (
        <>
        <Navbar></Navbar>
            <div className="body">
                <h1>page not found</h1>
                <img src="/images/404notfound/404.jpg"></img><br/>
                <h4> <Link to="/"> <span className="span">Click here</span> </Link>to go to Homepage</h4>
            </div>
            <Footer></Footer>
        </>
    )
}
export const LostInternetConnection=()=>{
    return(
        <>
            <div className="body">
                <h1>Please check your Internet connection</h1>
                <img src="/images/404notfound/404.jpg"></img><br/>
            </div>
        </>
    )
}