import { Router } from "express";
import Expense from "../models/expense.model.js";

const expenseRouter = Router();

expenseRouter.get("/", async (req, res) => {
  const expenses = await Expense.find();

  res.status(200).json({
    success: true,
    data: expenses,
  });
});

expenseRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    const expense = new Expense(data);
    await expense.validate();
    const savedExpense = await expense.save();

    res.status(201).json({
      success: true,
      data: savedExpense,
      message: "Added expense succesfully",
    });
  } catch (error) {
    console.log((error as Error).message);
    if ((error as Error).name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: (error as Error).message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

expenseRouter.get("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Object containing all details about one expense",
  });
});

expenseRouter.post("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Modified Expense succesfully",
  });
});

expenseRouter.delete("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Delete expense with id successfully",
  });
});

export default expenseRouter;
