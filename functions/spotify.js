import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

exports.handler = async (event, context) => {
    // Get the refresh token stored as an environment variable
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    // Do the base64 encoding but with Node tools
    const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");

    // Store the Spotify API endpoint for readability
    const tokenEndpoint = `https://accounts.spotify.com/api/token`;

    const playerEndpoint = `https://api.spotify.com/v1/me/player/recently-played`;

    const options = {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}&redirect_uri=${encodeURI(
            process.env.URL,
            +"/.netlify/functions/callback"
        )}`,
    };
    const accessToken = await fetch(tokenEndpoint, options)
        .then((res) => res.json())
        .then((json) => {
            return json.access_token;
        })
        .catch((err) => {
            console.err(err);
        });

    // That `?limit=1` part is because we only want the API to return a single song.
    return fetch(`${playerEndpoint}?limit=1`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((res) => (res.json()))
        .then(({ items }) => {
            // Let's do a little more destructuring assignment to take only what we need from the response
            const {
                artists: artistsArray,
                name,
                external_urls: urls,
                album,
            } = items[0].track;
            console.log(items);
            // We want to keep the array of artists in case there's a track feature, etc.
            const simplifiedArtists = artistsArray.map((artist) => ({
                name: artist.name,
                url: artist.href,
            }));
            // Lastly, make the url/artwork references more specific
            const trackUrl = urls.spotify;
            const artworkUrl = album.images[1].url;

            // And then return a stringified object that contains all the data we want to render!
            return {
                statusCode: 200,
                body: JSON.stringify({
                    artists: simplifiedArtists,
                    name,
                    trackUrl,
                    artworkUrl,
                }),
            };

        });

}