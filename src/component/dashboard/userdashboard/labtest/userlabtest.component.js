import React,{Component} from 'react'
import { connect } from "react-redux"
import { addtocart } from '../../../../actions/cart.ac'
import { fetchlabtest } from '../../../../actions/cart.ac'
class userlabtestcomponent extends Component {
    componentDidMount=()=>{
        this.props.fetchlabtest()
        console.log("props are",this.props.allabtest)
    }
    render() {
        let {allabtest}=this.props
        console.log("props are",this.props)
        return (
            <div>
               {
                   allabtest.map((item,index)=>{
                       return <h4 key={index}>{item.name}</h4>
                   })
               }
            </div>
        )
    }
}

const mapStateToProps = rootstore => {
    return {
        cartitems:rootstore.cart.cartitems,
        allabtest:rootstore.cart.allabtest,
        cartvalue:rootstore.cart.cartvalue
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addtocart: (params) => dispatch(addtocart(params)),
        fetchlabtest:(params)=>dispatch(fetchlabtest(params)),
    }
}

export const Userlabtest = connect(mapStateToProps, mapDispatchToProps)(userlabtestcomponent)
