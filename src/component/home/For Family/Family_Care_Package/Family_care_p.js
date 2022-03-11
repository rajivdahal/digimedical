import React, { useEffect, useState } from "react";
import { notify } from "../../../../services/notify";
import { httpClient } from "../../../../utils/httpClient";
import Fcp_main_img from "../../../../assets/amico.svg";
import Footer from "../../../Footer/Footer";
import Navbar from "../../../Navbar/Navbar";
import "./family_care_p.css";

function FamilyPackage(props) {
  const [packageData, setPackageData] = useState([]);
  const [subPackageData, setSubPackageData] = useState([]);
  const getPackageData = async () => {
    let id = "";
    if (props && props.location && props.location.state) {
      id = props.location.state.packageId;
    }
    try {
      let resp = await httpClient.GET("master-package/get-for-public/" + id);
      if (resp.data.status) {
        setPackageData(resp.data.data);
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

  const getSubPackages = async () => {
    let id = "";
    if (props && props.location && props.location.state) {
      id = props.location.state.packageId;
    }
    try {
      let resp = await httpClient.GET(
        "membership-packages/get-package-details/" + id
      );
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
    getPackageData();
    getSubPackages();
  }, []);

  return (
    // <div className="package-page">
    //   <Navbar></Navbar>
    //   <div class="top-container">
    //     <div class="up">
    //       <a href="url" id="healthpackages">
    //         Health Packages &nbsp;
    //       </a>
    //       <i class="fas fa-chevron-right"></i>
    //       <span id="familyhealthpackages">
    //         {" "}
    //         &nbsp; {props.location.state.packageName}
    //       </span>
    //     </div>

    //     <div className="down">
    //       <div className="fcp_header_desc">
    //         <p id="headerfamilyhealth">{props.location.state.packageName}</p>
    //         <p id="text1">
    //           Give your family a healthy gift in this covid situation.
    //         </p>
    //       </div>
    //       <div className="fcp_main_img">
    //         {" "}
    //         <img src={Fcp_main_img} />
    //       </div>
    //     </div>
    //   </div>

    //   <div className="mid-container">
    //     <p className="question">Why {props.location.state.packageName}?</p>
    //     {packageData.map((item, index) => {
    //       return (
    //         <>
    //           <div className="boxfortext1">
    //             <p id="text3">{item.description}</p>
    //           </div>
    //           <p className="question">Purposes of {item.name}</p>
    //           <div className="boxfortext2">
    //             <ul>
    //               {item.packagePurporses.map((item, index) => {
    //                 return <li className="list1">{item.purposes}</li>;
    //               })}
    //             </ul>
    //           </div>
    //         </>
    //       );
    //     })}

    //     <p className="question">Packages details</p>
    //   </div>
    //   <div className="bottom-container">
    //     {subPackageData.map((item, index) => {
    //       return (
    //         <>
    //           <div className="boxes">
    //             <p className="Program">{item.name}</p>
    //             <p className="text9">{item.description}</p>
    //             <p className="price">Rs.{item.amount}</p>
    //             <p className="peryear">per year</p>
    //             <ul>
    //               {item.membershipDetail.map((item, index) => {
    //                 return <li className="list1">{item}</li>;
    //               })}
    //             </ul>
    //             <button className="button">Get Started</button>
    //           </div>
    //         </>
    //       );
    //     })}
    //   </div>
    //   <Footer></Footer>
    // </div>
    <div className="package-page">
      <Navbar></Navbar>
      <div class="top-container">
        <div class="up">
          <a href="url" id="healthpackages">
            Health Packages&nbsp;
          </a>
          <span className="fcp_up_span_arrow">
            {" "}
            <i class="fas fa-chevron-right"></i>
          </span>

          <span id="familyhealthpackages"> &nbsp;Family </span>
        </div>

        <div className="down">
          <div className="fcp_header_desc">
            <p id="headerfamilyhealth">Family Health</p>
            <div className="fcp_down_desc_2">
              {" "}
              <p id="text1">
                Give your family a healthy gift in this covid situation.
              </p>
            </div>
          </div>
          <div className="fcp_main_img">
            <img src={Fcp_main_img} />
          </div>
        </div>
      </div>
      <div className="ourserv-cont-main">
        <div className="ourserv-cont-main1">
          <div className="serv-passages">
            <p className="questionheads">What is Doctor at home service?</p>
            <div className="serv-boxes">
              <p className="serv-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                adipiscing nibh ac praesent dui. Sit viverra molestie posuere
                donec arcu. Massa neque nibh non a et sapien, et semper.
                Tincidunt purus tellus eu orci, pulvinar aliquet ultrices
                commodo. Etiam pellentesque lectus enim velit, tellus. Risus
                lectus interdum faucibus lectus. Gravida elementum vitae proin
                elit, lacus, libero. Tempor, ut non quis maecenas amet volutpat
                ut enim. Cursus cras nec amet, sed. Ut volutpat proin at amet.
                Suspendisse quam orci mi non ipsum, orci leo. Consectetur
                fringilla euismod vehicula habitant egestas sed turpis mi.
                Gravida potenti eu consequat ac. Tempus et diam, odio quis sit
                adipiscing maecenas eu varius. Odio elit velit, tempus odio
                facilisis mauris a tempus. Egestas quam viverra sit in odio.
                Arcu sapien, purus netus duis. At rutrum ultrices magna magna
                faucibus condimentum egestas.
              </p>
            </div>
            <p className="questionheads">
              When Do You Need “Doctor At Home” Service?
            </p>
            <div className="serv-boxes">
              <p className="serv-text">
                Elders at home are the ones who are in need of medical
                supervision and healthcare continuously. Not just the elders but
                also people with chronic illness who are unable to visit a
                hospital or prefers to be treated at home finds our “Doctor At
                Home” service very convenient. The problems faced by us or
                anyone in our circle to avail doctor’s consultation for them,
                either in a hospital or in a clinic, are well known. By availing
                Digi Medical’s “Doctor At Home service”, we can easily take care
                of our elders and our loved ones at the comfort of our home
                come. Our doctors have years of experience in their specialized
                medical field and will treat you with patience and compassion.
                <br></br>
                Digimedical service is ready to serve you with our specialized
                and experienced doctors at home with doctors from various
                medical fields to take care of all your health needs. Some of
                the Specialist Doctors with us are:
              </p>
              <ul className="serv-text ul-serv">
                <li>General Physician</li>
                <li>Cardiologist</li>
                <li>Nephrologist</li>
                <li>Pulmonologist</li>
                <li>Gynecologist </li>
                <li>Pediatrician</li>
                <li>Physiotherapist</li>
                <li>Dietician</li>
                <li>Oncologist</li>
                <li>Endocrinologist</li>
                <li>Neurologist</li>
                <li>Psychiatrists</li>
                <li>Dentist</li>
                <li>Dermatologist</li>
                <li>Ophthalmologist</li>
                <li>ENT (Otorhinolaryngologist)</li>
                <li>Orthopedic</li>
                <li>Radiologist</li>
                <li>Gastroenterologist</li>
              </ul>
            </div>
            <p className="questionheads">
              Benefits of Digi Medical “Doctor At Home” service:
            </p>
            <div className="serv-boxes">
              <ol className="serv-text">
                <li>
                  Availability of Quality healthcare at the comfort of your
                  home.
                </li>
                <li>
                  Saves on travelling and medical bills as our services are
                  provided at your home and our consultation charges are lower
                  or at par with the hospital visit charges.
                </li>
                <li>
                  Personalized attention to every health need by experienced
                  health professional.
                </li>
                <li>
                  Home Healthcare decreases the hazard of follow-up readmission
                  and death. (Source: The American Journal of Medicine)
                </li>
                <li>
                  Extremely handy service in case of lack of support at home as
                  all illness does not require hospitalization.
                </li>
                <li>
                  Very convenient for old people as they are the ones who need
                  medical attention the most and are also the ones who have most
                  difficulty in travelling.
                </li>
              </ol>
            </div>
            <p className="questionheads">Cost of “Doctor At Home” Service</p>
            <div className="serv-boxes">
              <p className="serv-text">
                As the technology is upgrading, numerous healthcare apps and
                other platforms are emerging to provide online medical
                consultation and improve the quality of healthcare delivered to
                the people.
                <br></br>
                Digi Medical is pioneer in providing healthcare at home and at
                workplace. Digi Medical has partnered with experienced and
                senior health professionals, major hospitals and NPHL certified
                laboratories to provide the best quality of healthcare in Nepal.
                <br></br>
                This unique healthcare initiative is not only gaining ground
                over the globe but is also known for their value of money. The
                cost of “Doctor At Home” service is lower or at par when
                compared with the regular hospital charges. The average doctor
                consultation fee will be affordable and won’t be a burden to
                your pocket.
              </p>
            </div>
          </div>

          <div className="digidoctor_whychooseus">
            <div className="ourserv-wcu-cont1">
              <div
                className=" digidoc_whycus ourserv-wcu-main"
                style={{ marginTop: "6rem" }}
              >
                <div className="digidoc_whycus_head">
                  <p className="digidoc_whycus_h1">Our Other Services</p>
                </div>
                <div className="digidoctor_whychooseus_cont">
                  <div className="whychooseus_contimg">
                    <span className="ico_digi_doc1">
                      {" "}
                      <i
                        class="fas fa-hand-holding-heart"
                        style={{ color: "#52B2E5" }}
                      ></i>
                    </span>
                  </div>
                  <p>Safest digital heath platform</p>
                </div>
                <div className="digidoctor_whychooseus_cont">
                  <div className="whychooseus_contimg">
                    <span className="ico_digi_doc1">
                      {" "}
                      <i
                        class="fas fa-star-of-life"
                        style={{ color: "#52B2E5" }}
                      ></i>
                    </span>
                  </div>
                  <p>Emergency service 24/7</p>
                </div>
                <div className="digidoctor_whychooseus_cont">
                  <div className="whychooseus_contimg">
                    <span className="ico_digi_doc1">
                      {" "}
                      <i class="fas fa-ribbon" style={{ color: "#52B2E5" }}></i>
                    </span>
                  </div>
                  <p>Trusted by thousands</p>
                </div>
                <div className="digidoctor_whychooseus_cont">
                  <div className="whychooseus_contimg">
                    <span className="ico_digi_doc1">
                      <i
                        class="fas fa-piggy-bank"
                        style={{ color: "#52B2E5" }}
                      ></i>
                    </span>
                  </div>
                  <p>Affordable to all patient.</p>
                </div>
              </div>
              <div className="digidoc_emergency_call">
                <p>Do you need Emergency Medical care?</p>
                <h4>Call 01-5909141</h4>
              </div>
            </div>
          </div>
        </div>

        {/*a
        b
        c
        d
        e
        f packages info here */}
        <div className="fam-package-detail">
          <p id="lab_content_headtxt">Package Details</p>
          <div className="fam-package-detail1">
            <div className="fam-packages-cat">
              <div className="fam-package1">
                <div className="fam-pack-pop-or-not">
                  <ul>
                    <li>popular</li>
                  </ul>
                </div>
                <div className="fam-package-head">
                  <p id="text-fam-pack-head1">Basic</p>
                  <p id="text-fam-pack-head2">
                    Our standard health care package for your family.
                  </p>
                  <p id="text-fam-pack-price1">Rs. 20,000</p>
                  <p id="text-fam-pack-head3">per year</p>
                </div>
                <div className="fam-packages-ul">
                  <ul className="fam-package-ul1">
                    <li>Up to 6 members.</li>
                    <li>
                      Medical consultation at home by experienced doctors(8
                      times)
                    </li>
                    <li>
                      Online medical consultation by expert doctors(12 times)
                    </li>
                    <li>Home visit by professional nurses(8 times)</li>
                    <li>Follow up by customer health services department</li>
                    <li>Emergency visit</li>
                    <li>Nutrition/ deit plan by an experienced dietician</li>
                    <li>Off on lab charges(7%)</li>
                    <li>Off on medicines(7%)</li>
                  </ul>
                  <button className="fam-pack-button">Get Started</button>
                </div>
                <div></div>
              </div>
              <div className="fam-package2">
                <div className="fam-pack-pop-or-not">
                  <ul>
                    <li>popular</li>
                  </ul>
                </div>
                <div className="fam-package-head">
                  <p id="text-fam-pack-head1">Basic</p>
                  <p id="text-fam-pack-head2">
                    Our standard health care package for your family.
                  </p>
                  <p id="text-fam-pack-price1">Rs. 20,000</p>
                  <p id="text-fam-pack-head3">per year</p>
                </div>
                <div className="fam-packages-ul">
                  <ul className="fam-package-ul1">
                    <li>Up to 6 members.</li>
                    <li>
                      Medical consultation at home by experienced doctors(8
                      times)
                    </li>
                    <li>
                      Online medical consultation by expert doctors(12 times)
                    </li>
                    <li>Home visit by professional nurses(8 times)</li>
                    <li>Follow up by customer health services department</li>
                    <li>Emergency visit</li>
                    <li>Nutrition/ deit plan by an experienced dietician</li>
                    <li>Off on lab charges(7%)</li>
                    <li>Off on medicines(7%)</li>
                  </ul>
                  <button className="fam-pack-button">Get Started</button>
                </div>
                <div></div>
              </div>
              <div className="fam-package1">
                <div className="fam-pack-pop-or-not">
                  <ul>
                    <li>popular</li>
                  </ul>
                </div>
                <div className="fam-package-head">
                  <p id="text-fam-pack-head1">Basic</p>
                  <p id="text-fam-pack-head2">
                    Our standard health care package for your family.
                  </p>
                  <p id="text-fam-pack-price1">Rs. 20,000</p>
                  <p id="text-fam-pack-head3">per year</p>
                </div>
                <div className="fam-packages-ul">
                  <ul className="fam-package-ul1">
                    <li>Up to 6 members.</li>
                    <li>
                      Medical consultation at home by experienced doctors(8
                      times)
                    </li>
                    <li>
                      Online medical consultation by expert doctors(12 times)
                    </li>
                    <li>Home visit by professional nurses(8 times)</li>
                    <li>Follow up by customer health services department</li>
                    <li>Emergency visit</li>
                    <li>Nutrition/ deit plan by an experienced dietician</li>
                    <li>Off on lab charges(7%)</li>
                    <li>Off on medicines(7%)</li>
                  </ul>
                  <button className="fam-pack-button">Get Started</button>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default FamilyPackage;
