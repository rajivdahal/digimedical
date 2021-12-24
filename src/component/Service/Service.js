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
`;
const Heading = styled.div`
  width: 30%;
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
      <BookAnAppointment props={props} />
      <Footer></Footer>
    </>
  );
};

export default Service;
