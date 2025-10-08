import express from "express";
import Todo from "./Todo.js";
const router = express.Router();
router.get("/", async (_req, res) => { res.json(await Todo.find().sort({createdAt:-1})); });
router.post("/", async (req, res) => {
  const text = (req.body?.text || "").trim();
  if (!text) return res.status(400).json({ error: "text is required" });
  res.status(201).json(await Todo.create({ text }));
});
router.put("/:id", async (req, res) => {
  const text = (req.body?.text || "").trim();
  if (!text) return res.status(400).json({ error: "text is required" });
  const u = await Todo.findByIdAndUpdate(req.params.id, { text }, { new: true });
  if (!u) return res.status(404).json({ error: "not found" });
  res.json(u);
});
router.patch("/:id/done", async (req, res) => {
  const t = await Todo.findById(req.params.id);
  if (!t) return res.status(404).json({ error: "not found" });
  t.done = !t.done; await t.save(); res.json(t);
});
router.delete("/:id", async (req, res) => {
  const d = await Todo.findByIdAndDelete(req.params.id);
  if (!d) return res.status(404).json({ error: "not found" });
  res.json({ ok: true });
});
router.delete("/", async (_req, res) => { await Todo.deleteMany({}); res.json({ ok: true }); });
export default router;