import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: [50, "Name can't be longer than 50 characters"],
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "amount can't be less than 0"],
  },
  category: {
    type: String,
    default: "other",
    enum: [
      "lifestyle",
      "medical",
      "finance",
      "miscellaneous",
      "travel",
      "gifts",
      "other",
    ],
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "credit card", "upi", "bank transfer", "other"],
    default: "other",
  },
});

//search request with queries also should be made

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
