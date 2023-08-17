import React, { MouseEvent } from "react";

export function Cell(props: any) {
  return (
    <button className="cell" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
