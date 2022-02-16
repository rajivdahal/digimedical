import React, { useState } from "react";
import styled from "styled-components";
import logo from "./footerlogo.png";
import google from "./googleplay.png";
import qr from "./qrscanner.png";
import './Footer.css'; 
import { AiFillInstagram } from "react-icons/ai";
import { FaEnvelope, FaFacebookF, FaTwitter} from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const FooterSection = styled.div`
  background: #2745f0;
`;
const FooterContainer = styled.div`
  padding: 40px 130px;
  color: #fff;
  @media screen and (max-width: 1024px) {
    padding: 40px 80px;
  }
  @media screen and (max-width: 650px) {
    padding: 2.375rem 1.25rem;
  }
`;
const TopFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 725px) {
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
  }
`;
const LeftContainer = styled.div`
 
  @media screen and (max-width: 725px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    ul{
      li{
        &:first-of-type{
          margin-bottom: 1rem;
          text-align: center;
        }
      }
    }
  }
  ul{
    li{
      list-style:none;
      &:first-of-type{
        margin-bottom: 3rem;
      }
      &:nth-of-type(2){ 
        svg{
          font-size: 1.5rem;
          margin-right: 0.5rem;
        }
      }
    }
  }
  .location {
    margin-bottom: 1rem;
    display: flex;
    svg{
      margin-right: 1rem;
      line-height: 0;
    }
    span{
      line-height: 0;
      p{
      font-weight: 400;
      font-size: 14px;
      margin: 0;
      color: #f4f7fb;
      }
    }
    ul{
      li{
        line-height: 0; 
        p{
          font-weight: 400;
          font-size: 14px;
          margin: 0;
          color: #f4f7fb;
        }
        &:not(:last-of-type){
          margin-bottom: 5px;
        }
      }
    }
  }
  .icon {
  }
  .image {
    height: 70px;
    margin-left: -15px;
    margin-top: -20px;
  }
`;
const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  h4{
    margin-bottom: 2rem;
    font-size:20px;
    @media and screen(max-width: 767px){
      margin-bottom: 1rem;
    }
  }
  a {
    font-weight: 400;
    font-size: 0.875rem;
    cursor: pointer;
    color: #f4f7fb;
    &:not(:last-of-type){
      margin-bottom: 1rem;
    }
  }
  @media and screen(max-width: 767px){
    width: 100%;
  }
`;
const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  h4{
    font-size:20px;
    margin-bottom: 2rem;
  }
  a {
    font-weight: 400;
    font-size: 0.875rem;
    cursor: pointer;
    color: #f4f7fb;
    &:not(:last-of-type){
      margin-bottom: 1rem;
    }
  }
  &:hover {
    text-decoration: none;
  }
  @media screen and (max-width: 725px) {
    margin-top: 1rem;
    width: 100%;
  }
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  h4{
    font-size:23px;
    margin-bottom: 1.5rem;
  }
  .google {
    width: 50%;
  }
  .qr {
    height: 25vh;
  }
  @media screen and (max-width: 725px) {
    .qr {
      height: 30vh;
      width: auto;
      object-fit: contain;
    }
  }
  @media screen and (max-width: 725px) {
    margin-top: 1rem;
    width: 100%;
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
    p{
      text-align: center;
      margin-bottom: 1rem;
      color: #F4F7FB;
    };
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
  p{
    color: #E0E1E3;
  }
`;
const IconBottom = styled.div`
  display:flex;
  align-items: center;
  span.icon-container{
    font-size: 1.5rem;
    height: 30px;
    padding: 5px;
    width: 30px;
    display: flex;
    justify-content:center;
    align-items: center;
    border-radius:4px;
    background-color:#fff;
    color: #2745F0;
    &:not(:last-of-type){
      margin-right:1rem;
    }
    svg{
      height: 100%;
      width: 100%;
    }
  }
  @media screen and (max-width: 767px) {
    padding-top: 1rem;
  }
`;
const Footer = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <FooterSection>
        <FooterContainer>
          <TopFooter className="top-footer-wrapper">
            <LeftContainer className="top-footer-item"> 
            <ul>
              <li>
                <img src={logo} className="image" alt="logo"/>
              </li>
              <li>
                <div className="location">
                  {" "}
                  <MdLocationOn className="icon" />{" "}
                  <ul>
                    <li><p>Lalupate Marga, Putalisadak,</p></li>
                    <li><p>Kathmandu, Nepal</p></li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="location">
                  {" "}
                  <BsTelephoneFill className="icon" />
                  <ul>
                    <li><p>M / +977 9843346605</p></li>
                    <li><p>T / 01 5909141</p></li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="location">
                  <FaEnvelope className="icon" />
                  <span><p>info@digimedicalsewa.com</p></span>
                </div>
              </li>
            </ul>
            </LeftContainer>
            <AboutContainer className="top-footer-item">
              <h4>About Us</h4>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/services">Our Services</Link>
              <Link to="/lab-test">Lab Test</Link>
              <Link to="/">Health Packages</Link>
              <Link to="/">Special Packages</Link>
            </AboutContainer>
            <ServiceContainer className="top-footer-item">
              <h4>Services</h4>
              <a>Doctor at home</a>
              <a>24/7 Nursing service at home</a>
              <a>Online medical consultation</a>
              <a>Lab test at home</a>
              <a>PCR at home</a>
              <a>UCG/ECG/ECHO at home</a>
            </ServiceContainer>

            <RightContainer className="top-footer-item">
              <h4>Mobile App</h4>
              <img src={google} className="google" alt="google-play"/>
              <img src={qr} className="qr" alt="scan-photo"/>
            </RightContainer>
          </TopFooter>
          <BorderLine />
          <BottomFooter>
            <TopBottom>
              <p>Privacy & Policy/Terms</p>
              <IconBottom>
                <span className="icon-container">
                  <FaFacebookF/>
                </span>
                <span className="icon-container">
                  <FaTwitter/>
                </span>
                <span className="icon-container">
                  <AiFillInstagram />
                </span>
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
