import React from 'react';

interface KFactorSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function KFactorSelect({ value, onChange }: KFactorSelectProps) {
  const commonKFactors = [
    { value: "5.6", label: "5.6 (1/2\")" },
    { value: "8.0", label: "8.0 (3/4\")" },
    { value: "11.2", label: "11.2 (1/2\" ESFR)" },
    { value: "14.0", label: "14.0 (3/4\" ESFR)" },
    { value: "16.8", label: "16.8 (3/4\" ESFR)" },
    { value: "22.4", label: "22.4 (1\" ESFR)" },
    { value: "25.2", label: "25.2 (1\" ESFR)" },
    { value: "28.0", label: "28.0 (1\" ESFR)" }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        K-Factor
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        {commonKFactors.map((kFactor) => (
          <option key={kFactor.value} value={kFactor.value}>
            {kFactor.label}
          </option>
        ))}
      </select>
    </div>
  );
}