export interface GotPercentTypes {
  id?: number;
  createdAt?: any;
  type?: "CONTRACT" | "PAYMENT" | "PENALTY" | "PERCENTAGE" | "PERCENT_FOR_PAY";
  transactionStatus?: "PENDING" | "COUNTED" | "PAYMENT";
  amount?: number;
  contractId?: number;
}
