import React, { useEffect, useState } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import "./style.css";
import { ReactComponent as AddEventIcon } from "../src/icons/add_black_24dp.svg";
import { ReactComponent as NextIcon } from "../src/icons/arrow_forward_ios_black_24dp.svg";
import { ReactComponent as PreviousIcon } from "../src/icons/arrow_back_ios_black_24dp.svg";
import {
  currentYear,
  janElements,
  monthIndexes,
  testElements,
  get12HourFormat,
  getSelectedMonth,
  Year,
  currentMonth,
  monthSelectOptions,
  yearElements1,
  YearElements,
  completeYear,
  resolveMonth,
  monthStrings,
  getStartMonth,
} from "./utility";
import Select from "react-select";
import { EventModal } from "./components/EventModal";

export default function App() {
  const [selected, setSelected] = useState(0);
  const [selectedWeekEndIndex, setSelectedWeekEndIndex] = useState(7);
  const [selectedWeekStartIndex, setSelectedWeekStartIndex] = useState(0);
  const [monthRange, setMonthRange] = useState("");
  const [selectedMonth, setSlectedMonth] = useState({
    label: "",
    value: "",
    monthValue: 0,
  });

  const [isNexIconClickable, setNextIconClickable] = useState(true);
  const [view, setView] = useState({ label: "Week", value: 1 });
  const [clickedEvent, setClickedEvent] = useState({
    title: "",
    date: "",
    isAllDay: false,
  });
  const [modalClass,setModalClass]= useState('closed')


  const [events, setEvents] = useState([
    {
      title: "A test event",
      date: "2022-06-01T00:00:00.000Z",
      isAllDay: false,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
    },
    {
      title: "A test event",
      date: "2022-01-01T00:00:00.000Z",
      isAllDay: false,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
    },

    {
      title: "A test event",
      date: "2022-06-02T00:00:00.000Z",
      isAllDay: false,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
    },
    {
      title: "A test event",
      date: "2022-06-01T00:00:00.000Z",
      isAllDay: false,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
    },
    {
      title: "A test event",
      date: "2022-06-01T00:00:00.000Z",
      isAllDay: true,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
    },
  ]);

  const noAllDayEvents = events.filter(function (item) {
    return item.isAllDay === false;
  });

  const viewOptions = [
    { label: "Day", value: 0 },
    { label: "Week", value: 1 },
    { label: "Month", value: 2 },
  ];

  function handleViewChange(item) {
    setView({
      ...view,
      label: item.label,
      value: item.value,
      monthValue: item.monthValue,
    });
  }

  useEffect(function () {
    var m = new Date().getMonth();

    let option = monthSelectOptions.filter(function (item) {
      return item.monthValue === m;
    });

    setSlectedMonth({
      ...selectedMonth,
      label: option[0].label,
      value: option[0].value,
      monthValue: option[0].monthValue,
    });
  }, []);

  useEffect(function () {
    localStorage.setItem(
      "event",
      JSON.stringify({ title: "null", date: "null", isAllDay: null })
    );
  }, []);

  function handleMonthChange(item) {
    setSlectedMonth({
      ...selectedMonth,
      label: item.label,
      value: item.value,
      monthValue: item.monthValue,
    });
    setSelected(0);
  }

  function handleWeekIncrement() {
    // if (selected + 7 <= YearElements[selectedMonth.monthValue].length) {
    //   setSelected(selected + 7);
    // } else if (selected === 28) {
    //   let currMonth = selectedMonth.monthValue + 1;
    //   setSlectedMonth({
    //     ...selectedMonth,
    //     label: monthSelectOptions[currMonth].label,
    //     value: monthSelectOptions[currMonth].value,
    //     monthValue: monthSelectOptions[currMonth].monthValue,
    //   });

    if (selectedWeekEndIndex >= 7) {
      setSelectedWeekEndIndex(selectedWeekEndIndex + 7);
    }
  }

  useEffect(
    function () {
      setSelectedWeekStartIndex(selectedWeekEndIndex - 7);
    },
    [selectedWeekEndIndex]
  );

  useEffect(
    function () {
      let month1 = getStartMonth(selectedWeekStartIndex);
      let month2 = getStartMonth(selectedWeekEndIndex);

      if (month1 === month2) {
        setMonthRange(month1);
      } else {
        setMonthRange(month1 + "-" + month2);
      }
    },
    [selectedWeekEndIndex, selectedWeekStartIndex]
  );

  function handleWeekDecrement() {
    // if (selected !== 0) {
    //   setSelected(selected - 7);
    // } else if (selected === 0) {
    //   let currMonth = selectedMonth.monthValue - 1;
    //   setSlectedMonth({
    //     ...selectedMonth,
    //     label: monthSelectOptions[currMonth].label,
    //     value: monthSelectOptions[currMonth].value,
    //     monthValue: monthSelectOptions[currMonth].monthValue,
    //   });
    //   setSelected(28);
    // }

    if (selectedWeekEndIndex >= 7) {
      setSelectedWeekEndIndex(selectedWeekEndIndex - 7);
    }
  }

  function addNewEvent() {
    console.log("Add new event");
  }

  function handleEventChange(item) {
    setClickedItem({
      ...clickedItem,
      title: item.name,
      date: item.date,
      isAllDay: item.isAllDay,
    });
  }

  const elements = Year.map(function (item, index) {
    return (
      <span key={index.toString()} className="day">
        <span>{item} </span>
        {Array.from(Array(24).keys()).map(function (item, index) {
          return (
            <div key={index.toString()} className="hour">
              {" "}
              <span> {item} </span>{" "}
            </div>
          );
        })}
      </span>
    );
  });

  const hourElements = Array.from(Array(24).keys()).map(function (item, index) {
    return (
      <span key={index.toString()} className="hour-heading">
        {" "}
        {/* {item + 1} */}
        {get12HourFormat(item)}
      </span>
    );
    too;
  });

  const weekStrip = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
    function (item, index) {
      return (
        <span key={index.toString()} className="week-heading">
          {item}
        </span>
      );
    }
  );

  let selectedElements = YearElements[selectedMonth.monthValue].slice(
    selected,
    selected + 7
  );

  function handleClickOnEvent(evt, item) {
    setClickedEvent({
      ...clickedEvent,
      title: item.title,
      date: item.date,
      isAllDay: item.isAllDay,
      guestsInvited: item.guestsInvited,
      guestsAttending: item.guestsAttending,
    });
    setModalClass('opened')
  }

  const toolbarElements = (
    <div className="toolbar">
      {view.value === 2 ? (
        <Select
          className="select-month"
          value={selectedMonth}
          onChange={handleMonthChange}
          options={monthSelectOptions}
        />
      ) : (
        <div className="select-month month-range ">{monthRange}</div>
      )}

      <Select
        className="select-view"
        value={view}
        onChange={handleViewChange}
        options={viewOptions}
      />

      <div className="previous-icon">
        <PreviousIcon onClick={handleWeekDecrement} />
      </div>

      <div className="next-icon">
        <NextIcon onClick={handleWeekIncrement} />
      </div>

      <div className="add-new-event">
        <AddEventIcon onClick={addNewEvent} />
      </div>
    </div>
  );

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

  function getDay2(year, dayNumber, index) {
    let month = resolveMonth(index).num;
    let date = new Date(`${year}-${month}-${dayNumber + 1}`);
    let dateString = date.toDateString();
    let splitDate = dateString.split(" ");
    return splitDate[0];
  }

  function generateHourElements2(year, item, index) {
    let month = resolveMonth(index).num;
    return Array.from(Array(24).keys()).map(function (hour, index) {
      return (
        <div key={index.toString()} className="hour-item">
          {/* {hour + 1} */}

          <span className="events-container">
            {getEvents(year, month, item, hour)}
          </span>
        </div>
      );
    });
  }

  const YearElements3 = completeYear.map(function (item, index) {
    return (
      <span key={index.toString()} className="month-elements">
        <span className="day-heading">
          {getDay2(2022, item, index)} <br /> {item + 1}{" "}
          <span className="month-super-script">
            {" "}
            {monthStrings[resolveMonth(index)]}{" "}
          </span>
        </span>{" "}
        {generateHourElements2(2022, item, index)}
      </span>
    );
  });

  function getSevenElements() {
    return YearElements.slice(0, 6);
  }

  return (
    <RecoilRoot>
      {/* <div>
        <div className="container">
          <div className="tool-bar-container">{toolbarElements} </div>
          <div className="hour-strip-container"> {hourElements} </div>
          <div className="calendar-elements-container">{selectedElements} </div>
        </div>
        <EventModal />
      </div> */}

      <div>
        <div className="container">
          <div className="tool-bar-container">{toolbarElements} </div>
          <div className="hour-strip-container"> {hourElements} </div>
          <div className="calendar-elements-container">
            {/* {getSevenElements()}{" "} */}
            {YearElements3.slice(selectedWeekStartIndex, selectedWeekEndIndex)}
          </div>
        </div>
        <EventModal event={clickedEvent} displayModal={modalClass} />
      </div>
    </RecoilRoot>
  );
}
