#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build

# Build backend
echo "📦 Building backend..."
cd ../backend
npm install
npm run build

# Start backend
echo "🚀 Starting backend server..."
NODE_ENV=production npm start &

# Start frontend
echo "🚀 Starting frontend server..."
cd ../frontend
NODE_ENV=production npm start

echo "✅ Deployment complete!" 