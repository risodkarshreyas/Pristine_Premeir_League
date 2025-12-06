// API client for backend communication
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : `${window.location.origin}/api`;

// Check if backend is available
async function isBackendAvailable() {
    try {
        const response = await fetch(`${API_URL}/teams`);
        return response.ok;
    } catch {
        return false;
    }
}

// Teams API
const TeamsAPI = {
    async getAll() {
        const response = await fetch(`${API_URL}/teams`);
        if (!response.ok) throw new Error('Failed to fetch teams');
        return await response.json();
    },
    
    async create(teamData) {
        const response = await fetch(`${API_URL}/teams`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teamData)
        });
        if (!response.ok) throw new Error('Failed to create team');
        return await response.json();
    },
    
    async update(id, teamData) {
        const response = await fetch(`${API_URL}/teams/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teamData)
        });
        if (!response.ok) throw new Error('Failed to update team');
        return await response.json();
    },
    
    async delete(id) {
        const response = await fetch(`${API_URL}/teams/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete team');
        return await response.json();
    }
};

// Config API
const ConfigAPI = {
    async get() {
        const response = await fetch(`${API_URL}/config`);
        if (!response.ok) throw new Error('Failed to fetch config');
        return await response.json();
    },
    
    async update(config) {
        const response = await fetch(`${API_URL}/config`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        });
        if (!response.ok) throw new Error('Failed to update config');
        return await response.json();
    }
};

// Schedules API
const SchedulesAPI = {
    async getAll() {
        const response = await fetch(`${API_URL}/schedules`);
        if (!response.ok) throw new Error('Failed to fetch schedules');
        return await response.json();
    },
    
    async save(category, schedule) {
        const response = await fetch(`${API_URL}/schedules/${category}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(schedule)
        });
        if (!response.ok) throw new Error('Failed to save schedule');
        return await response.json();
    }
};

// Reset API
const ResetAPI = {
    async resetAll() {
        const response = await fetch(`${API_URL}/reset`, {
            method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to reset data');
        return await response.json();
    }
};

// Fallback to localStorage if backend is not available
let useBackend = false;

async function initAPI() {
    useBackend = await isBackendAvailable();
    if (!useBackend) {
        console.warn('Backend not available, using localStorage');
    }
    return useBackend;
}

// Auth API
const AuthAPI = {
    async login(username, password) {
        if (useBackend) {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) throw new Error('Login failed');
            return await response.json();
        } else {
            // Fallback local auth
            const users = {
                'admin': { username: 'admin', password: 'admin123', role: 'admin' },
                'user': { username: 'user', password: 'user123', role: 'user' }
            };
            
            const user = users[username];
            if (user && user.password === password) {
                return { success: true, user: { username: user.username, role: user.role } };
            }
            return { success: false };
        }
    }
};

// Unified data access layer
const DataAPI = {
    async login(username, password) {
        return await AuthAPI.login(username, password);
    },
    
    async getTeams() {
        if (useBackend) {
            return await TeamsAPI.getAll();
        } else {
            const stored = localStorage.getItem('registeredTeams');
            return stored ? JSON.parse(stored) : [];
        }
    },
    
    async saveTeam(teamData) {
        if (useBackend) {
            return await TeamsAPI.create(teamData);
        } else {
            const teams = await this.getTeams();
            const newTeam = { ...teamData, id: Date.now() };
            teams.push(newTeam);
            localStorage.setItem('registeredTeams', JSON.stringify(teams));
            return { success: true, team: newTeam };
        }
    },
    
    async updateTeam(id, teamData) {
        if (useBackend) {
            return await TeamsAPI.update(id, teamData);
        } else {
            const teams = await this.getTeams();
            const index = teams.findIndex(t => t.id === id);
            if (index !== -1) {
                teams[index] = { ...teams[index], ...teamData };
                localStorage.setItem('registeredTeams', JSON.stringify(teams));
            }
            return { success: true };
        }
    },
    
    async deleteTeam(id) {
        if (useBackend) {
            return await TeamsAPI.delete(id);
        } else {
            let teams = await this.getTeams();
            teams = teams.filter(t => t.id !== id);
            localStorage.setItem('registeredTeams', JSON.stringify(teams));
            return { success: true };
        }
    },
    
    async getConfig() {
        if (useBackend) {
            return await ConfigAPI.get();
        } else {
            const stored = localStorage.getItem('tournamentConfig');
            return stored ? JSON.parse(stored) : {
                men: { maxTeams: 16, registered: 0 },
                women: { maxTeams: 8, registered: 0 }
            };
        }
    },
    
    async saveConfig(config) {
        if (useBackend) {
            return await ConfigAPI.update(config);
        } else {
            localStorage.setItem('tournamentConfig', JSON.stringify(config));
            return { success: true };
        }
    },
    
    async getSchedules() {
        if (useBackend) {
            return await SchedulesAPI.getAll();
        } else {
            const men = localStorage.getItem('tournament_men');
            const women = localStorage.getItem('tournament_women');
            return {
                men: men ? JSON.parse(men) : null,
                women: women ? JSON.parse(women) : null
            };
        }
    },
    
    async saveSchedule(category, schedule) {
        if (useBackend) {
            return await SchedulesAPI.save(category, schedule);
        } else {
            localStorage.setItem(`tournament_${category}`, JSON.stringify(schedule));
            return { success: true };
        }
    },
    
    async resetAll() {
        if (useBackend) {
            return await ResetAPI.resetAll();
        } else {
            localStorage.clear();
            return { success: true, message: 'All data reset successfully' };
        }
    }
};
