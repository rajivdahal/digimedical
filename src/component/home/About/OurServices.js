import React from "react";
import styled from "styled-components";
import { data } from "./OurServicedata";
import { AiOutlineArrowRight } from "react-icons/ai";
import logo from "../WhyChooseUs/whychooseus.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const OurServiceContainer = styled.div`
  margin-top: 2.5rem;
  padding: 3rem 100px;
  @media screen and (max-width: 1210px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }


    .view_serv_home {
      float: right;
      .link_serv_home:hover {
        text-decoration: none;
      }
    
      .link_serv_home{
        display:flex;
      }
    }
    .view_serv_home p {
      font-weight: 500;
      font-size: 16px;
      line-height: 25px;
      border: 1px solid white;
      color: #2745f0;
    }

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
    font-weight: bold;
    @media screen and (max-width: 767px) {
    font-size: 1.5rem;
    }
  }
  span{
    font-size: 14px;
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
    grid-gap: 1rem;
    margin-top: 0;
  }
`;
const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 1.2rem;
  padding: 0.5rem;
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
  @media screen and (max-width: 767px) {
    grid-template-columns: auto auto;
    grid-gap: 1.2rem;
  }
`;
const ImageContainer = styled.img`
  width: 55px;
  height: 40px;
  object-fit: contain;
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
    text-align: left;
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
const OurServices = (props) => {
  const location = useLocation()
  console.log("props in our service is", location)
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
        <div className="view_serv_home">
          {
            location.pathname == "/services" ? null : <Link to="/services" className="link_serv_home">

              <p id="arrow_hosp_hom">View All</p>
              <p id="arrow_hosp_hom1">&nbsp; &#8594; </p>
            </Link>
          }

        </div>
      </OurServiceContainer>
    </div>
  );
};

export default OurServices;
