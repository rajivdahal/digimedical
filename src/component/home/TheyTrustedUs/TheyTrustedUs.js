import React from "react";
import styled from "styled-components";
// import Carousel from "react-bootstrap/Carousel";
import client1 from "../../../assets/client1.png";
const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  span {
    font-size: 0.9rem;
    line-height: 30px;
    color: #596579;
  }
  h2 {
    font-style: normal;
    line-height: 52px;
    font-size: 38px;
  }
  p {
    line-height: 25px;
    text-align: justify;
    color: #7b8698;
    font-size: 0.9rem;
    font-weight: 300;
  }
`;
const Featured = styled.div`
  padding-top: 3rem;
  display: flex;
  //   justify-content:;
  .email-img {
    height: 6rem;
  }
  .items-div {
    margin-left: 1rem;
    margin-right: 1rem;
    width: 65%;
    padding: 1rem 1rem 1rem 1rem;
    border: 1px solid #d0d7e2;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .image-name-div {
    display: flex;
    align-items: center;
  }
  .client-name {
    font-style: normal;
    font-weight: bold;
    font-size: 0.8rem;
    line-height: 30px;
    color: #192638;
  }
  .client-info {
    font-style: normal;
    font-weight: normal;
    font-size: 0.8rem;
    line-height: 30px;
  }
  .details-div {
    font-style: normal;
    font-weight: normal;
    font-size: 0.8rem;
    line-height: 30px;
    color: #596579;
  }
`;
const TheyTrustedUs = () => {
  return (
    <Root>
      <span>About Us</span>
      <h2>They Trusted Us</h2>
      <p>Take a look at the recent testimonials submitted by our patients</p>
      <Featured>
        {/* <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=First slide&bg=373940"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=282c34"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel> */}
        <div className="items-div">
          <div className="image-name-div">
            <img src={client1} className="email-img"></img>
            <div>
              <span className="client-name">Sammer Paudel</span>
              <p className="client-info">Patient</p>
            </div>
          </div>
          <div className="details-div">
            “Thank you so much for fitting us in today, don’t know what we’d
            have done without you. My daughter is quite timid, but you were
            brilliant with her..”
          </div>
        </div>
        <div className="items-div">
          <div className="image-name-div">
            <img src={client1} className="email-img"></img>
            <div>
              <span className="client-name">Sammer Paudel</span>
              <p className="client-info">Patient</p>
            </div>
          </div>
          <div className="details-div">
            “Thank you so much for fitting us in today, don’t know what we’d
            have done without you. My daughter is quite timid, but you were
            brilliant with her..”
          </div>
        </div>
        <div className="items-div">
          <div className="image-name-div">
            <img src={client1} className="email-img"></img>
            <div>
              <span className="client-name">Sammer Paudel</span>
              <p className="client-info">Patient</p>
            </div>
          </div>
          <div className="details-div">
            “Thank you so much for fitting us in today, don’t know what we’d
            have done without you. My daughter is quite timid, but you were
            brilliant with her..”
          </div>
        </div>
      </Featured>
    </Root>
  );
};

export default TheyTrustedUs;
