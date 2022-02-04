import React from "react";
import styled from "styled-components";
import doctorAtHomewall from "../../../../assets/doctorAtHomewall.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import DoctorAtHomeForm from "./DoctorAtHomeForm";
import WhyChooseUs from "../../WhyChooseUs/WhyChooseUs";
import OurServices from "../../About/OurServices";

import FrequentlyAsked from "../../../FrequentlyAsked/FrequentlyAsked";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "./doctorAtHome.css";
const Root = styled.div`
  padding-left: 9rem;
  padding-right: 9rem;
  padding-top: 1.5rem;
  @media screen and (max-width: 650px) {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
  }
`;

const Navigate = styled.div`
  //   background-color: red;
  display: flex;
  align-items: center;

  .home {
    font-style: normal;
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 25px;
    display: flex;
    align-items: left;
    color: #8699ac;
    letter-spacing: 0.03em;
  }
  .service {
    margin-left: 0.3rem;
    font-style: normal;
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 25px;
    display: flex;
    align-items: left;
    color: #8699ac;
    letter-spacing: 0.03em;
  }
  .doctorAtHome {
    margin-left: 0.3rem;

    font-style: normal;

    font-size: 0.8rem;
    line-height: 25px;
    display: flex;
    align-items: left;
    color: #596579;
    letter-spacing: 0.03em;
    font-weight: bold;
  }
  .arrow {
    margin-left: 0.3rem;
  }
`;
const Heading = styled.div`
  margin-top: 0.6rem;
  font-style: normal;
  font-weight: bold;
  font-size: 45px;
  line-height: 50px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #192638;
  @media screen and (max-width: 650px) {
    font-size: 35px;
    margin-top: 0px;
  }
`;

