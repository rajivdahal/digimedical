import React from "react";
import "./Digimedical_doctors.css";
import Navbar from "../../Navbar/Navbar";
import doctor1 from "../../../assets/client1.png";
import badge from "../../../assets/badge.png";
import handheart from "../../../assets/handheart.png";
import Pagination from "../../common/pagination/pagination.component";
function Digimedical_doctors() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="digi_doc_appointmain">
        <div className="take_doc_appoint">
          <div className="doc_appoint_head">
            <div className="digidoc_head_txt">
              <h1>Digimedical doctors</h1>
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
            <div className="digidoctor_apoint_card">
              <div className="digidoctor_apoint_card1">
                <div className="digidoc_card_img">
                  <img
                    src={doctor1}
                    alt=""
                    style={{
                      height: "140px",
                      width: "140px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div className="digidoctor_about_desc">
                  <div className="doc_about_desc_head">
                    <p id="doc_name_card">Rameshwor Shrestha Acharya</p>
                    <p id="doc_edu_brief">Mbbs,MD</p>
                  </div>

                  <p id="digidoc_exp"> Gynaecologist & Obstetrician </p>
                </div>

                <div className="digidoctor_card_but">
                  {" "}
                  <button id="digidoctor_card_but">Book an appointment</button>
                </div>
              </div>
              <div className="digidoctor_apoint_card1">
                <div className="digidoc_card_img">
                  <img
                    src={doctor1}
                    alt=""
                    style={{
                      height: "140px",
                      width: "140px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div className="digidoctor_about_desc">
                  <div className="doc_about_desc_head">
                    <p id="doc_name_card">Rameshwor Shrestha Acharya</p>
                    <p id="doc_edu_brief">Mbbs,MD</p>
                  </div>

                  <p id="digidoc_exp"> Gynaecologist & Obstetrician </p>
                </div>

                <div className="digidoctor_card_but">
                  {" "}
                  <button id="digidoctor_card_but">Book an appointment</button>
                </div>
              </div>
              <div className="digidoctor_apoint_card1">
                <div className="digidoc_card_img">
                  <img
                    src={doctor1}
                    alt=""
                    style={{
                      height: "140px",
                      width: "140px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div className="digidoctor_about_desc">
                  <div className="doc_about_desc_head">
                    <p id="doc_name_card">Rameshwor Shrestha Acharya</p>
                    <p id="doc_edu_brief">Mbbs,MD</p>
                  </div>

                  <p id="digidoc_exp"> Gynaecologist & Obstetrician </p>
                </div>

                <div className="digidoctor_card_but">
                  {" "}
                  <button id="digidoctor_card_but">Book an appointment</button>
                </div>
              </div>
              <div className="digidoctor_apoint_card1">
                <div className="digidoc_card_img">
                  <img
                    src={doctor1}
                    alt=""
                    style={{
                      height: "140px",
                      width: "140px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div className="digidoctor_about_desc">
                  <div className="doc_about_desc_head">
                    <p id="doc_name_card">Rameshwor Shrestha Acharya</p>
                    <p id="doc_edu_brief">Mbbs,MD</p>
                  </div>

                  <p id="digidoc_exp"> Gynaecologist & Obstetrician </p>
                </div>

                <div className="digidoctor_card_but">
                  {" "}
                  <button id="digidoctor_card_but">Book an appointment</button>
                </div>
              </div>
            </div>
          </div>
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
  );
}

export default Digimedical_doctors;
