---

# Full Stack App (Vite + React + Node.js)

A clean starter project using **Vite + React** for the frontend and **Node.js + Express** for the backend.

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

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd my-app
```

---

### 2. Install dependencies

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

### 3. Run the application

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

.env file in the server folder:

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