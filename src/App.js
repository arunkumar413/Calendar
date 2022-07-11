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
import { EditEventModal } from "./components/EditEventModal";
import { AddNewEvent } from "./components/AddNewEvent";

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
  const [weekIndexes, setWeekIndexes] = useState([
    0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105, 112, 119,
    126, 133, 140, 147, 154, 161, 168, 175, 182, 189, 196, 203, 210, 217, 224,
    231, 238, 245, 252, 259, 266, 273, 280, 287, 294, 301, 308, 315, 322, 329,
    336, 343, 350, 357, 364,
  ]);

  const [events, setEvents] = useState([
    {
      title: "full day event 1",
      date: "2022-07-11T00:00:00.000Z",
      isAllDay: true,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
      location: "New York",
    },
    {
      title: "full day event 2",
      date: "2022-06-01T00:00:00.000Z",
      isAllDay: true,
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
      title: "full day event 3",
      date: "2022-07-10T00:00:00.000Z",
      isAllDay: true,
      guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
      link: "http://google.com",
      description: "An event to remember",
      guestsInvited: ["arunkumar413@gmail.com", "test@gmail.com"],
      location: "New York",
    },
    {
      title: "full day event 4",
      date: "2022-07-10T00:00:00.000Z",
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

  //all efffecs here

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
      start: option.start,
      end: option.end,
    });

    let date = new Date();
    let dayNumber = Math.floor(
      (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );

    let ele = [];

    for (let i = 0; i < weekIndexes.length; i++) {
      if (weekIndexes[i] >= dayNumber - 1) {
        ele.push(weekIndexes[i]);
      }
    }
    let item = ele[0];
    setSelectedWeekEndIndex(item);
  }, []); //all effects end here

  function handleMonthChange(item) {
    setSlectedMonth({
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
        setSlectedMonth({
          label: month1,
          value: month1,
          monthValue: 0,
        });
      } else {
        setMonthRange(month1 + "-" + month2);
        setSlectedMonth({
          label: month1 + "-" + month2,
          value: month1 + "-" + month2,
          monthValue: 0,
        });
      }
    },
    [selectedWeekEndIndex, selectedWeekStartIndex]
  );

  function handleWeekDecrement() {
    if (selectedWeekEndIndex > 7) {
      setSelectedWeekEndIndex(selectedWeekEndIndex - 7);
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

  const toolbarElements = (
    <div className="toolbar">
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

      <div className="previous-icon">
        <PreviousIcon
          className="decrement-icon"
          onClick={handleWeekDecrement}
        />
      </div>

      <div className="next-icon">
        <NextIcon className="increment-icon" onClick={handleWeekIncrement} />
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
      return date.toISOString() + " today";
    } else {
      return date.toISOString();
    }
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

    if (currEvents.length) {
      return currEvents.map(function (item, index) {
        return (
          <span>
            {" "}
            <span className="full-day-event"> {item.title} </span> <br />{" "}
          </span>
        );
      });
    }
  }

  const YearElements3 = completeYear.map(function (item, index) {
    return (
      <span key={index.toString()} className="month-elements">
        <span className={`day-heading ${addDateClass(2022, item, index)}`}>
          {getDay2(2022, item, index)} <br /> {item + 1} <br />
          {getFullDayEvents(2022, item, index)}
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
      </div>
    </RecoilRoot>
  );
}
