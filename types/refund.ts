export interface CreateRefundTypes {
  type: string;
  number: string;
  amount: string;
  status: string;
  partner: string;
}

export interface GotRefuncTypes {
  id: number;
  date: string;
  type: string;
  number: string;
  amount: number;
  status: string;
  partner: string;
}
