export interface CreateCourt {
  contractId: number;
  decisionDate: string;
  action: string;
  note: string;
  decisionDocument: string;
}

export interface GotCourtTypes {
  action: string;
  createdAt: string;
  decisionDate: string;
  decisionDocument: string;
  id: number;
  note: string;
  updatedAt: any;
}
