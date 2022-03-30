import React from "react";
import styled from "styled-components";
import logo from "../../../assets/about.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const AboutUsContainer = styled.div`
  margin-top: 10rem;
  padding-left: 140px;
  padding-right: 140px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 6rem;
  @media screen and (max-width: 1077px) {
    grid-template-columns: auto;
  }
  @media screen and (max-width: 650px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const ImageContainer = styled.img`
  margin-top: 1rem;
  width: 720px;
  height: 410px;
  object-fit: contain;
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
  padding: 0.5rem;
`;
const DescriptionContainer = styled.div`
  font-weight: bold;
  span {
    font-size: 15px;
    font-weight: 500;
    line-height: 30px;
    color: #596579;
  }
  h2 {
    font-style: normal;
    line-height: 52px;
    font-size: 33.33px;
    font-weight: bold;
    @media screen and (max-width: 767px) {
      font-size: 1.5rem;
    }
    span.ques-color {
      color: #2745f0;
      font-size: 33.33px;
    }
  }
  p {
    line-height: 25px;
    text-align: justify;
    color: #7b8698;
    font-size: 15px;
    font-weight: 400;
  }
`;
const Button = styled.div`
  margin-top: 1.5rem;
  height: 50px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #2745f0;
  border-radius: 5px;
  font-size: 14px;

  &:hover {
    filter: brightness(90%);
  }
`;
const WhaiIsDegimediacal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <AboutUsContainer>
        <ImageContainer src={logo} />
        <RightContainer>
          <DescriptionContainer>
            <span>About Us</span>
            <h2>
              What is Digi Medical <span class="ques-color">?</span>
            </h2>
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
          <Link to="/about">
            <Button type="button">Read More</Button>
          </Link>
        </RightContainer>
      </AboutUsContainer>
    </>
  );
};

export default WhaiIsDegimediacal;
