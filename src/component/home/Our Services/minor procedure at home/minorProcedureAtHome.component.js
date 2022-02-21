import React from "react";

import Ooscomponent from "../ouros.component";

export default function minorProcedureAtHome() {
  return (
    <div className="ourserv-cont-main">
      <div className="ourserv-cont-main1">
        <div className="serv-passages">
          <p className="questionheads">What is a minor procedure? </p>
          <div className="serv-boxes">
            <p className="serv-text">
              A minor procedure is any practice of a health practitioner that
              involves a combination of special skills or abilities and may
              require drugs, devices, or both. A dedicated team of experienced
              and certified health personnel from Digimedical provides minor
              procedure services at your doorstep. In the current situation, it
              is a cumbersome task to visit hospitals and clinics. Thus,
              Digimedical provides services according to the needs of the client
              or in emergency situations.
            </p>
          </div>
          <p className="questionheads">
            When do clients need Digi medical for minor procedures?
          </p>
          <div className="serv-boxes">
            <p className="serv-text">
              Clients may require our services in normal and emergency
              situations as follows:
            </p>
            <ul className="serv-text">
              <li>Dressing </li>
              <li>Triage and suturing of laceration </li>
              <li>Stitch removal </li>
              <li>Incision and drainage </li>
              <li>Urinary catheterization and removal </li>
              <li>Intravenous cannulation </li>
              <li>Intravenous drip administration </li>
              <li>Intravenous, intramuscular, subcutaneous medications </li>
              <li>Nasogastric tube insertion and removal </li>
              <li>Nasogastric tube feeding </li>
              <li>Oxygen administration </li>
              <li>Suctioning </li>
              <li>Tracheostomy care </li>
              <li>Bandaging </li>
              <li>Splint and casts </li>
              <li>Irrigation and many more </li>
            </ul>
          </div>

          <p className="questionheads">
            Benefits to the client from taking minor procedures services from
            Digi medical{" "}
          </p>
          <div className="serv-boxes">
            <ul className="serv-text">
              <li>
                {" "}
                Acquire the services of a certified, experienced health expert{" "}
              </li>
              <li> Convenient for the client and family members. </li>
              <li> Affordable services and accessible at your doorstep.</li>
              <li>
                {" "}
                Clients do not have to visit hospital again and again for just a
                minor procedure which saves time.
              </li>
              <li> Hassle free process for the client and family members.</li>
              <li>
                {" "}
                Hygienic services are provided by the health personnel thereby
                avoiding cross contamination and infection.
              </li>
            </ul>
          </div>
        </div>
        <Ooscomponent></Ooscomponent>
      </div>
    </div>
  );
}
