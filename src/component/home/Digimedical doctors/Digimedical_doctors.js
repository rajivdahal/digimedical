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
import { notify } from "../../../services/notify";
import Footer from "../../Footer/Footer";

function Digimedical_doctors(props) {

  const [allDigiDoctors, setAllDigiDoctors] = useState([]);
  const [searcheddoctors, setsearcheddoctors] = useState([]);
  const [issearched, setIssearched] = useState(false);
  const [searchName, setSearchName] = useState("");

  const getAllDigiDoctors = async () => {
    let id = "";
    if (props.location && props.location.state && props.location.state.doctorID) {
      id = props.location.state.doctorID;
    }
    try {
      let resp = await httpClient.GET("doctor/digi/get-four");
      console.log(resp)
      if (resp.data.status) {
        let data = resp.data.data;
        if (id) {
          let selectedDoctor = data.find((doctor, index) => {
            return doctor.doctorid == id
          })

          let filteredDr = data.filter((doctor, index) => {
            return doctor.doctorid != id
          })
          filteredDr.unshift(selectedDoctor);
          setAllDigiDoctors(filteredDr);
          setsearcheddoctors(filteredDr);
        } else {
          setAllDigiDoctors(data);
          setsearcheddoctors(data);
        }

      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }

  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllDigiDoctors();
  }, [])

  const handleChange = (e) => {
    setSearchName(e.target.value);
    searchDigiDoctors(e.target.value)
  }

  const searchDigiDoctors = (name) => {
    setIssearched(true);
    let searched = allDigiDoctors.filter((item, index) => {
      return item.doctorname.toLowerCase().includes(name.toLowerCase())
    });
    setsearcheddoctors(searched);
  };

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
              <form class="doc_example">

                <input
                  type="text"
                  placeholder="Search Doctors .."
                  name="searchName"
                  onChange={handleChange}
                />
                <button type="button" onClick={() => searchDigiDoctors(searchName)}>
                  <i class="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>


          <div className="doc_appoint_main">
            <div className="digidoctor_apoint_card">
              {searcheddoctors.length > 0 ?
                searcheddoctors.map((item, index) => {
                  return <>
                    <DigiMedicalDoctorCard key={index} name={item.doctorname} prefix={item.prefix}
                      specialist={item.specialist} desc={item.doctordescription}
                      gender={item.gender+1}
                      doctorId={item.doctorid} doctorServices={item.serviceid} />
                  </>
                })
                :
                <h4>No any doctors found</h4>
              }
            </div>
          </div>


        </div>
        <div className="digidoctor_whychooseus">
            <div className="digidpc_whycus">
              <h1>Why choose Us?</h1>
              <div className="digidoctor_whychooseus_cont">
                <div className="whychooseus_contimg">
                  <img src={handheart} alt=""
                  />
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
      <br/>
      <Footer/>
    </div>
  );
}

export default Digimedical_doctors;
