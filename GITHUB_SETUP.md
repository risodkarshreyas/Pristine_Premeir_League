# 📦 Push Your Code to GitHub

Simple step-by-step guide to get your code on GitHub.

---

## 🎯 What You Need

- GitHub account (free: https://github.com/signup)
- Git installed on your computer

---

## ✅ Step 1: Check if Git is Installed

Open Terminal and run:
```bash
git --version
```

**If you see a version number** (like `git version 2.x.x`):
✅ Git is installed! Continue to Step 2.

**If you see "command not found":**
Install Git:
```bash
# macOS
xcode-select --install

# Or download from: https://git-scm.com/download/mac
```

---

## 🚀 Step 2: Create GitHub Repository

### Option A: Using GitHub Website (Easiest)

1. **Go to GitHub:**
   - Visit: https://github.com
   - Sign in (or create account)

2. **Create New Repository:**
   - Click the **"+"** button (top right)
   - Click **"New repository"**

3. **Fill in Details:**
   ```
   Repository name: pristine-premier-league
   Description: Box Cricket Tournament Management System
   Visibility: Public (or Private)
   
   ⚠️ DO NOT check these boxes:
   ❌ Add a README file
   ❌ Add .gitignore
   ❌ Choose a license
   ```

4. **Click "Create repository"**

5. **Copy the repository URL** (you'll need this!)
   ```
   https://github.com/YOUR_USERNAME/pristine-premier-league.git
   ```

---

## 💻 Step 3: Push Your Code from Terminal

Open Terminal in your project folder and run these commands:

### Initialize Git (if not already done)
```bash
git init
```

### Add all files
```bash
git add .
```

### Commit your code
```bash
git commit -m "Initial commit - Pristine Premier League"
```

### Connect to GitHub
Replace `YOUR_USERNAME` with your actual GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/pristine-premier-league.git
```

### Push to GitHub
```bash
git branch -M main
git push -u origin main
```

**If prompted for credentials:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your password!)

---

## 🔑 Step 4: Create Personal Access Token (If Needed)

GitHub requires tokens instead of passwords for command line access.

1. **Go to GitHub Settings:**
   - Click your profile picture (top right)
   - Click **"Settings"**

2. **Generate Token:**
   - Scroll down to **"Developer settings"** (left sidebar)
   - Click **"Personal access tokens"** → **"Tokens (classic)"**
   - Click **"Generate new token"** → **"Generate new token (classic)"**

3. **Configure Token:**
   ```
   Note: pristine-premier-league-token
   Expiration: 90 days (or your choice)
   
   Select scopes:
   ✅ repo (all checkboxes under repo)
   ```

4. **Generate and Copy:**
   - Click **"Generate token"**
   - **COPY THE TOKEN** (you won't see it again!)
   - Save it somewhere safe

5. **Use Token as Password:**
   When pushing to GitHub, use the token as your password.

---

## 🎉 Step 5: Verify Your Code is on GitHub

1. Go to: `https://github.com/YOUR_USERNAME/pristine-premier-league`
2. You should see all your files!

---

## 🔄 Making Updates Later

After making changes to your code:

```bash
# 1. Check what changed
git status

# 2. Add changes
git add .

# 3. Commit with a message
git commit -m "Description of what you changed"

# 4. Push to GitHub
git push
```

---

## 🚀 Quick Commands Reference

```bash
# See current status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log

# See remote URL
git remote -v
```

---

## 🐛 Troubleshooting

### "fatal: not a git repository"
```bash
git init
```

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/pristine-premier-league.git
```

### "failed to push some refs"
```bash
git pull origin main --rebase
git push
```

### "Permission denied"
- Make sure you're using a Personal Access Token, not your password
- Check your token has the right permissions (repo scope)

### "Support for password authentication was removed"
- You need to use a Personal Access Token (see Step 4)

---

## 📱 Alternative: GitHub Desktop (No Command Line)

If you prefer a visual interface:

1. **Download GitHub Desktop:**
   - https://desktop.github.com/

2. **Install and Sign In**

3. **Add Your Repository:**
   - File → Add Local Repository
   - Choose your project folder

4. **Publish to GitHub:**
   - Click "Publish repository"
   - Choose name and visibility
   - Click "Publish"

Done! Much easier if you don't like command line.

---

## ✅ Complete Workflow Example

Here's everything in one go:

```bash
# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Make first commit
git commit -m "Initial commit - Pristine Premier League"

# 4. Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/pristine-premier-league.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

**When prompted:**
- Username: `your-github-username`
- Password: `your-personal-access-token`

---

## 🎯 After Pushing to GitHub

Your code is now backed up and ready to:
- ✅ Deploy to Azure (using GitHub integration)
- ✅ Share with others
- ✅ Collaborate with team members
- ✅ Track changes and history
- ✅ Deploy automatically on updates

---

## 🔗 Next Steps

1. ✅ Code is on GitHub
2. 🚀 Deploy to Azure using GitHub integration
3. 📝 Add collaborators (Settings → Collaborators)
4. 🔄 Set up automatic deployments

---

## 📞 Need Help?

- **GitHub Docs:** https://docs.github.com/en/get-started
- **Git Basics:** https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- **GitHub Desktop:** https://docs.github.com/en/desktop

---

**Recommended:** Use GitHub Desktop if you're new to Git - it's much easier!

Download: https://desktop.github.com/
