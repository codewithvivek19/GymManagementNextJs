@echo off
echo Creating zip archive of the codebase (excluding node_modules)...
powershell -Command "Get-ChildItem -Path . -Exclude 'node_modules','.next' | Compress-Archive -DestinationPath 'gym-website-backup.zip' -Force"
echo Done. Archive saved as gym-website-backup.zip 