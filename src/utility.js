export const Jan = Array.from(Array(31).keys()); //0-30
export const Feb = Array.from(Array(28).keys()); // 31-58
export const LeapFeb = Array.from(Array(29).keys()); //59-89
export const Mar = Array.from(Array(31).keys()); //90-119
export const Apr = Array.from(Array(30).keys()); //120-150
export const May = Array.from(Array(31).keys()); //151-180
export const Jun = Array.from(Array(30).keys()); //181-211
export const Jul = Array.from(Array(31).keys()); //212-242
export const Aug = Array.from(Array(31).keys()); //243-272
export const Sep = Array.from(Array(30).keys()); //273-303
export const Oct = Array.from(Array(31).keys()); //304-333
export const Nov = Array.from(Array(30).keys()); //334-364
export const Dec = Array.from(Array(31).keys());

export const monthIndexes = {
  jan: { start: 0, end: 30 },
  feb: { start: 31, end: 58 },
  march: { start: 59, end: 89 },
  april: { start: 90, end: 119 },
  may: { start: 120, end: 150 },
  june: { start: 151, end: 180 },
  july: { start: 181, end: 211 },
  aug: { start: 212, end: 242 },
  sep: { start: 243, end: 272 },
  oct: { start: 273, end: 303 },
  nov: { start: 304, end: 333 },
  dec: { start: 334, end: 364 },
};

export const currentYear = new Date().getFullYear();
export const isLeapYear = new Date(currentYear, 1, 29).getDate() === 29;
export const currentMonth = new Date().getMonth();

export const Year = [
  ...Jan,
  ...Feb,
  ...Mar,
  ...Apr,
  ...May,
  ...Jun,
  ...Jul,
  ...Aug,
  ...Sep,
  ...Oct,
  ...Nov,
  ...Dec,
];

export const events = [
  { title: "A test event", date: "2022-01-01T01:48:00.000Z", isAllDay: false },
  { title: "A test event", date: "2022-01-01T02:48:00.000Z", isAllDay: false },
  { title: "A test event", date: "2022-01-01T06:48:00.000Z", isAllDay: true },
];

export const noAllDayEvents = events.filter(function (item) {
  return item.isAllDay === false;
});

function getEvents(year, month, date, hour) {
  let realDate = date + 1;
  let realMonth = month + 1;
  let dateObject = new Date(`${year}-${month + 1}-${date + 1}`);
  let isoDate = dateObject.toISOString();

  let matchedEvents = noAllDayEvents.filter(function (item) {
    return (
      new Date(item.date).getHours() === hour &&
      new Date(item.date).getDate === realDate &&
      new Date(item.date).getFullYear === year &&
      new Date(item.date).getMonth === realMonth + 1
    );
  });

  const eventElements = matchedEvents.map(function (item, index) {
    return (
      <span key={index.toString()} className="event">
        {item.title}
      </span>
    );
  });
  debugger;

  return eventElements;
}

function getDay(year, month, day) {
  let date = new Date(`${year}-${month}-${day + 1}`);
  let dateString = date.toDateString();
  let splitDate = dateString.split(" ");
  console.log(splitDate);
  return splitDate[0];
}

export function get12HourFormat(hour) {
  if (hour === 0) {
    return "12 AM";
  } else if (hour < 12) {
    return `${hour} AM`;
  } else if (hour === 12) {
    return "12 PM";
  } else if (hour > 12) {
    return `${hour - 12} PM`;
  }
}

function generateHourElements(year, month, date) {
  return Array.from(Array(24).keys()).map(function (hour, index) {
    return (
      <div key={index.toString()} className="hour-item">
        {hour + 1}
        {getEvents(year, month, date, hour)}
      </div>
    );
  });
}

export const janElements = Jan.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 1, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 0, item)}
    </span>
  );
});

export const yearElements = Year.map(function (item, index) {
  return <span> {item} </span>;
});

function getDate(year, month, day) {
  let date = new Date(`${year}-${month}-${day}`);
  return date.toISOString();
}

