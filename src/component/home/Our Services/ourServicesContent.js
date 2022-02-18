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
import NursingAtHome from "./nursing at home/nursingAtHome.component";
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
const Root = styled.div`
  padding-left: 9rem;
  padding-right: 9rem;
  padding-top: 1.5rem;
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
    font-size: 0.8rem;
    line-height: 25px;
    display: flex;
    align-items: left;
    color: #8699ac;
    letter-spacing: 0.03em;
  }
  .service {
    margin-left: 0.3rem;
    font-style: normal;
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 25px;
    display: flex;
    align-items: left;
    color: #8699ac;
    letter-spacing: 0.03em;
  }
  .doctorAtHome {
    margin-left: 0.3rem;

    font-style: normal;

    font-size: 0.8rem;
    line-height: 25px;
    display: flex;
    align-items: left;
    color: #596579;
    letter-spacing: 0.03em;
    font-weight: bold;
  }
  .arrow {
    margin-left: 0.3rem;
  }
`;
const Heading = styled.div`
  margin-top: 0.6rem;
  font-style: normal;
  font-weight: bold;
  font-size: 45px;
  line-height: 50px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #192638;
  @media screen and (max-width: 650px) {
    font-size: 35px;
    margin-top: 0px;
  }
`;

const FormContainor = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Ourservices = (props) => {
  let [heading, setHeading] = useState([]);
  let history = useHistory();
  let location = useLocation();
  console.log("location is, ", location);
  useEffect(() => {
    const paramsValue = props.match.params.subservice.split("-");
    let title = paramsValue.map((item, index) => {
      return item[0].toUpperCase() + item.substring(1);
    });
    console.log("title is", title);
    setHeading(title);
    console.log("inside useeffect");
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
            <span className="service"> Service </span>
          </Link>
          <span className="arrow">
            <MdOutlineKeyboardArrowRight />
          </span>
          {heading.length
            ? heading.map((item) => {
                return <span>{item + "\xa0"}</span>;
              })
            : null}
        </Navigate>
        <Heading>
          {heading.length
            ? heading.map((item) => {
                return <span>{` ${item + "\xa0"}`}</span>;
              })
            : null}
        </Heading>
        <FormContainor>
          {!localStorage.getItem("dm-access_token") ? (
            <DoctorAtHomeForm />
          ) : (
            <p>We provide you the best doctor at home service</p>
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
