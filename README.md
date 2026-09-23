# COP4331 Colors Project Application
This repository is the code base for a Colors Application for the COP4331 at the University of Central Florida
It is a web application where a user logs into their account, and can create colors and then search for said colors.


# Technologies
For this application, a LAMP stack is used for the backend, and HTML, CSS, and Java Script is used for the front end intractability.

The LAMP stack is as follows:
- Linux operating system for the server
- Apache HTTP server system
- MySql for the database
- Php for the API

# Set Up Instructions

1. Purchase a LAMP stack server and activate it
   - While not required, it is recommended to use Digital Ocean because it is cheap and relatively easy to do.
   - Once your account, go to purchase server and during the process you will be able to select a LAMP stack
2. SSH to your server
   - Once the server is created, type `SSH root@"your server ip"`
   - Enter you password that you created when purchasing the server (if you used Digital Ocean)
   - Go to your html folder via `cd /var/www/html/`
3. Create your MySql Database
   - Open MySql via `mysql -u root -p` and enter your password. (If you did Digital Ocean, will be the same password as earlier)
   - Create your database via `create database name;` RECORD THE DATABASE NAME
   - use your database via `use name; `
   - Enter the following command to crease your Users table. Replace name with your database name
       > CREATE TABLE \`name\`.\`Users\`
       > 
       > (
       > 
       > \`ID\` INT NOT NULL AUTO_INCREMENT ,
       >    
       > \`FirstName\` VARCHAR(50) NOT NULL DEFAULT '' ,
       > 
       > \`LastName\` VARCHAR(50) NOT NULL DEFAULT '' ,
       > 
       > \`Login\` VARCHAR(50) NOT NULL DEFAULT '' ,
       > 
       > \`Password\` VARCHAR(50) NOT NULL DEFAULT '' ,
       > 
       > PRIMARY KEY (\`ID\`)
       > 
       > ) ENGINE = InnoDB;
       >
   - Enter the following command to create your Colors table. Once more, replace name with your database name
     >CREATE TABLE \`name\`.\`Colors\`
     >
     > (
     >
     > \`ID\` INT NOT NULL AUTO_INCREMENT ,
     >
     > \`Name\` VARCHAR(50) NOT NULL DEFAULT '' ,
     >
     > \`UserID\` INT NOT NULL DEFAULT '0' ,
     >
     > PRIMARY KEY (\`ID\`)
     >
     > ) ENGINE = InnoDB;
   - Then create accounts for the application via `insert into Users (FirstName, LastName, Login, Password) VALUES ('Fname','lname','uname','pword');`
   - Now create a user in MySql for your API to use. Do this via `create user 'uname' identified by 'pword';` REMEMBER THESE VALUES
   - Grant them all privileges for the database via `grant all privileges on databasename.* to 'uname'@%';`
4. Add files in repository into server
  -  Either via SCP, cloning the repo, or some other method, you must put everything under `public/` in this repository into `/var/www/html/` on your sever.
  -  Additionally, put the entire `api/` folder into the same `/var/www/html/` folder
5. Change sensitive information.
  - In `js/code.js` , you will need to change `const urlBase = 'http:YOURDOMAIN/api';` And change that to your URL
  - In `api/` create a file called `key.json` in this file you will put the information you wrote down in step 3 into here. The Json is formatted as follows:
    >{
    >
    >"host": "localhost",
    >
    >"user": "uname",
    >
    >"password": "pword",
    >
    >"db" : "databasename"
    >
    >}
6. And your application should be good to go! Go to your domain/ip address and start using it!


# Running the application
To run the application, simply go to your ip or domain. Login with a username and password your inserted into the table. It will take you to the second page, where you can search or add a color.

# Assumption, Limitation, and AI usage.

This application is designed for an into assignment for a college class and is therefore simple by nature. 

No artificial intelligence was used in any aspect of this repository.

All other information can be found in `LICENSE.md`
