export interface TRRES {
  status: string;
  data: TR[];
  elements: number;
  pages: number;
}

export interface TR {
  id: number;
  createdAt: string;
  type: string;
  amount: number;
}

export enum TransactionType {
  Percentage = "PERCENTAGE",
  Payment = "PAYMENT",
  Penalty = "PENALTY",
  Refund = "REFUND",
  PercentageState = "PERCENTAGE_STATE",
  Contract = "CONTRACT",
  PercentForPay = "PERCENT_FOR_PAY",
  CreditForPay = "CREDIT_FOR_PAY",
  PercentMax = "PERCENT_MAX"
}

export enum TransactionStatus {
  Payment = "PAYMENT",
  Counted = "COUNTED",
  Pending = "PENDING",
}


export interface GetAllTransactionsByContractIdParams {
  contractId: string;
  page: number;
  size: number;
  status: string;
  type: TransactionType;
}


export interface GetFilteredTransactionsParams {
  contractId?: string;
  page?: number;
  size?: number;
  status?: TransactionStatus;
  type?: TransactionType;
  from?: Date;
  to?: Date;
}


export interface GotTransactions {
  id: number;
  createdAt: string;
  transactionStatus: TransactionStatus;
  amount: number;
  contractNumber: string;
  type: TransactionType;
}
