export class ApiError extends Error {
  statusCode: number;
  errorType: string;

  constructor(message: string, statusCode?: number, errorType?: string) {
    super(message);
    this.statusCode = statusCode || 500;
    this.errorType = errorType || "UnknownError";
  }
}
