import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
const AiAgent = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  
  const agentOptions = [
    { name: 'Option 1 - Low Risk', description: 'Investment low risk' },
    { name: 'Option 2 - Middle Risk', description: 'Investment middle risk' },
    { name: 'Option 3 - High Risk', description: 'Investment high risk' },
  ];

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    // Handle the prompt submission here
    console.log('Prompt submitted:', prompt);
    setPrompt('');
  };

  return (
    <div className={`fixed top-0 right-0 w-80 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex-1 p-4">
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

        {/* Prompt Input at Bottom */}
        <div className="p-4 border-t">
          <form onSubmit={handlePromptSubmit} className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiAgent;