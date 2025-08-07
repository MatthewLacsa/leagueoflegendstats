import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import MatchHistory from "./components/MatchHistory.jsx";
import StatsPanel from "./components/StatsPanel.jsx";
import AskBlitzy from "./components/AskBlitzy.jsx";

function App() {
  const [theme, setTheme] = useState("dark");
  const [showBlitzyChat, setShowBlitzyChat] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [user, setUser] = useState({
    username: "Etheriouss#6171",
    profileIcon: "/placeholder.svg?height=48&width=48"
  });

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        setUser(null);
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const appStyles = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme === "dark" ? '#111827' : '#f3f4f6',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    color: theme === "dark" ? '#ffffff' : '#1f2937'
  };

  const containerStyles = {
    flex: 1,
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    width: '100%'
  };

  const welcomeStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    flexShrink: 0
  };

  const profileIconStyles = {
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    border: '4px solid #dc2626',
    overflow: 'hidden'
  };

  const gridStyles = {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: isLargeScreen ? '2fr 1fr' : '1fr',
    gap: '1rem',
    minHeight: 0
  };

  const matchHistoryStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    gridColumn: isLargeScreen ? '1' : 'auto'
  };

  const sidebarStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: 'fit-content',
    gridColumn: isLargeScreen ? '2' : 'auto'
  };

  return (
    <div style={appStyles}>
      <Header 
        onLogout={handleLogout} 
        onThemeChange={handleThemeChange} 
        currentTheme={theme}
        theme={theme}
      />

      <div style={containerStyles}>
        <div style={welcomeStyles}>
          <div style={profileIconStyles}>
            <img 
              src={user.profileIcon || "/placeholder.svg"} 
              alt="Summoner Icon" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <h1 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: theme === "dark" ? '#ffffff' : '#1f2937', 
              margin: 0 
            }}>
              Welcome, {user.username}
            </h1>
          </div>
        </div>

        <div style={gridStyles}>
          <div style={matchHistoryStyles}>
            <MatchHistory theme={theme} />
          </div>
          <div style={sidebarStyles}>
            <StatsPanel theme={theme} />
            <AskBlitzy
              onClick={() => setShowBlitzyChat(true)}
              isOpen={showBlitzyChat}
              onClose={() => setShowBlitzyChat(false)}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
