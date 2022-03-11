import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DocSpecialityImg from "../../../assets/doc_speciality1.svg";
import { notify } from "../../../services/notify";
import { httpClient } from "../../../utils/httpClient";
import "./doctors_home.component.css";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

function SpecialityHome(props) {
  const [doctorSpeciality, setDoctorSpeciality] = useState([]);

  const getDoctorSpeciality = async () => {
    try {
      let resp = await httpClient.GET("services/get/true");
      console.log(resp);
      if (resp.data.status) {
        setDoctorSpeciality(resp.data.data);
      }
    } catch (err) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    getDoctorSpeciality();
  }, []);

  return (
    <div className="digi_doc_appointmain digi_doc_home">
      <div className="homepg-title">
        <span>Our professionals</span>
        <h2> Digimedical Doctors</h2>
      </div>
      <div className="our_doc_appoints">
        <div className="our_doc_speciality">

          {doctorSpeciality.map((item,index) => {
            return <div className="speciality_doc_card">
              <Link style={{ textDecoration: "none" }} key={index}
                to={{
                  pathname: "digi-doctors",
                  state: { specialityId: item.id, specialityName: item.servicename },
                }}>
                <div className="speciality_cont1">
                  <img src={REACT_APP_BASE_URL + "services/download/" + item.id}
                  onError={(e) => {
                    e.target.src = "/images/doctor.jpeg";
                }}
                 alt="" />
                </div>
                <div className="speciality_cont2">
                  <p>{item.servicename}</p>
                </div>
                <div></div>
              </Link>
            </div>
          })}

          {/* <div className="speciality_doc_card">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SpecialityHome;
