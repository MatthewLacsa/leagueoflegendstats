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

  const modalStyles = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    width: '24rem',
    height: '24rem',
    backgroundColor: '#1f2937',
    border: '2px solid #dc2626',
    borderRadius: '0.5rem',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(220, 38, 38, 0.1)'
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    borderBottom: '1px solid #374151'
  };

  const messagesStyles = {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    scrollbarWidth: 'thin',
    scrollbarColor: '#dc2626 #374151'
  };

  const inputContainerStyles = {
    padding: '1rem',
    borderTop: '1px solid #374151',
    display: 'flex',
    gap: '0.5rem'
  };

  const inputStyles = {
    flex: 1,
    backgroundColor: '#374151',
    border: '1px solid #4b5563',
    borderRadius: '0.25rem',
    padding: '0.5rem 0.75rem',
    color: '#ffffff',
    outline: 'none'
  };

  const buttonStyles = {
    backgroundColor: '#dc2626',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const cardStyles = {
    backgroundColor: '#1f2937',
    border: '2px solid #dc2626',
    borderRadius: '0.5rem',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  if (isOpen) {
    return (
      <div style={modalStyles}>
        <div style={headerStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', overflow: 'hidden' }}>
              <img 
                src="/placeholder.svg?height=32&width=32&text=Blitz" 
                alt="Blitzcrank" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'drop-shadow(0 0 8px #fbbf2460)'
                }}
              />
            </div>
            <span style={{ color: '#ffffff', fontWeight: 'bold' }}>
              Ask Blitzy
            </span>
          </div>
          <button 
            style={{
              color: '#9ca3af',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0.25rem',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
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
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div style={messagesStyles}>
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
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                maxWidth: '75%',
                backgroundColor: msg.isUser ? '#dc2626' : '#374151',
                color: '#ffffff',
                marginLeft: msg.isUser ? 'auto' : '0'
              }}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              maxWidth: '75%',
              backgroundColor: '#374151',
              color: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="animate-pulse">💭</div>
                <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                  Blitzy is thinking...
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div style={inputContainerStyles}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Blitzy anything..."
            style={{
              ...inputStyles,
              '::placeholder': { color: '#9ca3af' }
            }}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button 
            onClick={handleSendMessage} 
            disabled={loading || !message.trim()}
            style={{
              ...buttonStyles,
              backgroundColor: loading || !message.trim() ? '#6b7280' : '#dc2626',
              opacity: loading || !message.trim() ? 0.5 : 1,
              cursor: loading || !message.trim() ? 'not-allowed' : 'pointer'
            }}
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
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      style={cardStyles}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#374151';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#1f2937';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 'bold', 
            color: '#ffffff', 
            marginBottom: '0.25rem',
            margin: '0 0 0.25rem 0'
          }}>
            Need tips? Ask Blitzy!
          </h3>
        </div>
        <div style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid #fbbf24'
        }}>
          <img 
            src="/placeholder.svg?height=48&width=48&text=Blitz" 
            alt="Blitzcrank" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'drop-shadow(0 0 12px #fbbf2460)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AskBlitzy;
