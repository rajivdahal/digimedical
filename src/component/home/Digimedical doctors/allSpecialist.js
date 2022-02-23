import Navbar from "../../Navbar/Navbar";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { notify } from "../../../services/notify";
import { httpClient } from "../../../utils/httpClient";
import { Link } from "react-router-dom";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

function AllSpecialist(props) {

    const [doctorSpeciality, setDoctorSpeciality] = useState([]);

    const getDoctorSpeciality = async () => {
        try {
            let resp = await httpClient.GET("services/get/true");
            console.log(resp);
            if (resp.data.status) {
                setDoctorSpeciality(resp.data.data);
            }
        } catch (err) {
            if (
                err &&
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
    };

    useEffect(() => {
        getDoctorSpeciality();
    })
    return <div>
        <Navbar></Navbar>
        <Container>
            <div className="our_doc_speciality">
                {doctorSpeciality.map((item, index) => {
                    return <div className="speciality_doc_card">
                        <Link style={{textDecoration : "none"}} key={index}
                            to={{
                                pathname: "digi-doctors",
                                state: { specialityId: item.id,specialityName : item.servicename },
                            }}>
                            <div className="speciality_cont1">
                                <img src={REACT_APP_BASE_URL + "services/download/" + item.id} alt="" />
                            </div>
                            <div className="speciality_cont2">
                                <p>{item.servicename}</p>
                            </div>
                            <div></div>
                        </Link>
                    </div>
                })}

            </div>
        </Container>
    </div>

}

export default AllSpecialist;