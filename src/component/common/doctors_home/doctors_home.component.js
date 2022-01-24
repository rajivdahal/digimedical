import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DoctorDetailComponent from "./doctorComponent/doctor.component.js";
import { httpClient } from "../../../utils/httpClient"
import "./doctors_home.component.css"

export default function Doctorshome(props) {

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
        <h1>Our Doctors</h1>
      </div>
    
      {allDoctors.map((item, index) => {
        return <>
          <DoctorDetailComponent key={index} {...props} name={item.doctorname} prefix={item.prefix} 
          specialist={item.specialist} desc={item.doctordescription} doctorId={item.doctorid}/>
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
