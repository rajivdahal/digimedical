import { Redirect } from "react-router";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import { Home } from "./home/home.component";
import { Login } from "./login/login.component";
import Register from "./register/Register.component";

export const Approuting = (props) => {
    const ProtectedRoute = ({ component: Component, ...rest }) => {
        return (
            <Route {...rest} render={(routeProps) => {
                 return localStorage.getItem('dm-access_token')
                 ?
                 <div>
                 <Component {...routeProps} ></Component>
                 </div>
                 :<Redirect to="/login"></Redirect>
            }}></Route>
        )
    }
    const PublicRoute = ({ component: Component, ...rest }) => {
        return (
            <Route {...rest} render={(routeProps) => {
                 return (
                     <div>
                     <Component {...routeProps}></Component>
                     </div>
                 )
            }}></Route>
        )
    }
    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute exact path="/login" component={Login}></PublicRoute>
                <PublicRoute exact path="/" component={Home}></PublicRoute>
                <PublicRoute exact path="/register" component={Register}></PublicRoute>
                <ProtectedRoute exact path="/dashboard/:id" component={Register}></ProtectedRoute>
                
            </Switch>
        </BrowserRouter>
    )
}
