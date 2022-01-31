import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Modal,
} from "react-bootstrap";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Cliploader from "../../../../utils/clipLoader";
import { useFormik } from "formik";
import { validateAdmin } from "./admin.helper";
import MaterialTable from "material-table";
import Tableicons from "../../../../utils/materialicons";
import { Edit, Clear } from "@material-ui/icons";
import Avatar from "../../../../assets/avatars.png";
import "./admin.component.css";
import UserManagementApi from "./userManageService";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const CreateAdmin = (props) => {
  const imageSelectRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminStatus, setAdminStatus] = useState("");
  const [allAdmin, setAllAdmin] = useState([]);
  const [allRole, setAllRole] = useState([]);
  const [adminInfo, setAdminInfo] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    dob: "",
    adminImage: "",
    selectedRole: "",
    roleID: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const getAllAdmin = async () => {
    setLoading(true);
    try {
      let resp = await UserManagementApi.getAllAdmin();
      if (resp.data.status) {
        let data = resp.data.data;
        data.forEach((admin) => {
          admin.adminName = admin.firstName + " " + admin.lastName;
        });
        setAllAdmin(data);
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  }

  const getAllRoles = async () => {
    setLoading(true)
    try {
      let resp = await UserManagementApi.getRole();
      if (resp.data.status) {
        let result = resp.data.data; 
        
        let options = result.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        });
        setAllRole(options);
      }
    }
    catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    getAllRoles();
    getAllAdmin();
  }, []);

  const createAdmin = async (values) => {
    setLoading(true);
    try {
      let resp = await UserManagementApi.createAdmin(values);
      if (resp.data.status) {
        notify.success(resp.data.message);
        formik.resetForm();
        getAllAdmin();
      }
    }
    catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
    setLoading(false)
  };


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: adminInfo,
    onSubmit: (values) => {
      if (adminId) {
        editAdminInfo(values);
      } else {
        createAdmin(values);
      }
    },
    validate: (values) => {
      let isEdit = adminId ? true : false;
      return validateAdmin(values, isEdit);
    },
  });

  const setAdminEditData = (e, data) => {
    let id = data.userId;
    setAdminId(data.id);
    if (data) {
      let url = REACT_APP_BASE_URL + "admin/download/" + id;
      setImage(url);

      // let admindRole = [];
      // allRole.forEach((role) => {
      //   let foundRole = data.roles.filter((item) => {
      //     return (item.id == role.value)
      //   });
      //   if (foundRole.length > 0) {
      //     admindRole.push(foundRole)
      //   };
      // })
      setAdminInfo({
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dob: data.dob,
        mobileNumber: data.mobileNumber,
        // selectedRole: admindRole,
      });
      window.scrollTo(0, 0);
    }
  };

  const editAdminInfo = async (values) => {
    setLoading(true);
    try {

      let resp = await UserManagementApi.editAdmin(values, adminId);
      if (resp.data.status) {
        notify.success(resp.data.message);
        getAllAdmin();
        setAdminId(null);
        setImage(null);
        setAdminInfo({
          firstName: "",
          lastName: "",
          mobileNumber: "",
          email: "",
          dob: "",
        });
      }
    }
    catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setAdminId(null);
    setAdminInfo({
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      dob: "",
      adminImage: "",
    });
    setImage(null);
  };

  const handleAddImage = () => {
    imageSelectRef.current.click();
  };

  const handleChangeImage = (e) => {
    let files = e.target.files[0];
    let reader = new FileReader();
    formik.setFieldValue("adminImage", files);
    reader.onloadend = () => {
      setImage(reader.result.toString());
    };
    reader.readAsDataURL(files);
  };

  const removeImage = () => {
    setImage(null);
    formik.setFieldValue("adminImage", null);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDeactivateAdmin = (e, data) => {
    setAdminStatus(data.activeStatus);
    setAdminId(data.id);
    setShowModal(true);
  };

  const changeAdminStatus = async() => {
    setLoading(true);

    try{
      let resp = await UserManagementApi.changeAdminStatus(adminStatus,adminId);
      if (resp.data.status) {
        notify.success(resp.data.message);
        setLoading(false);
        getAllAdmin();
        handleClose();
      }
    }
    catch(err){
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
    setLoading(false);
  }

  const handleRoleChange = (item) => {
    console.log(item);
    formik.setFieldValue("selectedRole", item);
  };

  return (
    <div>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName" className='formControl'
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
                  name="middleName" className='formControl'
                  onChange={formik.handleChange}
                  value={formik.values.middleName}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.middleName && formik.errors.middleName ? (
                  <div className="error-message">
                    {formik.errors.middleName}
                  </div>
                ) : null}
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName" className='formControl'
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

          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob" className='formControl'
                  onChange={formik.handleChange}
                  value={formik.values.dob}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.dob && formik.touched.dob ? (
                  <div className="error-message">{formik.errors.dob}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Select
                  value={formik.values.selectedRole}
                  options={allRole}
                  name="roleID" className="roleSelect formControl"
                  onChange={handleRoleChange}
                ></Select>
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
          </Row>

          <Row>
            <Col md={12}>
              {adminId ? (
                <></>
              ) : (
                <Row>
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
                        <div className="error-message">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password" className='formControl'
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
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Label>Choose Photo </Form.Label>
              <Button variant="info" onClick={handleAddImage}>
                Browse
              </Button>
              <input
                onChange={(e) => handleChangeImage(e)}
                type="file"
                name="adminImage"
                style={{ display: "none" }}
                ref={imageSelectRef}
                accept="image/png, image/jpg, image/jpeg"
              ></input>
            </Col>

            <Col md={4}>
              <Image
                src={selectedImage}
                fluid
                className="image ml-3"
                roundedCircle
              ></Image>
            </Col>
            {selectedImage ? 
            <Col md={2}>
            <span style={{ color: 'red',cursor: 'pointer' }} onClick={removeImage}>x</span>

          </Col>
          :
          <></>
            }
            
          </Row>
          <div className="textAlign-right  mb-5">
            {loading == true ? (
              <Cliploader isLoading={loading} />
            ) : (
              <div>
                {adminId ? (
                  <div>
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
                  <div>
                    <Button variant="info" type="submit">
                      Create
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Form>

        <MaterialTable
          title="Admin Details "
          icons={Tableicons}
          data={allAdmin}
          columns={[
            { title: '#', field: 'tableData.id', render:rowData => rowData.tableData.id+1},
            { title: "Name", field: "adminName" },
            { title: "Mobile Number", field: "mobileNumber" },
            { title: "email", field: "email" },
            {
              title: "Status",
              field: "status",
              render: (rowData) =>
                rowData.activeStatus == true ? (
                  <span style={{ color: "#18af69" }}>Active</span>
                ) : (
                  <span style={{ color: "red" }}>inActive</span>
                ),
            },
          ]}
          actions={[
            {
              icon: Edit,
              tooltip: "Edit Admin",
              onClick: (e, rowData) => {
                setAdminEditData(e, rowData);
              },
            },
            {
              icon: Clear,
              tooltip: "Change Status",
              onClick: (e, rowData) => {
                handleDeactivateAdmin(e, rowData);
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            pageSize: 10,
            headerStyle: {
              backgroundColor: "#2745F0",
              color: "#FFF",
            },
          }}
          isLoading={loading}
        />

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <b>Admin Status</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you really want to change this admin status ?
          </Modal.Body>
          <Modal.Footer>
            {loading == true ? (
              <Cliploader isLoading={loading} />
            ) : (
              <div>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="info"
                  style={{ marginLeft: "10px" }}
                  onClick={changeAdminStatus}
                >
                  Change Status
                </Button>
              </div>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};
export default CreateAdmin;
