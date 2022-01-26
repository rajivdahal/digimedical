import doctor1 from "../../../../assets/client1.png";
import { useHistory } from "react-router-dom";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const DoctorDetailComponent = (props) => {
  let history = useHistory();

  const consultDoctor = () => {
    history.push({
      pathname: "/digimedical_doctors",
      state: { doctorID: props.doctorId },
    });
  };
  return (
    <div className="hospital_book_card1">
      {" "}
      <div className="digidoc_card_img">
        <img
          src={REACT_APP_BASE_URL + "doctor/download/" + props.doctorId}
          alt=""
          style={{
            height: "140px",
            width: "140px",
            borderRadius: "50%",
          }}
        />
      </div>
      <div className="digidoc_about_desc">
        <div className="digidoc_about_desc_head">
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
  );
};

export default DoctorDetailComponent;
