import React from "react";
import { useState } from "react";
import { TimeandDate } from "../../../../services/timeanddate";
import { CompletedLabTests } from "./completedLabTest.component";
import { CancelledLabTest } from "./cancelledLabTest.component";
import { LabTestImages } from "./labTestImages.component";
import { httpClient } from "../../../../utils/httpClient";
import "./labTestImages.component.css";
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Viewlabtest() {
  // let [isDynamicCompletedClass,setisDynamicCompletedClass]=useState(true)
  let [isDynamicCompletedClass, setisDynamicCompletedClass] = useState(false);
  let [isDynamicPendingClass, setisDynamicPendingClass] = useState(true);
  const [showModel, setShowModel] = useState(false);
  let [today, settoday] = useState(TimeandDate.today());
  const [labTestReport, setLabTestReport] = useState([]);
  const [downloadLabLabReport, setDownloadLabLabReport] = useState([]);
  const [fromDownload, setFromDOwnload] = useState(false);
  const handleCompletedClass = () => {
    setisDynamicCompletedClass(true);
    setisDynamicPendingClass(false);
  };
  const handlePendingClass = () => {
    setisDynamicCompletedClass(false);
    setisDynamicPendingClass(true);
  };
  const getImage = async (data, identifier) => {
    setLabTestReport([]);
    setDownloadLabLabReport([]);
    setFromDOwnload(true);
    console.log("identifier is", identifier);
    httpClient
      .GET("lab-report/get-all/" + data.labtestbookingid, false, true)
      .then((resp) => {
        let lab = [];
        resp.data.data.map((item) => {
          console.log(item.labtestreportid);
          lab.push(item.labtestreportid);
        });
        if (identifier) {
          return setDownloadLabLabReport(lab);
        }
        setLabTestReport(lab);
      })
      .catch((err) => {
        console.log("Something error occurred");
      })
      .finally(() => {
        if (!identifier) {
          setShowModel(!showModel);
        }
      });
};
  const showLabTest = (data, signal) => {
    console.log("e and data are", data, signal);
    if (data && signal) {
      getImage(data);
    }
    if (!signal) {
      setLabTestReport([]);
      setShowModel(!showModel);
    }
  };
  const download = async (data) => {
    getImage(data, "download");
  };
  if (fromDownload && downloadLabLabReport.length) {
    downloadLabLabReport.map(async (item) => {
      console.log("inside map");
      const originalImage = REACT_APP_BASE_URL + "lab-report/download/" + item;
      console.log("original name is", originalImage);
      const image = await fetch(originalImage);
      const nameSplit = originalImage.split("/");
      const duplicateName = nameSplit.pop();
      const imageBlog = await image.blob();
      const imageURL = URL.createObjectURL(imageBlog);
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "" + duplicateName + "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  console.log("labtestreports are", labTestReport);
  return (
    <div className="container-fluid page-body-wrapper">
      <div className="main-panel newdash_content">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="row">
                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                  <h6 className="font-weight-normal mb-0">
                    All systems are running smoothly!
                  </h6>
                </div>
                <div className="col-12 col-xl-4">
                  <div className="justify-content-end d-flex">
                    <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                      <button
                        className="btn btn-sm btn-light bg-white dropdown-toggle"
                        type="button"
                        id="dropdownMenuDate2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <i className="mdi mdi-calendar"></i>Today- {today}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="title-header">
                    <p
                      className={`card-title ${
                        isDynamicCompletedClass ? "title-focus" : null
                      }`}
                      onClick={handleCompletedClass}
                    >
                      Completed Labtest
                    </p>
                    <p
                      className={`card-title ${
                        isDynamicPendingClass ? "title-focus" : null
                      }`}
                      onClick={handlePendingClass}
                    >
                      Pending Labtest
                    </p>
                  </div>
                  {isDynamicCompletedClass ? (
                    <CompletedLabTests
                      showLabTest={showLabTest}
                      download={download}
                    ></CompletedLabTests>
                  ) : isDynamicPendingClass ? (
                    <CancelledLabTest></CancelledLabTest>
                  ) : (
                    <h1>Please book your Lab Tests</h1>
                  )}
                  {showModel ? (
                    <LabTestImages
                      showLabTest={showLabTest}
                      labTestData={labTestReport}
                    ></LabTestImages>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
