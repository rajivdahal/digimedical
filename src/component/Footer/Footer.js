import React, { useState } from "react";
import styled from "styled-components";
import logo from "./footerlogo.png";
import google from "./googleplay.png";
import qr from "./qrscanner.png";
import { FaFacebookSquare, FaTwitterSquare, FaInstagram } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { BsTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const FooterSection = styled.div`
  background: #2745f0;
`;
const FooterContainer = styled.div`
  padding: 40px 130px;
  color: #fff;
  @media screen and (max-width: 1024px) {
    padding: 40px 100px;
  }
  @media screen and (max-width: 650px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const TopFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1024px) {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 16px;
  }
  @media screen and (max-width: 725px) {
    text-align: center;
    display: flex;
    flex-direction: column;
  }
`;
const LeftContainer = styled.div`
  @media screen and (max-width: 725px) {
    display: flex;
    flex-direction: column;

    align-items: center;
  }
  .location {
    line-height: 30px;
    margin-bottom: 1rem;
    display: flex;
  }
  .icon {
    margin-right: 0.7rem;
    margin-top: 0.5rem;
  }
  .image {
    height: 70px;
  }
`;
const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  a {
    padding: 0.4rem;
    font-size: 0.9rem;
    cursor: pointer;
    color: #fff;
  }
`;
const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  a {
    padding: 0.4rem;
    font-size: 0.9rem;
    cursor: pointer;
    color: #fff;
  }
  &:hover {
    text-decoration: none;
  }
  @media screen and (max-width: 725px) {
    margin-top: 1rem;
  }
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .google {
    width: 50%;
  }
  .qr {
    height: 25vh;
  }
  @media screen and (max-width: 725px) {
    .qr {
      height: 40vh;
    }
  }
  @media screen and (max-width: 725px) {
    margin-top: 1rem;
  }
`;
const BorderLine = styled.div`
  border: 0.001px solid;
  margin-top: 2rem;
  margin-bottom: 1.5rem;

  opacity: 0.4;
`;
const BottomFooter = styled.div`
  text-align: center;
  p {
    margin-top: 0.5rem;
  }
  .paraSection {
    margin-top: 2rem;
  }
  @media screen and (max-width: 768px) {
    text-align: justify;
    p {
      margin-top: 1rem;
    }
  }
`;
const TopBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const IconBottom = styled.div`
  font-size: 1.5rem;
  .facebook {
    margin-right: 0.8rem;
  }
`;
const Footer = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <FooterSection>
        <FooterContainer>
          <TopFooter>
            <LeftContainer>
              <img src={logo} className="image" />

              <div className="location">
                {" "}
                <HiOutlineLocationMarker className="icon" />{" "}
                <span>
                  Lalupate Marga, Putalisadak,
                  <br />
                  Kathmandu, Nepal
                </span>
              </div>
              <div className="location">
                {" "}
                <BsTelephoneFill className="icon" />
                <span>
                  M / +977 9843346605 <br />T / 01 5909141
                </span>
              </div>
              <div className="location">
                <HiOutlineMail className="icon" />
                <span>info@digimedicalsewa.com</span>
              </div>
            </LeftContainer>
            <AboutContainer>
              <h4>About Us</h4>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/services">Our Services</Link>
              <Link to="/lab-test">Lab Test</Link>
              <Link to="/">Health Packages</Link>
              <Link to="/">Special Packages</Link>
            </AboutContainer>
            <ServiceContainer>
              <h4>Services</h4>
              <a >Doctor at home</a>
              <a >24/7 Nursing service at home</a>
              <a >Online medical consultation</a>
              <a >Lab test at home</a>
              <a >PCR at home</a>
              <a >UCG/ECG/ECHO at home</a>
            </ServiceContainer>

            <RightContainer>
              <h4>Mobile App</h4>
              <img src={google} className="google" />
              <img src={qr} className="qr" />
            </RightContainer>
          </TopFooter>
          <BorderLine />
          <BottomFooter>
            <TopBottom>
              <p>Privacy & Policy/Terms</p>
              <IconBottom>
                <FaFacebookSquare className="facebook" />
                <FaTwitterSquare className="facebook" />
                <FaInstagram />
              </IconBottom>
            </TopBottom>
            <div className="paraSection">
              <p>
                ©DigimedicalSewa2022 . All rights reserved. Supported by Grow Tech
              </p>
              <p>
                When you visit or interact with our sites, services or tools, we
                or our authorised service providers may use cookies for storing
                information
                <br />
                to help provide you with a better, faster and safer experience
                and for marketing purposes.
              </p>
            </div>
          </BottomFooter>
        </FooterContainer>
      </FooterSection>
    </>
  );
};

export default Footer;
