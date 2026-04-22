## 🚀 Full Stack CRUD Application (React + Laravel)

A full-stack web application built using **React (Frontend)** and **Laravel (Backend API)**, deployed using Docker on Render with CI/CD integration.

---

## 🧩 Tech Stack

### Frontend

* React.js
* Axios (API calls)

### Backend

* Laravel 13 (API)
* PHP 8.4
* MySQL (optional)

### DevOps / Deployment

* Docker
* GitHub (Version Control)
* Render (CI/CD & Hosting)

---

## 📁 Project Structure

```
my-fullstack-project/
├── backend/        # Laravel API
│   ├── app/
│   ├── routes/
│   ├── Dockerfile
│   └── ...
│
├── frontend/       # React App
│   ├── src/
│   ├── public/
│   └── ...
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```
git clone https://github.com/your-username/my-fullstack-project.git
cd my-fullstack-project
```

---

## 🔧 Backend Setup (Laravel)

```
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## 💻 Frontend Setup (React)

```
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🌐 Environment Variables

### Backend (`backend/.env`)

```
APP_NAME=MyFullstackProject
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000
```

---

### Frontend (`frontend/.env`)

```
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

---

## 🐳 Docker Setup (Backend)

Dockerfile is located in:

```
backend/Dockerfile
```

Used for deploying Laravel on Render.

---

## 🚀 Deployment (Render CI/CD)

### 🔹 Backend (Laravel)

* Service Type: Web Service
* Environment: Docker
* Root Directory: `backend`
* Auto Deploy: Enabled

### 🔹 Frontend (React)

* Service Type: Static Site
* Root Directory: `frontend`
* Build Command:

```
npm install && npm run build
```

* Publish Directory:

```
build
```

---

## 🔗 Live URLs

* Backend API:

```
https://your-backend-url.onrender.com
```

* Frontend:

```
https://your-frontend-url.onrender.com
```

---

## 🔁 CI/CD Flow

```
Git Push → GitHub → Render Build → Auto Deploy
```

---

## 📌 Features

* REST API with Laravel
* React frontend integration
* Token-based authentication
* Environment-based configuration
* Dockerized backend
* Auto deployment with Render

---

## ⚠️ Important Notes

* Do NOT commit `.env` files
* Use `.env.example` for reference
* Ensure correct API URL in frontend env

---

## 🧠 Future Improvements

* Add authentication (JWT / Sanctum)
* Add role-based access
* Integrate Redis / Queue
* Add unit & feature tests
* Setup custom domain & SSL

---

## 👨‍💻 Author

Karthick Kannan

* LinkedIn: https://www.linkedin.com/in/karthick-kannan1997/

---

## 📄 License

This project is open-source and available under the `MIT License`.
