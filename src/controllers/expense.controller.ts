import { Request, Response, NextFunction } from "express";
import Expense from "../models/expense.model.js";
import { ExpenseQuery, sortFields } from "../types/expense.js";

export const getExpenses = async (
  req: Request<unknown, unknown, unknown, ExpenseQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { order = "asc", sortBy = "name" } = req.query;

    const sortField = sortFields.includes(sortBy) ? sortBy : "amount";
    const sortOrder = order === 'asc' ? 1 : -1;
    console.log("sorting by", sortField, "in order =",sortOrder)
    const expenses = await Expense.find().sort({ [sortField]: sortOrder });

    res.status(200).json({
      success: true,
      data: expenses,
    });

  } catch (error) {
    next(error);
  }
};

export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error);
  }
};

export const getExpenseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);
    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    console.log(expense);
    res.status(200).json({
      success: true,
      data: "logged in console",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.deleteOne({ _id: id });

    res.status(204).json({ success: true, data: deletedExpense });
  } catch (error) {
    next(error);
  }
};
