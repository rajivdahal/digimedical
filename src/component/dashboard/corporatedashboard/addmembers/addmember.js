import { useEffect, useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { notify } from "../../../../services/notify";
import Cliploader from "../../../../utils/clipLoader";
import { useFormik } from "formik";
import { httpClient } from "../../../../utils/httpClient";
import { validateCorporateUser } from "./validateUser";

const CorporateUser = (props) => {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "0",
    mobileNumber: "",
    address: "",
    dob: "",
    email: "",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: userData,
    onSubmit: (values) => {
      console.log(values);
      createCorporateUSer(values);
    },
    validate: (values) => {
      return validateCorporateUser(values);
    },
  });

  const createCorporateUSer = async (values) => {
    try {
      setLoading(true);
      let resp = await httpClient.POST("corporate/members/create", values, false, true);
      if (resp.data.status) {
        notify.success(resp.data.message);
        formik.resetForm();
        props.history.push("/dashboard/corporate/add-members");
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
    setLoading(false);
  }

  return (

    <div className="edit-profile">

      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={9}>
            <Form onSubmit={formik.handleSubmit}>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
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

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="middleName"
                      onChange={formik.handleChange}
                      value={formik.values.middleName}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.middleName && formik.touched.middleName ? (
                      <div className="error-message">{formik.errors.middleName}</div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Last Name </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName &&
                      formik.errors.lastName ? (
                      <div className="error-message">
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <select
                      class="select-control"
                      name="gender"
                      onChange={formik.handleChange}
                      value={formik.values.gender}
                      onBlur={formik.handleBlur}
                    >
                      <option value="0">Male</option>
                      <option value="1">Female</option>
                      <option value="2">Other</option>
                    </select>
                    {formik.errors.address && formik.touched.address ? (
                      <div className="error-message">{formik.errors.address}</div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      onChange={formik.handleChange}
                      value={formik.values.dob}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.dob && formik.touched.dob ? (
                      <div className="error-message">
                        {formik.errors.dob}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.address && formik.touched.address ? (
                      <div className="error-message">
                        {formik.errors.address}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>


              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
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
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
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
              </Row>


              {loading == true ? (
                <Cliploader isLoading={loading} />
              ) : (

                <div className="textAlign-right">
                   <button type="button" className="cancel-btn">
                  Cancel
                </button>
                <button className="change-btn" type="submit">
                  Save
                </button>
                </div>
              )}
            </Form>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default CorporateUser;
