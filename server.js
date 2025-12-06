const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DATA_DIR = path.join(__dirname, 'data');
const TEAMS_FILE = path.join(DATA_DIR, 'teams.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');
const SCHEDULES_FILE = path.join(DATA_DIR, 'schedules.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Ensure data directory exists
async function initDataDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        
        // Initialize files if they don't exist
        try {
            await fs.access(TEAMS_FILE);
        } catch {
            await fs.writeFile(TEAMS_FILE, JSON.stringify([]));
        }
        
        try {
            await fs.access(CONFIG_FILE);
        } catch {
            await fs.writeFile(CONFIG_FILE, JSON.stringify({
                men: { maxTeams: 16, registered: 0 },
                women: { maxTeams: 8, registered: 0 }
            }));
        }
        
        try {
            await fs.access(SCHEDULES_FILE);
        } catch {
            await fs.writeFile(SCHEDULES_FILE, JSON.stringify({}));
        }
    } catch (error) {
        console.error('Error initializing data directory:', error);
    }
}

// API Routes

// Get all teams
app.get('/api/teams', async (req, res) => {
    try {
        const data = await fs.readFile(TEAMS_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read teams' });
    }
});

// Add new team
app.post('/api/teams', async (req, res) => {
    try {
        const data = await fs.readFile(TEAMS_FILE, 'utf8');
        const teams = JSON.parse(data);
        
        const newTeam = {
            ...req.body,
            id: Date.now(),
            registeredAt: new Date().toISOString()
        };
        
        teams.push(newTeam);
        await fs.writeFile(TEAMS_FILE, JSON.stringify(teams, null, 2));
        
        res.json({ success: true, team: newTeam });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save team' });
    }
});

// Update team
app.put('/api/teams/:id', async (req, res) => {
    try {
        const data = await fs.readFile(TEAMS_FILE, 'utf8');
        const teams = JSON.parse(data);
        
        const index = teams.findIndex(t => t.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ error: 'Team not found' });
        }
        
        teams[index] = { ...teams[index], ...req.body };
        await fs.writeFile(TEAMS_FILE, JSON.stringify(teams, null, 2));
        
        res.json({ success: true, team: teams[index] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update team' });
    }
});

// Delete team
app.delete('/api/teams/:id', async (req, res) => {
    try {
        const data = await fs.readFile(TEAMS_FILE, 'utf8');
        let teams = JSON.parse(data);
        
        teams = teams.filter(t => t.id !== parseInt(req.params.id));
        await fs.writeFile(TEAMS_FILE, JSON.stringify(teams, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});

// Get tournament config
app.get('/api/config', async (req, res) => {
    try {
        const data = await fs.readFile(CONFIG_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read config' });
    }
});

// Update tournament config
app.put('/api/config', async (req, res) => {
    try {
        await fs.writeFile(CONFIG_FILE, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update config' });
    }
});

// Get schedules
app.get('/api/schedules', async (req, res) => {
    try {
        const data = await fs.readFile(SCHEDULES_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read schedules' });
    }
});

// Save schedule
app.post('/api/schedules/:category', async (req, res) => {
    try {
        const data = await fs.readFile(SCHEDULES_FILE, 'utf8');
        const schedules = JSON.parse(data);
        
        schedules[req.params.category] = req.body;
        await fs.writeFile(SCHEDULES_FILE, JSON.stringify(schedules, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save schedule' });
    }
});

// Reset all data
app.post('/api/reset', async (req, res) => {
    try {
        await fs.writeFile(TEAMS_FILE, JSON.stringify([]));
        await fs.writeFile(CONFIG_FILE, JSON.stringify({
            men: { maxTeams: 16, registered: 0 },
            women: { maxTeams: 8, registered: 0 }
        }));
        await fs.writeFile(SCHEDULES_FILE, JSON.stringify({}));
        
        res.json({ success: true, message: 'All data reset successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset data' });
    }
});

// Auth endpoints
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Simple hardcoded users (in production, use proper database and hashing)
    const users = {
        'admin': { username: 'admin', password: 'admin123', role: 'admin' },
        'user': { username: 'user', password: 'user123', role: 'user' }
    };
    
    const user = users[username];
    if (user && user.password === password) {
        res.json({ 
            success: true, 
            user: { username: user.username, role: user.role } 
        });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', environment: NODE_ENV });
});

// Start server
initDataDir().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
        console.log(`Data stored in: ${DATA_DIR}`);
        console.log('\nDemo Credentials:');
        console.log('Admin - username: admin, password: admin123');
        console.log('User  - username: user, password: user123');
    });
});
