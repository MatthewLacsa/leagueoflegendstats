import { useState } from "react";

const AskBlitzy = ({ onClick, isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { text: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message: message })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        text: data.response || "Sorry, I couldn't process that request.",
        isUser: false
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      const responses = [
        "Great question! Focus on improving your CS (creep score) by practicing last-hitting in the practice tool.",
        "Your KDA looks good! Try to work on vision control by placing more wards in key areas.",
        "Consider adjusting your build based on the enemy team composition. Adaptive itemization is key!",
        "Map awareness is crucial. Try to look at your minimap every 3-5 seconds during laning phase.",
        "Practice your champion combos in the practice tool to improve your mechanical skills."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        text: randomResponse,
        isUser: false
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  if (isOpen) {
    return (
      <div className="fixed bottom-4 right-4 w-96 h-96 bg-gray-800 border-2 border-red-600 rounded-lg z-50 flex flex-col shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(220,38,38,0.1)]">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-[0.5rem]">
            <div className="w-[2rem] h-[2rem] rounded-[50%] overflow-hidden">
              <img 
                src="/placeholder.svg?height=32&width=32&text=Blitz" 
                alt="Blitzcrank" 
                className="w-full h-full object-cover shadow-[0_0_8px_#fbbf2460]"
              />
            </div>
            <span className="text-white font-bold">
              Ask Blitzy
            </span>
          </div>
          <button 
            className="text-[#9ca3af] bg-transparent border-none p-[0.25rem] rounded-[0.25rem] cursor-pointer transition-all"
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.backgroundColor = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#9ca3af';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <svg className="w-[1rem] h-[1rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-700">
          {messages.length === 0 && (
            <div style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              backgroundColor: '#374151'
            }}>
              👋 Hi! I'm Blitzy, your League of Legends assistant. Ask me anything about improving your gameplay!
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-[75%] text-white ${msg.isUser ? 'bg-red-600 ml-auto' : 'bg-gray-700 ml-0'}`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div 
              className="p-[0.5rem] rounded-[0.5rem] max-w-[75%] bg-[#374151] text-white"
              >
              <div className="flex center gap-[0.5rem]">
                <div className="animate-pulse">💭</div>
                <span className="text-[0.875rem] gap-[0.5rem]">
                  Blitzy is thinking...
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-700 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Blitzy anything..."
            style={{
              '::placeholder': { color: '#9ca3af' }
            }}
            className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white outline-none"
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button 
            onClick={handleSendMessage} 
            disabled={loading || !message.trim()}
            style={{
              backgroundColor: loading || !message.trim() ? '#6b7280' : '#dc2626',
              opacity: loading || !message.trim() ? 0.5 : 1,
              cursor: loading || !message.trim() ? 'not-allowed' : 'pointer'
            }}
            className="bg-red-600 border-none rounded px-2 py-2 text-white cursor-pointer transition-colors"
            onMouseEnter={(e) => {
              if (!loading && message.trim()) {
                e.target.style.backgroundColor = '#b91c1c';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && message.trim()) {
                e.target.style.backgroundColor = '#dc2626';
              }
            }}
          >
            <svg className="w-[1rem] h-[1rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22,2 15,22 11,13 2,9 22,2"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-gray-800 border-2 border-red-600 rounded-lg p-4 cursor-pointer transition-colors"
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#374151';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#1f2937';
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 
            className="text-[1.125rem] font-bold text-white mb-[0.25rem]">
            Need tips? Ask Blitzy!
          </h3>
        </div>
        <div 
            className="w-[3rem] h-[3rem] rounded-[50%] overflow-hidden border-[2px] border-[#fbbf24]">
          <img 
            src="/placeholder.svg?height=48&width=48&text=Blitz" 
            alt="Blitzcrank" 
            className="w-full h-full object-cover shadow-[0_0_12px_#fbbf2460]"
          />
        </div>
      </div>
    </div>
  );
};

export default AskBlitzy;
