@echo off
title Tour Itinerary Launcher
echo ===================================================
echo  Starting NestJS Services & Next.js Web App
echo ===================================================

start "NestJS Backend Services (Port 4000)" cmd /k "cd services && npm run start:dev"
start "Next.js Web Application (Port 3000)" cmd /k "cd webapp && npm run dev"

echo Done! Two separate command windows have been opened.
