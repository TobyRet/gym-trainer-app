import { render, screen, fireEvent } from '@testing-library/react';
import { ExerciseVideoModal } from '../ExerciseVideoModal';

describe('ExerciseVideoModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders the modal with correct title', () => {
    render(<ExerciseVideoModal exerciseName="Bench Press" onClose={mockOnClose} />);
    
    expect(screen.getByText('How to do Bench Press')).toBeInTheDocument();
  });

  it('renders the close button with correct aria label', () => {
    render(<ExerciseVideoModal exerciseName="Bench Press" onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('Close video');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<ExerciseVideoModal exerciseName="Bench Press" onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByLabelText('Close video'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders the video iframe with correct attributes', () => {
    render(<ExerciseVideoModal exerciseName="Bench Press" onClose={mockOnClose} />);
    
    const iframe = screen.getByTitle('Bench Press Tutorial');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('accelerometer'));
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('autoplay'));
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('clipboard-write'));
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('encrypted-media'));
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('gyroscope'));
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('picture-in-picture'));
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  it('renders with correct styling classes', () => {
    render(<ExerciseVideoModal exerciseName="Bench Press" onClose={mockOnClose} />);
    
    expect(screen.getByRole('dialog')).toHaveClass('fixed', 'inset-0', 'bg-black', 'bg-opacity-75');
    expect(screen.getByRole('dialog')).toHaveClass('flex', 'items-center', 'justify-center', 'z-50');
    
    const modalContent = screen.getByRole('dialog').firstChild;
    expect(modalContent).toHaveClass('bg-white', 'rounded-2xl', 'p-6', 'max-w-4xl', 'w-full', 'mx-4', 'shadow-2xl');
  });
}); 