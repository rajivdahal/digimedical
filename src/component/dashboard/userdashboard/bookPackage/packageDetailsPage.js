import React, { useEffect, useState } from "react";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Pagination from "../../../common/pagination/pagination.component";
import { Link } from "react-router-dom";
import Usersidebar from "../../usersidebar/usersidebar.component";
import { Dashboardnavbar } from "../../Navbar/Dashboardnavbar.component";
import { Modal, Button } from 'react-bootstrap';
import Cliploader from "../../../../utils/clipLoader";

// import "./dashDigiDoc.css";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const PackageDetailsPage = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [subPackageData, setSubPackageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [packageID,setPackageID] = useState("");

    const getSubPackages = async () => {
        let id = "";
        if (props && props.location && props.location.state) {
            id = props.location.state.packageId;
           
        }
        try {
            let resp = await httpClient.GET(
                "membership-packages/get-package-details/" + id
            );
            console.log(resp)
            if (resp.data.status) {
                setSubPackageData(resp.data.data);
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
        getSubPackages();
    }, []);

    const handleClose = () => setShowModal(false)

    const handleBookPackage = (id) => {
        console.log(id)
        setPackageID(id)
        setShowModal(true)
    };

    const bookPackage =async()=>{
        let data = {
            membershipPackageId : packageID,
            membersLimitSize : 5,
            validityDate : "2022-06-25"
        }
        
        try{
            let resp = await httpClient.POST("packaging-booking/create",data,false,true)
            console.log(resp);
            if(resp.data.status){
                notify.success(resp.data.message);
                handleClose();
            }

        }catch(err){
            console.log(err)
        }
    }

    return <>

        <div className="fam-package-detail">
            <p id="lab_content_headtxt">Package Details</p>
            <div className="fam-package-detail1">
                <div className="fam-packages-cat">
                    {subPackageData.map((item, index) => {
                        return <div className="fam-package1" key={index}>
                            <div className="fam-pack-pop-or-not">
                                {/* <ul>
                                <li>Recommended</li>
                            </ul> */}
                            </div>
                            <div className="fam-package-head">
                                <p id="text-fam-pack-head1">{item.name}</p>
                                <p id="text-fam-pack-head2">
                                    Our standard health care package for your family.
                                </p>
                                <p id="text-fam-pack-price1">Rs. {item.amount}</p>
                                {/* <p id="text-fam-pack-head3">per year</p> */}
                            </div>
                            <div className="fam-packages-ul">
                                <ul className="fam-package-ul1">
                                    {item.membershipDetail.map((member, index) => {
                                        return <li key={index}>{member}</li>
                                    })}
                                </ul>
                                <button className="fam-pack-button" onClick={()=>handleBookPackage(item.id)}>Book Package</button>
                            </div>
                            <div></div>
                        </div>
                    })}
                </div>
            </div>
        </div>

        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header >
                <Modal.Title><b>Body Checkup Status</b></Modal.Title>
            </Modal.Header>
            <Modal.Body >Do you really want to book this  package ?</Modal.Body>
            <Modal.Footer>
                {loading == true ?
                    <Cliploader isLoading={loading} />
                    :
                    <div>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="info" onClick={bookPackage} style={{ marginLeft: '8px' }} >
                            Book
                        </Button>
                    </div>
                }
            </Modal.Footer>
        </Modal>
    </>
};

export default PackageDetailsPage;
