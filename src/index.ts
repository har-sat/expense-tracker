import express from "express";
import { PORT } from "./config/env.js";
import { connectToDatabase } from "./database/mongodb.js";
import expenseRouter from "./routes/expense.route.js";

const app = express();

app.use("/api/v1/expense", expenseRouter);

app.get("/", async (req, res) => {
  res.send({
    success: true,
    message: "All routes are now only in api/v1/expense",
  });
});

app.listen(PORT, async () => {
  console.log(`Listening on port http://localhost:${PORT}`);
  await connectToDatabase();
});
