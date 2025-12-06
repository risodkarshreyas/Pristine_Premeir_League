let currentTeamIndex = null;
let currentTeam = null;

function loadTeams() {
    const stored = localStorage.getItem('registeredTeams');
    return stored ? JSON.parse(stored) : [];
}

function saveTeams(teams) {
    localStorage.setItem('registeredTeams', JSON.stringify(teams));
}

function getTeamIndex() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('team'));
}

function loadTeamDetails() {
    currentTeamIndex = getTeamIndex();
    const teams = loadTeams();
    
    if (isNaN(currentTeamIndex) || currentTeamIndex < 0 || currentTeamIndex >= teams.length) {
        window.location.href = 'teams.html';
        return;
    }
    
    currentTeam = teams[currentTeamIndex];
    
    if (!currentTeam.players) {
        currentTeam.players = [];
    }
    
    document.getElementById('teamTitle').textContent = currentTeam.teamName;
    document.getElementById('teamName').textContent = currentTeam.teamName;
    document.getElementById('captainName').textContent = currentTeam.captainName;
    document.getElementById('captainPhone').textContent = currentTeam.captainPhone;
    document.getElementById('captainEmail').textContent = currentTeam.captainEmail;
    document.getElementById('playerCount').textContent = '6';
    
    displayPlayers();
}

function displayPlayers() {
    const playersList = document.getElementById('playersList');
    
    if (!currentTeam.players || currentTeam.players.length === 0) {
        playersList.innerHTML = '<p style="color: #999; text-align: center; padding: 2rem;">No players added yet. Click "Add Player" to start building your roster.</p>';
        return;
    }
    
    playersList.innerHTML = currentTeam.players.map((player, index) => `
        <div class="player-card">
            <div class="player-jersey">#${player.jerseyNumber}</div>
            <h3>${player.name}</h3>
            <p class="player-role">${player.role}</p>
            <button class="btn-delete" onclick="deletePlayer(${index})">Remove</button>
        </div>
    `).join('');
}

function deletePlayer(playerIndex) {
    if (confirm('Are you sure you want to remove this player?')) {
        const teams = loadTeams();
        teams[currentTeamIndex].players.splice(playerIndex, 1);
        saveTeams(teams);
        currentTeam = teams[currentTeamIndex];
        displayPlayers();
    }
}

document.getElementById('addPlayerBtn').addEventListener('click', function() {
    const form = document.getElementById('playerForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('playerForm').style.display = 'none';
    document.getElementById('addPlayerForm').reset();
});

document.getElementById('addPlayerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const teams = loadTeams();
    const team = teams[currentTeamIndex];
    
    if (!team.players) {
        team.players = [];
    }
    
    if (team.players.length >= 6) {
        alert('Maximum 6 players allowed for this team.');
        return;
    }
    
    const jerseyNumber = parseInt(document.getElementById('playerJersey').value);
    
    if (team.players.some(p => p.jerseyNumber === jerseyNumber)) {
        alert('Jersey number already taken. Please choose a different number.');
        return;
    }
    
    const newPlayer = {
        name: document.getElementById('playerName').value,
        role: 'Player',
        jerseyNumber: jerseyNumber
    };
    
    team.players.push(newPlayer);
    saveTeams(teams);
    currentTeam = team;
    
    this.reset();
    document.getElementById('playerForm').style.display = 'none';
    displayPlayers();
});

document.addEventListener('DOMContentLoaded', loadTeamDetails);
