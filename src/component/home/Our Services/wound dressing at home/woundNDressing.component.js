import React from "react";
import Ooscomponent from "../ouros.component";
export default function woundNDressing() {
  return (
    <div className="ourserv-cont-main">
      <div className="ourserv-cont-main1">
        <div className="serv-passages">
          <p className="questionheads"> Wound care /Dressing At Home </p>
          <div className="serv-boxes">
            <p className="serv-text">
              Wound care has become one of the fastest growing needs for home
              care services. Without holistic and effective care and management
              of acute and chronic wounds, there is a high risk of infection.
              This, in turn, impacts the patient recovery time, health, and
              overall well-being. In order to address these challenges, Digi
              Medical provides all kinds of services related to wound care by
              trained and experienced professionals at the comfort of your home.
            </p>
          </div>
          <p className="questionheads">Importance of Wound care at Home </p>
          <div className="serv-boxes">
            <p className="serv-text">
              Many deep and serious wounds require regular wound care, dressing,
              and medication to heal efficiently, and patients are urged to seek
              wound care at home rather than being admitted to the hospital for
              such procedures. Digimedical, which sends an experienced and
              certified Nurse to your home to administer efficient wound
              dressing, can aid such patients.
            </p>
          </div>
          <p className="questionheads">
            When do clients need Digi medical for wound care?{" "}
          </p>
          <div className="serv-boxes">
            <p className="serv-text">
              Wound care service is effectively done on the basis of their
              aetiology, site of the wound, type of the injury, its symptoms,
              wound depth and tissue loss. As such the wound care services is as
              follows;
            </p>
            <ul className="serv-text">
              <li>
                {" "}
                Superficial Wound (limited to the epidermis layer of the skin
                for e.g., abrasion{" "}
              </li>
              <li>
                {" "}
                Partial Thickness wound (involving epidermis and dermis layer of
                the skin){" "}
              </li>
              <li>
                {" "}
                Full thickness (involving the dermis, subcutaneous fat and even
                the bone in some cases.
              </li>
            </ul>
          </div>
          <p className="questionheads">
            Benefits to the client from taking wound care services from Digi
            medical
          </p>
          <div className="serv-boxes">
            <p className="serv-text">
              Digimedical has access to the latest standards of practice and
              products for wound care. This includes a comprehensive clinical
              training program that has been designed to
            </p>
            <ul className="serv-text">
              <li>
                {" "}
                Comfortable, as this service is provided to the wounded at the
                comfort of their home without them having to travel anywhere.{" "}
              </li>
              <li> Decrease time spent on dressing changes</li>
              <li> Improve healing time</li>
              <li> Prevent complications</li>
              <li> Improve patient outcomes</li>
              <li> Prevent cross contamination and infection</li>
            </ul>
          </div>
        </div>
        <Ooscomponent></Ooscomponent>
      </div>
    </div>
  );
}
