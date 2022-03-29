import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { setClosePopUp } from "../../../../../../actions/paymentPopUp.ac";
import esewaLogo from "../../../../../../assets/esewa.svg";
import { httpClient } from "../../../../../../utils/httpClient";
import { formatDate } from "../../../../../../services/timeanddate";
import { resetServicesInfo } from "../../../../../../actions/service.action";

export default function PackagePayment(props) {
    // redux implementation
    const dispatch = useDispatch(props);

    const closeDoctorPopUp = bindActionCreators(setClosePopUp, dispatch);
    const resetService = bindActionCreators(resetServicesInfo, dispatch)
    const popUpActionsData = useSelector((state) => state.paymentPopUp);

    // const closeDoctorPopUp = bindActionCreators(setClosePopUp, dispatch);
    const packageBookingData = useSelector((state) => state.packageBooking);
    console.log("data from store are", packageBookingData)
    //end of redux implementation

    const [bookedService, setBookedService] = useState({
        amount: 0,
        id: 0,
        appointmenID: 0,
    })

    const closePaymentPopUp = () => {

        closeDoctorPopUp(true);
        if (props.props) {
            props.props.setTrigger(false);
        }
        resetService(true)
    };

    // const getAllServices = () => {
    //     httpClient.GET("digi-service/get-all")
    //         .then((resp) => {
    //             if (resp.data && resp.data.data) {
    //                 let services = resp.data.data;
    //                 let selected = services.find((service) => {
    //                     return packageBookingData.data.digiServiceId === service.id
    //                 })
    //                 let { name, amount, id } = selected;
    //                 setBookedService({
    //                     name: name,
    //                     amount: amount,
    //                     id: id
    //                 })
    //             }
    //         });
    // };

    const payNow = () => {

        let finalData = {
            packageBookingId: packageBookingData.data.packageBookedId,
            paymentStatus: 2,
            paymentSource: "esewa"
        }
        httpClient.PUT("generate-payment-link/package-booking", finalData, false, localStorage.getItem("dm-access_token") ? true : false)
            .then(resp => {
                console.log(resp)
                let paymentUrl = resp.data.data.paymentUrl
                localStorage.setItem("paymentToken", resp.data.data.token)
                window.location.assign("http://" + paymentUrl,
                    // '_blank'
                );

            })
            .catch(err => {
                console.log("error is", err)
            })
    }

    return (
        <div className="doc-pop-main">
            <div className="pay-pop-inner">
                <div className="doc-pay-pop">

                    <div className="doc-pay-pop-head">
                        <div className="doc-pay-pop-head-cont">
                            <p>Payment Partner</p>
                            <div className="pay-partner1-img">
                                <img src={esewaLogo} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="doc-pay-pop-body">
                        <div className="doc-pay-appoint-det1">
                            <p id="pay-appoint-det-p">Package Detail</p>
                            <p id="pay-appoint-det-p">
                                {/* {packageBookingData.data ? formatDate(packageBookingData.data.date) : "date"}{" "}
                                {packageBookingData.data ? packageBookingData.data.time : "time"} */}

                            </p>
                        </div>
                        <div className="doc-pay-appoint-det4">
                            <div className="doc-pay-last-div ">
                                {/* <p>Total charge for appoinment</p> */}
                                <p>
                                    {packageBookingData.data.name}{"    "}
                                    Rs. {packageBookingData.data.amount}
                                </p>
                            </div>

                            <div className="popup_lab_cont4_foot pay-last-but">
                                <a
                                    className="popup_lab_close"
                                    style={{ cursor: "pointer" }}
                                    onClick={closePaymentPopUp}
                                >
                                    <p>Cancel</p>
                                </a>

                                <a className="lab_popup_checkout" onClick={payNow}>
                                    <p>Pay now</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
