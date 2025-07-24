import axios from 'axios';

const API_KEY = process.env.RIOT_API_KEY;
const BASE_URL = "https://americas.api.riotgames.com";
const PLATFORM_URL = "https://na1.api.riotgames.com"

export async function getUserInfo(username, gametag) {
   const response = await axios.get(`${BASE_URL}/riot/account/v1/accounts/by-riot-id/${username}/${gametag}`, {
    headers: {
        'X-Riot-Token': API_KEY
    }
   })
   return response.data
}


export async function takeSummonerProfile(puuid) {
    const response = await axios.get(`${PLATFORM_URL}/lol/summoner/v4/summoners/by-puuid/${puuid}`, {   
        headers: {
            'X-Riot-Token': API_KEY
        }
    })
    return response.data
}

export async function takeSummonerMatches(puuid) {
    const response = await axios.get(`${BASE_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`, {   
        headers: {
            'X-Riot-Token': API_KEY
        }
    })
    return response.data
}

export async function takeMatchInfo(matchId) {
    const response = await axios.get(`${BASE_URL}/lol/match/v5/matches/${matchId}`, {   
        headers: {
            'X-Riot-Token': API_KEY
        }
    })
    return response.data
}