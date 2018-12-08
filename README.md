# SFPest
Softwares PreInstall Requirements: node and postgres
Steps on "How to Join" this project as a developer
1) Clone this Repository to your Computer from Github
2) In the terminal type "git clone (Repository URL Copied from Github)" and press enter
3) Change into the project directory and run the following line in the terminal: ```npm install```
4) Start your postgres database
5) Make a copy of example.env called .env: ```cp example.env .env```
6) Edit .env with your database username and password
7) Create the database by typing the following in your terminal: ```node_modules/.bin/sequelize db:create```
8) Run the migrate command by typing the following: ```node_modules/.bin/sequelize db:migrate```
9) Start the server with the command: ```npm start```
