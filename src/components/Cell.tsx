import React from "react";

export const Cell: React.FC<{
  value: number;
  customCss?: string; // todo: clean up this hack
  onClick: (index: number) => void;
}> = ({ value, customCss = "bg-gray-200", onClick }) => {
  const buttonCss = `w-10 h-10 ${customCss}`;
  return (
    <button className={buttonCss} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};
