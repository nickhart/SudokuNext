import { useState } from 'react';
import React from 'react';

import classNames from 'classnames';

const colorsByIndexAndWeight: Array<Array<string>> = [
  ['bg-gray-200', 'bg-gray-300', 'bg-gray-400'],
  ['bg-blue-200', 'bg-blue-300', 'bg-blue-400'],
  ['bg-lime-200', 'bg-lime-300', 'bg-lime-400'],
  ['bg-red-200', 'bg-red-300', 'bg-red-400'],
  ['bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400'],
  ['bg-purple-200', 'bg-purple-300', 'bg-purple-400'],
  ['bg-cyan-200', 'bg-cyan-300', 'bg-cyan-400'],
  ['bg-orange-200', 'bg-orange-300', 'bg-orange-400'],
  ['bg-teal-200', 'bg-teal-300', 'bg-teal-400'],
  ['bg-pink-200', 'bg-pink-300', 'bg-pink-400'],
  ['bg-emerald-200', 'bg-emerald-300', 'bg-emerald-400'],
];

const hoverColorsByIndexAndWeight: Array<Array<string>> = [
  ['hover:bg-gray-200', 'hover:bg-gray-300', 'hover:bg-gray-400'],
  ['hover:bg-blue-200', 'hover:bg-blue-300', 'hover:bg-blue-400'],
  ['hover:bg-lime-200', 'hover:bg-lime-300', 'hover:bg-lime-400'],
  ['hover:bg-red-200', 'hover:bg-red-300', 'hover:bg-red-400'],
  ['hover:bg-yellow-200', 'hover:bg-yellow-300', 'hover:bg-yellow-400'],
  ['hover:bg-purple-200', 'hover:bg-purple-300', 'hover:bg-purple-400'],
  ['hover:bg-cyan-200', 'hover:bg-cyan-300', 'hover:bg-cyan-400'],
  ['hover:bg-orange-200', 'hover:bg-orange-300', 'hover:bg-orange-400'],
  ['hover:bg-teal-200', 'hover:bg-teal-300', 'hover:bg-teal-400'],
  ['hover:bg-pink-200', 'hover:bg-pink-300', 'hover:bg-pink-400'],
  ['hover:bg-emerald-200', 'hover:bg-emerald-300', 'hover:bg-emerald-400'],
];

const borderStylesByIndex: Array<string> = [
  'border-gray-400',
  'border-blue-400',
  'border-lime-400',
  'border-red-400',
  'border-yellow-400',
  'border-purple-400',
  'border-cyan-400',
  'border-orange-400',
  'border-teal-400',
  'border-pink-400',
  'border-emerald-400',
];

function colorForValueAndWeight(value: number, weight: number): string {
  if (value >= 0 && value < colorsByIndexAndWeight.length) {
    const cellStyles = colorsByIndexAndWeight[value];
    if (weight >= 0 && weight < cellStyles.length) {
      return cellStyles[weight];
    }
  }
  return 'bg-red-600';
}

function hoverColorForValueAndWeight(value: number, weight: number): string {
  if (value >= 0 && value < hoverColorsByIndexAndWeight.length) {
    const cellStyles = hoverColorsByIndexAndWeight[value];
    if (weight >= 0 && weight < cellStyles.length) {
      return cellStyles[weight];
    }
  }
  return 'hover:bg-red-800';
}

export const Cell: React.FC<{
  value: number;
  weight: number;
  onClick: (index: number) => void;
  canClick: boolean;
  isSelected: boolean;
  currentNumber: number;
  // todo: callback for hover? or subclass? this property list is getting ridiculous...
}> = ({ value, weight, onClick, canClick, isSelected, currentNumber }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (value: number) => {
    if (canClick) {
      onClick(value);
    } else {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
    }
  };

  const color = colorForValueAndWeight(value, weight);
  const hoverColor = hoverColorForValueAndWeight(currentNumber, weight + 1);

  const combinedClassName = classNames(
    'w-10 h-10 rounded',
    color,
    canClick ? hoverColor : '',
    isClicked ? 'animate-shake' : '',
    isSelected ? borderStylesByIndex[value] : '',
  );

  return (
    <button className={combinedClassName} onClick={() => handleClick(value)}>
      {value}
    </button>
  );
};
