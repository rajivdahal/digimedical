import React from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import "./hospital-booking.component.css";
import hospitalback from "../../../assets/hospitalbackground.png";
import hospitalbook from "../../../assets/g12.svg";
import hospital1 from "../../../assets/hospital1.png";
import Pagination from "../../common/pagination/pagination.component";
import { useEffect, useState } from "react";
import { httpClient } from "../../../utils/httpClient";
import { notify } from "../../../services/notify";
import { useHistory } from "react-router-dom";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;


export default function Hospitalbooking() {
  let [hospitals, setHospitals] = useState([])
  let [description, setdescription] = useState("This is Bir hospital and i am soo good with the hospitals around men and so fucking proud of myself")
  let [searchedoutput, setSearchedoutput] = useState([])
  let [issearched,setIssearched]=useState(false)
  const history=useHistory()
  useEffect(() => {
    httpClient.GET("hospital/get-all")
      .then(resp => {
        setHospitals(resp.data.data)
      })
      .catch(err => {
        notify.error("Something went wrong")
      })
  }, [])
  const handleSearch = (e) => {
    setIssearched(true)
    let searchvalue = e.target.value.toLowerCase()
    let searchedoutput = hospitals.filter((item, index) => {
      if (item.name.toLowerCase().includes(searchvalue)) {
        return true
      }
    })
    setSearchedoutput(searchedoutput)
  }
  const showDoctors=(item)=>{
    history.push({
      pathname:"/hospitals/view-doctors",
      state:item
    })
console.log("data is",item)
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="hospital_booking">
        <div className="hospital_carousel">
          <img src={hospitalback} alt="" />
          <div className="hospitalbook_img">
            <img src={hospitalbook} alt="" />
          </div>

          <div className="hospcont_desc">
            <h1>Hospitals</h1>
            <p>Get appointment at hospital of your choice.</p>
          </div>
        </div>
        <div className="hospital_bookcont">
          <div className="hospital_bookconthead">
            <h2>Book appointment at hospital</h2>
            <div className="hospital_booksearch">
              <form class="example" action="/action_page.php">
                <input
                  type="text"
                  placeholder="Search Hospital .."
                  name="search"
                  onChange={handleSearch}
                />
                <button type="submit">
                  <i class="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>
          <div className="hospital_book_card">
            {
              !searchedoutput.length &&!issearched ? hospitals.map((item, index) => {
                return <div className="hospital_book_card1">
                  <img src={REACT_APP_BASE_URL + "hospital/download/" + item.id} alt="" />
                  <div className="hospital_card_text">
                    <h1>{item.name}</h1>
                    <p2>{item.address}</p2>
                    <p2>{item.description.slice(0, 50)}.....</p2>
                    <button id="hosp_card_but"  onClick={()=>showDoctors(item)}>Book an appointment</button>
                  </div>
                </div>
              }) :searchedoutput.length && issearched? searchedoutput.map((item, index) => {
                return <div className="hospital_book_card1">
                  <img src={REACT_APP_BASE_URL + "hospital/download/" + item.id} alt="" />
                  <div className="hospital_card_text">
                    <h1>{item.name}</h1>
                    <p2>{item.address}</p2>
                    <p2>{item.description.slice(0, 50)}.....</p2>
                    {/* <p2>{item.description}</p2> */}
                    <button id="hosp_card_but"  onClick={()=>showDoctors(item)}>Book an appointment</button>
                  </div>
                </div>
              }):<h1>Not found</h1>
            }
          </div>
        </div>
        <div className="pagination_hosp">
          <Pagination></Pagination>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
