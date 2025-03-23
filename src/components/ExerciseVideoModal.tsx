interface ExerciseVideoModalProps {
  exerciseName: string;
  onClose: () => void;
}

export function ExerciseVideoModal({ exerciseName, onClose }: ExerciseVideoModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 id="modal-title" className="text-xl font-bold text-gray-900">
            How to do {exerciseName}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close video"
            className="text-gray-700 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/rT7DgCr-3pg"
            title="Bench Press Tutorial"
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
} 