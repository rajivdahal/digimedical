import { useState } from "react";
import { Image, Row, Col, Container } from "react-bootstrap";
import Avatar from "../../../../assets/avatars.png";
import { httpClient } from "../../../../utils/httpClient";
import "./searchmember.css";

export default function SearchMember() {

  const [userEmails,setUserEmails] = useState([]);
  const [email,setEmail]= useState("");
  const [userDetails,setUserDetails] = useState({});
  const [dropdownVisible,setDropdownVisible] = useState(false);

  const formatOptions=(data)=>{
    const options = data.map((item)=>{
      return {
        label  : item.username,
        value : item.username
      }
    })
    return options;
  }

  const handleChange=async(e)=>{
    console.log(e.target.value)
    setEmail(e.target.value);
    try{
      const resp = await httpClient.GET("search-user/"+e.target.value,false,true);
      console.log(resp);
      setDropdownVisible(true);
      if (resp && resp.data) {
        const { data } = resp.data;
        const options = formatOptions(data)
        console.log(options)
        setUserEmails(options)
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleGetDetails=async(data)=>{
    setEmail(data);
    setDropdownVisible(false)
    console.log(data)
    try{
      let resp = await httpClient.GET("get-search-user/"+data,false,true);
      console.log(resp)
      if(resp.data.status) {
        setUserDetails(resp.data.data)
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="corp-ad-search-mem">
      <Container>
        <div className="corp-admem-search-bar" style={{position:"relative"}}>
          <div className="cadmem-search-bar">
            <input type="text"  name="email" value={email} onChange={handleChange}/>
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
                <div style={{position:'absolute', display: dropdownVisible ? 'block': 'none', top: '40px', zIndex:100, height:'150px', overflowY : 'auto',
                 overflowX : "none",backgroundColor : "white"}}>
                  { userEmails.map((item,index)=>{
                  return <li key={index} onClick={()=>handleGetDetails(item.value)}>{item.label}</li>
                })}
                </div>
                :
                <></>
              }
            </ul>
        </div>
        
        {userDetails.length > 0 ?
        userDetails.map((item)=>{
          return <Row>
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
                {item.firstname} {item.middlename} {item.lastname}
              </div>
              <div className="credentials-email">{item.email}</div>
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
                  <span className="info-value">{ }</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">DOB</span>
                  <span>:</span>
                  <span className="info-value">{ }</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Age</span>
                  <span>:</span>
                  <span className="info-value">{ }</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Height</span>
                  <span>:</span>
                  <span className="info-value">{ }</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Weight</span>
                  <span>:</span>
                  <span className="info-value">{ }</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Blood Group</span>
                  <span>:</span>
                  <span className="info-value">{ }</span>
                </div>
              </Col>
              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Gender</span>
                  <span>:</span>
                  <span className="info-value"></span>
                </div>
              </Col>

              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Contact</span>
                  <span>:</span>
                  <span className="info-value"></span>
                </div>
              </Col>

              <Col md={6}>
                <div className="info-block">
                  <span className="info-label">Father's Name</span>
                  <span>:</span>
                  <span className="info-value">Prem Gautam Ale</span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        })
      :
      <></>
      }
        
      </Container>
    </div>
  );
}
