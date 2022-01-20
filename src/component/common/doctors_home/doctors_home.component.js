import React from "react";
import { Link } from "react-router-dom";
import doctor1 from "../../../assets/client1.png";
import "./doctors_home.component.css";

export default function Doctorshome() {
  return (
    <div className="hosp_hom_cont">
      <div className="hosp_hom_head">
        <p>Our professionals</p>
        <h1>Digimedical Doctors</h1>
      </div>

      <div className="hospital_book_card">
        <div className="hospital_book_card1">
          {" "}
          <div className="digidoc_card_img">
            <img
              src={doctor1}
              alt=""
              style={{
                height: "140px",
                width: "140px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="digidoc_about_desc">
            <div className="doc_about_desc_head">
              <p id="doc_name_card">Rameshwor Shrestha Acharya</p>
              <p id="doc_edu_brief">Mbbs,MD</p>
            </div>

            <p id="digidoc_exp"> Gynaecologist & Obstetrician </p>
          </div>
          <div className="digidoc_card_but">
            {" "}
            <button id="digidoc_card_but">Book an appointment</button>
          </div>
        </div>
        <div className="hospital_book_card1">
          {" "}
          <div className="digidoc_card_img">
            <img
              src={doctor1}
              alt=""
              style={{
                height: "140px",
                width: "140px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="digidoc_about_desc">
            <div className="doc_about_desc_head">
              <p id="doc_name_card">Rameshwor Shrestha Acharya</p>
              <p id="doc_edu_brief">Mbbs,MD</p>
            </div>

            <p id="digidoc_exp"> Gynaecologist & Obstetrician </p>
          </div>
          <div className="digidoc_card_but">
            {" "}
            <button id="digidoc_card_but">Book an appointment</button>
          </div>
        </div>
        <div className="hospital_book_card1">
          {" "}
          <div className="digidoc_card_img">
            <img
              src={doctor1}
              alt=""
              style={{
                height: "140px",
                width: "140px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="digidoc_about_desc">
            <div className="doc_about_desc_head">
              <p id="doc_name_card">Rameshwor Shrestha Acharya</p>
              <p id="doc_edu_brief">Mbbs,MD</p>
            </div>

            <p id="digidoc_exp"> Gynaecologist & Obstetrician </p>
          </div>
          <div className="digidoc_card_but">
            {" "}
            <button id="digidoc_card_but">Book an appointment</button>
          </div>
        </div>
        <div className="hospital_book_card1">
          {" "}
          <div className="digidoc_card_img">
            <img
              src={doctor1}
              alt=""
              style={{
                height: "140px",
                width: "140px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="digidoc_about_desc">
            <div className="doc_about_desc_head">
              <p id="doc_name_card">Rameshwor Shrestha Acharya</p>
              <p id="doc_edu_brief">Mbbs,MD</p>
            </div>

            <p id="digidoc_exp"> Gynaecologist & Obstetrician </p>
          </div>
          <div className="digidoc_card_but">
            {" "}
            <button id="digidoc_card_but">Book an appointment</button>
          </div>
        </div>
      </div>
      <Link to="/hospitals" className="link_hosp_home">
        <div className="view_hosp_home">
          <p id="arrow_hosp_hom">View All</p>
          <p id="arrow_hosp_hom1">&nbsp; &#8594; </p>
        </div>
      </Link>
    </div>
  );
}
