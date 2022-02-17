import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";
import WysiwygRoundedIcon from '@mui/icons-material/WysiwygRounded';

const Corporatesidebar = (props) => {
  const history = useHistory();
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
            <div className="nav-link" data-toggle="collapse" href="#appointment" aria-expanded="false" aria-controls="appointment" style={{ cursor: "pointer" }}>
              <i className="icon-layout menu-icon"></i>
              <span className="menu-title">Appointments</span>
              <i className="menu-arrow"></i>
            </div>
            <Link to="/dashboard/corporate/viewappointment">
              <div className="collapse" id="appointment">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <div className="nav-link" href="">View Appointment</div></li>
                </ul>
              </div>
            </Link>
            <Link to="/dashboard/corporate/bookappointment">
              <div className="collapse" id="appointment">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <div className="nav-link" href="">Book Appointment</div></li>
                </ul>
              </div>
            </Link>
          </li>


          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#members" aria-expanded="false" aria-controls="members">
            <i class="fas fa-users menu-icon"></i>
              <span className="menu-title">Members</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="members">
              <ul className="nav flex-column sub-menu">
              <Link to="/dashboard/corporate/add-members">
                  <li className="nav-item"><a className="nav-link" href="">Members Table</a></li>
                </Link>
                <Link to="/dashboard/corporate/add-users">
                <li className="nav-item"><a className="nav-link" href="">Add Users</a></li>
                </Link>
              </ul>
            </div>
          </li>

          <li className="nav-item" onClick={handlePackage} style={{ cursor: "pointer" }}>
            <a className="nav-link" data-toggle="collapse" aria-expanded="false" aria-controls="package">
              <i className="fas fa-bars menu-icon"></i>
              <span className="menu-title">Packages</span>
            </a>
          </li>

        </ul>
      </nav>
    </>
  )
}
export default Corporatesidebar