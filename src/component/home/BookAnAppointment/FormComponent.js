import React from "react";
import styled from "styled-components";

const FormSection = styled.div`
  height: auto;
  margin-top: 25px;
  padding: 3rem;
  background-color: white;
  width: 500px;
  border-radius: 15px;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.06);
  box-shadow: -5px -5px 20px 0px rgba(0, 0, 0, 0.06);

  .col-md-6 {
    padding: 0px 15px 0px 0px;
  }
  .form-control {
    border-radius: 8px;
  }
  label {
    color: #192638;
    line-height: 19px;
    letter-spacing: 0.001rem;
  }
  .btn-block {
    background-color: #2745f0;
    // width: 100%;
  }
  .form-text {
    color: #8797a8;
    text-align: center;
    font-size: 12px;
    margin-top: 4px;
  }
`;

function FormComponent() {
  return (
    <FormSection>
      <form>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="fname">First Name</label>
            <input
              type="text"
              class="form-control"
              id="fname"
              placeholder="First Name"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="mname">Middle Name</label>
            <input
              type="text"
              class="form-control"
              id="mname"
              placeholder="Middle Name"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="lname">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lname"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="phoneno">Phone No.</label>
            <input
              type="text"
              class="form-control"
              id="phoneno"
              placeholder="PhoneNumber"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="service">Select Service</label>
            <select id="service" class="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="doctor">Select Doctor</label>
            <select id="doctor" class="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="appointment">Appointment Date.</label>
            <input
              type="text"
              class="form-control"
              id="appointment"
              placeholder="dd/mm/yyyy"
            />
          </div>

          <div class="form-group col-md-6">
            <label for="time">Time</label>
            <select id="time" class="form-control">
              <option selected>Select time</option>
              <option>...</option>
            </select>
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12 ">
          <button type="button" class="btn btn-primary btn-block">
            Make Appointment
          </button>
        </div>
        <div className="form-text">
          We value your privacy. Your details are safe with us.
        </div>
      </form>
    </FormSection>
  );
}

export default FormComponent;
