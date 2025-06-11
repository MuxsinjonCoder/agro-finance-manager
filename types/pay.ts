export interface CreatePaymentTypes {
  contractId: any;
  paymentDate: string;
  amountPaid: any;
  interestAmount: any;
  penaltyAmount: any;
  transactionType: string;
}

export interface GotPays {
  amountPaid?: number;
  createdAt?: string;
  id?: any;
  interestAmount?: number;
  paymentDate?: string;
  paymentStatus?: string;
  penaltyAmount?: number;
  updatedAt?: any;
  transactionType?: string;
  contractNumber?: string;

  name?: string;
  region?: string;
  stir?: string;
  difference?: any;
  jdayCount?: number;
  jdaySum?: number;
  jbeginCount?: number;
  jbeginSum?: number;
  ddayCount?: number;
  ddaySum?: number;
  drate?: number;
  mcount?: number;
  msum?: number;
  mrate?: number;
}

export interface GotRegionPaysTypes {
  createdAt?: string;
  ddayCount?: number;
  ddaySum?: number;
  difference?: number;
  drate?: number;
  id?: number;
  jbeginCount?: number;
  jbeginSum?: number;
  jdayCount?: number;
  jdaySum?: number;
  mcount?: number;
  mrate?: number;
  msum?: number;
  name?: string;
  region?: string;
  stir?: string;
}
