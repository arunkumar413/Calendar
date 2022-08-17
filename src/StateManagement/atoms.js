import { atom } from "recoil";

export const modalState = atom({
  key: "modalState", // unique ID (with respect to other atoms/selectors)
  default: { isDisplay: false, clickedEvent: {} }, // default value (aka initial value)
});

export const events = atom({
  key: "events", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const clickedEvent = atom({
  key: "clickedEvent", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

export const count = atom({
  key: "count",
  default: 0,
});
