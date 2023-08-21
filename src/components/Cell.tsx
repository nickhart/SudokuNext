import React from "react";

export const Cell: React.FC<{
  value: number;
  onClick: (index: number) => void;
}> = ({ value, onClick }) => {
  return (
    <button className="cell" onClick={() => onClick(value)}>
      {value}
    </button>
  );
};
