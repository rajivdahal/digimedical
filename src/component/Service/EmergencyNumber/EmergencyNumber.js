import React from "react";
import styled from "styled-components";
import Emergencywall from "../../../assets/Emergencywall.png";
const Root = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
`;
const Heading = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 52px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`;
const Deatail = styled.div`
  font-weight: bold;
  font-size: 2rem;
  line-height: 52px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`;
const EmergencyNumber = () => {
  return (
    <Root
      style={{
        backgroundImage: `url(${Emergencywall})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Heading>Do you need Emergency Medical care?</Heading>
      <Deatail>Call 01-5909141</Deatail>
    </Root>
  );
};

export default EmergencyNumber;
