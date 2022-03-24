import React, { useEffect, useState } from "react";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Pagination from "../../../common/pagination/pagination.component";
import { Link } from "react-router-dom";
import Usersidebar from "../../usersidebar/usersidebar.component";
import { Dashboardnavbar } from "../../Navbar/Dashboardnavbar.component";
// import "./dashDigiDoc.css";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const PackageDetailsPage = (props) => {

  const [membershipPackage, setMembershipPackage] = useState([]);


  const getDoctorSpeciality = async () => {
    try {
      let resp = await httpClient.GET("membership-packages/all",false,true);
      console.log(resp);
      if (resp.data.status) {
        let allPackage = resp.data.data;
        let familyPackage = allPackage.filter((item,index)=>{
            return (item.packagetypes === 1)
        })
        console.log(familyPackage)
        setMembershipPackage(allPackage)
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

  // const handleChange = (e) => {
  //   setSearchName(e.target.value);
  //   searchDigiSpeciality(e.target.value);
  // };
  // const searchDigiSpeciality = (name) => {
  //   setIssearched(true);
  //   let searched = doctorSpeciality.filter((item, index) => {
  //     return item.servicename.toLowerCase().includes(name.toLowerCase());
  //   });
  //   setSearchSpeciality(searched);
  // };

  useEffect(() => {
    getDoctorSpeciality();
  }, []);

  return (
    <>
    <div className="hospital_main_cont_user">
      <div className="hospital_booking">
        <div className="hospital_bookcont_from_user">
          <div className="hospital_bookconthead">
            <div className="dash_our_doc_appoint">
              <div className="doc_appoint_head">
                <div className="digidoc_head_txt">
                  <h1>All Membership Package</h1>
                  <p>Select  Membership Package</p>
                </div>
                <div className="doc_booksearch">
                  <form class="doc_example">
                    <input
                      type="text"
                      placeholder="Search Speciality .."
                      name="searchName"
                      // onChange={handleChange}
                    />
                    <button
                      type="button"
                      // onClick={() => searchDigiSpeciality(searchName)}
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>

              <div className="dash_our_doc_speciality">
                {membershipPackage.length > 0 ? (
                  membershipPackage.map((item, index) => {
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
                  <h4>No any package available</h4>
                )}
              </div>
            </div>
          </div>
          {membershipPackage.length > 0 ? <Pagination></Pagination> : <></>}
        </div>
      </div>
    </div>
    </>
  );
};

export default PackageDetailsPage;
