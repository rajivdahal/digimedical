import { useState, useEffect } from "react";
import { Image, Row, Col, Container } from "react-bootstrap";
import Avatar from "../../../../assets/avatars.png";
import { DAYS } from "../../../../constants/constants";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const ViewProfile = (props) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availableDays, setDays] = useState([]);

  useEffect(() => {
    let startTime = props.starttime;
    let endTime = props.endtime;
    let availableday = props.availabledays;

    if (startTime) {
      let tempstartArr = startTime.split(":");
      tempstartArr.splice(2,1);
      let joinTime = tempstartArr.join(":");
      let hours = parseInt(tempstartArr[0]);
      if (hours > 0 && hours < 12) {
        joinTime += " AM";
      }
      setStartTime(joinTime);
    }

    if (endTime) {
      let tempEndArr = endTime.split(":");
      tempEndArr.splice(2,1);
      let joinTime = tempEndArr.join(":");
      let hours = parseInt(tempEndArr[0]);
      if (hours > 11 && hours < 24) {
        joinTime += " PM";
      }
      setEndTime(joinTime);
    }

    let selectedDays = [];
    if (availableday) {
      let dayArr = availableday.split(",");
      DAYS.forEach((day) => {
        let foundDay = dayArr.filter((item) => {
          return item == day.value;
        });
        if (foundDay.length > 0) {
          selectedDays.push(day);
        }
      });
    }
    setDays(selectedDays)

  }, [props.starttime, props.endtime, props.availabledays])

  return (
    <Container>
      <Row>
        <Col md={3}>
          <div className="about_user_viewp">
            <div className="image-profile textAlign-center">
              <Image
                src={props.id ? REACT_APP_BASE_URL + "doctor/download/" + props.id : Avatar}
                fluid
                roundedCircle
                className="imag-profile"
              ></Image>
            </div>
            <div className="textAlign-center">
              <div className="credentials-name">
                {props.firstname} {props.middlename} {props.lastname}
              </div>
              <div className="credentials-email">{props.email}</div>
            </div>
          </div>
        </Col>

        <Col md={9}>
          <Row>
            <Col md={6}>
              <div className="info-block">
                <span className="info-label">Role</span>
                <span>:</span>
                <span className="info-value">Doctor</span>
              </div>
            </Col>
            <Col md={6}>
              <div className="info-block">
                <span className="info-label">Prefix </span>
                <span>:</span>
                <span className="info-value">{props.prefix}</span>
              </div>
            </Col>
            <Col md={6}>
              <div className="info-block">
                <span className="info-label">NMC</span>
                <span>:</span>
                <span className="info-value">{props.nmcno}</span>
              </div>
            </Col>
            <Col md={6}>
              <div className="info-block">
                <span className="info-label">Licensed Date</span>
                <span>:</span>
                <span className="info-value">{props.liscencedate}</span>
              </div>
            </Col>

            <Col md={6}>
              <div className="info-block">
                <span className="info-label">Gender</span>
                <span>:</span>
                <span className="info-value">
                  {props.gender == 0 ? "Male" : "Female"}
                </span>
              </div>
            </Col>

            <Col md={6}>
              <div className="info-block">
                <span className="info-label">Contact</span>
                <span>:</span>
                <span className="info-value">{props.mobilenumber}</span>
              </div>
            </Col>

            <Col md={6}>
              <div className="info-block">
                <span className="info-label">Specialist</span>
                <span>:</span>
                <span className="info-value">{props.specialist}</span>
              </div>
            </Col>

            <Col md={6}>
              <div className="info-block">
                <span className="info-label">Services</span>
                <span>:</span>
                {props.services.map((item) => {
                  return <span className="info-value">{item}</span>
                })}

              </div>
            </Col>
            {props.hospitalid ?
              <>
                <Col md={6}>
                  <div className="info-block">
                    <span className="info-label">Start Time</span>
                    <span>:</span>
                    <span className="info-value">{startTime}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="info-block">
                    <span className="info-label">End Time</span>
                    <span>:</span>
                    <span className="info-value">{endTime}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="info-block">
                    <span className="info-label">Available Days</span>
                    <span>:</span>
                    {availableDays.map((item,index) => {
                      return <span className="">{ item.label}{index == availableDays.length - 1 ?
                        <></> : <span>, </span>
                      }</span>
                    }
                    )}

                  </div>
                </Col>
              </>
              :
              <></>
            }



          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewProfile;
