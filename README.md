---

# Full Stack App (Vite + React + Node.js)

A web application designed to connect cybersecurity volunteers with non-profit organizations (NGOs) that require security assistance.

---

## Project Structure

```
my-app/
    client/        # React (Vite)
    server/        # Node.js (Express)
    package.json   # Root scripts
    README.md
```

---

## Getting Started

### Install dependencies

#### Install root dependencies

```bash
npm install
```

#### Install frontend dependencies

```bash
cd client
npm install
```

#### Install backend dependencies

```bash
cd ../server
npm install
```

---

###  File Uploads
 The dedicated folder must be created on the backend server to store registration files generated during the application process.

 /server/uploads


### Run the application

From the root folder:

```bash
npm run dev
```

This will start:

* Frontend [http://localhost:5173]
* Backend [http://localhost:5000]

---

## API Example

Test endpoint:

```
GET /api/test
```

Response:

```json
{
  "message": "API test routes is working"
}
```

---

## Environment Variables

# Server
add .env file in the server folder

Configure the values based on your environment.

```env
PORT=5000
DB_HOST=localhost
DB_USER=glcdbuser
DB_PASSWORD=password123
DB_NAME=GLC_DB
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
UPLOAD_DIR=uploads
```

# Client

add .env file in the client folder

VITE_ADMIN_EMAIL=admin@guardianlink.com


## Available Scripts

### Root

```bash
npm run dev     # Run frontend + backend together
```

### Client

```bash
npm run dev     # Start Vite dev server
```

### Server

```bash
npm run dev     # Start server with nodemon
npm start       # Start server normally
```



### Database
```bash
node server/db/create_password.js # create admin password (if needed)

sudo mysql -u root -p < server/db/schema.sql # create database structure 
sudo mysql -u root -p < server/db/seed.sql # import initial data
```


### Tests (server api)
Run the following command in the server folder, where Jest is installed and the test is configured in package.json
```bash
npm test
```

### Email Server Configuration
Email Setup

For development environments, use Mailpit as a local email testing tool
The application uses Nodemailer for sending email

Run Mailpit with Docker
```bash
docker run -d --name mailpit -p 1025:1025 -p 8025:8025 axllent/mailpit
```
Start 
```bash
docker start mailpit
```
Stop
```bash
docker stop mailpit
```


Mailpit Web UI  
http://localhost:8025



### Mail Configuration

Set the following values to the server .env file:

```env
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USER=
MAIL_PASS=
MAIL_FROM=GuardianLink <noreply@guardianlink.com>
MAIL_ADMIN=GuardianLink <admin@guardianlink.com>
```