export function whatIsMapper(params) {
  switch (params) {
    case "nursing-at-home":
      return ` Nursing service at home offers personalized nursing care while being more compassionate towards the patient and gets integrated into the patient’s family and develops an emotional bond with the patient and their family. The services are provided by experienced registered  nurses .Care for a few hours or 24 hours, short or long term. We help people stay in their homes with the comfort of knowing that all of their basic requirements are met.Our highly qualified nurses provide compassionate, supportive, empathetic care for all of your nursing and medical needs, whether they occur at home, in need of medical facilities, or while traveling .`;

    case "doctor-at-home":
      return `Consulting doctors at the hospital could be a tiresome task involving
            depending on the hospitals for general consultations and regular
            health check-ups. Through doctor at home service you could get proper
            attention from the doctor and personalized treatment and help you
            throughout your recovery process,avoid longer waiting periods in
            hospital and reduce the need for travel.Furthermore, you will be
            treated in the comfort of your home, surrounded by your family
            members.The doctor home visit service can be a great convenience for
            all`;
    case "online-medical-consultation":
      return `Digi medical is the online medical video-consultation platform that combines advanced video and voice technologies with the medical knowledge and expertise of senior doctors.In our online medical consultation you can consult with Nepal's greatest doctors, who are dedicated to recommending and guiding people in the best possible way for their health related problems. Online medical consultation is one of the most affordable, convenient  and cost effective solutions to your medical needs. `;
    case "labtest-at-home":
      return `Digi Medical is partnered with the A Class certified labs in the country. We have a team of experienced health personnel , who collect samples from clients' homes. Booking a lab test is quick and easy. Once a client books a test, our experienced health personnel go as per the agreed time slot and collect the blood,urine, swab samples. These are sent to our certified lab partners.Reports are sent to the client within 24-48 hours of collecting the sample.We provide complete health check-up packages and individual lab tests for you and your family.`;
    case "pcr-at-home":
      return ` The polymerase chain reaction (PCR) test for COVID-19 is a molecular test that analyzes your upper respiratory specimen, looking for genetic material (ribonucleic acid or RNA) of SARS-CoV-2, the virus that causes COVID-19. The PCR test has been the gold standard test for diagnosing COVID-19. It is accurate and reliable.
            `;
    case "utility-at-home":
      return `Ultrasonography (USG)/ultrasound  is a procedure that uses high-energy sound waves to look at tissues and organs inside the body. The sound waves make echoes that form pictures of the tissues and organs on a computer screen (sonogram). Ultrasonography is used to help diagnose diseases.
      An electrocardiogram(ECG) records the electrical signals in your heart.An echocardiogram (ECHO) is a test that uses high frequency sound waves (ultrasound) to make pictures of your heart. The test is also called echocardiography or diagnostic cardiac ultrasound.
            `;
    default:
      break;
  }
}

