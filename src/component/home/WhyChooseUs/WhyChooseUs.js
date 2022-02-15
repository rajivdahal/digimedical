import React from "react";
import styled from "styled-components";
import ChooseUSPic from "./whychooseus.png";
import FeaturesData from "./FeaturesData";
import whychooseusimg from "../../../assets/whychooseusimg.png";
function WhyChooseUs() {
  const Container = styled.div`
    background: #fff;
    padding-bottom: 5rem;
    @media screen and (max-width: 799px) {
      padding-bottom: 0;
    }
  `;
  const Header = styled.div`
    left: 50%;
    display: flex;
    justify-content: center;
    // flex-direction: row-reverse;
    // font-family: Objective;
    gap: 10px;
    @media screen and (max-width: 799px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `;
  const LeftSection = styled.div`
    margin-top: 3rem;
  `;
  const RightSection = styled.div``;
  const Main = styled.div`
    font-style: normal;
    line-height: 52px;
    font-size: 38px;
    font-weight: bold;
    color: #192638;
    text-align: center;
    @media screen and (max-width: 767px){
      font-size:1.5rem;
    }
  `;

  const Sub = styled.div`
    text-align: center;
    font-size: 14px;
    color: #596579;
    font-size: 18px;
    line-height: 30px;
    word-spacing: 0.02rem;
    letter-spacing: 0.03rem;
  `;
  const Features = styled.div`
    padding: 4rem 130px;
    display: flex;
    justify-content: center;
    align-items: space-around;
    text-align: center;
    gap: 4rem;
    @media screen and (max-width: 799px) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 2.25rem;
    }
  `;

  const Card = styled.div`
    box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.05);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    width: 33.33%;
    gap: 1rem;
    padding: 2rem;
    &:hover {
      background-image: linear-gradient(180deg, #f5faff 0%, #f5faff 100%);
    }
    @media screen and (max-width: 767px){
      width: 100%;
    }
  `;

  const Icon = styled.div`
    width: 40px;
    height: 40px;
    margin: auto;
    img{
      height:100%;
      width: 100%;
      object-fit: contain;
    }
  `;

  const Title = styled.div`
    font-weight: bold;
    font-size: 18px;
    color: #192638;
    text-align: center;
    padding: 25px 0 15px 0;
  `;

  const Subtitle = styled.div`
    text-align: center;
    font-size: 13px;
    color: #7b8698;
    word-spacing: 0.02rem;
    letter-spacing: 0.03rem; 
    padding: 2px;
    line-height: 25px;
  `;

  return (
    <Container
      style={{
        backgroundImage: `url(${whychooseusimg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header>
        {/* <RightSection>
          <img src={ChooseUSPic} />
        </RightSection> */}
        <LeftSection>
          <Main>Why Choose Us?</Main>
          <Sub>
            Nepal’s online healthcare service providing company aimed to
            <br /> bring change in healthcare services
          </Sub>
        </LeftSection>
      </Header>
      <Features>
        {FeaturesData.map((data, index) => {
          return (
            <Card>
              <Icon>
                <img src={data.icon} />
              </Icon>
              <Title>{data.Heading}</Title>
              <Subtitle>{data.Description}</Subtitle>
            </Card>
          );
        })}
      </Features>
    </Container>
  );
}

export default WhyChooseUs;
