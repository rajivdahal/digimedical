export function whatIsMapper(params) {
    switch (params) {
        case "nursing-at-home":
            return `We provide you the Nurse care facility at your home with no mean time, Searching and enquiring
            process could be hectic physically so Digimedical provides you the best service all over Nepal for Nursing care.
            Through online Nursing booking you will get all the necessary utils for a particular health care.`


        case "doctor-at-home":
            return `Consulting doctors at the hospital could be a tiresome task involving
            depending on the hospitals for general consultations and regular
            health check-ups. Through doctor at home service you could get proper
            attention from the doctor and personalized treatment and help you
            throughout your recovery process,avoid longer waiting periods in
            hospital and reduce the need for travel.Furthermore, you will be
            treated in the comfort of your home, surrounded by your family
            members.The doctor home visit service can be a great convenience for
            all`
        case "online-medical-consultation":
            return `Doctor prescription and follow up physically in person could be difficult in the Digital world. Follow up routine and dappointment checkup are available in our package `
        case "labtest-at-home":
            return `We provide you different lab tests like blood test,Urine test,Sugar test and various other tests related to every sectors. Not only lab test but also ECG and X-rays`
        case "pcr-at-home":
            return ` From 2020 increasing pattern of Covid has created fragile situation.It is very risky to go outside in public only for the PCR test
            Our Doctor team will help you to solve this issue at your home
            `
        case "utility-at-home":
            return `Utility at home includes ECG,USG and different lab tests right on your house.
            Our expert doctors and lab technician will come to your doorstep and take all the saples for diagnosing the
            problems
            `
        default:
            break;
    }

}


export function detailsFeature(params){
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
            `


        case "doctor-at-home":
            return `Consulting doctors at the hospital could be a tiresome task involving
            depending on the hospitals for general consultations and regular
            health check-ups. Through doctor at home service you could get proper
            attention from the doctor and personalized treatment and help you
            throughout your recovery process,avoid longer waiting periods in
            hospital and reduce the need for travel.Furthermore, you will be
            treated in the comfort of your home, surrounded by your family
            members.The doctor home visit service can be a great convenience for
            all. egestas.
            <ul class="ul_docathome_feat">
            <li>24 hours Doctor facility</li>
            <li>Doctor at home</li>
            <li>Ambulance service</li>
            <li>Follow up at home</li>

    </ul>
            `
        case "online-medical-consultation":
            return `Doctor prescription and follow up physically in person could be difficult in the Digital world. Follow up routine and dappointment checkup are available in our package
             <ul class="ul_docathome_feat">
                <li>Online service via Zoom and Google meet</li>
                <li>Emergency health service</li>
                <li>Nurse care consultation</li>
                <li>Doctor recommendation</li>
            </ul>`

        case "labtest-at-home":
            return `We provide you different lab tests like blood test,Urine test,Sugar test and various other tests related to every sectors. Not only lab test but also ECG and X-rays
            <ul class="ul_docathome_feat">
            <li>Blood test at home</li>
            <li>Sugar test at home</li>
            <li>ECG at home</li>
            <li>X-ray at home</li>
            // <li>ot</li>
          </ul>
            `
        case "pcr-at-home":
            return ` From 2020 increasing pattern of Covid has created fragile situation.It is very risky to go outside in public only for the PCR test
            Our Doctor team will help you to solve this issue at your home
            <ul class="ul_docathome_feat">
            <li>Urgent report delivery</li>
            <li>Safe and sound test</li>
            <li>Affordable test</li>
    </ul>
            `
        case "utility-at-home":
            return `Utility at home includes ECG,USG and different lab tests right on your house.
            Our expert doctors and lab technician will come to your doorstep and take all the saples for diagnosing the
            problems
            <ul class="ul_docathome_feat">
            <li>ECG</li>
            <li>X-ray</li>
            <li>Lab -tests</li>
            <li>Medical consultation</li>
             </ul>
            `
        default:
            break;
    }

}