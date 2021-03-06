import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
const middlewares = [thunk]

const initialState = {
    user:{
        profileImage:"",
        userId:null,
        isProfileChanged:false
    },
    cart:{
        allabtest:[],
        cartitems:[],
        cartnumber:null,
        cartvalue:parseInt(localStorage.getItem("cartvalue"))||0,
        tempdata:{
            totalamount:0
        },
        addtocartsignal:true,
        checkoutsignal:false,
        removeproductsign:true,
        cartpopupsign:false
    },
    sidebar:{
        isopen:null
    },
    medicalReports:{
        reports:true,
        utilsInfo:false
    },
    paymentPopUp:{
        trigger:false
    },
    appointmentBooking:{
        appointmentBookingPopUp:false,
        doctorInfo:null,
        isDoctorInfoAdded:false,
        appointmentDate:"",
        appointmentTime:"",
        isAppointmentFixed:false,
        doctorPaymentType:"online",
        isDoctorAppointmentLoading:false,
        selectedHospitalDoctorService:null,
        hospitalInfo:null,
        hospitalDoctorBookingIdAfterBooking:null,
    },
    digiDoctorAppointmentBooking:{
        isDigiDoctorAppointmentFixed:false,
        isLoadingAppointmentBooking:false,
        digiDoctorAppointmentDate:"",
        digiDoctorAppointmentTime:"",
        digiDoctorInfo:null,
        digiDoctorPaymentType:"online",
        selectedService:null,
        digiDoctorBookingIdAfterBooking:null,
        emailAlreadyExistsMessage:null
    },
    digiServiceBooking:{
        data : null,
    },
    packageBooking : {
        data : null
    }
}
export const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))