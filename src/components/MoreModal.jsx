import React from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { count, modalState } from "../StateManagement/atoms";

export function MoreModal(props) {
  const [counter, setCount] = useRecoilState(count);
  const [modalInfo, setModalState] = useRecoilState(modalState);

  function handleClose() {
    props.setInfo(function (prevState) {
      return { ...prevState, isDisplayOn: false };
    });
  }

  function handleShowEventModal(evt, item) {
    console.log("clicked");
    props.setClickedEvent(item);
    props.onOpenEditModal();
    setModalState(function (prevState) {
      return {
        ...prevState,
        isDisplay: true,
        clickedEvent: item,
      };
    });
  }

  useEffect(
    function () {
      console.log(modalInfo);
    },
    [modalInfo]
  );

  const eventElements = props.info.events.map(function (item, index) {
    return (
      <span
        onClick={(evt) => handleShowEventModal(evt, item)}
        key={index.toString()}
        className="full-day-event more-event"
      >
        {item.title}
      </span>
    );
  });

  function incrementCount() {
    setCount(counter + 1);
  }

  return (
    <div
      className="more-modal"
      style={{
        display: props.info.isDisplayOn ? "block" : "none",
        position: "absolute",
        left: props.info.left - 70,
        top: props.info.top + 20,
      }}
    >
      <div className="more-modal-header">
        <span></span>
        <span onClick={handleClose} className="material-symbols-outlined">
          expand_less
        </span>{" "}
        <span></span>
      </div>

      <div> {eventElements}</div>
    </div>
  );
}
