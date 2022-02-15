import React from "react";
import "./ouros.component.css";
import Handheart from "../../../assets/handheart.png";
import badge from "../../../assets/badge.png";
export default function Ooscomponent() {
  return (
    <div className="ourserv-wcu-cont">
      <div className="emergency-call digidoc_emergency_call ">
        <p>Do you need Emergency Medical care?</p>
        <h4>Call 01-5909141</h4>
      </div>
      <div className="digidpc_whycus ourserv-wcu-main">
        <h1>Our Other Services</h1>
        <div className="digidoctor_whychooseus_cont">
          <p>
            <span>
              <i class="fas fa-file-medical" style={{ color: "#52B2E5" }}></i>
              &nbsp; &nbsp;
            </span>
            Doctor At Home
          </p>
        </div>
        <div className="digidoctor_whychooseus_cont">
          <p>
            <span>
              <i class="fas fa-file-medical" style={{ color: "#52B2E5" }}></i>
              &nbsp; &nbsp;
            </span>
            24/7 Nursing Service At Home
          </p>
        </div>
        <div className="digidoctor_whychooseus_cont">
          <p>
            <span>
              <i class="fas fa-file-medical" style={{ color: "#52B2E5" }}></i>
              &nbsp; &nbsp;
            </span>
            Online Medical Consulation
          </p>
        </div>
        <div className="digidoctor_whychooseus_cont">
          <p>
            <span>
              <i class="fas fa-file-medical" style={{ color: "#52B2E5" }}></i>
              &nbsp; &nbsp;
            </span>
            PCR At Home
          </p>
        </div>
        <div className="digidoctor_whychooseus_cont">
          <p>
            <span>
              <i class="fas fa-file-medical" style={{ color: "#52B2E5" }}></i>
              &nbsp; &nbsp;
            </span>
            UCG/ECG/ECHO At Home
          </p>
        </div>
      </div>
    </div>
  );
}
