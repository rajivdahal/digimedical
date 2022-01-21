import React from "react";
import "./Digimedical_doctors.css";
import Navbar from "../../Navbar/Navbar";
import doctor1 from "../../../assets/client1.png";
import badge from "../../../assets/badge.png";
import handheart from "../../../assets/handheart.png";
import Pagination from "../../common/pagination/pagination.component";
import DigiMedicalDoctorCard from "./digi.doctor.card";
import { httpClient } from "../../../utils/httpClient"
import { useEffect, useState } from "react";

function Digimedical_doctors(props) {

  const [allDigiDoctors, setAllDigiDoctors] = useState([]);

  const getAllDigiDoctors = async () => {
    try {
      let resp = await httpClient.GET("doctor/digi/get-four");
      console.log(resp)
      if (resp.data.status) {
        let data = resp.data.data;

        // data.forEach((item)=>{
        //   item.doctordescription = item.doctordescription.substring(0,35)+"...";
        // })
        setAllDigiDoctors(data)
        console.log(data)
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getAllDigiDoctors();
  }, [])

  return (
    <div>
      <Navbar></Navbar>
      <div className="digi_doc_appointmain">
        <div className="take_doc_appoint">
          <div className="doc_appoint_head">
            <div className="digidoc_head_txt">
              <h1>Our doctors</h1>
              <p>Select or search available doctors</p>
            </div>
            <div className="doc_booksearch">
              <form class="doc_example" action="/action_page.php">
                <input
                  type="text"
                  placeholder="Search Doctors .."
                  name="search"
                />
                <button>
                  <i class="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>


          <div className="doc_appoint_main">
            {allDigiDoctors.map((item, index) => {
              return <>
                <DigiMedicalDoctorCard key={index} name={item.doctorname} prefix={item.prefix}
                  specialist={item.specialist} desc={item.doctordescription} doctorId={item.doctorid} />

              </>
            })}
          </div>

          <div className="digidoctor_whychooseus">
            <div className="digidpc_whycus">
              <h1>Why choose Us?</h1>
              <div className="digidoctor_whychooseus_cont">
                <div className="whychooseus_contimg">
                  <img src={handheart} alt="" />
                </div>
                <p>Safest digital heath platform</p>
              </div>
              <div className="digidoctor_whychooseus_cont">
                <div className="whychooseus_contimg">
                  <i class="fas fa-star-of-life" style={{ color: "#52B2E5" }}></i>
                </div>
                <p>Emergency service 24/7</p>
              </div>
              <div className="digidoctor_whychooseus_cont">
                <div className="whychooseus_contimg">
                  <img src={badge} alt="" />
                </div>
                <p>Trusted by thousands</p>
              </div>
              <div className="digidoctor_whychooseus_cont">
                <div className="whychooseus_contimg">
                  <i class="fas fa-piggy-bank" style={{ color: "#52B2E5" }}></i>
                </div>
                <p>Affordable to all patient.</p>
              </div>
            </div>
            <div className="digidoc_emergency_call">
              <p>Do you need Emergency Medical care?</p>
              <h4>Call 01-5909141</h4>
            </div>
          </div>
        </div>
        <Pagination></Pagination>
        </div>
      </div>
      );
}

      export default Digimedical_doctors;
