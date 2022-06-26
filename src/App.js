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
} from "./utility";
import Select from "react-select";
import { EventModal } from "./components/EventModal";

export default function App() {
  const [selected, setSelected] = useState(0);
  const [selectedMonth, setSlectedMonth] = useState({
    label: "",
    value: "",
    monthValue: 0,
  });

  const [isNexIconClickable, setNextIconClickable] = useState(true);
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
    if (selected + 7 <= YearElements[selectedMonth.monthValue].length) {
      setSelected(selected + 7);
    } else if (selected === 28) {
      let currMonth = selectedMonth.monthValue + 1;
      setSlectedMonth({
        ...selectedMonth,
        label: monthSelectOptions[currMonth].label,
        value: monthSelectOptions[currMonth].value,
        monthValue: monthSelectOptions[currMonth].monthValue,
      });
      setSelected(0);
    }
  }

  function handleWeekDecrement() {
    if (selected !== 0) {
      setSelected(selected - 7);
    } else if (selected === 0) {
      let currMonth = selectedMonth.monthValue - 1;
      setSlectedMonth({
        ...selectedMonth,
        label: monthSelectOptions[currMonth].label,
        value: monthSelectOptions[currMonth].value,
        monthValue: monthSelectOptions[currMonth].monthValue,
      });
      setSelected(28);
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

      {/* <span
        onClick={handleWeekDecrement}
        className="material-symbols-outlined previous-icon"
      >
        arrow_back_ios_new
      </span> */}

      <div className="previous-icon">
        <PreviousIcon onClick={handleWeekDecrement} />
      </div>
      {/* <span
        onClick={handleWeekIncrement}
        className="material-symbols-outlined next-icon"
      >
        arrow_forward_ios
      </span> */}
      <div className="next-icon">
        <NextIcon onClick={handleWeekIncrement} />
      </div>

      <div className="add-new-event">
        <AddEventIcon onClick={addNewEvent} />
      </div>
    </div>
  );

  return (
    <RecoilRoot>
      <div>
        <div className="container">
          <div className="tool-bar-container">{toolbarElements} </div>
          <div className="hour-strip-container"> {hourElements} </div>
          <div className="calendar-elements-container">{selectedElements} </div>
        </div>
        <EventModal />
      </div>
    </RecoilRoot>
  );
}
