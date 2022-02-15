import React from "react";
import "./elderlyCareAtHome.css";
import Ooscomponent from "../ouros.component";

export default function labtestAtHome() {
  return (
    <div className="ourserv-cont-main">
      <div className="ourserv-cont-main1">
        <div className="serv-passages">
          <p className="questionheads">Elderly Care At Home </p>
          <div className="serv-boxes">
            <p className="serv-text">
              Digi Medical brings to you a comprehensive healthcare solution for
              all ageing needs. Our Care Plans are specially curated to cater to
              individual healthcare needs. With a dedicated team of experienced
              health professionals who ensures all your healthcare needs are
              taken care of, be rest assured. Various diseases, physical
              disabilities, mobility issues, lack of support at home, etc. makes
              eldercare mandatory for aged people, so that they too can live
              independently with dignity. Digi Medical provides care to the
              elderly people at home surrounded by their family members which
              leads to speedy recovery.
            </p>
          </div>
          <p className="questionheads">Importance of Elderly care at home</p>
          <div className="serv-boxes">
            <p className="serv-text">
              When your health begins to fail and you become increasingly
              reliant on others for your everyday activities, growing old is a
              challenging experience. The elderly demands the most attention and
              compassion at this time. The significance of adequate senior care
              cannot be stressed, since they, too, deserve to be treated with
              dignity. Despite the fact that modern life's restraints may not
              always allow people to take care of their elderly, they can always
              opt for appropriate elderly home health care services for the
              smooth functioning of their life. Elders desire a life with good
              health, dignity and prosperity not just for themselves but for the
              whole family.
            </p>
          </div>
          <p className="questionheads">
            When do you need Digi Medical for elderly care?
          </p>
          <div className="serv-boxes">
            <p className="serv-text">
              We understand how hard it is to find balance when caring for a
              loved one who is ageing. That’s why our goal is to provide high
              quality elderly home care services that fit the needs of you and
              your ageing loved one. The sort of geriatric care required is
              determined by the old person's health, the severity of the
              problem, and the type of care required. The majority of patients
              do not require full-time nurses, it is required only if the
              patient is in severe condition and is physically unable to carry
              out their basic tasks.
            </p>
            <div className="packages_lt">
              {" "}
              <h3>
                Some warning signs that need health personnel attention are as
                follows:{" "}
              </h3>
              <table className="table-eld-care">
                <tr>
                  <th>S/N</th>
                  <th>Physical Problems</th>
                  <th>Cognitive Problems</th>
                  <th>Emotional Problems</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Gait, stability (walking problems)</td>
                  <td>Confusion</td>
                  <td>Depression</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    Sensory issues (a loss or decline in hearing, seeing,
                    smelling)
                  </td>
                  <td>Memory loss</td>
                  <td>Social withdrawal</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    Chronic health conditions (diabetes, heart disease, COPD,
                    arthritis)
                  </td>
                  <td>Attention problems</td>
                  <td>Loneliness</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    Temporary or permanent physical limitations that may inhibit
                    the senior’s ability to perform ADLs (Alzheimer's disease,
                    delirium, dementia, Parkinson disease and so on)
                  </td>
                  <td>
                    Forgetting to take medicine on time, at the right time, or
                    at all
                  </td>
                  <td>
                    Changes in personality (irritable, angry, moody, etc.)
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Others</td>
                  <td>Language problems</td>
                  <td>Loss of interest in activities</td>
                </tr>
              </table>
            </div>
          </div>
          <p className="questionheads">
            Benefits of taking elderly care services from Digi Medical{" "}
          </p>
          <div className="serv-boxes">
            <ul className="serv-text">
              <li>Screening for disease prevention.</li>
              <li>
                Diagnosis at an early disease stage, when symptoms are just
                beginning to appear.
              </li>
              <li>
                Diagnosis and prognosis, particularly of infectious diseases to
                identify the causative agent and determine its resistance
                profile to antibiotics.
              </li>
              <li>Treatment decisions and treatment monitoring.</li>
            </ul>
          </div>
        </div>
        <Ooscomponent></Ooscomponent>
      </div>
    </div>
  );
}
