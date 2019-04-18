# SFPest

## Docker-based Development

1) Install Docker for your OS: https://www.docker.com/products/docker-desktop
2) Clone this repo into a directory on your computer
3) In the root of this repo directory, bring up the environment: ```$ docker-compose up```
4) In another shell, log in to the running server instance: ```$ docker-compose exec server bash -l```
5) Create the database: ```# sequelize db:create```
6) Run the database migrations: ```# sequelize db:migrate```
7) Open the web app in your browser at: http://localhost:3000/
