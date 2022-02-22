import styled from "styled-components";
import wallpaper from "../../assets/wallpaper.png";
import Conection from "./Connection/Connection";
import OurPartnar from "./Ourpartner/Ourpartner";
import About from "./About/About";
import OurServices from "./About/OurServices";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import BookAnAppointment from "./BookAnAppointment/BookAnAppointment";
import TheyTrustedUs from "./TheyTrustedUs/TheyTrustedUs";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Hospital_home from "../common/hospitals_home/hospitals_home.component";
import { Link } from "react-router-dom";
import Digi_doctors from "../common/doctors_home/doctors_home.component";
const Root = styled.div`
  // background-color: red;
  height: 33.7rem;
`;
const HeroSectionContent = styled.div`
  padding-top: 6rem;
  padding-left: 9rem;
  @media screen and (max-width: 650px) {
    padding-top: 4rem;
    padding-left: 2rem;
  }
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
  @media screen and (max-width: 1280px) {
    width: 50%;
    // background-color: red;
  }
  @media screen and (max-width: 1013px) {
    width: 70%;
    // background-color: red;
  }
  @media screen and (max-width: 650px) {
    font-size: 35px;
    width: 100%;
  }
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
  @media screen and (max-width: 865px) {
    width: 50%;
  }
  @media screen and (max-width: 950px) {
    width: 52%;
  }
`;
const ButtonContainor = styled.div`
  a {
    text-decoration: none;
    color: white;
  }
  margin-top: 1rem;
  display: flex;
  @media screen and (max-width: 650px) {
    margin-top: 3rem;
  }
`;

const ReadMore = styled.a`
  margin-left: 1.5rem;
  color: white;
  border-radius: 5px;
  border: 1px solid #fff;
  // border-color: white;
  height: 50px;
  padding: 0rem 1.5rem 0rem 1.5rem;
  // width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2745f0;
    border: none;
  }
  @media screen and (max-width: 650px) {
  }
`;
const GetAppointment = styled.a`
  background-color: #2745f0;
  border-radius: 5px;
  height: 50px;
  padding: 0rem 1rem 0rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const ConnectionContainor = styled.div`
  .Connection {
    position: absolute;
    right: 0;
  }
`;
export const Home = (props) => {
  console.log("home", props);
  return (
    <>
      <Navbar></Navbar>
      <Root
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <HeroSectionContent>
          <Heading>Caring Health is all Important</Heading>
          <SubHeading>
            In order to make you safe in this Pandemic era we have been
            providing different COVID related services that you can take online
            at the ease of your home
          </SubHeading>

          <ButtonContainor>
            <a href="#BookanAppointment">
              <GetAppointment type="button">Get Appointment</GetAppointment>
            </a>
            <Link to="/about">
              <ReadMore type="button">Read More</ReadMore>
            </Link>
          </ButtonContainor>

        </HeroSectionContent>
        <ConnectionContainor>
          <Conection />
        </ConnectionContainor>

      </Root>
      <About />
      <OurServices />
      <Digi_doctors></Digi_doctors>
      <WhyChooseUs />
      <div id="bookappointment">
        <BookAnAppointment history={props.history} />
      </div>
      <Hospital_home></Hospital_home>
      <TheyTrustedUs />
      {/* <OurPartnar /> */}
      <Footer></Footer>
    </>
  );
};
