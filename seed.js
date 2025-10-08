import { connectDB } from "./db.js";
import Todo from "./Todo.js";
async function run() {
  await connectDB();
  await Todo.deleteMany({});
  await Todo.insertMany([
    { text: "learn MERN", done: false },
    { text: "build todo app", done: false },
    { text: "profit", done: false }
  ]);
  console.log("seeded 3 todos");
  process.exit(0);
}
run().catch(e=>{console.error(e);process.exit(1);});