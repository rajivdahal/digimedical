import React from "react";
import Ooscomponent from "../ouros.component";

export default function MedicineDelivery() {
  return (
    <div className="ourserv-cont-main">
      <div className="ourserv-cont-main1">
        <div className="serv-passages">
          <p className="questionheads"> Medicine Delivery </p>
          <div className="serv-boxes">
            <p className="serv-text">
              Medicine home delivery services can be a very effective way of
              purchasing medicines as we deliver them directly to your home or
              office. The primary and the most important reason for getting
              medicines through a medicine delivery service is convenience. We
              have a busy lifestyle these days where one has to specially take
              out time to go and buy even the essential goods. These services
              are more vital now than ever in light of the current scenario.
              Digimedical provides a large choice of Nepalese
              government-approved medicines that are delivered right to your
              home. You can order from our app just by uploading your doctor’s
              prescription.
            </p>
          </div>
          <p className="questionheads">Key Features of Digimedical Service </p>
          <div className="serv-boxes">
            <ol className="serv-text">
              <li>
                {" "}
                When it comes to medicine prescriptions, we pay close attention.
                After clarifying doses to the patient or a family member, a
                trained pharmacist scrutinizes the prescription and dispenses
                the drugs.
              </li>
              <li>
                {" "}
                We are in collaboration with different pharmacies. We have
                collaborated with one the largest pharmacies of Nepal which
                provides varied assortment of medications.
              </li>
            </ol>
          </div>
          <p className="questionheads">
            {" "}
            Benefits of ordering Medicine from Digi medical{" "}
          </p>
          <div className="serv-boxes">
            <ul className="serv-text">
              <li>
                {" "}
                Medicine home delivery services are most reliable as we only
                deliver medicines which are prescribed by the doctors.
              </li>
              <li>
                {" "}
                Saves time running to the pharmacy and focus on work, hobbies,
                and other tasks.
              </li>
              <li>
                {" "}
                Conveniently brought to your home, office, or any convenient
                location of the patient or caregiver.
              </li>
              <li>
                {" "}
                All kinds of medicines related to various illnesses are
                available with our Pharmacy Partners.
              </li>
              <li> Prevents lapses in medicine access.</li>
              <li> An easy option for the Highly Susceptible groups.</li>
            </ul>
          </div>
        </div>
        <Ooscomponent></Ooscomponent>
      </div>
    </div>
  );
}
