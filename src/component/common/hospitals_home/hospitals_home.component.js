import React from "react";
import { Link } from "react-router-dom";
import hospital1 from "../../../assets/hospital1.png";
import "./hospitals_home.component.css";
import { useEffect, useState } from "react";
import { httpClient } from "../../../utils/httpClient";
export default function Hospitalshome() {
  let [hospitals, sethospitals] = useState([])
  useEffect(() => {
    httpClient.GET("hospital/get-all")
      .then(resp => {
        sethospitals(resp.data.data)
      })
  }, [])
  return (
    <div className="hosp_hom_cont">
      <div className="hosp_hom_head">
        <p>Get appointment at hospital of your choice.</p>
        <h1>Book an Appointment at Hospital</h1>
      </div>
      <div className="hospital_book_card">
        <div className="hospital_book_card1">
          <img src={hospital1} alt="" />
          <div className="hospital_card_text">
            <h1>B.P Koirala Institute of Health Science</h1>
            <p2>Dharan, Nepal</p2>

            <button id="hosp_card_but_hom">Book an appointment</button>
          </div>
        </div>
        {
          hospitals.length ? hospitals.map((item, index) => {
            if (index < 3)
              return <div className="hospital_book_card1">
                <img src={hospital1} alt="" />
                <div className="hospital_card_text">
                  <h1>B.P Koirala Institute of Health Science</h1>
                  <p2>Dharan, Nepal</p2>

                  <button id="hosp_card_but_hom">Book an appointment</button>
                </div>
              </div>
          }) : <h1>No any hospitals found</h1>
        }
      </div>
      <Link to="/hospitals">
        <div className="view_hosp_home">
          <a className="link_hosp_home">
            <p id="arrow_hosp_hom">View All</p>
            <p>&nbsp; &#8594; </p>
          </a>
        </div>
      </Link>
    </div>
  );
}
