import React, { useState, useCallback } from 'react';
import { Calculator, Info } from 'lucide-react';
import { InputField } from './components/InputField';
import { ResultCard } from './components/ResultCard';
import { ToggleSwitch } from './components/ToggleSwitch';
import { KFactorSelect } from './components/KFactorSelect';

function App() {
  const [calculationMode, setCalculationMode] = useState<'design' | 'heads'>('design');
  
  // Design mode inputs (Density/Area)
  const [density, setDensity] = useState<string>('0.15');
  const [area, setArea] = useState<string>('1500');
  const [kFactor, setKFactor] = useState<string>('5.6');
  const [spacing, setSpacing] = useState<string>('130');

  // Heads/PSI mode inputs
  const [numberOfHeads, setNumberOfHeads] = useState<string>('12');
  const [pressure, setPressure] = useState<string>('7.2');

  const calculateResults = useCallback(() => {
    if (calculationMode === 'design') {
      const d = parseFloat(density);
      const a = parseFloat(area);
      const k = parseFloat(kFactor);
      const s = parseFloat(spacing);

      if (!d || !a || !k || !s) return null;

      const flowPerHead = d * s;
      const requiredPressure = Math.pow(flowPerHead / k, 2);
      const heads = Math.ceil(a / s);
      const actualFlow = flowPerHead * heads;

      return {
        numberOfHeads: heads,
        requiredPressure,
        actualFlow,
        flowPerHead,
        density: d,
        coverageArea: a,
        coveragePerHead: s
      };
    } else {
      const h = parseFloat(numberOfHeads);
      const p = parseFloat(pressure);
      const k = parseFloat(kFactor);
      const s = parseFloat(spacing);

      if (!h || !p || !k || !s) return null;

      const flowPerHead = k * Math.sqrt(p);
      const actualFlow = flowPerHead * h;
      const coverageArea = h * s;
      const calculatedDensity = flowPerHead / s;

      return {
        numberOfHeads: h,
        requiredPressure: p,
        actualFlow,
        flowPerHead,
        coverageArea,
        density: calculatedDensity,
        coveragePerHead: s
      };
    }
  }, [calculationMode, density, area, kFactor, spacing, numberOfHeads, pressure]);

  const results = calculateResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calculator className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">Sprinkler Design Calculator</h1>
              </div>
              <ToggleSwitch
                leftLabel="Density/Area"
                rightLabel="Heads@PSI"
                isChecked={calculationMode === 'heads'}
                onChange={() => setCalculationMode(mode => mode === 'design' ? 'heads' : 'design')}
              />
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {calculationMode === 'design' ? (
                  <>
                    <InputField
                      label="Design Density"
                      value={density}
                      onChange={setDensity}
                      placeholder="0.15"
                      step="0.01"
                      unit="gpm/ft²"
                    />
                    <InputField
                      label="Design Area"
                      value={area}
                      onChange={setArea}
                      placeholder="1500"
                      unit="ft²"
                    />
                    <KFactorSelect
                      value={kFactor}
                      onChange={setKFactor}
                    />
                    <InputField
                      label="Coverage per Head"
                      value={spacing}
                      onChange={setSpacing}
                      placeholder="130"
                      unit="ft²"
                    />
                  </>
                ) : (
                  <>
                    <InputField
                      label="Number of Heads"
                      value={numberOfHeads}
                      onChange={setNumberOfHeads}
                      placeholder="12"
                      step="1"
                    />
                    <InputField
                      label="Pressure"
                      value={pressure}
                      onChange={setPressure}
                      placeholder="7.2"
                      step="0.1"
                      unit="PSI"
                    />
                    <KFactorSelect
                      value={kFactor}
                      onChange={setKFactor}
                    />
                    <InputField
                      label="Coverage per Head"
                      value={spacing}
                      onChange={setSpacing}
                      placeholder="130"
                      unit="ft²"
                    />
                  </>
                )}
              </div>

              <ResultCard
                numberOfHeads={results?.numberOfHeads ?? null}
                requiredPressure={results?.requiredPressure ?? null}
                actualFlow={results?.actualFlow ?? null}
                flowPerHead={results?.flowPerHead ?? null}
                coverageArea={results?.coverageArea ?? null}
                coveragePerHead={results?.coveragePerHead ?? null}
                density={results?.density ?? null}
                mode={calculationMode}
              />

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-gray-500" />
                  <div className="text-sm text-gray-600 space-y-1">
                    {calculationMode === 'design' ? (
                      <>
                        <p>Flow per head (Q) = Density × Coverage per Head</p>
                        <p>Required Pressure (P) = (Q ÷ K)²</p>
                        <p>Number of Heads = Design Area ÷ Coverage per Head (rounded up)</p>
                      </>
                    ) : (
                      <>
                        <p>Flow per head (Q) = K × √P</p>
                        <p>Total Flow = Q × Number of Heads</p>
                        <p>Density = Flow per Head ÷ Coverage per Head</p>
                        <p>Total Coverage Area = Number of Heads × Coverage per Head</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;