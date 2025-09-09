import { useState, useEffect } from "react";
import { useMatchStore } from "../store/useMatchStore";

const MatchHistory = ({username, gametag}) => {
  const { matches, loading, fetchMatches } = useMatchStore();


  useEffect(() => {
    if (username && gametag) {
      fetchMatches(username, gametag);
    }
  }, [username, gametag, fetchMatches]);

  // Helper function to format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Helper function to format date from ISO string
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString();
  };

  
  if (loading) {
    return (
      <div className="flex flex-col min-h-0 h-full">
        <h2 className="text-[1.125rem] font-bold text-[#ffffff] mb-[0.75rem] shrink-0">Here are your last {matches.length} games:</h2>
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
            key={match.metadata.matchId} 
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
                    {match.player.champLevel}
                  </div>
                </div>

                <div>
                  <div className={`font-bold text-[0.875rem] ${match.player.win ? 'text-[#22d3ee]' : 'text-[#f87171]'}`}>
                    {match.player.win ? 'VICTORY' : 'DEFEAT'}
                  </div>
                  <div className="text-[#9ca3af] text-[0.75rem]">
                    {match.metadata.mode}
                  </div>
                </div>

                <div className="flex gap-[0.25rem]">
                  {match.player.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className="w-[1.5rem] h-[1.5rem] bg-[#374151] rounded-[0.25rem] border-[1px] border-[#4b5563]"
                    >
                      <img
                        src={item.iconUrl}
                        alt={`Item ${item.id}`}
                        className="w-full h-full object-cover rounded-[0.25rem]"
                      />
                    </div>
                  ))}
                </div>

                <div className="text-[#ffffff] font-bold text-[0.875rem]">
                 {match.player.kills}/{match.player.deaths}/{match.player.assists}
                </div>
                <div className="text-[#9ca3af] text-[0.875rem]">
                  {match.player.totalCs} CS
                </div>
                <div className="text-[#fbbf24] text-[0.875rem]">
                  {match.player.goldEarned.toLocaleString()}g
                </div>
              </div>

              <div className="text-right text-[#9ca3af] text-[0.75rem]">
                <div>Summoner's Rift</div>
                <div>
                  {formatDuration(match.metadata.duration)} • {formatDate(match.metadata.date)}
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
