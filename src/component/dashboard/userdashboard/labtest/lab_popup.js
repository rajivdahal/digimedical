import React from "react";
import { TimeandDate } from "../../../../services/timeanddate";
import "./lab_popup.css";
import { Component } from "react";
import { connect } from "react-redux";
import { removeproductstatus } from "../../../../actions/cart.ac";
import { addtocartsignal } from "../../../../actions/cart.ac";
import { checkout } from "../../../../actions/cart.ac";
import { removeproduct } from "../../../../actions/cart.ac";
import { httpClient } from "../../../../utils/httpClient";
import { notify } from "../../../../services/notify";
class Checkoutpopupcomponent extends Component {
  render() {
    if(!this.props.show)
    return null;
    let total = 0;
    let {
      removeproductstatus,
      addtocartsign,
      checkoutsignal,
      removeproductsign,
    } = this.props;
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log("props are", this.props);
    const removecartproduct = (category, toremoveindex) => {
      console.log("to remove category and index is", category, toremoveindex);
      if (cart) {
        cart.labs.length
          ? cart.labs.map((mainarray, mainarrayindex) => {
              console.log("inside mapper");
              // debugger
              if (mainarray[0].mainCategoryName == category.category) {
                cart.labs.splice(mainarrayindex, 1);
                cart.cartvalue = cart.cartvalue - 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                this.props.removeproductstatus(!removeproductsign);
              }
            })
          : console.log("No items in the cart");
      } else {
        return;
      }
    };

    const removepopup = () => {
      this.props.checkout(!checkoutsignal);
    };

    const handleCheckoutlabtest = () => {
      if (!localStorage.getItem("cart")) {
        this.props.checkout(!checkoutsignal);
         return notify.error("Please add some items to the cart");
      }
      const cartitems = JSON.parse(localStorage.getItem("cart"));
      if (cartitems.labs.length) {
        let labdatatocheckout = [];
        cartitems.labs.map((mainarray, mainarrayindex) => {
          mainarray.map((insideobject, insideobjectitem) => {
            insideobject.labId = insideobject.id;
            labdatatocheckout.push(insideobject);
          });
        });
        console.log("to checkout data are", labdatatocheckout);
        labdatatocheckout.length
          ? httpClient
              .POST("lab-booking/create", labdatatocheckout, false, true)
              .then((resp) => {
                notify.success("Lab test booked successfully");
                localStorage.removeItem("cart");

                this.props.checkout(!checkoutsignal);
                this.props.props.push("/dashboard/view-lab-test");
              })
              .catch((err) => {
                notify.error(
                  "Lab test could not be saved,Please try again in few minutes"
                );
              })
          : notify.error("No any data found");
      } else {
        notify.error("Please add some items to the cart");
        this.props.checkout(!checkoutsignal);
      }
    };
    let maincategories = [];
    if (cart) {
      cart.labs.map((mainarray, mainarrayindex) => {
        console.log("mainarray is", mainarray);
        let subcategories = [];
        let subcategoryarray = {};
        mainarray.map((item, index) => {
          if (index == 0) {
            subcategoryarray.category = item.mainCategoryName;
            subcategories.push(item.labcategoryname);
          } else {
            subcategories.push(item.labcategoryname);
          }
          if (index == mainarray.length - 1) {
            subcategoryarray.subcategories = subcategories;
            maincategories.push(subcategoryarray);
          }
          total = total + parseInt(item.price);
        });
      });
    }
    console.log("maincategories is", maincategories);

    return (
      <div id="pop_checkout">
        <div className="popup_lab">
          <div className="popup_lab1">
            <div className="pop_lab_cont1">
              <div className="pop_lab_cont1_1">
                <p id="popup_lab_cont1_head">Order Details</p>
                <div>
                  <p id="popup_lab_cont1_desc">
                    Order Created
                    <span id="popup_lab_cont1_span">{TimeandDate.today()}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="pop_lab_cont2">
              <div className="pop_lab_cont1_1">
                <p id="popup_lab_cont2_head">Lab Test</p>
                <ol className="popup_lab_cont2_desc">
                  {maincategories.length ? (
                    maincategories.map((item, index) => {
                      return (
                        <li id="popup_lab_cont2_desc">
                          {item.category}
                          <span
                            id="lab_labtest_span_cross"
                            style={{ cursor: "pointer" }}
                            onClick={() => removecartproduct(item, index)}
                          >
                            <i class="far fa-times-circle"></i>
                          </span>
                        </li>
                      );
                    })
                  ) : (
                    <p>No any items</p>
                  )}
                </ol>
              </div>
            </div>
            <div className="pop_lab_cont3">
              <div className="pop_lab_cont3_3">
                <p id="popup_lab_cont1_head">Order Summary</p>
                <div className="popup_lab_cont3_desc">
                  <p id="popup_lab_cont3_desc">
                    Subtotal
                    <span id="popup_lab_cont1_span">
                      Rs {total ? <span>{total}</span> : "0"}
                    </span>
                  </p>
                  <p id="popup_lab_cont3_desc">
                    Service Charge <span id="popup_lab_cont1_span">0%</span>
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
                <a
                  className="popup_lab_close"
                  onClick={removepopup}
                  style={{ cursor: "pointer" }}
                >
                  <p>Back</p>
                </a>
                <a className="lab_popup_checkout" style={{ cursor: "pointer" }}>
                  <div onClick={() => handleCheckoutlabtest()}>
                    <p>Checkout</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (rootstore) => {
  return {
    addtocartsign: rootstore.cart.addtocartsignal,
    checkoutsignal: rootstore.cart.checkoutsignal,
    removeproductsign: rootstore.cart.removeproductsign,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeproduct: (params) => dispatch(removeproduct(params)),
    addtocartsignal: (params) => dispatch(addtocartsignal(params)),
    checkout: (params) => dispatch(checkout(params)),
    removeproductstatus: (params) => dispatch(removeproductstatus(params)),
  };
};

export const Checkoutpopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkoutpopupcomponent);
