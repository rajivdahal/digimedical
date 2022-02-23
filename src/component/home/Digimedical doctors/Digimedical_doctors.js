import React from "react";
import "./Digimedical_doctors.css";
import Navbar from "../../Navbar/Navbar";
import badge from "../../../assets/badge.png";
import handheart from "../../../assets/handheart.png";
import Pagination from "../../common/pagination/pagination.component";
import DigiMedicalDoctorCard from "./digi.doctor.card";
import { httpClient } from "../../../utils/httpClient";
import { useEffect, useState } from "react";
import { notify } from "../../../services/notify";
import Footer from "../../Footer/Footer";
import DocSpecialityImg from "../../../assets/doc_speciality1.svg";
function Digimedical_doctors(props) {
  console.log("props in digidoctors is",props)
  const [allDigiDoctors, setAllDigiDoctors] = useState([]);
  const [searcheddoctors, setsearcheddoctors] = useState([]);
  const [issearched, setIssearched] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const getAllDigiDoctors = async () => {
    let id = "";
    if (props.location && props.location.state && props.location.state.doctorID) {
      console.log("all conditions are satisfied")
      id =
      props.location.state.doctorID;
      setSelectedId(id);
    }
    try {
        // httpClient.GET("doctor/get-related-doctor/"+props.location.state.itemId)
        // .then(resp=>{
        //   setAllDigiDoctors(resp.data.data)
        //   // console.log("respone is",resp)
        // })
        // .catch(err=>{
        //   console.log("error  is",err)
        // })
      let resp = await httpClient.GET("doctor/digi/get-four");
      console.log(resp);
      if (resp.data.status) {
        let data = resp.data.data;
        if (id) {
          let selectedDoctor = data.find((doctor, index) => {
            return doctor.doctorid == id
          })
          let filteredDr = data.filter((doctor, index) => {
            return doctor.doctorid != id;
          });
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
  }, []);

  const handleChange = (e) => {
    setSearchName(e.target.value);
    searchDigiDoctors(e.target.value);
  };

  const searchDigiDoctors = (name) => {
    setIssearched(true);
    let searched = allDigiDoctors.filter((item, index) => {
      return item.doctorname.toLowerCase().includes(name.toLowerCase());
    });
    setsearcheddoctors(searched);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div class="up">
        <a href="url" id="healthpackages">
          Home &nbsp;
        </a>
        <i class="fas fa-chevron-right"></i>
        <span id="familyhealthpackages"> &nbsp; Digimedical doctors</span>
      </div>
      <div className="digi_doc_appointmain digi_doc_appointmain1">
        <div className="our_doc_appoint">
          <div className="doc_appoint_head">
            <div className="digidoc_head_txt">
              <h1>Our doctors</h1>
              <p>Select the the doctor by their speciality</p>
            </div>
            <div className="doc_booksearch">
              <form class="doc_example">
                <input
                  type="text"
                  placeholder="Search Doctors .."
                  name="searchName"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => searchDigiDoctors(searchName)}
                >
                  <i class="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>
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
          {/* <div className="doc_appoint_main">
            <div className="digidoctor_apoint_card">
              {searcheddoctors.length > 0 ? (
                searcheddoctors.map((item, index) => {
                  return <>
                    <DigiMedicalDoctorCard key={index}
                      selected={item.doctorid == selectedId} prefix={item.prefix}
                      name={item.doctorname} desc={item.doctordescription} price={item.price}
                      specialist={item.specialist} gender={item.gender+1}
                      doctorId={item.doctorid} doctorServices={item.serviceid} />
                  </>
                })
              ) : (
                <h4>No any doctors found</h4>
              )}
            </div>
          </div> */}
        </div>
        {/* <div className="digidoctor_whychooseus">
          <div className=" digidoc_whycus ourserv-wcu-main">
            <div className="digidoc_whycus_head">
              <p className="digidoc_whycus_h1">Our Other Services</p>
            </div>
            <div className="digidoctor_whychooseus_cont">
              <div className="whychooseus_contimg">
                <span className="ico_digi_doc1">
                  {" "}
                  <i
                    class="fas fa-hand-holding-heart"
                    style={{ color: "#52B2E5" }}
                  ></i>
                </span>
              </div>
              <p>Safest digital heath platform</p>
            </div>
            <div className="digidoctor_whychooseus_cont">
              <div className="whychooseus_contimg">
                <span className="ico_digi_doc1">
                  {" "}
                  <i
                    class="fas fa-star-of-life"
                    style={{ color: "#52B2E5" }}
                  ></i>
                </span>
              </div>
              <p>Emergency service 24/7</p>
            </div>
            <div className="digidoctor_whychooseus_cont">
              <div className="whychooseus_contimg">
                <span className="ico_digi_doc1">
                  {" "}
                  <i class="fas fa-ribbon" style={{ color: "#52B2E5" }}></i>
                </span>
              </div>
              <p>Trusted by thousands</p>
            </div>
            <div className="digidoctor_whychooseus_cont">
              <div className="whychooseus_contimg">
                <span className="ico_digi_doc1">
                  <i class="fas fa-piggy-bank" style={{ color: "#52B2E5" }}></i>
                </span>
              </div>
              <p>Affordable to all patient.</p>
            </div>
          </div>
          <div className="digidoc_emergency_call">
            <p>Do you need Emergency Medical care?</p>
            <h4>Call 01-5909141</h4>
          </div>
        </div> */}
      </div>

      <Pagination></Pagination>
      <br />
      <Footer />
    </div>
  );
}

export default Digimedical_doctors;
