# Pristine Premier League - Tournament Management System

A comprehensive web-based registration and tournament management system for box cricket leagues.

## Features

- **Multi-Category Support**: Separate Men's and Women's tournaments
- **Flexible Team Limits**: Configure 4/8/16 teams per category
- **Complete Team Registration**: Register teams with full 6-player rosters
- **Automatic Draw Generation**: Create groups and match schedules automatically
- **Persistent Storage**: Backend API with file-based database
- **Reset Functionality**: Clear form data or reset entire system

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Backend Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 3. Open the Application

Open your browser and navigate to:
```
http://localhost:3000/index.html
```

## Usage

### Login

1. Navigate to `http://localhost:3000/login.html`
2. Use demo credentials:
   - **Admin**: username: `admin`, password: `admin123`
   - **User**: username: `user`, password: `user123`

### User Roles

**Admin Role:**
- Edit team details
- Delete teams
- Edit match schedules
- Reset all data
- All user permissions

**User Role:**
- Register new teams
- View teams and schedules
- View team details

### Register Teams

1. Go to the **Register** page
2. Configure maximum teams for each category (optional)
3. Select category (Men/Women)
4. Fill in team details:
   - Team name
   - Captain details (name, phone, email)
   - 5 additional player names
5. Click **Register Team**
6. Use **Reset Form** to clear the form without submitting

### View Teams

1. Go to the **View Teams** page
2. Filter by category (All/Men/Women)
3. Click on any team card to view full roster details

### Generate Schedule

1. Go to the **Schedule** page
2. Switch between Men's and Women's tournaments
3. Click **Generate Draw & Schedule**
4. View:
   - League groups (4 teams per group)
   - All league matches
   - Knockout stage (semi-finals and final)

### Admin Functions

- **Reset Form**: Clear current form data
- **Reset All Data**: Delete all teams, schedules, and reset configuration

## Data Storage

All data is stored in the `data/` directory:
- `teams.json` - All registered teams
- `config.json` - Tournament configuration
- `schedules.json` - Generated match schedules

## Tournament Structure

### 16 Teams
- 4 groups of 4 teams
- Top 2 from each group advance
- 4 semi-finals → Final

### 8 Teams
- 2 groups of 4 teams
- Top 2 from each group advance
- 2 semi-finals → Final

### 4 Teams
- 1 group of 4 teams
- Top 2 advance
- Semi-finals → Final

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Storage**: JSON file-based database
- **Fallback**: localStorage (if backend unavailable)

## API Endpoints

- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create new team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team
- `GET /api/config` - Get tournament config
- `PUT /api/config` - Update config
- `GET /api/schedules` - Get all schedules
- `POST /api/schedules/:category` - Save schedule
- `POST /api/reset` - Reset all data

## Notes

- The system automatically falls back to localStorage if the backend is not running
- All team registrations are validated for duplicates within the same category
- Jersey numbers are auto-assigned (Captain gets #1, others get #2-6)
- Each team must have exactly 6 players

## Deployment

See deployment guides for various platforms:
- **[AZURE_QUICK_START.md](AZURE_QUICK_START.md)** - Deploy to Azure (10 minutes)
- **[AZURE_DEPLOY.md](AZURE_DEPLOY.md)** - Complete Azure guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Other platforms (Heroku, Vercel, Railway, etc.)

Quick deploy to Azure:
```bash
az login
az webapp up --name pristine-premier-league --runtime "NODE:18-lts" --sku F1
```

Quick deploy to Heroku:
```bash
heroku create
git push heroku main
heroku open
```

## Production Considerations

### Database Migration
For production use, consider migrating from file-based storage to a database:
- MongoDB for document storage
- PostgreSQL for relational data
- Firebase for real-time updates

### Security Enhancements
- Implement proper password hashing (bcrypt)
- Add JWT tokens for authentication
- Enable HTTPS/SSL
- Add rate limiting
- Implement CSRF protection

### Performance
- Enable gzip compression
- Add caching headers
- Implement CDN for static assets
- Use connection pooling for database

## Support

For issues or questions:
- Check the [DEPLOYMENT.md](DEPLOYMENT.md) guide
- Review server logs
- Ensure all dependencies are installed
- Verify data directory permissions
