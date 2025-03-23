import { useState } from 'react';
import { Exercise, ExerciseErrors, RepRange } from './types';

export function useExercise(initialExercise: Exercise) {
  const [exercise, setExercise] = useState<Exercise>(initialExercise);
  const [errors, setErrors] = useState<ExerciseErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: ExerciseErrors = {};
    if (!exercise.weight) newErrors.weight = 'Please enter weight';
    if (!exercise.reps) newErrors.reps = 'Please enter reps';
    if (exercise.rir === undefined || exercise.rir === null) newErrors.rir = 'Please enter RIR';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSetComplete = async () => {
    setHasSubmitted(true);
    if (!validateForm()) return false;

    const isLastSet = exercise.currentSet === exercise.sets;
    if (!isLastSet) {
      setExercise(prev => ({
        ...prev,
        currentSet: prev.currentSet + 1,
        reps: 0,
      }));
    }
    return isLastSet;
  };

  const handleRepRangeChange = (range: RepRange) => {
    setExercise(prev => ({
      ...prev,
      targetRepRange: range,
    }));
  };

  const handleInputChange = (field: keyof Exercise, value: string) => {
    setExercise(prev => ({
      ...prev,
      [field]: value === '' ? '' : Number(value),
    }));

    if (hasSubmitted) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const isFormValid = Object.keys(errors).length === 0;

  return {
    exercise,
    errors,
    hasSubmitted,
    isFormValid,
    handleSetComplete,
    handleRepRangeChange,
    handleInputChange,
  };
} 