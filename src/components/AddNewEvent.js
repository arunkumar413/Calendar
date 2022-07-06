import react, { useState, useEffect } from "react";
import "animate.css";

export function AddNewEvent(props) {
  const [event, setEvent] = useState({
    title: "An event to remember",
    date: new Date().toISOString(),
    description: "description of the event",
    location: "New York",
    link: "http://test.com",
    guestsInvited: ["arunkumar413@gmail.com"],
    guestsAttending: ["arunkumar413@gmail.com", "test@gmail.com"],
  });
  const [isEditModeOn, setEditMode] = useState(true);
  const [guestInput, setGuestInput] = useState("");

  const [dateLocal, setDateLocal] = useState("");

  useEffect(
    function () {
      let formatter = new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      let parts = formatter.formatToParts(new Date(event.date));
      let year = parts.filter(function (item) {
        if (item.type === "year") {
          return item.value;
        }
      });
      let month = parts.filter(function (item) {
        if (item.type === "month") {
          return item.value;
        }
      });

      let date = parts.filter(function (item) {
        if (item.type === "day") {
          return item.value;
        }
      });

      let hour = parts.filter(function (item) {
        if (item.type === "hour") {
          return item.value;
        }
      });

      let minute = parts.filter(function (item) {
        if (item.type === "minute") {
          return item.value;
        }
      });

      setDateLocal(
        `${year[0].value}-${month[0].value}-${date[0].value}T${hour[0].value}:${minute[0].value}`
      );
    },
    [props, event]
  );

  useEffect(function () {
    setEvent(props.event);
  }, []);

  function toggleEditMode() {
    setEditMode(isEditModeOn ? false : true);
  }

  function handleFormInput(evt) {
    if (evt.target.name === "date") {
      setEvent(function (prevState) {
        return {
          ...prevState,
          [evt.target.name]: new Date(evt.target.value).toISOString(),
        };
      });
    } else {
      setEvent(function (prevState) {
        return { ...prevState, [evt.target.name]: evt.target.value };
      });
    }
  }
  function handleGuestChange(evt) {
    setGuestInput(evt.target.value);
  }

  function addNewGuest() {
    setEvent(function (prevState) {
      return {
        ...prevState,
        guestsInvited: [...prevState.guestsInvited, guestInput],
      };
    });
    setGuestInput("");
  }

  function handleKeyDown(evt) {
    if (evt.key === "Enter") {
      setEvent(function (prevState) {
        return {
          ...prevState,
          guestsInvited: [...prevState.guestsInvited, guestInput],
        };
      });
      setGuestInput("");
    }
  }

  const invitedGuestItems = event.guestsInvited.map(function (item, index) {
    return (
      <span className="guest-item" key={index.toString()}>
        <span>{item}</span>
        <span
          onClick={(evt) => handleRemoveGuest(evt, item)}
          className="material-symbols-outlined close-icon"
        >
          close
        </span>
      </span>
    );
  });

  function handleRemoveGuest(evt, item) {
    setEvent(function (prevState) {
      return {
        ...prevState,
        guestsInvited: prevState.guestsInvited.filter(function (
          prevItem,
          index
        ) {
          return item !== prevItem;
        }),
      };
    });
  }

  function handleSaveForm() {
    if (event.title !== "" && event.location !== "") {
      props.setEvents(function (prevState) {
        debugger;
        return [...prevState, event];
      });
    }
  }

  const EditModeContent = (
    <div className="content-items">
      <div className="content-item">
        <span className="material-symbols-outlined icon">title</span>{" "}
        <input
          value={event.title}
          placeholder="Name of the event"
          name="title"
          onChange={handleFormInput}
          type="text"
        />{" "}
      </div>
      <div className="content-item">
        <span className="material-symbols-outlined icon">event</span>{" "}
        <input
          value={dateLocal}
          name="date"
          onChange={handleFormInput}
          className="edit-date"
          type="datetime-local"
        />
        <span className="form-input date-human-readable">
          {new Date(event.date).toLocaleString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
          })}{" "}
        </span>
      </div>
      <div className="content-item">
        <span className="material-symbols-outlined icon">pin_drop</span>{" "}
        <input
          placeholder="Location of the event"
          value={event.location}
          onChange={handleFormInput}
          name="location"
          type="text"
        />
      </div>
      <div className="content-item">
        <span className="material-symbols-outlined icon">link</span>{" "}
        <input
          placeholder="Link if any"
          value={event.link}
          onChange={handleFormInput}
          name="link"
          type="text"
        />
      </div>
      <div className="content-item">
        <span className="material-symbols-outlined icon">person_add</span>{" "}
        <input
          placeholder="Add a guest email"
          value={guestInput}
          onKeyDown={handleKeyDown}
          onChange={handleGuestChange}
          name="addGuest"
          type="email"
        />
        <span onClick={addNewGuest} className="material-symbols-outlined icon">
          add
        </span>{" "}
        <div className="guest-container">{invitedGuestItems}</div>
      </div>
    </div>
  );

  const viewModeContent = (
    <div className="content-items">
      <div className="content-item">
        <span className="material-symbols-outlined icon">title</span>{" "}
        <span className="form-input"> {event.title} </span>
      </div>
      <div className="content-item">
        <span className="material-symbols-outlined icon">event</span>{" "}
        <span className="form-input">
          {" "}
          {new Date(event.date).toLocaleString(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
          })}{" "}
        </span>
      </div>
      <div className="content-item">
        <span className="material-symbols-outlined link icon">pin_drop</span>{" "}
        <span className="form-input"> {event.location} </span>
      </div>
      <div className="content-item">
        <span className="material-symbols-outlined link icon">link</span>{" "}
        <span className="form-input"> {event.link} </span>
      </div>
      <div className="content-item">
        <span className="material-symbols-outlined link icon">
          attach_email
        </span>{" "}
        <span className="form-input">
          {" "}
          {event.guestsInvited.map(function (item, index) {
            return item + ",";
          })}{" "}
        </span>
      </div>

      <div className="content-item">
        <span className="material-symbols-outlined link icon">groups</span>{" "}
        <span className="form-input">
          {event.guestsAttending.map(function (item, index) {
            return item + ",";
          })}{" "}
        </span>
      </div>
    </div>
  );
  return (
    <div className={`add-event-modal ${props.value}`}>
      <div className="add-event-modal-header">
        <div>
          {" "}
          <span
            onClick={props.onCloseEditModal}
            className="material-symbols-outlined close-icon icon "
          >
            close
          </span>
        </div>

        <div>
          {isEditModeOn && (
            <span
              onClick={handleSaveForm}
              className="material-symbols-outlined icon icon-primary-hover animate__animated animate__rotateIn"
            >
              save
            </span>
          )}
        </div>

        <div>
          {isEditModeOn === true ? (
            <span
              onClick={toggleEditMode}
              className="material-symbols-outlined icon icon-primary-hover animate__animated animate__rotateIn"
            >
              visibility
            </span>
          ) : (
            <span
              onClick={toggleEditMode}
              className="material-symbols-outlined icon icon-primary-hover"
            >
              edit
            </span>
          )}
        </div>
        <h5> Add new Event</h5>
      </div>

      <div className="add-event-modal-content">
        {isEditModeOn ? EditModeContent : viewModeContent}
      </div>
    </div>
  );
}
