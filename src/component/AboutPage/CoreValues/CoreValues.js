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
  @media screen and (max-width: 1176px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  @media screen and (max-width: 650px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
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
  @media screen and (max-width: 650px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0rem;
  }
`;
const BoxContainpr = styled.div`
  padding: 1.5rem 1.5rem 1.5rem 1rem;
  display: flex;
  align-items: center;
  text-align: left;
  width: 45%;
  background: #f5faff;
  border-radius: 10px;
  @media screen and (max-width: 650px) {
    width: 100%;
    margin-top: 1.5rem;
  }

  .title-deatial-div {
    width: 80%;
    margin-left: 2rem;
  }
  .logo {
  }
  .title {
    margin-left: 0px;
    color: #192638;
    letter-spacing: 0.01em;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.01em;
    line-height: 24px;
  }
  .detail {
    margin-left: 0px;
    color: #7b8698;
    font-size: 0.9rem;
    line-height: 24px;
    margin-top: 1rem;
  }
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
              <div
                style={{
                  height: "4.5rem",
                  width: "5rem",
                  borderRadius: "50%",
                  backgroundColor: "#52B2E5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  class="fas fa-clipboard-check"
                  style={{ fontSize: "30px", color: "white" }}
                ></i>
              </div>
              <div className="title-deatial-div">
                <div className="title">{item.title1}</div>
                <div className="detail">{item.description1}</div>
              </div>
            </BoxContainpr>
            <BoxContainpr>
              <div
                style={{
                  height: "4.5rem",
                  width: "5rem",
                  borderRadius: "50%",
                  backgroundColor: "#52B2E5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  class="fas fa-clipboard-check"
                  style={{ fontSize: "30px", color: "white" }}
                ></i>
              </div>
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
