import React from "react";
import hospitalback from "../../../assets/hospitalbackground.png";
import hospitalbook from "../../../assets/g12.svg";
export default function Hospitaltopheader() {
  return (
    <div className="hospital_carousel_main">
      <div className="hospital_carousel">
        <img src={hospitalback} alt="hospital-background-image"/>
        <div className="hospitalbook_img">
          <div className="hospcont_desc">
            <h1>Hospitals</h1>
            <p>Get appointment at hospital of your choice.</p>
          </div>
          <img src={hospitalbook} />
        </div>
      </div>
    </div>
  );
}
