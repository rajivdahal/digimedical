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
      console.log("to remove is", toremoveitemcategory);
      if (cart) {
        cart.labs.map((item, index) => {
          if (item[0].mainCategoryName == toremoveitemcategory) {
            cart.labs.splice(index, 1);
            cart.cartvalue = cart.cartvalue - 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            this.props.removeproductstatus(!removeproductsign);
          }
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
            subcategoryarray.category = item.mainCategoryName;
            subcategories.push(item.labcategoryname);
          } else {
            subcategories.push(item.labcategoryname);
          }
          if (index == mainarray.length - 1) {
            subcategoryarray.subcategories = subcategories;
            maincategories.push(subcategoryarray);
          }
        });
      });
    }
    console.log("main category iss", maincategories);
    return (
      <>
        <div>
          <div id="popup1_carts">
            <div className="popup_carts">
              <div className="pop_carts_cont">
                <div className="pop_carts_cont1">
                  <div className="popup_carts_cont1_head">
                    <p id="popup_carts_cont1_head">Lab Test</p>
                    <a
                      className="cross_lcart"
                      href="#"
                      style={{ cursor: "pointer" }}
                    >
                      <i class="far fa-times-circle"></i>
                    </a>
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
