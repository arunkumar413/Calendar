import react, { useState, useEffect } from "react";

export function EditEventModal(props) {
  const [event, setEvent] = useState(props.event);
  const [email, setEmail] = useState("");
  const [eventHour, setEventHour] = useState("");
  const [eventDate, setEventDate] = useState("2022-05-13T22:30");
  const [eventTime, setEventTime] = useState("");

  useEffect(
    function () {
      setEvent(props.event);
    },
    [props]
  );

  function handleChangeEventDetails(evt) {
    // if (evt.target.name === "date") {
    //   setEventDate(evt.target.value);
    // } else if (evt.target.name === "time") {
    //   setEventTime(evt.target.value);
    // }
    setEvent(function (prevState) {
      return { ...event, [evt.target.name]: evt.target.value };
    });
  }

  useEffect(
    function () {
      function useRegex(input) {
        let regex = /\d\d\d\d-[a-zA-Z]+-\d\d/i;
        return regex.test(input);
      }

      useRegex(eventDate);

      setEvent(function () {
        return { ...event, ["date"]: eventDate };
      });
    },
    [eventDate, eventTime]
  );

  function handleCloseEditModal() {
    props.onCloseEditModal();
  }

  function handleNewGuest() {
    setEvent(function (prevState) {
      return {
        ...prevState,
        guestsInvited: [...prevState.guestsInvited, email],
      };
    });
    setEmail("");
  }

  function handleGuestInputChange(evt) {
    setEmail(evt.target.value);
  }

  function handleKeyPress(evt) {
    if (evt.key === "Enter") {
      setEvent(function (prevState) {
        return {
          ...prevState,
          guestsInvited: [...prevState.guestsInvited, email],
        };
      });
      setEmail("");
    }
  }

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

  function handleSaveEvent() {
    // call to backed to save the event
    console.log(event);
    console.log("saved event");
    props.onCloseEditModal();
  }

  return (
    <div className={`edit-event-modal ${props.value}`}>
      <div className="edit-event-modal-header">
        <h6>edit event modal</h6>

        <div> </div>
        <div></div>
        <div className="">
          <span
            onClick={handleCloseEditModal}
            className="material-symbols-outlined edit-event-modal-header-close-icon"
          >
            close
          </span>
        </div>
      </div>

      <div className="edit-event-modal-content">
        <input
          name="title"
          placeholder="Name of the event"
          value={event.title}
          type="text"
          onChange={handleChangeEventDetails}
        />
        <div className="event-date-time">
          <input
            onChange={handleChangeEventDetails}
            type="datetime-local"
            name="date"
          />
          <span style={{ fontSize: "0.8rem" }}>
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

          {/* <input
            name="date"
            type="text"
            placeholder="Enter the date"
            onBlur={handleChangeEventDetails}
          />
          <input
            name="time"
            type="text"
            placeholder="Enter the time"
            onBlur={handleChangeEventDetails}
          /> */}
        </div>
        <input
          value={event.location}
          name="location"
          type="text"
          placeholder="Event location"
          onChange={handleChangeEventDetails}
        />
        <input
          value={event.link}
          name="link"
          type="url"
          placeholder="Link"
          onChange={handleChangeEventDetails}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <input
            name="email"
            value={email}
            type="email"
            placeholder="Add a guest"
            onChange={handleGuestInputChange}
            onKeyDown={handleKeyPress}
          />
          <span
            onClick={handleNewGuest}
            className="material-symbols-outlined"
            style={{ color: "green" }}
          >
            add
          </span>
        </div>
        <span style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
          {event.guestsInvited.map(function (item, index) {
            return (
              <span key={index.toString()}>
                {" "}
                {item}{" "}
                <span
                  onClick={(evt) => handleRemoveGuest(evt, item)}
                  className="material-symbols-outlined close-icon"
                >
                  close
                </span>{" "}
              </span>
            );
          })}
        </span>

        <textarea
          rows={5}
          name="description"
          value={event.description}
          placeholder="Description of the event"
          onChange={handleChangeEventDetails}
        ></textarea>
      </div>

      <div className="edit-event-modal-footer">
        <button className="secondary"> Cancel </button>
        <button onClick={handleSaveEvent} className="success">
          {" "}
          Save{" "}
        </button>
      </div>
    </div>
  );
}
