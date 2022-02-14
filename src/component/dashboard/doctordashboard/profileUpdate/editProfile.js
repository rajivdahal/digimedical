import { Form, Formik, Field } from "formik";
import { useState, useRef, useEffect } from "react";
import { Col, Container, Row, Button, Image } from "react-bootstrap";
import { httpClient } from "../../../../utils/httpClient";
import Avatar from "../../../../assets/avatars.png";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { notify } from "../../../../services/notify";
import { REGEX } from "../../../../constants/constants";
import { DAYS } from "../../../../constants/constants";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const EditProfile = (props) => {
  let history = useHistory();
  const userstatus = localStorage.getItem("status");
  const imageSelectRef = useRef();
  const [selectedImage, setImage] = useState("");
  const [userID, setUserID] = useState("");
  const [doctorProfile, setDoctorProfile] = useState({
    email: "",
    specialist: "",
    gender: "",
    image: "",
    prefix: "",
    nmcNum: "",
    licenseDate: "",
    description: "",
    mobilenumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    availableDays: [],
    starttime: "",
    endtime: "",
  });


  function validateEmail(value) {
    let error;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      error = "Invalid email format!";
    }
    return error;
  }

  function validateMobileNum(value) {
    let error;
    if (!value) {
      error = "Required!";
    } if (("" + value).length != 10) {
      error = "Mobile Number must be of 10 digits!";
    } if (("" + value).includes("-")) {
      error = "Mobile Number can't be Negative!";
    }
    if (!REGEX.DECIMAL.test(value)) {
      error = "Mobile Number must be a number!";
    }
    return error;
  }

  const getUser = () => {
    if (props) {
      let id = props.id;
      let availableday = props.availabledays;
      let selectedDays = [];
      if (availableday) {
        let dayArr = availableday.split(",");
        DAYS.forEach((day) => {
          let foundDay = dayArr.filter((item) => {
            return item == day.value;
          });
          if (foundDay.length > 0) {
            selectedDays.push({
              label: day.label,
              value: day.value,
            });
          }
        });
      }
      let url = REACT_APP_BASE_URL + "doctor/download/" + id;
      setImage(url);
      setDoctorProfile({
        firstName: props.firstname,
        middleName: props.middlename,
        lastName: props.lastname,
        email: props.email,
        mobilenumber: props.mobilenumber,
        prefix: props.prefix,
        nmcNum: props.nmcno,
        licenseDate: props.liscencedate,
        specialist: props.specialist,
        description: props.description,
        gender: props.gender,
        starttime: props.starttime,
        endtime: props.endtime,
        availableDays: selectedDays,
      });
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const updateProfile = async(values) => {
    let days = [];
    if (values.availableDays) {
      days = values.availableDays.map((day) => day.value);
    }
    let formData = new FormData();
    if (values.image) {
      formData.append("image", values.image);
    }
    formData.append("specialist", values.specialist);
    formData.append("description", values.description);
    formData.append("email", values.email);
    formData.append("liscenceDate", values.licenseDate);
    formData.append("prefix", values.prefix);
    formData.append("gender", values.gender);
    formData.append("mobileNumber", values.mobilenumber);
    if (props.hospitalid) {
      formData.append("availableDays", days);
      formData.append("startTime", values.starttime);
      formData.append("endTime", values.endtime);
    }

    try{
      let resp ;
      if(props.hospitalid){
        resp = await httpClient.PUT("doctor/hospital/update-profile", formData, false, true, "formdata");
      }else{
        resp = await httpClient.PUT("doctor/update-profile", formData, false, true, "formdata");
      }
      if (resp.data.status) {
        notify.success(resp.data.message);
        props.gotoView();
      }

    }catch(err){
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  };

  const cancelProfileEdit = () => {
    setDoctorProfile({
      email: "",
      specialist: "",
      gender: "",
      image: "",
      prefix: "",
      licenseDate: "",
      description: "",
      mobilenumber: "",
      availableDays: [],
      starttime: "",
      endtime: "",
    });
    props.gotoView();

  };

  const handleAddImage = () => {
    imageSelectRef.current.click();
  };

  const handleChangeImage = (e, setFieldValue) => {
    let files = e.target.files[0];
    let reader = new FileReader();
    setFieldValue("image", files);
    reader.onloadend = () => {
      setImage(reader.result.toString());
    };
    reader.readAsDataURL(files);
  };

  const handleChooseDays = (item, setFieldValue) => {
    setFieldValue("availableDays", item);
  };

  return (
    <div className="edit-profile">
      <Container>
        <Formik
          enableReinitialize={true}
          initialValues={doctorProfile}
          onSubmit={(values) => {
            console.log(values);
            updateProfile(values);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Row>
                <Col md={3} className="photo_editprof">
                  <div className="image-wrapper">
                    <Image
                      src={selectedImage} roundedCircle
                      className="imag-profile" fluid
                      accept="image/png, image/jpg, image/jpeg"

                    ></Image>
                    <Button
                      variant="secondary"
                      onClick={handleAddImage}
                      className="change-photo"
                    >
                      Change Photo
                    </Button>
                    <input
                      onChange={(e) => handleChangeImage(e, setFieldValue)}
                      type="file"
                      name="image"
                      style={{ display: "none" }}
                      ref={imageSelectRef}
                    ></input>
                  </div>
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
                            disabled
                          />
                        </div>
                      </Col>

                      <Col md={4}>
                        <div className=" form-group select-label">
                          <label> Middle Name : </label>
                          <Field
                            name="middleName"
                            className="form-control profile-field"
                            disabled
                          />
                        </div>
                      </Col>

                      <Col md={4}>
                        <div className=" form-group select-label">
                          <label> Last Name : </label>
                          <Field
                            name="lastName"
                            className="form-control profile-field"
                            disabled
                          />
                        </div>
                      </Col>

                      <Col md={5}>
                        <div className=" form-group ">
                          <label>Email : </label>
                          <Field
                            name="email"
                            validate={validateEmail}
                            className="form-control profile-field"
                            disabled
                          />
                          {errors.email && touched.email && (
                            <div className="error-message">{errors.email}</div>
                          )}
                        </div>
                      </Col>

                      <Col md={4}>
                        <div className=" form-group">
                          <label>Prefix : </label>
                          <Field
                            as="select" value={values.prefix}
                            name="prefix"
                            class="select-control profile-field"
                          >
                            <option value="MD">MD</option>
                            <option value="MS">MS</option>
                            <option value="MBBS">MBBS</option>
                            <option value="MBBS_MD">MBBS MD</option>
                            <option value="MBBS_MS">MBBS MS</option>
                          </Field>
                        </div>
                      </Col>

                      <Col md={3}>
                        <div className=" form-group ">
                          <label>NMC Number : </label>
                          <Field
                            name="nmcNum"
                            className="form-control profile-field"
                            disabled
                          />
                        </div>
                      </Col>

                      <Col md={4}>
                        <label>Gender : </label>
                        <Field
                          class="select-control profile-field"
                          as="select" name="gender"
                          value={values.gender}
                        >
                          <option value="0">Male</option>
                          <option value="1">Female</option>
                          <option value="2">Other</option>
                        </Field>
                      </Col>

                      <Col md={4}>
                        <div className=" form-group">
                          <label>Licensed Date : </label>
                          <Field
                            name="licenseDate"
                            className="form-control profile-field"
                            type="date"
                          />
                        </div>
                      </Col>

                      <Col md={4}>
                        <div className=" form-group">
                          <label>Contact Number : </label>
                          <Field
                            validate={validateMobileNum}
                            name="mobilenumber"
                            className="form-control profile-field"
                          />
                          {errors.mobilenumber && touched.mobilenumber && (
                            <div className="error-message">
                              {errors.mobilenumber}
                            </div>
                          )}
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className=" form-group">
                          <label>Specialist : </label>
                          <Field
                            name="specialist"
                            className="form-control profile-field"
                          />
                        </div>

                      </Col>
                      <Col md={6}>
                        <div className=" form-group">
                          <label>Description : </label>
                          <Field
                            name="description"
                            className="form-control profile-field"
                          />
                        </div>
                      </Col>
                      {props.hospitalid ?
                        <>

                          <Col md={4}>
                            <div className=" form-group">
                              <label>Available Days : </label>
                              <Select
                                value={values.availableDays}
                                isMulti className="formControl roleSelect"
                                options={DAYS}
                                name="availableDays"
                                onChange={(item) => handleChooseDays(item, setFieldValue)}
                              ></Select>
                            </div>

                          </Col><Col md={4}>
                            <div className=" form-group">
                              <label>Start Time : </label>
                              <Field
                                name="starttime" type="time"
                                className="form-control profile-field"
                              />
                            </div>

                          </Col><Col md={4}>
                            <div className=" form-group">
                              <label>End Time : </label>
                              <Field
                                name="endtime" type="time"
                                className="form-control profile-field"
                              />
                            </div>
                          </Col>
                        </>
                        :
                        <></>
                      }

                    </Row>
                  </Container>
                </Col>
              </Row>

              <Row className="mb-4">
                <div className="textAlign-right">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={cancelProfileEdit}
                  >
                    Cancel
                  </button>
                  <button className="change-btn" type="submit">
                    Save
                  </button>
                </div>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default EditProfile;
