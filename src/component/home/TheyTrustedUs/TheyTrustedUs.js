import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import "./TheyTrustedUs.css";
import client1 from "../../../assets/client1.png";
import Client2 from "../../../assets/Client2.png";
const Root = styled.div`
  text-align: center;
  padding-top: 6rem;
  padding-bottom: 6rem;
  @media screen and (max-width: 650px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  span {
    font-size: 15px;
    line-height: 30px;
    color: #596579;
    font-weight: normal;
  }
  h2 {
    font-style: normal;
    line-height: 52px;
    font-size: 33.33px;
    font-weight: bold;
    margin-bottom: 0;
  }
  p {
    line-height: 25px;
    text-align: center;
    color: #7b8698;
    font-size: 15px;
    font-weight: normal;
  }
`;
const Featured = styled.div`
  padding-top: 3rem;
`;
const Item = styled.div`
  display: flex;
  @media screen and (max-width: 1077px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const items = [
  {
    id: 1,
    image: client1,
    client_name: "Sammer Paudel",
    client_info: "Patient",
    client_testimonial:
      "Thank you so much for fitting us in today, don’t know what we’d have done without you. My daughter is quite timid, but you were brilliant with her..",
  },
  {
    id: 2,
    image: Client2,
    client_name: "Sammer Paudel",
    client_info: "Patient",
    client_testimonial:
      "Thank you so much for fitting us in today, don’t know whatwe’d have done without you. My daughter is quite timid, but you were brilliant with her..",
  },
  {
    id: 3,
    image: client1,
    client_name: "Sammer Paudel",
    client_info: "Patient",
    client_testimonial:
      "Thank you so much for fitting us in today, don’t know what we’d have done without you. My daughter is quite timid, but you were brilliant with her..",
  },
  {
    id: 4,
    image: Client2,
    client_name: "Sammer Paudel",
    client_info: "Patient",
    client_testimonial:
      "Thank you so much for fitting us in today, don’t know what we’d have done without you. My daughter is quite timid, but you were brilliant with her..",
  },
  {
    id: 5,
    image: client1,
    client_name: "Sammer Paudel",
    client_info: "Patient",
    client_testimonial:
      "Thank you so much for fitting us in today, don’t know what we’d have done without you. My daughter is quite timid, but you were brilliant with her..",
  },
  {
    id: 6,
    image: Client2,
    client_name: "Joshua Tamang",
    client_info: "Patient",
    client_testimonial:
      "Thank you so much for fitting us in today, don’t know what we’d have done without you. My daughter is quite timid, but you were brilliant with her..",
  },
];

const TheyTrustedUs = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 667,
        settings: {
          arrows: false,
          dots: false,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Root>
      <span>Patient Voice</span>
      <h2>They Trusted Us</h2>
      <p>Take a look at the recent testimonials submitted by our patients</p>
      <Slider {...settings} className="trust-container">
        {items.map((item) => {
          return (
            <div className="items-div">
              <div className="inner" key={item.id}>
                <div className="image-name-div">
                  <img src={item.image} className="email-img" alt="slider" />
                  <div className="client">
                    <span className="client-name">{item.client_name}</span>
                    <p className="client-info">{item.client_info}</p>
                  </div>
                </div>
                <div className="details-div">{item.client_testimonial}</div>
              </div>
            </div>
          );
        })}
      </Slider>
    </Root>
  );
};

export default TheyTrustedUs;
