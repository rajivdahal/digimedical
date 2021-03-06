import React from "react";
import "./hospital-booking.component.css";
import hospital1 from "../../../assets/hospital1.png";
import Pagination from "../../common/pagination/pagination.component";
import { useEffect, useState } from "react";
import { httpClient } from "../../../utils/httpClient";
import { notify } from "../../../services/notify";
import { useHistory, useLocation } from "react-router-dom";
import Hospitaltopheader from "./hospitalheader.component";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { setHospitalInfo } from "../../../actions/hospitalAppointmentBooking.ac";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Hospitalbookingcomponent(props) {
  let [hospitals, setHospitals] = useState([]);
  let [searchedoutput, setSearchedoutput] = useState([]);
  let [issearched, setIssearched] = useState(false);
  const history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();
  // redux implementation
  const appointmentBooking = useSelector((state) => state.appointmentBooking);
  const setHospital = bindActionCreators(setHospitalInfo, dispatch);
  // end of redux implementation
  useEffect(() => {
    httpClient
      .GET("hospital/get-all")
      .then((resp) => {
        setHospitals(resp.data.data);
      })
      .catch((err) => {
        notify.error("Something went wrong");
      });
  }, []);
  const handleSearch = (e) => {
    setIssearched(true);
    let searchvalue = e.target.value.toLowerCase();
    let searchedoutput = hospitals.filter((item, index) => {
      if (item.name.toLowerCase().includes(searchvalue)) {
        return true;
      }
    });
    setSearchedoutput(searchedoutput);
  };
  const showDoctors = (item) => {
    setHospital(item);
    history.push({
      pathname: localStorage.getItem("dm-access_token")
        ? "/dashboard/hospitals/view-doctors"
        : "/hospitals/view-doctors",
      state: item,
    });
  };
  return (
    <>
    <div
      className={
        location.pathname === "/dashboard/hospitals"
          ? "hospital_main_cont_user"
          : "hospital_main_cont"
      }
    >
      <div className="hospital_booking">
        {location.pathname == "/hospitals" ? (
          <Hospitaltopheader></Hospitaltopheader>
        ) : null}
        <div
          className={
            location.pathname === "/dashboard/hospitals"
              ? "hospital_bookcont_from_user"
              : "hospital_bookcont"
          }
        >
          <div className="hospital_bookconthead">
            <p>Book appointment at hospital</p>
            {hospitals.length ? (
              <div className="hospital_booksearch">
                <form class="example" action="/action_page.php">
                  <input
                    className="hello_input"
                    type="text"
                    placeholder="Search Hospital .."
                    name="search"
                    onChange={handleSearch}
                  />
                  <button type="submit" className="hosp_srch">
                    <i class="fa fa-search"></i>
                  </button>
                </form>
              </div>
            ) : null}
          </div>
          <div className="hospital_book_card">
            {!searchedoutput.length && !issearched ? (
              hospitals.map((item, index) => {
                return (
                  <div className="hospital_book_card1">
                    <img
                      src={REACT_APP_BASE_URL + "hospital/download/" + item.id}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/hospital.jpeg";
                      }}
                      alt=""
                    />
                    <div className="hosp-ct-bt">
                      {" "}
                      <div className="hospital_card_text">
                        <h1>{item.name}</h1>
                        <p2>{item.address}</p2>
                        <p2>{item.description.slice(0, 50)}.....</p2>
                      </div>{" "}
                      <div className="hosp_card_but_main">
                        {" "}
                        <button
                          id={
                            props.location
                              ? props.location.pathname ===
                                "/dashboard/hospitals"
                                ? "hosp_card_but_user"
                                : "hosp_card_but_user"
                              : "hosp_card_but"
                          }
                          onClick={() => showDoctors(item)}
                        >
                          Book an appointment
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : searchedoutput.length && issearched ? (
              searchedoutput.map((item, index) => {
                return (
                  <div className="hospital_book_card1">
                    <img
                      src={REACT_APP_BASE_URL + "hospital/download/" + item.id}
                      alt=""
                    />
                    <div className="hosp-ct-bt">
                      <div className="hospital_card_text">
                        <h1>{item.name}</h1>
                        <p2>{item.address}</p2>
                        <p2>{item.description.slice(0, 50)}.....</p2>
                        {/* <p2>{item.description}</p2> */}
                      </div>
                      <div className="hosp_card_but_main">
                        <button
                          id={
                            location.pathname === "/dashboard/hospitals"
                              ? "hosp_card_but_user"
                              : "hosp_card_but"
                          }
                          onClick={() => showDoctors(item)}
                        >
                          Book an appointment
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>Not found</h1>
            )}
          </div>
          <div className="pagination_hosp">
            {hospitals.length ? (
              <Pagination></Pagination>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1>No any hospitals found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
