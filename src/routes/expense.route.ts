import { Router } from "express";

const expenseRouter = Router();

expenseRouter.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "object containing all the expenses(only name, amount and type) in a list",
  });
});

expenseRouter.post("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Added expense succesfully",
  });
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
