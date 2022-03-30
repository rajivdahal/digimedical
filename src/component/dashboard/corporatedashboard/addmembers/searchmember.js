import React from "react";
import { Image, Row, Col, Container } from "react-bootstrap";
import Avatar from "../../../../assets/avatars.png";
import "./searchmember.css";
export default function searchMember() {
  return (
    <div className="corp-ad-search-mem">
      <Container>
        <div className="corp-admem-search-bar">
          <div className="cadmem-search-bar">
            <input type="text" />
            <div className="cadmem-search-icon">
              {" "}
              <span>
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <Row>
          <Col md={3}>
            <div className="about_user_viewp">
              <div className="image-profile textAlign-center">
                <Image
                  src={Avatar}
                  fluid
                  roundedCircle
                  className="imag-profile"
                ></Image>
              </div>
              {/* <div className="textAlign-center">
              <div className="credentials-name">
                {props.firstname} {props.middlename} {props.lastname}
              </div>
              <div className="credentials-email">{props.email}</div>
            </div> */}
              <div className="textAlign-center">
                <div className="credentials-name"></div>
                <div className="credentials-email"></div>
              </div>
            </div>
          </Col>

          <Col md={9}>
            <Row>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Role</span>
                  <span>:</span>
                  <span className="info-value">Patient</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Address </span>
                  <span>:</span>
                  <span className="info-value">{}</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">DOB</span>
                  <span>:</span>
                  <span className="info-value">{}</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Age</span>
                  <span>:</span>
                  <span className="info-value">{}</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Height</span>
                  <span>:</span>
                  <span className="info-value">{}</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Weight</span>
                  <span>:</span>
                  <span className="info-value">{}</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Blood Group</span>
                  <span>:</span>
                  <span className="info-value">{}</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Gender</span>
                  <span>:</span>
                  <span className="info-value"></span>
                </div>
              </Col>

              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Contact</span>
                  <span>:</span>
                  <span className="info-value"></span>
                </div>
              </Col>

              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Father's Name</span>
                  <span>:</span>
                  <span className="info-value">Prem Gautam Ale</span>
                </div>
              </Col>
              <div className="corp-srch-last-but">
                <button>Add</button>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
