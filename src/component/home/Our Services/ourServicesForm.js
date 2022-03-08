import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Root = styled.div`
  width: 45%;

  padding: 1rem;
  background: #ffffff;
  box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  @media screen and (max-width: 1280px) {
    width: 40%;
  }
  @media screen and (max-width: 1200px) {
    width: 45%;
  }
  @media screen and (max-width: 1200px) {
    width: 50%;
  }
  @media screen and (max-width: 1000px) {
    width: 55%;
  }
  @media screen and (max-width: 960px) {
    width: 60%;
  }
  @media screen and (max-width: 870px) {
    width: 65%;
  }
  @media screen and (max-width: 820px) {
    width: 70%;
  }
  @media screen and (max-width: 770px) {
    width: 80%;
  }
  @media screen and (max-width: 730px) {
    width: 90%;
  }
  @media screen and (max-width: 650px) {
    width: 100%;
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
`;

const DoctorAtHomeForm = () => {
  const location=useLocation()
  console.log("location is",location.pathname)
  return (
    <Root>
      <form
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          columnGap: "2rem",
        }}
      >
        <div class="form-group">
          <label for="inputAddress">First Name</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Name"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress">Middle Name</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="phone"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="phone"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress">E-mail</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="phone"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress">Phone no</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="phone"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block"
          style={{ gridColumnStart: "1", gridColumnEnd: "3" }}
        >
          Send Now
        </button>
      </form>
    </Root>
  );
};

export default DoctorAtHomeForm;
