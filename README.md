# 🔐 Advanced MERN Authentication System

This is a full-featured **MERN (MongoDB, Express, React, Node.js)** authentication system with advanced capabilities including:

* JWT authentication
* Email verification
* Password reset via email
* Hashed tokens using crypto
* Nodemailer integration (Mailtrap or Gmail SMTP)
* Protected routes
* Responsive UI built with React & Tailwind CSS

---

## 📂 Project Structure

```
project-root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── middleware/
│   ├── templates/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── vite.config.js
└── README.md
```

---

## ⚙️ Features

* **User Registration & Login**
* **Email Verification** using verification tokens
* **Forgot & Reset Password** with hashed reset tokens
* **Protected Routes** (Frontend & Backend)
* **Tailwind UI** with dark mode toggle (for homepage)
* **State Management** using React Context or Zustand
* **Toasts** for feedback messages

---

## 🛠️ Technologies Used

* **Backend**: Node.js, Express, MongoDB, Mongoose, Nodemailer, Crypto, JWT
* **Frontend**: React, React Router, Tailwind CSS, Vite, Axios
* **Tools**: Mailtrap or Gmail SMTP, dotenv, bcrypt

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-auth-app.git
cd mern-auth-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password_or_app_password
EMAIL_HOST=smtp.mailtrap.io or smtp.gmail.com
EMAIL_PORT=2525 or 587
```

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧪 API Routes

### Auth Routes (`/api/auth`)

* `POST /signup`
* `POST /login`
* `POST /logout`
* `GET /verify-email?token=...`
* `POST /forgot-password`
* `POST /reset-password?token=...`
* `GET /check-auth`

### Protected Route Example (`/api/dashboard`)

* Requires valid token

---

## 🔒 Security Highlights

* JWT stored in HTTP-only cookies
* Hashed email and password reset tokens using `crypto`
* Proper expiration times for tokens
* Backend validation and sanitized inputs

---

## 📸 UI Pages

* Login
* Register
* Email Verification
* Forgot Password
* Reset Password
* Home (Dark Mode Toggle)
* 404 Page

---

## ✅ To Do / Possible Enhancements

* OAuth (Google/GitHub)
* Multi-factor authentication
* Rate limiting / Brute-force protection
* Account lockout after X failed attempts

---

## 🧑‍💻 Author

**Akindiji Durojaiye**

---

## 📜 License

MIT
