import { useState, useEffect } from "react";

const MatchHistory = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch('/api/matches', {
        credentials: 'include'
      });
      const data = await response.json();
      setMatches(data.matches || []);
    } catch (error) {
      console.error('Failed to fetch matches:', error);
      setMatches(generateMockMatches());
    } finally {
      setLoading(false);
    }
  };

  const generateMockMatches = () => {
    return Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      result: Math.random() > 0.5 ? "VICTORY" : "DEFEAT",
      mode: "Ranked Solo/Duo",
      champion: "Kai'Sa",
      level: Math.floor(Math.random() * 10) + 10,
      kda: `${Math.floor(Math.random() * 20)}/${Math.floor(Math.random() * 10)}/${Math.floor(Math.random() * 15)}`,
      cs: Math.floor(Math.random() * 200) + 100,
      gold: (Math.floor(Math.random() * 10000) + 10000).toLocaleString(),
      duration: `${Math.floor(Math.random() * 20) + 20}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      date: "07/14/2025",
      items: Array.from({ length: 6 }, () => "/placeholder.svg?height=32&width=32")
    }));
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    height: '100%'
  };

  const titleStyles = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.75rem',
    flexShrink: 0,
    margin: '0 0 0.75rem 0'
  };

  const loadingStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '12rem',
    color: '#9ca3af'
  };

  const matchesContainerStyles = {
    flex: 1,
    overflowY: 'auto',
    paddingRight: '0.5rem',
    scrollbarWidth: 'thin',
    scrollbarColor: '#dc2626 #374151'
  };

  const matchCardStyles = {
    backgroundColor: '#1f2937',
    border: '2px solid #dc2626',
    borderRadius: '0.5rem',
    padding: '0.75rem',
    marginBottom: '0.5rem',
    flexShrink: 0,
    transition: 'background-color 0.2s'
  };

  if (loading) {
    return (
      <div style={containerStyles}>
        <h2 style={titleStyles}>Here are your last 20 games:</h2>
        <div style={loadingStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div 
              style={{
                width: '1.5rem',
                height: '1.5rem',
                border: '2px solid #dc2626',
                borderTop: '2px solid transparent',
                borderRadius: '50%'
              }}
              className="animate-spin"
            ></div>
            Loading matches...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      <h2 style={titleStyles}>Here are your last 20 games:</h2>
      <div style={matchesContainerStyles}>
        {matches.map((match) => (
          <div 
            key={match.id} 
            style={matchCardStyles}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#1f2937';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid #4b5563'
                  }}>
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Champion"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{
                    backgroundColor: '#374151',
                    borderRadius: '0.25rem',
                    padding: '0.125rem 0.375rem',
                    fontSize: '0.75rem',
                    color: 'white'
                  }}>
                    {match.level}
                  </div>
                </div>

                <div>
                  <div style={{
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                    color: match.result === 'VICTORY' ? '#22d3ee' : '#f87171'
                  }}>
                    {match.result}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                    {match.mode}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {match.items.map((itemSrc, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        backgroundColor: '#374151',
                        borderRadius: '0.25rem',
                        border: '1px solid #4b5563'
                      }}
                    >
                      <img
                        src={itemSrc || "/placeholder.svg"}
                        alt="Item"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.25rem' }}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  {match.kda}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  {match.cs} CS
                </div>
                <div style={{ color: '#fbbf24', fontSize: '0.875rem' }}>
                  {match.gold}g
                </div>
              </div>

              <div style={{ textAlign: 'right', color: '#9ca3af', fontSize: '0.75rem' }}>
                <div>Summoner's Rift</div>
                <div>
                  {match.duration} • {match.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchHistory;
