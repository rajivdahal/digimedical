import doctor1 from "../../../../assets/client1.png";
import { useHistory } from "react-router-dom";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const DoctorDetailComponent = (props) => {
  console.log("props in doctor areee>>>",props)
  let history = useHistory();

  const consultDoctor = (item) => {
    history.push({
      pathname: "/digimedical_doctors",
      state: { doctorID: item.doctorId }
    })

  }
  return (
      <div className="hospital_book_card">
        {
          props.allDoctors.map((item,index)=>{
            return  <div className="hospital_book_card1">
            {" "}
            <div className="digidoc_card_img">
              <img
                src={REACT_APP_BASE_URL +"doctor/download/" +item.doctorId}
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
                <p id="doc_name_card">{item.name}</p>
                <p id="doc_edu_brief">{item.prefix}</p>
              </div>
              <div>
                <p>
                  <b>{item.specialist}</b>
                </p>
                <p>{item.desc}</p>
              </div>
            </div>
            <div className="digidoctor_card_but">
              {" "}
              <button id="digidoctor_card_but" onClick={()=>consultDoctor(item)}>Consult</button>
            </div>

          </div>
          })
        }


      </div>

  );
};

export default DoctorDetailComponent;
