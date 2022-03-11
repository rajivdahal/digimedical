import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { Form, Button, Container, Row, Col, Nav, Image } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import Cliploader from "../../../../utils/clipLoader";
import { useFormik } from "formik";
import { validateHospital, validateServiceData } from "./hospital.helper";
import hospitalApi from "./hospitalServices";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const Hospital = (props) => {
  const imageSelectRef = useRef();
  const [loading, setLoading] = useState(false);
  const [hospitalID, setHospitalID] = useState("");
  const [selectedImage, setImage] = useState("");
  const [selectedImgName, setImgName] = useState("");
  const [digiServices, setDigiServices] = useState([]);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [errorMsg, setErrorMsg] = useState({});

  const [hospitalData, setHospitalData] = useState({
    name: "",
    description: "",
    establishedDate: "",
    panNo: "",
    contactNumber: "",
    mobileNumber: "",
    address: "",
    hospitalImage: "",
    link: "",
    email: "",
    country: "Nepal",
    password: "",
    confirmPassword: "",
    hospitalServices: [],
    serviceId: "",
    servicePrice: "",
  },

  );

  const [selectedServices, setSelectedService] = useState([]);

  const initialize = async () => {
    let allServices = await getDigiService();
    if (props.location.state && props.location.state.id != null) {
      await getHospitalById(allServices);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const getHospitalById = async (allServices) => {
    let id = props.location.state.id;
    if (id == null) return;
    setHospitalID(id);
    try {
      let resp = await hospitalApi.getHospitalById(id);
      if (resp.data.status) {
        let hospitalData = resp.data.data;
        let data = hospitalData.hospitalDetails;
        let serviceData = hospitalData.digiServicesDetails;

        let services = serviceData.map((service) => {
          return {
            serviceName: service.digiservicename,
            serviceID: service.digiserviceid,
            price: service.price,
          }
        })
        setSelectedService(services);
        let filteredServices = [];
        allServices.forEach((service) => {
          let exists = services.filter((item) => {
            return item.serviceID === service.value
          })
          if (exists.length === 0) {
            filteredServices.push(service);
          }
        });
        setServicesOptions(filteredServices);
        if (hospitalData) {
          let url = REACT_APP_BASE_URL + "hospital/download/" + id;
          setImage(url);
          setHospitalData({
            name: data.name,
            email: data.email,
            mobileNumber: data.mobilenumber,
            contactNumber: data.contactnumber,
            panNo: data.panno,
            description: data.description,
            establishedDate: data.establisheddate,
            address: data.address,
            link: data.websitelink,
          });

        }
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  };

  const getDigiService = async () => {
    let resp;
    try {
      resp = await hospitalApi.getDigiServices();
      console.log(resp)
      if (resp.data.status) {
        let data = resp.data.data;
        let trueDigiService = data.filter((item) => {
          return item.status == true
        })
        let options = trueDigiService.map((service) => {
          return {
            label: service.name,
            value: service.id,
          };
        })
        setDigiServices(options);
        setServicesOptions(options);
        return options;
      }
    }
    catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: hospitalData,
    onSubmit: (values) => {
      if (hospitalID) {
        editHospitalDetail(values);
      } else {
        handleCreateHospital(values);
      }
    },
    validate: (values) => {
      let isEdit = hospitalID ? true : false;
      return validateHospital(values, isEdit);
    },
  });

  const handleCreateHospital = async (values) => {
    try {

      let data = { ...values };
      let serviceData = selectedServices.map((item) => {
        return {
          digiServiceId: item.serviceID,
          price: parseFloat(item.price)
        }
      })
      setLoading(true);
      data.hospitalPricePojos = serviceData;
      let resp = await hospitalApi.createHospital(data);

      if (resp.data.status) {
        notify.success(resp.data.message);
        props.history.push("/dashboard/hospital-table");
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
    setLoading(false);
  };

  const editHospitalDetail = async (values) => {
    setLoading(true);
    try {
      let data = { ...values };
      let serviceData = selectedServices.map((item) => {
        return {
          digiServiceId: item.serviceID,
          price: parseFloat(item.price)
        }
      })
      setLoading(true);
      data.hospitalPricePojos = serviceData;
      let resp = await hospitalApi.editHospital(data, hospitalID);
      if (resp.data.status) {
        notify.success(resp.data.message);
        props.history.push("/dashboard/hospital-table");
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setHospitalID(null);
    setImage(null);
    setImgName(null);
    setHospitalData({
      name: "",
      description: "",
      establishedDate: "",
      panNo: "",
      contactNumber: "",
      mobileNumber: "",
      address: "",
      email: "",
      hospitalImage: "",
    });
    setSelectedService("");
    props.history.replace("/dashboard/add-hospital", null);
  };

  const handleAddImage = () => {
    imageSelectRef.current.click();
  };

  const handleChangeImage = (e) => {
    let files = e.target.files[0];
    let reader = new FileReader();
    formik.setFieldValue("hospitalImage", files);
    reader.onloadend = () => {
      setImage(reader.result.toString());
      setImgName(files.name);
    };
    reader.readAsDataURL(files);
  };

  const removeImage = () => {
    setImage(null);
    setImgName(null);
    formik.setFieldValue("hospitalImage", null);
  }

  const handleDigiServiceChange = (item) => {
    formik.setFieldValue("hospitalServices", item);
  }

  // handles adding services
  const handleAddServices = (values) => {
    if (!values.hospitalServices) return;
    let tempArr = [...selectedServices];
    let { value, label } = values.hospitalServices;
    let addedService = {
      serviceID: value,
      serviceName: label,
      price: values.servicePrice,

    }

    // validate service and price 
    const isValid = validateServiceData(addedService);
    if (!isValid.isValid) {
      setErrorMsg(isValid.errors)
      return;
    }
    tempArr.push(addedService);
    setSelectedService(tempArr);
    refreshServiceOptions(tempArr);
    formik.setFieldValue("hospitalServices", null);
    formik.setFieldValue("servicePrice", "");
  }

  const refreshServiceOptions = (selected) => {
    let filteredServices = [];
    digiServices.forEach((service) => {

      let exists = selected.filter((item) => {
        return item.serviceID === service.value
      })
      if (exists.length === 0) {
        filteredServices.push(service);
      }
    });
    setServicesOptions(filteredServices);
  }

  const removeService = (index) => {
    let tempArr = [...selectedServices];
    tempArr.splice(index, 1);
    setSelectedService(tempArr);
    refreshServiceOptions(tempArr)
  }

  return (
    <div>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name" className='formControl'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error-message">{formik.errors.name}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Established Date</Form.Label>
                <Form.Control
                  type="date" className='formControl'
                  name="establishedDate"
                  onChange={formik.handleChange}
                  value={formik.values.establishedDate}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.establishedDate &&
                  formik.errors.establishedDate ? (
                  <div className="error-message">
                    {formik.errors.establishedDate}
                  </div>
                ) : null}
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>PAN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="panNo" className='formControl'
                  onChange={formik.handleChange}
                  value={formik.values.panNo}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.panNo && formik.touched.panNo ? (
                  <div className="error-message">{formik.errors.panNo}</div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address" className='formControl'
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.address && formik.touched.address ? (
                  <div className="error-message">{formik.errors.address}</div>
                ) : null}
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country" className='formControl'
                  // onChange={formik.handleChange}
                  value={formik.values.country}
                  onBlur={formik.handleBlur}
                  disabled
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNumber" className='formControl'
                  onChange={formik.handleChange}
                  value={formik.values.contactNumber}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.contactNumber && formik.touched.contactNumber ? (
                  <div className="error-message">
                    {formik.errors.contactNumber}
                  </div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description" className='formControl'
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="error-message">
                    {formik.errors.description}
                  </div>
                ) : null}
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber" className='formControl'
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

            <Col md={4}>
              <Form.Group>
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  name="link" className='formControl'
                  onChange={formik.handleChange}
                  value={formik.values.link}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.link && formik.errors.link ? (
                  <div className="error-message">{formik.errors.link}</div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>

          {hospitalID ? (
            <></>
          ) : (
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email" className='formControl'
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
                    type="password"
                    name="password" className='formControl'
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                    <div className="error-message">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
          )}

          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Service</Form.Label>
                <Select
                  value={formik.values.hospitalServices}
                  className="serviceSelect formControl"
                  options={servicesOptions}
                  name="serviceId"
                  onChange={handleDigiServiceChange}
                ></Select>
                <div className="error-message">{errorMsg.serviceID}</div>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text" className='formControl'
                  name="servicePrice"
                  value={formik.values.servicePrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error-message">{errorMsg.price}</div>

              </Form.Group>
            </Col>
            <Col ms={2}>
              <Button className='mt-4' onClick={() => handleAddServices(formik.values)}>Add</Button>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              {selectedServices.length > 0 ?
                selectedServices.map((item, index) => {
                  return <div key={index}>
                        <p><span>{item.serviceName}</span>
                          <span style={{ marginLeft: "30px" }}>Rs. {item.price}</span>
                          <span className="removeBtn floatRight"
                            onClick={() => removeService(index)}>Remove</span>
                        </p>
                      </div>
                })
                :
                <></>
              }

            </Col>
          </Row>


          <Row>
            <Col md={5}>
              <Form.Label>Choose Photo </Form.Label>
              <Button variant="info" onClick={handleAddImage}>
                Browse
              </Button>
              <input
                onChange={(e) => handleChangeImage(e)}
                type="file"
                name="hospitalImage"
                style={{ display: "none" }}
                ref={imageSelectRef}
                accept="image/png, image/jpg, image/jpeg"
              ></input>
            </Col>

            <Col md={5}>
              <Image src={selectedImage} fluid className="image ml-3"></Image>
            </Col>
            {selectedImage ?
              <Col md={2}>
                <span style={{ color: "red" }} className="removeBtn" onClick={removeImage}>
                  x
                </span>
              </Col> : <></>
            }

          </Row>

          {loading == true ? (
            <Cliploader isLoading={loading} />
          ) : (
            <div>
              {hospitalID ? (
                <div className="textAlign-right">
                  <Button
                    variant="danger"
                    type="button"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="info"
                    type="submit"
                    style={{ marginLeft: "10px" }}
                  >
                    Edit
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

export default Hospital;
