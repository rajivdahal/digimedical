import React from "react";

import Ooscomponent from "../ouros.component";

export default function NursingAtHome() {
  return (
    <div className="ourserv-cont-main">
      <div className="ourserv-cont-main1">
        <div className="serv-passages">
          <p className="questionheads">Nursing Care at Home</p>
          <div className="serv-boxes">
            <p className="serv-text">
              Nursing care at home encompasses a wide range of healthcare
              services that can be easily administered at your home. Home care
              nursing services are usually cheaper than hospitals and nursing
              homes, while being just as effective as the medical care offered
              in a hospital or nursing home. <br /> <br />
              Our in-home nursing service offers personalized nursing care at
              home as offered in a typical hospital while being more
              compassionate towards the patient and gets integrated into the
              patient’s family and develops an emotional bond with the patient
              and their family. <br /> <br />
              The services offered by home care nursing are provided by
              registered and well experienced nurses, physiotherapists and
              occupational therapists among others. And as such you need not
              worry on the quality of service offered by the home nurses.
            </p>
          </div>
          <p className="questionheads">When to avail Nursing Care at Home?</p>

          <div className="serv-boxes">
            <p className="serv-text">
              The main goal of Nursing care service at home is to treat an
              illness or injury. The nursing services usually entails wound care
              for pressure sores or surgical wound, patient and care – giver
              education, Intravenous or nutrition therapy, injections,
              rehabilitation therapies and monitoring illness and unstable
              health status. On the basis of the health requirement of patients,
              we provide following nursing services:
            </p>
            <div className="packages_lt">
              <h3>SHORT TERM NURSING CARE</h3>
              <p className="serv-text">
                Short term nurses provide nursing services for 1-4 hours or a
                specific period. Short term nursing care is temporary medical
                aftercare following surgery, injury or other medical condition
                that is expected to improve. <br />
                <span id="serv-text-nah" style={{ fontWeight: "700" }}>
                  Specialities:
                </span>{" "}
                Injection at home, ECG at home, Dressing or wound care at home,
                Spygno
              </p>
            </div>

            <div>
              {" "}
              <h3>LONG TERM NURSING CARE</h3>
              <p className="serv-text">
                Long term nurses provide nursing services for 12-24 hours. It is
                a comprehensive range of medical, physical and surgical care to
                meet the physical, social and emotional needs of people who are
                chronically ill or disabled. <br />
                <span id="serv-text-nah" style={{ fontWeight: "700" }}>
                  Specialities:
                </span>{" "}
                Bedsore care, Catheter care, Infusion care, Care of IV Lines
              </p>
            </div>
            <div>
              {" "}
              <h3>Post Surgical Care</h3>
              <p className="serv-text">
                Post-surgical care is critical, and includes everything from
                pain management & feeding to respiratory management & fluid
                management. Get well sooner under the care of our nurses, who
                will help you with all of this in the comfort of your home.
              </p>
            </div>
            <div>
              {" "}
              <h3>Urinary Catheterisation Care</h3>
              <p className="serv-text">
                Our nurses are well trained and can help you with the process of
                Urine catheterization care at your home; be it catheter
                insertion, catheter removal.
              </p>
            </div>
            <div className="packages_lt">
              {" "}
              <h3>Wound care</h3>
              <p className="serv-text">
                Healing process varies depending on the wound type? Our nurses
                are experienced in handling varied types of wounds-postoperative
                surgical wounds, infected wounds and pressure sores and will
                accordingly provide appropriate wound care for a faster
                recovery.
              </p>
            </div>
            <div className="packages_lt">
              {" "}
              <h3> Oxygen Administration:</h3>
              <p className="serv-text">
                Oxygen administration is required in both acute and chronic
                conditions like trauma, haemorrhage, shock, breathlessness,
                pulmonary disease, and more. Don’t panic if you require one.
                Call a Digi Medical nurse home and sit back, while she does the
                needful.
              </p>
            </div>
            <div className="packages_lt">
              {" "}
              <h3>Injection:</h3>
              <p className="serv-text">
                Save yourself the trouble of travel and long hospital hours for
                a minor process like injection administration or IV infusion.
                Just book with us a home nurse and an experienced and registered
                nurse will come visit you at home to administer the required
                injection or IV infusion.
              </p>
            </div>
          </div>
        </div>
        <Ooscomponent></Ooscomponent>
      </div>
    </div>
  );
}
