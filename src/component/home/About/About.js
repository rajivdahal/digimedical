import React from "react";
import styled from "styled-components";
import logo from "../../../assets/about.png";
const AboutUsContainer = styled.div`
  margin-top: 8rem;
  padding-left: 140px;
  padding-right: 140px;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 60px;
  @media screen and (max-width: 1077px) {
    grid-template-columns: auto;
  }
  @media screen and (max-width: 650px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const ImageContainer = styled.img`
  width: 555px;
  height: 355px;
  @media screen and (max-width: 1260px) {
    width: 460px;
    height: 300px;
  }
  @media screen and (max-width: 1184px) {
    width: 410px;
    height: 300px;
  }
  @media screen and (max-width: 1150px) {
    width: 400px;
    height: 300px;
  }
  @media screen and (max-width: 1143px) {
    width: 360px;
    height: 270px;
  }
  @media screen and (max-width: 1077px) {
    width: 100%;
    height: auto;
  }
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const DescriptionContainer = styled.div`
  margin: 0.5rem;
  font-weight: bold;
  span {
    font-size: 0.9rem;
    line-height: 30px;
    color: #596579;
  }
  h2 {
    font-style: normal;
    line-height: 52px;
    font-size: 38px;
  }
  p {
    line-height: 25px;
    text-align: justify;
    color: #7b8698;
    font-size: 0.9rem;
    font-weight: 300;
  }
`;
const Button = styled.div`
  height: 50px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #2745f0;
  border-radius: 5px;
`;
const WhaiIsDegimediacal = () => {
  return (
    <>
      <AboutUsContainer>
        <ImageContainer src={logo} />
        <RightContainer>
          <DescriptionContainer>
            <span>About Us</span>
            <h2>What is Digimedical ?</h2>
            <p>
              Digi Medical Sewa is an emerging healthcare service established to
              provide world-class quality health care to the citizen of Nepal
              without compromising quality from the comfort of your home. We
              provide preventive, promotive, and curative services to maintain
              quality of life with an entirely new concept of hassle-free,
              convenient, and high-quality healthcare services at patient's
              doorsteps.
              <br />
              <br />
              The idea of providing effective medical services that fulfill the
              community's needs of affordable yet quality healthcare solutions
              is Digi Medical's sole concern. We are professionals at work; we
              uphold human values.
            </p>
          </DescriptionContainer>
          <Button type="button">Read More</Button>
        </RightContainer>
      </AboutUsContainer>
    </>
  );
};

export default WhaiIsDegimediacal;