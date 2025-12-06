# 🔧 Fix 403 Error - GitHub Push

The 403 error means GitHub rejected your credentials. Here's how to fix it:

---

## 🎯 Solution: Use Personal Access Token

### Step 1: Create Token (If You Haven't)

1. **Go to:** https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Fill in:
   ```
   Note: pristine-premier-league
   Expiration: 90 days
   
   Scopes - CHECK THESE:
   ✅ repo (ALL boxes under repo)
   ✅ workflow
   ```
4. Click **"Generate token"**
5. **COPY THE TOKEN** (starts with `ghp_...`)

---

## 🚀 Step 2: Push Using Token

### Method A: Include Token in URL (Easiest)

```bash
# Remove old remote
git remote remove origin

# Add new remote with token
git remote add origin https://YOUR_TOKEN@github.com/risodkarshreyas/Pristine_Premeir_League.git

# Push
git push -u origin main
```

**Replace `YOUR_TOKEN` with your actual token!**

Example:
```bash
git remote add origin https://ghp_xxxxxxxxxxxxxxxxxxxx@github.com/risodkarshreyas/Pristine_Premeir_League.git
```

---

### Method B: Use Git Credential Manager

```bash
# Clear old credentials
git credential-osxkeychain erase
host=github.com
protocol=https
[Press Enter twice]

# Try push again
git push -u origin main
```

When prompted:
- Username: `risodkarshreyas`
- Password: **Paste your token**

---

### Method C: Use SSH Instead (Recommended - No Token Needed!)

#### 1. Generate SSH Key:
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```
Press Enter 3 times (accept defaults)

#### 2. Copy SSH Key:
```bash
cat ~/.ssh/id_ed25519.pub
```
Copy the entire output (starts with `ssh-ed25519`)

#### 3. Add to GitHub:
- Go to: https://github.com/settings/keys
- Click **"New SSH key"**
- Title: `My Mac`
- Paste your key
- Click **"Add SSH key"**

#### 4. Change Remote to SSH:
```bash
git remote remove origin
git remote add origin git@github.com:risodkarshreyas/Pristine_Premeir_League.git
git push -u origin main
```

No more tokens or passwords needed!

---

## 🔍 Common Issues

### "Token doesn't work"
- Make sure you checked **repo** scope when creating token
- Token must not be expired
- Copy the entire token (starts with `ghp_`)

### "Repository not found"
- Verify repo exists: https://github.com/risodkarshreyas/Pristine_Premeir_League
- Check you're logged into correct GitHub account
- Make sure repo is not private (or you have access)

### "Permission denied (publickey)" (SSH)
- Make sure you added SSH key to GitHub
- Test connection: `ssh -T git@github.com`

---

## ✅ Quick Fix Commands

**Option 1: Token in URL (Fastest)**
```bash
git remote remove origin
git remote add origin https://YOUR_TOKEN@github.com/risodkarshreyas/Pristine_Premeir_League.git
git push -u origin main
```

**Option 2: SSH (Best for long-term)**
```bash
# Generate key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: https://github.com/settings/keys

# Change remote
git remote remove origin
git remote add origin git@github.com:risodkarshreyas/Pristine_Premeir_League.git
git push -u origin main
```

---

## 📞 Still Having Issues?

### Check Your Token Permissions:
1. Go to: https://github.com/settings/tokens
2. Click on your token
3. Make sure these are checked:
   - ✅ repo
   - ✅ repo:status
   - ✅ repo_deployment
   - ✅ public_repo
   - ✅ repo:invite

### Verify Repository Access:
- Can you see the repo at: https://github.com/risodkarshreyas/Pristine_Premeir_League
- Are you logged in as `risodkarshreyas`?
- Is the repo public or do you have write access?

---

## 🎯 Recommended Solution

**Use SSH (Method C)** - It's the most reliable and you won't need to enter credentials again!

1. Generate SSH key
2. Add to GitHub
3. Change remote to SSH
4. Push

Takes 2 minutes and works forever!

---

**Need the token?** https://github.com/settings/tokens
**Need to add SSH key?** https://github.com/settings/keys
