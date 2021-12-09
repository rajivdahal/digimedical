import React from "react";
import styled from "styled-components";
import imagevideoAbout from "../../../assets/imagevideoAbout.png";
import reviewer from "../../../assets/reviewer.png";
const Root = styled.div`
  padding-left: 9rem;
  padding-right: 9rem;
  padding-top: 4.5rem;
  // padding-bottom: 4.5rem;
  display: flex;
`;
const ImageContainor = styled.div`
  width: 45%;
  //   background-color: red;
  .image {
    width: 80%;
  }
`;
const ContentContainor = styled.div`
  width: 50%;
  padding-right: 3rem;
`;
const Title = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  color: #596579;
  letter-spacing: 0.03em;
`;
const Heading = styled.div`
  //   width: 75%;
  font-style: normal;
  line-height: 52px;
  font-size: 38px;
`;
const Deatail = styled.div`
  margin-top: 0.5rem;
  padding-right: 1rem;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  color: #7b8698;
  letter-spacing: 0.03em;
`;
const Review = styled.div`
  //   border: 1px solid black;
  border: 1.5px dashed #d0d7e2;
  border-left-style: solid;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 2rem;
  padding: 1rem;
  .review-detail {
    font-style: italic;
    font-weight: normal;
    font-size: 0.9rem;
    line-height: 30px;
    color: #596579;
  }
  .image-name-main-div {
  }
  .image-name-div {
    display: flex;
    align-items: center;
  }
  .image {
    width: 5rem;
  }
  .name-div {
    display: flex;
    flex-direction: column;
  }
  .name {
    font-style: normal;
    font-weight: bold;
    font-size: 0.9rem;
    line-height: 30px;
    color: #192638;
  }
  .position {
    font-style: normal;
    font-weight: normal;
    font-size: 0.9rem;
    line-height: 30px;
    color: #374253;
  }
`;
const OurMission = () => {
  return (
    <Root>
      <ImageContainor>
        <img src={imagevideoAbout} className="image"></img>
      </ImageContainor>
      <ContentContainor>
        <Title>Our Mission</Title>
        <Heading>Digitize Nepal’s medical</Heading>
        <Heading>field !</Heading>
        <Deatail>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin
          sed at nunc elit. Donec risus cras faucibus velit eros nunc nam sed
          pulvinar.
        </Deatail>
        <Review>
          <div className="review-detail">
            {" "}
            "Health care is becoming more digitized and consumer oriented. It’s
            not an overnight change, but more like how summer turns into fall –
            gradual yet very perceptible."
          </div>
          <div className="image-name-main-div">
            <div className="image-name-div">
              <div>
                <img src={reviewer} className="image"></img>
              </div>
              <div className="name-div">
                <span className="name">Bigyan Shrestha</span>
                <span className="position">
                  {" "}
                  Managing Director , Digimedical sewa pvt. ltd
                </span>
              </div>
            </div>
          </div>
        </Review>
      </ContentContainor>
    </Root>
  );
};

export default OurMission;
