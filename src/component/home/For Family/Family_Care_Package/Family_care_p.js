import React, { useEffect, useState } from "react";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import "./family_care_p.css";

function FamilyPackage(props) {

  const [packageData, setPackageData] = useState([]);
  const [subPackageData, setSubPackageData] = useState([]);


  const getPackageData = async () => {
    let id = "";
    if (props && props.location && props.location.state) {
      id = props.location.state.packageId;
    }
    try {
      let resp = await httpClient.GET("master-package/get-for-public/" + id);
      if (resp.data.status) {
        setPackageData(resp.data.data)
      }
    }
    catch (err) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  }

  const getSubPackages = async () => {
    let id = "";
    if (props && props.location && props.location.state) {
      id = props.location.state.packageId;
    }
    try {
      let resp = await httpClient.GET("membership-packages/get-package-details/" + id);
      if (resp.data.status) {
        setSubPackageData(resp.data.data)
      }
    }
    catch (err) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  }

  useEffect(() => {
    getPackageData();
    getSubPackages();
  }, [])

  return (
    <div className="package-page">
      <div class="top-container">
        <div class="up">
          <a href="url" id="healthpackages">
            Health Packages &nbsp;
          </a>
          <i class="fas fa-chevron-right"></i>
          <span id="familyhealthpackages"> &nbsp; {props.location.state.packageName}</span>
        </div>

        <div className="down">
          <div className="fcp_header_desc">
            <p id="headerfamilyhealth">{props.location.state.packageName}</p>
            <p id="text1">
              Give your family a healthy gift in this covid situation.
            </p>
          </div>
          <img src="amico.png" className="person-with-masks" />
        </div>
      </div>

      <div className="mid-container">
        <p className="question">Why {props.location.state.packageName}?</p>
        {packageData.map((item, index) => {
          return <>
            <div className="boxfortext1">
              <p id="text3">
                {item.description}
              </p>
            </div>
            <p className="question">Purposes of {item.name}</p>
            <div className="boxfortext2">
              <ul>
                {item.packagePurporses.map((item, index) => {
                  return <li className="list1">
                    {item.purposes}
                  </li>
                })}

              </ul>
            </div>
          </>
        })}


      <p className="question">Packages details</p>
      </div>
      <div className="bottom-container">

        {subPackageData.map((item, index) => {
          return <>
            <div className="boxes">

              <p className="Program">{item.name}</p>
              <p className="text9">
                {item.description}
              </p>
              <p className="price">Rs.{item.amount}</p>
              <p className="peryear">per year</p>
              <ul>
                {item.membershipDetail.map((item, index) => {
                  return <li className="list1">
                    {item}
                  </li>
                })}
              </ul>
              <button className="button">Get Started</button>
            </div>

          </>
        })}
      </div>
    </div>
  );
}

export default FamilyPackage;
