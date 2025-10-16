const leagueId = '152';
const countryId = '44'; // England
const apiKey = 'd333bfc0c5e651599c25e342366f951d15e037ebd5b039b5126b605b9a8ba8dd';
const apiUrl = `https://apiv2.allsportsapi.com/football/?met=Teams&leagueId=${leagueId}&APIkey=${apiKey}`;
const liveurl = `https://apiv2.allsportsapi.com/football/?met=Livescore&countryId=${countryId}&APIkey=${apiKey}`;

function getPlayers() {
    fetch(apiUrl)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            const teams = data.result;
            const allPlayers = [];

            teams.forEach(team => {
                if (team.players) {
                    team.players.forEach(p => {
                        allPlayers.push({
                            name: p.player_name,
                            position: p.player_type,
                            goals: p.player_goals || 0,
                            assists: p.player_assists || 0,
                            apps: p.player_match_played || 0,
                            image: p.player_image,
                            team: team.team_name,
                            teamLogo: team.team_logo,
                            yellowCards: p.player_yellow_cards || 0,
                            redCards: p.player_red_cards || 0
                        });
                    });
                }
            });

            displayPlayers(allPlayers);
        })
        .catch((error) => {
            console.error("Error fetching players:", error);
            playersGrid.innerHTML = `<p>Error loading data.</p>`;
        });
}

function displayPlayers(players) {
    playersGrid.innerHTML = players.map(p => `
        <div class="player-card">
            <img class="player-img" src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <span class="position ${p.position?.toLowerCase() || ''}">${p.position}</span>
            <div class="team-info">
                <img class="team-logo" src="${p.teamLogo}" alt="${p.team}" />
                <span class="team-name">${p.team}</span>
            </div>
            <div class="stats">
                <div><i class="fa-solid fa-futbol"></i> Goals: ${p.goals}</div>
                <div><i class="fa-solid fa-handshake"></i> Assists: ${p.assists}</div>
                <div><i class="fa-solid fa-chart-line"></i> Matches: ${p.apps}</div>
            </div>
            <div class="cards">
                <span class="yellow-card">🟨 ${p.yellowCards}</span>
                <span class="red-card">🟥 ${p.redCards}</span>
            </div>
        </div>
    `).join('');
}

getPlayers();
