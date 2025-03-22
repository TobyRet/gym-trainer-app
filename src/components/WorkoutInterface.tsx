'use client';

import { useState } from 'react';

type RepRange = 'low' | 'medium' | 'high';

interface Exercise {
  name: string;
  sets: number;
  targetRepRange: RepRange;
  targetRIR: number;
  currentSet: number;
  weight: number;
  reps: number;
  actualRIR: number;
}

export function WorkoutInterface() {
  const [currentExercise, setCurrentExercise] = useState<Exercise>({
    name: 'Bench Press',
    sets: 3,
    targetRepRange: 'medium',
    targetRIR: 2,
    currentSet: 1,
    weight: 0,
    reps: 0,
    actualRIR: 0,
  });

  const handleSetComplete = () => {
    // TODO: Implement weight adjustment logic based on RIR
    setCurrentExercise(prev => ({
      ...prev,
      currentSet: prev.currentSet + 1,
      weight: prev.weight,
      reps: 0,
      actualRIR: 0,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{currentExercise.name}</h2>
        <div className="text-sm text-gray-600">
          Set {currentExercise.currentSet} of {currentExercise.sets}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Rep Range
          </label>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${
                currentExercise.targetRepRange === 'low'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              Low (6-8)
            </button>
            <button
              className={`px-3 py-1 rounded ${
                currentExercise.targetRepRange === 'medium'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              Medium (8-12)
            </button>
            <button
              className={`px-3 py-1 rounded ${
                currentExercise.targetRepRange === 'high'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              High (12-20)
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target RIR
          </label>
          <input
            type="number"
            min="0"
            max="4"
            value={currentExercise.targetRIR}
            className="w-20 px-3 py-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              value={currentExercise.weight}
              onChange={(e) =>
                setCurrentExercise(prev => ({
                  ...prev,
                  weight: Number(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reps
            </label>
            <input
              type="number"
              value={currentExercise.reps}
              onChange={(e) =>
                setCurrentExercise(prev => ({
                  ...prev,
                  reps: Number(e.target.value),
                }))
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Actual RIR
          </label>
          <input
            type="number"
            min="0"
            max="4"
            value={currentExercise.actualRIR}
            onChange={(e) =>
              setCurrentExercise(prev => ({
                ...prev,
                actualRIR: Number(e.target.value),
              }))
            }
            className="w-20 px-3 py-2 border rounded"
          />
        </div>

        <button
          onClick={handleSetComplete}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Complete Set
        </button>
      </div>
    </div>
  );
} 