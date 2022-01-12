const REGEX = {
    DECIMAL : /^\d*\.?\d*$/,
    EMAIL : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    PASSWORD : /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
}

const DAYS = [
    { value: "sun", label: "Sunday" },
    { value: "mon", label: "Monday" },
    { value: "tue", label: "Tuesday" },
    { value: "wed", label: "Wednesday" },
    { value: "thur", label: "Thursday" },
    { value: "fri", label: "Friday" },
    { value: "sat", label: "Saturday" },
  ];


export { REGEX,DAYS }