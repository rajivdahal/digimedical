import React from "react";
import styled from "styled-components";
import doctorAtHomewall from "../../assets/doctorAtHomewall.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import DoctorAtHomeForm from "./DoctorAtHomeForm";
import WhyChooseUs from "../home/WhyChooseUs/WhyChooseUs";
import OurServices from "../home/About/OurServices";
import WhatisdoctorAtHomeService from "./whatIsdoctorAtHomeService/whatisdoctorAtHomeService";
import FrequentlyAsked from "../FrequentlyAsked/FrequentlyAsked";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
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

const doctorAtHome = () => {
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
         <Link to="/services"> <span className="service"> Service </span></Link>
          <span className="arrow">
            <MdOutlineKeyboardArrowRight />
          </span>
          <span className="doctorAtHome"> Doctor at Home</span>
        </Navigate>
        <Heading>Doctor at home</Heading>
        <FormContainor>
          <DoctorAtHomeForm />
        </FormContainor>
      </Root>
      <WhatisdoctorAtHomeService />
      <WhyChooseUs />
      <FrequentlyAsked />
      <OurServices />
      <Footer />
    </>
  );
};

export default doctorAtHome;
