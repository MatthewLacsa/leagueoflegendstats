import { getUserInfo, takeSummonerProfile, takeSummonerMatches, takeMatchInfo} from "../services/riotAPI.js";

export async function getInfo(req, res) {

    const {username, gametag} = req.query;
    
    try{
        if (!gametag || !username) {
            return res.status(400).json({message: "Gametag and Username are both required."})
        }
        const info = await getUserInfo(username, gametag);
        const userInfo = await takeSummonerProfile(info.puuid);
        res.status(200).json({
           gamerTag: info,
           profile: userInfo, 
        }
            
        )
    } catch (error) {
        console.log("Error in getInfo");
        res.status(500).json({ message: "Error in getInfo",
                               error: error.message
        })
    }
    
}

export async function getMatchesInfo(req, res) {
    const {puuid} = req.query;

    try {
        if(!puuid) {
            return res.status(400).json({message: "PUUID is required."})
        }
        const matches = await takeSummonerMatches(puuid);
        const matchesInfo = await Promise.all(matches.map(match => 
            takeMatchInfo(match)
        ))
        res.status(200).json(matchesInfo);
    } catch (error) {
        console.log("Error in getMatchInfo");
        res.status(500).json({ message: "Error in getMatchInfo",
                               error: error.message
        });
    }
}