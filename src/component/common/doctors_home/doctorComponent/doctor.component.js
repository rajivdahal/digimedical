import doctor1 from "../../../../assets/client1.png";
import { useHistory } from "react-router-dom";

const DoctorDetailComponent = (props) => {

  let history = useHistory();

  const consultDoctor = () => {
    history.push({
      pathname: "/digimedical_doctors",
      state: { doctorID: props.doctorId }
    })

  }
  return (
    <div className="hospital_book_card">
      <div className="hospital_book_card1">
        {" "}
        <div className="digidoc_card_img">
          <img
            src={doctor1}
            alt=""
            style={{
              height: "140px",
              width: "140px",
              borderRadius: "50%",
            }}
          />
        </div>
        <div className="digidoc_about_desc">
          <div className="doc_about_desc_head">
            <p id="doc_name_card">{props.name}</p>
            <p id="doc_edu_brief">{props.prefix}</p>
          </div>
          <div>
            <p>
              <b>{props.specialist}</b>
            </p>
            <p>{props.desc}</p>
          </div>
        </div>
        <div className="digidoc_card_but">
          {" "}
          <button id="digidoc_card_but" onClick={consultDoctor}>
            Consult
          </button>
        </div>
      </div>
      

      {/* <div className="form_digi_doc">
          <div className="form_digidoc">
            <div className="digidoc_appoin_form1">
              <p>First Name</p>
              <input
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                id="firstName"
              />
            </div>
            <div class="digidoc_appoin_form1">
              <p>Middle Name</p>
              <input
                type="text"
                placeholder="Enter Middle Name"
                name="middleName"
                id="middleName"
              />
            </div>
            <div class="digidoc_appoin_form1">
              <p>Last Name</p>
              <input
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                id="lastName"
              />
            </div>
            <div class="digidoc_appoin_form1">
              <p>Email Address</p>
              <input
                type="text"
                placeholder="Enter Email Address"
                name="email"
                id="email"
              />
            </div>
            <div class="digidoc_appoin_form1">
              <p>Phone No.</p>
              <input
                type="text"
                placeholder="Enter Phone no."
                name="mobileNumber"
                id="mobileNumber"
              />
            </div>

            <div class="digidoc_appoin_form1">
              <p>Appointment Date</p>

              <input type="date" name="appointmentDate" id="appointmentDate" />
            </div>
            <div class="digidoc_appoin_form1">
              <p>Appointment Time</p>
              <input type="time" name="appointmentTime" id="appointmentTime" />
            </div>
            <div class="digidoc_appoin_form1">
              <p>Select Service Type</p>
              <select name="cars" id="cars">
                <optgroup label="Swedish Cars">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                </optgroup>
                <optgroup label="German Cars">
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </optgroup>
              </select>
            </div>
            <div class="digidoc_appoin_form1">
              <button type="submit" className="submit-buttons">
                Submit
              </button>
            </div>
          </div>
        </div> */}
    </div>
    // </div>
  );
};

export default DoctorDetailComponent;
