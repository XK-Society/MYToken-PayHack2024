import React from 'react';

// eslint-disable-next-line react/prop-types
const AiAgent = ({ isOpen, onClose }) => {
  const agentOptions = [
    { name: 'Option 1 - Low Risk', description: 'Investment low risk' },
    { name: 'Option 2 - Middle Risk', description: 'Investment middle risk' },
    { name: 'Option 3 - High Risk', description: 'Investment high risk' },
  ];

  return (
    <div className={`fixed top-0 right-0 w-80 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Chat with AI Agent</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {agentOptions.map((option) => (
            <div
              key={option.name}
              className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
            >
              <h3 className="font-medium mb-1">{option.name}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiAgent;