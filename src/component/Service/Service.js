import React from "react";
import styled from "styled-components";
import servicewall from "../../assets/servicewall.png";
import Footer from "../Footer/Footer";
import OurServices from "../home/About/OurServices";
import BookAnAppointment from "../home/BookAnAppointment/BookAnAppointment";
import Navbar from "../Navbar/Navbar";
import EmergencyNumber from "./EmergencyNumber/EmergencyNumber";
const Root = styled.div`
  height: 25rem;
`;
const Content = styled.div`
  padding-top: 9rem;
  padding-left: 9rem;
  @media screen and (max-width: 650px) {
    padding-top: 8rem;
    padding-left: 2rem;
  }
`;
const Heading = styled.div`
  width: 30%;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 64px;
  display: flex;
  align-items: center;

  color: #192638;
  @media screen and (max-width: 1077px) {
    width: 100%;
  }
  @media screen and (max-width: 650px) {
    font-size: 35px;
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
  @media screen and (max-width: 960px) {
    width: 30%;
  }
  @media screen and (max-width: 960px) {
    width: 35%;
  }
  @media screen and (max-width: 680px) {
    width: 40%;
  }
  @media screen and (max-width: 500px) {
    width: 50%;
  }
  @media screen and (max-width: 500px) {
    width: 70%;
  }
`;

const Service = (props) => {
  return (
    <>
      <Navbar></Navbar>
      <Root
        style={{
          backgroundImage: `url(${servicewall})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Content>
          <Heading>Our Services</Heading>
          <Subheading>
            We offer best health service at resonable price.
          </Subheading>
        </Content>
      </Root>
      <OurServices />
      <EmergencyNumber />
      <div style={{ marginTop: "6rem" }}>
        {" "}
        <BookAnAppointment props={props} />
      </div>

      <div style={{ marginTop: "6rem" }}>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Service;
