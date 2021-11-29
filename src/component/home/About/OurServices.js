import React from "react";
import styled from "styled-components";
import { data } from "./OurServicedata";
import { AiOutlineArrowRight } from "react-icons/ai";

const OurServiceContainer = styled.div`
  margin-top: 2.5rem;
  padding-right: 130px;
  padding-left: 130px;
  padding-top: 3rem;
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
  grid-template-columns: auto auto auto;
  grid-gap: 50px;
  margin-top: 2rem;
`;
const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 1.2rem;
`;
const ImageContainer = styled.img`
  height: 35px;
  width: 38px;
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
    font-size: 1rem;
    line-height: 24px;
  }
`;
const View = styled.a`
  display: flex;
  justify-content: flex-end;
  margin: 0.2rem;
  color: #2745f0;
  cursor: pointer;
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
              <ServicesContainer>
                <ImageContainer src={item.img} />
                <DescriptionContainer>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </DescriptionContainer>
              </ServicesContainer>
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
