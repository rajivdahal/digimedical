const REGEX = {
    DECIMAL : /^\d*\.?\d*$/,
    EMAIL : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    PASSWORD : /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
}

const DAYS = [
    { value: "sun", label: "Sunday"},
    { value: "mon", label: "Monday"},
    { value: "tue", label: "Tuesday"},
    { value: "wed", label: "Wednesday"},
    { value: "thur", label: "Thursday"},
    { value: "fri", label: "Friday"},
    { value: "sat", label: "Saturday"},
  ];

  const BLOODGROUP = [
    { value: "0", label: "A-Positive" },
    { value: "1", label: "A-Negative" },
    { value: "2", label: "O-Positive" },
    { value: "3", label: "O-Negative" },
    { value: "4", label: "B-Positive" },
    { value: "5", label: "B-Negative" },
    { value: "6", label: "AB-Positive" },
    { value: "7", label: "AB-Negative" },  
  ];


export { REGEX,DAYS,BLOODGROUP }