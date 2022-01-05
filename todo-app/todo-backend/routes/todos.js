const express = require("express");
const { Todo } = require("../mongo");
const { getAsync, setAsync } = require("../redis")
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });


  let added_todos = await getAsync('added_todos')

  added_todos ? added_todos = parseInt(added_todos)+1 : added_todos = 1 

  await setAsync('added_todos', added_todos)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  try {
    res.send(req.todo);
  } catch (exception) {
    res.sendStatus(404);
  }
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const doneTodo = {
    text: req.todo.text,
    done: true,
  };

  const options = {
    new: true
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, doneTodo, options);
    res.send(updatedTodo);
  } catch (exception) {
    res.sendStatus(404);
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
