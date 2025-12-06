# 📝 Rename Project to Pristine_Premier_League-2026

I've updated the configuration files. Now you need to rename the folder.

---

## ✅ What I've Already Updated:

- ✅ `package.json` - Project name changed
- ✅ `.azure/config` - Azure configuration updated
- ✅ All internal references updated

---

## 📁 Step 1: Rename the Folder

### Option A: Using Finder (Easiest)

1. **Close your IDE/editor**
2. **Open Finder**
3. **Navigate to:** `Documents` folder
4. **Find:** `my-kiro-project` folder
5. **Right-click** → **Rename**
6. **New name:** `Pristine_Premier_League-2026`
7. **Press Enter**
8. **Reopen the folder** in your IDE

---

### Option B: Using Terminal

```bash
# Go to parent directory
cd ~/Documents

# Rename the folder
mv my-kiro-project Pristine_Premier_League-2026

# Go into renamed folder
cd Pristine_Premier_League-2026
```

---

## 🔄 Step 2: Update Git Remote (If Already Connected)

If you've already connected to GitHub, update the remote:

```bash
# Check current remote
git remote -v

# If you want to keep the same GitHub repo, no changes needed!
# The folder name doesn't have to match the repo name

# If you want to create a new repo with the new name:
git remote remove origin
git remote add origin https://github.com/risodkarshreyas/Pristine_Premier_League-2026.git
```

---

## 📦 Step 3: Update Package Lock (Optional)

```bash
# Regenerate package-lock.json with new name
rm package-lock.json
npm install
```

---

## ✅ Verification Checklist

After renaming:

- [ ] Folder renamed to `Pristine_Premier_League-2026`
- [ ] Can open folder in IDE
- [ ] `package.json` shows correct name
- [ ] Git still works (`git status`)
- [ ] Can run `npm start` successfully

---

## 🚀 Updated Deployment Commands

### Azure:
```bash
az webapp up --name pristine-premier-league-2026 --runtime "NODE:18-lts" --sku F1
```

### Heroku:
```bash
heroku create pristine-premier-league-2026
```

---

## 💡 Important Notes

1. **Folder name** = Local directory name on your computer
2. **Package name** = Name in `package.json` (already updated)
3. **GitHub repo name** = Name on GitHub (can be different)
4. **Azure app name** = Name on Azure (can be different)

They don't all have to match!

---

## 🎯 Recommended Approach

**Keep it simple:**
- ✅ Rename folder: `Pristine_Premier_League-2026`
- ✅ Keep GitHub repo: `Pristine_Premeir_League` (already exists)
- ✅ Azure app name: `pristine-premier-league-2026` (when deploying)

This way you don't need to recreate the GitHub repo!

---

## 🐛 If Something Breaks

### "Git not working after rename"
```bash
# Just reinitialize
git init
git remote add origin https://github.com/risodkarshreyas/Pristine_Premeir_League.git
```

### "Can't find project"
- Make sure you opened the renamed folder in your IDE
- Check you're in the right directory: `pwd`

### "npm commands not working"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ Quick Steps Summary

1. **Close IDE**
2. **Rename folder** in Finder: `my-kiro-project` → `Pristine_Premier_League-2026`
3. **Reopen folder** in IDE
4. **Test:** `npm start`
5. **Done!**

---

**The configuration files are already updated. Just rename the folder and you're good to go!**
