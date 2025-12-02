const SuccessTick = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center space-y-4">
        {/* Circle with tick */}
        <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        {/* Message */}
        <p className="text-green-700 text-lg font-medium text-center">
          {message}
        </p>
      </div>
    </div>
  );
};

export default SuccessTick;
