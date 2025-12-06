#!/bin/bash

# Script to push code to GitHub
# Make sure to replace YOUR_USERNAME with your actual GitHub username

echo "🚀 Pushing Pristine Premier League to GitHub"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Add all files
echo "📝 Adding all files..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Initial commit - Pristine Premier League Tournament System"

# Instructions for user
echo ""
echo "✅ Files committed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Create a repository on GitHub: https://github.com/new"
echo "2. Name it: pristine-premier-league"
echo "3. DO NOT initialize with README, .gitignore, or license"
echo "4. Copy your repository URL"
echo ""
echo "Then run these commands (replace YOUR_USERNAME):"
echo ""
echo "git remote add origin https://github.com/YOUR_USERNAME/pristine-premier-league.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""
