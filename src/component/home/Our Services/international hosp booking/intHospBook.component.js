import React from "react";
import Ooscomponent from "../ouros.component";

export default function IntHospBook() {
  return (
    <div className="ourserv-cont-main">
      <div className="ourserv-cont-main1">
        <div className="serv-passages">
          <p className="questionheads">International Hospital booking</p>
          <div className="serv-boxes">
            <p className="serv-text">
              Are you concerned about traveling internationally and reserving a
              hospital? You no longer need to be concerned because Digi Medical
              is here to assist you with international hospital bookings. Digi
              Medical is in collaboration with A- class hospitals in India,
              Bangkok, Thailand, Singapore and across the globe. To avail this
              service, all you need to do is download our App and book the
              healthcare service that you need easily.
            </p>
          </div>
          <p className="questionheads">
            Benefits of International Hospital Booking from Digi Medical
          </p>

          <div className="serv-boxes">
            <ul className="serv-text">
              <li> Hassle free process for clients and family members. </li>
              <li> Convenient for clients and family members.</li>
              <li> Accessible and cost-effective service.</li>
              <li>
                {" "}
                Saves time as clients do not have to search for hospitals.{" "}
              </li>
              <li> Reduces stress related to hospital booking.</li>
              <li> Avoids delay in treatment </li>
            </ul>
          </div>
          <p className="questionheads">
            When do clients need Digi Medical for International Hospital
            booking?
          </p>

          <div className="serv-boxes">
            <p className="serv-text">Clients may need us as follows:</p>
            <ul className="serv-text">
              <li> Emergency situation as to avoid delay in treatment </li>
              <li> Normal check-up in International Hospital </li>
              <li>
                {" "}
                Clients are unaware about international hospital booking or want
                to avoid stress related to hospital booking.
              </li>
              <li>
                {" "}
                Treatment that you are seeking for is not available in Nepal.
              </li>
            </ul>
          </div>
        </div>
        <Ooscomponent></Ooscomponent>
      </div>
    </div>
  );
}
