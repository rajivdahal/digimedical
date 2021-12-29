import React from 'react'
import "./cart_popup.css"

import { Component } from 'react'
import { connect } from "react-redux"
import { Modal } from 'react-bootstrap';
import { cartpopupsignal } from '../../../../actions/cart.ac';

class Cartpopupcomponent extends Component {
    render() {
        const cart = JSON.parse(localStorage.getItem("cart"))

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
                                                cart.labs.length ?
                                                    cart.labs.map((item, index) => {
                                                        return <li id="popup_carts_cont1_desc">
                                                            <div>
                                                                {item.name}
                                                                <span id="carts_labtest_span_cross">
                                                                    <p>&times;</p>
                                                                </span>
                                                            </div>
                                                        </li>
                                                    }) : <p>No any items found</p>
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
        // // cartitems: rootstore.cart.cartitems,
        // // allabtest: rootstore.cart.allabtest,
        // // cartvalue: rootstore.cart.cartvalue,
        // // tempdata: rootstore.cart.tempdata,
        // addtocartsign: rootstore.cart.addtocartsignal,
        // checkoutsignal: rootstore.cart.checkoutsignal,
        // removeproductsign: rootstore.cart.removeproductsign
        cartpopupsign: rootstore.cart.cartpopupsign
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // addtocart: (params) => dispatch(addtocart(params)),
        // fetchlabtest: (params) => dispatch(fetchlabtest(params)),
        // setlabtest: (params) => dispatch(setlabtest(params)),
        // settemptotal: (params) => dispatch(settemptotal(params)),
        // resetcheckbox: (params) => dispatch(resetcheckbox(params)),
        // removeproduct: (params) => dispatch(removeproduct(params)),
        // addtocartsignal: (params) => dispatch(addtocartsignal(params)),
        // checkout: (params) => dispatch(checkout(params)),
        // removeproductstatus: (params) => dispatch(removeproductstatus(params))
        cartpopupsignal: (params) => dispatch(cartpopupsignal(params))
    }
}

export const Cartpopup = connect(mapStateToProps, mapDispatchToProps)(Cartpopupcomponent)


