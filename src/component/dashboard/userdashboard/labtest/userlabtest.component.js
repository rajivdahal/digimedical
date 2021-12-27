import React from "react";
import "./userdashboard.component.css";
import labtest_img2 from "../../../../assets/labtest2.png";

export default function Userlabtest() {
  return (
    <div className="lab_add_to_cart">
      <div className="lab_add_to_cart1">
        <div className="lab_add_to_cart_top">
          <div>
            <p id="lab_your_cart">Your Cart</p>
          </div>
          <div className="lab_add_to_cart_cart">
            <div>
              <p>0</p>
              <div>
                <i class="fas fa-shopping-cart"></i>
              </div>
            </div>
          </div>
          <div className="lab_add_to_cart_checkout">
            <div>
              <p>Checkout</p>
            </div>
          </div>
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
