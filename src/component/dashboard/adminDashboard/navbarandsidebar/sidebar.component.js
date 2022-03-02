import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CoPresentRounded from "@mui/icons-material/CoPresentRounded";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import VaccinesRoundedIcon from '@mui/icons-material/VaccinesRounded';
import WysiwygRoundedIcon from '@mui/icons-material/WysiwygRounded';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import "./nav.component.css";
import { useSelector } from "react-redux";

const Adminsidebar = (props) => {
  const sidebar = useSelector((state) => state.sidebar);
  const isSidebaropen = sidebar.isopen;
  const navigateDashboard = () => {
    props.props.push("/dashboard/")
  }
  return (
    <div>
      <div className="newdash_body sidebar-scroll">
        <div className="newdash_dash_main">
          <div className="newdash_dash1 sidebar-scroll">
            <Accordion>
              <ul>
                <li onClick={navigateDashboard} style={{ cursor: "pointer" }}>
                  <p id="newdash_dash1_cont1p">
                    {" "}
                    <span id="newdash_bar_ico">
                      {" "}
                      {/* <i class="fas fa-bars"></i> */}
                      <DashboardIcon ></DashboardIcon>

                    </span>{" "}
                    Dashboard
                  </p>
                </li>
                <li>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        <AssignmentIndOutlinedIcon></AssignmentIndOutlinedIcon>

                      </span>
                      Appointments
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/appointment"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              View Appointment
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
                <li>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        {" "}
                        <VaccinesRoundedIcon></VaccinesRoundedIcon>
                      </span>
                      Labtests
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/labtest"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>All Labtest</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/booked-labtest"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Booked Labtests</p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>

                <li>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        {" "}
                        <CoPresentRounded></CoPresentRounded>
                      </span>
                      Doctors
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/doctor-table"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>All Doctors</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/create-doctor"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Add Doctors</p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>

                <li>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        {" "}
                        <GroupRoundedIcon></GroupRoundedIcon>
                      </span>
                      User Management
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/role"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Role</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/admin"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Admin</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/permission"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Permissions</p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>

                <li>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        {" "}
                        <LocalHospitalIcon></LocalHospitalIcon>
                      </span>
                      Hospitals/Clinics
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/hospital-table"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>All Hospitals</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/add-hospital"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Add Hospital</p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>

                <li>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        {" "}
                        <CorporateFareOutlinedIcon></CorporateFareOutlinedIcon>
                      </span>
                      Corporate
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/corporate"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Add Corporate</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/add/corporate-types"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Add Corporate Types</p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>

                <li>
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        {" "}
                        <LibraryBooksIcon></LibraryBooksIcon>
                      </span>
                      Packages
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/package-description"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Master Package</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/membership-package"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Package</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/package-details"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Package Details</p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>

                <li>
                  <Accordion.Item eventKey="7">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        {" "}
                        <WysiwygRoundedIcon></WysiwygRoundedIcon>
                      </span>
                      Master Data
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/create-speciality"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Speciality</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/create-services"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Service</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/lab-test"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Add Lab Test</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/labtest-subcategory"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Labtest Subcategory</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/add-institute"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Lab Centers</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/body-checkup"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Add Body Checkup</p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>

              </ul>
            </Accordion>
          </div>
        </div>

        {/* mobile view sidebar */}
        {isSidebaropen ? (
          <div class="mobile-dashboard">
            <div className="newdash_dash1">
              <Accordion>
                <ul>
                  <li onClick={navigateDashboard} style={{ cursor: "pointer" }}>
                    <p id="newdash_dash1_cont1p">
                      {" "}
                      <span id="newdash_bar_ico">
                        {" "}
                        {/* <i class="fas fa-bars"></i> */}
                        <DashboardIcon ></DashboardIcon>

                      </span>{" "}
                      Dashboard
                    </p>
                  </li>
                  <li>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <span id="newdash_bar_ico">
                          <AssignmentIndOutlinedIcon></AssignmentIndOutlinedIcon>

                        </span>
                        Appointments
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/appointment"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>
                                View Appointment
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>
                  <li>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        <span id="newdash_bar_ico">
                          {" "}
                          <VaccinesRoundedIcon></VaccinesRoundedIcon>
                        </span>
                        Labtests
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/labtest"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>All Labtest</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/booked-labtest"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Booked Labtests</p>
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>

                  <li>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <span id="newdash_bar_ico">
                          {" "}
                          <CoPresentRounded></CoPresentRounded>
                        </span>
                        Doctors
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/doctor-table"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>All Doctors</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/create-doctor"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Add Doctors</p>
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>

                  <li>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        <span id="newdash_bar_ico">
                          {" "}
                          <GroupRoundedIcon></GroupRoundedIcon>
                        </span>
                        User Management
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/role"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Role</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/admin"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Admin</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/permission"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Permissions</p>
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>

                  <li>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        <span id="newdash_bar_ico">
                          {" "}
                          <LocalHospitalIcon></LocalHospitalIcon>
                        </span>
                        Hospitals/Clinics
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/hospital-table"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>All Hospitals</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/add-hospital"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Add Hospital</p>
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>

                  <li>
                    <Accordion.Item eventKey="5">
                      <Accordion.Header>
                        <span id="newdash_bar_ico">
                          {" "}
                          <CorporateFareOutlinedIcon></CorporateFareOutlinedIcon>
                        </span>
                        Corporate
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/corporate"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Add Corporate</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/add/corporate-types"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Add Corporate Types</p>
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>

                  <li>
                    <Accordion.Item eventKey="6">
                      <Accordion.Header>
                        <span id="newdash_bar_ico">
                          {" "}
                          <LibraryBooksIcon></LibraryBooksIcon>
                        </span>
                        Packages
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/package-description"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Master Package</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/membership-package"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Package</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/package-details"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Package Details</p>
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>

                  <li>
                    <Accordion.Item eventKey="7">
                      <Accordion.Header>
                        <span id="newdash_bar_ico">
                          {" "}
                          <WysiwygRoundedIcon></WysiwygRoundedIcon>
                        </span>
                        Master Data
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/create-speciality"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Speciality</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/create-services"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Service</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/lab-test"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Add Lab Test</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/labtest-subcategory"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Labtest Subcategory</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/add-institute"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Lab Centers</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/body-checkup"
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <p style={{ cursor: "pointer" }}>Add Body Checkup</p>
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>

                </ul>
              </Accordion>
            </div>
          </div>
        ) : null}

        {/* mobile view sidebar */}
      </div>
    </div>
  )
}
export default Adminsidebar