import { RepRange } from '../hooks/useExercise';

interface RepRangeButtonsProps {
  currentRange: RepRange;
  onRangeChange: (range: RepRange) => void;
}

export function RepRangeButtons({ currentRange, onRangeChange }: RepRangeButtonsProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        Target Rep Range
      </label>
      <div className="flex gap-3">
        <button
          onClick={() => onRangeChange('low')}
          className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
            currentRange === 'low'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
          }`}
          aria-pressed={currentRange === 'low'}
        >
          Low (6-8)
        </button>
        <button
          onClick={() => onRangeChange('medium')}
          className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
            currentRange === 'medium'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
          }`}
          aria-pressed={currentRange === 'medium'}
        >
          Medium (8-12)
        </button>
        <button
          onClick={() => onRangeChange('high')}
          className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
            currentRange === 'high'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200'
          }`}
          aria-pressed={currentRange === 'high'}
        >
          High (12-20)
        </button>
      </div>
    </div>
  );
} 