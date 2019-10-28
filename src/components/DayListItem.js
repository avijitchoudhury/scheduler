import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";
import { storiesOf } from "@storybook/react";

export default function DayListItem(props) {
  const dayClass = classnames('day-list__item', {
    "day-list__item--selected": (props.selected === true),
    "day-list__item--full": (props.spots === 0)
  });

let formatSpots = function () {
  if (props.spots === 0) {
    return "no spots remaining";
  }
  if (props.spots === 1) {
    return "1 spot remaining";
  }
  if (props.spots === 2) {
    return "2 spots remaining";
  }
}
  
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}