import { Header } from "../common/Header/Header.component"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import { Loginbody } from "./loginbody/Loginbody.component"
export const Login = (props) => {
    let timeoutMsg=props.location.timeoutMsg?props.location.timeoutMsg:null
    return (
        <>
            {/* <Header></Header> */}
            <Navbar></Navbar>
            <Loginbody timeoutMsg={timeoutMsg} history={props.history}></Loginbody>
            <Footer></Footer>
        </>
    )
}
