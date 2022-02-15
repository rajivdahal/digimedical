import React from "react";
import styled from "styled-components";

import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import DoctorAtHomeForm from "../Our Services/ourServicesForm";
import doctorAtHomewall from "../../../assets/doctorAtHomewall.png";
import Timechart_fb from "../../../assets/forbusinesstime.png";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import "./forbusiness.css";
const Root = styled.div`
  height: 30rem;
`;
const Content = styled.div`
  padding-top: 9rem;
  padding-left: 9rem;
  @media screen and (max-width: 650px) {
    padding-top: 8rem;
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
  color: #192638;
  @media screen and (max-width: 1077px) {
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
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  display: flex;
  align-items: left;
  color: #596579;
  letter-spacing: 0.03em;
  @media screen and (max-width: 960px) {
    width: 30%;
  }
  @media screen and (max-width: 960px) {
    width: 35%;
  }
  @media screen and (max-width: 680px) {
    width: 40%;
  }
  @media screen and (max-width: 500px) {
    width: 50%;
  }
  @media screen and (max-width: 500px) {
    width: 70%;
  }
`;
function forbusiness() {
  return (
    <div>
      <Navbar />
      <Root
        style={{
          backgroundImage: `url(${doctorAtHomewall})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Content>
          <Heading>For Business</Heading>
          <Subheading></Subheading>
        </Content>
      </Root>
      <div className="content-business">
        <div className="mid-container">
          <p className="question">
            PROTECTING YOUR MAJOR ASSET: EMPLOYEE HEALTH
          </p>

          <div className="boxfortext1">
            <p id="text3">
              Productivity crisis, Absenteeism and the cost related to it, etc.
              are increasing in most of the parts of world as suggested by IMF,
              ILO and other reputed International Organisations. An Employer has
              to bear the loss resulting from low productivity, absenteeism,
              etc. Employers know that by proactively supporting the health of
              their employees they’re able to reduce absenteeism, increase
              engagement and improve productivity. The focus has shifted to a
              broader view of workforce health, including the physical, mental,
              work and life components of health.
            </p>
          </div>
          <p className="question">
            What is employee health and wellbeing going to cost my company?
          </p>

          <div className="boxfortext1">
            <p id="text3">
              The relevant question is, what is a lack of prioritizing it going
              to cost you? Rising healthcare costs and health-related absences
              are constant challenges for employers. In the U.S., the costs of
              poor employee health totals $530 billion a year for employers.
              This cost includes things such as lost productivity due to worker
              absence, chronic conditions that cause impaired performance, and
              workers’ compensation.<br></br>
              <br></br>
              It’s important to note that these absences are not just a result
              of sickness. Stress, burnout, and low engagement levels are all
              major challenges posed by poor overall health. A joint study by
              The Conference Board, Sirota-Mercer, Deloitte, ROI, The Culture
              Works and Consulting LLP, found that disengaged workers cost
              American companies $550 billion a year.<br></br>
              <br />
              The importance of employee health cannot be overstated. It goes
              beyond smooth day-to-day operations. For a business to succeed,
              its people need to be mentally and physically healthy — after all,
              it’s hard to be productive when you’re not well.<br></br>
              <br />
              Taking care of your employees’ health in the workplace is not only
              beneficial to them; it also creates an effective and efficient
              working environment that benefits the business. Employee health
              and productivity go hand in hand: A mentally and physically
              healthy individual is more optimistic, creative, and motivated.
              Digi Medical provides annual employee health screening tests and
              health services for your employees to make your staff aware of
              underlying health issues and prevent bigger health problems down
              the line.
            </p>
          </div>
          <p className="question">
            Benefits of Corporate Healthcare Package for Employers
          </p>

          <div className="boxfortext1">
            <ul className="ul-fb">
              <li>
                At Digimedical, you can connect with our expert physicians and
                specialists on an average of 15 minutes.
              </li>
              <li>
                On Demand access to healthcare; Members can request for a
                consultation by visit, phone or video chat.
              </li>
              <li>Health records are safe, private and confidential.</li>
              <li>
                Reduces Employees Sick Days- Minimises time off from work or
                away from Family.
              </li>
              <li>
                Complete Confidentiality is maintained regarding member’s
                medical condition and discussion with doctor
              </li>
              <li>Increased productivity, employee retention </li>
              <li>Reduced absenteeism and costs related to it.</li>
              <li>
                Organisation will be recognised as having a healthy workplace.
              </li>
            </ul>
          </div>
          <p className="question">
            Time Needed For Health Service Using Digimedical
          </p>
          <div className="timechart-fb">
            <img src={Timechart_fb} alt="" />
          </div>
          <p className="question">Facts About Digimedical</p>
          <div className="brochure-fb">
            <ul className="ul-fb">
              <li>
                2% of the Capital spent on workforce is lost to disability,
                absenteeism and attendance arising from chronic diseases. –
                (Source: PricewaterhouseCoopers)
              </li>
              <li>
                Rs. 1 spent on prevention saves Rs. 133 in absenteeism costs and
                Rs. 6.62 in healthcare costs. – (Source: ASSOCHAM)
              </li>
              <li>
                Preventive Healthcare and Wellness Programs can change employee
                behaviour, improve their bio-metric risk profile and work
                productivity. – (Source: ASSOCHAM){" "}
              </li>
              <li>
                Employees undertaking regular health check-ups have 45% lesser
                absenteeism and their medical reimbursements are 20% less. –
                (Source: ASSOCHAM)
              </li>
              <li>
                {" "}
                70% of the health issues can be handled online and only 30%
                issues require a patient to visit a doctor. – (Source: National
                Ambulatory Medical Care Survey 2006)
              </li>
              <li>
                As of Sept., 2016, total healthcare personnel including doctors,
                nurses and midwives in Nepal was 3.15 per 1,000 population. –{" "}
              </li>
              (Source: International Labour Organisation)
              <li>Better Care for Employees, Better Saving for Companies.</li>
              <li>Best care starts when you download our App.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default forbusiness;
