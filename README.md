# 📝 Journal App

A full-stack journaling app built with the **MERN stack** and styled in Tailwind CSS. Designed for dark-mode journaling with clean CRUD functionality and MongoDB-powered persistence.

## ✨ Features

-   Add, edit, and delete journal entries
-   MongoDB-powered persistence using Mongoose
-   Auto-generated timestamps with formatting
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
![image](https://github.com/user-attachments/assets/65f3e61c-319d-4057-8c67-c15413dcc918)

## 🚀 Future Improvements

-   JWT-based authentication (login/signup)
-   Entry tags and filters
-   Markdown or rich text editor
-   Cloud deployment (MongoDB Atlas + Render/Vercel)

## 👤 Author

**Thomas Duong**  
_UW Computer Engineering '30_  
[GitHub: @AWoodenshoe](https://github.com/AWoodenshoe)

# Developer Notes

Some information as to the internal workings of the project.

## 🔌 API Endpoints

| Method | Route              | Description                    |
| ------ | ------------------ | ------------------------------ |
| GET    | `/api/entries`     | Get all journal entries        |
| POST   | `/api/entries`     | Add a new journal entry        |
| PUT    | `/api/entries/:id` | Update a journal entry by `id` |
| DELETE | `/api/entries/:id` | Delete a journal entry by `id` |

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
