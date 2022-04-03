import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { httpClient } from "../../../../utils/httpClient";
import { notify } from "../../../../services/notify";
import Footer from "../../../Footer/Footer";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;


const BookFamilyPackage = (props) => {

    const [masterPackage, setMasterPackage] = useState([]);

    const getMasterPackage = async () => {
        try {
            let resp = await httpClient.GET("master-package/get-all", false, true);
            console.log(resp);
            if (resp.data.status) {
                let allPackage = resp.data.data;
                let familyPackage = allPackage.filter((item, index) => {
                    return (item.packagetypes === 1)
                })
                console.log(familyPackage)
                setMasterPackage(familyPackage)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMasterPackage();
    }, [])

    return (<>

        <div className="hospital_main_cont_user">
            <div className="hospital_booking">
                <div className="hospital_bookcont_from_user">
                    <div className="hospital_bookconthead">
                        <div className="dash_our_doc_appoint">
                            <div className="doc_appoint_head">
                                <div className="digidoc_head_txt">
                                    <h1>All Available Packages</h1>
                                    <p>Select the package you want to book.</p>
                                </div>
                                {/* <div className="doc_booksearch">
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
                                </div> */}
                            </div>

                            <div className="dash_our_doc_speciality">
                                {masterPackage.length > 0 ? (
                                    masterPackage.map((item, index) => {
                                        return (
                                            <div className="speciality_doc_card">
                                                <Link
                                                    style={{ textDecoration: "none" }}
                                                    key={index}
                                                    to={{
                                                        pathname: "package-details",
                                                        state: {
                                                            packageId: item.id,
                                                            packageName: item.name,
                                                        },
                                                    }}
                                                >
                                                    <div className="speciality_cont1">
                                                        <img src="/images/doctor.jpeg" alt="" />
                                                    </div>
                                                    <div className="speciality_cont2">
                                                        <p>{item.name}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <h4>No any Package found.</h4>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* {searchSpeciality.length > 0 ? <Pagination></Pagination> : <></>} */}
                </div>
            </div>
        </div>
    </>
    );
};

export default BookFamilyPackage;

