import react, { useState, useEffect } from "react";

export function AddNewEvent(props) {
  const [isEditModeOn, setEditMode] = useState(false);

  function toggleEditMode() {
    setEditMode(isEditModeOn ? false : true);
  }

  const EditModeContent = (
    <div className="content-items">
      <div className="content-item">
        <span class="material-symbols-outlined">title</span>{" "}
        <input type="date-time-local" />{" "}
      </div>
      <div className="content-item">
        <span class="material-symbols-outlined">event</span>{" "}
        <input type="date-time-local" />
      </div>
      <div className="content-item">
        <span class="material-symbols-outlined">pin_drop</span>{" "}
        <input type="text" />
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
