const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const PORT = 3000;

// Helper function to read tasks
function getTasks() {
  const data = fs.readFileSync("./tasks.json", "utf-8");
  return JSON.parse(data);
}

// Helper function to write tasks
function saveTasks(tasks) {
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 2));
}

app.get("/tasks", (req, res) => {
  const tasks = getTasks();
  res.json(tasks);
});


app.get("/tasks/filter", (req, res) => {
  const { tag } = req.query;
  const tasks = getTasks();
  const filtered = tasks.filter((task) => task.tag === tag);
  res.json(filtered);
});


app.post("/tasks", (req, res) => {
  const { title, description, tag, priority, status } = req.body;
  const tasks = getTasks();

  const newTask = {
    id: Date.now().toString(), // simple unique id
    title,
    description,
    tag,
    priority,
    status
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json({ message: "Task added", task: newTask });
});


app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const tasks = getTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[index] = { ...tasks[index], ...req.body };
  saveTasks(tasks);

  res.json({ message: "Task updated", task: tasks[index] });
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  let tasks = getTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deleted = tasks.splice(index, 1);
  saveTasks(tasks);

  res.json({ message: "Task deleted", task: deleted[0] });
});


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
