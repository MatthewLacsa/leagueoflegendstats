import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Inline base styles - completely self-contained
const baseStyles = `
  *, ::before, ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
  }
  
  html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    tab-size: 4;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  }
  
  body {
    margin: 0;
    line-height: inherit;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #374151;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #dc2626;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #b91c1c;
  }
  
  /* Animations */
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.textContent = baseStyles;
document.head.appendChild(styleElement);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
