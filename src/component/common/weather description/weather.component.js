// import { http } from "../../../utils/httpClient"

// function getWeather() {
//     navigator.geolocation.getCurrentPosition(function (done, err) {
//         if (done) {
//             console.log("inside done geolocator")
//             let latitude = done.coords.latitude
//             let longitude = done.coords.longitude
//             return new Promise(function (resolve, reject) {
//                 http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=47056d723585bc46aefd6a866267557a`,function(err,done){
//                     if(err){
//                         return reject(err)
//                     }
//                     console.log(done)
//                     let weather
//                     let weatherDescription
//                     let currentTemperature
//                     weather = done.data
//                         weatherDescription = done.data.weather[0]
//                         currentTemperature = (done.data.main.temp - 273.15).toString()
//                     return resolve(weather)
//                 })
                   
//             })

//         }
//         else {
//             console.log("geolocation is not working", err)
//         }
//     })
// }

// export const Weather = {
//     getWeather
// }

