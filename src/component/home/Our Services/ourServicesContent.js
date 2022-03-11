import React from "react";
import styled from "styled-components";
import doctorAtHomewall from "../../../assets/doctorAtHomewall.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import DoctorAtHomeForm from "./ourServicesForm";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import OurServices from "../About/OurServices";
import { useLocation } from "react-router-dom";
import FrequentlyAsked from "../../FrequentlyAsked/FrequentlyAsked";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "./doctor at home/doctorAtHome.css";
import LabtestAtHome from "./labtest at home/labtestAtHome.component";
import DoctorAtHome from "./doctor at home/doctorAtHome.component";
// import NursingAtHome from "./nursing at home/nursingathome.component";
import NursingAtHome from "./nursing at home/nursingathome.component";
import Onlinemedcons from "./onlinemedicalcon/onlinemedcons.component";
import Physiotherapyathome from "./physiotherapy/physiotherapyathome.component";
import AltMedAtHome from "./alternate medicine at home/altMedAtHome.component";
import ElderlyCareAtHome from "./elderly care service/elderlyCareAtHome.component";
import DentalCareAtHome from "./dental care at home/dentalCareAtHome.component";
import MinorProcedureAtHome from "./minor procedure at home/minorProcedureAtHome.component";
import WoundNDressingAtHome from "./wound dressing at home/woundNDressing.component";
import VaccinationAtHome from "./vaccination at home/vaccinationAtHome.component";
import MRINCTScanService from "./MRI CT Scan Services/MRINCTScanService.component";
import AmbulanceService from "./ambulance Services/ambulanceService.component";
import MedicineDelivery from "./Medicine Delivery/medicineDelivery.component";
import MedicalEquipmentAtHome from "./Medical Equipment at home/medicalEquipmentAtHome.component";
import HelicopterService from "./helicopter services/helicopterService.component";
import IntHospBook from "./international hosp booking/intHospBook.component";
import RootOurServ from "./rootOurServ";
const Root = styled.div`
  height: 30rem;
  margin-bottom: 4rem;
  padding-left: 9rem;
  padding-right: 9rem;
  padding-top: 2.5rem;
  @media screen and (max-width: 650px) {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
  }
`;

const Navigate = styled.div`
  //   background-color: red;
  display: flex;
  align-items: center;

  .home {
    font-style: normal;
    font-weight: 400;
    font-size: 13.33px;
    line-height: 25px;
    display: flex;
    align-items: left;
    color: #596579;
    letter-spacing: 0.01em;
  }
  .service {
    margin-left: 0.3rem;
    font-style: normal;
    font-weight: 400;
    font-size: 13.33px;
    line-height: 25px;
    display: flex;
    align-items: left;
    color: #596579;
    letter-spacing: 0.01em;
  }
  .doctorAtHome {
    margin-left: 0.3rem;

    font-style: normal;

    font-size: 10rem;
    line-height: 25px;
    display: flex;
    align-items: left;
    color: #596579;
    letter-spacing: 0.03em;
    font-weight: bold;
  }
  .arrow {
    color: #a7b2c3;
  }
  .ourserv-nav-title {
    font-size: 13.33px;
    font-weight: normal;
    line-height: 25px;
  }
`;
const Heading = styled.div`
  margin-top: 1.5rem;
  font-style: normal;
  font-weight: bold;
  font-size: 45px;
  line-height: 50px;
  display: flex;
  align-items: center;

  color: #192638;
  @media screen and (max-width: 650px) {
    font-size: 35px;
    margin-top: 0px;
  }
`;

const FormContainor = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

const Ourservices = (props) => {
  // let [heading, setHeading] = useState([]);
  let history = useHistory();
  let location = useLocation();
  console.log("location is, ", location);
  console.log(props.match.params.subservice);
  const paramsValue = props.match.params.subservice.split("-");
  let title = paramsValue.map((item, index) => {
    return item[0].toUpperCase() + item.substring(1);
  });
  console.log("title is", title);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Root
        style={{
          backgroundImage: `url(${doctorAtHomewall})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navigate>
          <span className="home"> Home</span>
          <span className="arrow">
            <MdOutlineKeyboardArrowRight />
          </span>
          <Link to="/services">
            {" "}
            <span className="service">Service </span>
          </Link>
          <span className="arrow">
            <MdOutlineKeyboardArrowRight />
          </span>
          {title.length
            ? title.map((item) => {
                return (
                  <span className="ourserv-nav-title">{item + "\xa0"}</span>
                );
              })
            : null}
        </Navigate>
        <Heading>
          {title.length
            ? title.map((item) => {
                return <span>{` ${item + "\xa0"}`}</span>;
              })
            : null}
        </Heading>
        <FormContainor>
          {!localStorage.getItem("dm-access_token") ? (
            <DoctorAtHomeForm />
          ) : (
            <p>
              We provide you the best{" "}
              {title.length
                ? title.map((item) => {
                    return <span>{` ${item + "\xa0"}`}</span>;
                  })
                : null}
              service
            </p>
          )}
        </FormContainor>
      </Root>

      {location.pathname == "/our-services/doctor-at-home" ? (
        <DoctorAtHome></DoctorAtHome>
      ) : location.pathname == "/our-services/labtest-at-home" ? (
        <LabtestAtHome></LabtestAtHome>
      ) : location.pathname == "/our-services/nursing-at-home" ? (
        <NursingAtHome></NursingAtHome>
      ) : location.pathname == "/our-services/online-medical-consultation" ? (
        <Onlinemedcons></Onlinemedcons>
      ) : location.pathname == "/our-services/physiotherapy-service-at-home" ? (
        <Physiotherapyathome></Physiotherapyathome>
      ) : location.pathname == "/our-services/alternative-medicine-at-home" ? (
        <AltMedAtHome></AltMedAtHome>
      ) : location.pathname == "/our-services/elderly-care-service-at-home" ? (
        <ElderlyCareAtHome></ElderlyCareAtHome>
      ) : location.pathname == "/our-services/dental-care-at-home" ? (
        <DentalCareAtHome></DentalCareAtHome>
      ) : location.pathname == "/our-services/minor-procedure-at-home" ? (
        <MinorProcedureAtHome></MinorProcedureAtHome>
      ) : location.pathname ==
        "/our-services/wound-care-and-dressing-at-home" ? (
        <WoundNDressingAtHome></WoundNDressingAtHome>
      ) : location.pathname == "/our-services/vaccination-at-home" ? (
        <VaccinationAtHome></VaccinationAtHome>
      ) : location.pathname == "/our-services/MRI-and-CT-Scan-at-home" ? (
        <MRINCTScanService></MRINCTScanService>
      ) : location.pathname == "/our-services/ambulance-service" ? (
        <AmbulanceService></AmbulanceService>
      ) : location.pathname == "/our-services/medicine-delivery" ? (
        <MedicineDelivery></MedicineDelivery>
      ) : location.pathname == "/our-services/medical-equipment-at-home" ? (
        <MedicalEquipmentAtHome></MedicalEquipmentAtHome>
      ) : location.pathname == "/our-services/helicopter-service" ? (
        <HelicopterService></HelicopterService>
      ) : location.pathname ==
        "/our-services/international-hospital-booking" ? (
        <IntHospBook></IntHospBook>
      ) : null}

      <WhyChooseUs />

      <FrequentlyAsked />
      {/* <OurServices /> */}
      <Footer />
    </>
  );
};

export default Ourservices;
