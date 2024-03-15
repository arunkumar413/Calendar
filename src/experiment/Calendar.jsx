import React, { useEffect, useState } from "react";
import { completeYear } from "../experiment/util";
import { FebDays } from "./util";

export function CalendarExp() {
  const [selectedWeekEnd, setSelectedWeekEnd] = useState(7);
  const [selectedWeekStart, setSelectedWeekStart] = useState(0);

  function generateHeadingStrip() {
    return completeYear.map(function (item, index) {
      return (
        <div key={index.toString()} className="heading-item">
          {item + 1}
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

  useEffect(function () {
    console.log(FebDays);
    console.log(completeYear);
  });

  const headingStripElements = generateHeadingStrip();

  const selectedWeekStripElements = headingStripElements.slice(
    selectedWeekStart,
    selectedWeekEnd
  );

  function generateHourItems() {
    return Array.from(Array(24).keys()).map(function (item, index) {
      return (
        <span className="week-day-hour-item" key={index.toString()}>
          {item + 1}
        </span>
      );
    });
  }

  function generateWeekDayItems() {
    return completeYear.map(function (item, index) {
      return (
        <div key={index.toString()} className="heading-item">
          {/* {item + 1} */}
          {generateHourItems()}
        </div>
      );
    });
  }

  const weekDayElements = generateWeekDayItems();

  const selectedWeekDayElements = weekDayElements.slice(
    selectedWeekStart,
    selectedWeekEnd
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
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
