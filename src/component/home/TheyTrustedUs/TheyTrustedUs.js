import React from "react";
import styled from "styled-components";
// import Carousel from "react-bootstrap/Carousel";
import Carousel from "react-elastic-carousel";

import client1 from "../../../assets/client1.png";
import Client2 from "../../../assets/Client2.png";
const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  padding-bottom: 5rem;
  @media screen and (max-width: 650px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
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
    @media screen and (max-width: 1077px) {
      margin-top: 1rem;
    }
    @media screen and (max-width: 650px) {
      width: 100%;
      margin-left: 0rem;
      margin-right: 0rem;
    }
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
const Item = styled.div`
  display: flex;
  @media screen and (max-width: 1077px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const TheyTrustedUs = () => {
  const items = [
    { id: 1, title: "item #1" },
    { id: 2, title: "item #2" },
    { id: 3, title: "item #3" },
    { id: 4, title: "item #4" },
    { id: 5, title: "item #5" },
  ];
  return (
    <Root>
      <span>About Us</span>
      <h2>They Trusted Us</h2>
      <p>Take a look at the recent testimonials submitted by our patients</p>

      <Featured>
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <Item>
                <div className="items-div">
                  <div className="image-name-div">
                    <img src={client1} className="email-img"></img>
                    <div>
                      <span className="client-name">Sammer Paudel</span>
                      <p className="client-info">Patient</p>
                    </div>
                  </div>
                  <div className="details-div">
                    “Thank you so much for fitting us in today, don’t know what
                    we’d have done without you. My daughter is quite timid, but
                    you were brilliant with her..”
                  </div>
                </div>
                <div className="items-div">
                  <div className="image-name-div">
                    <img src={client1} className="email-img"></img>
                    <div>
                      <span className="client-name">Hari Shrestha</span>
                      <p className="client-info">Patient</p>
                    </div>
                  </div>
                  <div className="details-div">
                    “Thank you so much for fitting us in today, don’t know what
                    we’d have done without you. My daughter is quite timid, but
                    you were brilliant with her..”
                  </div>
                </div>
                <div className="items-div">
                  <div className="image-name-div">
                    <img src={client1} className="email-img"></img>
                    <div>
                      <span className="client-name">Dipesh Shrestha</span>
                      <p className="client-info">Patient</p>
                    </div>
                  </div>
                  <div className="details-div">
                    “Thank you so much for fitting us in today, don’t know what
                    we’d have done without you. My daughter is quite timid, but
                    you were brilliant with her..”
                  </div>
                </div>
              </Item>{" "}
            </div>
            <div class="carousel-item">
              <Item>
                <div className="items-div">
                  <div className="image-name-div">
                    <img src={client1} className="email-img"></img>
                    <div>
                      <span className="client-name">Hari Shrestha</span>
                      <p className="client-info">Patient</p>
                    </div>
                  </div>
                  <div className="details-div">
                    “Thank you so much for fitting us in today, don’t know what
                    we’d have done without you. My daughter is quite timid, but
                    you were brilliant with her..”
                  </div>
                </div>
                <div className="items-div">
                  <div className="image-name-div">
                    <img src={client1} className="email-img"></img>
                    <div>
                      <span className="client-name">Dipesh Shrestha</span>
                      <p className="client-info">Patient</p>
                    </div>
                  </div>
                  <div className="details-div">
                    “Thank you so much for fitting us in today, don’t know what
                    we’d have done without you. My daughter is quite timid, but
                    you were brilliant with her..”
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
                    “Thank you so much for fitting us in today, don’t know what
                    we’d have done without you. My daughter is quite timid, but
                    you were brilliant with her..”
                  </div>
                </div>
              </Item>
            </div>
            <div class="carousel-item">
              <Item>
                <div className="items-div">
                  <div className="image-name-div">
                    <img src={Client2} className="email-img"></img>
                    <div>
                      <span className="client-name">Sammer Paudel</span>
                      <p className="client-info">Patient</p>
                    </div>
                  </div>
                  <div className="details-div">
                    “Thank you so much for fitting us in today, don’t know what
                    we’d have done without you. My daughter is quite timid, but
                    you were brilliant with her..”
                  </div>
                </div>
                <div className="items-div">
                  <div className="image-name-div">
                    <img src={client1} className="email-img"></img>
                    <div>
                      <span className="client-name">Hari Shrestha</span>
                      <p className="client-info">Patient</p>
                    </div>
                  </div>
                  <div className="details-div">
                    “Thank you so much for fitting us in today, don’t know what
                    we’d have done without you. My daughter is quite timid, but
                    you were brilliant with her..”
                  </div>
                </div>
                <div className="items-div">
                  <div className="image-name-div">
                    <img src={client1} className="email-img"></img>
                    <div>
                      <span className="client-name">Dipesh Shrestha</span>
                      <p className="client-info">Patient</p>
                    </div>
                  </div>
                  <div className="details-div">
                    “Thank you so much for fitting us in today, don’t know what
                    we’d have done without you. My daughter is quite timid, but
                    you were brilliant with her..”
                  </div>
                </div>
              </Item>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </Featured>
    </Root>
  );
};

export default TheyTrustedUs;
