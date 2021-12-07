import React from "react";
import styled from "styled-components";
import Appointment from "./bookanappointment.png";
import FormComponent from "./FormComponent";
import servicewall from "../../../assets/servicewall.png";

function BookAnAppointment() {
  const Container = styled.div`
    padding-left: 8.75rem;
    padding-right: 8.75rem;
    padding-bottom: 2rem;
    // margin-bottom: 2rem;
    background: rgba(245, 250, 255, 1);
    display: flex;
    flex-direction: column;
  `;
  const InnerContainer = styled.div`
    display: flex;
    // justify-content: center;
    gap: 3rem;
    @media screen and (max-width: 799px) {
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
  `;

  const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
  `;
  const TopHeader = styled.div`
    color: #596579;
    font-size: 14px;
    font-weight: 500;
    word-spacing: 0.02rem;
    letter-spacing: 0.03rem;
  `;
  const BottomHeader = styled.div`
    color: #192638;
    font-style: normal;
    line-height: 52px;
    font-size: 38px;
  `;

  const LeftSection = styled.div`
    width: 60%;
    // height: auto;
    // margin-bottom: 20px;
  `;
  const RightSection = styled.div`
    // height: auto;
  `;
  return (
    <div id="BookanAppointment">
      <Container
      // style={{
      //   backgroundImage: `url(${servicewall})`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // }}
      >
        <Header>
          <TopHeader>We are here for you</TopHeader>
          <BottomHeader>Book an Appointment</BottomHeader>
        </Header>
        <InnerContainer>
          <LeftSection>
            <FormComponent />
          </LeftSection>
          <RightSection>
            <img src={Appointment} style={{ width: "400px" }} />
          </RightSection>
        </InnerContainer>
      </Container>
    </div>
  );
}

export default BookAnAppointment;
