import React from "react";
import styled from "styled-components";
import digoMediaLogo from "../../../assets/digoMediaLogo.png";
import globalLogo from "../../../assets/global.png";
const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;
const Heading = styled.div`
  font-style: normal;
  line-height: 52px;
  font-size: 38px;
`;
const SubHeading = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 30px;
  color: #596579;
`;
const Logo = styled.div`
  margin-top: 2rem;
  display: flex;
  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
  .logo {
    height: 4rem;
    margin-left: 3.5rem;
    @media screen and (max-width: 1077px) {
      margin-left: 1rem;
    }
    @media screen and (max-width: 900px) {
      height: 3.5rem;
    }
    @media screen and (max-width: 770px) {
      height: 3.3rem;
    }
    @media screen and (max-width: 650px) {
      height: 5rem;
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }
`;
const Ourpartner = () => {
  return (
    <Root>
      <Heading>Our Partners</Heading>
      <SubHeading>whom we work with</SubHeading>
      <Logo>
        <img className="logo" src={digoMediaLogo}></img>
        <img className="logo" src={digoMediaLogo}></img>
        <img className="logo" src={digoMediaLogo}></img>
        <img className="logo" src={digoMediaLogo}></img>
      </Logo>
    </Root>
  );
};

export default Ourpartner;
