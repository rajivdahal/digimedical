import { useState } from "react";
import { Image, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Avatar from "../../../../assets/avatars.png";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import "./searchmember.css";

export default function SearchMember() {

  const history = useHistory()
  const [userEmails, setUserEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const formatOptions = (data) => {
    const options = data.map((item) => {
      return {
        label: item.username,
        value: item.username
      }
    })
    return options;
  }

  const handleChange = async (e) => {
    
    setEmail(e.target.value);
    try {
      const resp = await httpClient.GET("search-user/" + e.target.value, false, true);
      console.log(resp);
      setDropdownVisible(true);
      if (resp && resp.data) {
        const { data } = resp.data;
        const options = formatOptions(data)
      
        setUserEmails(options)
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }    }
  }

  const handleGetDetails = async (data) => {
    setEmail(data);
    setDropdownVisible(false)
    
    try {
      let resp = await httpClient.GET("get-search-user/" + data, false, true);
     
      if (resp.data.status) {
        setUserDetails(resp.data.data)
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }    }
    setEmail("")
  }

  const handleAddUser = async(email) => {
    let data= {
      email
    }
    try{
      let resp = await httpClient.POST("corporate/add/existing-member",data,false,true);
  
      if(resp.data.status) {
        notify.success(resp.data.message);
        history.push("/dashboard/corporate/add-members");
        setEmail("");
      }
    }
    catch(err) {
      if (err && err.response && err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  }

  return (
    <div className="corp-ad-search-mem">
      <Container>
        <div className="corp-admem-search-bar" style={{ position: "relative" }}>
          <div className="cadmem-search-bar">
            <input type="text" name="email" value={email} onChange={handleChange} autoComplete="off" />
            <div className="cadmem-search-icon">
              {" "}
              <span>
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>

          <ul>
            {console.log(userDetails)}
            {userEmails.length > 0 ?
              <div style={{
                position: 'absolute', display: dropdownVisible ? 'block' : 'none', top: '40px', zIndex: 100, height: '150px', overflowY: 'auto',
                overflowX: "none", backgroundColor: "white"
              }}>
                {userEmails.map((item, index) => {
                  return <li key={index} style={{cursor : "pointer"}} onClick={() => handleGetDetails(item.value)}>{item.label}</li>
                })}
              </div>
              :
              <></>
            }
          </ul>
        </div>

        <Row>
          <Col md={3}>
            <div className="about_user_viewp">
              <div className="image-profile textAlign-center">
                <Image
                  src={Avatar}
                  fluid
                  roundedCircle
                  className="imag-profile"
                ></Image>
              </div>
              <div className="textAlign-center">
                <div className="credentials-name">
                  {userDetails.firstname} {userDetails.middlename} {userDetails.lastname}
                </div>
                <div className="credentials-email">{userDetails.email}</div>
              </div>
              <div className="textAlign-center">
                <div className="credentials-name"></div>
                <div className="credentials-email"></div>
              </div>
            </div>
          </Col>

          <Col md={9}>
            <Row>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Role</span>
                  <span>:</span>
                  <span className="info-value">Patient</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Address </span>
                  <span>:</span>
                  <span className="info-value">{userDetails.address }</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">DOB</span>
                  <span>:</span>
                  <span className="info-value">{ userDetails.dateofbirth}</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Age</span>
                  <span>:</span>
                  <span className="info-value">{ userDetails.age}</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Height</span>
                  <span>:</span>
                  <span className="info-value">{userDetails.height} ft</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Weight</span>
                  <span>:</span>
                  <span className="info-value">{ userDetails.weight} kg</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Blood Group</span>
                  <span>:</span>
                  <span className="info-value">{userDetails.bloodgroup }</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Gender</span>
                  <span>:</span>
                  <span className="info-value">{userDetails.gender == 1 ? "Female" : "Male"}</span>
                </div>
              </Col>

              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Contact</span>
                  <span>:</span>
                  <span className="info-value">{userDetails.mobilenumber}</span>
                </div>
              </Col>

              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Father's Name</span>
                  <span>:</span>
                  <span className="info-value">{userDetails.fathername}</span>
                </div>
              </Col>
              <div className="corp-srch-last-but">
                <button type="button" onClick={()=>handleAddUser(userDetails.email)}>Add</button>
              </div>
            </Row>
          </Col>
        </Row>


      </Container>
    </div>
  );
}
