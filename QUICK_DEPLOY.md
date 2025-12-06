# Quick Deploy Guide

Choose your preferred platform and follow the steps:

## 🚀 Fastest: Azure (10 minutes)

```bash
# 1. Install Azure CLI (macOS)
brew install azure-cli

# 2. Login
az login

# 3. Deploy (one command!)
az webapp up --name pristine-premier-league --runtime "NODE:18-lts" --sku F1

# 4. Open your app
az webapp browse --name pristine-premier-league
```

**Your app is live!** 🎉

Default URL: `https://pristine-premier-league.azurewebsites.net`

See [AZURE_QUICK_START.md](AZURE_QUICK_START.md) for detailed guide.

---

## 🚀 Alternative: Heroku (5 minutes)

```bash
# 1. Install Heroku CLI
brew tap heroku/brew && brew install heroku

# 2. Login
heroku login

# 3. Create and deploy
heroku create pristine-premier-league
git init
git add .
git commit -m "Initial deployment"
git push heroku main

# 4. Open your app
heroku open
```

**Your app is live!** 🎉

Default URL: `https://pristine-premier-league.herokuapp.com`

---

## ⚡ Alternative: Railway (3 minutes)

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Deploy
railway init
railway up

# 4. Open
railway open
```

---

## 🐳 Docker (Local or Cloud)

```bash
# Build and run locally
docker-compose up -d

# Or build and push to Docker Hub
docker build -t your-username/pristine-premier-league .
docker push your-username/pristine-premier-league
```

---

## 📦 Vercel (Frontend-focused)

```bash
npm install -g vercel
vercel login
vercel --prod
```

**Note:** Vercel works best for static sites. Data persistence may be limited.

---

## 🖥️ VPS/Server (Full Control)

```bash
# SSH into your server
ssh user@your-server-ip

# Clone repo
git clone YOUR_REPO_URL
cd pristine-premier-league

# Install dependencies
npm install

# Install PM2
npm install -g pm2

# Start app
pm2 start server.js --name ppl
pm2 startup
pm2 save

# Setup Nginx (optional)
sudo apt install nginx
# Copy nginx.conf to /etc/nginx/sites-available/
```

---

## 🔑 After Deployment

1. **Test the app:**
   - Login with: `admin` / `admin123`
   - Register a test team
   - Generate schedule

2. **Configure domain (optional):**
   - Point your domain to the deployment
   - Enable SSL/HTTPS

3. **Monitor:**
   - Check logs regularly
   - Set up uptime monitoring

---

## 🆘 Troubleshooting

**App won't start?**
```bash
# Check logs
heroku logs --tail  # Heroku
railway logs        # Railway
pm2 logs ppl       # PM2
```

**Port issues?**
```bash
export PORT=8080
npm start
```

**Data not saving?**
- Ensure `data/` directory exists
- Check write permissions: `chmod -R 755 data/`

---

## 📞 Need Help?

1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guides
2. Review error logs
3. Verify all dependencies: `npm install`

---

**Recommended:** Start with Heroku for easiest deployment!
