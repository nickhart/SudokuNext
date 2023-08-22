import React from "react";

export const Cell: React.FC<{
  value: number;
  onClick: (index: number) => void;
}> = ({ value, onClick }) => {
  const buttonCss = `w-10 h-10 bg-gray-200`;
  return (
    <button className={buttonCss} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};
