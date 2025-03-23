'use client';

import { useState } from 'react';
import { useExercise, Exercise } from '../hooks/useExercise';
import { RepRangeButtons } from './RepRangeButtons';
import { ExerciseInputs } from './ExerciseInputs';
import { ExerciseVideoModal } from './ExerciseVideoModal';

export function WorkoutInterface() {
  const [showVideo, setShowVideo] = useState(false);
  const {
    exercise,
    errors,
    hasSubmitted,
    isFormValid,
    handleSetComplete,
    handleRepRangeChange,
    handleInputChange,
  } = useExercise({
    name: 'Bench Press',
    sets: 3,
    targetRepRange: 'medium',
    rir: 2,
    currentSet: 1,
    weight: 50,
    reps: 0,
  });

  const onSetComplete = () => {
    const isComplete = handleSetComplete();
    if (isComplete) {
      // TODO: Navigate to results page
      console.log('Exercise completed!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-3">
          <h2 className="text-2xl font-bold text-gray-900">{exercise.name}</h2>
          <button
            onClick={() => setShowVideo(true)}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Show me how to do this exercise
          </button>
        </div>
        <div className="text-sm text-gray-700 font-medium">
          Set {exercise.currentSet} of {exercise.sets}
        </div>
      </div>

      {showVideo && (
        <ExerciseVideoModal
          exerciseName={exercise.name}
          onClose={() => setShowVideo(false)}
        />
      )}

      <div className="space-y-6">
        <RepRangeButtons
          currentRange={exercise.targetRepRange}
          onRangeChange={handleRepRangeChange}
        />

        <ExerciseInputs
          exercise={exercise}
          errors={errors}
          hasSubmitted={hasSubmitted}
          onInputChange={handleInputChange}
        />

        <button
          onClick={onSetComplete}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 ${
            isFormValid
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          aria-disabled={!isFormValid}
        >
          Complete Set
        </button>
      </div>
    </div>
  );
} 