import moment from "moment";

const today=()=>{
    return moment().format('MMMM Do YYYY, h:mm a');
}
export const formatDate = (date, format = 'LL') => {
    if (!date) return;
    return moment(date).format(format)
}

export const TimeandDate={
    today
}

