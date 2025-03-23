import { Exercise, ExerciseErrors } from '../hooks/useExercise';

interface ExerciseInputsProps {
  exercise: Exercise;
  errors: ExerciseErrors;
  hasSubmitted: boolean;
  onInputChange: (field: keyof Exercise, value: string) => void;
}

export function ExerciseInputs({ exercise, errors, hasSubmitted, onInputChange }: ExerciseInputsProps) {
  const getInputClassName = (field: keyof Exercise) => {
    const baseClasses = "w-full px-4 py-3 border rounded-lg text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200";
    if (hasSubmitted && errors[field]) {
      return `${baseClasses} border-red-500`;
    }
    return `${baseClasses} border-gray-200 hover:border-gray-300`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label htmlFor="weight" className="block text-sm font-semibold text-gray-900 mb-2">
          Weight (kg)
        </label>
        <input
          id="weight"
          type="number"
          value={exercise.weight || ''}
          onChange={(e) => onInputChange('weight', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
            hasSubmitted && errors.weight ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
          }`}
          aria-invalid={hasSubmitted && !!errors.weight ? 'true' : 'false'}
          aria-describedby={hasSubmitted && errors.weight ? 'weight-error' : undefined}
        />
        {hasSubmitted && errors.weight && (
          <p id="weight-error" className="text-red-600 text-sm mt-1">
            {errors.weight}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="reps" className="block text-sm font-semibold text-gray-900 mb-2">
          Reps
        </label>
        <input
          id="reps"
          type="number"
          value={exercise.reps || ''}
          onChange={(e) => onInputChange('reps', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
            hasSubmitted && errors.reps ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
          }`}
          aria-invalid={hasSubmitted && !!errors.reps ? 'true' : 'false'}
          aria-describedby={hasSubmitted && errors.reps ? 'reps-error' : undefined}
        />
        {hasSubmitted && errors.reps && (
          <p id="reps-error" className="text-red-600 text-sm mt-1">
            {errors.reps}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="rir" className="block text-sm font-semibold text-gray-900 mb-2">
          RIR
        </label>
        <input
          id="rir"
          type="number"
          min="0"
          max="4"
          value={exercise.rir || ''}
          onChange={(e) => onInputChange('rir', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
            hasSubmitted && errors.rir ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
          }`}
          aria-invalid={hasSubmitted && !!errors.rir ? 'true' : 'false'}
          aria-describedby={hasSubmitted && errors.rir ? 'rir-error' : undefined}
        />
        {hasSubmitted && errors.rir && (
          <p id="rir-error" className="text-red-600 text-sm mt-1">
            {errors.rir}
          </p>
        )}
      </div>
    </div>
  );
} 