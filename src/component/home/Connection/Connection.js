import React from "react";
import styled from "styled-components";
import ConnectionWall from "../../../assets/ConnectionWall.png";
import smile from "../../../assets/smile.png";
import doctor from "../../../assets/doctor.png";
import hospital from "../../../assets/hospital.png";
import medical from "../../../assets/medical.png";
import CountUp from "react-countup";
const Root = styled.div`
  position: absolute;
  // align-items: center;
  // transform: translate(180px);
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  left: 0;
  right: 0;

  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 6rem 1.5rem 6rem;
  border-radius: 5px;
  width: 66%;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1205px) {
    margin-top: 5rem;
  }
  @media screen and (max-width: 1189px) {
    margin-top: 4rem;
  }
  @media screen and (max-width: 950px) {
    margin-top: 7rem;
  }
  @media screen and (max-width: 905px) {
    padding: 1.5rem 3rem 1.5rem 3rem;
  }
  @media screen and (max-width: 725px) {
    padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  }
  @media screen and (max-width: 727px) {
    margin-top: 5rem;
  }
  @media screen and (max-width: 650px) {
    margin-top: 10rem;
    width: 80%;
  }
  @media screen and (max-width: 617px) {
    margin-top: 9rem;
  }
  @media screen and (max-width: 547px) {
    margin-top: 5rem;
  }
  @media screen and (max-width: 540px) {
    width: 95%;
    padding: 1.5rem 1rem 1.5rem 1rem;
  }
  @media screen and (max-width: 484px) {
    margin-top: 4rem;
  }
`;

const HappyClient = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    width: 2.3rem;
    @media screen and (max-width: 650px) {
      width: 2rem;
    }
    @media screen and (max-width: 475px) {
      width: 1.6rem;
    }
  }
  .counter {
    margin-top: 0.5rem;
    font-style: normal;
    font-weight: bold;
    font-size: 1.7rem;
    line-height: 42px;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #374253;
    @media screen and (max-width: 650px) {
      font-size: 1.3rem;
    }
    // @media screen and (max-width: 475px) {
    //   font-size: 1rem;
    // }
  }
  .subtitle {
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #596579;
  }
`;

const Doctor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    width: 2.3rem;
    @media screen and (max-width: 650px) {
      width: 2rem;
    }
    // @media screen and (max-width: 475px) {
    //   width: 1.6rem;
    // }
  }
  .counter {
    margin-top: 0.5rem;
    font-style: normal;
    font-weight: bold;
    font-size: 1.7rem;
    line-height: 42px;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #374253;
    @media screen and (max-width: 650px) {
      font-size: 1.3rem;
    }
    // @media screen and (max-width: 475px) {
    //   font-size: 1rem;
    // }
  }
  .subtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #596579;
  }
`;
const Hospital = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    width: 2.3rem;
    @media screen and (max-width: 650px) {
      width: 2rem;
    }
    @media screen and (max-width: 475px) {
      width: 1.6rem;
    }
  }
  .counter {
    margin-top: 0.5rem;
    font-style: normal;
    font-weight: bold;
    font-size: 1.7rem;
    line-height: 42px;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #374253;
    @media screen and (max-width: 650px) {
      font-size: 1.3rem;
    }
  }
  .subtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #596579;
  }
`;
const MedicalIndustries = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    width: 2.3rem;
    @media screen and (max-width: 650px) {
      width: 2rem;
    }
    @media screen and (max-width: 475px) {
      width: 1.6rem;
    }
  }
  .counter {
    margin-top: 0.5rem;
    font-style: normal;
    font-weight: bold;
    font-size: 1.7rem;
    line-height: 42px;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #374253;
    @media screen and (max-width: 650px) {
      font-size: 1.3rem;
    }
  }
  .subtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #596579;
  }
`;
const Conection = () => {
  return (
    <Root
      style={{
        backgroundImage: `url(${ConnectionWall})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HappyClient>
        <img src={smile} className="icon"></img>
        <span className="counter">
          <CountUp end={1000} duration={3} />+
        </span>
        <span className="subtitle">Happy clients</span>
      </HappyClient>
      <Doctor>
        <img src={doctor} className="icon"></img>
        <span className="counter">
          <CountUp end={100} duration={2} />+
        </span>
        <span className="subtitle">Doctors</span>
      </Doctor>
      <Hospital>
        <img src={hospital} className="icon"></img>
        <span className="counter">
          <CountUp end={50} duration={1} />+
        </span>
        <span className="subtitle">Hospitals</span>
      </Hospital>
      <MedicalIndustries>
        <img src={medical} className="icon"></img>
        <span className="counter">
          {" "}
          <CountUp end={300} duration={2} />+
        </span>
        <span className="subtitle">Medical Industries</span>
      </MedicalIndustries>
    </Root>
  );
};

export default Conection;
