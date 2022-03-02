import React, { useEffect, useState } from "react";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Pagination from "../../../common/pagination/pagination.component";
import UserDoctorCard from "./digiDoctorCard";
import { Link } from "react-router-dom";
import "./dashDigiDoc.css";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const DigimedicalDoctor = (props) => {
  const [doctorSpeciality, setDoctorSpeciality] = useState([]);
  const [searchSpeciality, setSearchSpeciality] = useState([]);
  const [issearched, setIssearched] = useState(false);
  const [searchName, setSearchName] = useState("");

  const getDoctorSpeciality = async () => {
    try {
      let resp = await httpClient.GET("services/get/true");
      console.log(resp);
      if (resp.data.status) {
        setDoctorSpeciality(resp.data.data);
        setSearchSpeciality(resp.data.data);
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

  const handleChange = (e) => {
    setSearchName(e.target.value);
    searchDigiSpeciality(e.target.value);
  };
  const searchDigiSpeciality = (name) => {
    setIssearched(true);
    let searched = doctorSpeciality.filter((item, index) => {
      return item.servicename.toLowerCase().includes(name.toLowerCase());
    });
    setSearchSpeciality(searched);
  };

  useEffect(() => {
    getDoctorSpeciality();
  }, []);

  return (
    <div className="hospital_main_cont_user">
      <div className="hospital_booking">
        <div className="hospital_bookcont_from_user">
          <div className="hospital_bookconthead">
            <div className="dash_our_doc_appoint">
              <div className="dash_digidoc_appoint_head">
                <div className="digidoc_head_txt">
                  <h1>All Speciality</h1>
                  <p>Select the the doctor by their speciality</p>
                </div>
                <div className="doc_booksearch">
                  <form class="doc_example">
                    <input
                      type="text"
                      placeholder="Search Speciality .."
                      name="searchName"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => searchDigiSpeciality(searchName)}
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>

              <div className="dash_our_doc_speciality">
                {searchSpeciality.length > 0 ? (
                  searchSpeciality.map((item, index) => {
                    return (
                      <div className="speciality_doc_card">
                        <Link
                          style={{ textDecoration: "none" }}
                          key={index}
                          to={{
                            pathname: "speciality-doctors",
                            state: {
                              specialityId: item.id,
                              specialityName: item.servicename,
                            },
                          }}
                        >
                          <div className="speciality_cont1">
                            <img
                              src={
                                REACT_APP_BASE_URL +
                                "services/download/" +
                                item.id
                              }
                              alt=""
                            />
                          </div>
                          <div className="speciality_cont2">
                            <p>{item.servicename}</p>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <h4>No any speciality found.</h4>
                )}
              </div>
            </div>
          </div>
          {searchSpeciality.length > 0 ? <Pagination></Pagination> : <></>}
        </div>
      </div>
    </div>
  );
};

export default DigimedicalDoctor;
