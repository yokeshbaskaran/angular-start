const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors({ origin: ["http://localhost:4200"] }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/mean-todo")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("DB Failed!" + err));

//models
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("todo", todoSchema);

//routes
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.log("GET Error" + error);
  }
});

app.post("/api/todos", async (req, res) => {
  const { title } = req.body;
  try {
    if (!title) return res.status(404).json({ error: "Title is required!" });

    const todos = await Todo.create({ title });
    res.status(201).json(todos);
  } catch (error) {
    console.log("POST Error" + error);
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id", id);

  try {
    // await Todo.findByIdAndDelete(id); // 1
    await Todo.findOneAndDelete({ id }); // - 2

    res.status(200).json({ message: `Todo id:${id} deleted` });
  } catch (error) {
    console.log("GET Error" + error);
  }
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
