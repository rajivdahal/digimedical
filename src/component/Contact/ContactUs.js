import React from "react";
import styled from "styled-components";
import contactwall from "../../assets/contactwall.png";
import Footer from "../Footer/Footer";
import BookAnAppointment from "../home/BookAnAppointment/BookAnAppointment";
import Navbar from "../Navbar/Navbar";
import ContactData from "./ContactData";
import LocationContact from "./LocationContact/LocationContact";

const Root = styled.div`
  height: 30rem;
`;

const Content = styled.div`
  padding-top: 9rem;
  padding-left: 6.5rem;
  @media screen and (max-width: 650px) {
    padding-top: 8rem;
    padding-left: 2rem;
  }
`;
const Heading = styled.div`
  width: 30%;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #192638;
  @media screen and (max-width: 964px) {
    width: 100%;
  }
  @media screen and (max-width: 650px) {
    font-size: 35px;
  }
`;

const Subheading = styled.div`
  margin-top: 1rem;
  width: 23%;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 25px;
  display: flex;
  align-items: left;
  color: #596579;
  letter-spacing: 0.03em;
  @media screen and (max-width: 1231px) {
    width: 25%;
  }
  @media screen and (max-width: 1145px) {
    width: 27%;
  }
  @media screen and (max-width: 1077px) {
    width: 30%;
  }
  @media screen and (max-width: 460px) {
    width: 40%;
  }
`;

const BottomSection = styled.div`
  margin-top: 6rem;
  padding: 3rem 0rem 3rem 0rem;
  background-color: #f5faff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  @media screen and (max-width: 999px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
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
  @media screen and (max-width: 999px) {
    width: 20rem;
  }
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

const ContactUs = (props) => {
  console.log("props in contact us", props);
  return (
    <div>
      <Navbar></Navbar>
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
      <div style={{ marginBottom: "6rem" }}>
        <BookAnAppointment props={props} />
      </div>

      <Footer></Footer>
    </div>
  );
};

export default ContactUs;
