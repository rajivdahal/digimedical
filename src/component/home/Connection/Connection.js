import React from "react";
import styled from "styled-components";
import ConnectionWall from "../../../assets/ConnectionWall.png";
import smile from "../../../assets/smile.png";
import doctor from "../../../assets/doctor.png";
import hospital from "../../../assets/hospital.png";
import medical from "../../../assets/medical.png";
import CountUp from "react-countup";
import "./connection.css";
const Root = styled.div`
  position: absolute;
  // align-items: center;
  // transform: translate(180px);
  margin-left: auto;
  margin-right: auto;
  ${'' /* margin-top: 5rem; */}
  left: 0;
  right: 0;
  bottom: -10%;
  transform: translateY(10%);

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
    margin-top: 1rem;
    bottom: -80px;
  }

  @media screen and (max-width: 480px) {
    // flex-wrap: wrap;
  }
`;

const HappyClient = styled.div`
  width: 25%;
  .icon {
    width: 2.3rem;
    margin: auto;
    @media screen and (max-width: 650px) {
      width: 2rem;
    }
    @media screen and (max-width: 475px) {
      width: 1.6rem;
    }
  }
  .counter {
    display:block;
    margin-top: 0.5rem;
    font-style: normal;
    font-weight: bold;
    font-size: 1.7rem;
    line-height: 42px;
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
    letter-spacing: 0.01em;
    color: #596579;
    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

const Doctor = styled.div`
  width: 25%;
  .icon {
    width: 2.3rem;
    margin: auto;
    @media screen and (max-width: 650px) {
      width: 2rem;
    }
    // @media screen and (max-width: 475px) {
    //   width: 1.6rem;
    // }
  }
  .counter {
    display: block;
    margin-top: 0.5rem;
    font-style: normal;
    font-weight: bold;
    font-size: 1.7rem;
    line-height: 42px;
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
    letter-spacing: 0.01em;
    color: #596579;
    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;
const Hospital = styled.div`
  width:25%;
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
    display:block;
    margin-top: 0.5rem;
    font-style: normal;
    font-weight: bold;
    font-size: 1.7rem;
    line-height: 42px;
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
    letter-spacing: 0.01em;
    color: #596579;
    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;
const MedicalIndustries = styled.div`
  width: 25%;
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
    display:block;
    margin-top: 0.5rem;
    font-style: normal;
    font-weight: bold;
    font-size: 1.7rem;
    line-height: 42px;
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
    letter-spacing: 0.01em;
    color: #596579;
    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    }
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
      <HappyClient className="floating-item">
        <img src={smile} className="icon"></img>
        <span className="counter">
          <CountUp end={1000} duration={3} />+
        </span>
        <span className="subtitle">Happy clients</span>
      </HappyClient>
      <Doctor className="floating-item">
        <img src={doctor} className="icon"></img>
        <span className="counter">
          <CountUp end={100} duration={2} />+
        </span>
        <span className="subtitle">Doctors</span>
      </Doctor>
      <Hospital className="floating-item">
        <img src={hospital} className="icon"></img>
        <span className="counter">
          <CountUp end={50} duration={1} />+
        </span>
        <span className="subtitle">Hospitals</span>
      </Hospital>
      <MedicalIndustries className="floating-item">
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
