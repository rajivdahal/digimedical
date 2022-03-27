import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";


const Corporatesidebar = (props) => {
  const history = useHistory();

  const sidebar = useSelector((state) => state.sidebar);
  const isSidebaropen = sidebar.isopen;

  const navigateDashboard = () => {
    history.push("/dashboard/")
  }
  const navigateAddMembers=()=>{
    history.push("/dashboard/corporate/add-members")

  }

  const handlePackage=()=>{
    history.push("/dashboard/corporate/book-packages")

  }
  return (
    <>
        <div>
      <div className="newdash_body">
        <div className="newdash_dash_main">
          <div className="newdash_dash1">
            <Accordion>
              <ul>
                <li onClick={navigateDashboard} style={{ cursor: "pointer" }}>
                  <p id="newdash_dash1_cont1p">
                    {" "}
                    <span id="newdash_bar_ico">
                      {" "}
                      <i class="fas fa-bars"></i>
                    </span>{" "}
                    &nbsp;Dashboard
                  </p>
                </li>
                <li>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        <i class="fas fa-user-clock"></i>
                      </span>
                      &nbsp;Appointments
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/corporate/viewappointment"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              View Appointment
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/corporate/bookappointment"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              {" "}
                              Book Appointment
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
                        <i class="fas fa-file-medical"></i>
                      </span>
                      &nbsp;Members
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/corporate/add-users"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Add Users</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/corporate/add-members"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>Members Table</p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
              

                {/* <li>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        <i class="fas fa-user-clock"></i>
                      </span>
                      &nbsp;Package
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/book-package"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              {" "}
                              Book Package
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/booked-packages"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              {" "}
                              Booked Package
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li> */}

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
                        <i class="fas fa-bars"></i>
                      </span>{" "}
                      &nbsp;Dashboard
                    </p>
                  </li>
                  <li>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <span id="newdash_bar_ico">
                          <i class="fas fa-user-clock"></i>
                        </span>
                        &nbsp;Appointments
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/corporate/viewappointment"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <p style={{ cursor: "pointer" }}>
                                View Appointment
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/corporate/bookappointment"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <p style={{ cursor: "pointer" }}>
                                {" "}
                                Book Appointment
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
                          <i class="fas fa-file-medical"></i>
                        </span>
                        &nbsp;Members
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="accordion-body">
                          <li>
                            <Link
                              to="/dashboard/corporate/add-users"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <p style={{ cursor: "pointer" }}>
                                Add Users
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dashboard/corporate/add-members"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <p style={{ cursor: "pointer" }}>Members Table</p>
                            </Link>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>
                  

                {/* <li>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <span id="newdash_bar_ico">
                        <i class="fas fa-user-clock"></i>
                      </span>
                      &nbsp;Package
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="accordion-body">
                        <li>
                          <Link
                            to="/dashboard/book-package"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              {" "}
                              Book Package
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard/booked-packages"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <p style={{ cursor: "pointer" }}>
                              {" "}
                              Booked Package
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </li> */}

                </ul>
              </Accordion>
            </div>
          </div>
        ) : null}

        {/* mobile view sidebar */}
      </div>
    </div>
    </>
  )
}
export default Corporatesidebar