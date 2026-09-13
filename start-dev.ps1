# PowerShell script to start services and webapp in separate terminal windows

$ProjectRoot = $PSScriptRoot

Write-Host "🚀 Launching Tour Itinerary Services (NestJS) & WebApp (Next.js)..." -ForegroundColor Green

# Start NestJS Services on Port 4000
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$ProjectRoot\services'; Write-Host '⚡ Starting NestJS Backend Service (http://localhost:4000)...' -ForegroundColor Cyan; npm run start:dev"

# Start Next.js Web Application on Port 3000
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$ProjectRoot\webapp'; Write-Host '🌐 Starting Next.js Web Application (http://localhost:3000)...' -ForegroundColor Magenta; npm run dev"

Write-Host "✅ Both processes started in separate windows!" -ForegroundColor Yellow
