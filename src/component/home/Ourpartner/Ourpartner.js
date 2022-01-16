import React from "react";
import styled from "styled-components";
import digipartner1 from "../../../assets/ourpartner3.png";
import digipartner2 from "../../../assets/ourpartner4.png";
import digipartner3 from "../../../assets/ourpartner5.png";
import digipartner4 from "../../../assets/ourpartner7.png";
import digipartner5 from "../../../assets/ourpartner1.png";
import digipartner6 from "../../../assets/ourpartner2.png";
import digipartner7 from "../../../assets/ourpartner6.png";
import digipartner8 from "../../../assets/ourpartner8.png";
import digipartner9 from "../../../assets/ourpartner9.png";
import digipartner10 from "../../../assets/ourpartner10.png";

import globalLogo from "../../../assets/global.png";
const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
  @media screen and (max-width: 650px) {
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .logo {
    height: 4rem;

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
      height: 4rem;
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
        <img className="logo" src={digipartner1}></img>
        <img className="logo" src={digipartner2}></img>
        <img className="logo" src={digipartner3}></img>
        <img className="logo" src={digipartner4}></img>
        <img className="logo" src={digipartner5}></img>
        <img className="logo" src={digipartner6}></img>
        <img className="logo" src={digipartner7}></img>
        <img className="logo" src={digipartner8}></img>
        <img className="logo" src={digipartner9}></img>
        <img className="logo" src={digipartner10}></img>
      </Logo>
    </Root>
  );
};

export default Ourpartner;
