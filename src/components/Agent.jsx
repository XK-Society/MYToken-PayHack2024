import React, { useState, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import Anthropic from '@anthropic-ai/sdk';

const AiAgent = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [anthropicClient, setAnthropicClient] = useState(null);

  useEffect(() => {
    // Initialize Anthropic client with browser support
    const client = new Anthropic({
      apiKey: import.meta.env.VITE_AI_AGENT,
      dangerouslyAllowBrowser: true  // Enable browser support
    });
    setAnthropicClient(client);
  }, []);

  const agentOptions = [
    { name: 'Option 1 - Low Risk', description: 'Investment low risk', prompt: 'Suggest some low risk investment options for a Malaysian investor.' },
    { name: 'Option 2 - Middle Risk', description: 'Investment middle risk', prompt: 'Suggest some moderate risk investment options for a Malaysian investor.' },
    { name: 'Option 3 - High Risk', description: 'Investment high risk', prompt: 'Suggest some high risk investment options for a Malaysian investor.' },
  ];

  const sendMessage = async (userPrompt) => {
    if (!anthropicClient) {
      console.error('Anthropic client not initialized');
      return;
    }

    setIsLoading(true);
    try {
      const response = await anthropicClient.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [
          ...messages.map(msg => ({ role: msg.role, content: msg.content })),
          { role: "user", content: userPrompt }
        ]
      });

      setMessages(prev => [...prev, 
        { role: 'user', content: userPrompt },
        { role: 'assistant', content: response.content[0].text }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, 
        { role: 'user', content: userPrompt },
        { role: 'assistant', content: `Error: ${error.message}. Please try again.` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetPrompt = async (promptText) => {
    setPrompt('');
    await sendMessage(promptText);
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    await sendMessage(prompt);
    setPrompt('');
  };

  return (
    <div className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Chat with AI Agent</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-4 mb-4">
            {agentOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handlePresetPrompt(option.prompt)}
                className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="font-medium mb-1">{option.name}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-100 ml-8' 
                    : 'bg-gray-100 mr-8'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handlePromptSubmit} className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiAgent;