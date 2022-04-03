import React, { useEffect, useState } from "react";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import "./packageDetail.css";
import { bindActionCreators } from "redux";
import { setClosePopUp, setOpenPopUp,} from "../../../../actions/paymentPopUp.ac";
// import "./dashDigiDoc.css";
import { useDispatch, useSelector } from "react-redux";
import PackagePayment from "../../../common/popup/doctorPopup/selectPaymentMethod/forPackagePayment/packagePayment";
import { internalPackageBooking } from "../../../../actions/package.action";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const PackageDetailsPage = (props) => {
  let dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [subPackageData, setSubPackageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [packageID, setPackageID] = useState("");

  const openPaymentPopUp = bindActionCreators(setOpenPopUp, dispatch);

  const popupOpen = useSelector((state) => state.paymentPopUp);

  const getSubPackages = async () => {
    let id = "";
    if (props && props.location && props.location.state) {
      id = props.location.state.packageId;
    }
    try {
      let resp = await httpClient.GET(
        "membership-packages/get-package-details/" + id
      );
      console.log(resp);
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

  const handleBookPackage = async (item) => {
    let data = {
      membershipPackageId: item.id,
      membersLimitSize: 5,
      validityDate: "2022-06-25",
    };
    console.log(item)
    try {
      let resp = await httpClient.POST(
        "packaging-booking/create",
        data,
        false,
        true
      );
      console.log(resp);
      if (resp.data.status) {
        // notify.success(resp.data.message);
        console.log(item)
        let bookedId = resp.data.data;
        item.packageBookedId = bookedId;
        console.log(item)
         dispatch(internalPackageBooking(item))
        openPaymentPopUp(true);

      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="fam-package-user-dash">
        <div className="hospital_bookcont_from_user fam-pack-dash-bod2">
          <p id="lab_content_headtxt">Package Details</p>
          <div className="fam-package-detail1">
            <div className="fam-packages-cat">
              {subPackageData.map((item, index) => {
                return (
                  <div className="fam-package1" key={index}>
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
                          return <li key={index}>{member}</li>;
                        })}
                      </ul>
                      <button
                        className="fam-pack-button"
                        onClick={() => handleBookPackage(item)}
                      >
                        Book Package
                      </button>
                    </div>
                    <div></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {popupOpen.trigger ? <PackagePayment></PackagePayment> : null}

      {/* <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <b>Body Checkup Status</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to book this package ?</Modal.Body>
        <Modal.Footer>
          {loading == true ? (
            <Cliploader isLoading={loading} />
          ) : (
            <div>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="info"
                onClick={bookPackage}
                style={{ marginLeft: "8px" }}
              >
                Book
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default PackageDetailsPage;
