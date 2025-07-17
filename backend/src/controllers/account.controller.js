import { getUserInfo, takeSummonerProfile} from "../services/riotAPI.js";

export async function getInfo(req, res) {

    const {username, gametag} = req.query;
    
    try{
        if (!gametag || !username) {
            return res.status(400).json({message: "fill username and gametag"})
        }
        const info = await getUserInfo(username, gametag);
        const userInfo = await takeSummonerProfile(info.puuid);
        res.status(201).json(userInfo)
    } catch (error) {
        console.log("Error in getInfo");
        res.status(500).json({ message: "error in getInfo"})
    }
    
}