import React, { Component } from 'react'
import { connect } from "react-redux"
import { addtocart } from '../../../../actions/cart.ac'
import { fetchlabtest } from '../../../../actions/cart.ac'
import "./userdashboard.component.css";
import labtest_img2 from "../../../../assets/labtest2.png";
import { setlabtest } from '../../../../actions/cart.ac';
import { settemptotal } from '../../../../actions/cart.ac';
import { resetcheckbox } from '../../../../actions/cart.ac';
import { addtocartsignal } from '../../../../actions/cart.ac';
import { checkout } from '../../../../actions/cart.ac';
import {Checkoutpopup} from "./lab_popup"

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL
class userlabtestcomponent extends Component {
    componentDidMount = () => {
        this.props.fetchlabtest()
        console.log("props are", this.props)
    }
    render() {
        let total = 0
        console.log("props in labtest are", this.props)
        let { allabtest, cartitems, cartvalue, tempdata,addtocartsign,checkoutsignal} = this.props
        let cart=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):null
        const addtocart = (item) => {
            console.log("add to cart items are",item)
            this.props.addtocart(item)
        }
        const assignisactive = (item, index) => {
            let newallabtest = allabtest.map((item, indexoflabtest) => {
                if (index == indexoflabtest) {
                    item.isactiveclass = true
                }
                else {
                    item.isactiveclass = false
                }
                return item
            })
            // console.log("new mappedlabtest is", newallabtest)
            this.props.setlabtest(newallabtest)
        }

