@echo off
:: Запускаем Git Bash, переходим в папку OnSiteSeq и выполняем деплой
start "" "C:\Program Files\Git\git-bash.exe" -c "cd /e/Onsiteseq/onsiteseq_site/onsiteseq.github.io && sh deploy.sh"