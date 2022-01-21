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
            <div className="digidoctor_apoint_card">
              <div className="digidoc_card1">
                <div className="digi_first_card_content">
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
                  <div className="digidoc_about_desc">
                    <div className="doc_about_desc_head">
                      <p id="doc_name_card">Hello Doc</p>
                      <p id="doc_edu_brief">Doc Edu</p>
                    </div>
                    <div>
                      <p>
                        <b>Spe</b>
                      </p>
                      <p>Desc</p>
                    </div>
                  </div>
                  <div className="digidoc_card_but">
                    {" "}
                    <button id="digidoc_card_but">Book an appointment</button>
                  </div>
                </div>

                <div className="form_digi_doc">
                  <div className="form_digidoc">
                    <div className="digidoc_appoin_form1">
                      <p>First Name</p>
                      <input
                        type="text"
                        placeholder="Enter First Name"
                        name="firstName"
                        id="firstName"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Middle Name</p>
                      <input
                        type="text"
                        placeholder="Enter Middle Name"
                        name="middleName"
                        id="middleName"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Last Name</p>
                      <input
                        type="text"
                        placeholder="Enter Last Name"
                        name="lastName"
                        id="lastName"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Email Address</p>
                      <input
                        type="text"
                        placeholder="Enter Email Address"
                        name="email"
                        id="email"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Phone No.</p>
                      <input
                        type="text"
                        placeholder="Enter Phone no."
                        name="mobileNumber"
                        id="mobileNumber"
                      />
                    </div>

                    <div class="digidoc_appoin_form1">
                      <p>Appointment Date</p>

                      <input
                        type="date"
                        name="appointmentDate"
                        id="appointmentDate"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Appointment Time</p>
                      <input
                        type="time"
                        name="appointmentTime"
                        id="appointmentTime"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Select Service Type</p>
                      <select name="cars" id="cars">
                        <optgroup label="Swedish Cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                        </optgroup>
                        <optgroup label="German Cars">
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </optgroup>
                      </select>
                    </div>
                    <div class="digidoc_appoin_form1">
                      <button type="submit" className="submit-buttons">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="digidoc_card1">
                <div className="digi_first_card_content">
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
                  <div className="digidoc_about_desc">
                    <div className="doc_about_desc_head">
                      <p id="doc_name_card">Hello Doc</p>
                      <p id="doc_edu_brief">Doc Edu</p>
                    </div>
                    <div>
                      <p>
                        <b>Spe</b>
                      </p>
                      <p>Desc</p>
                    </div>
                  </div>
                  <div className="digidoc_card_but">
                    {" "}
                    <button id="digidoc_card_but">Book an appointment</button>
                  </div>
                </div>

                <div className="form_digi_doc">
                  <div className="form_digidoc">
                    <div className="digidoc_appoin_form1">
                      <p>First Name</p>
                      <input
                        type="text"
                        placeholder="Enter First Name"
                        name="firstName"
                        id="firstName"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Middle Name</p>
                      <input
                        type="text"
                        placeholder="Enter Middle Name"
                        name="middleName"
                        id="middleName"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Last Name</p>
                      <input
                        type="text"
                        placeholder="Enter Last Name"
                        name="lastName"
                        id="lastName"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Email Address</p>
                      <input
                        type="text"
                        placeholder="Enter Email Address"
                        name="email"
                        id="email"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Phone No.</p>
                      <input
                        type="text"
                        placeholder="Enter Phone no."
                        name="mobileNumber"
                        id="mobileNumber"
                      />
                    </div>

                    <div class="digidoc_appoin_form1">
                      <p>Appointment Date</p>

                      <input
                        type="date"
                        name="appointmentDate"
                        id="appointmentDate"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Appointment Time</p>
                      <input
                        type="time"
                        name="appointmentTime"
                        id="appointmentTime"
                      />
                    </div>
                    <div class="digidoc_appoin_form1">
                      <p>Select Service Type</p>
                      <select name="cars" id="cars">
                        <optgroup label="Swedish Cars">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                        </optgroup>
                        <optgroup label="German Cars">
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </optgroup>
                      </select>
                    </div>
                    <div class="digidoc_appoin_form1">
                      <button type="submit" className="submit-buttons">
                        Submit
                      </button>
                    </div>
                  </div>
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
