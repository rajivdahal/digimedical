import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../../../utils/httpClient";

function EditPackageMemeber(props) {
    let history = useHistory();
    const [packageDetails, setPackageDetails] = useState({});
    const [packageMember, setPackageMember] = useState([])

    useEffect(() => {
        let id;
        if (props && props.location && props.location.state && props.location.state.details) {
            let data = props.location.state.details;
            id = data.id;
            setPackageDetails(data)
        }
        getPackageMember(id);
    }, [])

    const getPackageMember = async (id) => {
        try {
            let resp = await httpClient.GET("packaging-members/get-all/" + id, false, true);
            console.log(resp)
            if (resp.data.status) {
                setPackageMember(resp.data.data)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleBackBtn = () => {
        history.goBack();
    }

    const handleEditMember = () => {
        history.push({
            pathname: "/dashboard/package/add-new-member",
            state: { details: packageDetails }
        })
    }
    return <div className="fam-package-user-dash">
        {/* family package member list */}
        <div className="hospital_bookcont_from_user">
            <div className="family_bookconthead">
                <p id="fam-card-text-head">My booked packages</p>
                <div class="up fam-pack-breadcrump">
                    <a href="url" id="healthpackages">
                        {packageDetails.masterpackagename}
                    </a>
                    <span className="fcp_up_span_arrow">
                        {" "}
                        <i class="fas fa-chevron-right"></i>
                    </span>

                    <span id="familyhealthpackages"> &nbsp;{packageDetails.packagename} </span>
                </div>
            </div>
            <div className="fam-pack-list">
                <div className="fam-pack-list1">
                    <div className="fam-pack-list-powner">
                        <p id="fam-list-powner">
                            Package owner :{" "}
                            <span style={{ fontWeight: "500", color: "black" }}>
                                {packageDetails.ownername}
                            </span>
                        </p>
                        <p id="fam-list-powner">
                            Paid price :{" "}
                            <span style={{ fontWeight: "500", color: "black" }}>
                                Rs.{packageDetails.amount}
                            </span>
                        </p>
                        <p id="fam-list-powner">
                            Paid through :{" "}
                            <span style={{ fontWeight: "500", color: "black" }}>Esewa</span>
                        </p>
                        <p id="fam-list-powner">
                            Bought date :{" "}
                            <span style={{ fontWeight: "500", color: "black" }}>
                                2078-03-01
                            </span>
                        </p>
                        <p id="fam-list-powner">
                            Valid upto :{" "}
                            <span style={{ fontWeight: "500", color: "black" }}>
                                2079-03-01
                            </span>
                        </p>{" "}
                    </div>
                    <div className="fam-pack-list-pmember">
                        <div style={{ width: "50%" }}>
                            <p id="fam-list-powner">Package member : </p>
                        </div>

                        <div className="fam-pac-mem-list">
                            <ul>
                                {packageMember.length > 0 ?
                                    packageMember.map((item, index) => {
                                        return <li key={index}>{item.membersname}</li>
                                    })
                                    :
                                    <li>No Member</li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="fam-pack-list-but">
                    <button id="fam-card-but" onClick={handleBackBtn}>Back</button>
                    <button id="fam-card-but2" onClick={handleEditMember}>Edit member</button>
                </div>
            </div>
        </div>
    </div>
}

export default EditPackageMemeber;