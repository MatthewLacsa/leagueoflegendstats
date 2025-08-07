import { useState, useEffect } from "react";

const StatsPanel = () => {
  const [stats] = useState({
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

  const containerStyles = {
    backgroundColor: '#1f2937',
    border: '2px solid #dc2626',
    borderRadius: '0.5rem',
    padding: '1rem'
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem'
  };

  const statItemStyles = {
    textAlign: 'center',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    transition: 'background-color 0.2s'
  };

  const iconStyles = {
    width: '3rem',
    height: '3rem',
    margin: '0 auto 0.5rem'
  };

  const valueStyles = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.25rem',
    margin: '0 0 0.25rem 0'
  };

  const labelStyles = {
    color: '#9ca3af',
    fontSize: '0.75rem',
    margin: 0
  };

  return (
    <div style={containerStyles}>
      <div style={gridStyles}>
        {statItems.map((stat, index) => (
          <div 
            key={index} 
            style={statItemStyles}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <div style={iconStyles}>
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
            <div style={{
              ...valueStyles,
              textShadow: `0 0 10px ${stat.color}60`
            }}>
              {stat.value}
            </div>
            <div style={labelStyles}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;
