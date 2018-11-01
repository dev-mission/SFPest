# SFPest
Softwares PreInstall Requirements: node and postgres
Steps on "How to Join" this project as a developer
1) Clone this Repository to your Computer from Github
2) In the terminal type "git clone (Repository URL Copied from Github)" and press enter
3) Change into the project directory and run the following line in the terminal "npm install"
4) Start your postgres database
5) Edit the /config.json file and edit the development settings for username and password as needed
6) Create the database by typing the following in your terminal without the quotation marks "node_modules/.bin/sequelize db:create"
7) Run the migrate command by typing the following without quotation marks "node_modules/.bin/sequelize db:migrate"
