import React from "react";
import styled from "styled-components";
import about_miss_doc from "../../../assets/ourmission_doc1.svg";
import imagevideoAbout from "../../../assets/ourmission_doc2.svg";
import "./ourmission.css";

import reviewer from "../../../assets/reviewer.png";
const Root = styled.div`
  padding-left: 9rem;
  padding-right: 9rem;
  padding-top: 4.5rem;
  // padding-bottom: 4.5rem;
  display: flex;
  @media screen and (max-width: 1024px) {
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 3rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .popup_vid_aboutmission {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: opacity 500ms;
    visibility: hidden;
    opacity: 0;

    .hello_video {
      margin: 70px auto;
      padding: 20px;
      background: #fff;
      border-radius: 5px;
      width: 30%;
      position: relative;
      transition: all 5s ease-in-out;

      .close_vid {
        position: absolute;
        top: 20px;
        right: 30px;
        transition: all 200ms;
        font-size: 30px;
        font-weight: bold;
        text-decoration: none;
        color: #333;
      }
      .close_vid:hover {
        color: #06d85f;
      }
    }
  }
  .popup_vid_aboutmission:target {
    visibility: visible;
    opacity: 1;
  }
`;
const ImageContainor = styled.div`
  width: 45%;

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 100%;
  }
  .doc_miss_pic {
    width: 60%;

    .image {
      border-radius: 10px;
      width: 100%;
      @media screen and (max-width: 1024px) {
        width: 100%;
      }
    }
  }

  .doc_video_play {
    margin-top: -15%;
    margin-left: 30%;

    .video_img_abt {
      border-radius: 10px;
    }

    .play_but_vid_abt {
      margin-top: -28%;
      margin-left: 25%;
      .player {
        width: 60px;
        height: 60px;
        border: solid 3px #fff;
        border-radius: 100%;
        position: relative;
        text-indent: -9999px;
        box-shadow: 1px 1px 3px #999999;
      }

      .player span {
        width: 0;
        height: 0;
        border-top: 15px solid transparent;
        border-left: 20px solid #fff;
        border-bottom: 15px solid transparent;
        position: absolute;
        top: 20%;
        left: 36%;
      }

      .player:hover {
        background: #4ccaea;
        cursor: pointer;
        opacity: 0.95;
        border: none;

        box-shadow: none;
      }

      .player:hover span {
        top: 22%;
        left: 38%;
      }
    }
  }
`;
const ContentContainor = styled.div`
  width: 50%;
  padding-right: 3rem;
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding-right: 0rem;
  }
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
        <div className="doc_miss_pic">
          {" "}
          <img src={about_miss_doc} className="image"></img>
        </div>
        <div className="doc_video_play">
          {" "}
          <img
            src={imagevideoAbout}
            className="video_img_abt"
            style={{ width: "250px" }}
          ></img>
          <div className="play_but_vid_abt">
            <a href="#popup_vid_aboutmission">
              <div class="player">
                <span></span>
              </div>
            </a>
          </div>
        </div>
      </ImageContainor>
      <div id="popup_vid_aboutmission" className="popup_vid_aboutmission">
        <div className="hello_video">
          {" "}
          <h1>Hello From Youtube</h1>
          <a class="close_vid" href="#">
            &times;
          </a>
        </div>
      </div>
      <ContentContainor>
        <Title>Our Mission</Title>
        <Heading>Digitize Nepal’s medical</Heading>
        <Heading>field !</Heading>
        <Deatail>
          To provide high quality, cost effective, comprehensive primary and
          preventative online health care.
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
