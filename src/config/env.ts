import { config } from "dotenv";

config({ path: ".env.dev" });

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const PORT = getEnvVar("PORT");
export const DB_URI = getEnvVar("DB_URI");
export const JWT_SECRET = getEnvVar("JWT_SECRET");
export const JWT_EXPIRES_IN = getEnvVar("JWT_EXPIRES_IN");
export const NODE_ENV = getEnvVar("NODE_ENV", "development");