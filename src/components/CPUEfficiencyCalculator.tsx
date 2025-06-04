import React, { useState } from 'react';
import { Calculator, Lightbulb, RotateCcw, ArrowRight } from 'lucide-react';

interface Exercise {
  id: string;
  question: string;
  processes: number;
  ioWaitTime: number;
  expectedResult: number;
  explanation: string;
}

const CPUEfficiencyCalculator: React.FC = () => {
  const [processes, setProcesses] = useState(3);
  const [ioWaitTime, setIoWaitTime] = useState(0.8);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exerciseMode, setExerciseMode] = useState(false);

  const exercises: Exercise[] = [
    {
      id: 'ex1',
      question: 'Ein System hat 4 Prozesse, jeder wartet durchschnittlich 70% der Zeit auf I/O-Operationen. Berechnen Sie die CPU-Ausnutzung.',
      processes: 4,
      ioWaitTime: 0.7,
      expectedResult: 76,
      explanation: 'CPU-Ausnutzung = (1 - 0.7^4) × 100% = (1 - 0.2401) × 100% = 75.99% ≈ 76%'
    },
    {
      id: 'ex2',
      question: 'Bei 6 Prozessen und einer I/O-Wartezeit von 60% pro Prozess - wie hoch ist die CPU-Auslastung?',
      processes: 6,
      ioWaitTime: 0.6,
      expectedResult: 95,
      explanation: 'CPU-Ausnutzung = (1 - 0.6^6) × 100% = (1 - 0.0467) × 100% = 95.33% ≈ 95%'
    },
    {
      id: 'ex3',
      question: 'Wie viele Prozesse werden benötigt für 90% CPU-Auslastung, wenn jeder Prozess 80% der Zeit auf I/O wartet?',
      processes: 3,
      ioWaitTime: 0.8,
      expectedResult: 90,
      explanation: '0.9 = 1 - 0.8^n → 0.8^n = 0.1 → n × log(0.8) = log(0.1) → n = log(0.1)/log(0.8) = 10.32 → mindestens 11 Prozesse (aber hier 3 für Demo)'
    }
  ];

  const calculateEfficiency = (n: number, p: number) => {
    return (1 - Math.pow(p, n)) * 100;
  };

  const currentEfficiency = calculateEfficiency(processes, ioWaitTime);
  const currentEx = exercises[currentExercise];

  const checkAnswer = () => {
    setShowSolution(true);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
      setShowSolution(false);
    } else {
      setExerciseMode(false);
      setCurrentExercise(0);
      setUserAnswer('');
      setShowSolution(false);
    }
  };

  const resetCalculator = () => {
    setProcesses(3);
    setIoWaitTime(0.8);
    setUserAnswer('');
    setShowSolution(false);
  };

  const isCorrect = showSolution && Math.abs(parseFloat(userAnswer) - currentEx.expectedResult) <= 2;

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Calculator className="h-6 w-6 text-blue-600 mr-2" />
          CPU-Effizienz Rechner
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setExerciseMode(!exerciseMode)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              exerciseMode 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {exerciseMode ? 'Freies Rechnen' : 'Übungsaufgaben'}
          </button>
          <button
            onClick={resetCalculator}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Formula Display */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">📐 Formel</h4>
        <div className="text-center">
          <p className="text-lg font-mono text-blue-700 mb-2">
            CPU-Ausnutzung = (1 - p<sup>n</sup>) × 100%
          </p>
          <div className="text-sm text-blue-600 space-y-1">
            <p><strong>p</strong> = I/O-Wartezeit pro Prozess (als Dezimalzahl)</p>
            <p><strong>n</strong> = Anzahl der Prozesse im Speicher</p>
          </div>
        </div>
      </div>

      {exerciseMode ? (
        /* Exercise Mode */
        <div className="space-y-6">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">
              Übung {currentExercise + 1} von {exercises.length}
            </h4>
            <p className="text-yellow-700">{currentEx.question}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-3">Gegeben:</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Anzahl Prozesse (n):</span>
                  <span className="font-mono font-bold">{currentEx.processes}</span>
                </div>
                <div className="flex justify-between">
                  <span>I/O-Wartezeit (p):</span>
                  <span className="font-mono font-bold">{(currentEx.ioWaitTime * 100).toFixed(0)}% = {currentEx.ioWaitTime}</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Ihre Antwort:</h5>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="CPU-Ausnutzung in %"
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-gray-600">%</span>
              </div>
              {!showSolution && (
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Prüfen
                </button>
              )}
            </div>
          </div>

          {showSolution && (
            <div className={`p-4 rounded-lg border ${
              isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start">
                <div className="flex-1">
                  <h5 className={`font-medium mb-2 ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {isCorrect ? '✅ Richtig!' : '❌ Nicht ganz richtig'}
                  </h5>
                  <p className={`text-sm mb-2 ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}>
                    <strong>Erwartete Antwort:</strong> {currentEx.expectedResult}%
                  </p>
                  <div className={`text-sm ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}>
                    <strong>Lösung:</strong> {currentEx.explanation}
                  </div>
                </div>
                <button
                  onClick={nextExercise}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {currentExercise < exercises.length - 1 ? 'Nächste Aufgabe' : 'Beenden'}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Free Calculator Mode */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-4">Parameter einstellen:</h5>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Anzahl Prozesse (n): <span className="font-mono text-blue-600">{processes}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={processes}
                    onChange={(e) => setProcesses(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>20</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    I/O-Wartezeit (p): <span className="font-mono text-blue-600">{(ioWaitTime * 100).toFixed(0)}%</span>
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="0.95"
                    step="0.05"
                    value={ioWaitTime}
                    onChange={(e) => setIoWaitTime(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>95%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-4">Berechnung:</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Formel:</span>
                    <span className="font-mono">1 - p^n</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Eingesetzt:</span>
                    <span className="font-mono">1 - {ioWaitTime}^{processes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Berechnet:</span>
                    <span className="font-mono">1 - {Math.pow(ioWaitTime, processes).toFixed(4)}</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded text-center">
                  <span className="text-blue-800 font-bold text-lg">
                    {currentEfficiency.toFixed(1)}%
                  </span>
                  <p className="text-blue-600 text-sm mt-1">CPU-Ausnutzung</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-start">
              <Lightbulb className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div className="text-green-700 text-sm">
                <strong>Interpretation:</strong> Bei {processes} Prozessen mit je {(ioWaitTime * 100).toFixed(0)}% I/O-Wartezeit 
                beträgt die CPU-Ausnutzung {currentEfficiency.toFixed(1)}%. 
                {currentEfficiency < 50 ? ' Das ist relativ niedrig - mehr Prozesse würden helfen.' : 
                 currentEfficiency > 90 ? ' Das ist sehr effizient!' : 
                 ' Das ist eine gute Auslastung.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CPUEfficiencyCalculator;