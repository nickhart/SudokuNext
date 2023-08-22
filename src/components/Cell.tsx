import React from "react";

{/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> */}

export const Cell: React.FC<{
  value: number;
  onClick: (index: number) => void;
}> = ({ value, onClick }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => onClick(value)}>
      {value}
    </button>
  );
};
