import React, { useEffect, useState } from "react";
import {
  buildHourElementsAndEvents,
  completeYear,
  getDateInfoFromDayNumber,
  getFullDayEvents,
  getSelectedMonthWeekStart,
  getTodayDateIndex,
  isGivenDateToday,
} from "../experiment/util";
import { FebDays } from "./util";
import { LeftIcon } from "../Icons/LeftIcon";
import { RightIcon } from "../Icons/RightIcon";
import { isToday } from "date-fns";
import { TEST_EVENTS } from "./testEvents";

export function CalendarExp() {
  const [selectedWeekEnd, setSelectedWeekEnd] = useState(7);
  const [selectedWeekStart, setSelectedWeekStart] = useState(0);
  const [events, setEvents] = useState(TEST_EVENTS);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  let wholeYearDataStructure = completeYear.map(function (item, index) {
    let isoDate = getDateInfoFromDayNumber(index + 1).dateInISOFormat;
    return {
      index: index,
      dateItem: item + 1,
      dateObj: getDateInfoFromDayNumber(index + 1),
      fullDayEvents: getFullDayEvents(events, isoDate),
      hours: buildHourElementsAndEvents(isoDate, events),
    };
  });

  function generateFullDayEvents(item) {
    return item.fullDayEvents.map(function (item, index) {
      return (
        <span className="cal-full-day-event" key={index.toString()}>
          {item.title}
        </span>
      );
    });
  }

  function generateHeadingStrip() {
    return wholeYearDataStructure.map(function (item, index) {
      return (
        <div key={index.toString()} className="heading-item">
          {/* {item + 1} */}
          <span
            className={isToday(item.dateObj.dateInISOFormat) ? "today" : null}
          >
            {" "}
            {item.dateObj.dayStr}
          </span>
          <span
            className={isToday(item.dateObj.dateInISOFormat) ? "today" : null}
          >
            {" "}
            <strong> {item.dateItem} </strong>
            {item.dateObj.monthStr}
          </span>
          {generateFullDayEvents(item)}
        </div>
      );
    });
  }

  function generateHourStrip() {
    return Array.from(Array(24).keys()).map(function (item, index) {
      return (
        <span className="hour-strip-element" key={index.toString()}>
          {item + 1} hrs
        </span>
      );
    });
  }

  const headingStripElements = generateHeadingStrip();

  const selectedWeekStripElements = headingStripElements.slice(
    selectedWeekStart,
    selectedWeekEnd
  );

  function generateHourEvents(hourEvents) {
    return hourEvents.map(function (item, index) {
      return (
        <span className="cal-hour-event" key={index.toString()}>
          {item.title}
        </span>
      );
    });
  }

  function generateHourItems(hours) {
    return hours.map(function (item, index) {
      return (
        <span className="week-day-hour-item" key={index.toString()}>
          {/* {item + 1} */}

          {generateHourEvents(item.hourEvents)}
        </span>
      );
    });
  }

  function generateWeekDayItems() {
    return wholeYearDataStructure.map(function (item, index) {
      return (
        <div key={index.toString()} className="heading-item">
          {/* {item + 1} */}
          {generateHourItems(item.hours)}
        </div>
      );
    });
  }

  const weekDayElements = generateWeekDayItems();

  const selectedWeekDayElements = weekDayElements.slice(
    selectedWeekStart,
    selectedWeekEnd
  );

  console.log(wholeYearDataStructure);

  function handleNextButtonClick() {
    setSelectedWeekEnd(selectedWeekEnd + 7);
    setSelectedWeekStart(selectedWeekStart + 7);
  }

  function handlePrevButtonClick() {
    if (selectedWeekEnd !== 7 && selectedWeekStart !== 0) {
      setSelectedWeekEnd(selectedWeekEnd - 7);
      setSelectedWeekStart(selectedWeekStart - 7);
    }
  }

  useEffect(
    function () {
      let weekStartIndex = getTodayDateIndex(wholeYearDataStructure);
      setSelectedWeekStart(weekStartIndex);
      setSelectedWeekEnd(weekStartIndex + 7);
    },
    [wholeYearDataStructure.length]
  );

  function handleMonthSelection(evt) {
    let selMonth = parseInt(evt.target.value);
    setSelectedMonth(selMonth);

    //get week start index of the selected month

    let selMonthWeekStartIndex = getSelectedMonthWeekStart(
      selectedYear,
      selMonth,
      wholeYearDataStructure
    );

    setSelectedWeekStart(selMonthWeekStartIndex);
    setSelectedWeekEnd(selMonthWeekStartIndex + 7);
  }

  useEffect(
    function () {
      let selWeekMonth1 =
        wholeYearDataStructure[selectedWeekStart].dateObj.month - 1;
      let slWeekMonth2 =
        wholeYearDataStructure[selectedWeekEnd].dateObj.month - 1;
      setSelectedMonth(selWeekMonth1);
    },
    [selectedWeekStart, selectedWeekEnd]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="cal-toolbar">
        <select value={selectedMonth} onChange={handleMonthSelection}>
          <option value={0}>Janurary</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>
        <div className="cal-nav-buttons">
          <div className="cal-icon-container" onClick={handlePrevButtonClick}>
            <LeftIcon />
          </div>
          <div className="cal-icon-container" onClick={handleNextButtonClick}>
            <RightIcon />{" "}
          </div>
        </div>
      </div>
      <div className="calendar-layout">
        <div className="heading-strip-container">
          {selectedWeekStripElements}
        </div>
        <div className="hour-strip">{generateHourStrip()}</div>
        <div className="week-day-item">{selectedWeekDayElements}</div>
      </div>
    </div>
  );
}
