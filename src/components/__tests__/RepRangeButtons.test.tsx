import { render, screen, fireEvent } from '@testing-library/react';
import { RepRangeButtons } from '../RepRangeButtons';

describe('RepRangeButtons', () => {
  const mockOnRangeChange = jest.fn();

  beforeEach(() => {
    mockOnRangeChange.mockClear();
  });

  it('renders all three rep range buttons', () => {
    render(<RepRangeButtons currentRange="medium" onRangeChange={mockOnRangeChange} />);
    
    expect(screen.getByText('Low (6-8)')).toBeInTheDocument();
    expect(screen.getByText('Medium (8-12)')).toBeInTheDocument();
    expect(screen.getByText('High (12-20)')).toBeInTheDocument();
  });

  it('calls onRangeChange with correct range when buttons are clicked', () => {
    render(<RepRangeButtons currentRange="medium" onRangeChange={mockOnRangeChange} />);
    
    fireEvent.click(screen.getByText('Low (6-8)'));
    expect(mockOnRangeChange).toHaveBeenCalledWith('low');

    fireEvent.click(screen.getByText('High (12-20)'));
    expect(mockOnRangeChange).toHaveBeenCalledWith('high');
  });

  it('applies correct styling to selected button', () => {
    render(<RepRangeButtons currentRange="medium" onRangeChange={mockOnRangeChange} />);
    
    const mediumButton = screen.getByText('Medium (8-12)');
    expect(mediumButton).toHaveClass('bg-indigo-600', 'text-white');
    
    const lowButton = screen.getByText('Low (6-8)');
    expect(lowButton).toHaveClass('bg-gray-50', 'text-gray-900');
  });

  it('sets correct aria-pressed attribute on selected button', () => {
    render(<RepRangeButtons currentRange="medium" onRangeChange={mockOnRangeChange} />);
    
    const mediumButton = screen.getByText('Medium (8-12)');
    expect(mediumButton).toHaveAttribute('aria-pressed', 'true');
    
    const lowButton = screen.getByText('Low (6-8)');
    expect(lowButton).toHaveAttribute('aria-pressed', 'false');
  });
}); 