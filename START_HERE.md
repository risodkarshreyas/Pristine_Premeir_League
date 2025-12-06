# 🚀 START HERE - Pristine Premier League

Welcome! Follow these steps to get your tournament management system running.

---

## ⚠️ FIRST TIME SETUP

### Step 1: Install Node.js

**You need Node.js to run this application.**

👉 **[Click here for installation instructions](INSTALL_NODEJS.md)**

Or quick install:
1. Go to https://nodejs.org/
2. Download the LTS version
3. Install it
4. Restart your terminal

Verify installation:
```bash
node --version
npm --version
```

---

## 🏃 RUNNING THE APPLICATION

### Step 2: Install Dependencies

Open terminal in this folder and run:
```bash
npm install
```

This installs required packages (express, cors).

### Step 3: Start the Server

```bash
npm start
```

You should see:
```
Server running on port 3000
Environment: development
```

### Step 4: Open in Browser

Go to: **http://localhost:3000/login.html**

### Step 5: Login

Use demo credentials:
- **Admin:** `admin` / `admin123`
- **User:** `user` / `user123`

---

## 🎯 WHAT YOU CAN DO

### As Admin (admin/admin123):
- ✅ Register teams
- ✅ Edit team details
- ✅ Delete teams
- ✅ Generate tournament schedule
- ✅ Edit match schedules
- ✅ Reset all data

### As User (user/user123):
- ✅ Register teams
- ✅ View teams
- ✅ View schedules
- ❌ Cannot edit or delete

---

## 📁 PROJECT STRUCTURE

```
pristine-premier-league/
├── index.html          # Registration page
├── login.html          # Login page
├── teams.html          # View teams
├── schedule.html       # Tournament schedule
├── server.js           # Backend server
├── data/               # Stored data (teams, config, schedules)
├── styles.css          # Styling
└── *.js                # JavaScript files
```

---

## 🔧 COMMON COMMANDS

```bash
# Start the server
npm start

# Start with auto-reload (development)
npm run dev

# Stop the server
Ctrl + C

# Check if port 3000 is in use
lsof -i:3000

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## 🐛 TROUBLESHOOTING

### "command not found: npm"
👉 Install Node.js first - see [INSTALL_NODEJS.md](INSTALL_NODEJS.md)

### "Cannot find module 'express'"
```bash
npm install
```

### "Port 3000 already in use"
```bash
# Use different port
PORT=8080 npm start
```

### "EACCES: permission denied"
```bash
sudo chown -R $(whoami) ~/.npm
npm install
```

### Server won't start
1. Check Node.js is installed: `node --version`
2. Install dependencies: `npm install`
3. Check port availability: `lsof -i:3000`
4. Try different port: `PORT=8080 npm start`

---

## 📚 DOCUMENTATION

- **[INSTALL_NODEJS.md](INSTALL_NODEJS.md)** - Install Node.js
- **[README.md](README.md)** - Full documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to production
- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - Fast deployment guide

---

## 🚀 READY TO DEPLOY?

Once you've tested locally, deploy to production:

**Easiest: Heroku**
```bash
heroku create
git push heroku main
heroku open
```

See [QUICK_DEPLOY.md](QUICK_DEPLOY.md) for more options.

---

## ✅ CHECKLIST

- [ ] Install Node.js
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Open http://localhost:3000/login.html
- [ ] Login as admin
- [ ] Register a test team
- [ ] Generate schedule
- [ ] Test editing features
- [ ] Ready to deploy!

---

## 🆘 NEED HELP?

1. Check [INSTALL_NODEJS.md](INSTALL_NODEJS.md) for Node.js installation
2. Check [README.md](README.md) for full documentation
3. Check server logs in terminal for errors
4. Ensure all files are in the same directory

---

**Start with Step 1 above if you haven't installed Node.js yet!**
