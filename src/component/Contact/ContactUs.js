import React from "react";
import styled from "styled-components";
import contactwall from "../../assets/contactwall.png";
import BookAnAppointment from "../home/BookAnAppointment/BookAnAppointment";
import ContactData from "./ContactData";
import LocationContact from "./LocationContact/LocationContact";

const Root = styled.div`
  height: 25rem;
`;

const Content = styled.div`
  padding-top: 9rem;
  padding-left: 9rem;
`;
const Heading = styled.div`
  width: 30%;
  font-style: normal;
  font-weight: bold;
  font-size: 45px;
  line-height: 50px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #192638;
`;

const Subheading = styled.div`
  margin-top: 1rem;
  width: 23%;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  display: flex;
  align-items: left;
  color: #596579;
  letter-spacing: 0.03em;
`;

const BottomSection = styled.div`
  padding: 3rem 0rem 3rem 0rem;
  background-color: #f5faff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const Card = styled.div`
  width: 17rem;
  height: 6.5rem;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const Top = styled.div`
  display: flex;
  gap: 1rem;
`;

const Icon = styled.div``;
const Title = styled.div`
  color: #192638;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 0.03em;
`;
const Subtitle = styled.div`
  letter-spacing: 0.03em;
  color: #52b2e5;
  font-size: 0.85rem;
  .text-description {
    margin-bottom: 0.35rem;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ContactUs = () => {
  return (
    <div>
      <Root
        style={{
          backgroundImage: `url(${contactwall})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Content>
          <Heading>Contact us</Heading>
          <Subheading>
            Get in touch with us 24/7 anywhere <br />
            from Nepal
          </Subheading>
        </Content>
      </Root>
      <BottomSection>
        {ContactData.map((data, index) => {
          return (
            <Card>
              <Top>
                <Icon>
                  <img src={data.icon} style={{ width: "1.25rem" }} />
                </Icon>
                <Description>
                  <Title>{data.Heading}</Title>
                  <Subtitle>
                    <div className="text-description">{data.Description1}</div>
                    {data.Description2}
                  </Subtitle>
                </Description>
              </Top>
            </Card>
          );
        })}
      </BottomSection>
      <LocationContact />
      <BookAnAppointment />
    </div>
  );
};

export default ContactUs;
