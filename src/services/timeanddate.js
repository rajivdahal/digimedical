import moment from "moment";

const today=()=>{
    return moment().format('MMMM Do YYYY, h:mm a');
}

export const TimeandDate={
    today
}

