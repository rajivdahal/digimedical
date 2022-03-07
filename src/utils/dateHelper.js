import moment from 'moment';


const getCurrentDate = (format = "YYYY-MM-DD") => moment().format(format);

const formatDate = (date,format = "YYYY-MM-DD") => moment(date).format(format);
const dateEquivalator={
    January:1,
    February:2,
    March:3,
    April:4,
    May:5,
    June:6,
    July:7,
    August:8,
    September:9,
    October:10,
    November:11,
    December:12
}

const reverseString=(string)=>{
    return string.split("").reverse().join("");
}
const splitAlphabeticDate=(date)=>{
    console.log("date is",date)
    let year=""
    let month=""
    let day=""
    for (let index = date.length-1; index >=0; index--) {
        if(index>date.length-5){
          year=year+date[index]
        }
        if(index>date.length-9 && index<date.length-6){
          day=day+date[index]
        }
      }
      month =date.replace(/[^A-Za-z]/g, '');
      console.log("month inside the function",month)
      year=parseInt(reverseString(year))
      day=parseInt(reverseString(day))
      return {
          day:day,
          month:month,
          year:year
      }
}
const convertAlphabeticMonthToNumeric=(month)=>{
    for (const key in dateEquivalator){
        if(month===key){
            return dateEquivalator[key]
        }
    }
}
export {
    getCurrentDate,
    formatDate,
    splitAlphabeticDate,
    convertAlphabeticMonthToNumeric
}