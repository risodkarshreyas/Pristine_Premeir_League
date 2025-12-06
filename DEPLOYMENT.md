# Deployment Guide - Pristine Premier League

This guide covers multiple deployment options for the Pristine Premier League application.

## Prerequisites

- Node.js 14+ installed
- Git installed
- Account on chosen platform (Heroku, Vercel, Railway, etc.)

---

## Option 1: Heroku Deployment (Recommended)

### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create Heroku App
```bash
heroku create pristine-premier-league
# Or use: heroku create (for random name)
```

### Step 4: Deploy
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Step 5: Open App
```bash
heroku open
```

### View Logs
```bash
heroku logs --tail
```

---

## Option 2: Vercel Deployment

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **pristine-premier-league**
- Directory? **./
- Override settings? **N**

### Step 4: Production Deployment
```bash
vercel --prod
```

**Note:** Vercel has limitations with file-based storage. Data will reset on each deployment. Consider using a database for production.

---

## Option 3: Railway Deployment

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login
```bash
railway login
```

### Step 3: Initialize Project
```bash
railway init
```

### Step 4: Deploy
```bash
railway up
```

### Step 5: Open App
```bash
railway open
```

---

## Option 4: DigitalOcean App Platform

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Create App on DigitalOcean
1. Go to https://cloud.digitalocean.com/apps
2. Click "Create App"
3. Connect your GitHub repository
4. Select the repository
5. Configure:
   - **Name:** pristine-premier-league
   - **Branch:** main
   - **Build Command:** npm install
   - **Run Command:** npm start
   - **HTTP Port:** 3000

### Step 3: Deploy
Click "Create Resources" and wait for deployment.

---

## Option 5: AWS EC2 (Manual Deployment)

### Step 1: Launch EC2 Instance
1. Go to AWS Console
2. Launch Ubuntu 22.04 LTS instance
3. Configure security group (allow ports 22, 80, 3000)

### Step 2: Connect to Instance
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

### Step 3: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 4: Clone and Setup
```bash
git clone YOUR_REPO_URL
cd pristine-premier-league
npm install
```

### Step 5: Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 start server.js --name ppl
pm2 startup
pm2 save
```

### Step 6: Setup Nginx (Optional)
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/ppl
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/ppl /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Option 6: Docker Deployment

### Step 1: Create Dockerfile
Already created in the project.

### Step 2: Build Image
```bash
docker build -t pristine-premier-league .
```

### Step 3: Run Container
```bash
docker run -p 3000:3000 -v $(pwd)/data:/app/data pristine-premier-league
```

### Step 4: Deploy to Docker Hub
```bash
docker tag pristine-premier-league YOUR_USERNAME/pristine-premier-league
docker push YOUR_USERNAME/pristine-premier-league
```

---

## Environment Variables

Create a `.env` file for production:

```env
PORT=3000
NODE_ENV=production
```

---

## Database Migration (Recommended for Production)

For production use, replace file-based storage with a database:

### MongoDB Option
```bash
npm install mongodb
```

### PostgreSQL Option
```bash
npm install pg
```

Update `server.js` to use database instead of JSON files.

---

## Post-Deployment Checklist

- [ ] Test login functionality
- [ ] Test team registration
- [ ] Test schedule generation
- [ ] Test admin edit features
- [ ] Verify data persistence
- [ ] Check mobile responsiveness
- [ ] Set up SSL certificate (Let's Encrypt)
- [ ] Configure custom domain
- [ ] Set up monitoring (UptimeRobot, etc.)
- [ ] Configure backups for data directory

---

## Troubleshooting

### Port Issues
If port 3000 is in use:
```bash
export PORT=8080
npm start
```

### Permission Issues
```bash
chmod -R 755 data/
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Data Not Persisting
Ensure the `data/` directory has write permissions and is not in `.gitignore` for the deployment platform.

---

## Monitoring & Logs

### Heroku
```bash
heroku logs --tail
```

### PM2 (EC2)
```bash
pm2 logs ppl
pm2 monit
```

### Docker
```bash
docker logs -f CONTAINER_ID
```

---

## Backup Strategy

### Manual Backup
```bash
# Backup data directory
tar -czf backup-$(date +%Y%m%d).tar.gz data/

# Restore
tar -xzf backup-YYYYMMDD.tar.gz
```

### Automated Backup (Cron)
```bash
crontab -e
```

Add:
```
0 2 * * * cd /path/to/app && tar -czf backup-$(date +\%Y\%m\%d).tar.gz data/
```

---

## Support

For issues or questions:
1. Check logs for errors
2. Verify all dependencies are installed
3. Ensure data directory has proper permissions
4. Check firewall/security group settings

---

## Quick Deploy Commands

### Heroku
```bash
heroku create && git push heroku main && heroku open
```

### Vercel
```bash
vercel --prod
```

### Railway
```bash
railway init && railway up
```

Choose the deployment option that best fits your needs!
