import React from "react";

export const Cell: React.FC<{
  value: number;
  onClick: (index: number) => void;
}> = ({ value, onClick }) => {
  return (
    <button className="w-10 h-10 bg-gray-200" onClick={() => onClick(value)}>
      {value}
    </button>
  );
};
