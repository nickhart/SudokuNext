import React from "react";

export const Cell: React.FC<{
  value: number;
  onClick: (index: number) => void;
}> = ({ value, onClick }) => {
  return (
    <button className="w-16 h-16 bg-blue-500 flex items-center justify-center" onClick={() => onClick(value)}>
      {value}
    </button>
  );
};
