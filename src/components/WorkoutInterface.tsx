'use client';

import { useState } from 'react';

type RepRange = 'low' | 'medium' | 'high';

interface Exercise {
  name: string;
  sets: number;
  targetRepRange: RepRange;
  rir: number;
  currentSet: number;
  weight: number;
  reps: number;
}

export function WorkoutInterface() {
  const [currentExercise, setCurrentExercise] = useState<Exercise>({
    name: 'Bench Press',
    sets: 3,
    targetRepRange: 'medium',
    rir: 2,
    currentSet: 1,
    weight: 50,
    reps: 0,
  });

  const [showVideo, setShowVideo] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSetComplete = () => {
    setHasSubmitted(true);
    // Validate fields
    const newErrors: { [key: string]: string } = {};
    if (!currentExercise.reps) {
      newErrors.reps = 'Please enter reps';
    }
    if (!currentExercise.weight) {
      newErrors.weight = 'Please enter weight';
    }
    if (!currentExercise.rir) {
      newErrors.rir = 'Please enter RIR';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If this is the last set, show results
    if (currentExercise.currentSet === currentExercise.sets) {
      // TODO: Navigate to results page
      console.log('Exercise completed!');
      return;
    }

    // Move to next set
    setCurrentExercise(prev => ({
      ...prev,
      currentSet: prev.currentSet + 1,
      reps: 0,
    }));
    setErrors({});
    setHasSubmitted(false);
  };

  const handleRepRangeChange = (range: RepRange) => {
    setCurrentExercise(prev => ({
      ...prev,
      targetRepRange: range,
    }));
  };

  const handleInputChange = (field: keyof Exercise, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setCurrentExercise(prev => ({
      ...prev,
      [field]: numValue,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const isFormValid = currentExercise.reps > 0 && currentExercise.weight > 0 && currentExercise.rir >= 0;

  const getInputClassName = (field: keyof Exercise) => {
    const baseClasses = "w-full px-4 py-3 border rounded-lg text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200";
    if (hasSubmitted && errors[field]) {
      return `${baseClasses} border-red-500`;
    }
    return `${baseClasses} border-gray-200 hover:border-gray-300`;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-3">
          <h2 className="text-2xl font-bold text-gray-900">{currentExercise.name}</h2>
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
          Set {currentExercise.currentSet} of {currentExercise.sets}
        </div>
      </div>

      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">How to do {currentExercise.name}</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-gray-700 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/rT7DgCr-3pg"
                title="Bench Press Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Target Rep Range
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => handleRepRangeChange('low')}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentExercise.targetRepRange === 'low'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
              }`}
              aria-pressed={currentExercise.targetRepRange === 'low'}
            >
              Low (6-8)
            </button>
            <button
              onClick={() => handleRepRangeChange('medium')}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentExercise.targetRepRange === 'medium'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
              }`}
              aria-pressed={currentExercise.targetRepRange === 'medium'}
            >
              Medium (8-12)
            </button>
            <button
              onClick={() => handleRepRangeChange('high')}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentExercise.targetRepRange === 'high'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
              }`}
              aria-pressed={currentExercise.targetRepRange === 'high'}
            >
              High (12-20)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={currentExercise.weight || ''}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              className={getInputClassName('weight')}
              aria-invalid={hasSubmitted && !!errors.weight}
              aria-describedby={hasSubmitted && errors.weight ? 'weight-error' : undefined}
            />
            {hasSubmitted && errors.weight && (
              <p className="text-red-600 text-sm mt-1" id="weight-error">{errors.weight}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Reps
            </label>
            <input
              type="number"
              value={currentExercise.reps || ''}
              onChange={(e) => handleInputChange('reps', e.target.value)}
              className={getInputClassName('reps')}
              aria-invalid={hasSubmitted && !!errors.reps}
              aria-describedby={hasSubmitted && errors.reps ? 'reps-error' : undefined}
            />
            {hasSubmitted && errors.reps && (
              <p className="text-red-600 text-sm mt-1" id="reps-error">{errors.reps}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              RIR
            </label>
            <input
              type="number"
              min="0"
              max="4"
              value={currentExercise.rir || ''}
              onChange={(e) => handleInputChange('rir', e.target.value)}
              className={getInputClassName('rir')}
              aria-invalid={hasSubmitted && !!errors.rir}
              aria-describedby={hasSubmitted && errors.rir ? 'rir-error' : undefined}
            />
            {hasSubmitted && errors.rir && (
              <p className="text-red-600 text-sm mt-1" id="rir-error">{errors.rir}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleSetComplete}
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