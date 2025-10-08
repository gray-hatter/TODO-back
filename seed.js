import "dotenv/config";
import { connectDB } from "./db.js";
import Todo from "./Todo.js";

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");
    
    // Connect to database
    await connectDB();
    
    // Clear existing todos
    const deleteResult = await Todo.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing todos`);
    
    // Insert sample todos
    const sampleTodos = [
      { text: "Learn MERN stack", done: false },
      { text: "Build an awesome TODO app", done: true },
      { text: "Deploy to production", done: false },
      { text: "Add more features", done: false },
      { text: "Write documentation", done: true }
    ];
    
    const insertedTodos = await Todo.insertMany(sampleTodos);
    console.log(`✅ Successfully seeded ${insertedTodos.length} todos`);
    
    // Display seeded todos
    console.log("\n📝 Seeded todos:");
    insertedTodos.forEach((todo, index) => {
      const status = todo.done ? "✓" : "○";
      console.log(`   ${status} ${todo.text}`);
    });
    
    console.log("\n🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
}

seedDatabase();