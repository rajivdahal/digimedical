import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DoctorDetailComponent from "./doctorComponent/doctor.component.js";
import { httpClient } from "../../../utils/httpClient"
import { notify } from "../../../services/notify"
import "./doctors_home.component.css"
import { Col, Row, Card } from "react-bootstrap";

export default function Doctorshome() {

  const [allDoctors, setAllDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      let resp = await httpClient.GET("doctor/digi/get-four");
      console.log(resp)
      if (resp.data.status) {
        let data = resp.data.data;
        
        data.forEach((item)=>{
          item.doctordescription = item.doctordescription.substring(0,35)+"...";
        })
        setAllDoctors(data)
        console.log(data)
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getAllDoctors();
  }, [])

  return (
    <div className="hosp_hom_cont">
      <div className="hosp_hom_head">
        {/* <p>Our professionals</p> */}
        <h1>Our Doctors</h1>
      </div>
    
      {allDoctors.map((item, index) => {
        return <>
          <DoctorDetailComponent key={index} name={item.doctorname} prefix={item.prefix} 
          specialist={item.specialist} desc={item.doctordescription}/>
        </>
      })}

      <Link to="/digimedical_doctors" className="link_hosp_home">
        <div className="view_hosp_home">
          <p id="arrow_hosp_hom">View All</p>
          <p id="arrow_hosp_hom1">&nbsp; &#8594; </p>
        </div>
      </Link>
    </div>
  );
}
