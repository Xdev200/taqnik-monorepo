import { useState, useEffect } from 'react';

interface Message {
  sender: 'user' | 'llm';
  text: string;
}

interface ChatResponse {
  output?: string;
}

/**
 * Generates a random session ID
 */
const generateSessionId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Custom hook to manage chat state and logic.
 * Handles session ID generation, chat input management, and message handling.
 */
export function useChat() {
  const [sessionId, setSessionId] = useState<string>('');
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  // Generate a session ID when the component mounts
  useEffect(() => {
    setSessionId(generateSessionId());
  }, []);

  /**
   * Sends the current chat input to the API and updates the messages
   */
  const sendMessage = async (): Promise<void> => {
    if (!chatInput.trim()) return;

    const userMessage: Message = { sender: 'user', text: chatInput };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(
        'https://xdev200.app.n8n.cloud/webhook/f7cafdb6-80d9-4d1b-b71d-3318f84a959a',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_HARDCODED_BEARER_TOKEN',
          },
          body: JSON.stringify({
            sessionId,
            chatinput: chatInput,
          }),
        }
      );
      
      const data: ChatResponse = await response.json();
      const messageText = data?.output || '[No response received]';
      setMessages((prev) => [...prev, { sender: 'llm', text: messageText }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'llm', text: `[Error receiving response] ${error}` },
      ]);
    }
    
    setChatInput('');
  };

  return {
    sessionId,
    chatInput,
    messages,
    sendMessage,
    setChatInput,
  };
} 