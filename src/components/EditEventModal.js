import react, { useState, useEffect } from "react";

export function EditEventModal(props) {
  const [event, setEvent] = useState(props.event);
  const [guest, setGuest] = useState("");

  useEffect(
    function () {
      setEvent(props.event);
    },
    [props]
  );

  function handleChangeEventDetails(evt) {
    setEvent(function () {
      return { ...event, [evt.target.name]: evt.target.value };
    });
  }

  function handleCloseEditModal() {
    props.onCloseEditModal();
  }

  function handleNewGuest() {
    setEvent(function (prevState) {
      debugger;
      let newState = { ...prevState };
      let arr = [...newState.guestsInvited];
      arr.push(guest);
      newState.invitedGuests = arr;
      return newState;
    });
  }

  function handleGuestInputChange(evt) {
    setGuest(evt.target.value);
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
            class="material-symbols-outlined edit-event-modal-header-close-icon"
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

        <div className="event-date-time" style={{ padding: "1rem" }}>
          <input
            name="date-time"
            type="date-time"
            placeholder="Enter the date"
            onChange={handleChangeEventDetails}
          />
          <input
            name="date-time"
            type="date-time"
            placeholder="Enter the time"
            onChange={handleChangeEventDetails}
          />
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
          name="lin"
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
            name="guest"
            value={event.invitedGuests}
            type="text"
            placeholder="Add a guest"
            onChange={handleGuestInputChange}
          />
          <span
            onClick={handleNewGuest}
            className="material-symbols-outlined"
            style={{ color: "green" }}
          >
            add
          </span>
        </div>
        <textarea
          name="description"
          value={event.description}
          placeholder="Description of the event"
        ></textarea>
      </div>

      <div className="edit-event-modal-footer">
        <button className="secondary"> Cancel </button>
        <button className="success"> Save </button>
      </div>
    </div>
  );
}
