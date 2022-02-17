import React, { useEffect, useState } from "react";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import { Modal,Button } from 'react-bootstrap';
import "./package.css";

function BookPackage(props) {

    const [subPackageData, setSubPackageData] = useState([]);
    const [subPackageId, setSubPackageId] = useState("");
    const [corporateType, setCorporateType] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getBusinessPackage = async () => {
        try {
            let resp = await httpClient.GET("master-package/get-types/0");
            if (resp.data.status) {
                let packages = resp.data.data;
                for (let i = 0; i < packages.length; i++) {
                    let id = packages[i].id;
                    packages[i].sub = await getSubPackages(id)
                }
                setCorporateType(packages)
            }
        }
        catch (err) {
            if (
                err &&
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }

    }
    const getSubPackages = async (id) => {
        try {
            let resp = await httpClient.GET("membership-packages/get-package-details/" + id);
            if (resp.data.status) {
                return resp.data.data;
            }
        }
        catch (err) {
            if (
                err &&
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }
    }

    useEffect(() => {
        getBusinessPackage();
    }, [])

    const handleClose = () => setShowModal(false);

    const bookPackageModal = (id) => {
        setSubPackageId(id);
        setShowModal(true);
    }

    const handleBuyPackage=async()=>{
        let data = {
            membershipPackageId : subPackageId
        }

        try{
            let resp = await httpClient.POST("corporate-package/create",data,false,true);
            if (resp.data.status) {
                notify.success(resp.data.message);
                handleClose();
            }
        }
        catch(err){
            if (
                err &&
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                notify.error(err.response.data.message || "Something went wrong");
            }
        }

    }

    return <div className='content-wrapper adjust-height-width custom-content-wrapper'>
        {corporateType.map((item, index) => {
            return <>
                <p key={index} className="avai-package">{item.name}</p>
                <div className="bottom-container">
                    {item.sub.map((subPackage, index) => {
                        return <div className="boxes">
                            <p className="Program">{subPackage.name}</p>
                            <p className="text9">
                                {subPackage.description}
                            </p>
                            <p className="price">Rs.{subPackage.amount}</p>
                            <p className="peryear">per year</p>
                            <ul>
                                {subPackage.membershipDetail ?
                                    subPackage.membershipDetail.map((detail, index) => {
                                        return <li className="list1" key={index}>
                                            {detail}
                                        </li>
                                    })
                                    :
                                    <></>
                                }
                            </ul>
                            <div>
                            <button className="buyPackage-Btn" onClick={()=>bookPackageModal(subPackage.id)}>Buy Package</button>
                            </div>
                        </div>
                    })}

                </div>
            </>
        })}

        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    <b>Buy Package</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you really want to buy this package ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="info" onClick={handleBuyPackage}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default BookPackage;