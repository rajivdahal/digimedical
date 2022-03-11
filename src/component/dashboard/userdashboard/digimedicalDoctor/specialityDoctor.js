import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Pagination from "../../../common/pagination/pagination.component";
import UserDoctorCard from "./digiDoctorCard";

function SpecialityDoctor(props) {
    const [allDigiDoctors, setAllDigiDoctors] = useState([]);
    const [searcheddoctors, setsearcheddoctors] = useState([]);
    const [issearched, setIssearched] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [specialityName, setSpecialityName] = useState("");
    const getAllDigiDoctors = async () => {
        let id = "";
        if (
            props.location &&
            props.location.state &&
            props.location.state.specialityId
        ) {
            id = props.location.state.specialityId;
            setSelectedId(id);
        }
        try {
            let resp = await httpClient.GET("doctor/digi/get/" + id);
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
        window.scrollTo(0, 0);
        let specialityName = "";
        if (props.location &&
            props.location.state &&
            props.location.state.specialityName) {
            specialityName = props.location.state.specialityName;
            setSpecialityName(specialityName)
        }
        getAllDigiDoctors();
    }, []);

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

    return <div>
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
                                console.log("doctorrrr",item)
                                return <>
                                    <UserDoctorCard key={index}
                                        // selected={item.doctorid == selectedId}
                                        prefix={item.prefix}
                                        name={item.doctorname}
                                        desc={item.doctordescription}
                                        // price={item.price}
                                        specialist={specialityName}
                                        gender={item.gender + 1}
                                        doctorId={item.doctorid}
                                        digiServices={item.digiService}
                                        // digiserviceid={item.digiserviceid}
                                        serviceid={item.serviceid}
                                    />
                                </>
                            })
                            :
                            <h4>No any doctors found</h4>
                        }
                    </div>
                    {searcheddoctors.length > 0 ?
                    <Pagination></Pagination>
                        :
                        <></>
                    }

                </div>
            </div>
        </div>

    </div>
}
export default SpecialityDoctor;