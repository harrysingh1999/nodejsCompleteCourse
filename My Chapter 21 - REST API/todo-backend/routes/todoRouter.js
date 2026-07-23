import express from "express";
import { createTodoItem, getTodoItems, deleteTodoItem, completeTodoItem } from "../controllers/todoController.js";

export const todoRouter = express.Router();

todoRouter.get("/", getTodoItems);
todoRouter.post("/", createTodoItem);
todoRouter.delete("/:id", deleteTodoItem);
todoRouter.put("/:id/completed", completeTodoItem);
