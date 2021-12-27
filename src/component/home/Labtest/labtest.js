import Navbar from "../../Navbar/Navbar.js";
import labtest_img from "../../../assets/labtest1.png";
import labtest_img2 from "../../../assets/labtest2.png";
import { useEffect } from "react";
import "./labtest.css";
import { httpClient } from "../../../utils/httpClient.js";
import { notify } from "../../../services/notify.js";
import { useState } from "react";
const HomeLabtest = (props) => {
  let [labTestData, setlabTestData] = useState([])
  useEffect(() => {
    httpClient.GET("lab-test/get-all", false, true)
      .then(resp => {
        // console.log(resp.data.data)
        setlabTestData(resp.data.data)
      })
      .catch(err => {
        notify.error("soomething went wrong")
      })
  },[])
  return (
    <>
      <Navbar></Navbar>
      <div className="labtest">
        <div className="labtest1">
          <img src={labtest_img} />
          <p id="labtxt1">Lab Test</p>
          <p id="labtxt2">
            Get you test done at your home
            <br /> by our expert
          </p>
        </div>
        <div className="lab_content">
          <p id="lab_content_headtxt">Lab test that we offer</p>
          {
            labTestData.map((item, index) => {
              return <>
                <div className="lab_samp1">
                  <div className="lab_sam_img1">
                    <img src={labtest_img2} />
                  </div>
                  <div className="labtest_desc">
                    <p id="labtest_desc_txt1">{item.name}</p>
                    <p id="labtest_desc_txt2">What it include:</p>
                    <div className="labtest_desc1">
                      <div className="labtest_desc_detail">
                        <ul>
                          <li>Platate</li>
                          <li>CBC</li>
                          <li>HB</li>
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
                          <li>Platelets</li>
                          <li>Reticilocytes</li>
                          <li>Blood Grouping Rh type</li>
                        </ul>
                      </div>
                      <div>
                        <ul id="lab_test_detail">
                          <li>Peripheral Smear</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="lab_test_price">
                    <p>Rs.{item.price}</p>
                  </div>
                </div>

              </>

            })
          }


        </div>
        <div className="lab_buttons_select">
          <div className="lab_buttons_select1">
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
    </>
  );
};

export default HomeLabtest;
