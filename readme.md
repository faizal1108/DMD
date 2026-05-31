# SWS AI Document Hub Clone

A Full Stack Document Management Dashboard built using the MERN Stack. The application allows users to upload documents, track upload progress in real-time, manage a document library, and receive notifications when uploads are completed.

## Features

* Single and Bulk File Upload
* Drag and Drop Upload Interface
* Real-Time Upload Progress Tracking
* Document Library Management
* Download Uploaded Documents
* Notification Center
* Unread Notification Count
* Mark Notifications as Read
* Persistent Notifications using MongoDB
* Real-Time Updates using Socket.IO
* Responsive User Interface

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* Socket.IO
* Dotenv
* Cors

---

## Project Structure

```text
SWS-AI-Document-Hub-Clone/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── uploads/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## Clone the Repository

```bash
git clone https://github.com/faizal1108/DMD.git

cd DMD
```

Replace the GitHub URL with your repository URL.

---

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/your_db_collection_name
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## How to Use

1. Open the application in your browser.
2. Upload one or multiple files using the upload section.
3. Track upload progress in real time.
4. View uploaded documents in the Document Library.
5. Download documents when required.
6. View notifications from the notification bell icon.
7. Mark notifications as read or mark all as read.

---


