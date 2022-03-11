import React from "react";
import Ooscomponent from "../ouros.component";
export default function VaccinationAtHome() {
  return (
    <div className="ourserv-cont-main">
      <div className="ourserv-cont-main1">
        <div className="serv-passages">
          <p className="questionheads"> What is vaccination? </p>
          <div className="serv-boxes">
            <p className="serv-text">
              The procedure of delivering an antigenic material or vaccine to
              provide protection against one or more illnesses is known as
              vaccination. It boosts immunity in the human body and protects the
              vaccinated individual from infection, preventing disease onset.
              Digi medical provides different types of vaccinations at the
              comfort of your home.
            </p>
          </div>
          <p className="questionheads">Importance of vaccination </p>
          <div className="serv-boxes">
            <p className="serv-text">
              Prevention is better than cure and as such it is always advisable
              to get vaccinated for the varied diseases rather than suffer and
              seek medication. Vaccination forms a line of defence for our body
              and prevents it from getting infected with any infectious disease,
              some of which can be fatal. The top few reasons to get vaccinated
              are:
            </p>

            <ul className="serv-text">
              <li>
                {" "}
                Vaccination protects children and adults from infections that
                are potentially lethal or cause physical disability.
              </li>
              <li>
                {" "}
                If you are not inoculated, you may become infected with a
                disease and pass it to family members who have low immunity or
                who have not been vaccinated.
              </li>
              <li>
                {" "}
                Vaccination is significantly less expensive than the medical
                attention required to cure you if you become infected with a
                disease.
              </li>
            </ul>
          </div>
          <p className="questionheads">Benefits of vaccination at home</p>
          <div className="serv-boxes">
            <p className="serv-text">
              Vaccination is a simple procedure and can be easily administered
              at home under the care of a qualified health professional. The
              benefits of getting vaccinations at home are as follows:
            </p>
            <ul className="serv-text">
              <li>
                {" "}
                The most obvious advantage of obtaining vaccinations at home is
                that you can acquire the services of a certified, experienced
                health expert without having to travel all the way to the
                hospital and wait in line.
              </li>
              <li>
                {" "}
                Vaccination at home also gives you the option of choosing the
                day and time of vaccination according to your schedule, rather
                than having to postpone the important vaccinations.
              </li>
              <li>
                {" "}
                It reduces the chance of cross contamination and infection.
              </li>
              <li> Affordable and cost-effective service.</li>
            </ul>
          </div>
          <p className="questionheads">
            When do you need Digi medical for vaccination?
          </p>
          <div className="serv-boxes">
            <p className="serv-text">
              Vaccination is a crucial process that protects us from infections
              that are potentially fatal. Visiting a hospital or a doctor's
              clinic for such a minor treatment is simply too stressful,
              especially when immunizations may be obtained at home. Digi
              Medical provides qualified experienced health personnel who will
              readily visit you and administer vaccines at home at affordable
              price. There are various vaccines according to the demand of the
              client like Hepatitis B, influenza, pneumonia, tetanus vaccine and
              many more.
            </p>{" "}
          </div>
        </div>
        <Ooscomponent></Ooscomponent>
      </div>
    </div>
  );
}
