import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Pagination from "../../../common/pagination/pagination.component";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const DigimedicalDoctor = (props) => {
    var dt = new Date();

    const [allDigiDoctors, setAllDigiDoctors] = useState([]);
    const [searcheddoctors, setsearcheddoctors] = useState([]);
    const [issearched, setIssearched] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [appointmentData, setData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        appointmentTime: "",
        appointmentDate:
            dt.getFullYear() + "-" + dt.getMonth() + 1 + "-" + dt.getDate(),
        mobileNumber: "",
    });


    const getAllDigiDoctors = async () => {

        try {
            let resp = await httpClient.GET("doctor/digi/get-all");
            console.log(resp)
            if (resp.data.status) {
                let data = resp.data.data;

                setAllDigiDoctors(data);
                setsearcheddoctors(data);

            }
        } catch (err) {
            if (err && err.response && err.response.data) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }

    }

    useEffect(() => {
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
        console.log(searched)
        setsearcheddoctors(searched);
    };

    const [showForm, setForm] = useState(false);


    const bookAppointment = () => {
        let tempForm = showForm === true ? false : true;
        setForm(tempForm);
    };

    return (
        <div className="hospital_main_cont_user">
            <div className="hospital_booking">
            <div className="hospital_bookcont_from_user">
                <div className="hospital_bookconthead">
                    <h2>Book appointment </h2>
                    {searcheddoctors.length ? (
                        <div className="hospital_booksearch">
                            <form class="example" action="/action_page.php">
                                <input
                                    className="hello_input"
                                    type="text"
                                    placeholder="Search Doctor"
                                    name="search"
                                    onChange={handleChange}
                                />
                                <button type="submit" className="hosp_srch" onClick={() => searchDigiDoctors(searchName)}>
                                    <i class="fa fa-search"></i>
                                </button>
                            </form>
                        </div>
                    ) : null}
                </div>
                <div className="hospital_book_card">
                    {
                        searcheddoctors.map((item, index) => {
                            return (
                                <div className="hospital_book_card1">
                                    <img
                                        src={REACT_APP_BASE_URL + "doctor/download/" + item.doctorid}
                                        onError={(e) => { e.target.onerror = null; e.target.src = "/images/hospital.jpeg" }}
                                        alt=""
                                    />
                                    <div className="hospital_card_text">
                                        <h1>{item.doctorname}</h1>
                                        <p2>{item.address}</p2>
                                        <p2>{item.specialist}</p2>
                                        <p2>{item.doctordescription}</p2>

                                        {/* <p2>{item.doctordescription.slice(0, 50)}.....</p2> */}
                                    </div>
                                    <div className="hosp_card_but_main">
                                        {" "}
                                        <button id="hosp_card_but_user" onClick={bookAppointment}>
                                            Book an appointment
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


                <div className="pagination_hosp">
                    {searcheddoctors.length ? (
                        <Pagination></Pagination>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <h1>No any Doctors found</h1>
                        </div>
                    )}
                </div>
            </div>
            </div>
            </div>
    )
}

export default DigimedicalDoctor;