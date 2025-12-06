#!/bin/bash

# Azure deployment script

# Exit on error
set -e

echo "Starting deployment..."

# Install dependencies
echo "Installing dependencies..."
npm install --production

# Create data directory if it doesn't exist
echo "Creating data directory..."
mkdir -p data

# Initialize data files if they don't exist
if [ ! -f data/teams.json ]; then
    echo "[]" > data/teams.json
fi

if [ ! -f data/config.json ]; then
    echo '{"men":{"maxTeams":16,"registered":0},"women":{"maxTeams":8,"registered":0}}' > data/config.json
fi

if [ ! -f data/schedules.json ]; then
    echo "{}" > data/schedules.json
fi

echo "Deployment complete!"
