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

  
  if (loading) {
    return (
      <div className="flex flex-col min-h-0 h-full">
        <h2 className="text-[1.125rem] font-bold text-[#ffffff] mb-[0.75rem] shrink-0">Here are your last 20 games:</h2>
        <div className="flex items-center justify-center h-[12rem] text-[#9ca3afWW]">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div 
             
              className="animate-spin w-[1.5rem] h-[1.5rem] border-[2px] border-[#dc2626] border-t-transparent rounded-[50%]"
            ></div>
            Loading matches...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-0 h-full">
      <h2 className="text-[1.125rem] font-bold text-[#ffffff] mb-[0.75rem] shrink-0">Here are your last 20 games:</h2>
      <div className="flex-1 overflow-y-auto pr-[0.5rem] scrollbar-thin scrollbar-thumb-[#dc2626] scrollbar-track-[#374151]">
        {matches.map((match) => (
          <div 
            key={match.id} 
            className="bg-[#1f2937] border-[2px] border-[#dc2626] rounded-[0.5rem] p-[0.75rem] mb-[0.5rem] shrink-0 transition-colors"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#1f2937';
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-2 items-center">
                  <div className="w-[2.5rem] h-[2.5rem] rounded-[50%] overflow-hidden border-[2px] border-[#4b5563]">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Champion"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div 
                    className="bg-[#374151] rounded-[0.25rem] px-[0.375rem] py-[0.125rem] text-[0.75rem] text-white ">
                    {match.level}
                  </div>
                </div>

                <div>
                  <div className={`font-bold text-[0.875rem] ${match.result === 'VICTORY' ? 'text-[#22d3ee]' : 'text-[#f87171]'}`}>
                    {match.result}
                  </div>
                  <div className="text-[#9ca3af] text-[0.75rem]">
                    {match.mode}
                  </div>
                </div>

                <div className="flex gap-[0.25rem]">
                  {match.items.map((itemSrc, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className="w-[1.5rem] h-[1.5rem] bg-[#374151] rounded-[0.25rem] border-[1px] border-[#4b5563]"
                    >
                      <img
                        src={itemSrc || "/placeholder.svg"}
                        alt="Item"
                        className="w-full h-full object-cover rounded-[0.25rem]"
                      />
                    </div>
                  ))}
                </div>

                <div className="text-[#ffffff] font-bold text-[0.875rem]">
                  {match.kda}
                </div>
                <div className="text-[#9ca3af] text-[0.875rem]">
                  {match.cs} CS
                </div>
                <div className="text-[#fbbf24] text-[0.875rem]">
                  {match.gold}g
                </div>
              </div>

              <div className="text-right text-[#9ca3af] text-[0.75rem]">
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
