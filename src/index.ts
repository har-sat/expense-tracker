import express from "express";

import { PORT } from "./config/env.js";
import { connectToDatabase } from "./database/mongodb.js";

import expenseRouter from "./routes/expense.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.route.js";
import usersRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use('/api/v1/users/', usersRouter)
app.use("/api/v1/expense", expenseRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Listening on port http://localhost:${PORT}`);
  await connectToDatabase();
});
