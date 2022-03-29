import { useEffect, useState } from "react";
import famCardImg from "../../../../assets/vac_at_home.jpg";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import { useHistory } from "react-router-dom";

import "./bookedPackage.css";

function BookedPackage(props) {
  let history = useHistory();

  const [allBookedPackage, setAllBookedPacakge] = useState([]);

  const getAllBookedPackage = async () => {
    try {
      let resp = await httpClient.GET("packaging-booking/get-all", false, true);
      console.log(resp)
      if (resp.data.status) {
        let result = resp.data.data;
        setAllBookedPacakge(result);
      }

    } catch (err) {
      if (err.response || err.response.data) {
        notify.error(err.response.data.message || "Something went wrong");
      }
    }
  }

  useEffect(() => {
    getAllBookedPackage();
  }, [])

  const handleViewBookedPackage = (data) => {
    console.log(data)
    history.push({
      pathname: '/dashboard/edit-package-member',
      state: { details: data }
    })
  }

  return <div className="fam-package-user-dash">
    {/* package booked packages  */}
    <div className="hospital_bookcont_from_user">
      <div className="family_bookconthead">
        <p id="fam-card-text-head">Booked Package</p>
      </div>
      <div className="hospital_book_card">


        {allBookedPackage.length > 0 ?
          allBookedPackage.map((item, index) => {
            return <div className="hospital_book_card1 " style={{ background: "white" }}>
              <div className="fam-card-img">
                <img src={famCardImg} alt="" />
              </div>

              <div className="hosp-ct-bt ">
                <div className="hospital_card_text">
                  <p id="fam-card-text-head">{item.masterpackagename}</p>
                  <p id="fam-pack-type">
                    Package type :{" "}
                    <span style={{ fontWeight: "500", color: "black" }}>
                      {item.packagename}
                    </span>
                  </p>
                  <p id="fam-pack-paid">
                    Paid :{" "}
                    <span style={{ fontWeight: "500", color: "black" }}>
                      Rs. {item.amount}
                    </span>
                  </p>
                </div>
                <div className="hosp_card_but_main">
                  <button id="fam-card-but" onClick={() => handleViewBookedPackage(item)}>View</button>
                </div>
              </div>
            </div>

          })
          :
          <></>
        }

      </div>
    </div>
  </div>

}
export default BookedPackage;