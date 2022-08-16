import React from "react";

export function MoreModal(props) {
  function handleClose() {
    props.setInfo(function (prevState) {
      return { ...prevState, isDisplayOn: false };
    });
  }

  function handleShowEventModal() {}

  const eventElements = props.info.events.map(function (item, index) {
    return (
      <span
        onClick={handleShowEventModal}
        key={index.toString()}
        className="full-day-event more-event"
      >
        {item.title}
      </span>
    );
  });

  return (
    <div
      className="more-modal"
      style={{
        display: props.info.isDisplayOn ? "block" : "none",
        position: "absolute",
        left: props.info.left - 70,
        top: props.info.top + 20,
      }}
    >
      <div className="more-modal-header">
        <span></span>
        <span onClick={handleClose} class="material-symbols-outlined">
          expand_less
        </span>{" "}
        <span></span>
      </div>

      <div> {eventElements}</div>
    </div>
  );
}
