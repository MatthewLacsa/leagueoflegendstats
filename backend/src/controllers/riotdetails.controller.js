import { getUserInfo, takeSummonerProfile, takeSummonerMatches, takeMatchInfo} from "../services/riotAPI.js";

export async function getInfo(req, res) {

    const {username, gametag} = req.query;
    
    try{
        if (!gametag || !username) {
            return res.status(400).json({message: "Gametag and Username are both required."})
        }
        const info = await getUserInfo(username, gametag);
        const userProfile = await takeSummonerProfile(info.puuid)
        res.status(200).json({
           gamerTag: info,
           profile: userProfile
        }
            
        )
    } catch (error) {
        console.log("Error in getInfo", error.message);

        res.status(500).json({ message: "Error in getInfo"
        })
        
    }
    
}

export async function getMatchesInfo(req, res) {

    const {username, gametag} = req.query;
 
    
    try { 
         if (!username || !gametag) {
            console.log('Missing username or gametag'); // DEBUG
            return res.status(400).json({ message: "Username and gametag are required." });
        }

        // 1. Get user info and handle potential null response
        const userInfo = await getUserInfo(username, gametag);
        console.log('User info from Riot API:', userInfo); // DEBUG
        
        if (!userInfo) {
            console.log('User info is null'); // DEBUG
            return res.status(404).json({ message: "User not found. Please check the username and gametag." });
        }

        const puuid = userInfo.puuid;

        if(!puuid) {
            return res.status(400).json({message: "PUUID is required."})
        }
        const matches = await takeSummonerMatches(puuid);
        const selectedMatches = matches.slice(0,9);
        const matchesInfo = await Promise.all(selectedMatches.map(match => 
            takeMatchInfo(match)
        ))
        const simplifiedMatches = matchesInfo.map(match => {
            const playerPp = match.info.participants.find(p => p.puuid === puuid);

            if(!playerPp) {
                return null
            }

            let durationSeconds;
            if(match.info.gameEndStamp) {
                durationSeconds = (match.info.gameEndTimestamp - match.info.gameStartTimestamp) / 1000;

            } else {
                durationSeconds = match.info.gameDuration > 3600 ? match.info.gameDuration / 1000 : match.info.gameDuration;
            }
            const itemIds= [
                playerPp.item0,
                playerPp.item1,
                playerPp.item2,
                playerPp.item3,
                playerPp.item4,
                playerPp.item5,
                playerPp.item6, //ward
            ].filter(itemId => itemId !== 0); //no empty slots
            const gameVersion = match.info.gameVersion.split('.').slice(0, 2).join('.') //gamevers
            const itemIcons = itemIds.map(itemId => {
                return {
                    id: itemId,
                    iconUrl: `https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/item/${itemId}.png`
                };
            });

            return {
                metadata: {
                    matchId: match.metadata.matchId,
                    date: new Date(match.info.gameStartTimestamp).toISOString(),
                    mode: match.info.gameMode,
                    duration: Math.round(durationSeconds),
                    gameVersion: gameVersion,
                },
                player: {
                    win: playerPp.win,
                    championName: playerPp.championName,
                    champLevel: playerPp.champLevel,
                    kills: playerPp.kills,
                    deaths: playerPp.deaths,
                    assists: playerPp.assists,
                    totalCs: playerPp.totalMinionsKilled + playerPp.neutralMinionsKilled,
                    goldEarned: playerPp.goldEarned,
                    visionScore: playerPp.visionScore,
                    items: itemIcons, // Add the array of items with their URLs
                    // Optional: Also include the raw IDs if needed
                    itemIds: itemIds
                }
            };
        }).filter(match => match !== null);
        res.status(200).json(simplifiedMatches);
    } catch (error) {
        console.log("Error in getMatchInfo", error.message);
        res.status(500).json({ message: "Error in getMatchInfo"
});
    }
}