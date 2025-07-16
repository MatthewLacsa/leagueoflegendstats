import axios from 'axios';
import {config} from 'dotenv'
config();

const API_KEY = process.env.RIOT_API_KEY;
const BASE_URL = "https://americas.api.riotgames.com";

export async function getPuuid(username, gametag) {
   const response = await axios.get(`${BASE_URL}/riot/account/v1/accounts/by-riot-id/${username}/${gametag}`, {
    headers: {
        'X-Riot-Token': API_KEY
    }
   })
   return response.data
}

export async function takeUsersInfo(puuid) {


}