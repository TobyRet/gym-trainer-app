import { renderHook, act } from '@testing-library/react';
import { useExercise } from '../useExercise';
import { Exercise, RepRange } from '../types';

const initialExercise: Exercise = {
  name: 'Bench Press',
  sets: 3,
  targetRepRange: 'medium',
  weight: 0,
  reps: 0,
  rir: undefined,
  currentSet: 1,
};

describe('useExercise', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useExercise(initialExercise));
    
    expect(result.current.exercise).toEqual(initialExercise);
    expect(result.current.errors).toEqual({});
  });

  it('should validate form and show errors when handleSetComplete is called with empty values', () => {
    const { result } = renderHook(() => useExercise(initialExercise));

    act(() => {
      result.current.handleSetComplete();
    });

    expect(result.current.errors).toEqual({
      reps: 'Please enter reps',
      weight: 'Please enter weight',
      rir: 'Please enter RIR',
    });
  });

  it('should move to next set when handleSetComplete is called with valid values', async () => {
    const { result } = renderHook(() => useExercise(initialExercise));

    act(() => {
      result.current.handleInputChange('weight', '50');
      result.current.handleInputChange('reps', '10');
      result.current.handleInputChange('rir', '2');
    });

    await act(async () => {
      await result.current.handleSetComplete();
    });

    expect(result.current.exercise.currentSet).toBe(2);
    expect(result.current.exercise.reps).toBe(0);
    expect(result.current.errors).toEqual({});
  });

  it('should return true when handleSetComplete is called on the last set', async () => {
    const lastSetExercise: Exercise = {
      ...initialExercise,
      currentSet: 3,
      weight: 50,
      reps: 10,
      rir: 2,
    };

    const { result } = renderHook(() => useExercise(lastSetExercise));

    let isComplete;
    await act(async () => {
      isComplete = await result.current.handleSetComplete();
    });

    expect(isComplete).toBe(true);
  });

  it('should clear errors when input values change', () => {
    const { result } = renderHook(() => useExercise(initialExercise));

    act(() => {
      result.current.handleSetComplete();
    });

    expect(result.current.errors.weight).toBeTruthy();

    act(() => {
      result.current.handleInputChange('weight', '50');
    });

    expect(result.current.errors.weight).toBeUndefined();
  });

  it('should update target rep range', () => {
    const { result } = renderHook(() => useExercise(initialExercise));

    act(() => {
      result.current.handleRepRangeChange('low' as RepRange);
    });

    expect(result.current.exercise.targetRepRange).toBe('low');
  });
}); 