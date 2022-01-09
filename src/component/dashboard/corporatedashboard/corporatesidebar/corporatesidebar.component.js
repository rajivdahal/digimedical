import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
const Corporatesidebar = (props) => {
    const history=useHistory()
  const navigateDashboard = () => {
   history.push("/dashboard/")
      }
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <p className="centered mt-3"><div href="profile.html">
          {/* <img className="img-circle user-img-circle img-fluid" width="80" /> */}
        </div></p>
        <ul className="nav">
          <li className="nav-item" onClick={navigateDashboard} style={{ cursor: "pointer" }}>
            <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="doctors">
              <i className="fas fa-bars menu-icon"></i>
              <span className="menu-title">dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <div className="nav-link" data-toggle="collapse" href="#appointment" aria-expanded="false" aria-controls="appointment" style={{cursor:"pointer"}}>
              <i className="icon-layout menu-icon"></i>
              <span className="menu-title">Appointments</span>
              <i className="menu-arrow"></i>
            </div>
            {/* <Link to="/dashboard/viewappointment"> */}
              <div className="collapse" id="appointment">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <div className="nav-link" href="">View Appointment</div></li>
                </ul>
              </div>
            {/* </Link> */}
          </li>


          <li className="nav-item">
            <div className="nav-link" data-toggle="collapse" href="#patients" aria-expanded="false" aria-controls="patients" style={{cursor:"pointer"}}>
            <i class="fas fa-users menu-icon"></i>
              <span className="menu-title">Members</span>
              <i className="menu-arrow"></i>
            </div>
            <div className="collapse" id="patients">
              <ul className="nav flex-column sub-menu">
                <Link to="/dashboard/corporate/add-members">
                  <li className="nav-item"> <div className="nav-link" href="">Add Members</div></li>
                </Link>
                  <li className="nav-item"> <div className="nav-link" href="">View Members</div></li>

              </ul>
            </div>
          </li>
         

        </ul>
      </nav>

    </>
  )
}
export default Corporatesidebar