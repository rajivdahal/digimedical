import React from 'react'
import { connect } from "react-redux"
const userlabtestcomponent=(props)=>{
    return (
        <div>
            <h1>userlabtest</h1>
            <h1>userlabtest</h1>

            <h1>userlabtest</h1>

            <h1>userlabtest</h1>

            <h1>userlabtest</h1>
            
        </div>
    )
}
const mapStateToProps = rootstore => {
    return {
        a: 'abcd',
        // usernameinfo: rootstore.login.username,
        // isloading:rootstore.product.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addtocart: (params) => dispatch(addtocart(params))
    }
}
export const Userlabtest = connect(mapStateToProps, mapDispatchToProps)(userlabtestcomponent)
