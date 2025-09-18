import { useState, useEffect } from "react";
import { useMatchStore } from "../store/useMatchStore";
const StatsPanel = ({username, gametag}) => {
  const { matches, loading, fetchMatches } = useMatchStore();
  useEffect(() => {
    if (username && gametag) {
      fetchMatches(username, gametag);
    }
  }, [username, gametag, fetchMatches]);
  const [stats, setStats] = useState({
    kdaRatio: "5.0",
    killParticipation: "100%",
    csPerMatch: "330",
    visionScore: "32",
    csPerMinute: "16"
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats', {
        credentials: 'include'
      });
      const data = await response.json();
      setStats(data.stats || stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const statItems = [
    {
      value: stats.kdaRatio,
      label: "KDA Ratio",
      icon: "/placeholder.svg?height=64&width=64&text=KDA",
      color: "#22d3ee"
    },
    {
      value: stats.killParticipation,
      label: "KP",
      icon: "/placeholder.svg?height=64&width=64&text=KP",
      color: "#a78bfa"
    },
    {
      value: stats.csPerMatch,
      label: "CS/Match",
      icon: "/placeholder.svg?height=64&width=64&text=CS",
      color: "#fbbf24"
    },
    {
      value: stats.visionScore,
      label: "Vision Score",
      icon: "/placeholder.svg?height=64&width=64&text=Vision",
      color: "#34d399"
    },
    {
      value: stats.csPerMinute,
      label: "CS/Minute",
      icon: "/placeholder.svg?height=64&width=64&text=CSM",
      color: "#fb7185"
    },
  ];

  return (
    <div className="bg-[#1f2937] border-[2px] border-[#dc2626] rounded-[0.5rem] p-[1rem]">
      <div className="grid grid-cols-2 gap-[1rem]">
        {statItems.map((stat, index) => (
          <div 
            key={index} 
            className="text-center p-[0.5rem] rounded-[0.5rem] transition-colors duration-200"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <div className="w-[3rem] h-[3rem] mx-auto mb-[0.5rem]">
              <img
                src={stat.icon || "/placeholder.svg"}
                alt={stat.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '0.25rem',
                  filter: `drop-shadow(0 0 8px ${stat.color}40)`
                }}
              />
            </div>
            <div 
            className="text-[1.5rem] font-bold text-[#ffffff] mb-[0.25rem]"
            style={{
              textShadow: `0 0 10px ${stat.color}60`
            }}>
              {stat.value}
            </div>
            <div className="text-[#9ca3af] text-[0.75rem] m-0">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;
