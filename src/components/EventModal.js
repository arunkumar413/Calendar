import react, { useState, useEffect } from "react";
import { getClickedItem } from "../utility";
import { ReactComponent as CloseIcon } from "../icons/close_FILL0_wght400_GRAD0_opsz48.svg";
import { ReactComponent as EventIcon } from "../icons/event_FILL0_wght400_GRAD-25_opsz24.svg";

export function EventModal(props) {
  console.log(new Date(props.event.date).toJSON());

  return (
    <div className={`event-modal ${props.displayModal} `}>
      <div className="event-modal-header">
        <h5 className="event-modal-header-heading"> Event Details </h5>
        <div className="event-modal-header-close-icon">
          <CloseIcon className="" />
        </div>
      </div>

      <div className="event-modal-content">
        <h4> {props.event.title} </h4>
        <p className="event-modal-date">
          <EventIcon />
          {new Date(props.event.date).toString()}{" "}
        </p>

        <span class="material-symbols-outlined">pin_drop</span>
      </div>
      <p> </p>
    </div>
  );
}
