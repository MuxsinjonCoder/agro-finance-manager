export interface CreateAppTypes {
  userId?: number;
  categoryId?: number | string;
  partnerIds?: number[];
  requestedAmount?: number;
  currencyType?: string;
  applicationDate?: string;
}

export interface GotAppTypes {
  applicationDate: string;
  applicationStatus: string;
  createdAt: string;
  id: number;
  requestedAmount: number;
  updatedAt: string | null;
}
