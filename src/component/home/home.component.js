import styled from "styled-components";
import wallpaper from "../../assets/wallpaper.png";
import Conection from "./Connection/Connection";
import OurPartnar from "./Ourpartner/Ourpartner";
import About from "./About/About";
import OurServices from "./About/OurServices";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import BookAnAppointment from "./BookAnAppointment/BookAnAppointment";
import TheyTrustedUs from "./TheyTrustedUs/TheyTrustedUs";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
const Root = styled.div`
  background-color: red;
  height: 33.7rem;
`;
const HeroSectionContent = styled.div`
  color: red;
  padding-top: 6rem;
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
  color: #ffffff;
`;

const SubHeading = styled.div`
  margin-top: 1rem;
  width: 23%;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  display: flex;
  align-items: left;
  color: #ffffff;
`;
const ButtonContainor = styled.div`
  margin-top: 1rem;
`;

const ReadMore = styled.a`
  margin-left: 1.5rem;
  color: white;
  border-radius: 5px;
  border-color: white;
  &:hover {
    background-color: #2745f0;
  }
`;
const GetAppointment = styled.a`
  background-color: #2745f0;
  border-radius: 5px;
`;

const ConnectionContainor = styled.div`
  .Connection {
    position: absolute;
    right: 0;
  }
`;
export const Home = (props) => {
  console.log("home");
  return (
    <>
    <Navbar></Navbar>
      <Root style={{backgroundImage: `url(${wallpaper})`,backgroundPosition: "center",backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
        <HeroSectionContent>
          <Heading>Caring Health is all Important</Heading>
          <SubHeading>
            Lorem ipsum dolor sit amet, consectetur adipisci elit. Netus eros
            dolor sapien eget. Mattis malesuada quam sed accumsan lectus{" "}
          </SubHeading>
          <ButtonContainor>
            <GetAppointment type="button" className="btn btn-primary">
              Get Appointment
            </GetAppointment>
            <ReadMore type="button" className="btn btn-outline-primary">
              Read MOre
            </ReadMore>
          </ButtonContainor>
        </HeroSectionContent>
        <ConnectionContainor>
          <Conection />
        </ConnectionContainor>
      </Root>

      <About />
      <OurServices />
      <WhyChooseUs />
      <BookAnAppointment />
      <TheyTrustedUs />
      <OurPartnar />
      <Footer></Footer>
    </>
  );
};
