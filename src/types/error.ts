export class CustomError extends Error {
  statusCode?: number;
  code?: string;
  errors?: Record<string, any>;
  keyValue?: Record<string, any>;
}