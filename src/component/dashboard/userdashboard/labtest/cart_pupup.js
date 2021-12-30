import React from 'react'
import "./cart_popup.css"

import { Component } from 'react'
import { connect } from "react-redux"
import { Modal } from 'react-bootstrap';
import { cartpopupsignal } from '../../../../actions/cart.ac';
import { removeproductstatus } from '../../../../actions/cart.ac';

class Cartpopupcomponent extends Component {
    render() {
        let { removeproductstatus, removeproductsign } = this.props
        const cart = JSON.parse(localStorage.getItem("cart"))
        const removemappedproduct = (toremoveitem, toremoveindex) => {
            console.log(toremoveitem, toremoveindex)
            if (cart) {
                cart.labs.map((item, index) => {
                    console.log("inside mapper")
                    if (index == toremoveindex) {
                        cart.cartvalue = cart.cartvalue - 1
                        cart.labs.splice(index, 1)
                        localStorage.setItem("cart", JSON.stringify(cart))
                        this.props.removeproductstatus(!removeproductsign)
                    }
                })
            }
        }

        return (
            <>
                <div>
                    <div id="popup1_carts" >
                        <div className="popup_carts">
                            <div className="pop_carts_cont">
                                <div className="pop_carts_cont1">
                                    <div className="popup_carts_cont1_head">
                                        <p id="popup_carts_cont1_head">Lab Test</p>
                                    </div>
                                    <ol className="popup_carts_cont1_desc">
                                        {
                                            cart ?
                                                cart.labs.length ?
                                                    cart.labs.map((item, index) => {
                                                        return <li id="popup_carts_cont1_desc">
                                                            <div>
                                                                {item.name}
                                                                <span id="carts_labtest_span_cross" onClick={() => removemappedproduct(item, index)} style={{ cursor: "pointer" }}>
                                                                    <p>&times;</p>
                                                                </span>
                                                            </div>
                                                        </li>
                                                    }) : <p>No any items found</p> : <p>No any items found</p>

                                        }
                                    </ol>
                                </div>
                                <a class="close" href="#"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="#pop_checkout" className="lab_add_to_cart_checkout">
                    <div>
                        <p>Checkout</p>
                    </div>
                </a>


            </>

        )
    }
}
const mapStateToProps = rootstore => {
    return {
        removeproductsign: rootstore.cart.removeproductsign,
        cartpopupsign: rootstore.cart.cartpopupsign
    }
}
const mapDispatchToProps = dispatch => {
    return {
        removeproductstatus: (params) => dispatch(removeproductstatus(params)),
        cartpopupsignal: (params) => dispatch(cartpopupsignal(params))
    }
}

export const Cartpopup = connect(mapStateToProps, mapDispatchToProps)(Cartpopupcomponent)


