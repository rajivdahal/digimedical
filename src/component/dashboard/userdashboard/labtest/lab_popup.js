import React from 'react'
import { TimeandDate } from '../../../../services/timeanddate'
import "./lab_popup.css"

import { Component } from 'react'
import { connect } from "react-redux"
import { removeproductstatus } from '../../../../actions/cart.ac'
import { addtocartsignal } from '../../../../actions/cart.ac'
import { checkout } from '../../../../actions/cart.ac'
import { removeproduct } from '../../../../actions/cart.ac'
import { httpClient } from '../../../../utils/httpClient'
import { notify } from '../../../../services/notify'


class Checkoutpopupcomponent extends Component {
  render() {
  
    let total=0
    console.log("props in popups are", this.props)
    let { removeproductstatus, addtocartsign, checkoutsignal,removeproductsign } = this.props
    const cart = JSON.parse(localStorage.getItem("cart"))
    console.log("cart is",cart)
    const removecartproduct = (toremoveitem, toremoveindex) => {
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

    const removepopup = () => {
      console.log("remove pop up triggered")
      this.props.checkout(!checkoutsignal)
    }
    const itemsmanipulation=(toremoveitem,toremoveindex)=>{
      console.log("manipulation triggered")
      console.log("item and index are",toremoveindex)

      const cartitems = JSON.parse(localStorage.getItem("cart"))
      cartitems.labs.map((item, index) => {
        console.log("inside mapper")
        if (index == toremoveindex) {
          cartitems.cartvalue = cartitems.cartvalue - 1
          cartitems.labs.splice(index, 1)
          localStorage.setItem("cart", JSON.stringify(cartitems))
          this.props.removeproductstatus(!removeproductstatus)
        }

      })
      
    }
    const handleCheckout=()=>{
      const cartitems = JSON.parse(localStorage.getItem("cart"))
      let labdatatocheckout=[]
      cartitems.labs.map((item,index)=>{
        item.subcategory.map((item,index)=>{
          if(item.checked==true){
            labdatatocheckout.push({
              price:item.price,
              labId:item.id
            })
          }
        })
      })
      if(labdatatocheckout.length){
        httpClient.POST("lab-booking/create",labdatatocheckout,false,true)
        .then(resp=>{
          notify.success("Lab test booked successfully")
            this.props.history.push("/dashboard")
        })
        .catch(err=>{
          notify.error("Lab test could not be saved,Please try again in few minutes")
        })
      }
      
    }
    return (
      <div>
        <div id="pop_checkout" >
          <div className="popup_lab">
            <div className="popup_lab1">
              <div className="pop_lab_cont1">
                <div className="pop_lab_cont1_1">
                  <p id="popup_lab_cont1_head">Order Details</p>
                  <div>
                    <p id="popup_lab_cont1_desc">
                      Order Created
                      <span id="popup_lab_cont1_span">
                        {TimeandDate.today()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="pop_lab_cont2">
                <div className="pop_lab_cont1_1">
                  <p id="popup_lab_cont2_head">Lab Test</p>
                  <ol className="popup_lab_cont2_desc">
                    {
                      cart.labs.map((item, index) => {
                        return <li id="popup_lab_cont2_desc">
                          {item.name}
                          <span id="lab_labtest_span_cross" style={{ cursor: "pointer"}} onClick={()=>removecartproduct(item,index)}>
                            <p>&times;</p>
                          </span>
                        </li>
                      })
                    }


                  </ol>
                </div>
              </div>
              <div className="pop_lab_cont3">
                <div className="pop_lab_cont3_3">
                  <p id="popup_lab_cont1_head">Order Summary</p>
                  <div className="popup_lab_cont3_desc">
                    <p id="popup_lab_cont3_desc">
                      Subtotal
                      <span id="popup_lab_cont1_span">Rs {
                        cart.labs.length?
                        cart.labs.map((categoryitem,categoryindex)=>{
                          console.log("categoryitem is",categoryitem)
                          console.log("inside map")
                                categoryitem.subcategory.map((subcategoryitem,subcategoryindex)=>{
                                    if(subcategoryitem.checked==true){
                                      total=total+parseInt(subcategoryitem.price)
            
                                      console.log("total is",total)
                                    }
                                    
                                })
                                console.log("index is",categoryindex,"length is",categoryitem.length)
                          
                          if(categoryindex==cart.labs.length-1){
                            console.log("inside last index and total is",total)
                            return <span>{total}</span>
                          }
                        }): <span>0</span>

                      }</span>
                    </p>
                    <p id="popup_lab_cont3_desc">
                      Service Charge{" "}
                      <span id="popup_lab_cont1_span">0%</span>
                    </p>
                    <p id="popup_lab_cont3_desc">
                      Discount <span id="popup_lab_cont1_span">0%</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="pop_lab_cont4">
                <p id="popup_lab_cont4_head">
                  Grand Total <span id="popup_lab_cont1_span">Rs {total}</span>
                </p>
                <div className="popup_lab_cont4_foot">
                  <a className="popup_lab_close" onClick={removepopup} style={{ cursor: "pointer" }}>
                    <p>Back</p>
                  </a>
                  <a className="lab_popup_checkout" style={{cursor:"pointer"}}>
                    <div onClick={handleCheckout}>
                      <p>Checkout</p>
                    </div>
                  </a>
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
    addtocartsign: rootstore.cart.addtocartsignal,
    checkoutsignal: rootstore.cart.checkoutsignal,
    removeproductsign:rootstore.cart.removeproductsign
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeproduct:(params)=>dispatch(removeproduct(params)),
    addtocartsignal: (params) => dispatch(addtocartsignal(params)),
    checkout: (params) => dispatch(checkout(params)),
    removeproductstatus: (params) => dispatch(removeproductstatus(params))




  }
}

export const Checkoutpopup = connect(mapStateToProps, mapDispatchToProps)(Checkoutpopupcomponent)

