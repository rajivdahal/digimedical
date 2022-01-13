import React from "react";
import { Link } from "react-router-dom";
import hospital1 from "../../../assets/hospital1.png";
import "./hospitals_home.component.css";
import { useEffect, useState } from "react";
import { httpClient } from "../../../utils/httpClient";
import { useHistory } from "react-router-dom";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Hospitalshome() {
  let [hospitals, sethospitals] = useState([]);
  const history = useHistory();
  useEffect(() => {
    httpClient.GET("hospital/get-all").then((resp) => {
      sethospitals(resp.data.data);
    });
  }, []);
  const showDoctors = (item) => {
    history.push({
      pathname: "/hospitals/view-doctors",
      state: item,
    });
    console.log("data is", item);
  };
  return (
    <div className="hosp_hom_cont">
      <div className="hosp_hom_head">
        <p>Get appointment at hospital of your choice.</p>
        <h1>Book an Appointment at Hospital</h1>
      </div>
      <div className="hospital_book_card">
        {hospitals.length ? (
          hospitals.map((item, index) => {
            if (index < 4)
              return (
                <div className="hospital_book_card1">
                  <img
                    src={REACT_APP_BASE_URL + "hospital/download/" + item.id}
                    alt=""
                  />
                  <div className="hospital_card_text">
                    <h1>{item.name}</h1>
                    <p2>{item.address}</p2>
                    <p2>{item.description.slice(0, 50)}.....</p2>
                    <button
                      id="hosp_card_but_hom"
                      onClick={() => showDoctors(item)}
                    >
                      Book an appointment
                    </button>
                  </div>
                </div>
              );
          })
        ) : (
          <h1>No any hospitals found</h1>
        )}
      </div>
      <Link to="/hospitals" className="link_hosp_home">
        <div className="view_hosp_home">
          <p id="arrow_hosp_hom">View All</p>
          <p id="arrow_hosp_hom1">&nbsp; &#8594; </p>
        </div>
      </Link>
    </div>
  );
}
