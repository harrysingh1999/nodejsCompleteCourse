import todo from "../models/todo.js";

export const getTodoItems = async (req, res) => {
  const todoItems = await todo.find();

  res.status(201).json(todoItems);
};

export const createTodoItem = async (req, res) => {
  const { task, date } = req.body;

  const todoItem = new todo({ task, date });

  await todoItem.save();
  res.status(201).json(todoItem);
};

export const deleteTodoItem = async (req, res) => {
  const taskId = req.params.id;

  await todo.findByIdAndDelete(taskId);
  res.status(204).json({ id: taskId });
};

export const completeTodoItem = async (req, res) => {
  const taskId = req.params.id;

  const todoItem = await todo.findById(taskId);

  todoItem.completed= true;
  await todoItem.save();
  res.status(201).json(todoItem);
};
