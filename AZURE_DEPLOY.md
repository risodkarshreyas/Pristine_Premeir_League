# Deploy to Azure - Pristine Premier League

Complete guide to deploy your application to Microsoft Azure.

---

## 🎯 Prerequisites

- Azure account (free tier available: https://azure.microsoft.com/free/)
- Node.js installed locally (for testing)
- Git installed

---

## 🚀 Option 1: Azure App Service (Recommended - Easiest)

### Method A: Deploy via Azure Portal (No CLI needed)

#### Step 1: Create Azure Account
1. Go to https://portal.azure.com
2. Sign up for free account (includes $200 credit)

#### Step 2: Create App Service
1. Click **"Create a resource"**
2. Search for **"Web App"**
3. Click **"Create"**

#### Step 3: Configure Web App
Fill in the details:

**Basics:**
- **Subscription:** Your subscription
- **Resource Group:** Create new → `pristine-premier-league-rg`
- **Name:** `pristine-premier-league` (must be globally unique)
- **Publish:** Code
- **Runtime stack:** Node 18 LTS
- **Operating System:** Linux
- **Region:** Choose closest to you (e.g., East US)

**App Service Plan:**
- **Linux Plan:** Create new → `pristine-plan`
- **Sku and size:** F1 (Free tier) or B1 (Basic - $13/month)

Click **"Review + Create"** → **"Create"**

#### Step 4: Deploy Code

**Option 4A: Local Git Deployment**

1. In Azure Portal, go to your App Service
2. Click **"Deployment Center"** (left menu)
3. Choose **"Local Git"**
4. Click **"Save"**
5. Go to **"Deployment credentials"**
6. Set username and password
7. Copy the Git URL

In your terminal:
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Add Azure remote
git remote add azure <YOUR_GIT_URL>

# Push to Azure
git push azure main
```

**Option 4B: GitHub Deployment**

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/pristine-premier-league.git
git push -u origin main
```

2. In Azure Portal → Deployment Center
3. Choose **"GitHub"**
4. Authorize Azure to access GitHub
5. Select your repository and branch
6. Click **"Save"**

Azure will automatically deploy on every push!

**Option 4C: ZIP Deploy**

1. Create a ZIP file of your project:
```bash
zip -r app.zip . -x "node_modules/*" -x ".git/*" -x "data/*"
```

2. In Azure Portal → Development Tools → Advanced Tools
3. Click **"Go"** → Opens Kudu
4. Go to **"Tools"** → **"Zip Push Deploy"**
5. Drag and drop your `app.zip`

#### Step 5: Configure Application Settings

1. Go to **"Configuration"** (left menu)
2. Click **"Application settings"**
3. Add these settings:

```
NODE_ENV = production
WEBSITE_NODE_DEFAULT_VERSION = 18-lts
SCM_DO_BUILD_DURING_DEPLOYMENT = true
```

4. Click **"Save"**

#### Step 6: Access Your App

Your app will be available at:
```
https://pristine-premier-league.azurewebsites.net
```

Go to:
```
https://pristine-premier-league.azurewebsites.net/login.html
```

---

## 🔧 Option 2: Azure CLI Deployment (Faster)

### Step 1: Install Azure CLI

**macOS:**
```bash
brew update && brew install azure-cli
```

**Or download from:** https://aka.ms/installazureclimacos

### Step 2: Login to Azure
```bash
az login
```

This opens a browser for authentication.

### Step 3: Create Resource Group
```bash
az group create \
  --name pristine-premier-league-rg \
  --location eastus
```

### Step 4: Create App Service Plan
```bash
az appservice plan create \
  --name pristine-plan \
  --resource-group pristine-premier-league-rg \
  --sku F1 \
  --is-linux
```

### Step 5: Create Web App
```bash
az webapp create \
  --resource-group pristine-premier-league-rg \
  --plan pristine-plan \
  --name pristine-premier-league \
  --runtime "NODE:18-lts"
```

### Step 6: Configure Deployment
```bash
# Set Node version
az webapp config appsettings set \
  --resource-group pristine-premier-league-rg \
  --name pristine-premier-league \
  --settings NODE_ENV=production

# Enable local git deployment
az webapp deployment source config-local-git \
  --name pristine-premier-league \
  --resource-group pristine-premier-league-rg
```

### Step 7: Get Deployment Credentials
```bash
az webapp deployment list-publishing-credentials \
  --name pristine-premier-league \
  --resource-group pristine-premier-league-rg \
  --query "{URL:scmUri}" \
  --output table
```

### Step 8: Deploy
```bash
# Initialize git
git init
git add .
git commit -m "Initial deployment"

# Add Azure remote (use URL from step 7)
git remote add azure <DEPLOYMENT_URL>

# Push to Azure
git push azure main
```

### Step 9: Open Your App
```bash
az webapp browse \
  --name pristine-premier-league \
  --resource-group pristine-premier-league-rg
```

---

## 🐳 Option 3: Azure Container Instances (Docker)

### Step 1: Build Docker Image
```bash
docker build -t pristine-premier-league .
```

### Step 2: Create Azure Container Registry
```bash
az acr create \
  --resource-group pristine-premier-league-rg \
  --name pristineregistry \
  --sku Basic
```

### Step 3: Login to Registry
```bash
az acr login --name pristineregistry
```

### Step 4: Tag and Push Image
```bash
docker tag pristine-premier-league pristineregistry.azurecr.io/pristine-premier-league:v1
docker push pristineregistry.azurecr.io/pristine-premier-league:v1
```

### Step 5: Deploy Container
```bash
az container create \
  --resource-group pristine-premier-league-rg \
  --name pristine-container \
  --image pristineregistry.azurecr.io/pristine-premier-league:v1 \
  --dns-name-label pristine-premier-league \
  --ports 3000
```

---

## 🗄️ Option 4: Azure Static Web Apps + Azure Functions

For a serverless approach:

### Step 1: Install Static Web Apps CLI
```bash
npm install -g @azure/static-web-apps-cli
```

### Step 2: Create Static Web App
```bash
az staticwebapp create \
  --name pristine-premier-league \
  --resource-group pristine-premier-league-rg \
  --source https://github.com/YOUR_USERNAME/pristine-premier-league \
  --location "East US 2" \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "/"
```

---

## 📊 Post-Deployment Configuration

### Enable Custom Domain (Optional)

1. Go to Azure Portal → Your App Service
2. Click **"Custom domains"**
3. Click **"Add custom domain"**
4. Follow the wizard to add your domain

### Enable HTTPS/SSL

1. Go to **"TLS/SSL settings"**
2. Click **"Private Key Certificates"**
3. Upload certificate or use App Service Managed Certificate (free)

### Configure Data Persistence

Azure App Service has ephemeral storage. For persistent data:

**Option A: Azure Blob Storage**
```bash
npm install @azure/storage-blob
```

**Option B: Azure Cosmos DB**
```bash
npm install @azure/cosmos
```

**Option C: Azure Database for PostgreSQL**
```bash
npm install pg
```

### Set Up Monitoring

1. Go to **"Application Insights"**
2. Click **"Enable"**
3. View logs and metrics

### Configure Scaling

1. Go to **"Scale up (App Service plan)"**
2. Choose tier based on needs:
   - **F1:** Free (1 GB RAM, 60 min/day)
   - **B1:** Basic ($13/month, always on)
   - **S1:** Standard ($70/month, auto-scale)

---

## 🔍 Troubleshooting

### View Logs
```bash
# Stream logs
az webapp log tail \
  --name pristine-premier-league \
  --resource-group pristine-premier-league-rg

# Or in portal: Monitoring → Log stream
```

### SSH into Container
```bash
az webapp ssh \
  --name pristine-premier-league \
  --resource-group pristine-premier-league-rg
```

### Common Issues

**"Application Error"**
- Check logs: Portal → Log stream
- Verify Node version in Configuration
- Ensure package.json has correct start script

**"Cannot find module"**
- Add to Configuration:
  ```
  SCM_DO_BUILD_DURING_DEPLOYMENT = true
  ```

**Data not persisting**
- Use Azure Storage or Database
- Mount persistent storage volume

**Port issues**
- Azure automatically sets PORT environment variable
- Your app already uses `process.env.PORT || 3000`

---

## 💰 Cost Estimation

**Free Tier (F1):**
- Cost: $0/month
- Limitations: 60 min/day, 1 GB RAM, no custom domain SSL

**Basic Tier (B1):**
- Cost: ~$13/month
- Features: Always on, custom domain, SSL, 1.75 GB RAM

**Standard Tier (S1):**
- Cost: ~$70/month
- Features: Auto-scale, staging slots, daily backups

---

## 🚀 Quick Deploy Commands (All-in-One)

```bash
# Login
az login

# Create everything
az group create --name pristine-rg --location eastus
az appservice plan create --name pristine-plan --resource-group pristine-rg --sku F1 --is-linux
az webapp create --resource-group pristine-rg --plan pristine-plan --name pristine-premier-league --runtime "NODE:18-lts"

# Deploy
git init
git add .
git commit -m "Deploy to Azure"
az webapp deployment source config-local-git --name pristine-premier-league --resource-group pristine-rg
git remote add azure $(az webapp deployment list-publishing-credentials --name pristine-premier-league --resource-group pristine-rg --query scmUri -o tsv)
git push azure main

# Open
az webapp browse --name pristine-premier-league --resource-group pristine-rg
```

---

## ✅ Deployment Checklist

- [ ] Azure account created
- [ ] Resource group created
- [ ] App Service created
- [ ] Code deployed
- [ ] Application settings configured
- [ ] App accessible via URL
- [ ] Login tested (admin/admin123)
- [ ] Team registration tested
- [ ] Schedule generation tested
- [ ] Custom domain configured (optional)
- [ ] SSL enabled
- [ ] Monitoring enabled

---

## 📞 Support

**Azure Documentation:**
- https://docs.microsoft.com/azure/app-service/

**Azure Support:**
- https://azure.microsoft.com/support/

**Pricing Calculator:**
- https://azure.microsoft.com/pricing/calculator/

---

**Recommended:** Start with Option 1 (Azure Portal) for the easiest deployment!

Your app will be live at: `https://pristine-premier-league.azurewebsites.net`
