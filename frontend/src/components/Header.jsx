import { useState } from "react";

const Header = ({ onLogout, onThemeChange, currentTheme }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const headerStyles = {
    background: 'linear-gradient(to right, #7f1d1d, #991b1b)',
    borderBottom: '4px solid #dc2626',
    flexShrink: 0
  };

  const containerStyles = {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem'
  };

  const brandStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const logoStyles = {
    width: '3rem',
    height: '3rem',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const logoCircleStyles = {
    width: '2rem',
    height: '2rem',
    backgroundColor: '#dc2626',
    borderRadius: '50%'
  };

  const titleStyles = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0
  };

  const subtitleStyles = {
    fontSize: '0.875rem',
    color: '#fecaca',
    margin: 0
  };

  const dropdownContainerStyles = {
    position: 'relative'
  };

  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.375rem',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  };

  const dropdownStyles = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '0.25rem',
    width: '12rem',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '0.375rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    zIndex: 50,
    overflow: 'hidden'
  };

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
    <header style={headerStyles}>
      <div style={containerStyles}>
        <div style={brandStyles}>
          <div style={logoStyles}>
            <div style={logoCircleStyles}></div>
          </div>
          <div>
            <h1 style={titleStyles}>Zaunite Strats</h1>
            <p style={subtitleStyles}>Your League of Legends Stats and Tips</p>
          </div>
        </div>

        <div style={dropdownContainerStyles}>
          <button 
            style={{
              ...buttonStyles,
              backgroundColor: showDropdown ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'
            }}
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
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
            Settings
            <svg 
              style={{ 
                width: '1rem', 
                height: '1rem',
                transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </button>
          
          {showDropdown && (
            <div style={dropdownStyles}>
              <button 
                onClick={() => {
                  onLogout();
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
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
