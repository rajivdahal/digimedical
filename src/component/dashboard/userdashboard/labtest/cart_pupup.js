import React from "react";
import "./cart_popup.css";

import { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { cartpopupsignal } from "../../../../actions/cart.ac";
import { removeproductstatus } from "../../../../actions/cart.ac";

class Cartpopupcomponent extends Component {
  render() {
    let { removeproductstatus, removeproductsign } = this.props;
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log("cart items arfter pop up is", cart);
    const removemappedproduct = (toremoveitemcategory) => {
      if (cart) {
        cart.labs.map((item, index) => {
          if (item[0].category == toremoveitemcategory) {
            cart.labs.splice(index, 1);
            cart.cartvalue = cart.cartvalue - 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            this.props.removeproductstatus(!removeproductsign);
          }

          // console.log("inside mapper")
          // if (index == toremoveindex) {
          //     cart.cartvalue = cart.cartvalue - 1
          //     cart.labs.splice(index, 1)
          //     localStorage.setItem("cart", JSON.stringify(cart))
          //     this.props.removeproductstatus(!removeproductsign)
          // }
        });
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
            subcategoryarray.category = item.category;
            subcategories.push(item.subcategoryname);
          } else {
            subcategories.push(item.subcategoryname);
          }
          if (index == mainarray.length - 1) {
            subcategoryarray.subcategories = subcategories;
            maincategories.push(subcategoryarray);
          }
        });
      });

      // [{
      //         maincategory: category,
      //         subcategories: [sdnj, fkas]
      //     }]
    }
    // {"cartvalue":2,"labs":[[{"price":"100","labId":4,"medicalInstituteId":1,"medicalname":"institute1","category":"labtest2`","subcategoryname":"lab4"},{"price":"1000","labId":1,"medicalInstituteId":2,"medicalname":"institute2","category":"labtest2`","subcategoryname":"lab1"}],[{"price":"1400","labId":2,"medicalInstituteId":2,"medicalname":"institute2","category":"labtest1","subcategoryname":"lab2"}]]}
    return (
      <>
        <div>
          <div id="popup1_carts">
            <div className="popup_carts">
              <div className="pop_carts_cont">
                <div className="pop_carts_cont1">
                  <div className="popup_carts_cont1_head">
                    <p id="popup_carts_cont1_head">Lab Test</p>
                  </div>
                  <ol className="popup_carts_cont1_desc">
                    {maincategories.length ? (
                      maincategories.map((item, index) => {
                        return (
                          <li id="popup_carts_cont1_desc" key={index}>
                            <div>
                              <span>{item.category}</span>
                              <span
                                id="carts_labtest_span_cross"
                                onClick={() =>
                                  removemappedproduct(item.category)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <i class="far fa-times-circle"></i>
                              </span>
                            </div>
                            <ul>
                              {item.subcategories.map((item) => {
                                return <li>{item}</li>;
                              })}
                            </ul>
                          </li>
                        );
                      })
                    ) : (
                      <p>No any items to show</p>
                    )}
                  </ol>
                </div>
                <a class="close" href="#"></a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (rootstore) => {
  return {
    removeproductsign: rootstore.cart.removeproductsign,
    cartpopupsign: rootstore.cart.cartpopupsign,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeproductstatus: (params) => dispatch(removeproductstatus(params)),
    cartpopupsignal: (params) => dispatch(cartpopupsignal(params)),
  };
};

export const Cartpopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cartpopupcomponent);
