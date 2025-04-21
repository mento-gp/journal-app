# 📝 Journal App

A full-stack journaling app built with the **MERN stack** and styled in Tailwind CSS. Designed for dark-mode journaling with clean CRUD functionality and MongoDB-powered persistence.

## ✨ Features

-   Add, edit, and delete journal entries  
-   MongoDB-powered persistence using Mongoose  
-   Auto-generated timestamps with formatting  
-   Filter entries by tag using a dynamic, clickable tag system  
-   Responsive dark UI built with Tailwind CSS  
-   Full CRUD functionality via REST API

---

## 🧰 Tech Stack

| Layer    | Technology          |
| -------- | ------------------- |
| Frontend | React, Tailwind CSS |
| Backend  | Node.js, Express.js |
| Database | MongoDB, Mongoose   |

---

## ⚙️ Getting Started

### 1. Clone the project

```bash
git clone https://github.com/AWoodenshoe/journal-app.git
cd journal-app
```

### 2. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/journalApp
```

Then run:

```bash
npm run dev
```

### 3. Setup the frontend

```bash
cd ../frontend
npm install
npm run dev
```

## 📸 User Interface preview
![image](https://github.com/user-attachments/assets/b5347cc4-24f0-4d93-ba3e-d044d57c3917)
![image](https://github.com/user-attachments/assets/83c72ef4-4b09-45f6-be14-7e0a688aac85)


## 🚀 Future Improvements

-   JWT-based authentication (login/signup)
-   Markdown or rich text editor
-   Cloud deployment (MongoDB Atlas + Render/Vercel)

## 👤 Author

**Thomas Duong**  
_UW Computer Engineering '30_  
[GitHub: @AWoodenshoe](https://github.com/AWoodenshoe)

# Developer Notes

Some information as to the internal workings of the project.

## 🔌 API Endpoints

`id` is custom identifer for entries

| Method | Route              | Description                    |
| ------ | ------------------ | ------------------------------ |
| GET    | `/api/journal`     | Get all journal entries        |
| POST   | `/api/journal`     | Add a new journal entry        |
| PUT    | `/api/journal/:id` | Update a journal entry by `id` |
| DELETE | `/api/journal/:id` | Delete a journal entry by `id` |

## 📁 Project Structure

```
journal-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   └── public/
```
