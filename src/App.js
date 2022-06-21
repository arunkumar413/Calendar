import React, { useState } from "react";
import "./style.css";
import {
  currentYear,
  janElements,
  monthIndexes,
  testElements,
  get12HourFormat,
  Year,
  currentMonth,
} from "./utility";

export default function App() {
  console.log(Year, currentYear);
  const [selected, setSelected] = useState(0);
  const [selectedMonth, setSlectedMonth] = useState("");

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
    );too
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

  let selectedElements = janElements.slice(selected, selected + 7);

  const toolbarElements = (
    <div>
      <span> {getSelectedMonth(selected)} </span>
      <span className="material-symbols-outlined previous-icon">
        arrow_back_ios_new
      </span>
      <span className="material-symbols-outlined next-icon">
        arrow_forward_ios
      </span>
    </div>
  );

  return (
    <div className="container">
      <div className="tool-bar">{toolbarElements} </div>
      <div className="hour-strip-container"> {hourElements} </div>
      <div className="calendar-elements-container">{selectedElements} </div>
    </div>
  );
}
