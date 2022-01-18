import React from "react";
import { Link } from "react-router-dom";
import hospital1 from "../../../assets/hospital1.png";

export default function Doctorshome() {
  return (
    <div className="hosp_hom_cont">
      <div className="hosp_hom_head">
        <p>Our professionals</p>
        <h1>Digimedical Doctors</h1>
      </div>
      <div className="hospital_book_card"></div>
      <Link to="/hospitals" className="link_hosp_home">
        <div className="view_hosp_home">
          <p id="arrow_hosp_hom">View All</p>
          <p id="arrow_hosp_hom1">&nbsp; &#8594; </p>
        </div>
      </Link>
    </div>
  );
}
