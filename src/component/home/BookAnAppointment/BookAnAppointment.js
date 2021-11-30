import React from "react";
import styled from "styled-components";
import Appointment from "./bookanappointment.png";
import FormComponent from "./FormComponent";

function BookAnAppointment() {
  const Container = styled.div`
    background: rgba(245, 250, 255, 1);
    display: flex;
    flex-direction: column;
  `;
  const InnerContainer = styled.div`
    display: flex;
    justify-content: center;
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
    font-weight: 700;
    font-size: 30px;
    word-spacing: 0.02rem;
    letter-spacing: 0.03rem;
  `;

  const LeftSection = styled.div`
    height: auto;
    margin-bottom: 20px;
  `;
  const RightSection = styled.div`
    height: auto;
  `;
  return (
    <div>
      <Container>
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
