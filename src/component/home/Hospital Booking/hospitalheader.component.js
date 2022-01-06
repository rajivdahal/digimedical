import React from 'react'
import hospitalback from "../../../assets/hospitalbackground.png";
import hospitalbook from "../../../assets/g12.svg";
export default function Hospitaltopheader() {
    return (
        <div>
             <div className="hospital_carousel">
          <img src={hospitalback} alt="" />
          <div className="hospitalbook_img">
            <img src={hospitalbook} alt="" />
          </div>

          <div className="hospcont_desc">
            <h1>Hospitals</h1>
            <p>Get appointment at hospital of your choice.</p>
          </div>
        </div>
        </div>
    )
}
