import react, { useState, useEffect } from "react";
import { getClickedItem } from "../utility";

export function EventModal(props) {
  return (
    <div className={`event-modal ${props.displayModal} `}>
      <div> props.event.title </div>
    </div>
  );
}
