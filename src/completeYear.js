let fullYearCalendar = {};

// initialize date to Jan 1, 1900
let date = new Date(0, 0, 1);

// day length in milliseconds
let dayLength = 1000 * 60 * 60 * 24;

// year length in days (account for leap years)
let year = date.getFullYear();
let yearLength = year % 4 || (!(year % 100) && year % 400) ? 365 : 366;

for (let i = 0; i < yearLength; i++) {
  // determine month
  let month = date.toLocaleDateString("en-US", { month: "long" });

  // determine weekday
  let weekday = date.toLocaleDateString("en-US", { weekday: "short" });

  // initialize month if it does not exist
  if (!fullYearCalendar[month]) fullYearCalendar[month] = [];

  // add current day to month
  fullYearCalendar[month].push({
    date: date.getDate(),
    day: weekday.toLowerCase(),
  });

  // increment date by one day
  date = new Date(date.getTime() + dayLength);
}

console.log(fullYearCalendar);
