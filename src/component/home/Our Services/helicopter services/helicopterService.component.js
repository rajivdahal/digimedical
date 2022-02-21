import React from "react";
import Ooscomponent from "../ouros.component";

export default function HelicopterService() {
  return (
    <div className="ourserv-cont-main">
      <div className="ourserv-cont-main1">
        <div className="serv-passages">
          <p className="questionheads">
            {" "}
            Helicopter services from Digi Medical{" "}
          </p>
          <div className="serv-boxes">
            <p className="serv-text">
              Helicopter services from Digi Medical You may rely on us for
              inter-hospital transfers and on-site rescue when every second
              counts. Our crew is also available to help patients go to the
              hospital of their choice anywhere in Nepal, as well as during
              repatriations. Digi Medical is in collaboration with various
              helicopter service providers to help people in emergency
              conditions.
            </p>
          </div>
          <p className="questionheads">
            When do you need helicopter services?{" "}
          </p>

          <div className="serv-boxes">
            <p className="serv-text">
              You may require helicopter services for the following reasons:
            </p>

            <ul className="serv-text">
              <li> Inter hospital transfer in emergency situations.</li>
              <li> On site rescue </li>
              <li> Lack of transportation services </li>
              <li> Life threatening conditions </li>
              <li> Repatriations </li>
            </ul>
          </div>
          <p className="questionheads">
            Benefits of Helicopter service from Digi Medical?
          </p>

          <div className="serv-boxes">
            <ul className="serv-text">
              <li> Instant response on your call or message.</li>
              <li> Assured Quality of service.</li>
              <li>
                {" "}
                Convenient and accessible to the client and family members.{" "}
              </li>
              <li>
                {" "}
                Saves time and reduces stress related to searching for
                helicopter services.
              </li>
              <li> Cost effective services.</li>
              <li> Hassle free process for clients and family members.</li>
              <li> Quick response helps to save lives.</li>
            </ul>
          </div>
        </div>
        <Ooscomponent></Ooscomponent>
      </div>
    </div>
  );
}
