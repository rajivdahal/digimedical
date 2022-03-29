import React from "react";
import { Col, Container, Row, Button, Image } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import { httpClient } from "../../../../utils/httpClient";
import Select from "react-select";
export default function addMember() {
  return (
    <div className="edit-profile">
      <Container>
        <Formik>
          <Form>
            <Row>
              <Col md={3} className="photo_editprof">
                <div className="image-wrapper"></div>
              </Col>

              <Col md={9}>
                <Container>
                  <Row>
                    <Col md={4}>
                      <div className=" form-group select-label">
                        <label> First Name : </label>
                        <Field
                          name="firstName"
                          className="form-control profile-field"
                        />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className=" form-group select-label">
                        <label> Middle Name : </label>
                        <Field
                          name="middleName"
                          className="form-control profile-field"
                        />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className=" form-group select-label">
                        <label> Last Name : </label>
                        <Field
                          name="lastName"
                          className="form-control profile-field"
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className=" form-group  select-label">
                        <label>Address : </label>
                        <Field
                          name="address"
                          className="form-control profile-field"
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className=" form-group  select-label">
                        <label>Email : </label>
                        <Field
                          name="email"
                          className="form-control profile-field"
                        />
                        {<div className="error-message">{}</div>}
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className=" form-group  select-label">
                        <label>Gender : </label>
                        <Field
                          class="select-control profile-field"
                          as="select"
                          name="gender"
                        >
                          <option value="0">Male</option>
                          <option value="1">Female</option>
                          <option value="2">Other</option>
                        </Field>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className=" form-group  select-label">
                        <label>Blood Group : </label>
                        <Field
                          class="select-control profile-field"
                          as="select"
                          name="bloodGroup"
                        >
                          <option value="A+">A-postivie</option>
                          <option value="A-">A-negative</option>
                          <option value="B+">B-postive</option>
                          <option value="B-">B-negative</option>
                          <option value="O+">O-positive</option>
                          <option value="O-">O-negative</option>
                          <option value="AB+">AB-postive</option>
                          <option value="AB-">AB-negative</option>
                        </Field>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className=" form-group select-label">
                        <label>Date Of Birth : </label>
                        <Field
                          name="dob"
                          className="form-control profile-field"
                          type="date"
                        />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className=" form-group select-label">
                        <label>Weight : </label>
                        <Field
                          name="weight"
                          className="form-control profile-field"
                        />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className=" form-group select-label">
                        <label>Height : </label>
                        <Field
                          name="height"
                          className="form-control profile-field"
                        />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className=" form-group select-label">
                        <label>Contact Number : </label>
                        <Field
                          name="contactNo"
                          className="form-control profile-field"
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className=" form-group select-label">
                        <label>Father's Name : </label>
                        <Field
                          name="fatherName"
                          className="form-control profile-field"
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className=" form-group select-label">
                        <label>Previous Diseases : </label>
                        <Field
                          name="previousDisease"
                          className="form-control profile-field"
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row className="mb-4">
              <div className="textAlign-right">
                <button type="button" className="cancel-btn">
                  Cancel
                </button>
                <button className="change-btn" type="submit">
                  Save
                </button>
              </div>
            </Row>
          </Form>
        </Formik>
      </Container>
    </div>
  );
}
