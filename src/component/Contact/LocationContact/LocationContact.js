import React from "react";
import styled from "styled-components";

const Root = styled.div`
  padding-left: 8.75rem;
  padding-right: 8.75rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
  display: flex;
  justify-content: center;
  // background-color: red;
  @media screen and (max-width: 1077px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  @media screen and (max-width: 950px) {
    flex-direction: column;
  }
  @media screen and (max-width: 650px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const MapContainor = styled.div`
  width: 50%;

  // background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 950px) {
    width: 100%;
  }

  .map {
    width: 100%;
    height: 80vh;
    @media screen and (max-width: 1242px) {
      height: 80vh;
    }
    @media screen and (max-width: 980px) {
      height: 70vh;
    }
    @media screen and (max-width: 970px) {
      height: 70vh;
    }
    @media screen and (max-width: 650px) {
      width: 110%;
    }
  }
`;
const FormContainor = styled.div`
  width: 50%;
  margin-left: 2rem;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 950px) {
    width: 100%;
    margin-top: 2rem;
    margin-left: 0rem;
  }
  span {
    font-style: normal;
    line-height: 52px;
    font-size: 38px;
    color: #192638;
    text-align: center;
  }
  p {
  }
  .btn {
    background-color: #2745f0;
    border-radius: 0.5rem;
    // height: 3rem;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 500;

    line-height: 17px;
    /* identical to box height */

    letter-spacing: 0.01em;
  }
  .message {
    height: 6.5rem;
  }
`;

const SubmitButton = styled.button`
  background-color: red;
`;

const LocationContact = () => {
  return (
    <Root>
      <MapContainor>
        <iframe
          className="map"
          // style={{ filter: "drop-shadow(6px 6px 30px rgba(0, 0, 0, 0.15))" }}
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=koteshower%20nepal&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      </MapContainor>
      <FormContainor>
        <span>Get In Touch</span>
        <p>Leave us a message</p>

        <form>
          <div class="form-group">
            <label for="inputAddress">Name</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="Name"
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Phone</label>
              <input type="text" class="form-control" placeholder="Phone" />
            </div>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">message</label>
            <textarea
              class="form-control message"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Send Now
          </button>
        </form>
      </FormContainor>
    </Root>
  );
};

export default LocationContact;