        const handlecheckboxchange = (e, category, item, categoryindex, subcategoryindex) => {
            let { name, value, checked } = e.target
            console.log("checked is", category, checked, item, categoryindex, subcategoryindex)
            let price = item.price
            let totalprice = 0
            category.subcategory.map((item, index) => {
                totalprice = totalprice + parseInt(item.price)
            })
            if (checked) {
                price = tempdata.totalamount + parseInt(price)
                this.props.settemptotal(price)
                this.props.resetcheckbox({
                    categoryindex: categoryindex,
                    subcategoryindex: subcategoryindex,
                    checked: true
                })
            }
            else {
                if (!tempdata.totalamount) {
                    
                    price = totalprice - parseInt(price)
                    this.props.settemptotal(price)
                }
                else {
                    console.log("tempdata.totalamount is????????",tempdata.totalamount)
                    price = parseInt(tempdata.totalamount) - parseInt(price)
                    this.props.settemptotal(price)

                }
                this.props.resetcheckbox({
                    categoryindex: categoryindex,
                    subcategoryindex: subcategoryindex,
                    checked: false
                })

            }

        }
        const handleCheckout=()=>{
            this.props.checkout(!checkoutsignal)
            console.log("checkout called")
        }
        return (
            <div>
                {
                    checkoutsignal?<Checkoutpopup/>:null
                }
               
                <div className="lab_add_to_cart">
                    <div className="lab_add_to_cart1">
                        <div className="lab_add_to_cart_top">
                            <div>
                                <p id="lab_your_cart">Your Cart</p>
                            </div>
                            <div className="lab_add_to_cart_cart">
                                <div>
                                    <p>{cart?cart.cartvalue:"0"}</p>
                                    <div>
                                        <i class="fas fa-shopping-cart"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="lab_add_to_cart_checkout">
                                <div onClick={handleCheckout} style={{cursor:"pointer"}}>
                                    <p>Checkout</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="lab_add_to_cart_samp">
                            {
                                allabtest.map((item, index) => {
                                    return <div className={item.isactiveclass ? "active_lab_add_to_cart_samp1" : "lab_add_to_cart_samp1"} key={index} onClick={() => assignisactive(item, index)}>
                                        <div className="lab_add_to_cart_samp_img1">
                                            <img src={REACT_APP_BASE_URL + "lab-test/download/" + item.id} />
                                        </div>
                                        <div className="lab_add_to_cart_test_desc">
                                            <p>{item.isactive}</p>
                                            <p id="labtest_desc_txt1">{item.name}</p>
                                            <p id="labtest_desc_txt2">What it include :</p>
                                            <div className="labtest_desc1">

                                                <div className="labtest_desc_detail">
                                                    {
                                                        item.isactiveclass ?
                                                            <form id="lab_test_detail">
                                                                {
                                                                    item.subcategory.map((subcategory, subcategoryindex) => {
                                                                        console.log("subcategory checked  is>>>>", subcategory.checked)
                                                                        if (index < 3) {
                                                                            return <div key={subcategoryindex}>
                                                                                <input type={"checkbox"} name={subcategory.categoryname} onChange={(e) => handlecheckboxchange(e, item, subcategory, index, subcategoryindex)} checked={subcategory.checked} />
                                                                                <label htmlFor={subcategory.categoryname}>{subcategory.categoryname}</label>
                                                                                <br />
                                                                            </div>
                                                                        }

                                                                    })
                                                                }

                                                            </form> :
                                                            <ul id="lab_test_detail">
                                                                {
                                                                    item.subcategory.map((item, index) => {
                                                                        if (index < 3) {
                                                                            return <>
                                                                                <li>{item.categoryname}</li>
                                                                            </>

                                                                        }

                                                                    })
                                                                }
                                                            </ul>
                                                    }

                                                </div>
                                                <div>
                                                    {
                                                        item.isactiveclass ?
                                                            <form id="lab_test_detail">
                                                                {
                                                                    item.subcategory.map((item, index) => {
                                                                        if (index > 2 && index < 5) {
                                                                            return <>
                                                                                <input type={"checkbox"} name={item.categoryname} />
                                                                                <label htmlFor={item.categoryname}>{item.categoryname}</label>
                                                                                <br />
                                                                            </>
                                                                        }

                                                                    })
                                                                }

                                                            </form> :
                                                            <ul id="lab_test_detail">
                                                                {
                                                                    item.subcategory.map((item, index) => {
                                                                        if (index > 2 && index < 5) {
                                                                            return <>

                                                                                <li>{item.categoryname}</li>
                                                                            </>

                                                                        }

                                                                    })
                                                                }

                                                            </ul>
                                                    }
                                                </div>
                                                <div>
                                                    {
                                                        item.isactiveclass ?
                                                            <form id="lab_test_detail">
                                                                {
                                                                    item.subcategory.map((item, index) => {
                                                                        if (index > 5 && index < 8) {
                                                                            return <>
                                                                                <input type={"checkbox"} name={item.categoryname} />
                                                                                <label htmlFor={item.categoryname}>{item.categoryname}</label>
                                                                                <br />
                                                                            </>
                                                                        }

                                                                    })
                                                                }

                                                            </form> :
                                                            <ul id="lab_test_detail">
                                                                {
                                                                    item.subcategory.map((item, index) => {
                                                                        if (index > 5 && index < 8) {
                                                                            return <>

                                                                                <li>{item.categoryname}</li>
                                                                            </>
                                                                        }

                                                                    })
                                                                }

                                                            </ul>
                                                    }
                                                </div>
                                                <div>
                                                    {
                                                        item.isactiveclass ?
                                                            <form id="lab_test_detail">
                                                                {
                                                                    item.subcategory.map((item, index) => {
                                                                        if (index > 8 && index < 11) {
                                                                            return <>
                                                                                <input type={"checkbox"} name={item.categoryname} />
                                                                                <label htmlFor={item.categoryname}>{item.categoryname}</label>
                                                                                <br />
                                                                            </>
                                                                        }

                                                                    })
                                                                }

                                                            </form> :
                                                            <ul id="lab_test_detail">
                                                                {
                                                                    item.subcategory.map((item, index) => {
                                                                        if (index > 8 && index < 11) {
                                                                            return <>
                                                                                <li>{item.categoryname}</li>
                                                                            </>

                                                                        }

                                                                    })
                                                                }

                                                            </ul>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lab_add_to_cart_price">
                                            {
                                                item.isactiveclass && tempdata.totalamount ?
                                                    <p>Rs.{tempdata.totalamount}</p>
                                                    :
                                                    item.subcategory.map((subcategory, index) => {
                                                        //console.log("subcategory is", subcategory)
                                                        total = total + parseInt(subcategory.price)
                                                        // console.log("total is", total)
                                                        if (index == item.subcategory.length - 1) {
                                                            return <>
                                                                <p>Rs.{total}</p>
                                                                <div style={{ display: "none" }}>{total = 0}</div>
                                                            </>

                                                        }
                                                    })

                                            }
                                            <div className="lab_add_to_cart_atc">
                                                {
                                                    addtocartsign? <button onClick={() => addtocart(item)}>
                                                    <p>Add to Cart</p>
                                                </button>:<button>Please choose</button>
                                                }
                                               
                                            </div>
                                        </div>
                                    </div>

                                })
                            }

                        </div>

                        <div className="lab_add_to_cart_buttons_select">
                            <div className="lab_add_to_cart_buttons_select1">
                                <div className="lab_arrow_left">
                                    <div>
                                        <button className="lab_arrow left"></button>
                                    </div>
                                </div>
                                <div className="lab_arrow_num1">
                                    <button id="lab_button_num1">1</button>
                                </div>
                                <div className="lab_arrow_num">
                                    <button id="lab_button_num">2</button>
                                </div>
                                <div className="lab_arrow_num">
                                    <button id="lab_button_num">3</button>
                                </div>
                                <div className="lab_arrow_right">
                                    <div id="lab_arrow_right">
                                        <button className="lab_arrow_r"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
        )
    }
}

const mapStateToProps = rootstore => {
    return {
        cartitems: rootstore.cart.cartitems,
        allabtest: rootstore.cart.allabtest,
        cartvalue: rootstore.cart.cartvalue,
        tempdata: rootstore.cart.tempdata,
        addtocartsign:rootstore.cart.addtocartsignal,
        checkoutsignal:rootstore.cart.checkoutsignal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addtocart: (params) => dispatch(addtocart(params)),
        fetchlabtest: (params) => dispatch(fetchlabtest(params)),
        setlabtest: (params) => dispatch(setlabtest(params)),
        settemptotal: (params) => dispatch(settemptotal(params)),
        resetcheckbox: (params) => dispatch(resetcheckbox(params)),
        addtocartsignal: (params) => dispatch(addtocartsignal(params)),
        checkout: (params) => dispatch(checkout(params))
    }
}

export const Userlabtest = connect(mapStateToProps, mapDispatchToProps)(userlabtestcomponent)
