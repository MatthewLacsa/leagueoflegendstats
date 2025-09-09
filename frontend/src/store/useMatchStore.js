import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
export const useMatchStore = create((set, get) => ({
  matches: [],
  loading: false,
  error: null,
  fetchMatches: async (username, gametag) => {
    if(get().loading) return;

    set({ loading: true, error: null});

    try {
        const res = await axiosInstance.get('/riotdetails/matches', {
            params: {username, gametag}
        });
        
        set({
            matches: res.data,
            loading: false
        });
    } catch (error) {
        console.log("Error fetching matches", error);

        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch matches';

        set({
            error: errorMessage,
            loading: false,
            matches: []
        })
    }
  }
}))

