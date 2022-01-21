import doctor1 from "../../../../assets/client1.png";

const DoctorDetailComponent = (props) => {
  const consultDoctor = () => {};
  return (
    <div className="hospital_book_card">
      <div className="digidoc_card1">
        <div className="digi_first_card_content">
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
      </div>
    </div>
  );
};

export default DoctorDetailComponent;
