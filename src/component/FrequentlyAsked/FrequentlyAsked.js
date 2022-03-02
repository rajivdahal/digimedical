import React, { useState } from "react";
import styled from "styled-components";
// import cx from "classnames";
import Collapse from "@kunukn/react-collapse";
import Question from "../../assets/Question.png";
import { BiPlusCircle } from "react-icons/bi";
import { BiMinusCircle } from "react-icons/bi";
const Root = styled.div`
  padding-left: 9rem;
  padding-right: 9rem;
  padding-bottom: 6rem;

  @media screen and (max-width: 999px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Heading = styled.div`
  font-style: normal;

  font-size: 38px;
  color: #192638;
  text-align: center;
`;
const ContentContainor = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  //   background-color: red;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BottomContainor = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 0.9rem;
  line-height: 1.3rem;
  color: #7b8698;
  text-align: center;
`;

const Items = styled.div`
  //   background-color: red;
  width: 60%;
  border-bottom: 0.8px solid #a7b2c3;
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;
  @media screen and (max-width: 790px) {
    width: 100%;
  }
  span {
    margin-left: 1rem;
    font-style: normal;
    font-weight: bold;
    font-size: 0.9rem;
    line-height: 30px;
    text-align: center;
    color: #374253;
  }
  .title-div {
    display: flex;
    justify-content: space-between;
  }
  .title-icon-div {
  }
  .icon {
    height: 1rem;
  }
  .detail {
    padding: 1rem 1rem 1rem 2rem;

    font-style: normal;
    font-weight: normal;
    font-size: 0.9rem;
    line-height: 1.4rem;
    color: #7b8698;
  }
`;

const FrequentlyAsked = () => {
  const [iconOpen1, setIconOpen1] = useState(false);
  const [iconOpen2, setIconOpen2] = useState(false);
  const [iconOpen3, setIconOpen3] = useState(false);
  const [iconOpen4, setIconOpen4] = useState(false);

  const handleIcon1 = () => {
    setIconOpen1(!iconOpen1);
  };
  const handleIcon2 = () => {
    setIconOpen2(!iconOpen2);
  };
  const handleIcon3 = () => {
    setIconOpen3(!iconOpen3);
  };
  const handleIcon4 = () => {
    setIconOpen4(!iconOpen4);
  };
  return (
    <Root>
      <Heading>Frequently Asked </Heading>
      <Heading> Question</Heading>
      <ContentContainor>
        <Items>
          <div className="title-div" role="button" onClick={handleIcon1}>
            <div className="title-icon-div">
              <img src={Question} className="icon" />
              <span
                data-toggle="collapse"
                href="#collapseExample1"
                className="title"
              >
                Are doctor qualified enough?
              </span>
            </div>
            <div>
              {" "}
              {iconOpen1 ? (
                <BiMinusCircle style={{ color: "#2745F0" }} />
              ) : (
                <BiPlusCircle style={{ color: "#2745F0" }} />
              )}
            </div>
          </div>
          <div class="collapse detail" id="collapseExample1">
            With the database of more than 20,000 certified doctors registered
            in Nepal Medical Council, the credibility of the information and
            qualification of the doctors are analyzed every so often by the
            team.
          </div>
        </Items>
        <Items>
          <div
            className="title-div"
            role="button"
            data-toggle="collapse"
            href="#collapseExample2"
            onClick={handleIcon2}
          >
            <div className="title-icon-div">
              <img src={Question} className="icon" />
              <span className="title">What is your cancelation policy?</span>
            </div>
            <div>
              {" "}
              {iconOpen2 ? (
                <BiMinusCircle style={{ color: "#2745F0" }} />
              ) : (
                <BiPlusCircle style={{ color: "#2745F0" }} />
              )}
            </div>
          </div>
          <div class="collapse detail" id="collapseExample2">
            With the database of more than 20,000 certified doctors registered
            in Nepal Medical Council, the credibility of the information and
            qualification of the doctors are analyzed every so often by the
            team.
          </div>
        </Items>
        <Items>
          <div
            className="title-div"
            role="button"
            data-toggle="collapse"
            href="#collapseExample3"
            onClick={handleIcon3}
          >
            <div className="title-icon-div">
              <img src={Question} className="icon" />
              <span className="title">
                What are the benefit of doctor at home?What are its pros?
              </span>
            </div>
            <div>
              {" "}
              {iconOpen3 ? (
                <BiMinusCircle style={{ color: "#2745F0" }} />
              ) : (
                <BiPlusCircle style={{ color: "#2745F0" }} />
              )}
            </div>
          </div>
          <div class="collapse detail" id="collapseExample3">
            With the database of more than 20,000 certified doctors registered
            in Nepal Medical Council, the credibility of the information and
            qualification of the doctors are analyzed every so often by the
            team.
          </div>
        </Items>
        <Items>
          <div
            className="title-div"
            role="button"
            data-toggle="collapse"
            href="#collapseExample4"
            onClick={handleIcon4}
          >
            <div className="title-icon-div">
              <img src={Question} className="icon" />
              <span className="title">Are doctor qualified enough?</span>
            </div>
            <div>
              {" "}
              {iconOpen4 ? (
                <BiMinusCircle style={{ color: "#2745F0" }} />
              ) : (
                <BiPlusCircle style={{ color: "#2745F0" }} />
              )}
            </div>
          </div>
          <div class="collapse detail" id="collapseExample4">
            With the database of more than 20,000 certified doctors registered
            in Nepal Medical Council, the credibility of the information and
            qualification of the doctors are analyzed every so often by the
            team.
          </div>
        </Items>
      </ContentContainor>

      <BottomContainor>
        Didn’t find the Answer you were looking for? You can
      </BottomContainor>
      <BottomContainor>Contact us any time.</BottomContainor>
    </Root>
  );
};

export default FrequentlyAsked;
