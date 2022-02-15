import React from "react";

import Ooscomponent from "../ouros.component";

export default function labtestAtHome() {
  return (
    <div className="ourserv-cont-main">
      <div className="ourserv-cont-main1">
        <div className="serv-passages">
          <p className="questionheads">What is an alternative medicine?</p>
          <div className="serv-boxes">
            <p className="serv-text">
              Alternative medicine is a term that describes medical treatments
              that are used instead of mainstream therapies. Alternative
              medicine is defined loosely as a set of products, practices, and
              theories that are believed or perceived by their users to have the
              healing effects of medicine, but whose effectiveness has not been
              established using scientific methods.
            </p>
          </div>
          <p className="questionheads">
            What are the types of alternative medicine?
          </p>
          <div className="serv-boxes">
            <ul className="serv-text">
              <li>Acupuncture</li>
              <li>Acupressure</li>
              <li>Reiki </li>
              <li>Massage therapy</li>
              <li>Yoga </li>
              <li>Kundalini yoga </li>
              <li>Meditation</li>
              <li>Music therapy </li>
            </ul>
          </div>

          <p className="questionheads">Acupuncture</p>
          <div className="serv-boxes">
            <p className="serv-text">
              This is a traditional Chinese medicine technique that uses needles
              to stimulate specific points around the body. The person who
              performs this therapy (an acupuncturist) sticks thin, sterile
              needles into your skin. The goal is to help your body’s natural
              healing process kick in. Studies show that acupuncture can be
              effective in treating a number of conditions, like neck and back
              pain, nausea, anxiety, depression, insomnia, infertility, and many
              more.
            </p>
          </div>
          <p className="questionheads">Acupressure </p>
          <div className="serv-boxes">
            <p className="serv-text">
              It is an alternative medicine technique often used in conjunction
              with acupuncture. It is based on the concept of life energy which
              flows through "meridians" in the body. In treatment, physical
              pressure is applied to acupuncture points or ashi trigger points
              with the aim of clearing blockages in these meridians. Pressure
              may be applied by hand, by elbow, or with various devices. Some
              medical studies have suggested that acupressure may be effective
              at helping manage nausea and vomiting, low back pain, tension
              headaches, stomach ache and so on.
            </p>
          </div>
        </div>
        <Ooscomponent></Ooscomponent>
      </div>
    </div>
  );
}
