import "./Pagenotfound.component.css"
export const Pagenotfound = (props) => {
    const redirect = () => {
        props.history.push("/")
    }
    return (
        <>
            <div  className="pgnotfoundbody">
                <h1>Page not found!</h1>
                <img src="/images/404notfound/404.jpg"></img>
                <h3><a href="" onClick={redirect}>Click here</a> to go Homepage</h3>
            </div>
        </>
    )
}