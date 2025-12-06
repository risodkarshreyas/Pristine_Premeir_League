let currentCategory = 'men';

async function switchCategory(category) {
    currentCategory = category;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Load schedule for category
    await loadScheduleDisplay();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    await initAPI();
    await loadScheduleDisplay();
});

async function generateSchedule() {
    const teams = await loadTeamsByCategory(currentCategory);
    
    if (teams.length < 4) {
        alert(`Minimum 4 teams required to generate schedule. Currently ${teams.length} teams registered in ${currentCategory}'s category.`);
        return;
    }
    
    const schedule = generateTournamentSchedule(currentCategory);
    
    if (schedule.error) {
        alert(schedule.error);
        return;
    }
    
    await saveTournamentSchedule(currentCategory, schedule);
    await loadScheduleDisplay();
    
    alert(`Schedule generated successfully for ${currentCategory}'s tournament with ${teams.length} teams!`);
}

async function loadScheduleDisplay() {
    const schedule = await loadTournamentSchedule(currentCategory);
    
    if (!schedule) {
        document.getElementById('groupsSection').style.display = 'none';
        document.getElementById('matchesSection').style.display = 'none';
        document.getElementById('knockoutSection').style.display = 'none';
        return;
    }
    
    // Display groups
    displayGroups(schedule.groups);
    
    // Display league matches
    displayLeagueMatches(schedule.leagueMatches);
    
    // Display knockout matches
    displayKnockoutMatches(schedule.knockoutMatches);
}

function displayGroups(groups) {
    const container = document.getElementById('groupsDisplay');
    
    container.innerHTML = groups.map(group => `
        <div class="group-card">
            <h3>Group ${group.name}</h3>
            <ul class="team-list">
                ${group.teams.map(team => `
                    <li>${team.teamName}</li>
                `).join('')}
            </ul>
        </div>
    `).join('');
    
    document.getElementById('groupsSection').style.display = 'block';
}

function displayLeagueMatches(matches) {
    const container = document.getElementById('leagueMatches');
    const admin = isAdmin();
    
    // Group matches by group
    const matchesByGroup = {};
    matches.forEach((match, globalIdx) => {
        if (!matchesByGroup[match.group]) {
            matchesByGroup[match.group] = [];
        }
        match.globalIndex = globalIdx;
        matchesByGroup[match.group].push(match);
    });
    
    container.innerHTML = Object.keys(matchesByGroup).sort().map(groupName => `
        <div class="match-group">
            <h3>Group ${groupName} Matches</h3>
            ${matchesByGroup[groupName].map((match, idx) => {
                const editBtn = admin ? `<button class="btn-edit-match" onclick="editMatch('league', ${match.globalIndex})">Edit</button>` : '';
                return `
                    <div class="match-card">
                        <span class="match-number">Match ${idx + 1}</span>
                        <div class="match-teams">
                            <span class="team">${match.team1}</span>
                            <span class="vs">vs</span>
                            <span class="team">${match.team2}</span>
                        </div>
                        ${editBtn}
                    </div>
                `;
            }).join('')}
        </div>
    `).join('');
    
    document.getElementById('matchesSection').style.display = 'block';
}

async function editMatch(stage, matchIndex) {
    if (!isAdmin()) {
        alert('Only admins can edit matches');
        return;
    }
    
    const schedule = await loadTournamentSchedule(currentCategory);
    const matches = stage === 'league' ? schedule.leagueMatches : schedule.knockoutMatches;
    const match = matches[matchIndex];
    
    const newTeam1 = prompt('Enter Team 1 name:', match.team1);
    if (newTeam1 === null) return;
    
    const newTeam2 = prompt('Enter Team 2 name:', match.team2);
    if (newTeam2 === null) return;
    
    match.team1 = newTeam1;
    match.team2 = newTeam2;
    
    await saveTournamentSchedule(currentCategory, schedule);
    await loadScheduleDisplay();
    alert('Match updated successfully');
}

function displayKnockoutMatches(matches) {
    const container = document.getElementById('knockoutMatches');
    const admin = isAdmin();
    
    // Group by stage
    const semiFinals = matches.filter(m => m.stage === 'semi-final');
    const finals = matches.filter(m => m.stage === 'final');
    
    let html = '';
    
    if (semiFinals.length > 0) {
        html += '<div class="knockout-stage"><h3>Semi-Finals</h3>';
        html += semiFinals.map((match, idx) => {
            const editBtn = admin ? `<button class="btn-edit-match" onclick="editMatch('knockout', ${matches.indexOf(match)})">Edit</button>` : '';
            return `
                <div class="match-card knockout">
                    <span class="match-number">Semi-Final ${match.matchNumber}</span>
                    <div class="match-teams">
                        <span class="team">${match.team1}</span>
                        <span class="vs">vs</span>
                        <span class="team">${match.team2}</span>
                    </div>
                    ${editBtn}
                </div>
            `;
        }).join('');
        html += '</div>';
    }
    
    if (finals.length > 0) {
        html += '<div class="knockout-stage"><h3>Final</h3>';
        html += finals.map((match) => {
            const editBtn = admin ? `<button class="btn-edit-match" onclick="editMatch('knockout', ${matches.indexOf(match)})">Edit</button>` : '';
            return `
                <div class="match-card knockout final">
                    <span class="match-number">🏆 FINAL</span>
                    <div class="match-teams">
                        <span class="team">${match.team1}</span>
                        <span class="vs">vs</span>
                        <span class="team">${match.team2}</span>
                    </div>
                    ${editBtn}
                </div>
            `;
        }).join('');
        html += '</div>';
    }
    
    container.innerHTML = html;
    document.getElementById('knockoutSection').style.display = 'block';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadScheduleDisplay();
});
