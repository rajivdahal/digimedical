import React from "react";
import styled from "styled-components";
import circleicon from "../../../assets/circleicon.png";
import { data } from "./CoreValueData";

const Root = styled.div`
  //   margin-top: 2rem;
  padding-left: 9rem;
  padding-right: 9rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 5rem;
  text-align: center;
`;
const Content = styled.div``;
const Title = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  color: #596579;
  letter-spacing: 0.03em;
`;
const Heading = styled.div`
  font-style: normal;
  line-height: 52px;
  font-size: 38px;
`;
const Deatial = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  color: #596579;
  letter-spacing: 0.03em;
`;
const Feature = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`;
const BoxContainpr = styled.div`
  padding: 1.5rem 1.5rem 1.5rem 0rem;
  display: flex;
  align-items: center;
  text-align: left;
  width: 45%;
  background: #f5faff;
  border-radius: 10px;
  .title-deatial-div {
    margin-left: 1.5rem;
  }
  .logo {
  }
  .title {
    color: #192638;
    letter-spacing: 0.01em;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.01em;
    line-height: 24px;
  }
  .detail {
    color: #7b8698;
    font-size: 0.9rem;
    line-height: 24px;
    margin-top: 1rem;
  }
`;
const ImageContainer = styled.img`
  margin-left: -1.8rem;
  height: 3.5rem;
`;

const CoreValues = () => {
  return (
    <Root>
      <Content>
        <Title>Core Values</Title>
        <Heading>Core Values we preserve</Heading>
      </Content>
      <Deatial>
        Digimedical sewa stand with friendly interface with idea to
      </Deatial>
      <Deatial>digitize Nepal’s medical service.</Deatial>
      {data.map((item) => {
        return (
          <Feature>
            <BoxContainpr>
              <ImageContainer src={circleicon} />
              <div className="title-deatial-div">
                <div className="title">{item.title1}</div>
                <div className="detail">{item.description1}</div>
              </div>
            </BoxContainpr>
            <BoxContainpr>
              <ImageContainer src={circleicon} />
              <div className="title-deatial-div">
                <div className="title">{item.title2}</div>
                <div className="detail">{item.description2}</div>
              </div>
            </BoxContainpr>
          </Feature>
        );
      })}
    </Root>
  );
};

export default CoreValues;