export function getSelectedMonth(selection) {
  if (
    selection >= monthIndexes.jan.start &&
    selection <= monthIndexes.jan.end
  ) {
    return "Janurary";
  } else if (
    selection >= monthIndexes.feb.start &&
    selection <= monthIndexes.feb.end
  ) {
    return "February";
  } else if (
    selection >= monthIndexes.march.start &&
    selection <= monthIndexes.march.end
  ) {
    return "March";
  } else if (
    selection >= monthIndexes.april.start &&
    selection <= monthIndexes.april.end
  ) {
    return "April";
  }
}

export const testElements = Year.map(function (item, index) {
  if (index >= monthIndexes.jan.start && index <= monthIndexes.jan.end) {
    return (
      <div className="day-item">
        <span> {getDay(currentYear, 1, item + 1)} </span>
        <div> {getDate(currentYear, 1, item + 1)} </div>{" "}
        {Array.from(Array(10).keys())}
      </div>
    );
  } else if (index >= monthIndexes.feb.start && index <= monthIndexes.feb.end) {
    return (
      <div>
        {" "}
        <span> {getDay(currentYear, 2, item + 1)} </span>
        <div> {getDate(currentYear, 2, item + 1)} </div>
      </div>
    );
  } else if (
    index >= monthIndexes.march.start &&
    index <= monthIndexes.march.end
  ) {
    return (
      <div>
        {" "}
        <span> {getDay(currentYear, 3, item + 1)} </span>
        <div> {getDate(currentYear, 3, item + 1)} </div>{" "}
      </div>
    );
  } else if (
    index >= monthIndexes.april.start &&
    index <= monthIndexes.april.end
  ) {
    return (
      <div>
        {" "}
        <span> {getDay(currentYear, 4, item + 1)} </span>
        <div> {getDate(currentYear, 4, item + 1)} </div>{" "}
      </div>
    );
  } else if (index >= monthIndexes.may.start && index <= monthIndexes.may.end) {
    return (
      <div>
        {" "}
        <span> {getDay(currentYear, 5, item + 1)} </span>
        <div> {getDate(currentYear, 5, item + 1)} </div>
      </div>
    );
  } else if (
    index >= monthIndexes.june.start &&
    index <= monthIndexes.june.end
  ) {
    return (
      <div>
        {" "}
        <span> {getDay(currentYear, 6, item + 1)} </span>
        <div> {getDate(currentYear, 6, item + 1)} </div>{" "}
      </div>
    );
  } else if (
    index >= monthIndexes.july.start &&
    index <= monthIndexes.july.end
  ) {
    return (
      <div>
        {" "}
        <span> {getDay(currentYear, 7, item + 1)} </span>
        <div> {getDate(currentYear, 7, item + 1)}</div>{" "}
      </div>
    );
  } else if (index >= monthIndexes.aug.start && index <= monthIndexes.aug.end) {
    return (
      <div>
        {" "}
        <span> {getDay(currentYear, 8, item + 1)} </span>
        <div> {getDate(currentYear, 8, item + 1)}</div>{" "}
      </div>
    );
  } else if (index >= monthIndexes.sep.start && index <= monthIndexes.sep.end) {
    return (
      <div>
        {" "}
        <span> {getDay(currentYear, 9, item + 1)} </span>
        <div> {getDate(currentYear, 9, item + 1)} </div>{" "}
      </div>
    );
  } else if (index >= monthIndexes.oct.start && index <= monthIndexes.oct.end) {
    return (
      <div>
        {" "}
        <span> {getDay(currentYear, 10, item + 1)} </span>
        <div> {getDate(currentYear, 10, item + 1)} </div>{" "}
      </div>
    );
  } else if (index >= monthIndexes.nov.start && index <= monthIndexes.nov.end) {
    return (
      <div>
        {" "}
        <span> {getDay(currentYear, 11, item + 1)} </span>
        <div> {getDate(currentYear, 11, item + 1)} </div>{" "}
      </div>
    );
  } else if (index >= monthIndexes.dec.start && index <= monthIndexes.dec.end) {
    return (
      <div>
        {" "}
        <span> {getDay(currentYear, 12, item + 1)} </span>
        <div> {getDate(currentYear, 12, item + 1)}</div>{" "}
      </div>
    );
  }
});
