import react, { useState, useEffect } from "react";

export function AddNewEvent(props) {
  const [event, setEvent] = useState({
    title: "An event to remember",
    description: "description of the event",
    location: "New York",
    link: "http://test.com",
    guestsInvited: [],
    guestsAttending: [],
  });
  const [isEditModeOn, setEditMode] = useState(false);
  const [guestInput, setGuestInput] = useState("");

  function toggleEditMode() {
    setEditMode(isEditModeOn ? false : true);
  }

  function handleFormInput(evt) {}
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

  useEffect(function () {}, []);

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

  const EditModeContent = (
    <div className="content-items">
      <div className="content-item">
        <span class="material-symbols-outlined">title</span>{" "}
        <input name="title" onChange={handleFormInput} type="text" />{" "}
      </div>
      <div className="content-item">
        <span class="material-symbols-outlined">event</span>{" "}
        <input
          name="date"
          onChange={handleFormInput}
          className="edit-date"
          type="datetime-local"
        />
        <span className="form-input"> date </span>
      </div>
      <div className="content-item">
        <span class="material-symbols-outlined">pin_drop</span>{" "}
        <input onChange={handleFormInput} name="location" type="text" />
      </div>
      <div className="content-item">
        <span class="material-symbols-outlined">link</span>{" "}
        <input onChange={handleFormInput} name="link" type="text" />
      </div>
      <div className="content-item">
        <span class="material-symbols-outlined">person_add</span>{" "}
        <input
          value={guestInput}
          onKeyDown={handleKeyDown}
          onChange={handleGuestChange}
          name="addGuest"
          type="email"
        />
        <span onClick={addNewGuest} class="material-symbols-outlined">
          add
        </span>{" "}
      </div>
    </div>
  );

  const viewModeContent = (
    <div className="content-items">
      <div className="content-item">
        <span class="material-symbols-outlined">title</span>{" "}
        <span className="form-input"> Test </span>
      </div>
      <div className="content-item">
        <span class="material-symbols-outlined">event</span>{" "}
        <span className="form-input"> Date </span>
      </div>
      <div className="content-item">
        <span class="material-symbols-outlined">pin_drop</span>{" "}
        <span className="form-input"> Location </span>
      </div>
      <div className="content-item">
        <span class="material-symbols-outlined">link</span>{" "}
        <span className="form-input"> Link </span>
      </div>
    </div>
  );
  return (
    <div className={`add-event-modal opened`}>
      <div className="add-event-modal-header">
        <div>
          {" "}
          <span
            onClick={props.onCloseEditModal}
            class="material-symbols-outlined close-icon"
          >
            close
          </span>{" "}
        </div>
        <div>
          <span onClick={toggleEditMode} class="material-symbols-outlined">
            edit
          </span>
        </div>
        <h5> Add new Event</h5>
      </div>

      <div className="add-event-modal-content">
        {isEditModeOn ? EditModeContent : viewModeContent}
      </div>
    </div>
  );
}
