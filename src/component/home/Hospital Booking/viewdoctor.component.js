import React from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import styled from "styled-components";
import search from "../../../assets/Search.png";
import { BiSearch } from "react-icons/bi";
import Pagination from "../../common/pagination/pagination.component";
import "./viewdoctor.component.css";
import doctor1 from "../../../assets/client1.png";
import phone from "../../../assets/phone.png";
import { httpClient } from "../../../utils/httpClient";
import { notify } from "../../../services/notify";
import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
// import hospital_ico from "../../../assets/hospital_icon.png";
export default function Hospital_doctors(props) {
    console.log("props are",props)
    // const [props.location.state,setprops.location.state]=useState(props.location.state)
    let [alldoctors,setallDoctors]=useState([])
    useEffect(()=>{
        httpClient.GET("hospital/get-all/doctors/"+props.location.state.id)
        .then(resp=>{
            // alldoctors=[...resp.data.data]
            // // alldoctors=resp.data.data
            console.log("data after fetching API are",alldoctors)
            setallDoctors(resp.data.data)
        })
    },[])
    let [doctorappointmentindex,setdoctorappointmentindex]=useState(null)
    const showappointment=(item,index)=>{
        console.log("doctor appointment index is",doctorappointmentindex)
        if(!doctorappointmentindex){
            return setdoctorappointmentindex(parseInt(index)+1)
        }
        setdoctorappointmentindex(null)
    }
  return (
    <div>
      <Navbar></Navbar>
      <div className="hospital_doc_appoint">
        <div>
          <div className="hospital_doc_checkroute">
            <p>Home</p>
            <p>
              <i class="doc_arrow doc_right"></i>
            </p>
           <Link to={"/hospitals"}> <p>Hospitals</p></Link>
            <p>
              <i class="doc_arrow doc_right"></i>
            </p>
            <p id="hospital_name">{props.location.state.name}</p>
          </div>
          <div></div>
        </div>
        <div className="doc_appoint_main1">
          {" "}
          <div className="take_doc_appoint">
            <div className="doc_appoint_head">
              <div>
                <h1>Doctors</h1>
                <p>Select or search available doctors</p>
              </div>
              <div className="doc_booksearch">
                <form class="doc_example" action="/action_page.php">
                  <input
                    type="text"
                    placeholder="Search Doctors .."
                    name="search"
                  />
                  <button type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </form>
              </div>
            </div>
            <div className="doc_appoint_main">
              
              {alldoctors.length?
                  alldoctors.map((doctor,doctorindex)=>{
                        return <div className="doc_apoint_card">
                        <div className="doc_apoint_card1">
                          <div className="doc_card_img">
                            <img src={doctor1} alt="" />
                          </div>
                          <div className="doc_about_desc">
                            <p id="doc_name_card">{doctor.prefix}. {doctor.doctorname}</p>
                            <p>{doctor.specialist} </p>
                            <p id="doc_available_days">
                              Availabile days :{" "}
                              <span id="span1_doc_card">Sunday, Teusday, Friday</span>
                            </p>
                            <p>
                              Availabile time :{" "}
                              <span id="span1_doc_card">10am - 1pm</span>
                            </p>
                          </div>{" "}
                          <div className="hosp_card_but">
                            {" "}
                            <button id="hosp_card_but" onClick={()=>showappointment(doctor,doctorindex)}>Book an appointment</button>
                          </div>
                        </div>
                        {/* after clicking book an appointment */}
                        {
                            
                            doctorappointmentindex==doctorindex+1?<div className="click_book_action">
                            <form class="doc_appoin_form1">
                              <p>First Name</p>
                              <input
                                type="text"
                                placeholder="Enter First Name"
                                name="search"
                              />
                            </form>
                            <form class="doc_appoin_form2">
                              <p>Middle Name</p>
                              <input
                                type="text"
                                placeholder="Enter Middle Name"
                                name="search"
                              />
                            </form>
                            <form class="doc_appoin_form2">
                              <p>Last Name</p>
                              <input
                                type="text"
                                placeholder="Enter Last Name"
                                name="search"
                              />
                            </form>
                            <form class="doc_appoin_form1">
                              <p>Email Address</p>
                              <input
                                type="text"
                                placeholder="Enter Email Address"
                                name="search"
                              />
                            </form>
                            <form class="doc_appoin_form2">
                              <p>Phone No.</p>
                              <input
                                type="text"
                                placeholder="Enter Phone no."
                                name="search"
                              />
                            </form>
                            <form class="doc_appoin_form2">
                              <p>Appointment Data</p>
                              <input type="date" id="appoint_dt" name="" />
                            </form>
                            <form class="doc_appoin_form1">
                              <p>Appointment Time</p>
                              <input type="time" id="appoint_dt" name="appt" />
                            </form>
                          </div> :null
                        }
                        
                       
                      </div>
                      
                      
                  }):<h3>No any doctors found</h3>
              }
            </div>
          </div>
          <div className="doc_appoin_hosp_desc">
            <div className="hosp_desc_hosp">
              <img src={doctor1} alt="" />
              <p id="hosp_name_doc">{props.location.state.name}</p>
              <p>
                <i class="fas fa-map-marker-alt"></i> &nbsp; {props.location.state.address}
              </p>
              <p id="hosp_ph_no">
                <img src={phone} alt="" />
                &nbsp; {props.location.state.contactnumber}; {props.location.state.mobilenumber}
              </p>
              <p>
                <i class="fas fa-envelope"></i>&nbsp; info@norvichospital.com
              </p>
              <p id="hosp_ph_no">
                {" "}
                <i class="fas fa-link"></i>
                {/* <img src={hospital_ico} alt="" /> */}
                &nbsp; www.norvichospital.com.np
              </p>
            </div>
          </div>
        </div>
        <Pagination></Pagination>
      </div>
      <Footer></Footer>
    </div>
  );
}