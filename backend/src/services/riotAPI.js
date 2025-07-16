import axios from 'axios';
import {config} from 'dotenv'
config();

const API_KEY = process.env.RIOT_API_KEY;
const BASE_URL = "https://na1.api.riotgames.com";

export async function takeUsersPuuid(username, gametag) {
   const response = await axios.get(`{BASE_URL}/riot/account/v1/accounts/by-riot-id/{username}/{gametag}`, {
    headers: {
        'X-Riot-Token': API_KEY
    }
   })

}

export async function takeUsersInfo(puuid) {


}