export const sortFields = [
  "date",
  "paymentMethod",
  "amount",
  "name",
  "category",
] as const;

type SortField = (typeof sortFields)[number];

export interface ExpenseQuery {
  order?: "asc" | "desc";
  sortBy?: SortField;
  year?: number;
  month?: number;
}
