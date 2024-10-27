import React from 'react';

interface ToggleSwitchProps {
  isChecked: boolean;
  onChange: () => void;
  leftLabel: string;
  rightLabel: string;
}

export function ToggleSwitch({ isChecked, onChange, leftLabel, rightLabel }: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium ${!isChecked ? 'text-blue-600' : 'text-gray-500'}`}>
        {leftLabel}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={onChange}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isChecked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span className="sr-only">
          {isChecked ? rightLabel : leftLabel}
        </span>
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
            isChecked ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isChecked ? 'text-blue-600' : 'text-gray-500'}`}>
        {rightLabel}
      </span>
    </div>
  );
}