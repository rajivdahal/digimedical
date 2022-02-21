import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import aboutwall from "../../assets/aboutwall.png";
import Footer from "../Footer/Footer";

import TheyTrustedUs from "../home/TheyTrustedUs/TheyTrustedUs";
import Navbar from "../Navbar/Navbar";
import CoreValues from "./CoreValues/CoreValues";
import OurMission from "./OurMission/OurMission";
import "./AboutPage.css";
import ourteamimg from "../../assets/team2.png";
const Root = styled.div`
  height: 25rem;
`;

const Content = styled.div`
  padding-top: 6rem;
  padding-left: 6.5rem;
  @media screen and (max-width: 650px) {
    padding-top: 4rem;
    padding-left: 2rem;
  }
`;
const Heading = styled.div`
  width: 40%;
  font-style: normal;
  font-weight: bold;
  font-size: 45px;
  line-height: 50px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #192638;
  @media screen and (max-width: 968px) {
    width: 45%;
  }
  @media screen and (max-width: 974px) {
    width: 50%;
  }
  @media screen and (max-width: 804px) {
    width: 55%;
  }
  @media screen and (max-width: 744px) {
    width: 60%;
  }
  @media screen and (max-width: 992px) {
    width: 65%;
  }
  @media screen and (max-width: 650px) {
    font-size: 35px;
    width: 100%;
  }
`;

const Subheading = styled.div`
  margin-top: 1rem;
  width: 23%;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  display: flex;
  align-items: left;
  color: #596579;
  letter-spacing: 0.03em;
`;

const ButtonContainor = styled.div`
  margin-top: 1rem;
`;
const GetAppointment = styled.a`
  background-color: #2745f0;
  border-radius: 5px;
  padding: 1rem;
  display: inline-block;
  color: #fff;
`;

const AboutPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <Root
        style={{
          backgroundImage: `url(${aboutwall})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Content>
          <Subheading>About Us</Subheading>
          <Heading>We are here to Improve your health</Heading>
          <ButtonContainor>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <GetAppointment className="abt_get_apt_but" type="button">
                Get Appointment
              </GetAppointment>
            </Link>
          </ButtonContainor>
        </Content>
      </Root>
      <CoreValues />
      <OurMission />
      <TheyTrustedUs />

      <Footer></Footer>
    </>
  );
};

export default AboutPage;
