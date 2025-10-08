import express from "express";
import mongoose from "mongoose";
import Todo from "./Todo.js";

const router = express.Router();

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Helper function to validate todo text
const validateTodoText = (text) => {
  const trimmedText = (text || "").trim();
  if (!trimmedText) {
    return { isValid: false, error: "Text is required" };
  }
  if (trimmedText.length > 500) {
    return { isValid: false, error: "Text cannot exceed 500 characters" };
  }
  return { isValid: true, text: trimmedText };
};

// GET /todos - Get all todos
router.get("/", async (_req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

// POST /todos - Create a new todo
router.post("/", async (req, res, next) => {
  try {
    const validation = validateTodoText(req.body?.text);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }
    
    const todo = await Todo.create({ text: validation.text });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

// PUT /todos/:id - Update todo text
router.put("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid todo ID" });
    }

    const validation = validateTodoText(req.body?.text);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id, 
      { text: validation.text }, 
      { new: true }
    );
    
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
});

// PATCH /todos/:id/done - Toggle todo completion status
router.patch("/:id/done", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid todo ID" });
    }

    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    
    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (error) {
    next(error);
  }
});

// DELETE /todos/:id - Delete a specific todo
router.delete("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid todo ID" });
    }

    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    
    res.json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// DELETE /todos - Delete all todos
router.delete("/", async (_req, res, next) => {
  try {
    const result = await Todo.deleteMany({});
    res.json({ 
      success: true, 
      message: `Deleted ${result.deletedCount} todos`
    });
  } catch (error) {
    next(error);
  }
});

export default router;