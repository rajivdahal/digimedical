import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Pagination from "../../../common/pagination/pagination.component";
import UserDoctorCard from "./digiDoctorCard";


const DigimedicalDoctor = (props) => {

    const [allDigiDoctors, setAllDigiDoctors] = useState([]);
    const [searcheddoctors, setsearcheddoctors] = useState([]);
    const [issearched, setIssearched] = useState(false);
    const [searchName, setSearchName] = useState("");

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
        setsearcheddoctors(searched);
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
                        {searcheddoctors.length > 0 ?
                            searcheddoctors.map((item, index) => {
                                return <>
                                    <UserDoctorCard key={index} name={item.doctorname} prefix={item.prefix}
                                        specialist={item.specialist} desc={item.doctordescription}
                                        gender={item.gender + 1}
                                        doctorId={item.doctorid} doctorServices={item.serviceid} />
                                </>
                            })
                            :
                            <h4>No any doctors found</h4>
                        }
                    </div>

                    <Pagination></Pagination>
                       
                    </div>
                </div>
            </div>
       
    )
}

export default DigimedicalDoctor;