import React from "react";
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
  padding: 30px 80px;
  color: #fff;
`;
const TopFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const LeftContainer = styled.div`
  .location {
    line-height: 30px;
    margin-bottom: 1rem;
    display: flex;
  }
  .icon {
    margin-right: 0.7rem;
    margin-top: 0.5rem;
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
`;
const BorderLine = styled.div`
  border: 0.001px solid;
  margin: 2rem;

  opacity: 0.4;
`;
const BottomFooter = styled.div`
  text-align: center;
  p {
    margin-top: 0.5rem;
  }
`;
const TopBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const IconBottom = styled.div`
  font-size: 1.5rem;
  .facebook {
    margin-right: 0.8rem;
  }
`;
const Footer = () => {
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
                  Kathamdu, Nepal
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
                <span>info@degimedical.com</span>
              </div>
            </LeftContainer>
            <AboutContainer>
              <h4>About Us</h4>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/services">Our Services</Link>
              <Link to="/lab-test">Lab Test</Link>
              <Link to="/health-packages">Health Packages</Link>
              <Link to="/special-packages">Special Packages</Link>
            </AboutContainer>
            <ServiceContainer>
              <h4>Services</h4>
              <a href="#">Doctor at home</a>
              <a href="#">24/7 Nursing service at home</a>
              <a href="#">Online medical consultation</a>
              <a href="#">Lab test at home</a>
              <a href="#">PCR at home</a>
              <a href="#">UCG/ECG/ECHO at home</a>
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
            <p>©degimedical2021 . All rights reserved. Supported by Grow Tech</p>
            <p>
              When you visit or interact with our sites, services or tools, we
              or our authorised service providers may use cookies for storing
              information
              <br />
              to help provide you with a better, faster and safer experience and
              for marketing purposes.
            </p>
          </BottomFooter>
        </FooterContainer>
      </FooterSection>
    </>
  );
};

export default Footer;
