import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";

const expenseRouter = Router();

expenseRouter.get("/", getExpenses);

expenseRouter.post("/", createExpense);

expenseRouter.get("/:id", getExpenseById);

expenseRouter.put("/:id", updateExpense);

expenseRouter.delete("/:id", deleteExpense);

export default expenseRouter;
