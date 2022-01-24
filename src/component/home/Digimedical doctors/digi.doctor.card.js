import doctor1 from "../../../assets/client1.png";

const DigiMedicalDoctorCard = (props) => {
    return (
        <div className="digidoctor_apoint_card">

            <div className="digidoctor_apoint_card1">
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
                <div className="digidoctor_about_desc">
                    <div className="doc_about_desc_head">
                        <p id="doc_name_card">{props.name}</p>
                        <p id="doc_edu_brief">{props.prefix}</p>
                    </div>

                    <p id="digidoc_exp"> {props.specialist} </p>
                    <p >{props.desc}</p>

                </div>

                <div className="digidoctor_card_but">
                    {" "}
                    <button id="digidoctor_card_but">Book an appointment</button>
                </div>
            </div>

        </div>
    )
}

export default DigiMedicalDoctorCard;