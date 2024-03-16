import React, { useEffect, useState } from "react";
import {
  buildHourElementsAndEvents,
  completeYear,
  getDateInfoFromDayNumber,
  getFullDayEvents,
} from "../experiment/util";
import { FebDays } from "./util";

export function CalendarExp() {
  const [selectedWeekEnd, setSelectedWeekEnd] = useState(7);
  const [selectedWeekStart, setSelectedWeekStart] = useState(0);
  const [events, setEvents] = useState([
    {
      title: "Test event 1",
      startISOString: "2024-01-01T08:49:39.382Z",
      isFullDayEvent: true,
    },
    {
      title: "Test event 2",
      startISOString: "2024-01-01T08:49:39.382Z",
      isFullDayEvent: false,
    },
    {
      title: "Test event 3",
      startISOString: "2024-01-01T08:49:39.382Z",
      isFullDayEvent: true,
    },
    {
      title: "Test event 4",
      startISOString: "2024-01-01T08:49:39.382Z",
      isFullDayEvent: false,
    },
  ]);

  let test = completeYear.map(function (item, index) {
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
    return test.map(function (item, index) {
      return (
        <div key={index.toString()} className="heading-item">
          {/* {item + 1} */}
          <span> {item.dateObj.dayStr}</span> <br />
          {item.dateItem},{item.dateObj.monthStr}
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
      debugger;
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
    return test.map(function (item, index) {
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

  console.log(test);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div> Toolbar </div>
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
