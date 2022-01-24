import React, { useEffect } from "react";
import styled from "styled-components";
import "./whatisdoctorAtHomeService.css";
import { whatIsMapper } from "./utilsFile";
import { detailsFeature } from "./utilsFile";

const Root = styled.div`
  padding-left: 9rem;
  padding-right: 9rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  @media screen and (max-width: 800px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  @media screen and (max-width: 650px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const ContentContainor = styled.div``;
const Heading = styled.div`
  font-style: normal;
  line-height: 52px;
  font-size: 38px;
  color: #192638;
  text-align: center;
`;
const Details = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  font-style: normal;
  font-weight: normal;
  font-size: 0.9rem;
  line-height: 1.4rem;
  color: #596579;
  background: #f5faff;
  border: 1px solid #d0d7e2;
  box-sizing: border-box;
`;

const WhatisdoctorAtHomeService = (props) => {
  const heading = props.heading
  const params = props.params
  const description = whatIsMapper(params)
  const details=detailsFeature(params)
  useEffect(()=>{
    let dom=document.getElementById("render")
    const element = new DOMParser().parseFromString(details, 'text/html');
    const child = element.documentElement.querySelector('body');
    child.style.color = 'gray';
    dom.appendChild(child)
  },[])
  return (
    <Root>
      <ContentContainor>
        <Heading>What is {
          heading.length ? heading.map((item) => {
            return <span>{` ${item + '\xa0'}`}</span>
          }) : null
        } service?</Heading>
        <Details>
          {description}

        </Details>

        <Heading>{
          heading.length ? heading.map((item) => {
            return <span>{` ${item + '\xa0'}`}</span>
          }) : null
        }  Details or Features </Heading>
        <Details>
          <div id="render"></div>

          {/* You don't have to leave the home, though the doctor will come to your
          home and assess,diagnose and treat you depending on the condition of
          your health. Our experienced doctors have years of experience in their
          specialized medical field and will treat you with patience and
          compassion. Digimedical service is ready to serve you with our
          specialized and experienced doctors of different medical fields like:
          <ul className="ul_docathome_feat">
            <li>General Physician/ Surgeon</li>
            <li>Community Medicine</li>
            <li>Cardiologist</li>
            <li>Nephrologist</li>
            <li>Pulmonologist</li>
            <li>Obstetrician and Gynecologist</li>
            <li>Pediatrician</li>
            <li>Physiotherapist</li>
            <li>Oncologist</li>
            <li>Endocrinologist</li>
            <li>Neurologist</li>
            <li>Psychiatrists</li>
            <li>Dentist</li>
            <li>Dermatologist</li>
            <li>Ophthalmologist</li>
            <li>ENT (Otorhinolaryngologist)</li>
            <li>Orthopedic</li>
            <li>Radiologist</li>
            <li>Rheumatologist</li>
            <li>Gastroenterologist</li>
            <li>Haematologist</li>
            <li>General medicine </li>
          </ul> */}
        </Details>
      </ContentContainor>
    </Root>
  );
};

export default WhatisdoctorAtHomeService;