export function detailsFeature(params) {
  switch (params) {
    case "nursing-at-home":
      return `We provide you the Nurse care facility at your home with no mean time, Searching and enquiring
            process could be hectic physically so Digimedical provides you the best service all over Nepal for Nursing care.
            Through online Nursing booking you will get all the necessary utils for a particular health care.
            <ul class="ul_docathome_feat">
                    <li>24 hours Nursing facility</li>
                    <li>Medical utility</li>
                    <li>Ambulance service</li>
            </ul>
            `;

    case "doctor-at-home":
      return `You don't have to leave the home, though the doctor will come to your home and assess, diagnose and treat you depending on the condition of your health. Our experienced doctors have years of experience in their specialized medical field and will treat you with patience and compassion. 
            Digimedical service is ready to serve you with our specialized and experienced doctors of different medical fields like: 
            
            <ul class="ul_docathome_feat">
            <li>General Physician/ Surgeon</li>
            <li>Community Medicine</li>
            <li>Cardiologist</li>
            <li>Nephrologist</li>
            <li>Pulmonologist</li>
            <li>Obstetrician and Gynecologist</li>
            <li>Pediatrician</li>
            <li>Physiotherapist</li>
            <li>Dietician</li>
            <li>Oncologist</li>
            <li>Endocrinologist </li>
            <li>Neurologist</li>
            <li>Dentist</li>
            <li>Psychiatrists</li>
            <li>Dentist</li>
            <li>Dermatologist</li>
            <li>Ophthalmologist</li>
            <li>ENT (Otorhinolaryngologist</li>
            <li>Orthopedic </li>
            <li>Radiologist</li>
            <li>Rheumatologist</li>
            <li>Gastroenterologist</li>
            <li>Haematologist</li>
            <li>General medicine </li>

    </ul>
            `;
    case "online-medical-consultation":
      return `Since we do have the best doctors of Nepal as well as we can arrange you international doctors online for your specialized health related problems. There are no boundaries of time and location; you can access our service from anywhere, anytime from all around the world. You can be part of an online medical consultation for your family or loved one’s health while doing an online medical consultation. 
      Benefits of Online Medical Consultation are:
             <ul class="ul_docathome_feat">
             <li>Get prompt Medical advice.</li>
             <li>Comfortable and Convenient for the client and family members.</li>
             <li>Affordable and cost effective treatment for clients.</li>
             <li>Avoid longer waiting periods and travel to the hospital or clinics thus saving time.</li>
             <li>The online consultation by our specialized doctors can lead to quick diagnosis and treatment.</li>
             <li> Group online Medical Consultation between doctor, client and family member can be carried out which reduces stress among family members even though they are out of the country or elsewhere.</li>
             <li>Digital Prescription is a hassle free process.</li>
             <li>Maintain the privacy of clients.</li>
            </ul>`;

    case "labtest-at-home":
      return `We provide you different lab tests like blood test,Urine test,Sugar test and various other tests related to every sectors. Not only lab test but also ECG and X-rays
            <ul class="ul_docathome_feat">
            <li>Complete blood count </li>
            <li>Liver function test </li>
            <li>Kidney function test</li>
            <li>Glucose challenge test </li>
            <li>Oral glucose tolerance test</li>
            <li>Lipid profile </li>
            <li>Serology test</li>
            <li>Mid-stream urine test</li>
            <li>Faecal collection occult blood </li>
            <li>Sputum collection</li>
            <li>Adreno cortico tropic hormone </li>
            <li>Serum cortisol </li>
            <li>Semen analysis </li>
            <li>24 hours urine test</li>
            <li>Adenosine Deaminase</li>
            <li>Alkaline phosphatase</li>
            <li>Allergy screening </li>
            <li>Albumin serum plasma </li>
          </ul>
            `;
    case "pcr-at-home":
      return ` From 2020 increasing pattern of Covid has created fragile situation.It is very risky to go outside in public only for the PCR test
            Our Doctor team will help you to solve this issue at your home
            <ul class="ul_docathome_feat">
            <li>Convenient to clients and family members.</li>
            <li>Cost effective for the client.</li>
            <li>Reduces the risk of cross contamination.</li>
            <li>Reports are sent to clients within 4-6 hours which reduces stress.</li>
            <li>Avoid longer waiting periods in hospitals and clinics thus saving time.</li>
            <li>Accurate and reliable reports.</li>
    </ul>
            `;
    case "utility-at-home":
      return `Utility at home includes ECG,USG and different lab tests right on your house.
            Our expert doctors and lab technician will come to your doorstep and take all the saples for diagnosing the
            problems
            <ul class="ul_docathome_feat">
            <li>Convenient to the client and family members.</li>
            <li>Cost effective for the client. </li>
            <li>Avoid cross contamination.</li>
            <li>Maintain the privacy of clients.</li>
            <li>Accurate and reliable report.</li>
            <li>Reduce stress related to booking an appointment and waiting for a longer period in hospital and clinic.</li>
            <li>Quick diagnosis which leads to fast treatment.</li>
             </ul>
            `;
    default:
      break;
  }
}
