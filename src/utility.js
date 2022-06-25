export const Jan = Array.from(Array(31).keys()); //0-30  //month start and end indexes
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

export const monthSelectOptions = [
  { value: "January", label: "January", monthValue: 0 },
  { value: "February", label: "February", monthValue: 1 },
  { value: "March", label: "March", monthValue: 2 },

  { value: "April", label: "April", monthValue: 3 },
  { value: "May", label: "May", monthValue: 4 },
  { value: "June", label: "June", monthValue: 5 },
  { value: "July", label: "July", monthValue: 6 },
  { value: "August", label: "August", monthValue: 7 },
  { value: "September", label: "September", monthValue: 8 },
  { value: "October", label: "October", monthValue: 9 },
  { value: "November", label: "November", monthValue: 10 },
  { value: "December", label: "December", monthValue: 11 },
];

export const events = [
  { title: "A test event", date: "2022-06-01T00:00:00.000Z", isAllDay: false },

  { title: "A test event", date: "2022-06-02T00:00:00.000Z", isAllDay: false },
  { title: "A test event", date: "2022-06-01T00:00:00.000Z", isAllDay: false },
  { title: "A test event", date: "2022-06-01T00:00:00.000Z", isAllDay: true },
];

export const noAllDayEvents = events.filter(function (item) {
  return item.isAllDay === false;
});

function handleClickOnEvent(evt, item) {
  // showModal(true);
}

function getEvents(year, month, date, hour) {
  let realDate = date + 1;
  let realMonth = month + 1;
  let dateObject = new Date(`${year}-${month}-${realDate}`);
  let isoDate = dateObject.toISOString();

  const matchedEvents = noAllDayEvents.filter(function (item) {
    return (
      new Date(item.date).getHours() === hour &&
      new Date(item.date).getDate() === realDate &&
      new Date(item.date).getFullYear() === year &&
      new Date(item.date).getMonth() + 1 === month
    );
  });

  if (matchedEvents && matchedEvents.length) {
    const eventElements = matchedEvents.map(function (item, index) {
      return (
        <span
          onClick={(evt) => handleClickOnEvent(evt, item)}
          key={index.toString()}
          className="event"
        >
          {item.title}
        </span>
      );
    });
    return eventElements;
  }
}

function getDay(year, month, day) {
  let date = new Date(`${year}-${month}-${day + 1}`);
  let dateString = date.toDateString();
  let splitDate = dateString.split(" ");
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
        {/* {hour + 1} */}

        <span className="events-container">
          {getEvents(year, month, date, hour)}
        </span>
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
      {generateHourElements(currentYear, 1, item)}
    </span>
  );
});

export const febElements = Feb.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 2, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 2, item)}
    </span>
  );
});

export const marElements = Mar.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 3, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 3, item)}
    </span>
  );
});

export const aprElements = Apr.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 4, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 4, item)}
    </span>
  );
});

export const mayElements = May.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 5, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 5, item)}
    </span>
  );
});

export const junElements = Jun.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 6, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 6, item)}
    </span>
  );
});
export const julElements = Jul.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 7, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 7, item)}
    </span>
  );
});

export const augElements = Aug.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 8, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 8, item)}
    </span>
  );
});
export const sepElements = Sep.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 9, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 9, item)}
    </span>
  );
});

export const octElements = Oct.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 10, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 10, item)}
    </span>
  );
});

export const novElements = Nov.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 11, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 11, item)}
    </span>
  );
});

export const decElements = Dec.map(function (item, index) {
  return (
    <span key={index.toString()} className="month-elements">
      <span className="day-heading">
        {getDay(currentYear, 12, item)} <br /> {item + 1}{" "}
      </span>{" "}
      {generateHourElements(currentYear, 12, item)}
    </span>
  );
});
export const YearElements = [
  janElements,
  febElements,
  marElements,
  aprElements,
  mayElements,
  junElements,
  julElements,
  augElements,
  sepElements,
  octElements,
  novElements,
  decElements,
];

export const yearElements1 = janElements;

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
