import Navbar from "../../Navbar/Navbar.js";
import labtest_img from "../../../assets/labtest1.png";
import labtest_img2 from "../../../assets/labtest2.png";
import { useEffect } from "react";
import "./labtest.css";
import { httpClient } from "../../../utils/httpClient.js";
import { notify } from "../../../services/notify.js";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;


const HomeLabtest = (props) => {
  let [labTestData, setlabTestData] = useState([])
  let history = useHistory()
  useEffect(() => {
    httpClient.GET("labtest/category/get", false, false)
      .then(resp => {
        // console.log(resp.data.data)
        setlabTestData(resp.data.data)
      })
      .catch(err => {
        notify.error("Something went wrong")
      })
  }, [])
  const redirectlogin = () => {

    history.push("/dashboard/lab-test")
  }
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
            labTestData.length ?
              labTestData.map((item, index) => {
                return <>
                  <div className="lab_samp1" onClick={redirectlogin}>
                    <div className="lab_sam_img1">
                      <img
                        src={
                          REACT_APP_BASE_URL + "lab-test/download/" + item.id
                        }
                        alt={item.name}
                      />
                    </div>
                    <div className="labtest_desc">
                      <p id="labtest_desc_txt1">{item.name}</p>
                      <p id="labtest_desc_txt2">What it include:</p>
                      <div className="labtest_desc1">
                        <div className="labtest_desc_detail">
                          <ul>
                            {
                              item.subcategory.map((item, index) => {
                                return <li>{item.categoryname}</li>
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <div className="lab_test_price">
                      <p>Rs.{item.price}</p>
                    </div> */}
                  </div>

                </>

              }) : <div>No any lab test are provided this time</div>
          }


        </div>
        {
          labTestData.length ? <>
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
          </> : null
        }

      </div>
    </>
  );
};

export default HomeLabtest;
