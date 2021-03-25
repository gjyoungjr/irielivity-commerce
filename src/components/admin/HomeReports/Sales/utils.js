// utils fxn
// format fxn for date
export const formatDate = (dateValue) => {
  // gets date in milliseconds
  const timeStampDate = dateValue;
  const dateInMillis = timeStampDate.seconds * 1000;
  // array holds month names
  const monthNames = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  // gets the date in number
  const date = new Date(dateInMillis).getDate();
  // gets the month in number
  const month = new Date(dateInMillis).getMonth();

  // concate date & month name
  dateValue = date + " " + monthNames[month];

  // return date
  return dateValue;
};

// filter array for unique values
export const filterArray = (arr) => {
  return arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
};

export const getDate = (dateValue) => {
  // gets date in milliseconds
  const timeStampDate = dateValue;
  const dateInMillis = timeStampDate.seconds * 1000;

  // gets the date in number
  const date = new Date(dateInMillis).getDate();
  // set param to date
  dateValue = date;

  // return date
  return dateValue;
};
