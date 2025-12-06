# Install Node.js on macOS

You need Node.js and npm to run this application. Here are the easiest ways to install:

## Option 1: Official Installer (Recommended - Easiest)

1. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Download the **LTS version** (Long Term Support)
   - Choose the macOS installer (.pkg file)

2. **Install:**
   - Double-click the downloaded .pkg file
   - Follow the installation wizard
   - Click "Continue" → "Install" → Enter your password

3. **Verify Installation:**
   ```bash
   node --version
   npm --version
   ```

   You should see version numbers like:
   ```
   v18.x.x
   9.x.x
   ```

4. **Run the Application:**
   ```bash
   npm install
   npm start
   ```

---

## Option 2: Homebrew (If you want package manager)

### Step 1: Install Homebrew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2: Install Node.js
```bash
brew install node
```

### Step 3: Verify
```bash
node --version
npm --version
```

### Step 4: Run the Application
```bash
npm install
npm start
```

---

## Option 3: NVM (Node Version Manager)

If you need to manage multiple Node.js versions:

### Step 1: Install NVM
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### Step 2: Restart Terminal
Close and reopen your terminal, or run:
```bash
source ~/.zshrc
```

### Step 3: Install Node.js
```bash
nvm install --lts
nvm use --lts
```

### Step 4: Verify
```bash
node --version
npm --version
```

### Step 5: Run the Application
```bash
npm install
npm start
```

---

## After Installation

Once Node.js is installed, follow these steps:

### 1. Install Dependencies
```bash
npm install
```

This will install:
- express (web server)
- cors (cross-origin support)

### 2. Start the Server
```bash
npm start
```

You should see:
```
Server running on port 3000
Environment: development
Data stored in: /path/to/data
```

### 3. Open in Browser
```
http://localhost:3000/login.html
```

### 4. Login with Demo Credentials
- **Admin:** username: `admin`, password: `admin123`
- **User:** username: `user`, password: `user123`

---

## Troubleshooting

### "command not found: npm"
- Node.js is not installed or not in PATH
- Try closing and reopening your terminal
- Verify installation: `which node`

### "Cannot find module 'express'"
```bash
npm install
```

### "Port 3000 already in use"
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=8080 npm start
```

### Permission Errors
```bash
sudo chown -R $(whoami) ~/.npm
```

---

## Quick Reference

```bash
# Check if Node.js is installed
node --version

# Check if npm is installed
npm --version

# Install dependencies
npm install

# Start development server
npm start

# Start with auto-reload (after installing nodemon)
npm run dev

# Check what's running on port 3000
lsof -i:3000
```

---

## Next Steps After Installation

1. ✅ Install Node.js (you're here)
2. ✅ Run `npm install`
3. ✅ Run `npm start`
4. ✅ Open http://localhost:3000/login.html
5. ✅ Test the application
6. 🚀 Deploy (see DEPLOYMENT.md)

---

## Need Help?

If you encounter issues:
1. Make sure you downloaded from https://nodejs.org/
2. Restart your terminal after installation
3. Check that node and npm are in your PATH: `echo $PATH`
4. Try running with sudo if permission errors occur

**Recommended:** Use Option 1 (Official Installer) for the simplest installation!
