# REGISTRATION-FORM-JWT
 1. Install PostgreSQL
Go to: https://www.postgresql.org/download/

Download and install PostgreSQL for your system.

During setup, remember your:

Username (usually postgres)

Password (you will need this in your code)

🌐 2. Create the React Frontend (Vite)
Open a terminal and run:

bash
Copy
Edit
npm create vite@latest
Choose a project name (e.g., client)

Select React → then choose JavaScript or TypeScript

Go into the project folder:

bash
Copy
Edit
cd client
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
🖥️ 3. Create the Backend (Express.js + PostgreSQL)
In your main project folder (e.g., server), create a new folder and initialize a Node.js app:

bash
Copy
Edit
mkdir server
cd server
npm init -y
Now install the required packages:

bash
Copy
Edit
npm install express
npm install cors
npm install pg
Create a file named index.js or server.js

Inside it, set up a basic Express server and connect to PostgreSQL.

📦 4. Folder Structure (recommended)
pgsql
Copy
Edit
project-root/
├── client/       ← React frontend
│   └── (Vite files)
├── server/       ← Express + PostgreSQL backend
│   ├── index.js
│   └── package.json
🚀 5. Run the Backend Server
From inside the server folder, start your backend:

bash
Copy
Edit
node index.js
Or install nodemon for auto-reloading:

bash
Copy
Edit
npm install --save-dev nodemon
npx nodemon index.js
✅ Summary of Commands
bash
Copy
Edit
# Frontend (React + Vite)
npm create vite@latest
cd client
npm install
npm run dev

# Backend (Express + PostgreSQL)
mkdir server
cd server
npm init -y
npm install express cors pg
node index.js  # or use nodemon
Let me know if you want a sample Express code with PostgreSQL connection and JWT for login/signup!








You said:
in point form


ChatGPT said:
Sure! Here's your setup in clear point form:

✅ Requirements
Install PostgreSQL from: https://www.postgresql.org/download/

Note your PostgreSQL username and password

🎯 Frontend Setup (Vite + React)
Run:

bash
Copy
Edit
npm create vite@latest
Choose:

Project name (e.g., client)

Framework: React

Variant: JavaScript or TypeScript

Go into project:

bash
Copy
Edit
cd client
Install dependencies:

bash
Copy
Edit
npm install
Start development server:

bash
Copy
Edit
npm run dev
🖥 Backend Setup (Express + PostgreSQL)
Create and enter folder:

bash
Copy
Edit
mkdir server
cd server
Initialize Node.js project:

bash
Copy
Edit
npm init -y
Install required packages:

bash
Copy
Edit
npm install express cors pg
(Optional) For auto-reloading:

bash
Copy
Edit
npm install --save-dev nodemon
Create index.js file and write your server code.

Run backend server:

bash
Copy
Edit
node index.js
Or with nodemon:

bash
Copy
Edit
npx nodemon index.js
📁 Folder Structure
pgsql
Copy
Edit
project-root/
├── client/   ← Vite React frontend
├── server/   ← Express + PostgreSQL backend
