import React from "react";
import hospital1 from "../../../assets/hospital1.png";
import "./hospitals_home.component.css";

export default function Hospitalshome() {
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

        <div className="hospital_book_card1">
          <img src={hospital1} alt="" />
          <div className="hospital_card_text">
            <h1>B.P Koirala Institute of Health Science</h1>
            <p2>Dharan, Nepal</p2>

            <button id="hosp_card_but_hom">Book an appointment</button>
          </div>
        </div>
        <div className="hospital_book_card1">
          <img src={hospital1} alt="" />
          <div className="hospital_card_text">
            <h1>B.P Koirala Institute of Health Science</h1>
            <p2>Dharan, Nepal</p2>

            <button id="hosp_card_but_hom">Book an appointment</button>
          </div>
        </div>
        <div className="hospital_book_card1">
          <img src={hospital1} alt="" />
          <div className="hospital_card_text">
            <h1>B.P Koirala Institute of Health Science</h1>
            <p2>Dharan, Nepal</p2>

            <button id="hosp_card_but_hom">Book an appointment</button>
          </div>
        </div>
      </div>
      <div className="view_hosp_home">
        <a href="" className="link_hosp_home">
          <p id="arrow_hosp_hom">View All</p>
          <p>&nbsp; &#8594; </p>
        </a>
      </div>
    </div>
  );
}
