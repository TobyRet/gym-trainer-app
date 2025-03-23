export type RepRange = 'low' | 'medium' | 'high';

export interface Exercise {
  name: string;
  sets: number;
  targetRepRange: RepRange;
  weight: number;
  reps: number;
  rir: number;
  currentSet: number;
}

export interface ExerciseErrors {
  weight?: string;
  reps?: string;
  rir?: string;
} 