const accessToken = "0c905f688f684dc592fbfe237f017ade";

async function fetchSpotifyData(endpoint) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/top/${endpoint}?limit=5&time_range=short_term`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });

        if (!response.ok) {
            console.error("Failed to fetch data:", response.statusText);
            return {};
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return {};
    }
}

async function displaySpotifyStats() {
    try {
        const artistsData = await fetchSpotifyData("artists");
        const tracksData = await fetchSpotifyData("tracks");

        // Top Artists
        const artistList = document.getElementById("top-artists");
        artistsData.items.forEach(artist => {
            const li = document.createElement("li");
            li.innerHTML = `<img src="${artist.images[0]?.url}" alt="Artist Image"> ${artist.name}`;
            artistList.appendChild(li);
        });

        // Top Tracks
        const trackList = document.getElementById("top-tracks");
        tracksData.items.forEach(track => {
            const li = document.createElement("li");
            li.textContent = `${track.name} - ${track.artists.map(a => a.name).join(", ")}`;
            trackList.appendChild(li);
        });

        // Most Played Genres
        const genreCounts = {};
        artistsData.items.forEach(artist => {
            artist.genres.forEach(genre => {
                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            });
        });

        const sortedGenres = Object.entries(genreCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(g => g[0]);

        const genreList = document.getElementById("top-genres");
        sortedGenres.forEach(genre => {
            const li = document.createElement("li");
            li.textContent = genre;
            genreList.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

displaySpotifyStats();
