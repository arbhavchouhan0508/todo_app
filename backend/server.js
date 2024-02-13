const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = 4000;
let Todo = require("./todo.model");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "public")));
mongoose.connect("mongodb+srv://abhichouhan1261:AHJMyAK3DLgv4wap@cluster0.emivjpl.mongodb.net/todo", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
});
const connection = mongoose.connection;
 
// Once the connection is established, callback
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

todoRoutes.route("/").get((req, res) => {
  Todo.find((err, todos) => {
    if (err) console.log(err);
    else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get((req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

todoRoutes.route("/add").post((req, res) => {
  const todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed");
    });
});

todoRoutes.route("/update/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ msg: `No todo with id: ${id}` });
    } else {
      res.status(200).json({
        msg: `Todo with id: ${id} updated successfully.`,
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

todoRoutes.route("/delete/:id").delete(async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(404).json({ msg: `No todo with id: ${todoId}` });
    } else {
      res.status(200).json({
        message: `Todo with id: ${todoId} deleted successfully.`,
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
