import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const BASE_URL = "https://americas.api.riotgames.com";
const PLATFORM_URL = "https://na1.api.riotgames.com"
const API_KEY = process.env.RIOT_API_KEY;


export async function getUserInfo(username, gametag) {
    try {
        const response = await axios.get(`${BASE_URL}/riot/account/v1/accounts/by-riot-id/${username}/${gametag}`, {
            headers: {
                'X-Riot-Token': API_KEY
            }
        })
        return response.data
    } catch (error) {
        if(error.response && error.response.status === 404) {
            return null;
        } else {
            throw new Error("Failed to fetch getUserInfo")
        }
    }
   
}


export async function takeSummonerProfile(puuid) {
    try {
        const response = await axios.get(`${PLATFORM_URL}/lol/summoner/v4/summoners/by-puuid/${puuid}`, {   
            headers: {
                'X-Riot-Token':  API_KEY
            }
        })
        return response.data  
    } catch (error) {
         if(error.response && error.response.status === 404) {
            return null;
        } else {
            throw new Error("Failed to fetch takeSummonerProfile")
        }
    }
}

export async function takeSummonerMatches(puuid) {
    try {
        const response = await axios.get(`${BASE_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`, {   
            headers: {
                'X-Riot-Token': API_KEY
            },
        })
        return response.data   
    } catch (error) {
        if(error.response && error.response.status === 404) {
            return null;
        } else {
            throw new Error("Failed to fetch takeSummonerMatches")
        }
    }
    
}

export async function takeMatchInfo(matchId) {
    try {
        const response = await axios.get(`${BASE_URL}/lol/match/v5/matches/${matchId}`, {   
            headers: {
                'X-Riot-Token': API_KEY
            }
        })
        return response.data  
    } catch (error) {
         if(error.response && error.response.status === 404) {
            return null;
        } else {
            throw new Error("Failed to fetch takeMatchInfo")
        }
    }
    
}