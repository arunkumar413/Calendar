import react, { useState, useEffect } from "react";
import { getClickedItem } from "../utility";

export function EventModal(props) {
  debugger;
  return (
    <div className="event-modal">
      <div> {getClickedItem()}</div>
    </div>
  );
}
