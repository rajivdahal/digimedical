import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";

function AddNewPackageMember(props) {
    let history = useHistory();

    const [bookedPackageDetails, setPackageDetails] = useState({})
    const [memberName, setMemberName] = useState("");

    useEffect(() => {
        if (props && props.location && props.location.state && props.location.state.details) {
            let data = props.location.state.details;
            setPackageDetails(data)
        }
    }, [])

    const handleChange = (e) => {
        setMemberName(e.target.value)
    }

    const handleBackBtn = () => {
        history.goBack();
    }

    const handleSaveChanges = async () => {
        let data = {
            packageBookingId: bookedPackageDetails.id,
            email: memberName
        }
        try {
            let resp = await httpClient.POST("packaging-members/create", data, false, true);
            if (resp.data.status) {
                notify.success(resp.data.message);
                setMemberName("");
            }

        } catch (err) {
            console.log(err)
        }
    }
    return <div className="fam-package-user-dash">
        {/* add new package member */}
        <div className="hospital_bookcont_from_user">
            <div className="family_bookconthead">
                <p id="fam-card-text-head">My booked packages</p>
                <div class="up fam-pack-breadcrump">
                    <a href="url" id="healthpackages">
                        {bookedPackageDetails.masterpackagename}&nbsp;
                    </a>

                    <span className="fcp_up_span_arrow">
                        {" "}
                        <i class="fas fa-chevron-right"></i>
                    </span>
                    <span id="familyhealthpackages"> &nbsp;{bookedPackageDetails.packagename} </span>
                </div>
            </div>
            <div className="fam-pack-edit">
                <div>
                    <p id="fam-list-powner">Package member :</p>
                </div>
                <div className="fam-pack-edit-mem">
                    <div className="fam-pack-edit-mem1">
                        <p id="pack-edit-mem-txt">Member 1 :</p>
                        <input type="text" placeholder="Enter name" />
                    </div>
                    <div className="fam-pack-edit-mem1">
                        <p id="pack-edit-mem-txt">Member 1 :</p>
                        <input type="text" placeholder="Enter name" />
                    </div>
                    <div className="fam-pack-edit-mem1">
                        <p id="pack-edit-mem-txt">Member 1 :</p>
                        <input type="text" placeholder="Enter name" />
                    </div>
                    <div className="fam-pack-edit-mem1">
                        <p id="pack-edit-mem-txt">Member 1 :</p>
                        <input type="text" placeholder="Enter name" name="memberName" onChange={handleChange} />
                    </div>
                </div>
                <div className="fam-pack-list-but">
                    <button id="fam-card-but" onClick={handleBackBtn}>Back</button>
                    <button id="fam-card-but2" onClick={handleSaveChanges}>Save changes</button>
                </div>
            </div>
        </div>

    </div>
}

export default AddNewPackageMember;