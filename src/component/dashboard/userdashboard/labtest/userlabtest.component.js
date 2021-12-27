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
        console.log("alllabtest are",allabtest)
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
        a: 'abcd',
        cartitems:rootstore.cart.cartitems,
        cartnumber:rootstore.cart.cartnumber,
        allabtest:rootstore.cart.allabtest
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addtocart: (params) => dispatch(addtocart(params)),
        fetchlabtest:(params)=>dispatch(fetchlabtest(params))
    }
}

export const Userlabtest = connect(mapStateToProps, mapDispatchToProps)(userlabtestcomponent)
