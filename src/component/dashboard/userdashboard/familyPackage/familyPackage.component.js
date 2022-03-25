import React from "react";
import "./familyPackage.component.css";
import famImgBorder from "../../../../assets/dash_fam_card.svg";
import famCardImg from "../../../../assets/dash_fam_card1.svg";
export default function FamilyPackage() {
  return (
    <div className="fam-package-user-dash">
      {/* 
      t
      h
      i
      s is package edit page */}
      {/* <div className="hospital_bookcont_from_user">
        <div className="family_bookconthead">
          <p id="fam-card-text-head">My booked packages</p>
          <div class="up fam-pack-breadcrump">
            <a href="url" id="healthpackages">
              My booked packages&nbsp;
            </a>
            <span className="fcp_up_span_arrow">
              {" "}
              <i class="fas fa-chevron-right"></i>
            </span>
            <a href="url" id="healthpackages">
              My booked packages&nbsp;
            </a>
            <span className="fcp_up_span_arrow">
              {" "}
              <i class="fas fa-chevron-right"></i>
            </span>
            <span id="familyhealthpackages"> &nbsp;Hajurama Package </span>
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
              <input type="text" placeholder="Enter name" />
            </div>
          </div>
          <div className="fam-pack-list-but">
            <button id="fam-card-but">Back</button>
            <button id="fam-card-but2">Save changes</button>
          </div>
        </div>
      </div> */}

      {/* f
      a
      m
      i
      l
      y package member list */}
      <div className="hospital_bookcont_from_user">
        <div className="family_bookconthead">
          <p id="fam-card-text-head">My booked packages</p>
          <div class="up fam-pack-breadcrump">
            <a href="url" id="healthpackages">
              My booked packages&nbsp;
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

      {/* 
      f
      a
      m
      i
      l
      y package booked packages */}
      {/* <div className="hospital_bookcont_from_user">
        <div className="family_bookconthead">
          <p id="fam-card-text-head">My booked package</p>
        </div>
        <div className="hospital_book_card">
          <div className="hospital_book_card1 " style={{ background: "white" }}>
            <div className="fam-card-img">
              <img src={famCardImg} alt="" />
            </div>

            <div className="hosp-ct-bt ">
              <div className="hospital_card_text">
                <p id="fam-card-text-head">hosp_card_but_main</p>
                <p id="fam-pack-type">
                  Package type :{" "}
                  <span style={{ fontWeight: "500", color: "black" }}>
                    Basic
                  </span>
                </p>
                <p id="fam-pack-paid">
                  Paid :{" "}
                  <span style={{ fontWeight: "500", color: "black" }}>
                    Rs 50000
                  </span>
                </p>
              </div>
              <div className="hosp_card_but_main">
                <button id="fam-card-but">View</button>
              </div>
            </div>
          </div>
          <div className="hospital_book_card1 " style={{ background: "white" }}>
            <div className="fam-card-img">
              <img src={famCardImg} alt="" />
            </div>

            <div className="hosp-ct-bt ">
              <div className="hospital_card_text">
                <p id="fam-card-text-head">hosp_card_but_main</p>
                <p id="fam-pack-type">
                  Package type :{" "}
                  <span style={{ fontWeight: "500", color: "black" }}>
                    Basic
                  </span>
                </p>
                <p id="fam-pack-paid">
                  Paid :{" "}
                  <span style={{ fontWeight: "500", color: "black" }}>
                    Rs 50000
                  </span>
                </p>
              </div>
              <div className="hosp_card_but_main">
                <button id="fam-card-but">View</button>
              </div>
            </div>
          </div>
          <div className="hospital_book_card1 " style={{ background: "white" }}>
            <div className="fam-card-img">
              <img src={famCardImg} alt="" />
            </div>

            <div className="hosp-ct-bt ">
              <div className="hospital_card_text">
                <p id="fam-card-text-head">hosp_card_but_main</p>
                <p id="fam-pack-type">
                  Package type :{" "}
                  <span style={{ fontWeight: "500", color: "black" }}>
                    Basic
                  </span>
                </p>
                <p id="fam-pack-paid">
                  Paid :{" "}
                  <span style={{ fontWeight: "500", color: "black" }}>
                    Rs 50000
                  </span>
                </p>
              </div>
              <div className="hosp_card_but_main">
                <button id="fam-card-but">View</button>
              </div>
            </div>
          </div>
          <div className="hospital_book_card1 " style={{ background: "white" }}>
            <div className="fam-card-img">
              <img src={famCardImg} alt="" />
            </div>

            <div className="hosp-ct-bt ">
              <div className="hospital_card_text">
                <p id="fam-card-text-head">hosp_card_but_main</p>
                <p id="fam-pack-type">
                  Package type :{" "}
                  <span style={{ fontWeight: "500", color: "black" }}>
                    Basic
                  </span>
                </p>
                <p id="fam-pack-paid">
                  Paid :{" "}
                  <span style={{ fontWeight: "500", color: "black" }}>
                    Rs 50000
                  </span>
                </p>
              </div>
              <div className="hosp_card_but_main">
                <button id="fam-card-but">View</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
