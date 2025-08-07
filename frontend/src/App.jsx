import { useState } from "react";
import Header from "./components/Header.jsx";
import MatchHistory from "./components/MatchHistory.jsx";
import StatsPanel from "./components/StatsPanel.jsx";
import AskBlitzy from "./components/AskBlitzy.jsx";

function App() {
  const [theme, setTheme] = useState("dark");
  const [showBlitzyChat, setShowBlitzyChat] = useState(false);
  const [user, setUser] = useState({
    username: "Etheriouss#6171",
    profileIcon: "/placeholder.svg?height=48&width=48"
  });

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
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
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
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
    gridTemplateColumns: '1fr',
    gap: '1rem',
    minHeight: 0
  };

  // Responsive grid
  if (window.innerWidth >= 1024) {
    gridStyles.gridTemplateColumns = '2fr 1fr';
  }

  const matchHistoryStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0
  };

  const sidebarStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: 'fit-content'
  };

  return (
    <div style={appStyles}>
      <Header 
        onLogout={handleLogout} 
        onThemeChange={handleThemeChange} 
        currentTheme={theme} 
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
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
              Welcome, {user.username}
            </h1>
          </div>
        </div>

        <div style={gridStyles}>
          <div style={matchHistoryStyles}>
            <MatchHistory />
          </div>
          <div style={sidebarStyles}>
            <StatsPanel />
            <AskBlitzy
              onClick={() => setShowBlitzyChat(true)}
              isOpen={showBlitzyChat}
              onClose={() => setShowBlitzyChat(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
