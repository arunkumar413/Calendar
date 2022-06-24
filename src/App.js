import React, { useEffect, useState } from "react";
import "./style.css";
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
} from "./utility";
import Select from "react-select";

export default function App() {
  const [selected, setSelected] = useState(0);
  const [selectedMonth, setSlectedMonth] = useState({
    label: "",
    value: "",
    monthValue: 0,
  });
  const [view, setView] = useState({ label: "Week", value: 1 });

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

  function handleMonthChange(item) {
    setSlectedMonth({
      ...selectedMonth,
      label: item.label,
      value: item.value,
      monthValue: item.monthValue,
    });
  }

  function handleWeekIncrement() {
    setSelected(selected + 7);
  }

  function handleWeekDecrement() {
    if (selected !== 0) setSelected(selected - 7);
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

  useEffect(function () {
    console.log(selectedMonth.monthValue);
  }, []);

  let selectedElements = YearElements[selectedMonth.monthValue].slice(
    selected,
    selected + 7
  );

  const toolbarElements = (
    <div className="toolbar">
      {/* <span className="selected-month"> {getSelectedMonth(selected)} </span> */}

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

      <span
        onClick={handleWeekDecrement}
        className="material-symbols-outlined previous-icon"
      >
        arrow_back_ios_new
      </span>

      <span
        onClick={handleWeekIncrement}
        className="material-symbols-outlined next-icon"
      >
        arrow_forward_ios
      </span>
    </div>
  );

  return (
    <div className="container">
      <div className="tool-bar-container">{toolbarElements} </div>
      <div className="hour-strip-container"> {hourElements} </div>
      <div className="calendar-elements-container">{selectedElements} </div>
    </div>
  );
}
