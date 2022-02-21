// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import DoctorDetailComponent from "./doctorComponent/doctor.component.js";
// import { httpClient } from "../../../utils/httpClient"
// import "./doctors_home.component.css"
// import { notify } from "../../../services/notify.js";

// export default function Doctorshome(props) {

//   const [allDoctors, setAllDoctors] = useState([]);

//   const getAllDoctors = async () => {
//     try {
//       let resp = await httpClient.GET("doctor/digi/get-four");
//       if (resp.data.status) {
//         let data = resp.data.data;

//         data.forEach((item) => {
//           item.doctordescription = item.doctordescription.substring(0, 35) + "...";
//         })
//         setAllDoctors(data)
//       }

//     } catch (err) {
//       if (err && err.response && err.response.data) {
//         notify.error(err.response.data.message || "Something went wrong");
//       }
//     }
//   }

//   useEffect(() => {
//     getAllDoctors();
//   }, [])

//   return (
//     <div className="hosp_hom_cont">
//       <div className="hosp_hom_head">
//         <h1>Our Doctors</h1>
//       </div>

//       <div className="hospital_book_card">

//       {allDoctors.map((item, index) => {
//         return <>
//           <DoctorDetailComponent key={index} {...props} name={item.doctorname} prefix={item.prefix} price={item.price}
//           gender={item.gender+1} specialist={item.specialist} desc={item.doctordescription} doctorId={item.doctorid} />
//         </>
//       })}
//       </div>

//       <Link to="/digimedical-doctors" className="link_hosp_home">
//         <div className="view_hosp_home">
//           <p id="arrow_hosp_hom">View All</p>
//           <p id="arrow_hosp_hom1">&nbsp; &#8594; </p>
//         </div>
//       </Link>
//     </div>
//   );
// }

import React from "react";
import DocSpecialityImg from "../../../assets/doc_speciality1.svg";
import "./doctors_home.component.css";
export default function doctors_home() {
  return (
    <div className="digi_doc_appointmain digi_doc_home">
      <div className="homepg-title">
        <span>Our professionals</span>
        <h2> Digimedical Doctors</h2>
      </div>
      <div className="our_doc_appoint">
        <div className="our_doc_speciality">
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician Physucian</p>
            </div>
            <div></div>
          </div>
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician</p>
            </div>
            <div></div>
          </div>
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician</p>
            </div>
            <div></div>
          </div>
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician</p>
            </div>
            <div></div>
          </div>
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician</p>
            </div>
            <div></div>
          </div>
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician</p>
            </div>
            <div></div>
          </div>
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician</p>
            </div>
            <div></div>
          </div>
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician</p>
            </div>
            <div></div>
          </div>
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician</p>
            </div>
            <div></div>
          </div>
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician</p>
            </div>
            <div></div>
          </div>
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician</p>
            </div>
            <div></div>
          </div>
          <div className="speciality_doc_card">
            <div className="speciality_cont1">
              <img src={DocSpecialityImg} alt="" />
            </div>
            <div className="speciality_cont2">
              <p>General Physician</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
