import React from "react";
import "./userdashboard.component.css";
import labtest_img2 from "../../../../assets/labtest2.png";
import popup from "./lab_popup";

export default function Userlabtest() {
  return (
    <div className="lab_add_to_cart">
      <div className="lab_add_to_cart1">
        <div className="lab_add_to_cart_top">
          <div className="lab_add_lttwo">
            {" "}
            <p id="lab_add_lttwo">Lab test that we offer</p>
          </div>
          <div className="lab_add_to_boxes">
            {" "}
            <div>
              <p id="lab_your_cart">Your Cart</p>
            </div>
            <div className="lab_add_to_cart_box">
              <a className="lab_add_to_cart_cart" href="#popup1_carts">
                <div>
                  <p>0</p>
                  <div>
                    <i class="fas fa-shopping-cart"></i>
                  </div>
                </div>
              </a>

              <div id="popup1_carts" className="overlay_carts">
                <div className="popup_carts">
                  <h1>Hello</h1>
                  <a class="close_carts" href="#">
                    &times;
                  </a>
                </div>
              </div>
            </div>
            <a href="#pop_checkout" className="lab_add_to_cart_checkout">
              <div>
                <p>Checkout</p>
              </div>
            </a>
          </div>

          {/* popup checkout */}

          <div id="pop_checkout" className="overlay_lab1">
            <div className="popup_lab">
              <div className="popup_lab1">
                <div className="pop_lab_cont1">
                  <div className="pop_lab_cont1_1">
                    <p id="popup_lab_cont1_head">Order Details</p>
                    <div>
                      <p id="popup_lab_cont1_desc">
                        Order Created
                        <span id="popup_lab_cont1_span">
                          Tue, Janauary 9, 2021
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pop_lab_cont2">
                  <div className="pop_lab_cont1_1">
                    <p id="popup_lab_cont2_head">Lab Test</p>
                    <ol className="popup_lab_cont2_desc">
                      <li id="popup_lab_cont3_desc">
                        Heamatology / Blood Related Test{" "}
                        <span id="lab_labtest_span_cross">
                          <p>&times;</p>
                        </span>
                      </li>
                      <li id="popup_lab_cont3_desc">
                        Widal Test{" "}
                        <span id="lab_labtest_span_cross">
                          <p>&times;</p>
                        </span>
                      </li>
                      <li id="popup_lab_cont3_desc">
                        Liver Function Test{" "}
                        <span id="lab_labtest_span_cross">
                          <p>&times;</p>
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="pop_lab_cont3">
                  <div className="pop_lab_cont3_3">
                    <p id="popup_lab_cont1_head">Order Summary</p>
                    <div className="popup_lab_cont3_desc">
                      <p id="popup_lab_cont3_desc">
                        Subtotal{" "}
                        <span id="popup_lab_cont1_span">Rs 648.00</span>
                      </p>
                      <p id="popup_lab_cont3_desc">
                        Service Charge{" "}
                        <span id="popup_lab_cont1_span">10%</span>
                      </p>
                      <p id="popup_lab_cont3_desc">
                        Discount <span id="popup_lab_cont1_span">10%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pop_lab_cont4">
                  <p id="popup_lab_cont4_head">
                    Grand Total <span id="popup_lab_cont1_span">Rs 580.00</span>
                  </p>
                  <div className="popup_lab_cont4_foot">
                    <a href="#" className="popup_lab_close">
                      <p>Back</p>
                    </a>
                    <a href="#" className="lab_popup_checkout">
                      <div>
                        <p>Checkout</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for main code */}
        </div>
        <div className="lab_add_to_cart_samp">
          <div className="lab_add_to_cart_samp1">
            <div className="lab_add_to_cart_samp_img1">
              <img src={labtest_img2} />
            </div>
            <div className="lab_add_to_cart_test_desc">
              <p id="labtest_desc_txt1">Heamatology / Blood Related Test</p>
              <p id="labtest_desc_txt2">What it include :</p>
              <div className="labtest_desc1">
                <div className="labtest_desc_detail">
                  <ul>
                    <li>Platate</li>
                    <li>CBC</li>
                    <li>HB</li>
                  </ul>
                </div>

                <div>
                  <ul id="lab_test_detail">
                    <li>PCV</li>
                    <li>WBC/TLC</li>
                    <li>WBC/TLC</li>
                  </ul>
                </div>
                <div>
                  <ul id="lab_test_detail">
                    <li>DLC</li>
                    <li>RBC</li>
                    <li>ESR</li>
                  </ul>
                </div>
                <div>
                  <ul id="lab_test_detail">
                    <li>Platelets</li>
                    <li>Reticilocytes</li>
                    <li>Blood Grouping Rh type</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lab_add_to_cart_price">
              <p>Rs. 2,000</p>
              <div className="lab_add_to_cart_atc">
                <button>
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
          </div>
          <div className="lab_add_to_cart_samp1">
            <div className="lab_add_to_cart_samp_img1">
              <img src={labtest_img2} />
            </div>
            <div className="lab_add_to_cart_test_desc">
              <p id="labtest_desc_txt1">Heamatology / Blood Related Test</p>
              <p id="labtest_desc_txt2">What it include :</p>
              <div className="labtest_desc1">
                <div className="labtest_desc_detail">
                  <ul>
                    <li>Platate</li>
                    <li>CBC</li>
                    <li>HB</li>
                  </ul>
                </div>

                <div>
                  <ul id="lab_test_detail">
                    <li>PCV</li>
                    <li>WBC/TLC</li>
                    <li>WBC/TLC</li>
                  </ul>
                </div>
                <div>
                  <ul id="lab_test_detail">
                    <li>DLC</li>
                    <li>RBC</li>
                    <li>ESR</li>
                  </ul>
                </div>
                <div>
                  <ul id="lab_test_detail">
                    <li>Platelets</li>
                    <li>Reticilocytes</li>
                    <li>Blood Grouping Rh type</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lab_add_to_cart_price">
              <p>Rs. 2,000</p>
              <div className="lab_add_to_cart_atc">
                <button>
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
          </div>
          <div className="lab_add_to_cart_samp1">
            <div className="lab_add_to_cart_samp_img1">
              <img src={labtest_img2} />
            </div>
            <div className="lab_add_to_cart_test_desc">
              <p id="labtest_desc_txt1">Heamatology / Blood Related Test</p>
              <p id="labtest_desc_txt2">What it include :</p>
              <div className="labtest_desc1">
                <div className="labtest_desc_detail">
                  <ul>
                    <li>Platate</li>
                    <li>CBC</li>
                    <li>HB</li>
                  </ul>
                </div>

                <div>
                  <ul id="lab_test_detail">
                    <li>PCV</li>
                    <li>WBC/TLC</li>
                    <li>WBC/TLC</li>
                  </ul>
                </div>
                <div>
                  <ul id="lab_test_detail">
                    <li>DLC</li>
                    <li>RBC</li>
                    <li>ESR</li>
                  </ul>
                </div>
                <div>
                  <ul id="lab_test_detail">
                    <li>Platelets</li>
                    <li>Reticilocytes</li>
                    <li>Blood Grouping Rh type</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lab_add_to_cart_price">
              <p>Rs. 2,000</p>
              <div className="lab_add_to_cart_atc">
                <button>
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
          </div>
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
  );
}
