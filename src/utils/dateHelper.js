import moment from 'moment';


const getCurrentDate = (format = "YYYY-MM-DD") => moment().format(format);

const formatDate = (date,format = "YYYY-MM-DD") => moment(date).format(format);

export {
    getCurrentDate,
    formatDate
}