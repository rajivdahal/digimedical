function EditPackageMemeber(props) {
    console.log(props)
    return <div className="fam-package-user-dash">
        {/* family package member list */}
        <div className="hospital_bookcont_from_user">
            <div className="family_bookconthead">
                <p id="fam-card-text-head">My booked packages</p>
                <div class="up fam-pack-breadcrump">
                    <a href="url" id="healthpackages">
                        {props.masterPackage}
                    </a>
                    <span className="fcp_up_span_arrow">
                        {" "}
                        <i class="fas fa-chevron-right"></i>
                    </span>

                    <span id="familyhealthpackages"> &nbsp;Hajurama Package </span>
                </div>
            </div>
            <div className="fam-pack-list">
                <div className="fam-pack-list1">
                    <div className="fam-pack-list-powner">
                        <p id="fam-list-powner">
                            Package owner :{" "}
                            <span style={{ fontWeight: "500", color: "black" }}>
                                Hello shrestha
                            </span>
                        </p>
                        <p id="fam-list-powner">
                            Paid price :{" "}
                            <span style={{ fontWeight: "500", color: "black" }}>
                                Rs5000
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
                                <li>Hello shrestha</li>
                                <li>Hello shrestha</li>
                                <li>Hello shrestha</li>
                                <li>Hello shrestha</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="fam-pack-list-but">
                    <button id="fam-card-but">Back</button>
                    <button id="fam-card-but2">Edit member</button>
                </div>
            </div>
        </div>
    </div>
}

export default EditPackageMemeber;