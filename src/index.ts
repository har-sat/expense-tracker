import express from "express";
import { PORT } from "./config/env.js";
import { connectToDatabase } from "./database/mongodb.js";
import expenseRouter from "./routes/expense.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/expense", expenseRouter);

app.use(errorMiddleware);

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
