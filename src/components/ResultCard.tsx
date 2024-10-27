import React from 'react';
import { Droplets } from 'lucide-react';

interface ResultCardProps {
  numberOfHeads: number | null;
  requiredPressure: number | null;
  actualFlow: number | null;
  flowPerHead: number | null;
  coverageArea: number | null;
  coveragePerHead: number | null;
  density: number | null;
  mode: 'design' | 'heads';
}

export function ResultCard({ 
  numberOfHeads, 
  requiredPressure, 
  actualFlow, 
  flowPerHead,
  coverageArea,
  coveragePerHead,
  density,
  mode 
}: ResultCardProps) {
  return (
    <div className="bg-blue-50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Droplets className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Design Results</h2>
      </div>
      
      {numberOfHeads && requiredPressure && actualFlow ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl font-bold text-blue-600">{numberOfHeads}</p>
            <p className="text-gray-600 mt-1">Sprinkler Heads</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl font-bold text-blue-600">{requiredPressure.toFixed(1)}</p>
            <p className="text-gray-600 mt-1">Required PSI</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl font-bold text-blue-600">{actualFlow.toFixed(1)}</p>
            <p className="text-gray-600 mt-1">Total GPM</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl font-bold text-blue-600">{flowPerHead?.toFixed(1)}</p>
            <p className="text-gray-600 mt-1">GPM per Head</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl font-bold text-blue-600">{density?.toFixed(3)}</p>
            <p className="text-gray-600 mt-1">Density (gpm/ft²)</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl font-bold text-blue-600">{coverageArea?.toFixed(1)}</p>
            <p className="text-gray-600 mt-1">Total Coverage (ft²)</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">Enter values to calculate</p>
      )}
    </div>
  );
}