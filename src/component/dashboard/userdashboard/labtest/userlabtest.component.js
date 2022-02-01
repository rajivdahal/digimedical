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
      datas: [],
      totaltoshow: [],
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
      checkoutsignal,
      cartpopupsign,
    } = this.props;

    console.log("cartpopup signal is", cartpopupsign);
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;
    const addtocart = (item) => {
      let totalamount = this.state.totaltoshow;
      let finaldata = totalamount.map((item, index) => {
        let dummyobj = {};
        dummyobj.price = item.price;
        dummyobj.labId = item.subcategoryId;
        dummyobj.medicalInstituteId = item.medicalId;
        dummyobj.medicalname = item.medicalname;
        dummyobj.category = item.category;
        dummyobj.subcategoryname = item.subcategoryname;
        return dummyobj;
      });
      this.props.addtocart(finaldata);
    };

    const assignisactive = (e, arg, argindex) => {
      if (arg.isactiveclass && e.detail == 2) {
        let newallabtest = allabtest.map((item, indexoflabtest) => {
          item.isactiveclass = false;
          this.setState((prev) => {
            return {
              ...prev,
              totaltoshow: [],
              datas: [],
            };
          });
          return item;
        });
        console.log("new mappedlabtest is", newallabtest);
        this.props.setlabtest(newallabtest);
        return;
      }
      if (arg.isactiveclass && e.detail == 1) {
        console.log("single click occurred");
        return;
      } else {
        let newallabtest = allabtest.map((item, index) => {
          if (argindex == index) {
            item.isactiveclass = true;
            this.setState((prev) => {
              return {
                ...prev,
                totaltoshow: [],
                datas: [],
              };
            });
          } else {
            item.isactiveclass = false;
          }
          return item;
        });
        this.props.setlabtest(newallabtest);
      }
    };

    const handleCheckout = () => {
      this.props.checkout(!checkoutsignal);
      if (this.state.active) {
        this.setState(() => {
          return {
            active: false,
          };
        });
      }
    };
    const showcartpopup = (sign) => {
      this.setState(() => {
        return {
          active: !this.state.active,
        };
      });
    };
    const handleinstitutechange = (e, item, subcategory, category, index) => {
      let total = this.state.totalprice;
      let checkedlist = {};
      if (e.target.checked) {
        item.checked = true;
        checkedlist.name = category.name;
        checkedlist.subcategory = subcategory.categoryname;
        checkedlist.company = item.medicalinstitutename;
        checkedlist.price = item.price;
        checkedlist.labId = subcategory.id;
        checkedlist.medicalInstituteId = item.id;
        total = parseInt(item.price);
        this.setState((prev) => {
          return {
            ...prev,
            totalprice: total,
            checkeditems: [...prev.checkeditems, checkedlist],
          };
        });
        setTimeout(() => {
          console.log("this state is", item, this.state.checkeditems);
        }, 2000);
      }
      console.log("e,item is", e, item);
    };
    const handleChange = (e, item, index) => {
      console.log("checked is", e.target.checked, item);
      if (e.target.checked) {
        httpClient
          .GET(`medical-institute/categoryId/${item.id}`, false, true)
          .then((resp) => {
            let dummydata = this.state.datas;
            let dummyobj = {};
            dummyobj.name = item.categoryname;
            dummyobj.data = resp.data.data;
            dummydata.push(dummyobj);
            this.setState((prev) => {
              return {
                ...prev,
                datas: dummydata,
              };
            });
            setTimeout(() => {
              console.log(this.state.datas);
            }, 2000);

            console.log("response is", resp.data.data);
          })
          .catch(() => {
            notify.error("Error occurred");
          });
      } else {
        console.log("inside else statement", item);
        let dummydata = this.state.datas;
        let totalamount = this.state.totaltoshow;
        dummydata.map((data, index) => {
          console.log(data, index);
          if (data.name == item.categoryname) {
            console.log("inside splicaing of dummy data else");
            dummydata.splice(index, 1);
          }
        });
        totalamount.map((totalitem, totalindex) => {
          console.log("totalitem", totalitem);
          if (totalitem.subcategoryId == item.id) {
            totalamount.splice(totalindex, 1);
          }
        });
        this.setState((prev) => {
          return {
            ...prev,
            datas: dummydata,
            totaltoshow: totalamount,
          };
        });
      }
      setTimeout(() => {
        console.log("total item is", this.state.totaltoshow);
      }, 2000);
    };
    const handleRadioChange = (item, index, subcategory, category) => {
      console.log("inside radiochange");
      console.log("dasdas", item, index, subcategory);
      let datatopush = {};
      datatopush.category = category.name;
      datatopush.subcategoryId = subcategory.id;
      datatopush.subcategoryname = subcategory.categoryname;
      datatopush.medicalname = item.medicalinstitutename;
      datatopush.medicalId = item.id;
      datatopush.price = item.price;
      let statetotalarray = this.state.totaltoshow;
      if (!statetotalarray.length) {
        console.log("inside if");
        statetotalarray.push(datatopush);
      } else {
        statetotalarray.map((totalitem, totalindex) => {
          console.log("inside else", totalitem.subcategoryId, subcategory.id);
          if (
            totalitem.subcategoryId != subcategory.id &&
            totalitem.medicalId != item.id
          ) {
            console.log("inside first if");
            console.log(
              "totalitem length  and index is",
              totalitem.length,
              totalindex
            );
            if (totalindex === statetotalarray.length - 1) {
              statetotalarray.push(datatopush);
            }
          }
          if (
            totalitem.subcategoryId != subcategory.id &&
            totalitem.medicalId == item.id
          ) {
            console.log("inside second if");
            if (totalindex === statetotalarray.length - 1) {
              statetotalarray.push(datatopush);
            }
          }
          if (
            totalitem.subcategoryId == subcategory.id &&
            totalitem.medicalId != item.id
          ) {
            console.log("inside third-if");
            statetotalarray.splice(totalindex, 1);
            statetotalarray.push(datatopush);
          }
          if (
            totalitem.subcategoryId == subcategory.id &&
            totalitem.medicalId == item.id
          ) {
            console.log("inside fouth-if");
            statetotalarray.splice(totalindex, 1);
            statetotalarray.push(datatopush);
          }
        });
      }
      this.setState((prev) => {
        return {
          ...prev,
          totaltoshow: statetotalarray,
        };
      });
      setTimeout(() => {
        console.log("total is", this.state.totaltoshow);
      }, 2000);
    };
    const fetchAllDetails=(value)=>{
      console.log("value is",value)
    }
    return (
      <div className=" main_div_user_lab">
        {checkoutsignal ? <Checkoutpopup props={this.props.history} /> : null}
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
              {allabtest.map((category, index) => {
                return (
                  <div
                    className={
                      category.isactiveclass
                        ? "active_lab_add_to_cart_samp1"
                        : "lab_add_to_cart_samp1"
                    }
                    key={index}
                    onClick={(e) => assignisactive(e, category, index)}
                    ondblclick
                  >
                    <div className="lab_add_to_cart_samp_img1">
                      <img
                        src={
                          REACT_APP_BASE_URL +
                          "lab-test/download/" +
                          category.id
                        }
                        alt={category.name}
                      />
                    </div>
                    <div className="lab_add_to_cart_test_desc">
                      <p>{category.isactive}</p>
                      <p id="labtest_desc_txt1">{category.name}</p>
                      <p id="labtest_desc_txt2">What it include :</p>
                      <div className="labtest_desc1">
                        <div className="labtest_desc_detail">
                          <ul className="ul_labtest_dash">
                            {
                              category.subcategory.map((subCategory,subcategoryIndex)=>{
                                return <li>&nbsp; {subCategory.categoryname}</li>
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="lab_samp_sel" onClick={fetchAllDetails(category)}>
                      <a href="#choose_the_ltest" className="lab_samp_sel1">
                        Select
                      </a>
                    </div>
                    <div id="choose_the_ltest" className="ctlt_popup">
                      <div className="ctlt_popup_cont">
                        <div className="ctlt_head">
                          <div className="ctlt_head1">
                            <h3>Blood Test</h3>
                          </div>

                          <a class="close_ctlt" href="#">
                            <i class="far fa-times-circle"></i>
                          </a>
                        </div>

                        <div className="ctlt_institute">
                          <p>Please select the lab.</p>
                          <div className="ctlt_institute1">
                            <div className="ctlt_institute_radio">
                              <input
                                type="radio"
                                id="institute"
                                name="fav_language"
                                value="institute"
                              />
                              <label for="html">&nbsp; Institute1</label>
                            </div>
                            <div className="ctlt_institute_radio">
                              <input
                                type="radio"
                                id="institute"
                                name="fav_language"
                                value="institute"
                              />
                              <label for="html">&nbsp; Institute1</label>
                            </div>
                            <div className="ctlt_institute_radio">
                              <input
                                type="radio"
                                id="institute"
                                name="fav_language"
                                value="institute"
                              />
                              <label for="html">&nbsp; Institute1</label>
                            </div>
                          </div>
                        </div>
                        <div className="ctlt_labtest">
                          <p>What it include:</p>
                          <div>
                            <div className="ctlt_institute_radio">
                              <input
                                type="checkbox"
                                id="selectall"
                                name="fav_language"
                                value="allsel"
                              />
                              <label for="html">&nbsp; Select all</label>
                            </div>
                            <div className="ctlt_checklt">
                              <div>
                                {" "}
                                <input
                                  type="checkbox"
                                  id="labtest"
                                  name="fav_language"
                                  value="labtest1"
                                />
                                <label for="html">&nbsp; labtest1</label>
                              </div>
                              <div className="lt_price">Rs.200</div>
                            </div>
                            <div className="ctlt_checklt">
                              <div>
                                {" "}
                                <input
                                  type="checkbox"
                                  id="labtest"
                                  name="fav_language"
                                  value="labtest1"
                                />
                                <label for="html">&nbsp; labtest1</label>
                              </div>
                              <div className="lt_price">Rs.200</div>
                            </div>
                            <div className="ctlt_checklt">
                              <div>
                                {" "}
                                <input
                                  type="checkbox"
                                  id="labtest"
                                  name="fav_language"
                                  value="labtest1"
                                />
                                <label for="html">&nbsp; labtest1</label>
                              </div>
                              <div className="lt_price">Rs.200</div>
                            </div>
                            <div className="ctlt_checklt">
                              <div>
                                {" "}
                                <input
                                  type="checkbox"
                                  id="labtest"
                                  name="fav_language"
                                  value="labtest1"
                                />
                                <label for="html">&nbsp; labtest1</label>
                              </div>
                              <div className="lt_price">Rs.200</div>
                            </div>
                            <div className="ctlt_checklt">
                              <div>
                                {" "}
                                <input
                                  type="checkbox"
                                  id="labtest"
                                  name="fav_language"
                                  value="labtest1"
                                />
                                <label for="html">&nbsp; labtest1</label>
                              </div>
                              <div className="lt_price">Rs.200</div>
                            </div>
                          </div>
                          <div className="ctlt_total_price">
                            <p>
                              {" "}
                              Your total : <span id="rupees_ctlt">Rs 200</span>
                            </p>
                            <button className="ctlt_atc_but">
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
