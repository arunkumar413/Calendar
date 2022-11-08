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
  getMonthRange,
} from "./utility";
import Select from "react-select";
import { EventModal } from "./components/EventModal";
import { EditEventModal } from "./components/EditEventModal";
import { AddNewEvent } from "./components/AddNewEvent";
import { MoreModal } from "./components/MoreModal";

export default function App() {
  const [selected, setSelected] = useState(0);
  const [selectedWeekEndIndex, setSelectedWeekEndIndex] = useState(7);
  const [selectedWeekStartIndex, setSelectedWeekStartIndex] = useState(0);
  const [monthRange, setMonthRange] = useState("");
  const [selectedMonth, setSelectedMonth] = useState({
    label: "",
    value: "",
    monthValue: 0,
    start: 0,
    end: 30,
  });

  const [isNexIconClickable, setNextIconClickable] = useState(true);
  const [view, setView] = useState({ label: "Week", value: 1 });
  const [clickedEvent, setClickedEvent] = useState({
    title: "",
    date: new Date().toISOString(),
    isAllDay: false,
    guestsAttending: [],
    link: "",
    description: "",
    guestsInvited: [],
    location: "",
  });
  const [modalClass, setModalClass] = useState("closed");
  const [editModalClass, setEditModalClass] = useState("closed");
  const [addModalClass, setAddModalClass] = useState("closed");
  const [todayIndex, setTodayIndex] = useState(100);
  const [yearText, setYearText] = useState(new Date().getFullYear().toString());
  const [weekIndexes, setWeekIndexes] = useState([
    0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105, 112, 119,
    126, 133, 140, 147, 154, 161, 168, 175, 182, 189, 196, 203, 210, 217, 224,
    231, 238, 245, 252, 259, 266, 273, 280, 287, 294, 301, 308, 315, 322, 329,
    336, 343, 350, 357, 364,
  ]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [moreModalInfo, setMoreModalInfo] = useState({
    isDisplayOn: false,
    left: 0,
    top: 0,
    events: [],
  });

  const [events, setEvents] = useState([
    {
      title: "full day event 1",
      date: "2022-08-17T00:00:00.000Z",
      isAllDay: true,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
      location: "New York",
    },
    {
      title: "full day event 2",
      date: "2022-08-17T00:00:00.000Z",
      isAllDay: true,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
      location: "New York",
    },
    {
      title: "A test event",
      date: "2022-08-17T00:00:00.000Z",
      isAllDay: false,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
      location: "New York",
    },
    {
      title: "full day event 3",
      date: "2022-08-17T00:00:00.000Z",
      isAllDay: true,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
      location: "New York",
    },
    {
      title: "full day event 4",
      date: "2022-08-17T00:00:00.000Z",
      isAllDay: true,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
      location: "New York",
    },
    {
      title: "A test event",
      date: "2022-01-01T00:00:00.000Z",
      isAllDay: false,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
      location: "New York",
    },

    {
      title: "A test event",
      date: "2022-06-02T00:00:00.000Z",
      isAllDay: false,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
      location: "New York",
    },
    {
      title: "A test event",
      date: "2022-06-01T00:00:00.000Z",
      isAllDay: false,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
      location: "New York",
    },
    {
      title: "full day event 4",
      date: "2022-06-01T00:00:00.000Z",
      isAllDay: true,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
      location: "New York",
    },
  ]);

  const noAllDayEvents = events.filter(function (item) {
    return item.isAllDay === false;
  });

  const fullDayEvents = events.filter(function (item) {
    return item.isAllDay === true;
  });

  const viewOptions = [
    { label: "Week", value: 1 },
    { label: "Month", value: 2 },
  ];

  function handleViewChange(item) {
    setView({
      ...view,
      label: item.label,
      value: item.value,
    });
  }

  //all efffecs here

  useEffect(function () {
    var m = new Date().getMonth(); // get current month

    let option = monthSelectOptions.filter(function (item) {
      return item.monthValue === m;
    }); //get month details as option

    setSelectedMonth({
      ...selectedMonth,
      label: option[0].label,
      value: option[0].value,
      monthValue: option[0].monthValue,
      start: option.start,
      end: option.end,
    }); // set selected month using options

    let date = new Date();
    let dayNumber = Math.floor(
      (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    ); // get today's day number

    var possibleRange = [];

    var dayIndex = dayNumber - 1;

    // for (let i = option[0].start; i <= option[0].end; i += 7) {
    //   // for (let i = 0; i <= 365; i += 7) {
    //   if (i <= dayIndex) {
    //     possibleRange.push(i);
    //   }
    // }
    possibleRange[0] = dayNumber + (dayNumber % 7);

    setSelectedWeekEndIndex(possibleRange[0]);
  }, []); //all effects end here

  function handleMonthChange(item) {
    setSelectedMonth({
      ...selectedMonth,
      label: item.label,
      value: item.value,
      monthValue: item.monthValue,
      start: item.start,
      end: item.end,
    });
    setSelected(0);

    setSelectedWeekEndIndex(item.start + 7);
  }

  function handleWeekIncrement() {
    if (
      view.label === "Week" &&
      selectedWeekEndIndex >= 7 &&
      selectedWeekEndIndex < 362
    ) {
      setSelectedWeekEndIndex(selectedWeekEndIndex + 7);
    } else if (view.label === "Week" && selectedWeekEndIndex === 362) {
      setSelectedWeekEndIndex(selectedWeekEndIndex + 3);
    } else if (
      view.label === "Week" &&
      selectedWeekEndIndex > 358 &&
      selectedWeekEndIndex < 365
    ) {
      setSelectedWeekEndIndex(365);
    } else if (view.label === "Month" && selectedMonth.value !== "December") {
      let nextMonth = monthSelectOptions.filter(function (item) {
        return item.monthValue === selectedMonth.monthValue + 1;
      });
      setSelectedMonth({
        ...selectedMonth,
        label: nextMonth[0].label,
        value: nextMonth[0].value,
        monthValue: nextMonth[0].monthValue,
        start: nextMonth[0].start,
        end: nextMonth[0].end,
      });
    } else if (view.label === "Week" && selectedWeekEndIndex === 365) {
      let yearInt = parseInt(yearText);
      let incYear = yearInt + 1;
      setYearText(incYear.toString());

      setSelectedMonth({
        ...selectedMonth,
        label: monthSelectOptions[0].label,
        value: monthSelectOptions[0].value,
        monthValue: monthSelectOptions[0].monthValue,
        start: monthSelectOptions[0].start,
        end: monthSelectOptions[0].end,
      });

      setSelectedWeekEndIndex(7);
      // setCurrentYear(currentYear + 1);
    } else if (view.label === "Month" && selectedMonth.value === "December") {
      let yearInt = parseInt(yearText);
      let incYear = yearInt + 1;
      setYearText(incYear.toString());
      // setCurrentYear(currentYear + 1);
      setSelectedMonth({
        ...selectedMonth,
        label: "January",
        value: "January",
        monthValue: 0,
        start: 0,
        end: 30,
      });
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
      let month1 = getMonthRange(selectedWeekStartIndex); // month start range
      let month2 = getMonthRange(selectedWeekEndIndex - 1); // month end range

      let month1Object = monthSelectOptions.filter(function (item) {
        return item.label === month1;
      });

      let month2Object = monthSelectOptions.filter(function (item) {
        return item.label === month2;
      });
      if (month1Object[0].label === month2Object[0].label) {
        setMonthRange(month1);
        setSelectedMonth({
          ...selectedMonth,
          label: month1Object[0].label,
          value: month1Object[0].value,
          monthValue: month1Object[0].monthValue,
          start: month1Object[0].start,
          end: month1Object[0].end,
        });
      } else {
        setMonthRange(month1 + "-" + month2);
        setSelectedMonth({
          label: month1Object[0].label + "-" + month2Object[0].label,
          value: month1Object[0].value + "-" + month2Object[0].value,
          monthValue: month1Object[0].monthValue,
          start: month1Object[0].start,
          end: month1Object[0].end,
        });
      }
    },
    [selectedWeekEndIndex, selectedWeekStartIndex]
  );

  function handleWeekDecrement() {
    if (view.label === "Week" && selectedWeekStartIndex > 7) {
      setSelectedWeekEndIndex(selectedWeekEndIndex - 7);
    } else if (view.label === "Month" && selectedMonth.value != "January") {
      let prevMonth = monthSelectOptions.filter(function (item) {
        return item.monthValue === selectedMonth.monthValue - 1;
      });
      setSelectedMonth({
        ...selectedMonth,
        label: prevMonth[0].label,
        value: prevMonth[0].value,
        monthValue: prevMonth[0].monthValue,
        start: prevMonth[0].start,
        end: prevMonth[0].end,
      });
    } else if (view.label === "Month" && selectedMonth.value === "January") {
      let yearInt = parseInt(yearText);
      let incYear = yearInt - 1;
      setYearText(incYear.toString());

      // setCurrentYear(currentYear - 1);
      setSelectedMonth({
        ...selectedMonth,
        label: "December",
        value: "December",
        monthValue: 11,
        start: 334,
        end: 364,
      });
    } else if (view.label === "Week" && selectedWeekStartIndex < 7) {
      let yearInt = parseInt(yearText);
      let incYear = yearInt - 1;
      setYearText(incYear.toString());

      // setCurrentYear(currentYear - 1);
      setSelectedMonth({
        ...selectedMonth,
        label: "December",
        value: "December",
        monthValue: 11,
        start: 334,
        end: 364,
      });
      setSelectedWeekEndIndex(365);
    }
  }

  function addNewEvent() {
    setAddModalClass(addModalClass === "closed" ? "opened" : "closed");
    setClickedEvent({
      title: "",
      date: new Date().toISOString(),
      isAllDay: false,
      guestsAttending: [],
      link: "",
      description: "",
      guestsInvited: [],
      location: "",
    });
  }

  function handleEventChange(item) {
    setClickedItem({
      ...clickedItem,
      title: item.name,
      date: item.date,
      isAllDay: item.isAllDay,
    });
  }

  function handleModalClose() {
    setModalClass("closed");
  }

  function appendNewEvent() {
    setEvents(function (prevState) {
      return { ...prevState, newEvent };
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

  // let selectedElements = YearElements[selectedMonth.monthValue].slice(
  //   selected,
  //   selected + 7
  // );

  function handleClickOnEvent(evt, item) {
    setClickedEvent({
      ...clickedEvent,
      title: item.title,
      date: item.date,
      link: item.link,
      isAllDay: item.isAllDay,
      guestsInvited: item.guestsInvited,
      guestsAttending: item.guestsAttending,
      location: item.location,
      description: item.description,
    });
    // setModalClass("opened");
    setAddModalClass("opened");
  }

  function handleYearChange(evt) {
    setYearText(evt.target.value);
  }

  useEffect(
    function () {
      if (yearText.length === 4) {
        setCurrentYear(parseInt(yearText));
      }
    },
    [yearText]
  );

  function handleYearBlur(evt) {
    setYearText(evt.target.value);
  }

  const toolbarElements = (
    <div className="toolbar">
      <label className="input-year-label" htmlFor="year-input">
        {" "}
        Current Year
      </label>
      <div className="current-year">
        <input
          name="year-input"
          id="year-input"
          className="current-year-input"
          onBlur={handleYearBlur}
          onChange={handleYearChange}
          required
          type="text"
          inputMode="numeric"
          value={yearText}
          maxLength={4}
        />
      </div>
      <Select
        className="select-month"
        value={selectedMonth}
        onChange={handleMonthChange}
        options={monthSelectOptions}
      />

      <Select
        className="select-view"
        value={view}
        onChange={handleViewChange}
        options={viewOptions}
      />

      {/* <div className="previous-icon">
        <PreviousIcon
          className="decrement-icon"
          onClick={handleWeekDecrement}
        />
      </div> */}

      <div className="prev-next-icons">
        <PreviousIcon
          className="decrement-icon"
          onClick={handleWeekDecrement}
        />
        <NextIcon className="increment-icon" onClick={handleWeekIncrement} />
      </div>

      <div className="add-new-event">
        <AddEventIcon className="add-new-event-icon" onClick={addNewEvent} />
      </div>
    </div>
  );

  function handleFullDayEventClick(evt, item) {
    setClickedEvent(item);
    setAddModalClass("opened");
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

  function getDay2(year, dayNumber, index) {
    let month = resolveMonth(index).num;
    let date = new Date(`${year}-${month}-${dayNumber + 1}`);
    let today = new Date();

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

  function addDateClass(year, dayNum, index) {
    let month = resolveMonth(index).num;
    let date = new Date(`${year}-${month}-${dayNum + 1}`);
    let today = new Date();
    if (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    ) {
      return date.toLocaleDateString() + " today";
    } else {
      return date.toLocaleDateString();
    }
  }

  function handleClickMore(evt, currEvents) {
    setMoreModalInfo(function (prevState) {
      return {
        ...prevState,
        isDisplayOn: true,
        left: evt.target.getBoundingClientRect().left,
        top: evt.target.getBoundingClientRect().top,
        events: currEvents.slice(3),
      };
    });
  }

  function getFullDayEvents(year, dayNum, index) {
    let month = resolveMonth(index).num;

    let date = new Date(`${year}-${month}-${dayNum + 1}`);
    var currEvents = [];

    for (let i = 0; i < fullDayEvents.length; i++) {
      let d = new Date(fullDayEvents[i].date);
      if (
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
      ) {
        currEvents.push(fullDayEvents[i]);
      }
    }

    if (currEvents.length && currEvents.length <= 3) {
      return currEvents.map(function (item, index) {
        return (
          <span key={index.toString()}>
            {" "}
            <span
              onClick={(evt) => handleFullDayEventClick(evt, item)}
              className="full-day-event"
            >
              {" "}
              {item.title}{" "}
            </span>{" "}
            <br />{" "}
          </span>
        );
      });
    } else if (currEvents.length && currEvents.length > 3) {
      let slicedEvents = currEvents.slice(0, 3);
      let eventElements = slicedEvents.map(function (item, index) {
        return (
          <span key={index.toString()}>
            {" "}
            <span
              onClick={(evt) => handleFullDayEventClick(evt, item)}
              className="full-day-event"
            >
              {" "}
              {item.title}{" "}
            </span>{" "}
            <br />{" "}
          </span>
        );
      });
      eventElements.push(
        <span>
          {" "}
          <span
            onClick={(evt) => handleClickMore(evt, currEvents)}
            className="more-events"
          >
            {" "}
            +{currEvents.length - 3}{" "}
          </span>{" "}
          <br />{" "}
        </span>
      );
      return eventElements;
    }
  }

  const YearElements3 = completeYear.map(function (item, index) {
    return (
      <span key={index.toString()} className="month-elements">
        <span
          id={`${addDateClass(currentYear, item, index)}`}
          className={`day-heading ${addDateClass(currentYear, item, index)}`}
        >
          {getDay2(currentYear, item, index)} <br /> {item + 1} <br />
          {getFullDayEvents(currentYear, item, index)}
          <span className="month-super-script">
            {" "}
            {monthStrings[resolveMonth(index)]}{" "}
          </span>
        </span>{" "}
        {generateHourElements2(currentYear, item, index)}
      </span>
    );
  });

  const monthElements = completeYear.map(function (item, index) {
    return (
      <span key={index.toString()} className="month-item">
        <span
          className={`month-view-day-heading ${addDateClass(
            currentYear,
            item,
            index
          )}`}
        >
          {getDay2(currentYear, item, index)} <br />{" "}
          <span
            style={{ fontSize: "2.2rem" }}
            className={addDateClass(currentYear, item, index)}
          >
            {" "}
            {item + 1}{" "}
          </span>{" "}
          <br />
          {getFullDayEvents(currentYear, item, index)}
        </span>{" "}
        {/* {getEvents(2022, month, item, hour)} */}
      </span>
    );
  });

  function getSevenElements() {
    return YearElements.slice(0, 6);
  }

  function handleOpenEditModal() {
    setEditModalClass("opened");
  }

  function handleCloseEditModal() {
    setEditModalClass("closed");
  }

  function handleAddNewModal() {
    setAddModalClass("opened");
  }

  function handleCloseNewEventModal() {
    setAddModalClass("closed");
  }

  function displayElements() {
    if (view.label === "Month") {
      return (
        <div className="calendar-months-container">
          {monthElements.slice(selectedMonth.start, selectedMonth.end + 1)}
        </div>
      );
    } else if (view.label === "Week") {
      return (
        <div className="calendar-elements-container">
          {YearElements3.slice(selectedWeekStartIndex, selectedWeekEndIndex)}
        </div>
      );
    }
  }

  return (
    <RecoilRoot>
      <div>
        <div
          className={view.label === "Week" ? "container" : "month-container"}
        >
          <div className="tool-bar-container">{toolbarElements} </div>
          {view.label === "Week" && (
            <div className="hour-strip-container"> {hourElements} </div>
          )}
          {/* <div className="calendar-elements-container"> */}
          {/* {view.label === "Week"
              ? YearElements3.slice(
                  selectedWeekStartIndex,
                  selectedWeekEndIndex
                )
              : monthElements.slice(selectedMonth.start, selectedMonth.end)} */}
          {displayElements()}
          {/* </div> */}
        </div>
        <EventModal
          event={clickedEvent}
          displayModal={modalClass}
          onModalClose={handleModalClose}
          onEditModalOpen={handleOpenEditModal}
        />
        <EditEventModal
          value={editModalClass}
          displayEditModal={editModalClass}
          onOpenEditModal={handleOpenEditModal}
          onCloseEditModal={handleCloseEditModal}
          event={clickedEvent}
        />
        <AddNewEvent
          setEvents={setEvents}
          events={events}
          value={addModalClass}
          displayEditModal={addModalClass}
          onOpenEditModal={handleAddNewModal}
          onCloseEditModal={handleCloseNewEventModal}
          event={clickedEvent}
        />
        <MoreModal
          setClickedEvent={setClickedEvent}
          setEvents={setEvents}
          events={events}
          value={addModalClass}
          displayEditModal={addModalClass}
          onOpenEditModal={handleAddNewModal}
          onCloseEditModal={handleCloseNewEventModal}
          event={clickedEvent}
          setInfo={setMoreModalInfo}
          info={moreModalInfo}
        />
      </div>
    </RecoilRoot>
  );
}
