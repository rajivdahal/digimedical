import React, { Component } from "react";
import { connect } from "react-redux";
import { addtocart, cartpopup } from "../../../../actions/cart.ac";
import { fetchlabtest } from "../../../../actions/cart.ac";
import "./userdashboard.component.css";
import { setlabtest } from "../../../../actions/cart.ac";
import { settemptotal } from "../../../../actions/cart.ac";
import { resetcheckbox } from "../../../../actions/cart.ac";
import { addtocartsignal } from "../../../../actions/cart.ac";
import { checkout } from "../../../../actions/cart.ac";
import { Checkoutpopup } from "./lab_popup";
import { Cartpopup } from "./cart_pupup";
import { cartpopupsignal } from "../../../../actions/cart.ac";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
class userlabtestcomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activecheckbox: [],
      subcategorydata: [],
      totalprice: 0,
      checkeditems: [],
      issubcategoryloading: false,

    };
  }

  componentDidMount = () => {
    this.props.fetchlabtest();
  };
  render() {
    let total = 0;
    console.log("props in labtest are", this.props);
    let {
      allabtest,
      cartitems,
      cartvalue,
      tempdata,
      addtocartsign,
      checkoutsignal,
      cartpopupsign,
      cartpopupsignal,
    } = this.props;
    console.log("cartpopup signal is", cartpopupsign);
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    const addtocart = (item) => {
      let addtocartdataitems = this.state.checkeditems

      console.log("add to cart items are", addtocartdataitems);
      // console.log("checked data are", this.state.subcategorydata)
      // let finaldatachild = {}
      // finaldatachild.testname = item.name



      // let finaldata=this.state.subcategorydata.map((item,index)=>{
      //   let arr=[]
      //   arr
      // }
      this.props.addtocart(addtocartdataitems);
      notify.success("Added to cart");
    };

    const assignisactive = (item, index) => {
      let newallabtest = allabtest.map((item, indexoflabtest) => {
        if (index == indexoflabtest) {
          item.isactiveclass = true;
        } else {
          item.isactiveclass = false;
        }
        return item;
      });
      // console.log("new mappedlabtest is", newallabtest)
      this.props.setlabtest(newallabtest);
    };
    const handlecheckboxchange = (e, category, subcategory) => {
      console.log(
        "checked is",
        e.target.checked,
        category,
        subcategory
      );
      if (e.target.checked) {
        let chbbox=this.state.activecheckbox
        chbbox.push(subcategory.id)
        console.log("activecheckbox is?????????????????",chbbox)
        this.setState((prevstate) => {
          return {
            ...prevstate,
            activecheckbox:chbbox
          }
          })
        httpClient.GET(`medical-institute/categoryId/${subcategory.id}`, false, true)
          .then(resp => {
            this.setState(() => {
              return {
                issubcategoryloading: true
              }
            })
            let subcat = {}
            subcat.subcategoryid = subcategory.id
            subcat.data = resp.data.data
            let hit = false
            this.state.subcategorydata.map((item, index) => {
              console.log("item,subcategory is", item.subcategoryid, "and real subcategory is", subcategory.id)
              if (item.subcategoryid === subcategory.id) {
                hit = true
                return
              }
            })
            if (!hit) {
              let subcatdata=this.state.subcategorydata
              subcatdata.push(subcat)
              this.setState((prevstate) => {
                return {
                  ...prevstate,
                  subcategorydata: subcatdata
                }
              })
            }

          })
          .catch(err => {
            this.setState(() => {
              return {
                issubcategoryloading: true
              }

            })
            console.log("some error occurred", err.response)
          })
          .finally(() => {
            this.setState(() => {
              return {
                issubcategoryloading: false
              }
            })
          })
      }
      else {
        this.state.activecheckbox.pop(subcategory.id)
        let checkeddata=this.state.checkeditems
        checkeddata.map((item,index)=>{
          if(subcategory.id===item.labId){
            console.log("inside if")
            checkeddata.splice(index,1)
          }
        })
        this.setState((prevstate) => {
          return {
            ...prevstate,
            checkeditems:checkeddata 
          }
        })
        setTimeout(() => {
          console.log("subcaategory data",subcategory.id)
          console.log("checked data",checkeddata)
          console.log("checked items are",this.state.checkeditems)
        }, 2000);

        this.setState((prevstate) => {
          return {
            ...prevstate,
            activecheckbox: [...prevstate.activecheckbox]
          }
        })
      }
    };
    const handleCheckout = () => {
      this.props.checkout(!checkoutsignal);
      if (this.state.active) {
        this.setState(() => {
          return {
            active: false
          }
        })
      }
      console.log("checkout called");
    };
    const showcartpopup = (sign) => {
      this.setState(() => {
        return {
          active: !this.state.active,
        };
      });
    };
    const handleinstitutechange = (e, item, subcategory, category,index) => {
    
      let total = this.state.totalprice
      let checkedlist = {}
      if (e.target.checked) {
        item.checked = true
        checkedlist.name = category.name
        checkedlist.subcategory = subcategory.categoryname
        checkedlist.company = item.medicalinstitutename
        checkedlist.price = item.price
        checkedlist.labId = subcategory.id
        checkedlist.medicalInstituteId = item.id
        total =parseInt(item.price)
        this.setState((prev) => {
          return {
            ...prev,
            totalprice: total,
            checkeditems: [...prev.checkeditems, checkedlist]
          }
        })
        setTimeout(() => {
          console.log("this state is", item, this.state.checkeditems)
        }, 2000)
      }


      // else {
      //   this.state.checkeditems.map((stateitem, index) => {
      //     console.log("inside map")
      //     if (stateitem.medicalInstituteId == item.id) {
      //       console.log("inside if")
      //       let newstate = this.state.checkeditems
      //       newstate.splice(index, 1)
      //       this.setState((prev) => {
      //         return {
      //           ...prev,
      //           checkeditems: newstate
      //         }
      //       })
      //       setTimeout(() => {
      //         console.log("this state is", this.state.checkeditems)
      //       }, 2000)
      //     }
      //   })

      //   total = total - parseInt(item.price)
      //   this.setState((prev) => {
      //     return {
      //       ...prev,
      //       totalprice: total
      //     }
      //   })
      // }
      console.log("e,item is", e, item)
    }
    return (
      <div>
        {checkoutsignal ? <Checkoutpopup /> : null}
        {this.state.active ? <Cartpopup></Cartpopup> : null}
        <div className="lab_add_to_cart">
          <div className="lab_add_to_cart1">
            <div className="lab_add_to_cart_top">
              <div className="lab_add_to_cart_ltwo">
                {" "}
                <p></p>
                Lab Test We Offer
              </div>
              <div className="lab_add_to_cart_ycarts">
                <div>
                  <p id="lab_your_cart">Your Cart</p>
                </div>
                <div
                  className="lab_add_to_cart_cart"
                  onClick={showcartpopup}
                  style={{ cursor: "pointer" }}
                >
                  <div className="cart-value">
                    <p>{cart ? cart.cartvalue : "0"}</p>
                    <div>
                      <i class="fas fa-shopping-cart"></i>
                    </div>
                  </div>
                </div>
                <div className="lab_add_to_cart_checkout">
                  <div onClick={handleCheckout} style={{ cursor: "pointer" }}>
                    <p>Checkout</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lab_add_to_cart_samp">
              {allabtest.map((item, index) => {
                return (
                  <div
                    className={
                      item.isactiveclass
                        ? "active_lab_add_to_cart_samp1"
                        : "lab_add_to_cart_samp1"
                    }
                    key={index}
                    onClick={() => assignisactive(item, index)}
                  >
                    <div className="lab_add_to_cart_samp_img1">
                      <img
                        src={
                          REACT_APP_BASE_URL + "lab-test/download/" + item.id
                        }
                        alt={item.name}
                      />
                    </div>
                    <div className="lab_add_to_cart_test_desc">
                      <p>{item.isactive}</p>
                      <p id="labtest_desc_txt1">{item.name}</p>
                      <p id="labtest_desc_txt2">What it include :</p>
                      <div className="labtest_desc1">
                        <div className="labtest_desc_detail">
                          {item.isactiveclass ? (
                            <form id="lab_test_detail">
                              {item.subcategory.map(
                                (subcategory, subcategoryindex) => {
                                  return (
                                    <div key={subcategoryindex}>
                                      <input type={"checkbox"} name={subcategory.categoryname} onChange={(e) => handlecheckboxchange(e, item, subcategory)} />
                                      <label htmlFor={subcategory.categoryname}>
                                        {subcategory.categoryname}
                                      </label>
                                      <br />
                                      {
                                        this.state.activecheckbox.includes(subcategory.id) ?
                                          !this.state.issubcategoryloading?
                                            this.state.subcategorydata.map((subcategoryitem, index) => {
                                              if (subcategoryitem.subcategoryid === subcategory.id) {
                                                return subcategoryitem.data.map((medicalInstitute, index) => {
                                                  return <div className={"medical-institute-name"}>
                                                    <input type={"checkbox"} name="check" onChange={(e) => handleinstitutechange(e, medicalInstitute, subcategory, item,index)} 
                                                    />
                                                    <label htmlFor={"check"}>
                                                      {medicalInstitute.medicalinstitutename}
                                                    </label>
                                                    <span style={{ marginLeft: "2rem", color: "blue" }}>Rs. {medicalInstitute.price}</span>
                                                    <br />
                                                  </div>
                                                })
                                              }
                                            }) :
                                            <p>Loading...</p> :
                                          null
                                      }
                                    </div>
                                  );
                                }
                              )}
                            </form>
                          ) : (
                            <ul id="lab_test_detail">
                              {item.subcategory.map((item, index) => {
                                return (
                                  <>
                                    <li>{item.categoryname}</li>
                                  </>
                                );
                              }
                              )}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {
                      item.isactiveclass ?
                        <div className="lab_add_to_cart_price">
                          {/* {tempdata.totalamount ? (
                        <p>Rs.{tempdata.totalamount}</p>
                      ) : (
                        item.subcategory.map((subcategory, index) => {
                          //console.log("subcategory is", subcategory)
                          total = total + parseInt(subcategory.price);
                          // console.log("total is", total)
                          if (index == item.subcategory.length - 1) {
                            return (
                              <>
                                <p>Rs.{total}</p>
                                <div style={{ display: "none" }}>
                                  {(total = 0)}
                                </div>
                              </>
                            );
                          }
                        })
                      )} */}
                          {
                            <p> Rs. {this.state.totalprice} </p>
                          }
                          <div className="lab_add_to_cart_atc">
                            {addtocartsign ? (
                              <button onClick={() => addtocart(item)}>
                                <p>Add to Cart</p>
                              </button>
                            ) : (
                              <button>Please choose</button>
                            )}
                          </div>
                        </div> : <h3>Choose any one subcategory package</h3>
                    }
                  </div>
                );
              })}
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
    );
  }
}

const mapStateToProps = (rootstore) => {
  return {
    cartitems: rootstore.cart.cartitems,
    allabtest: rootstore.cart.allabtest,
    cartvalue: rootstore.cart.cartvalue,
    tempdata: rootstore.cart.tempdata,
    addtocartsign: rootstore.cart.addtocartsignal,
    checkoutsignal: rootstore.cart.checkoutsignal,
    cartpopupsign: rootstore.cart.cartpopupsign,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addtocart: (params) => dispatch(addtocart(params)),
    fetchlabtest: (params) => dispatch(fetchlabtest(params)),
    setlabtest: (params) => dispatch(setlabtest(params)),
    settemptotal: (params) => dispatch(settemptotal(params)),
    resetcheckbox: (params) => dispatch(resetcheckbox(params)),
    addtocartsignal: (params) => dispatch(addtocartsignal(params)),
    checkout: (params) => dispatch(checkout(params)),
    cartpopupsignal: (params) => dispatch(cartpopupsignal(params)),
  };
};

export const Userlabtest = connect(
  mapStateToProps,
  mapDispatchToProps
)(userlabtestcomponent);
