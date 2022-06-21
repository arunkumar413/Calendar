import React from "react";
import "./style.css";
import {
  currentYear,
  janElements,
  monthIndexes,
  testElements,
  Year,
} from "./utility";

export default function App() {
  console.log(Year, currentYear);

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
        {item + 1}
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

  return (
    <div className="container">
      <div className="week-strip-container">{weekStrip} </div>
      <div className="hour-strip-container"> {hourElements} </div>
      <div className="calendar-elements-container">{janElements} </div>
    </div>
  );
}
