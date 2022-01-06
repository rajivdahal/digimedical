import React from 'react'
import "./hospital-booking.component.css";
import hospital1 from "../../../assets/hospital1.png";
import Pagination from "../../common/pagination/pagination.component";
import { useEffect, useState } from "react";
import { httpClient } from "../../../utils/httpClient";
import { notify } from "../../../services/notify";
import { useHistory } from "react-router-dom";
import Hospitaltopheader from './hospitalheader.component';
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Hospitalbookingcomponent(props) {
    let [hospitals, setHospitals] = useState([])
    let [searchedoutput, setSearchedoutput] = useState([])
    let [issearched, setIssearched] = useState(false)
    const history = useHistory()
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
    const showDoctors = (item) => {

        history.push({
            pathname:props.location.pathname="/dashboard/hospitals"?"/hospitals/dashboard/view-doctors":"/hospitals/view-doctors",
            state: item
        })
        console.log("data is", item)
    }
    return (
        <div>
            <div className="hospital_booking">
                {
                    props.location.pathname="/dashboard/hospitals"? null : <Hospitaltopheader></Hospitaltopheader>
                }
                <div className={props.location.pathname="/dashboard/hospitals"?"hospital_bookcont_from_user":"hospital_bookcont"}>
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
                            !searchedoutput.length && !issearched ? hospitals.map((item, index) => {
                                return <div className="hospital_book_card1">
                                    <img src={REACT_APP_BASE_URL + "hospital/download/" + item.id} alt="" />
                                    <div className="hospital_card_text">
                                        <h1>{item.name}</h1>
                                        <p2>{item.address}</p2>
                                        <p2>{item.description.slice(0, 50)}.....</p2>
                                        <button id={props.location.pathname="/dashboard/hospitals"?"hosp_card_but_user":"hosp_card_but"}  onClick={() => showDoctors(item)}>Book an appointment</button>
                                    </div>
                                </div>
                            }) : searchedoutput.length && issearched ? searchedoutput.map((item, index) => {
                                return <div className="hospital_book_card1">
                                    <img src={REACT_APP_BASE_URL + "hospital/download/" + item.id} alt="" />
                                    <div className="hospital_card_text">
                                        <h1>{item.name}</h1>
                                        <p2>{item.address}</p2>
                                        <p2>{item.description.slice(0, 50)}.....</p2>
                                        {/* <p2>{item.description}</p2> */}
                                        <button id={props.location.pathname="/dashboard/hospitals"?"hosp_card_but_user":"hosp_card_but"}onClick={() => showDoctors(item)}>Book an appointment</button>
                                    </div>
                                </div>
                            }) : <h1>Not found</h1>
                        }
                    </div>
                </div>
                <div className="pagination_hosp">
                    <Pagination></Pagination>
                </div>
            </div>
        </div>
    )
}
