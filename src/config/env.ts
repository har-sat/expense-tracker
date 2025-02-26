import { config } from "dotenv";

config({ path: ".env.dev" });

export const { PORT, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
