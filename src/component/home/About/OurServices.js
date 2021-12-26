import React from "react";
import styled from "styled-components";
import { data } from "./OurServicedata";
import { AiOutlineArrowRight } from "react-icons/ai";
import logo from "../WhyChooseUs/whychooseus.png";
import { Link } from "react-router-dom";

const OurServiceContainer = styled.div`
  margin-top: 2.5rem;
  padding-right: 140px;
  padding-left: 140px;
  padding-top: 3rem;
  padding-bottom: 3rem;
  @media screen and (max-width: 1210px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
  color: #596579;
  h2 {
    color: #192638;
    margin-top: 0.8rem;
    font-style: normal;
    line-height: 52px;
    font-size: 38px;
  }
`;
const ServiceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
  margin-top: 2rem;
  @media screen and (max-width: 1077px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 1.2rem;
  padding: 1rem 0.5rem 0.5rem 1rem;
  position: relative;
  top: 0;
  transition: top ease 0.3s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 10px;
    background-image: url(${logo});
    background-color: #def4ef;
    top: -5px;
    h3 {
      color: #2745f0;
    }
    p {
      color: #7b8698;
    }
  }
`;
const ImageContainer = styled.img`
  height: 30px;
  width: 35px;
  margin-top: 0.2rem;
`;
const DescriptionContainer = styled.div`
  h3 {
    color: #192638;
    letter-spacing: 0.01em;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.01em;
    line-height: 24px;
  }
  p {
    color: #7b8698;
    font-size: 0.9rem;
    line-height: 24px;
    letter-spacing: 0.02em;
  }
`;
const View = styled.a`
  display: flex;
  justify-content: flex-end;
  font-size: 0.9rem;
  font-weight: bold;
  color: #2745f0;
  cursor: pointer;
  margin-top: 1.5rem;
  &:hover {
    text-decoration: none;
  }
  .arrow {
    margin-left: 0.5rem;
  }
`;
const OurServices = () => {
  return (
    <div>
      <OurServiceContainer>
        <HeadingContainer>
          <span>Our Services</span>
          <h2>What We Offer</h2>
        </HeadingContainer>
        <ServiceContainer>
          {data.map((item) => {
            return (
              <Link
                to={item.link}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ServicesContainer>
                  <ImageContainer src={item.img} />
                  <DescriptionContainer>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </DescriptionContainer>
                </ServicesContainer>
              </Link>
            );
          })}
        </ServiceContainer>
        <View>
          ViewAll <AiOutlineArrowRight className="arrow" />
        </View>
      </OurServiceContainer>
    </div>
  );
};

export default OurServices;
