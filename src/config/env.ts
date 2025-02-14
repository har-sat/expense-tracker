import { config } from "dotenv";

config({ path: ".env.dev" });

export const { PORT, DB_URI } = process.env;
