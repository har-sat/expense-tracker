import express from "express";
import { PORT } from "./config/env.js";
import { connectToDatabase } from "./database/mongodb.js";

const app = express();

app.get("/", (req, res) => {
  res.send("HEllo WORLd");
});

app.listen(PORT, async () => {
  console.log(`Listening on port http://localhost:${PORT}`);
  await connectToDatabase();
});
