export interface CreateBudgetTypes {
  type: string;
  number: string;
  amount: string;
}

export interface GotBudgetTypes {
  id: number;
  date: string;
  type: string;
  number: string;
  amount: number;
}
