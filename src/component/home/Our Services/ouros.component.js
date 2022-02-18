import React from "react";
import "./ouros.component.css";
import Handheart from "../../../assets/handheart.png";
import badge from "../../../assets/badge.png";
export default function Ooscomponent() {
  return (
    <div className="ourserv-wcu-cont">
      <div className="ourserv-wcu-cont1">
        <div className="emergency-call digidoc_emergency_call ">
          <p>Do you need Emergency Medical care?</p>
          <h4>Call 01-5909141</h4>
        </div>
        <div className="digidoc_whycus ourserv-wcu-main">
          <div className="digidoc_whycus_head">
            {" "}
            <p className="digidoc_whycus_h1">Our Other Services</p>
          </div>
          <div className="digidoc_whycus_body">
            <div className="digidoctor_whychooseus_cont">
              <p>
                <span className="icon-oos">
                  <i
                    class="fas fa-file-medical"
                    style={{ color: "#52B2E5" }}
                  ></i>
                  &nbsp; &nbsp;
                </span>
              </p>
              <p className="digidoc_wcu_b_P">Doctor At Home</p>
            </div>
            <div className="digidoctor_whychooseus_cont">
              <p>
                {" "}
                <span className="icon-oos">
                  <i
                    class="fas fa-file-medical"
                    style={{ color: "#52B2E5" }}
                  ></i>
                  &nbsp; &nbsp;
                </span>
              </p>
              <p className="digidoc_wcu_b_P">24/7 Nursing Service At Home</p>
            </div>
            <div className="digidoctor_whychooseus_cont">
              <p>
                <span className="icon-oos">
                  <i
                    class="fas fa-file-medical"
                    style={{ color: "#52B2E5" }}
                  ></i>
                  &nbsp; &nbsp;
                </span>
              </p>
              <p className="digidoc_wcu_b_P">Online Medical Consulation</p>
            </div>
            <div className="digidoctor_whychooseus_cont">
              <p>
                {" "}
                <span className="icon-oos">
                  <i
                    class="fas fa-file-medical"
                    style={{ color: "#52B2E5" }}
                  ></i>
                  &nbsp; &nbsp;
                </span>
              </p>
              <p className="digidoc_wcu_b_P">PCR At Home</p>
            </div>
            <div
              className="digidoctor_whychooseus_cont"
              style={{ border: "none" }}
            >
              <p>
                {" "}
                <span className="icon-oos">
                  <i
                    class="fas fa-file-medical"
                    style={{ color: "#52B2E5" }}
                  ></i>
                  &nbsp; &nbsp;
                </span>
              </p>
              <p className="digidoc_wcu_b_P">UCG/ECG/ECHO At Home</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
