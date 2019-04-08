# in powershell
dotnet publish -c Release 

# in powershell
cp dockerfile ./bin/release/netcoreapp2.2/publish
# in docker quick start
docker build -t migo-image ./bin/release/netcoreapp2.2/publish
# in docker quick start
docker tag migo-image registry.heroku.com/migo-app/web
# heroku container:login => As Mark said one time for live
# in docker quick start
docker push registry.heroku.com/migo-app/web
# in powershell
heroku container:release web -a migo-app

# sudo chmod 755 deploy.sh
# ./deploy.sh