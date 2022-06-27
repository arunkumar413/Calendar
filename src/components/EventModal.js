import react, { useState, useEffect } from "react";
import { getClickedItem } from "../utility";
import { ReactComponent as CloseIcon } from "../icons/close_FILL0_wght400_GRAD0_opsz48.svg";
import { ReactComponent as EventIcon } from "../icons/event_FILL0_wght400_GRAD-25_opsz24.svg";

export function EventModal(props) {
  const [showInvitedGuests, setShowInvitedGuests] = useState(false);

  function handleCloseModal() {
    props.onModalClose();
  }

  function handleInvitedGuests() {
    setShowInvitedGuests(showInvitedGuests === true ? false : true);
  }

  const invitedGuestsElement = props.event.guestsInvited.map(function (
    item,
    index
  ) {
    return <span key={index.toString()}>{item}, </span>;
  });

  return (
    <div className={`event-modal ${props.displayModal} `}>
      <div className="event-modal-header">
        <p className="event-modal-header-heading"> Event Details </p>

        <span className="material-symbols-outlined">delete</span>
        <span className="material-symbols-outlined">edit</span>

        <div>
          <span
            onClick={handleCloseModal}
            className="material-symbols-outlined event-modal-header-close-icon"
          >
            close
          </span>
        </div>
      </div>

      <div className="event-modal-content">
        <EventIcon />
        <h4> {props.event.title} </h4>
        <EventIcon />
        <p className="event-modal-date">
          {new Date(props.event.date).toString()}{" "}
        </p>
        <span className="material-symbols-outlined">pin_drop</span>
        <p> {props.event.location} </p>
        <span className="material-symbols-outlined">link</span>
        <a href={props.event.link}> {props.event.title} </a>
        <span className="material-symbols-outlined">attach_email</span>
        <p>
          {" "}
          Guest invited:{" "}
          <b
            onClick={handleInvitedGuests}
            className="event-modal-guests-invited"
          >
            {" "}
            {props.event.guestsInvited.length}{" "}
          </b>
          {showInvitedGuests && invitedGuestsElement}
        </p>
        <span className="material-symbols-outlined event-modal-confirmed">
          check
        </span>{" "}
        <p>
          {" "}
          Guest attending: <b> {props.event.guestsAttending.length} </b>
        </p>
        <span className="material-symbols-outlined">description</span>
        <p className="event-modal-description"> {props.event.description}</p>
      </div>
    </div>
  );
}
