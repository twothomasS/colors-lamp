# COP4331 Colors Project Application

This repository contains the codebase for a Colors Application created for COP4331 at the University of Central Florida (UCF).

The application allows users to log in to their accounts, create colors, and search for colors they have added.

## Technologies

The application uses a LAMP stack for the backend and HTML, CSS, and JavaScript for frontend functionality.

The LAMP stack consists of:

- **Linux:** Operating system for the server
- **Apache:** HTTP web server
- **MySQL:** Database management system
- **PHP:** Backend API

The frontend uses:

- HTML
- CSS
- JavaScript

## Setup Instructions

### 1. Purchase and activate a LAMP server

- Purchase and activate a server with a LAMP stack installed.
- DigitalOcean is recommended because it is relatively inexpensive and easy to use.
- After creating your account, select the option to create a server and choose a LAMP stack image during setup.

### 2. Connect to your server using SSH

- Once your server has been created, connect using:

  ```bash
  ssh root@your-server-ip
  ```

- Enter the password you created when purchasing the server.
- Navigate to the web server directory:

  ```bash
  cd /var/www/html/
  ```

### 3. Create the MySQL database

- Open MySQL:

  ```bash
  mysql -u root -p
  ```

- Enter your MySQL root password.
- Create a database. Replace `databasename` with your desired database name:

  ```sql
  CREATE DATABASE databasename;
  ```

- Select the database:

  ```sql
  USE databasename;
  ```

- Create the `Users` table:

  ```sql
  CREATE TABLE Users (
      ID INT NOT NULL AUTO_INCREMENT,
      FirstName VARCHAR(50) NOT NULL DEFAULT '',
      LastName VARCHAR(50) NOT NULL DEFAULT '',
      Login VARCHAR(50) NOT NULL DEFAULT '',
      Password VARCHAR(255) NOT NULL DEFAULT '',
      PRIMARY KEY (ID)
  ) ENGINE=InnoDB;
  ```

- Create the `Colors` table:

  ```sql
  CREATE TABLE Colors (
      ID INT NOT NULL AUTO_INCREMENT,
      Name VARCHAR(50) NOT NULL DEFAULT '',
      UserID INT NOT NULL DEFAULT 0,
      PRIMARY KEY (ID)
  ) ENGINE=InnoDB;
  ```

- Create a user account for the application:

  ```sql
  INSERT INTO Users (FirstName, LastName, Login, Password)
  VALUES ('Fname', 'Lname', 'uname', 'pword');
  ```

- Create a separate MySQL account for the API. Replace the example username and password with your own:

  ```sql
  CREATE USER 'uname'@'localhost' IDENTIFIED BY 'pword';
  ```

- Grant the API user access to the application database:

  ```sql
  GRANT ALL PRIVILEGES ON databasename.* TO 'uname'@'localhost';
  ```

- Apply the privilege changes:

  ```sql
  FLUSH PRIVILEGES;
  ```

**Important:** Keep track of your database name, API username, and API password. You will need them in a later step.

### 4. Upload the repository files to your server

- Using SCP, Git, or another file transfer method, upload everything inside this repository's `public/` directory into:

  ```text
  /var/www/html/
  ```

- Also upload the entire `api/` directory into:

  ```text
  /var/www/html/api/
  ```

### 5. Configure sensitive information

- In `public/js/code.js`, locate:

  ```javascript
  const urlBase = 'http:YOURDOMAIN/api';
  ```

- Replace the placeholder with your actual API URL. For example:

  ```javascript
  const urlBase = 'https://your-domain.com/api';
  ```

- Inside the `api/` directory, create a file named `key.json`.
- Add your MySQL connection information using the following format:

  ```json
  {
      "host": "localhost",
      "user": "uname",
      "password": "pword",
      "db": "databasename"
  }
  ```

- Replace the example values with the database credentials you created earlier.

**Important:** Do not commit `key.json` or other files containing passwords or database credentials to a public GitHub repository.

### 6. Start using the application

Once the files and database are configured, navigate to your server's domain name or IP address in a web browser.

Your application should now be accessible.

## Running the Application

To use the application, navigate to your server's IP address or domain name.

Log in using a username and password that have been inserted into the `Users` table.

After successfully logging in, you will be taken to the second page, where you can search for existing colors or add new colors to your account.

## Assumptions, Limitations, and AI Usage

This application was designed as an introductory college assignment and is intentionally simple in its functionality and implementation.

No artificial intelligence was used in the original development of this repository.

Additional information can be found in `LICENSE.md`.
