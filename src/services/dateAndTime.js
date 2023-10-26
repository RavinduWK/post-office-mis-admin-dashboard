export const formatDateAndTime = (dateObj) => {
  // For day of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = days[dateObj.getDay()];

  // For day of the month (with suffix)
  const dateOfMonth = dateObj.getDate();
  let suffix = "th";
  if (dateOfMonth === 1 || dateOfMonth === 21 || dateOfMonth === 31) {
    suffix = "st";
  } else if (dateOfMonth === 2 || dateOfMonth === 22) {
    suffix = "nd";
  } else if (dateOfMonth === 3 || dateOfMonth === 23) {
    suffix = "rd";
  }

  // For month
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[dateObj.getMonth()];

  // For year
  const year = dateObj.getFullYear();

  // For time
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;

  return {
    date: `${dayOfWeek} ${dateOfMonth}${suffix} ${monthName}, ${year}`,
    time,
  };
};
