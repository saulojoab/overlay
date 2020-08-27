import api from './../api';

export default {
    async getCurrentSong () {
        const url = `${api}/spotify/current`;

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${process.env.SPOTIFY_TOKEN}`
            }
        })

        return res;
    }
}