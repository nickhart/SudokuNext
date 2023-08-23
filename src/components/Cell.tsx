import React from "react";

import classNames from "classnames";


const cellStylesByIndex: Array<Array<string>> = [
  [ "bg-gray-200 hover:bg-gray-400", "bg-gray-400 hover:bg-gray-600" ],
  [  "bg-blue-200 hover:bg-blue-400", "bg-blue-400 hover:bg-blue-600" ],
  [  "bg-lime-200 hover:bg-lime-400", "bg-lime-400 hover:bg-lime-600" ],
  [  "bg-red-200 hover:bg-red-400", "bg-red-400 hover:bg-red-600" ],
  [  "bg-yellow-200 hover:bg-yellow-400", "bg-yellow-400 hover:bg-yellow-600" ],
  [  "bg-purple-200 hover:bg-purple-400", "bg-purple-400 hover:bg-purple-600" ],
  [  "bg-cyan-200 hover:bg-cyan-400", "bg-cyan-400 hover:bg-cyan-600" ],
  [  "bg-amber-200 hover:bg-amber-400", "bg-amber-400 hover:bg-amber-600" ],
  [  "bg-pink-200 hover:bg-pink-400", "bg-pink-400 hover:bg-pink-600" ],
  [  "bg-teal-200 hover:bg-teal-400", "bg-teal-400 hover:bg-teal-600" ],
  [  "bg-emerald-200 hover:bg-emerald-400", "bg-emerald-400 hover:bg-emerald-600" ]
];

function stylesForIndex(index: number, weight: number): string {
  if (index >= 0 && index < cellStylesByIndex.length) {
    const cellStyles = cellStylesByIndex[index];
    if (weight >= 0 && weight < cellStyles.length) {
      return cellStyles[weight];
    }
  }

  const value = index % cellStylesByIndex.length;
  return cellStylesByIndex[value][0];
  // return "bg-red-600 hover:bg-red-800";
}

export const Cell: React.FC<{
  value: number;
  weight: number;
  onClick: (index: number) => void;
}> = ({ value, weight, onClick }) => {

  const colorStyles = stylesForIndex(value, weight);

  const combinedClassName = classNames('w-10 h-10 rounded', colorStyles);

  return (
    <button className={combinedClassName} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};
