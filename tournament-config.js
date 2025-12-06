// Tournament configuration management
async function getTournamentConfig() {
    return await DataAPI.getConfig();
}

async function saveTournamentConfig(config) {
    return await DataAPI.saveConfig(config);
}

async function updateTournamentConfig(category, maxTeams) {
    const config = await getTournamentConfig();
    config[category].maxTeams = parseInt(maxTeams);
    await saveTournamentConfig(config);
}

// Load teams by category
async function loadTeamsByCategory(category) {
    const allTeams = await DataAPI.getTeams();
    return allTeams.filter(team => team.category === category);
}

// Generate groups for league stage
function generateGroups(teams, groupSize = 4) {
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    const groups = [];
    const numGroups = Math.ceil(teams.length / groupSize);
    
    for (let i = 0; i < numGroups; i++) {
        groups.push({
            name: String.fromCharCode(65 + i), // A, B, C, D
            teams: []
        });
    }
    
    // Distribute teams round-robin style
    shuffled.forEach((team, index) => {
        groups[index % numGroups].teams.push(team);
    });
    
    return groups;
}

// Generate league matches for a group
function generateGroupMatches(group, groupName) {
    const matches = [];
    const teams = group.teams;
    
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            matches.push({
                group: groupName,
                team1: teams[i].teamName,
                team2: teams[j].teamName,
                team1Index: teams[i].index,
                team2Index: teams[j].index,
                stage: 'league',
                status: 'scheduled'
            });
        }
    }
    
    return matches;
}

// Generate complete tournament schedule
function generateTournamentSchedule(category) {
    const teams = loadTeamsByCategory(category);
    
    if (teams.length < 4) {
        return { error: 'Minimum 4 teams required to generate schedule' };
    }
    
    // Add index to teams for reference
    teams.forEach((team, idx) => {
        team.index = idx;
    });
    
    const schedule = {
        category: category,
        totalTeams: teams.length,
        groups: [],
        leagueMatches: [],
        knockoutMatches: [],
        generatedAt: new Date().toISOString()
    };
    
    // Generate groups (4 teams per group)
    const groups = generateGroups(teams, 4);
    schedule.groups = groups;
    
    // Generate league matches for each group
    groups.forEach(group => {
        const matches = generateGroupMatches(group, group.name);
        schedule.leagueMatches.push(...matches);
    });
    
    // Generate knockout stage placeholders
    const numGroups = groups.length;
    
    if (numGroups >= 2) {
        // Semi-finals
        schedule.knockoutMatches.push({
            stage: 'semi-final',
            matchNumber: 1,
            team1: 'Winner Group A',
            team2: 'Runner-up Group B',
            status: 'pending'
        });
        
        schedule.knockoutMatches.push({
            stage: 'semi-final',
            matchNumber: 2,
            team1: 'Winner Group B',
            team2: 'Runner-up Group A',
            status: 'pending'
        });
        
        if (numGroups >= 4) {
            schedule.knockoutMatches[0].team1 = 'Winner Group A';
            schedule.knockoutMatches[0].team2 = 'Runner-up Group D';
            schedule.knockoutMatches[1].team1 = 'Winner Group B';
            schedule.knockoutMatches[1].team2 = 'Runner-up Group C';
            
            schedule.knockoutMatches.push({
                stage: 'semi-final',
                matchNumber: 3,
                team1: 'Winner Group C',
                team2: 'Runner-up Group B',
                status: 'pending'
            });
            
            schedule.knockoutMatches.push({
                stage: 'semi-final',
                matchNumber: 4,
                team1: 'Winner Group D',
                team2: 'Runner-up Group A',
                status: 'pending'
            });
        }
        
        // Final
        schedule.knockoutMatches.push({
            stage: 'final',
            matchNumber: 1,
            team1: 'Winner Semi-Final 1',
            team2: 'Winner Semi-Final 2',
            status: 'pending'
        });
    }
    
    return schedule;
}

// Save tournament schedule
async function saveTournamentSchedule(category, schedule) {
    return await DataAPI.saveSchedule(category, schedule);
}

// Load tournament schedule
async function loadTournamentSchedule(category) {
    const schedules = await DataAPI.getSchedules();
    return schedules[category] || null;
}
