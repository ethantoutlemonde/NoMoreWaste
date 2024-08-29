# Ouvrir une nouvelle fenêtre PowerShell et exécuter les commandes
Start-Process powershell -ArgumentList "cd `.\back-end` ; php artisan serve" -WindowStyle Minimized
Start-Process powershell -ArgumentList "cd `.\back-office` ; npm run dev" -WindowStyle Minimized
Start-Process powershell -ArgumentList "cd `.\front-end` ; npm run dev" -WindowStyle Minimized
Start-Process powershell -ArgumentList "cd `.\back-end\mapPlan` ; flask run" -WindowStyle Minimized
