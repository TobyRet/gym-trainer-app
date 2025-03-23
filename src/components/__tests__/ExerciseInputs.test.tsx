import { render, screen, fireEvent } from '@testing-library/react';
import { ExerciseInputs } from '../ExerciseInputs';

describe('ExerciseInputs', () => {
  const mockExercise = {
    name: 'Bench Press',
    sets: 3,
    targetRepRange: 'medium' as const,
    rir: 2,
    currentSet: 1,
    weight: 50,
    reps: 0,
  };

  const mockOnInputChange = jest.fn();

  beforeEach(() => {
    mockOnInputChange.mockClear();
  });

  it('renders all input fields with correct labels', () => {
    render(
      <ExerciseInputs
        exercise={mockExercise}
        errors={{}}
        hasSubmitted={false}
        onInputChange={mockOnInputChange}
      />
    );

    expect(screen.getByLabelText('Weight (kg)')).toBeInTheDocument();
    expect(screen.getByLabelText('Reps')).toBeInTheDocument();
    expect(screen.getByLabelText('RIR')).toBeInTheDocument();
  });

  it('displays current values from exercise prop', () => {
    render(
      <ExerciseInputs
        exercise={mockExercise}
        errors={{}}
        hasSubmitted={false}
        onInputChange={mockOnInputChange}
      />
    );

    expect(screen.getByLabelText('Weight (kg)')).toHaveValue(50);
    expect(screen.getByLabelText('Reps')).toHaveValue(null);
    expect(screen.getByLabelText('RIR')).toHaveValue(2);
  });

  it('calls onInputChange with correct values when inputs change', () => {
    render(
      <ExerciseInputs
        exercise={mockExercise}
        errors={{}}
        hasSubmitted={false}
        onInputChange={mockOnInputChange}
      />
    );

    fireEvent.change(screen.getByLabelText('Weight (kg)'), { target: { value: '60' } });
    expect(mockOnInputChange).toHaveBeenCalledWith('weight', '60');

    fireEvent.change(screen.getByLabelText('Reps'), { target: { value: '12' } });
    expect(mockOnInputChange).toHaveBeenCalledWith('reps', '12');

    fireEvent.change(screen.getByLabelText('RIR'), { target: { value: '1' } });
    expect(mockOnInputChange).toHaveBeenCalledWith('rir', '1');
  });

  it('displays error messages when hasSubmitted is true and errors exist', () => {
    const errors = {
      weight: 'Please enter weight',
      reps: 'Please enter reps',
      rir: 'Please enter RIR',
    };

    render(
      <ExerciseInputs
        exercise={mockExercise}
        errors={errors}
        hasSubmitted={true}
        onInputChange={mockOnInputChange}
      />
    );

    expect(screen.getByText('Please enter weight')).toBeInTheDocument();
    expect(screen.getByText('Please enter reps')).toBeInTheDocument();
    expect(screen.getByText('Please enter RIR')).toBeInTheDocument();
  });

  it('applies error styling to inputs with errors', () => {
    const errors = {
      weight: 'Please enter weight',
    };

    render(
      <ExerciseInputs
        exercise={mockExercise}
        errors={errors}
        hasSubmitted={true}
        onInputChange={mockOnInputChange}
      />
    );

    const weightInput = screen.getByLabelText('Weight (kg)');
    expect(weightInput).toHaveClass('border-red-500');
  });

  it('sets correct aria attributes for error states', () => {
    const errors = {
      weight: 'Please enter weight',
    };

    render(
      <ExerciseInputs
        exercise={mockExercise}
        errors={errors}
        hasSubmitted={true}
        onInputChange={mockOnInputChange}
      />
    );

    const weightInput = screen.getByLabelText('Weight (kg)');
    expect(weightInput).toHaveAttribute('aria-invalid', 'true');
    expect(weightInput).toHaveAttribute('aria-describedby', 'weight-error');
  });
}); 