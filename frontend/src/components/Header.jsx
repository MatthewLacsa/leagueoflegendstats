import { useState } from "react";

const Header = ({ onLogout, onThemeChange, currentTheme }) => {
  const [showDropdown, setShowDropdown] = useState(false);



  const dropdownItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.5rem 0.75rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#374151',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
    textAlign: 'left'
  };

  return (
    <header className="shrink-0 border-b-[4px] border-[#dc2626] bg-[linear-gradient(to_right,_#7f1d1d,_#991b1b)]">
      <div className="max-w-[80rem] mx-auto px-[1rem] py-[0.75rem] flex items-center justify-between h-[4rem]">
        <div className="flex items-center gap-[1rem]">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-red-600 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white m-0">Zaunite Strats</h1>
            <p className="text-sm text-red-200 m-0">Your League of Legends Stats and Tips</p>
          </div>
        </div>

        <div className="relative">
          <button 
            style={{
              backgroundColor: showDropdown ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'
            }}
             className="flex items-center gap-2 px-4 py-2 text-white cursor-pointer transition-colors rounded-md bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] backdrop-blur-md"
            onClick={() => setShowDropdown(!showDropdown)}
            onMouseEnter={(e) => {
              if (!showDropdown) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showDropdown) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            <svg className="w-[1rem] h-[1rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
            Settings
            <svg 
              className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : 'rotate-0'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </button>
          
          {showDropdown && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
              <button 
                onClick={() => {
                  onLogout();
                  setShowDropdown(false);
                }} 
                className="flex items-center gap-2 w-full px-3 py-2 bg-transparent border-none text-gray-700 cursor-pointer transition-colors text-left"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <svg className="w-[1rem] h-[1rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
              <button 
                onClick={() => {
                  onThemeChange();
                  setShowDropdown(false);
                }} 
                style={dropdownItemStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <svg className="w-[1rem] h-[1rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                </svg>
                Theme ({currentTheme})
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
