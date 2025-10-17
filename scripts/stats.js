const apiKey = '1b0c32ca6aabf1f01925cfda0d2f137dd5c4933f4d721a6824c06ffc9377def5';
const league_key = 152;
const API = `https://apiv2.allsportsapi.com/football/?met=Standings&leagueId=${league_key}&APIkey=${apiKey}`
const top_scorersAPI = `https://apiv2.allsportsapi.com/football/?met=Topscorers&leagueId=${league_key}&APIkey=${apiKey}`
const liveMatchesAPO = `https://apiv2.allsportsapi.com/football/?met=OddsLive&leagueId=${league_key}&APIkey=${apiKey}`


fetch(API)
.then(response => response.json())
.then(users => {
    const standings = users.result.total;
    const tbody = document.querySelector("#standingsTable tbody");
    tbody.innerHTML = "";
    for(let i = 0; i < 20; i++)
    {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="standing-elements">${standings[i].standing_place}</td>
            <td class="standing-team"><img src="${standings[i].team_logo}" width="25" style="margin-bottom: -7px ;margin-right: 10px;"">${standings[i].standing_team}</td>
            <td class="standing-elements">${standings[i].standing_P}</td>
            <td class="standing-elements">${standings[i].standing_W}</td>
            <td class="standing-elements">${standings[i].standing_D}</td>
            <td class="standing-elements">${standings[i].standing_L}</td>
            <td class="standing-elements">${standings[i].standing_F}</td>
            <td class="standing-elements">${standings[i].standing_A}</td>
            <td class="standing-elements">${standings[i].standing_GD}</td>
            <td class="standing-elements">${standings[i].standing_PTS}</td>
        `;
        tbody.appendChild(row);
    }
});
fetch(top_scorersAPI)
.then(response => response.json())
.then(users => {
    const tstandings = users.result;
    const tcontainer = document.querySelector(".top-players");
    tcontainer.innerHTML = "";
    for(let i = 0; i < 5; i++)
    {
        const row1 = document.createElement("div");
        row1.classList.add("top-players-row");
        row1.innerHTML = `
        <span class="top-player">${tstandings[i].player_name}</span>
        <span class="top-goal">${tstandings[i].goals}</span>
        `;
        tcontainer.appendChild(row1);
    }
});

// fetch(liveMatchesAPO)
// .then(response => response.json())
// .then(users => {
//     const lstandings = users.result;
//     const lcontainer = document.querySelector(".live-matches");
//     lcontainer.innerHTML = "";
//     for(let i = 0; i < 5; i++)
//     {
//         const row2 = document.createElement("div");
//         row2.classList.add("matches-row");
//         row2.innerHTML = `
//         <span class="top-player">${lstandings[i].player_name}</span>
//         <span class="top-goal">${lstandings[i].goals}</span>
//         `;
//         lcontainer.appendChild(row2);
//     }
// });



// ترتيب الفريق - لوجو الفريق - إسم الفريق - لعب - فوز - تعادل - هزيمه - له - عليه - فرق الاهداف - النقاط
