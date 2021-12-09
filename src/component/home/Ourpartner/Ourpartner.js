import React from "react";
import styled from "styled-components";
import digoMediaLogo from "../../../assets/digoMediaLogo.png";
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
  .logo {
    height: 4rem;
    margin-left: 3.5rem;
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
