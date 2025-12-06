let currentFilter = 'all';

async function loadTeams() {
    return await DataAPI.getTeams();
}

async function updateStatus() {
    const config = await getTournamentConfig();
    const teams = await loadTeams();
    
    const menTeams = teams.filter(t => t.category === 'men');
    const womenTeams = teams.filter(t => t.category === 'women');
    
    document.getElementById('men-registered').textContent = menTeams.length;
    document.getElementById('men-max').textContent = config.men.maxTeams;
    document.getElementById('men-progress').style.width = (menTeams.length / config.men.maxTeams * 100) + '%';
    
    document.getElementById('women-registered').textContent = womenTeams.length;
    document.getElementById('women-max').textContent = config.women.maxTeams;
    document.getElementById('women-progress').style.width = (womenTeams.length / config.women.maxTeams * 100) + '%';
}

async function filterTeams(category) {
    currentFilter = category;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    await displayTeams();
}

async function displayTeams() {
    const teams = await loadTeams();
    const teamsList = document.getElementById('teamsList');
    const admin = isAdmin();
    
    const filteredTeams = currentFilter === 'all' 
        ? teams 
        : teams.filter(t => t.category === currentFilter);
    
    if (filteredTeams.length === 0) {
        teamsList.innerHTML = '<p style="color: #999; text-align: center; padding: 2rem;">No teams registered yet.</p>';
        return;
    }
    
    teamsList.innerHTML = filteredTeams.map((team) => {
        const playerCount = team.players ? team.players.length : 0;
        const categoryBadge = team.category === 'men' ? '👨 Men' : '👩 Women';
        const teamIndex = teams.indexOf(team);
        const adminButtons = admin ? `
            <div class="team-actions">
                <button class="btn-edit" onclick="editTeam(${teamIndex}); event.stopPropagation();">Edit</button>
                <button class="btn-delete" onclick="deleteTeam(${teamIndex}); event.stopPropagation();">Delete</button>
            </div>
        ` : '';
        
        return `
            <div class="team-card clickable" onclick="viewTeamDetails(${teamIndex})">
                <span class="team-number">${categoryBadge}</span>
                <h3>${team.teamName}</h3>
                <p><strong>Captain:</strong> ${team.captainName}</p>
                <p><strong>Players:</strong> ${playerCount} / 6</p>
                <p><strong>Contact:</strong> ${team.captainPhone}</p>
                ${adminButtons}
                <div class="view-details">Click to view details →</div>
            </div>
        `;
    }).join('');
}

async function editTeam(teamIndex) {
    const teams = await loadTeams();
    const team = teams[teamIndex];
    
    document.getElementById('editTeamId').value = team.id || teamIndex;
    document.getElementById('editTeamName').value = team.teamName;
    document.getElementById('editCaptainName').value = team.captainName;
    document.getElementById('editCaptainPhone').value = team.captainPhone;
    document.getElementById('editCaptainEmail').value = team.captainEmail;
    
    document.getElementById('editTeamModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editTeamModal').style.display = 'none';
}

async function deleteTeam(teamIndex) {
    if (!isAdmin()) {
        alert('Only admins can delete teams');
        return;
    }
    
    if (confirm('Are you sure you want to delete this team?')) {
        const teams = await loadTeams();
        const team = teams[teamIndex];
        
        try {
            await DataAPI.deleteTeam(team.id || teamIndex);
            alert('Team deleted successfully');
            await updateStatus();
            await displayTeams();
        } catch (error) {
            alert('Error deleting team: ' + error.message);
        }
    }
}

document.getElementById('editTeamForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!isAdmin()) {
        alert('Only admins can edit teams');
        return;
    }
    
    const teamId = document.getElementById('editTeamId').value;
    const updatedData = {
        teamName: document.getElementById('editTeamName').value,
        captainName: document.getElementById('editCaptainName').value,
        captainPhone: document.getElementById('editCaptainPhone').value,
        captainEmail: document.getElementById('editCaptainEmail').value
    };
    
    try {
        await DataAPI.updateTeam(teamId, updatedData);
        alert('Team updated successfully');
        closeEditModal();
        await displayTeams();
    } catch (error) {
        alert('Error updating team: ' + error.message);
    }
});

function viewTeamDetails(teamIndex) {
    window.location.href = `team-details.html?team=${teamIndex}`;
}

document.addEventListener('DOMContentLoaded', async function() {
    await initAPI();
    await updateStatus();
    await displayTeams();
});
