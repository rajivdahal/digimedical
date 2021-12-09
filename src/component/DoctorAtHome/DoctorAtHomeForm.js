import React from "react";
import styled from "styled-components";

const Root = styled.div`
  width: 35%;
  //   height: 50vh;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
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
  return (
    <Root>
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
        <div class="form-group">
          <label for="inputAddress">Phone no</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="phone"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress">City</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="City"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Send Now
        </button>
      </form>
    </Root>
  );
};

export default DoctorAtHomeForm;
