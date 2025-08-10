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

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} font-sans`}>
      <Header 
        onLogout={handleLogout} 
        onThemeChange={handleThemeChange} 
        currentTheme={theme}
        theme={theme}
      />

      <div className="flex-1 max-w-[80rem] mx-auto p-4 flex flex-col min-h-0 w-full">
        <div className="flex items-center gap-4 mb-4 shrink-0">
          <div className="w-12 h-12 rounded-full border-4 border-red-600 overflow-hidden">
            <img 
              src={user.profileIcon || "/placeholder.svg"} 
              alt="Summoner Icon" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <h1 
              className={`text-[1.25rem] font-bold ${theme === "dark" ? '#ffffff' : '#1f2937'}`}>
              Welcome, {user.username}
            </h1>
          </div>
        </div>

        <div className="flex-1 grid gap-4 min-h-0 grid-cols-1 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col min-h-0 col-auto lg:col-[1]">
            <MatchHistory theme={theme} />
          </div>
          <div className="flex flex-col gap-4 h-fit col-auto lg:col-[2]">
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
