import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: uuidv4(), title: "First Task", status: "todo" },
  { id: uuidv4(), title: "Second Task", status: "inprogress" },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title, status } = req.body;
  if (!title || !status) {
    return res.status(400).json({ error: "Title and status are required" });
  }
  const newTask = { id: uuidv4(), title, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  task.status = status;
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== id);
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});