const FormContainor = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Ourservices = (props) => {
  let [heading, setHeading] = useState([]);
  let history = useHistory();
  useEffect(() => {
    const paramsValue = props.match.params.subservice.split("-");
    let title = paramsValue.map((item, index) => {
      return item[0].toUpperCase() + item.substring(1);
    });
    console.log("title is", title);
    setHeading(title);
    console.log("inside useeffect");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Root
        style={{
          backgroundImage: `url(${doctorAtHomewall})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navigate>
          <span className="home"> Home</span>
          <span className="arrow">
            <MdOutlineKeyboardArrowRight />
          </span>
          <Link to="/services">
            {" "}
            <span className="service"> Service </span>
          </Link>
          <span className="arrow">
            <MdOutlineKeyboardArrowRight />
          </span>
          {heading.length
            ? heading.map((item) => {
                return <span>{item + "\xa0"}</span>;
              })
            : null}
        </Navigate>
        <Heading>
          {heading.length
            ? heading.map((item) => {
                return <span>{` ${item + "\xa0"}`}</span>;
              })
            : null}
        </Heading>
        <FormContainor>
          {!localStorage.getItem("dm-access_token") ? (
            <DoctorAtHomeForm />
          ) : (
            <p>We provide you the best doctor at home service</p>
          )}
        </FormContainor>
      </Root>
      <div className="serv-passages">
        <p className="questionheads">What is Doctor at home service?</p>
        <div className="serv-boxes">
          <p className="serv-text">
            It is said that Health is Wealth. So, to take care of our health, we
            need to consult a doctor once in a while for general health
            check-up, seasonal flu and fever, acute diseases, chronic illness
            and more. In many situations, we are physically weak and visiting a
            doctor in that condition seems like a difficult task. We’d prefer a
            doctor visiting us at our home for consultation rather than we
            having to visit them. Also, at the doctor’s clinic/ hospital there
            are different kinds of patients which makes us even more vulnerable
            to other diseases.{" "}
          </p>
          <p className="serv-text">
            To address the same need, Digi Medical has started to provide
            healthcare services at your home at reasonable costs compared to
            hospitals & nursing homes. The doctors making home visits are highly
            qualified and experienced professionals. They provide medical
            consultation and our Client Health Service Department will help you
            throughout your recovery process. Furthermore, by availing “Doctor
            at Home” service, you will be treated in the comfort of your home,
            surrounded by your family members. “Doctor at Home” service can be
            of great convenience for all.
          </p>
        </div>
        <p className="questionheads">
          When Do You Need “Doctor At Home” Service?
        </p>
        <div className="serv-boxes">
          <p className="serv-text">
            Elders at home are the ones who are in need of medical supervision
            and healthcare continuously. Not just the elders but also people
            with chronic illness who are unable to visit a hospital or prefers
            to be treated at home finds our “Doctor At Home” service very
            convenient. The problems faced by us or anyone in our circle to
            avail doctor’s consultation for them, either in a hospital or in a
            clinic, are well known. By availing Digi Medical’s “Doctor At Home
            service”, we can easily take care of our elders and our loved ones
            at the comfort of our home come. Our doctors have years of
            experience in their specialized medical field and will treat you
            with patience and compassion.
          </p>
          <p className="serv-text">
            Digimedical service is ready to serve you with our specialized and
            experienced doctors at home with doctors from various medical fields
            to take care of all your health needs. Some of the Specialist
            Doctors with us are:
          </p>
          <ul className="serv-text ul-serv">
            <li>General Physician</li>
            <li>Cardiologist</li>
            <li>Nephrologist</li>
            <li>Pulmonologist</li>
            <li>Gynecologist </li>
            <li>Pediatrician</li>
            <li>Physiotherapist</li>
            <li>Dietician</li>
            <li>Oncologist</li>
            <li>Endocrinologist</li>
            <li>Neurologist</li>
            <li>Psychiatrists</li>
            <li>Dentist</li>
            <li>Dermatologist</li>
            <li>Ophthalmologist</li>
            <li>ENT (Otorhinolaryngologist)</li>
            <li>Orthopedic</li>
            <li>Radiologist</li>
            <li>Gastroenterologist</li>
          </ul>
        </div>
        <p className="questionheads">
          Benefits of Digi Medical “Doctor At Home” service:
        </p>
        <div className="serv-boxes">
          <ol className="serv-text">
            <li>
              Availability of Quality healthcare at the comfort of your home.
            </li>
            <li>
              Saves on travelling and medical bills as our services are provided
              at your home and our consultation charges are lower or at par with
              the hospital visit charges.
            </li>
            <li>
              Personalized attention to every health need by experienced health
              professional.
            </li>
            <li>
              Home Healthcare decreases the hazard of follow-up readmission and
              death. (Source: The American Journal of Medicine)
            </li>
            <li>
              Extremely handy service in case of lack of support at home as all
              illness does not require hospitalization.
            </li>
            <li>
              Very convenient for old people as they are the ones who need
              medical attention the most and are also the ones who have most
              difficulty in travelling.
            </li>
          </ol>
        </div>
        <p className="questionheads">Cost of “Doctor At Home” Service</p>
        <div className="serv-boxes">
          <p className="serv-text">
            As the technology is upgrading, numerous healthcare apps and other
            platforms are emerging to provide online medical consultation and
            improve the quality of healthcare delivered to the people.
          </p>
          <p className="serv-text">
            Digi Medical is pioneer in providing healthcare at home and at
            workplace. Digi Medical has partnered with experienced and senior
            health professionals, major hospitals and NPHL certified
            laboratories to provide the best quality of healthcare in Nepal.
          </p>
          <p className="serv-text">
            This unique healthcare initiative is not only gaining ground over
            the globe but is also known for their value of money. The cost of
            “Doctor At Home” service is lower or at par when compared with the
            regular hospital charges. The average doctor consultation fee will
            be affordable and won’t be a burden to your pocket.
          </p>
        </div>
      </div>{" "}
      <WhyChooseUs />
      <FrequentlyAsked />
      {/* <OurServices /> */}
      <Footer />
    </>
  );
};

export default Ourservices;
