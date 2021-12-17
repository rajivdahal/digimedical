import React from "react";
import styled from "styled-components";
import aboutwall from "../../assets/aboutwall.png";
import Footer from "../Footer/Footer";

import TheyTrustedUs from "../home/TheyTrustedUs/TheyTrustedUs";
import Navbar from "../Navbar/Navbar";
import CoreValues from "./CoreValues/CoreValues";
import OurMission from "./OurMission/OurMission";
const Root = styled.div`
  height: 25rem;
`;

const Content = styled.div`
  padding-top: 6rem;
  padding-left: 9rem;
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
            <GetAppointment type="button" className="btn btn-primary">
              Get Appointment
            </GetAppointment>
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
