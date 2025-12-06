# 🚀 Azure Quick Start - 10 Minutes to Deploy

The fastest way to deploy Pristine Premier League to Azure.

---

## 🎯 What You Need

- Azure account (get free $200 credit: https://azure.microsoft.com/free/)
- Your code ready (you have this!)

---

## ⚡ Method 1: Azure Portal (No Command Line - Easiest!)

### Step 1: Sign Up for Azure (2 minutes)
1. Go to: **https://portal.azure.com**
2. Click **"Start free"** or **"Sign in"**
3. Complete registration (free $200 credit, no charges for 30 days)

### Step 2: Create Web App (3 minutes)
1. Click **"Create a resource"** (big + button)
2. Search: **"Web App"**
3. Click **"Create"**

### Step 3: Fill in Details (2 minutes)
```
Resource Group: [Create new] → pristine-rg
Name: pristine-premier-league (or any unique name)
Publish: Code
Runtime stack: Node 18 LTS
Operating System: Linux
Region: East US (or closest to you)
Pricing: F1 (Free)
```

Click **"Review + Create"** → **"Create"**

Wait 1-2 minutes for deployment.

### Step 4: Deploy Your Code (3 minutes)

**Option A: ZIP Upload (Easiest)**

1. Create ZIP file on your computer:
   - Select all project files
   - Right-click → Compress (or use Archive Utility)
   - Name it `app.zip`

2. In Azure Portal:
   - Go to your Web App
   - Click **"Advanced Tools"** (left menu)
   - Click **"Go"** → Opens Kudu
   - Click **"Tools"** → **"Zip Push Deploy"**
   - Drag and drop your `app.zip`

**Option B: GitHub (Automatic)**

1. Push code to GitHub first:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/pristine-premier-league.git
   git push -u origin main
   ```

2. In Azure Portal:
   - Go to your Web App
   - Click **"Deployment Center"**
   - Choose **"GitHub"**
   - Authorize and select your repo
   - Click **"Save"**

### Step 5: Configure Settings (1 minute)

1. Go to **"Configuration"** (left menu)
2. Click **"Application settings"**
3. Add:
   ```
   NODE_ENV = production
   ```
4. Click **"Save"** → **"Continue"**

### Step 6: Access Your App! 🎉

Your app is live at:
```
https://pristine-premier-league.azurewebsites.net/login.html
```

(Replace `pristine-premier-league` with your chosen name)

**Login with:**
- Admin: `admin` / `admin123`
- User: `user` / `user123`

---

## ⚡ Method 2: Azure CLI (For Developers)

### Prerequisites
```bash
# Install Azure CLI (macOS)
brew install azure-cli

# Or download: https://aka.ms/installazureclimacos
```

### One-Command Deploy
```bash
# 1. Login
az login

# 2. Run this script (copy all lines)
az group create --name pristine-rg --location eastus && \
az appservice plan create --name pristine-plan --resource-group pristine-rg --sku F1 --is-linux && \
az webapp create --resource-group pristine-rg --plan pristine-plan --name pristine-premier-league --runtime "NODE:18-lts" && \
az webapp config appsettings set --resource-group pristine-rg --name pristine-premier-league --settings NODE_ENV=production

# 3. Deploy code
git init
git add .
git commit -m "Deploy to Azure"
az webapp up --name pristine-premier-league --resource-group pristine-rg --runtime "NODE:18-lts"

# 4. Open app
az webapp browse --name pristine-premier-league --resource-group pristine-rg
```

Done! Your app is live.

---

## 🔧 After Deployment

### View Your App
```
https://YOUR-APP-NAME.azurewebsites.net/login.html
```

### View Logs
Azure Portal → Your App → **"Log stream"**

### Update Your App

**If using GitHub:**
Just push to GitHub - auto-deploys!

**If using ZIP:**
Upload new ZIP file to Kudu

**If using CLI:**
```bash
git add .
git commit -m "Update"
git push azure main
```

---

## 💡 Pro Tips

### Make Your App Always On (Recommended)
1. Upgrade to Basic tier (B1) - $13/month
2. Go to **"Configuration"** → **"General settings"**
3. Turn on **"Always On"**

### Add Custom Domain
1. Buy domain (GoDaddy, Namecheap, etc.)
2. Azure Portal → **"Custom domains"**
3. Follow wizard

### Enable HTTPS
1. Azure Portal → **"TLS/SSL settings"**
2. Enable **"HTTPS Only"**
3. Use free App Service Managed Certificate

---

## 🐛 Troubleshooting

### "Application Error"
1. Check logs: Portal → Log stream
2. Verify Node version: Configuration → General settings
3. Restart app: Overview → Restart

### "Cannot find module"
Add to Configuration → Application settings:
```
SCM_DO_BUILD_DURING_DEPLOYMENT = true
```

### App is slow
- Upgrade from F1 (Free) to B1 (Basic)
- Enable "Always On"

### Data disappears
- Azure App Service has temporary storage
- For production, use Azure Database or Storage

---

## 💰 Costs

**Free Tier (F1):**
- $0/month
- 60 minutes/day compute
- Perfect for testing

**Basic Tier (B1):**
- ~$13/month
- Always on
- Better performance
- Recommended for production

**Calculate costs:** https://azure.microsoft.com/pricing/calculator/

---

## ✅ Quick Checklist

- [ ] Azure account created
- [ ] Web App created
- [ ] Code deployed (ZIP or GitHub)
- [ ] App accessible at .azurewebsites.net
- [ ] Logged in successfully
- [ ] Tested team registration
- [ ] Tested schedule generation

---

## 📚 Need More Help?

- **Full Guide:** [AZURE_DEPLOY.md](AZURE_DEPLOY.md)
- **Azure Docs:** https://docs.microsoft.com/azure/app-service/
- **Azure Support:** https://azure.microsoft.com/support/

---

## 🎉 You're Done!

Your tournament management system is now live on Azure!

Share your URL:
```
https://pristine-premier-league.azurewebsites.net/login.html
```

**Next Steps:**
1. Test all features
2. Share with users
3. Consider upgrading to Basic tier for production
4. Add custom domain (optional)
5. Enable monitoring

---

**Total Time: ~10 minutes** ⏱️

**Recommended:** Use Method 1 (Azure Portal) if you're new to Azure!
