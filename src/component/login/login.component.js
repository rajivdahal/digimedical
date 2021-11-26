import { Header } from "../common/Header/Header.component"
import { Loginbody } from "./loginbody/Loginbody.component"
export const Login = (props) => {
    let timeoutMsg=props.location.timeoutMsg?props.location.timeoutMsg:null
    return (
        <>
            <Header></Header>
            <Loginbody timeoutMsg={timeoutMsg} history={props.history}></Loginbody>
        </>
    )
}
