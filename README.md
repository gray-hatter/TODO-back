# TODO-back

# MERN TODO - Backend

This is the **Express + MongoDB** backend for the Simple MERN Todo App.  
It provides a REST API to create, read, update, toggle, and delete todos.

---

## Tech Stack
- **Node.js** + **Express.js** — Server framework  
- **MongoDB** + **Mongoose** — Database and ORM  
- **CORS** + **JSON Middleware** — For cross-origin and JSON requests  

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run MongoDB

Make sure MongoDB is running locally (default: `mongodb://localhost:27017/todos`).
Or you can connect to a remote cluster by setting the environment variable:

```bash
export MONGO_URL="your_connection_string"
```

### 3. Seed Sample Data (optional)

```bash
npm run seed
```

### 4. Start Server

```bash
npm start
```

Server will run at: **[http://localhost:5000](http://localhost:5000)**

---

## API Endpoints

| Method     | Endpoint          | Description        |
| ---------- | ----------------- | ------------------ |
| **GET**    | `/todos`          | Get all todos      |
| **POST**   | `/todos`          | Create a new todo  |
| **PUT**    | `/todos/:id`      | Update todo text   |
| **PATCH**  | `/todos/:id/done` | Toggle done/undone |
| **DELETE** | `/todos/:id`      | Delete one todo    |
| **DELETE** | `/todos`          | Delete all todos   |

---

## File Structure

```
backend/
│
├── server.js        # Entry point
├── db.js            # MongoDB connection
├── routes.js        # All routes
├── Todo.js          # Mongoose model
├── seed.js          # Seeds demo data
├── test.rest        # Quick API testing
└── package.json
```

---

## Example Todo Object

```json
{
  "_id": "672f8cc963e8946c5f0bba21",
  "text": "Learn MERN stack",
  "done": false,
  "createdAt": "2025-10-08T14:21:05.921Z"
}
```
