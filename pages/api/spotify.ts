import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Session } from "next-auth";

const API_URL: string = "https://api.spotify.com";
const API_VERSION: string = "v1";

const AVAILABLE_GENRES_ENDP = "recommendations/available-genre-seeds";

const getUserSearches = async (session: Session, query: string): Promise<SpotifyApi.SearchResponse | undefined> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${API_URL}/${API_VERSION}/search`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Accept-Encoding": "application/json",
            },
            params: {
                q: `remaster%20track:${query}artist:${query}`,
                type: "track,artist",
                market: "JP",
                limit: 10,
                offset: 0,
            }
        }

        const res = await axios(config);
        if (res.status === 200) {
            return res.data;
        }
        throw res;
    } catch (error: any) {
        const { response: { data: { error: { status, message } } } } = error ?? {};
        console.error("Problem getting searches", message);
        return undefined;
    }
}

const getAvailableGenres = async (session: Session): Promise<SpotifyApi.AvailableGenreSeedsResponse | undefined> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${API_URL}/${API_VERSION}/${AVAILABLE_GENRES_ENDP}`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Accept-Encoding": "application/json",
            },
        }
        const res = await axios(config);
        if (res.status === 200) {
            return res.data;
        }
        throw res;
    } catch (error: any) {
        const { response: { data: { error: { status, message } } } } = error;
        console.error("Problem getting available genres", message);
        return undefined;
    }
}
const getUserPlaylist = async (session: Session): Promise<SpotifyApi.ListOfUsersPlaylistsResponse | undefined> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${API_URL}/${API_VERSION}/me/playlists`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Accept-Encoding": "application/json",
            },
            params: {
                limit: 10,
                offset: 0,
            }
        }

        const res = await axios<SpotifyApi.ListOfUsersPlaylistsResponse>(config);
        if (res.status === 200) {
            return res.data;
        }
        throw res;
    } catch (error: any) {
        console.error("Problem getting user playlist");
        console.log(error);
        if (typeof error === "object") {
            const { response: { data: { error: { status, message } } } } = error;
            console.error(message);
        }
        return undefined;
    }
}

const getUserSavedTracks = async (session: Session): Promise<SpotifyApi.UsersSavedTracksResponse | undefined> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${API_URL}/${API_VERSION}/me/tracks`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
                "Accept-Encoding": "application/json",
            },
            params: {
                limit: 50,
                offset: 0,
            }
        };
        const res = await axios(config);
        if (res.status === 200) {
            return res.data;
        }
        throw res;
    } catch (error: any) {
        console.log(error);
        const { response: { data: { error: { status, message } } } } = error ?? {};
        console.error("Problem getting user saved tracks", message);
        return undefined;

    }
}


export { getUserPlaylist, getAvailableGenres, getUserSearches, getUserSavedTracks }