import { useEffect, useRef, useState } from "react";
import { Form, Button, Container, Row, Col, Nav, Image } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Cliploader from "../../../../utils/clipLoader";
import "./doctor.component.css";
import { useFormik } from "formik";
import { validateDoctor } from "./doctor.helper";
import Avatar from "../../../../assets/avatars.png";
import Select from "react-select";
import doctorApi from "./doctor.services";
import { DAYS } from "../../../../constants/constants";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const Createdoctor = (props) => {
  // all services

  const [services, setServices] = useState([]);
  const imageSelectRef = useRef();
  const days = DAYS;
  const [doctorId, setDoctorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setImage] = useState("");
  const [selectedImgName, setImgName] = useState("");
  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "0",
    email: "",
    prefix: "0",
    nmcNumber: "",
    specialist: "",
    description: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    licensedDate: "",
    doctorImage: "",
    serviceID: "",
    availableDays: [days[0]],
    startTime: "",
    endTime: "",
    doctorServices: [],
  });
  const doctorTablePath = {
    hospital: "/dashboard/hospital-doctor",
    admin: "/dashboard/doctor-table",
  };

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    let allServices = await getServices();
    if (props.location && props.location.state) {
      let id = null;
      if (props.isHospital) {
        if (props.location.state.doctorid != null) {
          id = props.location.state.doctorid;
        }
      } else if (props.location.state.id != null) {
        id = props.location.state.id;
      }
      setDoctorId(id);
      await getDoctorById(id, allServices);
    }
  };

  const getServices = async () => {
    let allServices = await httpClient
      .GET("services/true", false, true)
      .then((resp) => {
        console.log(resp)
        if (resp.data.status) {
          let data = resp.data.data;
          return data;
        }
      })
      .catch((err) => {
        return [];
      });

    let options = allServices.map((service, index) => {
      return {
        label: service.servicename,
        value: service.id,
      };
    });
    setServices(options);
    return allServices;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: doctorData,
    onSubmit: async (values) => {
      if (doctorId) {
        await editDoctorDetail(values);
      } else {
        await handleCreateDoctor(values);
      }
    },
    validate: (values) => {
      let isEdit = doctorId ? true : false;
      let isHospital = props.isHospital ? true : false;
      return validateDoctor(values, isEdit, isHospital);
    },
  });

  const handleCreateDoctor = async (values) => {
    setLoading(true);
    try {
      let resp;
      if (props.isHospital) {
        let hospitalId = localStorage.getItem("userid");
        console.log(hospitalId);
        resp = await doctorApi.createHospitalDoctor(values);
      } else {
        resp = await doctorApi.createAdminDoctor(values);
      }
      if (resp.data.status) {
        notify.success(resp.data.message);
        formik.resetForm();
        props.history.push(
          props.isHospital ? doctorTablePath.hospital : doctorTablePath.admin
        );
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
    setLoading(false);
  };

  const getDoctorById = async (id, allServices) => {
    let resp;
    try {
      if (props.isHospital) {
        resp = await doctorApi.getHospitalDoctorById(id);
      } else {
        resp = await doctorApi.getAdminDoctorBYId(id);
      }

      if (resp.data.status) {
        // get doctor services + basic details
        let responseData = resp.data.data;
        let data = responseData.basicDetails;
        let serviceData = responseData.services;
        let selectedDays = [];
        if (data.availabledays) {
          let dayArr = data.availabledays.split(",");
          days.forEach((day) => {
            let foundDay = dayArr.filter((item) => {
              return item == day.value;
            });
            if (foundDay.length > 0) {
              selectedDays.push(day);
            }
          });
        }
        // get services details from service data
        let savedServices = [];
        allServices.forEach((service) => {
          let found = serviceData.filter((item) => {
            return item.id.toString() === service.id.toString();
          });
          if (found.length > 0) {
            savedServices.push({
              label: service.servicename,
              value: service.id,
            });
          }
        });

        if (data) {
          let url = REACT_APP_BASE_URL + "doctor/download/" + id;
          setImage(url);
          let docData = {
            prefix: data.prefix,
            specialist: data.specialist,
            description: data.description,
            mobileNumber: data.mobilenumber,
            doctorServices: savedServices,
            gender : data.gender,
            serviceID: null,
          };
          if (props.isHospital) {
            docData = {
              ...docData,
              ...{
                firstName: data.firstname,
                lastName: data.lastname,
                middleName: data.middlename,
                availableDays: selectedDays,
                startTime: data.starttime,
                endTime: data.endtime,
                nmcNumber: data.nmcno,
                licensedDate: data.liscencedate,
              },
            };
          } else {
            docData = {
              ...docData,
              ...{
                firstName: data.firstName,
                lastName: data.lastName,
                middleName: data.middleName,
                nmcNumber: data.nmcNo,
                licensedDate: data.liscenceDate,
              },
            };
          }
          setDoctorData(docData);
          setImgName(data.image);
        }
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  };

  const editDoctorDetail = async (values) => {
    setLoading(true);
    try {
      let resp;
      if (props.isHospital) {
        resp = await doctorApi.editHospitalDoctor(values, doctorId);
      } else {
        resp = await doctorApi.editAdminDoctor(values, doctorId);
      }
      if (resp.data.status) {
        notify.success(resp.data.message);
        props.history.push(
          props.isHospital ? doctorTablePath.hospital : doctorTablePath.admin
        );
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setDoctorId(null);
    setDoctorData({
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      prefix: "0",
      gender : "0",
      nmcNumber: "",
      specialist: "",
      description: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
      licensedDate: "",
      serviceID: "",
      doctorServices: [],
      doctorImage: "",
    });
    setImage("");
    setImgName("");
    props.history.replace(
      props.isHospital ? doctorTablePath.hospital : doctorTablePath.admin,
      null
    );
  };

  const handleAddImage = () => {
    imageSelectRef.current.click();
  };

  const handleChangeImage = (e) => {
    let files = e.target.files[0];
    let reader = new FileReader();
    formik.setFieldValue("doctorImage", files);
    reader.onloadend = () => {
      setImage(reader.result.toString());
      setImgName(files.name);
    };
    reader.readAsDataURL(files);
  };

  const removeImage = () => {
    setImage(null);
    setImgName(null);
    formik.setFieldValue("doctorImage", null);
  };

  const handleServiceChange = (item) => {
    console.log(item);
    formik.setFieldValue("doctorServices", item);
  };

  const handleChooseDays = (item) => {
    formik.setFieldValue("availableDays", item);
  };

  return (
    <div>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Col md={2}>
              <Form.Group>
                <Form.Label>Prefix</Form.Label>
                <select
                  class="select-control formControl"
                  aria-label="Default select example"
                  name="prefix"
                  onChange={formik.handleChange}
                  value={formik.values.prefix}
                  onBlur={formik.handleBlur}
                >
                  <option value="0">MD</option>
                  <option value="1">MS</option>
                  <option value="2">MBBS</option>
                  <option value="3">MBBS MD</option>
                  <option value="4">MBBS MS</option>
                </select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text" className='formControl'
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="error-message">{formik.errors.firstName}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text" className='formControl'
                  name="middleName"
                  onChange={formik.handleChange}
                  value={formik.values.middleName}
                  onBlur={formik.handleBlur}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text" className='formControl'
                  name="lastName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="error-message">{formik.errors.lastName}</div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <select
                  class="select-control formControl"
                  aria-label="Default select example"
                  name="gender"
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                  onBlur={formik.handleBlur}
                >
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                  <option value="2">Other</option>
                </select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>NMC Number</Form.Label>
                <Form.Control
                  type="text" className='formControl'
                  name="nmcNumber"
                  onChange={formik.handleChange}
                  value={formik.values.nmcNumber}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.nmcNumber && formik.touched.nmcNumber ? (
                  <div className="error-message">{formik.errors.nmcNumber}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text" className='formControl'
                  name="mobileNumber"
                  onChange={formik.handleChange}
                  value={formik.values.mobileNumber}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.mobileNumber && formik.touched.mobileNumber ? (
                  <div className="error-message">
                    {formik.errors.mobileNumber}
                  </div>
                ) : null}
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Registered Date</Form.Label>
                <Form.Control
                  type="date" className='formControl'
                  name="licensedDate"
                  onChange={formik.handleChange}
                  value={formik.values.licensedDate}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.licensedDate && formik.touched.licensedDate ? (
                  <div className="error-message">
                    {formik.errors.licensedDate}
                  </div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Row>
                <Col md={11}>
                  <Form.Label>Service </Form.Label>
                  <Select 
                    value={formik.values.doctorServices}
                    isMulti className="roleSelect formControl"
                    options={services}
                    name="serviceID"
                    onChange={handleServiceChange}
                  ></Select>
                </Col>
              </Row>
            </Col>

            <Col md={6}>
              <Row>
                <Col md={5}>
                  <Form.Label>Choose Photo </Form.Label>
                  <Button variant="info" onClick={handleAddImage}>
                    Browse
                  </Button>
                  <input
                    onChange={(e) => handleChangeImage(e)}
                    type="file"
                    name="doctorImage"
                    style={{ display: "none" }}
                    ref={imageSelectRef}
                    accept="image/png, image/jpg, image/jpeg"
                  ></input>
                </Col>

                <Col md={5}>
                  <Image
                    src={selectedImage ? selectedImage : Avatar}
                    fluid
                    className="image ml-3"
                    roundedCircle
                  ></Image>
                  {/* <div>{selectedImgName}</div> */}
                </Col>
                {selectedImage ?
                  <Col md={2}>
                    <span style={{ color: "red" }} className="removeBtn" onClick={removeImage}>
                      x
                    </span>
                  </Col>
                  :
                  <></>
                }

              </Row>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Specialist</Form.Label>
                <Form.Control
                  type="text" className='formControl'
                  name="specialist"
                  onChange={formik.handleChange}
                  value={formik.values.specialist}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.specialist && formik.touched.specialist ? (
                  <div className="error-message">
                    {formik.errors.specialist}
                  </div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  type="text" className='formControl'
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.description && formik.touched.description ? (
                  <div className="error-message">
                    {formik.errors.description}
                  </div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
          {props.isHospital ? (
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Available Days</Form.Label>
                  <Select
                    value={formik.values.availableDays}
                    isMulti className="formControl select-control"
                    options={DAYS}
                    name="availableDays"
                    onChange={handleChooseDays}
                  ></Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time" className='formControl'
                    name="startTime"
                    onChange={formik.handleChange}
                    value={formik.values.startTime}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.startTime && formik.touched.startTime ? (
                    <div className="error-message">
                      {formik.errors.startTime}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time" className='formControl'
                    name="endTime"
                    onChange={formik.handleChange}
                    value={formik.values.endTime}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.endTime && formik.touched.endTime ? (
                    <div className="error-message">{formik.errors.endTime}</div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
          ) : (
            <></>
          )}

          {doctorId ? (
            <></>
          ) : (
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email" className='formControl'
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="error-message">{formik.errors.email}</div>
                  ) : null}
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password" className='formControl'
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="error-message">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password" className='formControl'
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword ? (
                    <div className="error-message">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
          )}

          {loading == true ? (
            <Cliploader isLoading={loading} />
          ) : (
            <div>
              {doctorId ? (
                <div className="textAlign-right">
                  <Button variant="info" type="submit">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    style={{ marginLeft: "10px" }}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="textAlign-right">
                  <Button variant="info" type="submit">
                    Create
                  </Button>
                </div>
              )}
            </div>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default Createdoctor;
