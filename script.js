// Initialize API on page load
let apiReady = false;

async function initializePage() {
    apiReady = await initAPI();
    await updateStatus();
}

// Load teams
async function loadTeams() {
    return await DataAPI.getTeams();
}

// Save team
async function saveTeam(teamData) {
    return await DataAPI.saveTeam(teamData);
}

// Update config
async function updateConfig(category, maxTeams) {
    await updateTournamentConfig(category, maxTeams);
    await updateStatus();
}

// Update registration status
async function updateStatus() {
    const config = await getTournamentConfig();
    const teams = await loadTeams();
    
    const menTeams = teams.filter(t => t.category === 'men');
    const womenTeams = teams.filter(t => t.category === 'women');
    
    // Update men's status
    document.getElementById('men-registered').textContent = menTeams.length;
    document.getElementById('men-max').textContent = config.men.maxTeams;
    document.getElementById('men-progress').style.width = (menTeams.length / config.men.maxTeams * 100) + '%';
    document.getElementById('menRegistered').textContent = menTeams.length;
    
    // Update women's status
    document.getElementById('women-registered').textContent = womenTeams.length;
    document.getElementById('women-max').textContent = config.women.maxTeams;
    document.getElementById('women-progress').style.width = (womenTeams.length / config.women.maxTeams * 100) + '%';
    document.getElementById('womenRegistered').textContent = womenTeams.length;
    
    // Update config selects
    document.getElementById('menTeams').value = config.men.maxTeams;
    document.getElementById('womenTeams').value = config.women.maxTeams;
}



// Show alert message
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    const form = document.querySelector('.registration-form');
    form.insertBefore(alert, form.firstChild);
    
    setTimeout(() => alert.remove(), 5000);
}

// Reset form
function resetForm() {
    if (confirm('Are you sure you want to reset the form?')) {
        document.getElementById('teamForm').reset();
    }
}

// Reset all data
async function resetAllData() {
    if (confirm('⚠️ WARNING: This will delete ALL teams, schedules, and reset configuration. Are you absolutely sure?')) {
        if (confirm('This action cannot be undone. Continue?')) {
            try {
                await DataAPI.resetAll();
                alert('All data has been reset successfully!');
                location.reload();
            } catch (error) {
                alert('Error resetting data: ' + error.message);
            }
        }
    }
}

// Handle form submission
document.getElementById('teamForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const category = document.getElementById('category').value;
    const config = await getTournamentConfig();
    const teams = await loadTeams();
    const categoryTeams = teams.filter(t => t.category === category);
    
    const maxTeams = config[category].maxTeams;
    
    if (categoryTeams.length >= maxTeams) {
        showAlert(`Registration is full for ${category}'s category. Maximum ${maxTeams} teams allowed.`, 'error');
        return;
    }
    
    // Collect all player data
    const players = [];
    
    // Add captain as first player
    players.push({
        name: document.getElementById('captainName').value,
        role: 'Captain',
        jerseyNumber: 1
    });
    
    // Add other 5 players
    for (let i = 1; i <= 5; i++) {
        players.push({
            name: document.getElementById(`player${i}Name`).value,
            role: 'Player',
            jerseyNumber: i + 1
        });
    }
    
    const teamData = {
        category: category,
        teamName: document.getElementById('teamName').value,
        captainName: document.getElementById('captainName').value,
        captainPhone: document.getElementById('captainPhone').value,
        captainEmail: document.getElementById('captainEmail').value,
        playerCount: 6,
        players: players,
        registeredAt: new Date().toISOString()
    };
    
    // Check for duplicate team name in same category
    if (categoryTeams.some(team => team.teamName.toLowerCase() === teamData.teamName.toLowerCase())) {
        showAlert('Team name already registered in this category. Please choose a different name.', 'error');
        return;
    }
    
    try {
        await saveTeam(teamData);
        showAlert(`Team "${teamData.teamName}" registered successfully in ${category}'s category!`);
        this.reset();
        await updateStatus();
    } catch (error) {
        showAlert('Error saving team: ' + error.message, 'error');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});
