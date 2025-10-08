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

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd TODO-back
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# Database Configuration
MONGO_URL=mongodb://localhost:27017/todos
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/todos
```

### 3. Run MongoDB
- **Local MongoDB:** Make sure MongoDB is running locally
- **MongoDB Atlas:** Use the connection string in your `.env` file

### 4. Seed Sample Data (optional)
```bash
npm run seed
```

### 5. Start Server
```bash
npm start
```

Server will run at: **[http://localhost:5000](http://localhost:5000)**

### Troubleshooting
- **Connection Error:** Ensure MongoDB is running and the connection string is correct
- **Port in use:** Change the PORT in `.env` file
- **Module errors:** Make sure you're using Node.js v14+ and run `npm install`

---

## API Endpoints

| Method     | Endpoint          | Description        | Status Codes |
| ---------- | ----------------- | ------------------ | ------------ |
| **GET**    | `/todos`          | Get all todos      | 200, 500 |
| **POST**   | `/todos`          | Create a new todo  | 201, 400, 500 |
| **PUT**    | `/todos/:id`      | Update todo text   | 200, 400, 404, 500 |
| **PATCH**  | `/todos/:id/done` | Toggle done/undone | 200, 400, 404, 500 |
| **DELETE** | `/todos/:id`      | Delete one todo    | 200, 400, 404, 500 |
| **DELETE** | `/todos`          | Delete all todos   | 200, 500 |

### API Examples

#### Get All Todos
```bash
curl http://localhost:5000/todos
```
**Response:**
```json
[
  {
    "_id": "672f8cc963e8946c5f0bba21",
    "text": "Learn MERN stack",
    "done": false,
    "createdAt": "2025-10-08T14:21:05.921Z"
  }
]
```

#### Create a Todo
```bash
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Complete the project"}'
```
**Response:**
```json
{
  "_id": "672f8cc963e8946c5f0bba22",
  "text": "Complete the project",
  "done": false,
  "createdAt": "2025-10-09T10:30:15.123Z"
}
```

#### Toggle Todo Status
```bash
curl -X PATCH http://localhost:5000/todos/672f8cc963e8946c5f0bba21/done
```

#### Error Response Example
```json
{
  "error": "Text is required"
}
```

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

---

## Features

✅ **Environment Configuration** - Supports `.env` files for flexible configuration  
✅ **Error Handling** - Comprehensive error handling and validation  
✅ **Input Validation** - Text validation with length limits  
✅ **MongoDB Integration** - Support for both local and cloud MongoDB  
✅ **RESTful API** - Full CRUD operations with proper HTTP status codes  
✅ **CORS Support** - Cross-origin resource sharing enabled  

---

## Contributing

We welcome contributions! Here are some ways you can help:

### 🐛 Bug Reports
- Found a bug? Create an issue with steps to reproduce

### 🚀 Feature Requests
- Have an idea? Open an issue to discuss it

### 💻 Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test your changes
5. Commit: `git commit -m "Add your feature"`
6. Push: `git push origin feature/your-feature-name`
7. Create a Pull Request

### 📝 Documentation
- Improve README
- Add code comments
- Create examples
