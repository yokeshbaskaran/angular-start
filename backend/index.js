const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors({ origin: ["http://localhost:4200"] }));
app.use(express.json());

// mongoose
// import JSON
// mongoimport
// --uri="mongodb://localhost:27017"
// --db demo
// --collection test
// --file ./data/users.json
// --jsonArray
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

//forms
const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
});

const Forms = mongoose.model("form", formSchema);

//routes
// Todos
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

// Todos
app.get("/api/forms", async (req, res) => {
  try {
    const forms = await Forms.find();
    res.status(200).json(forms);
  } catch (error) {
    console.log("GET forms Error" + error);
  }
});

app.post("/api/forms", async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    if (!name || !address || !phone)
      return res.status(404).json({ error: "Data is required!" });

    const forms = await Forms.create({ name, address, phone });
    console.log("forms", forms);

    res.status(201).json(forms);
  } catch (error) {
    console.log("POST Forms Error" + error);
  }
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
